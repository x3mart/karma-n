from djoser.views import UserViewSet
from djoser.conf import settings
from django.db.models import Prefetch
from rest_framework.decorators import action
from utils.images import image_processing
from rest_framework.response import Response
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
    
    def perform_destroy(self, instance):
        instance.reviewables.clear()
        return super().perform_destroy(instance)
    
    @action(methods=['path'], detail=True)
    def avatar(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
        user.avatar = data['avatar']
        user.save()
        image_processing(user.avatar, 300, 300)
        return Response(AccountSerializer(user, context={'request':request}), status=200)
        

    

    
        