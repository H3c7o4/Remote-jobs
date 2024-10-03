from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Champ commun pour tous les utilisateurs
    is_company = models.BooleanField(default=False)

    # Champs pour les candidats
    profession = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    cv = models.FileField(upload_to='cvs/', null=True, blank=True)

    # Champs pour les entreprises
    company_name = models.CharField(max_length=255, null=True, blank=True)
    company_description = models.TextField(null=True, blank=True)
    company_website = models.URLField(null=True, blank=True)
    company_logo = models.ImageField(upload_to='company_logos/', null=True, blank=True)

    def __str__(self):
        return self.username
