from django.shortcuts import render
from ut.views import base_context as ut_base_context
import random

def base_context(request):
    context = ut_base_context(request, 8, "Nevada")
    return context

# Create your views here.
def index(request):
    return render(request, 'nv/index.html', base_context(request))

def gallery(request):
    return render(request, 'nv/gallery.html', base_context(request))

def games(request):
    context = base_context(request)
    context['localtime'] = "7:00 PM"

    rand = random.random()
    date = 'June 11th, 2019'
    if rand < 0.2:
        date = 'June 7th, 2019'
    elif rand < 0.4:
        months = ['January', 'February', 'March', 'April', 'May', 'July', 'August', 'September', 'November', 'December']
        date = '{} 11th, 2019'.format(random.choice(months))
    elif rand < 0.6:
        date = 'December 21st, 2012'
    elif rand < 0.8:
        date = 'June 11th, 1972'
        context['past'] = 'True'
    context['localdate'] = date

    return render(request, 'nv/games.html', context)

def rec(request):
    return render(request, 'nv/rec.html', base_context(request))

def dining(request):
    return render(request, 'nv/dining.html', base_context(request))

def stays(request):
    return render(request, 'nv/stays.html', base_context(request))

def events(request):
    return render(request, 'nv/events.html', base_context(request))

def about(request):
    return render(request, 'nv/about.html', base_context(request))





