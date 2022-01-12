from django.urls import path
from .views import MessageViewSet
from rest_framework.routers import DefaultRouter

urlpatterns = []

router = DefaultRouter()

router.register(r'messages', MessageViewSet, basename='message')

urlpatterns += router.urls