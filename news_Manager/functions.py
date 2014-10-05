# -*- coding: utf-8 -*-
from django.utils.html import strip_tags
from django.template.defaultfilters import removetags
from django.shortcuts import render,HttpResponse

from news_Manager.serializers import PostSerializer
from news_Manager.models import Post

import json

def formatted_render(request,queryset):
  if request.GET.get('format','')=='json':
    ser_news = PostSerializer(queryset,many=True).data #Converted, to json.
    return HttpResponse(json.dumps(ser_news),mimetype='application/json')
  else:
    return render(request,'home.html')
