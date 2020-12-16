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



class Business (models.Model):

    name = models.CharField(max_length=64)
    catagory = models.CharField(max_length=32, blank=True)

    text = models.TextField(blank=True)

    openhour = models.TextField(blank=True)
    closehour = models.TextField(blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.name


class YelpReview (models.Model):

    business = models.ForeignKey(Business, on_delete=models.CASCADE)

    by = models.CharField(max_length=64)
    score = models.IntegerField()
    text = models.TextField()

    def stars(self):
        return ("&#9733;" * self.score) + ("&#9734" * (5 - self.score))

    def __str__(self):
        return "{}...".format(self.text[:32])