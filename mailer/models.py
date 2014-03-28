from django.db import models
from django.utils import timezone


class Mails(models.Model):
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(default=timezone.now())
    