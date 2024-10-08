from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

user = get_user_model()

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ('id', 'email', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        return super().create(validated_data)

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        # Ajoute tous les champs que tu souhaites inclure dans l'API
        fields = [
            'id', 'email', 'first_name', 'last_name', 'is_active', 'is_deactivated', 'is_superuser',
            'is_staff', 'updated_at', 'cover_image', 'profile_pic', 'profession', 'bio', 'phone_number',
            'website', 'created_at', 'skills', 'resume', 'location', 'last_login'
        ]

    def validate(self, attrs):
        validated_attr = super().validate(attrs)
        email = validated_attr.get('email')  # Correction ici

        try:
            user = user.objects.get(email=email)  # Correction ici
        except user.DoesNotExist:
            raise ValidationError('User not found.')

        if user.is_deactivated:
            raise ValidationError('Account deactivated.')

        if not user.is_active:
            raise ValidationError('Account not activated.')

        return validated_attr

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        obj = self.user
        data.update({
            'id': obj.id,
            'first_name': obj.first_name,
            'last_name': obj.last_name,
            'email': obj.email,
            'is_active': obj.is_active,
            'is_deactivated': obj.is_deactivated,
        })

        return data
