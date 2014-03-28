'''
Created on Nov 27, 2013

@author: MELISSA
'''
from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
    url(r'^contact/$', 'mailer.views.subscribe_me'),
   )