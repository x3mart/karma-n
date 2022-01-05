from rest_framework import serializers
from .models import Check


class GetCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Check
        exclude = ['attempt', 'time',]
        read_only_fields = ['code']

class CheckCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Check
        exclude = ['attempt', 'time',]
        # read_only_fields = ['code', 'phone']