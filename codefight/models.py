from django.db import models
from accounts.models import User
from django.utils import timezone
#from django_random_queryset import RandomManager


class problem(models.Model):
    description = models.TextField(null=False, blank=False)
    input = models.TextField(null=False, blank=False)
    output = models.TextField(null=False, blank=False)


class Link(models.Model):

    user1 = models.ForeignKey(
        User, related_name="linkone", on_delete=models.CASCADE)
    user2 = models.ForeignKey(
        User, related_name="linktwo", on_delete=models.CASCADE)
    problem = models.ForeignKey(problem, on_delete=models.CASCADE)
    user1_active = models.BooleanField(default=False)
    user2_active = models.BooleanField(default=False)
    genration_time = models.DateTimeField(default=timezone.now)
    winner=models.CharField(max_length=255,default="TO BE DECLARED")


# Create your models here.
