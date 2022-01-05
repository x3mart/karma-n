from django.contrib.auth import get_user_model
from rest_framework.routers import DefaultRouter
from .views import AccountViewSet

router = DefaultRouter()
router.register("users", AccountViewSet)

User = get_user_model()

urlpatterns = router.urls