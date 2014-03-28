from django.http import Http404
from django.core.paginator import Paginator,EmptyPage
from django.template.defaultfilters import removetags
from django.db.models import Q
from django.utils.safestring import mark_safe
from django.http import HttpResponseRedirect,HttpResponse
from django.shortcuts import render_to_response,RequestContext,render
from django.template import Library
from django.template.loader import  render_to_string
from django.utils import simplejson as json
from django.views.decorators.cache import never_cache
from schedules.functions import querysetToArray
from news_Manager.functions import removeHTML,serialize_post,setLid
from news_Manager.models import *

def newsLoader(request,page_num=1):
  return render_to_response('index.html',RequestContext(request))

def getPreviewPage(request,id):
  try:
    if request.user.is_admin:
        news = Post.objects.get(id=id)
        news.content = mark_safe(removetags(news.content,'preview'))
    return render_to_response('preview/preview.html',{'news':news})
  except: 
    raise

            

def getNewsBySlug(request,id,slug):
  try:
    a = request.POST['keyword']
    try:
      post = Post.objects.get(id=id)
      return HttpResponse(json.dumps(serialize_post(post,post.category)),mimetype='application/json')
    except ValueError:
      return HttpResponse("Not Available")
    count(request,post.slug)
  except:
    return newsPage(request)

def getMultiplePostPicture(posts):
  for news in posts:
    news.picture = querysetToArray(Images.objects.filter(post=news))
    if not news.picture:
      news.picture = "/post_images/cool-logo.png"
  return posts

def getPostPicture(post):
  post.picture = Images.objects.filter(post=post)
  return post

def setTemplate(recent_news_list):
  for i in xrange(0,len(recent_news_list)):
    if i<2:
      recent_news_list[i].first=True #If the post belongs to the first column, the class "recientes1" is assigned.
    else:
      recent_news_list[i].first=False
    recent_news_list[i].content=removeHTML(recent_news_list[i].content)
    getPostPicture(recent_news_list[i])
  return recent_news_list

def newsPage(request,category=None,pagindex=1):
  pagindex = int(pagindex)
  #return HttpResponse("%s %s" % (pagindex,category))
  categories = Categories.objects.all()
  recent_news_list=[]
  other_news_list = []
  most_read = Post.objects.filter(is_published=True).order_by('-reads')[:3]  
  if (category is None):
    recent_news_list = Post.objects.filter(is_published=True).order_by('-date_posted')[:5]
    other_news_list = Post.objects.filter(is_published=True).order_by('-date_posted')[6:]
    pags = Paginator(other_news_list,3)
    recent_news_list = setTemplate(recent_news_list)
    other_news_list = pags.page(pagindex).object_list
    #return HttpResponse(other_news_list)
    other_news_list=getMultiplePostPicture(other_news_list)
    data = []
   # return HttpResponse(other_news_list)
    try:
      a = request.POST['keyword']
      #raise("im here")
        #return HttpResponse(request.POST['keyword'])
      for r in recent_news_list:
        data.append(serialize_post(r,r.category)) 
      for o in other_news_list:
        data.append(serialize_post(o,o.category))
      for mr in most_read:
        data.append(serialize_post(mr,mr.category))
      data.append({'last':pags.num_pages})
      return HttpResponse(json.dumps(data),mimetype='application/json')
    except:
      #raise(ValueError)
      return render_to_response('novelles.html',{'recent_news_list':setLid(recent_news_list),'other_news_list':setLid(other_news_list),'most_read': setLid(most_read),'categories':categories,'page':pagindex,'last_page':pagindex-1,'next_page':pagindex+1,'last':pags.num_pages},RequestContext(request))
  else:
    cat = Categories.objects.get(suptag=category)
    posts = querysetToArray(Post.objects.filter(Q(category=cat),Q(is_published=True)).order_by('-date_posted'))
    recent_news_list = posts[0]
    other_news_list = posts[1:]
    pags = Paginator(other_news_list,3)
    other_news_list = pags.page(pagindex)
    other_news_list=getMultiplePostPicture(other_news_list)
    try:
      a = request.POST['keyword']
      data = []    
      data.append(serialize_post(recent_news_list,recent_news_list.category))
      for p in other_news_list:
        data.append(serialize_post(p,p.category))
      for mr in most_read:
        data.append(serialize_post(mr,mr.category))
      data.append({'last':pags.num_pages})
      return HttpResponse(json.dumps(data),mimetype='application/json')
    except:
      return render_to_response('seccion.html',{'recent_news_list':recent_news_list,'other_news_list':other_news_list,'most_read':most_read,'categories':categories,'page':pagindex,'last_page':pagindex-1,'next_page':pagindex+1,'last':pags.num_pages})

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


