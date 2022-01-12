from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ReviewViewSet, CommentViewSet, LikeViewSet, ReviewTemplateList, AttributeTitleList



urlpatterns = [
    path('reviewtemplates/', ReviewTemplateList.as_view(), name='reviewtemplate'),
    path('attributetitles/', AttributeTitleList.as_view(), name='attributetitle'),
]

router = DefaultRouter()

router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'likes', LikeViewSet, basename='likes')

urlpatterns += router.urls
