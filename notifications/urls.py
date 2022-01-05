from django.urls import path
from .views import MessageList

urlpatterns = [
    # path('phones/<phone_number>/', PhoneDetail.as_view(), name='phone'),
    path('messages/', MessageList.as_view(), name='notifications'),
]