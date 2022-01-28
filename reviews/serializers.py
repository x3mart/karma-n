from accounts.models import Account
from rest_framework import serializers
from reviewables.models import Reviewable
from reviewables.serializers import ReviewablePolymorphicSerializer
from services.serializers import ServiceCategorySerializer, ServiceSerializer
from .models import Attribute, AttributeTitle, Review, Comment, Like, ReviewTemplate
from phonenumber_field.serializerfields import PhoneNumberField


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'name']


class LikeSerializer(serializers.ModelSerializer):
    # owner = ownerSerializer(read_only=True, many=False)
    class Meta:
        model = Like
        fields = '__all__'
        depth = 0




class AttributeTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeTitle
        fields = '__all__'
        depth = 0


class AttributeSerializer(serializers.ModelSerializer):
    title = serializers.StringRelatedField(read_only=True, many=False)
    class Meta:
        model = Attribute
        exclude = ("review", "review_template")
        depth = 0



class CommentSerializer(serializers.ModelSerializer):
    count_likes = serializers.IntegerField(read_only=True)
    is_my_like = serializers.IntegerField(read_only=True,)
    is_my_dislike = serializers.IntegerField(read_only=True,)
    owner = OwnerSerializer(read_only=True, many=False)
    class Meta:
        model = Comment
        fields = ['id', 'body', 'is_my_like', 'is_my_dislike', 'owner', 'commented_review', 'count_likes',]
        depth = 0
        extra_kwargs = {'commented_review': {'write_only': True}, }


class ReviewSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(read_only=True, many=True,)
    is_my_like = serializers.IntegerField(read_only=True,)
    is_my_dislike = serializers.IntegerField(read_only=True,)
    owner = OwnerSerializer(read_only=True, many=False)
    attributes = AttributeSerializer(many=True, read_only=True)
    rating = serializers.DecimalField(read_only=True, max_digits=2, decimal_places=1)
    service = ServiceSerializer(many=False, read_only=True,)
    reviewable = ReviewablePolymorphicSerializer(many=False, read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'service', 'created_at', 'is_my_like', 'is_my_dislike', 'count_comments', 'count_likes', 'rating', 'attributes','owner', 'body', 'rating', 'comments', 'about_customer', 'reviewable']


class ReviewTemplateSerializer(serializers.ModelSerializer):
    attributes = AttributeSerializer(many=True, read_only=True)
    class Meta:
        model = ReviewTemplate
        fields = '__all__'
