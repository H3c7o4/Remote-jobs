from django.urls import path
from .views import JobListView, LikeJobView, LikedJobListView, UnlikeJobView

urlpatterns = [
    path('jobs/', JobListView.as_view(), name='job-list'),
    path('jobs/like/', LikeJobView.as_view(), name='like-job'),
    path('jobs/liked/', LikedJobListView.as_view(), name='liked-jobs'),
    path('jobs/unlike/', UnlikeJobView.as_view(), name='unlike-job'),
]