from djoser.views import UserViewSet
from djoser.conf import settings
from django.db.models import Prefetch
from rest_framework.decorators import action
from reviewables.models import Phone, Reviewable
from services.models import Service
from utils.images import image_processing
from utils.reviewables import clean_phone
from rest_framework.response import Response
from django.apps import apps
from accounts.serializers import AccountSerializer, AvatarSerializer
from reviews.models import UserCustomerAttributeAvgValue, UserExecutorAttributeAvgValue

# Create your views here.
class AccountViewSet(UserViewSet):
    def get_queryset(self):
        qs = super().get_queryset()
        user_customer_attributes_avg = UserCustomerAttributeAvgValue.objects.prefetch_related('title')
        prefetch_user_customer_attributes_avg = Prefetch('users_customer_attributes_avg', user_customer_attributes_avg)
        user_executor_attributes_avg = UserExecutorAttributeAvgValue.objects.prefetch_related('title')
        prefetch_user_executor_attributes_avg = Prefetch('users_executor_attributes_avg', user_executor_attributes_avg)
        qs = qs.prefetch_related('services', 'reviewables', prefetch_user_customer_attributes_avg, prefetch_user_executor_attributes_avg)
        return qs.exclude(email='AnonymousUser')
    
    def get_serializer_class(self):
        if self.action == "list":
            return settings.SERIALIZERS.users_list
        if self.action == "avatar":
            return AvatarSerializer
        return super().get_serializer_class()
    
    def perform_update(self, serializer):
        services = self.request.data.get('services')
        if services:
            services = [Service.objects.get_or_create(title=service['title'], category_id=service['category'])[0] for service in services]

        return super().perform_update(serializer)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        services = request.data.get('services')
        if services:
            services = [Service.objects.get_or_create(title=service['title'], category_id=service['category'])[0] for service in services]
        else:
            services = []
        instance.services.set(services)
        reviewables = request.data.get('reviewables')
        reviewables_set=[]
        if reviewables:
            reviewables_set.append([apps.get_model('reviewables', reviewable['resourcetype'].capitalize()).objects.get_or_create(screen_name=reviewable['screen_name'])[0].id for reviewable in reviewables if reviewable['resourcetype'] != 'phone'])
            reviewables_set.append([Phone.objects.get_or_create(screen_name=clean_phone(reviewable['screen_name']))[0].id for reviewable in reviewables if reviewable['resourcetype'] == 'phone'])
            Reviewable.objects.filter(pk__in=reviewables_set).update(owner_id=instance.id)
            
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    
    @action(methods=['patch'], detail=True)
    def avatar(self, request, *args, **kwargs):
        user = self.get_object()
        current_image = user.avatar
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
        user.avatar = data['avatar']
        user.save()
        image_processing(user.avatar, current_image, 300, 300)
        return Response(AccountSerializer(user, context={'request':request}).data, status=200)
        

    

    
        