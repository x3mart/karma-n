from checks.models import Check
from rest_framework.views import APIView
from rest_framework.response import Response
from djoser.views import UserViewSet
from rest_framework.decorators import action
from .serializers import AccountSerializer
from .models import Account

# Create your views here.
class AccountViewSet(UserViewSet):
    def get_queryset(self):
        qs = super().get_queryset()
        return qs.exclude(email='AnonymousUser')

        