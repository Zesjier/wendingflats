from django.urls import path

from . import views

app_name = 'nv'

urlpatterns = [
    path('', views.index, name='index'),
]