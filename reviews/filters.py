from django_filters import rest_framework as filters
from .models import Review


class ReviewFilter(filters.FilterSet):
    # phone_number = filters.CharFilter(field_name="phone__phone_number", lookup_expr='contain')
    # max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Review
        fields = ['about_customer']