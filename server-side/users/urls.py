from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('exists/', views.check_username_exists, name='check_username_exists'),
    path('home/', views.home, name='home'),
    path('user/', views.UserViewSet.as_view({'get': 'list'}), name='user-list'),
]