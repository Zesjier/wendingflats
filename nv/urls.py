from django.urls import path

from . import views

app_name = 'nv'

urlpatterns = [
    path('', views.index, name='index'),
    path('gallery', views.gallery, name='gallery'),
    path('games', views.games, name='games'),
    path('rec', views.rec, name='rec'),
    path('dining', views.dining, name='dining'),
    path('stays', views.stays, name='stays'),
]