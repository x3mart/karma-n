from rest_framework.routers import DefaultRouter

from services.views import ServiсeCategoryViewSet, ServiсeViewSet

urlpatterns = []
router = DefaultRouter()
router.register(r'servicecategories', ServiсeCategoryViewSet, basename='servicecategory')
router.register(r'services', ServiсeViewSet, basename='service')
urlpatterns += router.urls