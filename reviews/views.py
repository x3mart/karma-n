from karman.settings import SMS_SECRET
from notifications.models import Message
from karman.permissions import KarmanPermission, ReviewPermission, CommentPermission
from reviewables.models import Vk, Instagram, Phone, Reviewable
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
from utils.reviewables import clean_phone
from .models import Attribute, AttributeTitle, Review, Comment, Like, ReviewTemplate, ReviewableCustomerAttributeAvgValue, ReviewableExecutorAttributeAvgValue
from .serializers import ReviewSerializer, CommentSerializer, LikeSerializer, ReviewTemplateSerializer, AttributeTitleSerializer

# Create your views here.
def set_like(object, user, dislike=None):
    like = object.likes.filter(owner=user).first()
    if dislike and like and not like.dislike:
        like.dislike = True
        like.save()
        object.count_likes -= 2
    if dislike and not like:
        object.likes.create(owner=user, dislike=True)
        object.count_likes -= 1
    if not dislike and like and like.dislike:
        like.dislike = False
        like.save()
        object.count_likes += 2
    if not dislike and not like:
        object.likes.create(owner=user)
        object.count_likes += 1
    # if dislike and like and like.dislike:
    #     like.delete()
    #     object.count_likes += 1
    # if like and not like.dislike:
    #     like.delete()
    #     object.count_likes -= 1
    return object

def get_reviews(user_id):
    my_like = Count('likes', filter=(~Q(likes__dislike=True) & Q(likes__owner=user_id)))
    my_dislike = Count('likes', filter=(Q(likes__dislike=True) & Q(likes__owner=user_id)))
    likes = Like.objects.prefetch_related('owner')
    prefetch_likes = Prefetch('likes', queryset=likes)
    # comments = Comment.objects.prefetch_related('owner', prefetch_likes).annotate(is_my_like=my_like, is_my_dislike=my_dislike)
    # prefetch_comments = Prefetch('comments', queryset=comments)
    reviewables_customer_attributes_avg = ReviewableCustomerAttributeAvgValue.objects.prefetch_related('title')
    prefetch_reviewables_customer_attributes_avg = Prefetch('reviewables_customer_attributes_avg', reviewables_customer_attributes_avg)
    reviewables_executor_attributes_avg = ReviewableExecutorAttributeAvgValue.objects.prefetch_related('title')
    prefetch_reviewables_executor_attributes_avg = Prefetch('reviewables_executor_attributes_avg', reviewables_executor_attributes_avg)
    reviewable = Reviewable.objects.prefetch_related('owner', prefetch_reviewables_customer_attributes_avg, prefetch_reviewables_executor_attributes_avg)
    prefetch_reviewable = Prefetch('reviewable', queryset=reviewable)
    attributes = Attribute.objects.prefetch_related('title')
    prefetch_attributes = Prefetch('attributes', queryset=attributes)
    reviews = Review.objects.prefetch_related('owner', prefetch_attributes, 'service', prefetch_reviewable, prefetch_likes).annotate(is_my_like=my_like, is_my_dislike=my_dislike)
    return reviews


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [ReviewPermission]
    swagger_schema = None
    filter_backend = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['owner', 'about_customer', 'reviewable', 'reviewable__owner', 'reviewable__screen_name', 'reviewable__polymorphic_ctype__model', 'is_active', ]
    # search_fields = ['owner', 'phone__phone_number', 'phone__owner', 'is_customer']
    ordering_fields = '__all__'
    ordering = ('-created_at', '-count_likes')

    def send_sms(self, reviewable):
        phone_number = clean_phone(reviewable.screen_name)
        url = 'https://sms.ru/sms/send/'
        sms_data = {
            'api_id': SMS_SECRET,
            'to':phone_number,
            'msg':f'На Ваш номер телефона {reviewable.screen_name} был оставлен отзыв на сайте KarmaN. https://karma-n.ru/',
            'json':1
            }
        sms_reponse = requests.get(url, params=sms_data)
        sms = sms_reponse.json()
        return sms
    
    def create_message(self, reviewable):
        Message.objects.create(owner=reviewable.owner, title='Новый отзыв', body=f'<div>Новый отзыв на ваш {str(reviewable.polymorphic_ctype).replace("reviewables |", "")}: {reviewable.screen_name}. <a href="https://karma-n.ru/">Смотреть</a></div>')

    def get_template_attributes(self, template):
        attributes = Attribute.objects.filter(review_template=template).values('title', 'value')
        return attributes
    
    def get_template(self, template):
        template = ReviewTemplate.objects.get(pk=template)
        return template
    
    def get_reviewable(self, request):
        reviewable = request.data.get('reviewable')
        ctype = reviewable.pop('resourcetype')
        model = apps.get_model('reviewables', ctype.capitalize())
        reviewable, created = model.objects.get_or_create(**reviewable)
        return (reviewable, ctype)
    
    def create_attributes(self, review, attributes):
        objs = []
        for attribute in attributes:
            objs.append(Attribute(review=review, title_id=attribute['title'], value=float(attribute['value'])))
        Attribute.objects.bulk_create(objs)

    
    def get_rating(self, review):
        return review.attributes.aggregate(avg=Avg('value'))['avg']

    def create(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
        else:
            return Response(serializer.errors, status=400)
        reviewable, ctype = self.get_reviewable(request)
        # if reviewable.owner == request.user:
        #         return Response({'error':'Запрещено оставлять отзыв на свой номер телефона или аккаунт'}, status=403)
        attributes = request.data.get('attributes')
        template = request.data.get('template')
        service = request.data.get('service')    
        if template:
            template = self.get_template(template)
            data['body'] = template.body
            data['about_customer'] = template.about_customer     
        review = Review.objects.create(owner=request.user, reviewable=reviewable, **data)
        if not reviewable.owner and ctype.capitalize() == 'Phone':
            self.send_sms(reviewable)
        elif reviewable.owner:
            self.create_message(reviewable)
        if template:
            attributes = self.get_template_attributes(template)
        self.create_attributes(review, attributes)
        if service:
            review.service = Service.objects.get(pk=service)
        review.rating = self.get_rating(review)
        review.save()
        return Response(ReviewSerializer(review).data, status=201)

    def update(self, request, *args, **kwargs):
        attributes = request.data.get('attributes')
        service = request.data.get('service')
        review = self.get_object()
        for attribute in attributes:
            Attribute.objects.filter(pk=attribute['id']).update(value=attribute['value'])
        review.rating = self.get_rating(review)
        if service:
            review.service = Service.objects.get(pk=service)
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(review, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if getattr(review, '_prefetched_objects_cache', None):
            review._prefetched_objects_cache = {}
        return Response(serializer.data)

    def get_queryset(self):
        return get_reviews(self.request.user.id)
    
    @action(detail=True, methods=['patch'])
    def like(self, request, pk=None):
        dislike = request.data.get('dislike')
        review = self.get_object()
        review = set_like(review, request.user, dislike)
        print(review.count_likes)
        review.save()
        qs = self.get_queryset()
        review = qs.get(pk=review.id)
        print(review.count_likes)
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
        dislike = request.data.get('dislike')
        comment = self.get_object()
        comment = set_like(comment, request.user, dislike)
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
    filterset_fields = ['about_customer']
    ordering = ('-rating',)

    def get_queryset(self):
        attributes = Attribute.objects.prefetch_related('title').order_by('title')
        prefetch_attributes = Prefetch('attributes', queryset=attributes)
        return (ReviewTemplate.objects.prefetch_related(prefetch_attributes)).order_by('-rating')


class AttributeTitleList(ListAPIView):
    pagination_class = None
    serializer_class = AttributeTitleSerializer
    queryset = AttributeTitle.objects.all()
    filter_backend = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter,]
    filterset_fields = ['about_customer']
    ordering = ('-id',)
