from schedules.models import Shows 
from schedules.functions import get_schedules_array, getTime,getShow,getShowsList
from schedules.serializers import ShowSerializer
from django.http import HttpResponse
from django.utils import simplejson as json, timezone
from datetime import datetime,timedelta
from django.db.models import Q

import pytz,time
#check the given day

DAYS_OF_WEEK_EN = ('Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday')
DAYS_OF_WEEK_FR = ('Samedi','Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi')


def get_schedule_exact(request):
    json_array=[]
    shows_list = getShowsList(0)
    show = getShow(shows_list)
    if not show:
        show = shows_list[len(shows_list)-1]
    else:
        json_array = ShowSerializer(get_schedules_array(show,shows_list),many=True).data
    return HttpResponse(json.dumps(json_array),mimetype='application/json')

        