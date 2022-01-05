from django.urls import path
from .views import get_code, check_code, vk_handler


urlpatterns = [
    path('getcode/', get_code, name='getcode'),
    path('checkcode/', check_code, name='checkcode'),
    path('vkhandler/', vk_handler, name='vkhandler'),
]
