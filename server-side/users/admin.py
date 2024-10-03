from django.contrib import admin
from .models import User

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'password', 'email', 'first_name', 'last_name',
                  'is_candidate', 'is_company', 'profession', 'city', 'country', 
                  'profile_picture', 'cv', 'company_name', 'company_description', 
                  'company_website', 'company_logo')

# Register your models here.
admin.site.register(User, CustomUserAdmin)