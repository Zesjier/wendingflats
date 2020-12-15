from django.db import models

# Create your models here.

class QuizQuestion (models.Model):
    '''
    A class for representing a question in a quiz
    '''

    text = models.TextField()
    is_weird = models.BooleanField()
    index = models.IntegerField()

    def __str__(self):
        return "{}...".format(self.text[:32])



class QuizAnswer (models.Model):
    '''
    A class for representing an answer to a question in a quiz
    '''

    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
    text = models.TextField()
    is_correct = models.BooleanField()
    is_weird = models.BooleanField()

    def __str__(self):
        return "{}...".format(self.text[:32])



