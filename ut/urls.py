from django.urls import path

from . import views

app_name = 'ut'

urlpatterns = [
    path('', views.index, name='index'),
    path('business/<str:businessname>', views.business, name='business'),
    path('quiz', views.quiz, name='quiz'),
    path('sidhe/<str:nonsense>', views.badlink, name='badlink'),
    path('reviews/<str:businessname>', views.yelp, name='yelp'),
]