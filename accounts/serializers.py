# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from notifications.serializers import MessageSerializer
from reviews.serializers import ReviewSerializer
from services.serializers import ServiceSerializer
from accounts.models import Account
from django.db.models import fields
from djoser.serializers import UserSerializer
from phonenumber_field.serializerfields import PhoneNumberField

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['is_staff'] = user.is_staff
#         token['is_student'] = user.is_student
#         token['is_teacher'] = user.is_teacher
#         return token


class AccountSerializer(UserSerializer):
    # reviews = ReviewSerializer(many=True, read_only=True)
    # phones = PhoneSerializer(many=True, read_only=True)
    # phone_number = PhoneNumberField(required=False)
    class Meta:
        model = Account
        exclude = ['is_superuser', 'is_staff', 'groups', 'user_permissions']
        extra_kwargs = {'password': {'write_only': True} }
    


class CurentAcountSerializer(AccountSerializer):
    # reviews = ReviewSerializer(many=True, read_only=True)
    # phones = PhoneSerializer(many=True, read_only=True)
    # reviews_about_me = serializers.SerializerMethodField(method_name='get_reviews_about_me')
    services = ServiceSerializer(many=True)
    class Meta:
        model = Account
        exclude = ['is_superuser', 'is_staff', 'groups', 'user_permissions']
        extra_kwargs = {'password': {'write_only': True}, }
