from django.db import models
from user_Manager.models import User
# Create your models here.


class Days(models.Model):
    day= models.CharField(max_length=10)
    def __unicode__(self):
        return self.day


class Shows(models.Model):
    show_name = models.CharField(max_length=200)
    show_pict = models.ImageField(upload_to="Shows")
    about = models.TextField()
    participants = models.ManyToManyField(User,related_name="announcers")
    starts = models.TimeField()
    ends = models.TimeField()
    day = models.ManyToManyField(Days,null=True,related_name="days")
    
    class Meta:
        verbose_name_plural='Shows' 
        
        
    def __unicode__(self):
        return self.show_name
    def get_hours(self):
        return ('%s') % (self.starts)
    def get_participants(self):
        return self.participants
    def get_days(self):
        return self.day

