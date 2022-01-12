import django_filters
from django.db.models.query import Prefetch
from .models import Service, ServiceCategory

class CategoryFilter(django_filters.FilterSet):
    account = django_filters.NumberFilter(method='account_filter', field_name='account')

    class Meta:
        model = ServiceCategory
        fields = ['account',]
    
    def account_filter(self, queryset, name, value):
        services = Service.objects.filter(is_active=True).filter(accounts__id=value)
        prefetch_services = Prefetch('services', services)
        return ServiceCategory.objects.filter(is_active=True).filter(services__accounts__id=value).prefetch_related(prefetch_services)

