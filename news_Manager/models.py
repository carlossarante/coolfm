from django.db import models
from django.utils import timezone




# Create your models here
class Categories(models.Model):
    suptag = models.CharField(max_length=140)
    class Meta:
        verbose_name_plural='Categories'
    def __unicode__(self):
        return self.suptag

class Post(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(unique=True)
    date_posted = models.DateTimeField(default=timezone.now())
    content = models.TextField()
    is_published = models.BooleanField(default=True)
    category= models.ForeignKey(Categories,null=True)
    reads = models.BigIntegerField(default=0)

    def __unicode__(self):
        return self.title
    def get_votes(self):
        return self.reads
    def getCategory(self):
        return self.category

class Images(models.Model):
    post = models.ForeignKey(Post)
    img = models.ImageField(upload_to='post_images')
