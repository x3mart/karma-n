from django.db.models.query import Prefetch
from rest_framework import viewsets, status
import django_filters.rest_framework
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from services.filters import CategoryFilter
from services.models import Service, ServiceCategory
from services.serializers import ServiceCategorySerializer, ServiceSerializer

# Create your views here.
class ServiсeCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.filter(is_active=True)
    filter_backend = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = CategoryFilter
    serializer_class = ServiceCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class=None

    def get_queryset(self):
        services = Service.objects.filter(is_active=True)
        prefetch_services = Prefetch('services', services)
        return ServiceCategory.objects.filter(is_active=True).prefetch_related(prefetch_services)
    
    def create(self, request):
        serializer = ServiceCategorySerializer(data=request.data)
        service = self.request.data.get('service', None)
        if serializer.is_valid():
            data = serializer.validated_data
        else:
            return Response(serializer.errors,status=400)
        
        category = ServiceCategory.objects.create(**data)
        if service:
            service = Service.objects.create(title=service, category=category)
            self.request.user.services.add(service)
        return Response(ServiceCategorySerializer(category).data, status=201)
    
    def perform_update(self, serializer):
        service = self.request.data.get('service', None)
        instance = serializer.save()
        if service:
            service, created = Service.objects.get_or_create(title=service, category=instance)
            self.request.user.services.add(service)

    def destroy(self, request, *args, **kwargs):
        services = self.get_object().services.filter(accounts=request.user)
        request.user.services.remove(*services)
        return Response(status=status.HTTP_204_NO_CONTENT)        
    

class ServiсeViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.filter(is_active=True).filter(category__is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        categories = ServiceCategory.objects.all()
        prefetch_categories = Prefetch('category', categories)
        return Service.objects.filter(is_active=True).filter(category__is_active=True).prefetch_related(prefetch_categories)
    
    def destroy(self, request, *args, **kwargs):
        service = self.get_object()
        request.user.services.remove(service)
        return Response(status=status.HTTP_204_NO_CONTENT)
