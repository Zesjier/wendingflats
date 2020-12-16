from django.shortcuts import render
from ut.views import base_context as ut_base_context

def base_context(request):
    context = ut_base_context(request, 8, "Nevada")
    return context

# Create your views here.
def index(request):
    return render(request, 'nv/index.html', base_context(request))

def gallery(request):
    return render(request, 'nv/gallery.html', base_context(request))

def games(request):
    return render(request, 'nv/games.html', base_context(request))

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





