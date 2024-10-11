from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

user = get_user_model()

class UserCreateSerializer(BaseUserCreateSerializer):
    profile_pic = serializers.ImageField(required=False, allow_null=True)
    cover_image = serializers.ImageField(required=False, allow_null=True)
    resume = serializers.FileField(required=False, allow_null=True)

    class Meta(BaseUserCreateSerializer.Meta):
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'profile_pic', 'cover_image', 'resume')

    def create(self, validated_data):
        return super().create(validated_data)

class UserSerializer(BaseUserSerializer):
    profile_pic = serializers.ImageField(required=False, allow_null=True)
    cover_image = serializers.ImageField(required=False, allow_null=True)
    resume = serializers.FileField(required=False, allow_null=True)

    # Ajoutez les SerializerMethodFields pour les URLs complètes
    profile_pic_url = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()

    class Meta(BaseUserCreateSerializer.Meta):
        fields = [
            'id', 'email', 'first_name', 'last_name', 'is_active', 'is_deactivated', 'is_superuser',
            'is_staff', 'updated_at', 'cover_image', 'profile_pic', 'profile_pic_url', 'cover_image_url',
            'profession', 'bio', 'phone_number', 'website', 'created_at', 'skills', 'resume', 'location', 'last_login'
        ]

    def get_profile_pic_url(self, obj):
        request = self.context.get('request')
        if obj.profile_pic:
            return request.build_absolute_uri(obj.profile_pic.url)
        return request.build_absolute_uri('/static/images/default-profilepic.png')

    def get_cover_image_url(self, obj):
        request = self.context.get('request')
        if obj.cover_image:
            return request.build_absolute_uri(obj.cover_image.url)
        return request.build_absolute_uri('/static/images/default-banner.jpg')

    def validate(self, attrs):
        validated_attr = super().validate(attrs)
        email = validated_attr.get('email')

        try:
            user_instance = user.objects.get(email=email)
        except user.DoesNotExist:
            raise ValidationError('User not found.')

        if user_instance.is_deactivated:
            raise ValidationError('Account deactivated.')

        if not user_instance.is_active:
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
