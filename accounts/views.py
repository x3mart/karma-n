from checks.models import Check
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from djoser.views import UserViewSet
from djoser.conf import settings
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
        qs = qs.prefetch_related('services', 'reviewables')
        return qs.exclude(email='AnonymousUser')
    
    def get_serializer_class(self):
        if self.action == "create":
            if settings.USER_CREATE_PASSWORD_RETYPE:
                return settings.SERIALIZERS.user_create_password_retype
            return settings.SERIALIZERS.user_create
        elif self.action == "destroy" or (
            self.action == "me" and self.request and self.request.method == "DELETE"
        ):
            return settings.SERIALIZERS.user_delete
        elif self.action == "activation":
            return settings.SERIALIZERS.activation
        elif self.action == "resend_activation":
            return settings.SERIALIZERS.password_reset
        elif self.action == "reset_password":
            return settings.SERIALIZERS.password_reset
        elif self.action == "reset_password_confirm":
            if settings.PASSWORD_RESET_CONFIRM_RETYPE:
                return settings.SERIALIZERS.password_reset_confirm_retype
            return settings.SERIALIZERS.password_reset_confirm
        elif self.action == "set_password":
            if settings.SET_PASSWORD_RETYPE:
                return settings.SERIALIZERS.set_password_retype
            return settings.SERIALIZERS.set_password
        elif self.action == "set_username":
            if settings.SET_USERNAME_RETYPE:
                return settings.SERIALIZERS.set_username_retype
            return settings.SERIALIZERS.set_username
        elif self.action == "reset_username":
            return settings.SERIALIZERS.username_reset
        elif self.action == "reset_username_confirm":
            if settings.USERNAME_RESET_CONFIRM_RETYPE:
                return settings.SERIALIZERS.username_reset_confirm_retype
            return settings.SERIALIZERS.username_reset_confirm
        elif self.action == "me":
            return settings.SERIALIZERS.current_user
        elif self.action == "list":
            return settings.SERIALIZERS.users_list

        return self.serializer_class
    
    # @action(methods=['PATCH', 'DELETE', 'GET'], detail=False)
    # def services(self, request, *args, **kwargs):
    #     service = request.data.get('service')
    #     user = request.user
    #     service = Service.objects.filter(pk=service).first()
    #     if request.method == 'PATCH':    
    #         user.services.add(service)
    #     if request.method == 'DELETE':    
    #         user.services.remove(service)
    #     services = user.services.values('id', 'title')
    #     return Response(services, status=200)

        