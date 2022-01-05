from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ReviewViewSet, CommentViewSet, LikeViewSet, ReviewTemplateList



urlpatterns = [
    path('reviewtemplates/', ReviewTemplateList.as_view(), name='review_template'),
]

router = DefaultRouter()

router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'likes', LikeViewSet, basename='likes')
urlpatterns += router.urls
