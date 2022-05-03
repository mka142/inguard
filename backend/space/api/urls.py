from rest_framework import routers

from .views import SpaceViewSet,PlaceViewSet

router = routers.SimpleRouter()
router.register(r'space',SpaceViewSet)
router.register(r'place',PlaceViewSet)
urlpatterns = router.urls
