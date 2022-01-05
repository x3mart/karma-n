from rest_framework.routers import DefaultRouter

from services.views import ServiseCategoryViewSet

urlpatterns = []
router = DefaultRouter()
router.register(r'servicecategories', ServiseCategoryViewSet, basename='servicecategory')
urlpatterns += router.urls