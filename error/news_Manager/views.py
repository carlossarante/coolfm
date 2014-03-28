from django.core.paginator import Paginator,EmptyPage
from django.db.models import Q
from django.http import HttpResponseRedirect,HttpResponse
from django.shortcuts import render_to_response,RequestContext,render
from django.template import Library
from django.template.loader import  render_to_string
from django.utils import simplejson as json
from django.views.decorators.cache import never_cache
from schedules.functions import querysetToArray
from news_Manager.functions import removeHTML,serialize_post
from news_Manager.models import *

def newsLoader(request,page_num=1):
  return render_to_response('index.html')

def getNewsBySlug(request,id,slug):
  try:
  post = Post.objects.get(Q(id=id) and Q(slug=slug))
  return HttpResponse(json.dumps(post),mimetype='application/json')

def getMultiplePostPicture(posts):
  for news in posts:
    news.picture = querysetToArray(Images.objects.filter(post=news))
  return posts

def getPostPicture(post):
  post.picture = Images.objects.filter(post=post)
  return serializepost

def setTemplate(recent_news_list):
  for i in xrange(0,len(recent_news_list)):
    if i<2:
      recent_news_list[i].first=True #If the post belongs to the first column, the class "recientes1" is assigned.
    else:
      recent_news_list[i].first=False
    recent_news_list[i].content=removeHTML(recent_news_list[i].content)
    getPostPicture(recent_news_list[i])
  return recent_news_list

@never_cache
def newsPage(request,category=None,pagindex=1):
  #return HttpResponse("%s %s" % (pagindex,category))
  categories = Categories.objects.all()
  recent_news_list=[]
  other_news_list = []
  most_read = Post.objects.filter().order_by('reads')[3]
  if (category is None):
    recent_news_list = Post.objects.all().order_by('-date_posted')[:5]
    other_news_list = Post.objects.all().order_by('-date_posted')[5:]
    pags = Paginator(other_news_list,3)
    recent_news_list = setTemplate(recent_news_list)
    other_news_list = pags.page(pagindex).object_list
    #return HttpResponse(other_news_list)
    other_news_list=getMultiplePostPicture(other_news_list)
    return HttpResponse(render_to_response('novelles.html',{'recent_news_list':recent_news_list,'other_news_list':other_news_list,'most_read':most_read,'categories':categories,'page':pagindex,'last_page':pagindex-1,'next_page':pagindex+1}))
  else:
    cat = Categories.objects.get(suptag=category)
    posts = querysetToArray(Post.objects.filter(category=cat).order_by('-date_posted'))
    recent_news_list = posts[0]
    other_news_list = posts[0:]
    pags = Paginator(other_news_list,3)
    other_news_list = pags.page(pagindex)
    #other_news_list=getMultiplePostPicture(other_news_list)
    data = []    
    data.append(serialize_post(recent_news_list,recent_news_list.category))
    for p in other_news_list:
      data.append(serialize_post(p,p.category))
    return HttpResponse(json.dumps(data),mimetype='application/json')




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
  results = Post.objects.filter(Q(title__icontains=txt_to_find) | Q(content__icontains=txt_to_find)).order_by('-date_posted')[:10]
  #return HttpResponse(page)
  data = []
  for post in results:
    cat = Categories.objects.get(suptag=post.category)
    data.append(serialize_post(post,cat))
  if not data:
    return HttpResponse("{}")
  else:
    return HttpResponse(json.dumps(data),mimetype='application/json')

