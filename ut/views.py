from django.shortcuts import render
from .models import QuizQuestion

RAND_TIME = '<span class="randtime" data-start="{start}" data-end="{end}"></span>'

# Create your views here.
def index(request):
  return render(request, 'ut/index.html')


def business(request, businessname):

  context = {
    'businessname' : 'Coyote Kettle',
    'openhour': RAND_TIME.format(start = 5, end = 11),
    'closehour': RAND_TIME.format(start = 14, end = 2),
  }

  return render(request, 'ut/business.html', context)


def quiz(request):

  context = {
    'questions' : QuizQuestion.objects.all()
  }

  return render(request, 'ut/quiz.html', context)


def badlink(request, nonsense):
  return render(request, 'ut/badlink.html')