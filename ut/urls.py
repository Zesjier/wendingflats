from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('business/<str:businessname>', views.business, name='business'),
    path('quiz', views.quiz, name='quiz'),
    path('sidhe/<str:nonsense>', views.badlink, name='badlink'),
]