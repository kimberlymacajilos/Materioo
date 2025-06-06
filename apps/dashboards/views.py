from django.views.generic import TemplateView
from web_project import TemplateLayout
from django.http import JsonResponse
from django.db.models import Count
from django.db.models.functions import ExtractYear
from .models import Album, Artist


"""
This file is a view controller for multiple pages as a module.
Here you can override the page view layout.
Refer to dashboards/urls.py file for more pages.
"""


class DashboardsView(TemplateView):
    # Predefined function
    def get_context_data(self, **kwargs):
        # A function to init the global layout. It is defined in web_project/__init__.py file
        context = TemplateLayout.init(self, super().get_context_data(**kwargs))

        return context
    
def albums_over_time(request):
    data = (
        Album.objects
        .annotate(year=ExtractYear('release_date'))
        .values('year')
        .annotate(count=Count('id'))
        .order_by('year')
    )
    return JsonResponse({
        'years': [entry['year'] for entry in data],
        'counts': [entry['count'] for entry in data]
    })

def album_type_distribution(request):
    data = (
        Album.objects
        .values('album_type')
        .annotate(count=Count('id'))
        .order_by('album_type')
    )
    return JsonResponse({
        'labels': [entry['album_type'] for entry in data],
        'counts': [entry['count'] for entry in data]
    })

def awards_by_album(request):
    data = (
        Album.objects
        .annotate(award_count=Count('awards'))
        .values('title', 'award_count')
        .order_by('-award_count')
    )
    return JsonResponse({
        'titles': [entry['title'] for entry in data],
        'counts': [entry['award_count'] for entry in data]
    })

def awards_by_artist(request):
    data = (
        Artist.objects
        .annotate(award_count=Count('albums__awards'))
        .values('name', 'award_count')
        .order_by('-award_count')
    )

    return JsonResponse({
        'artists': [entry['name'] for entry in data],
        'counts': [entry['award_count'] for entry in data]
    })

def albums_by_artist(request):
    artists_data = (
        Artist.objects.annotate(album_count=Count('albums'))
        .order_by('-album_count')
    )

    artists = [artist.name for artist in artists_data]
    counts = [artist.album_count for artist in artists_data]

    return JsonResponse({'artists': artists, 'counts': counts})