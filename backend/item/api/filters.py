from django_filters import rest_framework as filters

from ..models import Item

class ItemFilter(filters.FilterSet):
    place = filters.UUIDFilter(field_name="place",lookup_expr="uuid")
    space = filters.UUIDFilter(field_name="place",lookup_expr="space__uuid")
    class Meta:
        model = Item
        fields = ['place']
        
    