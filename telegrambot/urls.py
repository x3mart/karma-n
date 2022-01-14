from django.urls import path
from .views import tg_update_handler


urlpatterns = [
    path('tgupdatehandler/', tg_update_handler, name='getcode'),
]
