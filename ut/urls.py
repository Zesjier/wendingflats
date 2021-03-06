from django.urls import path

from . import views

app_name = 'ut'

urlpatterns = [
    path('', views.index, name='index'),
    path('business/<str:businessname>', views.business, name='business'),
    path('quiz', views.quiz, name='quiz'),
    path('sidhe/<str:nonsense>', views.badlink, name='badlink'),
    path('reviews/<str:businessname>', views.yelp, name='yelp'),
    path('missing', views.missing, name='missing'),
    path('blotter', views.blotter, name='blotter'),
    path('history', views.history, name='history'),
    path('place/<str:place>', views.whattodo, name='place'),
]