from django.shortcuts import render
from .models import QuizQuestion, YelpReview
import datetime
import time
import random

RAND_TIME = '<span class="randtime" data-start="{start}" data-end="{end}"></span>'

def base_context(request, tz=7, state = "Utah"):
  context = {
    'localtime': datetime.datetime.now(datetime.timezone(-datetime.timedelta(hours=tz))).strftime("%I:%M %p"),
    'localdate': 'June 11, 2019',
    'rand' : random.random(),
    'state' : state,
  }
  return context


# Create your views here.
def index(request):
  return render(request, 'ut/index.html', base_context(request))


def business(request, businessname):

  context = base_context(request)

  if businessname == 'eat':
    context['openhour'] = RAND_TIME.format(start = 5, end = 11)
    context['closehour'] = RAND_TIME.format(start = 14, end = 2)

    return render(request, 'ut/dining.html', context)

  elif businessname == 'stay':
    return render(request, 'ut/stay.html', context)

  elif businessname == 'misc':
    return render(request, 'ut/misc.html', context)


def whattodo(request, place):

  context = base_context(request)

  if place == 'flats':
    return render(request, 'ut/flats.html', context)

  elif place == 'grave':
    return render(request, 'ut/grave.html', context)

  elif place == 'air' or place == 'base':
    return render(request, 'ut/air.html', context)


def quiz(request):

  context = base_context(request)
  context['questions'] = QuizQuestion.objects.all()

  return render(request, 'ut/quiz.html', context)


def badlink(request, nonsense):
  return render(request, 'ut/badlink.html', base_context(request))


def yelp(request, businessname):
  context = base_context(request)
  context['reviews'] = YelpReview.objects.filter(business__name = businessname)
  return render(request, 'ut/yelp.html', context)


def missing(request):
  return render(request, 'ut/missing.html', base_context(request))


def blotter(request):
  context = base_context(request)
  context['localdate'] = context['localdate'] if context['rand'] > 0.2 else 'June 11th, 1972'
  return render(request, 'ut/blotter.html', context)


def history(request):
  return render(request, 'ut/history.html', base_context(request))