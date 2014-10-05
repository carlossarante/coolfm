from django.views.decorators.cache import never_cache
from django.utils import simplejson as json
from django.utils.safestring import mark_safe
from django.template import Library
from django.template.loader import  render_to_string
from django.template.defaultfilters import removetags
from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponseRedirect,HttpResponse
from django.core.paginator import Paginator,EmptyPage

from news_Manager.serializers import PostSerializer
from news_Manager.models import Post,Categories
from news_Manager.functions import formatted_render,paginationSerializer


def newsByCategory(request,category):
  news = Post().getNewsByCategory(category)
  data = PostSerializer(news).data
  return formatted_render(request,data)

def getNewsBySlug(request,slug):
  news = Post().getBySlug(slug)
  data = PostSerializer(news).data
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
    news = Post().getTopNews()
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

def count(request,post_slug):
  try:
      if(not request.session['read']):
        request.session['read'] = True
        post = Post.objects.get(slug=post_slug)
        post.reads +=1
        post.save()
      else:
        return HttpResponse("Already read")
      return HttpResponse("OK")
  except:
      return HttpResponse("404 NOT FOUND")

def search(request):
  txt_to_find = request.POST["keyword"]
  results = Post.objects.filter((Q(title__icontains=txt_to_find) | Q(content__icontains=txt_to_find)),Q(is_published=True)).order_by('-date_posted')[:10]
  #return HttpResponse(page)
  data = []
  for post in results:
    cat = Categories.objects.get(suptag=post.category)
    data.append(serialize_post(post,cat))
  if not data:
    return HttpResponse("{}")
  else:
    return HttpResponse(json.dumps(data),mimetype='application/json')


