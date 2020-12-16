from django.shortcuts import render
from ut.views import base_context as ut_base_context

def base_context(request):
    context = ut_base_context(request, 8, "Nevada")
    return context

# Create your views here.
def index(request):
    return render(request, 'nv/index.html', base_context(request))
