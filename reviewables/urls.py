from django.urls import path
from .views import ReviewableDetachView



urlpatterns = [path('reviewables/<int:pk>/', ReviewableDetachView.as_view(), name='reviewable')]