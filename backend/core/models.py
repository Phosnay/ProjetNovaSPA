from django.db import models
from django.contrib.auth.models import User

class Animal(models.Model):
    SPECIES_CHOICES = [
        ('chien', 'Chien'),
        ('chat', 'Chat'),
        ('lapin', 'Lapin'),
        ('autre', 'Autre'),
    ]

    STATUS_CHOICES = [
        ('disponible', 'Disponible'),
        ('adopte', 'Adopté'),
        ('en_soin', 'En soin'),
    ]

    name = models.CharField(max_length=100)
    species = models.CharField(max_length=50, choices=SPECIES_CHOICES)
    breed = models.CharField(max_length=100, blank=True)
    age = models.PositiveIntegerField(help_text="Âge en années")
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='disponible')
    photo_url = models.URLField(blank=True)
    adoption_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.species})"

    class Meta:
        ordering = ['-created_at']