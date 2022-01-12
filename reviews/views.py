from karman.settings import SMS_SECRET
from notifications.models import Message
from karman.permissions import KarmanPermission, ReviewPermission, CommentPermission
from reviewables.models import VK, Instagram, Phone, Reviewable
import django_filters.rest_framework
from rest_framework import viewsets, filters
from rest_framework.generics import ListAPIView
from rest_framework.decorators import action
from django.db.models import Count
from django.db.models import Prefetch
from rest_framework.response import Response
import requests
from django.db.models.aggregates import Avg
from django.apps import apps
from reviews.filters import ReviewFilter
from django.db.models import Q

from services.models import Service
from .models import Attribute, AttributeTitle, Review, Comment, Like, ReviewTemplate
from .serializers import ReviewSerializer, CommentSerializer, LikeSerializer, ReviewTemplateSerializer

# Create your views here.
def set_like(object, request, pk):
    remove = request.data.get('remove')
    dislike = request.data.get('dislike')
    like = object.likes.filter(owner=request.user).first()
    if dislike and like and not like.dislike:
        like.dislike = True
        like.save()
        object.count_likes -= 2
    if dislike and not like:
        object.likes.create(owner=request.user, dislike=True)
        object.count_likes -= 1
    if not dislike and like and like.dislike:
        like.dislike = False
        like.save()
        object.count_likes += 2
    if not dislike and not like:
        object.likes.create(owner=request.user)
        object.count_likes += 1
    if remove and like:
        if like.dislike:
            object.count_likes += 1
        else:
            object.count_likes -= 1
        like.delete()
    return object

def send_sms(data, phone_number):
    url = 'https://sms.ru/sms/send/'
    sms_data = {
        'api_id': SMS_SECRET,
        'to':phone_number,
        'msg':f'На Ваш номер телефона {phone_number} был оставлен отзыв на сайте KarmaN. https://karma-n.ru/phones/{phone_number}/',
        'json':1
        }
    sms_reponse = requests.get(url, params=sms_data)
    sms = sms_reponse.json()
    return sms


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [ReviewPermission]
    swagger_schema = None
    filter_backend = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['owner', 'about_customer', 'reviewable', 'reviewable__owner', 'is_active']
    # search_fields = ['owner', 'phone__phone_number', 'phone__owner', 'is_customer']
    ordering_fields = '__all__'
    ordering = ('-created_at', '-count_likes')

    def create(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
        else:
            return Response(serializer.errors, status=400)
        reviewable = request.data.get('reviewable')
        ctype = reviewable.pop('resourcetype')
        model = apps.get_model('reviewables', ctype.capitalize())
        reviewable, created = model.objects.get_or_create(**reviewable)
        if reviewable.owner == request.user:
                return Response({'error':'Запрещено оставлять отзыв на свой номер телефона или аккаунт'}, status=403)
        attributes = request.data.get('attributes')
        service = request.data.get('service')         
        review = Review.objects.create(owner=request.user, reviewable=reviewable, **data)
        if not reviewable.owner and ctype.capitalize() == 'Phone':
            phone_number = reviewable.screen_name.replace(' ','').replace('(','').replace(')','').replace('-','')
            send_sms(data, phone_number)
        elif reviewable.owner:
            Message.objects.create(owner=reviewable.owner, title='Новый отзыв', body=f'<div>Новый отзыв на ваш {str(reviewable.polymorphic_ctype).replace("reviewables |", "")}: {reviewable.screen_name}. <a href="https://karman.ru/reviewable/{reviewable.id}/#reviwe-{review.id}">Смотреть</a></div>')
        for attribute in attributes:
            title = AttributeTitle.objects.get(pk=attribute['title'])
            value = float(attribute['value'])
            review.attributes.create(title=title, value=value)
        if service:
            review.service = Service.objects.get(pk=service)
        review.rating = review.attributes.aggregate(avg=Avg('value'))['avg']
        review.save()
        return Response(ReviewSerializer(review).data, status=201)

    def update(self, request, *args, **kwargs):
        attributes = request.data.get('attributes')
        service = request.data.get('service')
        for attribute in attributes:
            Attribute.objects.filter(pk=attribute['id']).update(value=attribute['value'])
        if service:
            instance = self.get_object()
            instance.service = Service.objects.get(pk=service)
            instance.save()
        return super().update(request, *args, **kwargs)

    def get_queryset(self):
        my_like = Count('likes', filter=(~Q(likes__dislike=True) & Q(likes__owner=self.request.user.id)))
        my_dislike = Count('likes', filter=(Q(likes__dislike=True) & Q(likes__owner=self.request.user.id)))
        likes = Like.objects.prefetch_related('owner')
        prefetch_likes = Prefetch('likes', queryset=likes)
        comments = Comment.objects.prefetch_related('owner', prefetch_likes).annotate(is_my_like=my_like, is_my_dislike=my_dislike)
        prefetch_comments = Prefetch('comments', queryset=comments)
        reviewable = Reviewable.objects.prefetch_related('owner')
        prefetch_reviewable = Prefetch('reviewable', queryset=reviewable)
        attributes = Attribute.objects.prefetch_related('title').order_by('title')
        prefetch_attributes = Prefetch('attributes', queryset=attributes)
        reviews = Review.objects.prefetch_related('owner', prefetch_comments, prefetch_attributes, 'service', prefetch_reviewable, prefetch_likes).annotate(is_my_like=my_like, is_my_dislike=my_dislike, count_comments=Count('comments'))
        return reviews
    
    @action(detail=True, methods=['patch'])
    def like(self, request, pk=None):
        review = self.get_object()
        review = set_like(review, request, pk)
        review.save()
        qs = self.get_queryset()
        review = qs.get(pk=review.id)
        serializer = self.get_serializer(review, many=False)
        return Response(serializer.data, status=200)
        



class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [CommentPermission]
    swagger_schema = None

    def create(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
        else:
            return Response(serializer.errors,status=400)
        comment = Comment.objects.create(owner=request.user, **data)
        return Response(CommentSerializer(comment).data, status=201)
    
    def update(self, request, *args, **kwargs):
        request.data.pop('commented_review', None)
        return super().update(request, *args, **kwargs)
    
    def get_queryset(self):
        my_like = Count('likes', filter=(~Q(likes__dislike=True) & Q(likes__owner=self.request.user.id)))
        my_dislike = Count('likes', filter=(Q(likes__dislike=True) & Q(likes__owner=self.request.user.id)))
        likes = Like.objects.prefetch_related('owner')
        prefetch_likes = Prefetch('likes', queryset=likes)
        comments = Comment.objects.prefetch_related('owner', prefetch_likes).annotate(is_my_like=my_like, is_my_dislike=my_dislike)
        return comments.order_by('-created_at')
    
    @action(detail=True, methods=['patch'])
    def like(self, request, pk=None):
        comment = self.get_object()
        comment = set_like(comment, request, pk)
        comment.save()
        qs = self.get_queryset()
        comment = qs.get(pk=comment.id)
        serializer = self.get_serializer(comment, many=False)
        return Response(serializer.data, status=200)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [KarmanPermission]
    swagger_schema = None

class ReviewTemplateList(ListAPIView):
    pagination_class = None
    serializer_class = ReviewTemplateSerializer
    queryset = ReviewTemplate.objects.prefetch_related('attributes')
    filter_backend = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter,]
    filterset_fields = ['is_customer']
    ordering = ('-rating',)

    def get_queryset(self):
        attributes = Attribute.objects.prefetch_related('title').order_by('title')
        prefetch_attributes = Prefetch('attributes', queryset=attributes)
        return (ReviewTemplate.objects.prefetch_related(prefetch_attributes)).order_by('-rating')