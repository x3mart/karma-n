from django.db.models.query import Prefetch
from rest_framework import viewsets
from rest_framework.response import Response
from services.models import Service, ServiceCategory
from services.serializers import ServiceCategorySerializer

# Create your views here.
class ServiseCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.filter(is_active=True)
    serializer_class = ServiceCategorySerializer

    def get_queryset(self):
        services = Service.objects.filter(is_active=True)
        prefetch_services = Prefetch('services', services)
        return ServiceCategory.objects.filter(is_active=True).prefetch_related(prefetch_services)
    
    def create(self, request):
        serializer = ServiceCategorySerializer(data=request.data)
        service = self.request.data.get('service')
        if serializer.is_valid():
            data = serializer.validated_data
        else:
            return Response(serializer.errors,status=400)
        category = ServiceCategory.objects.create(**data)
        if service:
            service = Service.objects.create(title=service, category=category)
        return Response(ServiceCategorySerializer(category).data, status=201)
    
    def perform_update(self, serializer):
        service = self.request.data.get('service')
        if service:
            service = Service.objects.create(title=service, category=self)
        return super().perform_update(serializer)
    
    