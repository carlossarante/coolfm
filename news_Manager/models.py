from django.db import models
from django.utils import timezone
from user_Manager.models import User

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
    date_posted = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    is_published = models.BooleanField(default=True)
    category= models.ForeignKey(Categories,null=True)
    reads = models.BigIntegerField(default=0)   
    user = models.ForeignKey(User,default=1)

    def __unicode__(self):
        return self.title

    def get_absolute_url(self):
        return '/nouvelles/' + self.slug.lower()
    
    def get_votes(self):
        return self.reads
    
    def getBySlug(self,slug): 
        news = Post.objects.get(slug=slug)
        return [news,]

    def getNewsByCategory(self,category):
        cat = Categories.objects.get(suptag=category)
        news = cat.post_set.filter(is_published=True).order_by('-date_posted')
        return news

    def getLastestByCategory(self):
        categories = Categories.objects.all()
        news = []
        for cat in categories:
            post = cat.post_set.filter(is_published=True).order_by('-date_posted')
            if post:
                news.append(post[0])
        return news

    def getIndexPageNews(self,page=1):
        posts = Post.objects.filter(is_published=True).order_by('-date_posted')
        last_by_section = self.getLastestByCategory()
        news = []
        for p in posts:
            if p not in last_by_section:
                news.append(p)
        return news

    def getTopNews(self):
        posts = Post.objects.filter(is_published=True).order_by('-reads')[:3]

class Images(models.Model):
    post = models.ForeignKey(Post)
    img = models.ImageField(upload_to='post_images')
    def __unicode__(self):
        return '/media/%s' % self.img.name
    def img_thumbnail(self):
        if self.image:
            return u'<img src="%s" />' % self.image.url_125x125
        else:
            return 'No Image'
