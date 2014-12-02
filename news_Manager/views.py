from django.views.decorators.cache import never_cache
from django.utils import simplejson as json
from django.http import HttpResponse
from django.core.paginator import Paginator,EmptyPage
from django.db.models import Q
from news_Manager.serializers import PostSerializer
from news_Manager.models import Post,Categories
from news_Manager.functions import formatted_render,paginationSerializer

def newsByCategory(request,category):
  query = request.GET.get('query','')
  if query == 'principals':
      news = Post().getNewsByCategory(str(category))[0]
      data = PostSerializer(news,many=False).data
  else:
      news = Post().getNewsByCategory(category)
      page = request.GET.get('page',1)
      data = paginationSerializer(request,news,page)
  return formatted_render(request,data)

def getNewsBySlug(request,slug):
  #import ipdb; ipdb.set_trace()
  news = Post().getBySlug(slug)
  count(request,news[0])
  data = PostSerializer(news,many=True).data
  return formatted_render(request,data)

def getLastestNewsByCategory(request):
  news = Post().getLastestByCategory()  
  data = PostSerializer(news,many=True).data
  return formatted_render(request,data)


def newsLoader(request):
  query = request.GET.get('query','principals')
  page = request.GET.get('page',1)
  if query =='principals':
    news = Post().getLastestByCategory()
    serialized_news = PostSerializer(news,many=True).data
  elif query == 'nouvelles':
    news = Post().getIndexPageNews()
    serialized_news = paginationSerializer(request,news,page)
  elif query == 'top':
    news = Post().getLastestByCategory()
    serialized_news = PostSerializer(news,many=True).data
  return formatted_render(request,serialized_news)
  

def getCategories(request):
  cat = []
  data = {}
  categories = Categories.objects.all()
  for c in categories:
    cat.append(c.suptag)
  data['categories'] = cat
  return formatted_render(request,data)

def count(request,post):
  try:
    if request.session['is_read_%s' % post.id]:
      return 
  except KeyError:
    request.session['is_read_%s' % post.id] = True
    post.reads +=1
    post.save()
    
def search(request):
  page = request.POST.get('page',1)
  txt_to_find = request.POST.get('keyword')
  if txt_to_find is not None:
    news = Post.objects.filter((Q(title__icontains=txt_to_find) | Q(content__icontains=txt_to_find)),Q(is_published=True))
    serialized_news = paginationSerializer(request,news,page)
  else:
    return formatted_render(request,{'keyword':('Error en la busqueda: Llego %s y valores %s' % (txt_to_find,request.POST))})
  return formatted_render(request,serialized_news)

