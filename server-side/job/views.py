from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import LikedJob
from .services.findwork_api import fetch_jobs
from .utils import extract_text_before_html
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# Vue pour récupérer les offres et les "liker"
from rest_framework import status
from rest_framework.response import Response
from .models import Job

class JobListView(APIView):
    @permission_classes([IsAuthenticated])  # Seuls les utilisateurs authentifiés peuvent accéder
    def get(self, request):
        search = request.query_params.get('search', None)
        location = request.query_params.get('location', None)
        date_posted = request.query_params.get('date_posted', None)

        try:
            jobs = fetch_jobs(search=search, location=location, date_posted=date_posted)

            for job in jobs:
                # Remplacez `location` par "remote" si elle est `null`
                if job.get('location') is None:
                    job['location'] = 'remote'

                # Vérifiez si le job existe déjà dans la base de données
                job_instance, created = Job.objects.get_or_create(
                    job_id=job['id'],  # Assurez-vous d'utiliser l'ID fourni par l'API
                    defaults={
                        'role': job['role'],
                        'company_name': job['company_name'],
                        'location': job['location'],  # Ici, `location` sera toujours une chaîne valide
                        'remote': job.get('remote', False),
                        'logo': job.get('logo', ''),
                        'url': job['url'],
                        'text': extract_text_before_html(job['text']),
                        'date_posted': job['date_posted'],
                        'keywords': job.get('keywords', [])
                    }
                )
            # Traiter le champ "text" pour chaque job
            for job in jobs:
                job['text'] = extract_text_before_html(job['text'])

            return Response(jobs, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



class LikeJobView(APIView):
    @permission_classes([IsAuthenticated])  # Seuls les utilisateurs authentifiés peuvent accéder
    def post(self, request):
        user = request.user
        job_id = request.data.get('job_id')

        if not job_id:
            return Response({'error': 'job_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Vérifier si l'emploi existe dans la base de données
        try:
            job = Job.objects.get(job_id=job_id)
        except Job.DoesNotExist:
            return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'offre à la liste des likes de l'utilisateur
        liked_job, created = LikedJob.objects.get_or_create(
            user=user,
            job_id=job.job_id,
            defaults={
                'role': job.role,
                'company_name': job.company_name,
                'location': job.location,
                'logo': job.logo,
                'url': job.url,
                'text': extract_text_before_html(job.text),
                'date_posted': job.date_posted,
            }
        )

        if not created:
            return Response({'message': 'Job already liked'}, status=status.HTTP_200_OK)

        return Response({'message': 'Job liked successfully'}, status=status.HTTP_201_CREATED)


# Vue pour lister les jobs likés
@permission_classes([IsAuthenticated])  # Seuls les utilisateurs authentifiés peuvent accéder
class LikedJobListView(APIView):
    def get(self, request):
        user = request.user
        liked_jobs = LikedJob.objects.filter(user=user)
        data = [{
            'job_id': job.job_id,
            'role': job.role,
            'company_name': job.company_name,
            'location': job.location,
            'logo': job.logo,
            'url': job.url,
            'text': job.text,
            'date_posted': job.date_posted,
        } for job in liked_jobs]
        return Response(data, status=status.HTTP_200_OK)


class UnlikeJobView(APIView):
    @permission_classes([IsAuthenticated])  # Seuls les utilisateurs authentifiés peuvent accéder
    def post(self, request):
        user = request.user
        job_id = request.data.get('job_id')

        if not job_id:
            return Response({'error': 'job_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Vérifier si le like existe
        try:
            liked_job = LikedJob.objects.get(user=user, job_id=job_id)
            liked_job.delete()  # Supprimer le like
            return Response({'message': 'Job unliked successfully'}, status=status.HTTP_204_NO_CONTENT)
        except LikedJob.DoesNotExist:
            return Response({'message': 'Job not liked by this user'}, status=status.HTTP_404_NOT_FOUND)

