from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnimalViewSet, RegisterView, adoption_stats

router = DefaultRouter()
router.register(r'animals', AnimalViewSet, basename='animal')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('stats/adoptions/', adoption_stats, name='adoption-stats'),
]