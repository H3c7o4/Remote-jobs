from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, is_superuser=False, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not first_name:
            raise ValueError('Users must have a first name')
        if not last_name:
            raise ValueError('Users must have a last name')
        
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            is_superuser=is_superuser
        )
        user.set_password(password)  # Assure que le mot de passe est haché
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, first_name, last_name, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password
        )
        
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True  # Assurer que le superutilisateur est actif
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_deactivated = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False) 
    updated_at = models.DateTimeField(auto_now=True)
    cover_image = models.ImageField(upload_to='images/', null=True, blank=True, default='default-banner.jpg')
    profile_pic = models.ImageField(upload_to='images/', null=True, blank=True, default='default-profilepic.png')
    profession = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(null=True, blank=True, default="Tell us about yourself.")
    phone_number = models.CharField(max_length=255, null=True, blank=True, default="+1 123 456 7890")
    website = models.URLField(null=True, blank=True, default="https://example.com")
    created_at = models.DateTimeField(auto_now_add=True)
    skills = models.TextField(null=True, blank=True)
    resume = models.FileField(upload_to='files/', null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    last_login = models.DateTimeField(null=True, blank=True)  # Ajout d'un champ pour la dernière connexion

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.first_name

    def get_skills(self):
        return self.skills.split(",") if self.skills else []

    def set_skills(self, skills_list):
        self.skills = ",".join(skills_list)
