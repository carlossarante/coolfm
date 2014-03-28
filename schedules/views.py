from schedules.models import Shows 
from schedules.functions import get_schedules_array, getTime,getShow,getShowsList
from django.http import HttpResponse
from django.utils import simplejson as json, timezone
from datetime import datetime,timedelta
from django.db.models import Q

import pytz,time
#check the given day

DAYS_OF_WEEK_EN = ('Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday')
DAYS_OF_WEEK_FR = ('Samedi','Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi')


def serialize_show(show):
    data= {
                'name':show.show_name,
                'show_pict':show.show_pict.name,
                'time_range':("%s:%s - %s:%s") % (show.starts.hour,show.starts.minute,show.ends.hour,show.ends.minute),
          }
    return json.dumps(data)
    
def get_participants(show):
    a= show.participants.all() 
    announcer=[]
    for i in a:
        data= {
                'participant':("%s %s") % (i.first_name,i.last_name)
              }
        announcer.append(data)
    return announcer

def get_schedule(self):
    p = Shows.objects.all()
    json_array = []
    for i in p:
        data= {
                'name':i.show_name,
                'show_pict':i.show_pict.name,
                'about':i.about,
                'participants':get_participants(i),
                'startTime':("%02d:%02d")% (i.starts.hour,i.starts.minute),
                'endTime':("%02d:%02d")% (i.ends.hour,i.ends.minute),
               }
        json_array.append(data)
    return HttpResponse(json.dumps(json_array),mimetype='application/json')

def get_schedule_exact(request):
    json_array=[]
    shows_list = getShowsList(0)
    show = getShow(shows_list)
    if not show:
        show = shows_list[len(shows_list)-1]
    else:
        json_array = get_schedules_array(show,shows_list)
        #return HttpResponse(json_array)
    return HttpResponse(json.dumps(json_array),mimetype='application/json')

        
    
    
    '''for a in p:
        
            for i in xrange(0,4):
                if p[0]==a:
                    data = {
                                'time' : ("%s - %s") % (a.starts.strftime('%I:%M %p'),a.ends.strftime('%I:%M %p')),
                                'show_pict': a.show_pict.name,
                                'name_show':a.show_name,
                            }
                json_array[2]=p[0]
                
    return HttpResponse(json.dumps(json_array),mimetype='application/json')
    '''