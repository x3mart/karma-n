from checks.models import Check
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from djoser.views import UserViewSet
from rest_framework.decorators import action
from django.core import serializers
from services.models import Service
from services.serializers import ServiceSerializer
from .serializers import AccountSerializer
from .models import Account

# Create your views here.
class AccountViewSet(UserViewSet):
    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.prefetch_related('services')
        return qs.exclude(email='AnonymousUser')
    
    @action(methods=['PATCH', 'DELETE', 'GET'], detail=False)
    def services(self, request, *args, **kwargs):
        service = request.data.get('service')
        user = request.user
        service = Service.objects.filter(pk=service).first()
        if request.method == 'PATCH':    
            user.services.add(service)
        if request.method == 'DELETE':    
            user.services.remove(service)
        services = user.services.values('id', 'title')
        return Response(services, status=200)

        