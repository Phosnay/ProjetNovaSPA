from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.utils import timezone
from .models import Animal
from .serializers import AnimalSerializer, UserSerializer

class AnimalViewSet(viewsets.ModelViewSet):
    """
    CRUD complet pour les animaux du refuge.
    Toutes les actions nécessitent d'être authentifié.
    """
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [permissions.IsAuthenticated]

class RegisterView(generics.CreateAPIView):
    """
    Création d'un nouveau compte utilisateur.
    Accessible sans authentification.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def adoption_stats(request):
    """
    Retourne le nombre d'adoptions du mois en cours
    et le total depuis le début.
    """
    now = timezone.now()
    this_month = Animal.objects.filter(
        status='adopte',
        adoption_date__year=now.year,
        adoption_date__month=now.month
    ).count()
    total = Animal.objects.filter(status='adopte').count()

    return Response({
        'adoptions_ce_mois': this_month,
        'total_adoptions': total,
    })