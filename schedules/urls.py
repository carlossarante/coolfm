'''
Created on Dec 29, 2013

@author: MELISSA
'''
from django.conf.urls import patterns, include, url
# Uncomment the next two lines to enable the admin:
urlpatterns = patterns('',
    url(r'^$','schedules.views.get_schedule_exact'),
    #url(r'programs','schedules.views.get_schedule')
)

