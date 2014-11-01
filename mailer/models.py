from django.db import models
from django.utils import timezone


class Requests(models.Model):
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(default=timezone.now())
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.BigIntegerField()
    messsage = models.TextField()