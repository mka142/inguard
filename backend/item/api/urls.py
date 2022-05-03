from rest_framework import routers

from .views import ItemViewSet

router = routers.SimpleRouter()
router.register(r'item',ItemViewSet)

urlpatterns = router.urls
