import requests
from django.conf import settings

FINDWORK_API_URL = 'https://findwork.dev/api/jobs/'

def fetch_jobs(search=None, location=None, date_posted=None):
    headers = {
        'Authorization': f'Token {settings.FINDWORK_API_TOKEN}',
    }
    
    params = {}
    if search:
        params['search'] = search
    if location:
        params['location'] = location
    if date_posted:
        params['date_posted'] = date_posted

    response = requests.get(FINDWORK_API_URL, headers=headers, params=params)
    
    if response.status_code == 200:
        return response.json()['results']
    else:
        response.raise_for_status()