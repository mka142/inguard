from rest_framework import routers

from .views import ItemViewSet,TagsViewSet

router = routers.SimpleRouter()
router.register(r'item',ItemViewSet)
router.register(r'tag',TagsViewSet)

urlpatterns = router.urls
