from rest_framework import viewsets,permissions

from .serializers import ItemSerializer
from .filters import ItemFilter

from ..models import Item

from api_utils.views import RequestInContextAPIView

class ItemViewSet(RequestInContextAPIView,viewsets.ModelViewSet):
    lookup_field = 'uuid'
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Item.objects.all()
    filterset_class = ItemFilter