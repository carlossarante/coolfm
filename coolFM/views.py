'''
Created on Dec 29, 2013

@author: MELISSA
'''
from django.shortcuts import render_to_response,RequestContext
from django.http import HttpResponse
from django.utils import simplejson as json
from django.db.models import Q
from schedules.models import Shows
from news_Manager.views import newsLoader
from user_Manager.models import User
from django.conf.urls.static import static



def index(request):
    return render_to_response('index.html',RequestContext(request))

def load_staff(request):
    user = User.objects.filter(is_superuser=False)
    json_array=[]
    for u in user:
        data = {
                'name': ('%s %s') % (u.first_name,u.last_name),
                'picture': u.picture.name,
                'bio': u.bio,
                'programs': getShows(u)
                }
        json_array.append(data)
    return HttpResponse(json.dumps(json_array),mimetype='application/json')    
    
def getShows(user):
    shows = Shows.objects.filter(participants=user)
    data = []
    for s in shows:
        data.append(s.show_name)
    shows = ", ".join(data)
    return shows


def play(request):
    return render_to_response('reproductor/reproductor.html',RequestContext(request))


