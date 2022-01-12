from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer
from .models import Phone, VK, Instagram, Reviewable

class ReviewableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviewable
        fields = ('id', 'screen_name', 'customer_rating', 'executor_rating', 'owner' )


class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = ('id', 'screen_name', 'customer_rating', 'executor_rating', 'owner' )


class VKSerializer(serializers.ModelSerializer):
    class Meta:
        model = VK
        fields = ('id', 'screen_name', 'customer_rating', 'executor_rating', 'owner', 'user_id', 'user_type' )


class InstagramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instagram
        fields = ('id', 'screen_name', 'customer_rating', 'executor_rating', 'owner', 'user_id',)

class ReviewablePolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Phone: PhoneSerializer,
        VK: VKSerializer,
        Instagram: InstagramSerializer,
        Reviewable: ReviewableSerializer
    }