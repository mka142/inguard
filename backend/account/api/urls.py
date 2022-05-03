from rest_framework import routers
from .views  import login_view,set_csrf_view,logout_view
from django.urls import path

router = routers.SimpleRouter()

urlpatterns = [
    path('set_csrf/',set_csrf_view),
    path('login/',login_view),
    path('logout/',logout_view)
]


urlpatterns += router.urls