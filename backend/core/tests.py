from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Animal
import datetime

class AnimalModelTest(TestCase):
    """Tests sur le modèle Animal"""

    def setUp(self):
        self.animal = Animal.objects.create(
            name='Rex',
            species='chien',
            age=3,
            status='disponible',
        )

    def test_animal_creation(self):
        """Un animal est bien créé avec les bons champs"""
        self.assertEqual(self.animal.name, 'Rex')
        self.assertEqual(self.animal.species, 'chien')
        self.assertEqual(self.animal.status, 'disponible')

    def test_animal_str(self):
        """La représentation string est correcte"""
        self.assertEqual(str(self.animal), 'Rex (chien)')

    def test_default_status(self):
        """Le statut par défaut est disponible"""
        animal = Animal.objects.create(name='Mimi', species='chat', age=2)
        self.assertEqual(animal.status, 'disponible')


class AnimalAPITest(TestCase):
    """Tests sur les endpoints de l'API"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        # Récupère le token JWT
        response = self.client.post('/api/auth/login/', {
            'username': 'testuser',
            'password': 'testpass123',
        })
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        self.animal = Animal.objects.create(
            name='Rex', species='chien', age=3, status='disponible'
        )

    def test_get_animals_list(self):
        """On peut récupérer la liste des animaux"""
        response = self.client.get('/api/animals/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_animal(self):
        """On peut créer un animal"""
        data = {'name': 'Mimi', 'species': 'chat', 'age': 2, 'status': 'disponible'}
        response = self.client.post('/api/animals/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Mimi')

    def test_delete_animal(self):
        """On peut supprimer un animal"""
        response = self.client.delete(f'/api/animals/{self.animal.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_unauthenticated_access(self):
        """Un utilisateur non connecté ne peut pas accéder à l'API"""
        self.client.credentials()
        response = self.client.get('/api/animals/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_adoption_stats(self):
        """Les stats d'adoption sont accessibles"""
        Animal.objects.create(
            name='Buddy', species='chien', age=4,
            status='adopte', adoption_date=datetime.date.today()
        )
        response = self.client.get('/api/stats/adoptions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_adoptions', response.data)
        self.assertIn('adoptions_ce_mois', response.data)


class AuthAPITest(TestCase):
    """Tests sur l'authentification"""

    def setUp(self):
        self.client = APIClient()

    def test_register(self):
        """On peut créer un compte"""
        response = self.client.post('/api/auth/register/', {
            'username': 'newuser',
            'email': 'new@test.com',
            'password': 'testpass123',
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        """On peut se connecter et obtenir un token"""
        User.objects.create_user(username='testuser', password='testpass123')
        response = self.client.post('/api/auth/login/', {
            'username': 'testuser',
            'password': 'testpass123',
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_wrong_password(self):
        """Un mauvais mot de passe est refusé"""
        User.objects.create_user(username='testuser', password='testpass123')
        response = self.client.post('/api/auth/login/', {
            'username': 'testuser',
            'password': 'wrongpassword',
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)