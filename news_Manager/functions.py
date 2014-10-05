# -*- coding: utf-8 -*-
from django.utils.html import strip_tags
from django.template.defaultfilters import removetags
from django.shortcuts import render,HttpResponse
from django.core.paginator import Paginator

from news_Manager.serializers import PostSerializer
from news_Manager.models import Post

import json

def formatted_render(request,data):
  if request.GET.get('format','')=='json':
  	return HttpResponse(json.dumps(data),mimetype='application/json')
  else:
    return render(request,'home.html')

def paginationSerializer(request,queryset,page):
	data = {}
	post_pages = Paginator(queryset,10)
	posts = post_pages.page(page)
	data['count'] = post_pages.num_pages
	data['nouvelles'] = PostSerializer(posts.object_list,many=True).data
	if posts.has_next():
		data['next'] = posts.next_page_number()
	else:
		data['next'] = None
	if posts.has_previous():
		data['previous'] = posts.previous_page_number()
	else:
		data['previous'] = None
	return data
