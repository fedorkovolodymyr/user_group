from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import GroupViewSet, UserViewSet

router = DefaultRouter()
router.register('group', GroupViewSet, basename='group')
router.register('user', UserViewSet, basename='user')

urlpatterns = router.urls
