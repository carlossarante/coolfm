'''
Created on Dec 29, 2013

@author: MELISSA
'''
from django.conf.urls import patterns, include, url
# Uncomment the next two lines to enable the admin:
#from django.contrib import admin
#admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'news_Manager.views.newsLoader'), 
    url(r'^images/$','news_Manager.views.setImages'), 
	url(r'^top/$','news_Manager.views.getLastestNewsByCategory'),    
    url(r'^sections/$','news_Manager.views.getCategories'),
    url(r'^search/(?P<cat>\w+)/$','news_Manager.views.search'),
  	url(r'^search/$','news_Manager.views.search'),
    url(r'^section/((?P<category>\w+))/$','news_Manager.views.newsByCategory'),
    url(r'^(?P<slug>[a-z0-9-]+)/$','news_Manager.views.getNewsBySlug'),
)
