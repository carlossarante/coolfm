# -*- coding: utf-8 -*-

'''
Created on Jan 21, 2014

@author: Carlos
'''
from django.template.defaultfilters import removetags
from django.utils.html import strip_tags
from news_Manager.models import Post
import re, HTMLParser


def serialize_post(post,category):
    data = {
            'id': post.id,
            'title':post.title,
            'slug':post.slug,
            'lid':getLid(post.content),
            'date_posted':("%s-%s-%s %s:%s ") % (post.date_posted.day,post.date_posted.month,post.date_posted.year,post.date_posted.hour,post.date_posted.minute),
            'content':removetags(post.content,'preview'),
            'category':category.suptag,
            'picture':getPictures(post)
            }
    return data

def getPictures(post):
    pictures = post.images_set.all()
    data = []
    if pictures:
        for pic in pictures:
            data.append(pic.img.name) 
    else:
        data.append("/post_images/cool-logo.png")
    return data

def removeHTML(content):
  content = strip_tags(content)
  return content

def setLid(posts):
    for p in posts:
        p.lid = getLid(p.content)
    return posts

def getLid(content):
    try:
        lid = re.search('(.*)</preview>',content).group()
        return removetags(lid,'preview')
    except:
        return content [:100]