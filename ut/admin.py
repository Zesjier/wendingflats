from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(QuizQuestion)
admin.site.register(QuizAnswer)
admin.site.register(Business)
admin.site.register(YelpReview)