from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import MyComplaintViewSet, AboutMeComplaintList

router = DefaultRouter()

router.register(r'my_complaints', MyComplaintViewSet, basename='my_complaint')

urlpatterns = [
    # path('phones/<phone_number>/', PhoneDetail.as_view(), name='phone'),
    path('complaints_about_me/', AboutMeComplaintList.as_view(), name='complaint_about_me'),
]

urlpatterns += router.urls