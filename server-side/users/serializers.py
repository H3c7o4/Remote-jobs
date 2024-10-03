from djoser.serializers import UserCreateSerializer, UserSerializer
from .models import User

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name',
                  'is_candidate', 'is_company', 'profession', 'city', 'country', 
                  'profile_picture', 'cv', 'company_name', 'company_description', 
                  'company_website', 'company_logo']

class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'is_candidate', 'is_company', 'profession', 'city', 'country',
                  'profile_picture', 'cv', 'company_name', 'company_description',
                  'company_website', 'company_logo']
