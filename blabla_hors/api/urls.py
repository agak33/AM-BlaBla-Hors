from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import SessionViewSet, RouteViewSet

router = DefaultRouter()
router.register(r"session", SessionViewSet, basename="Session")
router.register(r"route", RouteViewSet, basename="Route")

urlpatterns = [path("", include(router.urls))]
