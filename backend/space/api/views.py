from rest_framework import viewsets,permissions,filters

from .serializers import SpaceSerializer,PlaceSerializer
from .filters import PlaceFilter

from ..models import Space,Place



class SpaceViewSet(viewsets.ModelViewSet):
    lookup_field = 'uuid'
    serializer_class = SpaceSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Space.objects.all()
    
    
    #@action(detail=True)
    #def image(self,request,pk=None):
    #    space = self.get_object()
    #    return image_view(space,'image')
        

    
class PlaceViewSet(viewsets.ModelViewSet):
    lookup_field = 'uuid'
    serializer_class = PlaceSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Place.objects.all()
    filterset_class = PlaceFilter