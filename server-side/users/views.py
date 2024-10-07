from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def check_username_exists(request):
    email = request.data.get('email')  # Correction ici
    if not email:
        return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        User.objects.get(email=email)  # Utilisation de email au lieu de username
        return Response({'username_exists': True}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'username_exists': False}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    return Response({'detail': 'Welcome to Unity'}, status=status.HTTP_200_OK)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')  # Utilisation de email au lieu de username
        try:
            user = User.objects.get(email=email)
            if not user.is_active:
                return Response({'detail': 'Account not activated'}, status=status.HTTP_401_UNAUTHORIZED)
            if user.is_deactivated:
                return Response({'detail': 'Account deactivated'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

        return super().post(request, *args, **kwargs)
