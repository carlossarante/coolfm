'''
Created on Jan 21, 2014

@author: Carlos
'''

from django.utils.html import strip_tags
from news_Manager.models import Post

def serialize_post(post,category):
    data = {
            'id': post.id,
            'title':post.title,
            'slug':post.slug,
            'date_posted':("%s-%s-%s %s:%s ") % (post.date_posted.day,post.date_posted.month,post.date_posted.year,post.date_posted.hour,post.date_posted.minute),
            'content':post.content,
            'category':category.suptag,
            'picture':getPictures(post)
            }
    return data

def getPictures(post):
    pictures = post.images_set.all()
    data = []
    for pic in pictures:
        data.append(pic.img.name) 
    return data

def removeHTML(content):
  content = strip_tags(content)
  return content

