from rest_framework import serializers

from services.models import Service, ServiceCategory



class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        exclude = ('is_active',)
        # extra_kwargs = {'category': {'write_only': True}, }


class ServiceCategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    class Meta:
        model = ServiceCategory
        exclude = ('is_active',)
