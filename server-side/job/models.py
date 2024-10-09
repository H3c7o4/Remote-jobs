from django.db import models
from django.conf import settings

# Create your models here.
class Job(models.Model):
    job_id = models.CharField(max_length=100, unique=True)
    role = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    company_num_employees = models.CharField(max_length=50, blank=True, null=True)
    location = models.CharField(max_length=255)
    remote = models.BooleanField(default=False)
    logo = models.URLField(blank=True, null=True)
    url = models.URLField()
    text = models.TextField()
    date_posted = models.DateTimeField()
    keywords = models.JSONField()

    def __str__(self):
        return self.role

class LikedJob(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job_id = models.CharField(max_length=100)  # ID de l'offre depuis l'API Findwork
    role = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    logo = models.URLField(blank=True, null=True)
    url = models.URLField()
    text = models.TextField()  # Garder uniquement le texte jusqu'à la première balise HTML
    date_posted = models.DateTimeField()

    def __str__(self):
        return f"{self.role} - {self.company_name} liked by {self.user.first_name}"