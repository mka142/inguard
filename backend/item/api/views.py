from rest_framework import viewsets,permissions,mixins

from taggit.models import Tag

from .serializers import ItemSerializer,TagSerializer
from .filters import ItemFilter

from ..models import Item

from api_utils.views import RequestInContextAPIView

class ItemViewSet(RequestInContextAPIView,viewsets.ModelViewSet):
    lookup_field = 'uuid'
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Item.objects.all()
    filterset_class = ItemFilter
    
class TagsViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Tag.objects.all()