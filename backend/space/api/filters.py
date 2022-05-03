from django_filters import rest_framework as filters

from ..models import Place

class PlaceFilter(filters.FilterSet):
    space = filters.UUIDFilter(field_name="space",lookup_expr="uuid")
    
    class Meta:
        model = Place
        fields = ['space']
        
    