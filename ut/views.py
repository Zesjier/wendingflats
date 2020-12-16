from django.shortcuts import render
from .models import QuizQuestion
import datetime
import time

RAND_TIME = '<span class="randtime" data-start="{start}" data-end="{end}"></span>'

def base_context(request, tz=7, state = "Utah"):
  context = {
    'localtime': datetime.datetime.now(datetime.timezone(-datetime.timedelta(hours=tz))).strftime("%I:%M %p"),
    'localdate': 'June 11, 2019',
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