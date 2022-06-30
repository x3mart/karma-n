# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from notifications.serializers import MessageSerializer
from reviewables.serializers import ReviewablePolymorphicSerializer
from reviews.serializers import ReviewSerializer
from services.serializers import ServiceSerializer
from accounts.models import Account
from django.db.models import fields
from djoser.serializers import UserSerializer
from phonenumber_field.serializerfields import PhoneNumberField
from reviews.models import UserCustomerAttributeAvgValue, UserExecutorAttributeAvgValue

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['is_staff'] = user.is_staff
#         token['is_student'] = user.is_student
#         token['is_teacher'] = user.is_teacher
#         return token
class UserCustomerAttributeAvgSerializer(serializers.ModelSerializer):
    title = serializers.StringRelatedField(read_only=True, many=False)
    class Meta:
        model = UserCustomerAttributeAvgValue
        fields = ('id', 'value', 'title')

class UserExecutorAttributeAvgSerializer(serializers.ModelSerializer):
    title = serializers.StringRelatedField(read_only=True, many=False)
    class Meta:
        model = UserExecutorAttributeAvgValue
        fields = ('id', 'value', 'title')

class AccountListSerializer(UserSerializer):
    class Meta:
        model = Account
        fields = ['id', 'name', 'full_name', 'avatar', 'executor_rating', 'customer_rating', 'my_reviews_about_customers_count', 'my_reviews_about_executors_count', 'reviews_executors_about_me_count', 'reviews_customers_about_me_count']


class AccountSerializer(UserSerializer):
    reviewables = ReviewablePolymorphicSerializer(many=True)
    services = ServiceSerializer(many=True)
    users_customer_attributes_avg = UserCustomerAttributeAvgSerializer(many=True, read_only=True)
    users_executor_attributes_avg = UserExecutorAttributeAvgSerializer(many=True, read_only=True)
    class Meta:
        model = Account
        exclude = ['password', 'is_superuser', 'is_staff', 'groups', 'user_permissions', 'is_active', 'is_private'] 


class CurentAcountSerializer(AccountSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    reviewables = ReviewablePolymorphicSerializer(many=True, read_only=True)
    users_customer_attributes_avg = UserCustomerAttributeAvgSerializer(many=True, read_only=True)
    users_executor_attributes_avg = UserExecutorAttributeAvgSerializer(many=True, read_only=True)
    class Meta:
        model = Account
        exclude = ['is_superuser', 'is_staff', 'groups', 'user_permissions']
        extra_kwargs = {'password': {'write_only': True}, }


class AvatarSerializer(serializers.Serializer):
    avatar = serializers.ImageField()
