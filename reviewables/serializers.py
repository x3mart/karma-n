from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer
from reviews.models import ReviewableCustomerAttributeAvgValue, ReviewableExecutorAttributeAvgValue
from .models import Phone, Vk, Instagram, Reviewable

class ReviewableCustomerAttributeAvgSerializer(serializers.ModelSerializer):
    title = serializers.StringRelatedField(read_only=True, many=False)
    class Meta:
        model = ReviewableCustomerAttributeAvgValue
        fields = ('id', 'value', 'title')

class ReviewableExecutorAttributeAvgSerializer(serializers.ModelSerializer):
    title = serializers.StringRelatedField(read_only=True, many=False)
    class Meta:
        model = ReviewableExecutorAttributeAvgValue
        fields = ('id', 'value', 'title')


class ReviewableSerializer(serializers.ModelSerializer):
    reviewables_customer_attributes_avg = ReviewableCustomerAttributeAvgSerializer(many=True, read_only=True)
    reviewables_executor_attributes_avg = ReviewableExecutorAttributeAvgSerializer(many=True, read_only=True)

    class Meta:
        model = Reviewable
        fields = ('id', 'screen_name', 'customer_rating', 'executor_rating', 'reviewables_customer_attributes_avg', 'reviewables_executor_attributes_avg',  'owner' )


class PhoneSerializer(serializers.ModelSerializer):
    reviewables_customer_attributes_avg = ReviewableCustomerAttributeAvgSerializer(many=True, read_only=True)
    reviewables_executor_attributes_avg = ReviewableExecutorAttributeAvgSerializer(many=True, read_only=True)
    class Meta:
        model = Phone
        fields = ('id', 'screen_name', 'customer_rating', 'executor_rating', 'reviewables_customer_attributes_avg', 'reviewables_executor_attributes_avg',  'owner' )


class VKSerializer(serializers.ModelSerializer):
    reviewables_customer_attributes_avg = ReviewableCustomerAttributeAvgSerializer(many=True, read_only=True)
    reviewables_executor_attributes_avg = ReviewableExecutorAttributeAvgSerializer(many=True, read_only=True)
    class Meta:
        model = Vk
        fields = ('id', 'screen_name', 'customer_rating', 'executor_rating', 'reviewables_customer_attributes_avg', 'reviewables_executor_attributes_avg',  'owner', 'user_id', 'user_type' )


class InstagramSerializer(serializers.ModelSerializer):
    reviewables_customer_attributes_avg = ReviewableCustomerAttributeAvgSerializer(many=True, read_only=True)
    reviewables_executor_attributes_avg = ReviewableExecutorAttributeAvgSerializer(many=True, read_only=True)
    class Meta:
        model = Instagram
        fields = ('id', 'screen_name', 'customer_rating', 'executor_rating', 'reviewables_customer_attributes_avg', 'reviewables_executor_attributes_avg',  'owner', 'user_id',)

class ReviewablePolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Phone: PhoneSerializer,
        Vk: VKSerializer,
        Instagram: InstagramSerializer,
        Reviewable: ReviewableSerializer
    }