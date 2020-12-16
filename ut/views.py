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
  context['businessname'] = 'Coyote Kettle'
  context['openhour'] = RAND_TIME.format(start = 5, end = 11)
  context['closehour'] = RAND_TIME.format(start = 14, end = 2)

  return render(request, 'ut/business.html', context)


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