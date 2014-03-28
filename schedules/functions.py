'''
Created on Jan 19, 2014

@author: Carlos Sarante
'''
from datetime import datetime,timedelta
import time
import pytz
from django.http import HttpResponse
from django.utils import simplejson as json
from django.db.models import Q
from schedules.models import Days,Shows

DAYS_OF_WEEK_EN = ('Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday')
DAYS_OF_WEEK_FR = ("Samedi","Dimanche","Lundi",'Mardi','Mercredi','Jeudi','Vendredi')
def getTime():
    timezone = pytz.timezone('US/Eastern')
    time = datetime.now(timezone)
    return time

def convert24h(time):
    return time.strftime('%H:%M') #Converts to integer a hour

def convertMeridian(time):
    return time.strftime("%I:%M %p")

def querysetToArray(queryset):
    data = []
    for a in queryset:
        data.append(a)
    return data


def rangeOcuppied(show_name,day,starts,ends):
    try:
        #Item.objects.get(Q(startDate__range=(self.startDate,self.endDate))|Q(endDate__range=(self.sartDate,self.endDate))|Q(startDate__lt=self.startDate,endDate__gt=self.endDate))
        s = Shows.objects.all()
        d = Days.objects.get(day=day)
        try:
            d = Shows.objects.get(day=d.id)
            pass
        except Shows.DoesNotExist:
            return False
        for show in s:
            if (show.starts<=starts<show.ends):
                if (show_name!=show.show_name):
                    return True,show
        return False,None
    except:
        return False,None
    
    
def getDay(day_offset=0):
    d = getTime().strftime('%A')
    day = DAYS_OF_WEEK_EN.index(d)
    d = Days.objects.get(id=day+day_offset+1)
    return d

def standarizedTime():
    t = getTime().strftime('%H:%M')
    t = datetime.strptime(t,'%H:%M')
    return t

def compareTime(s,t):
    final = datetime.strptime('23:59','%H:%M').time()
    if s.starts>s.ends:
        
        if (s.starts<=t.time()<final):
            #raise Exception(s)
            return True
        else:
            return False 
    else:
        if (s.starts<=t.time()<s.ends):
                #raise Exception(s)
            return True
        else:
            return False 

def getShow(shows_list):
    t = standarizedTime()
    for s in shows_list:
        if (compareTime(s,t)):
            return s
    
#    return queryset_to_array(shows_list).pop() #By default is there's no result from comparation, then return the last object.

def serialize_show(obj):
    data={
          'show_name':('%s') % obj.show_name,
          'hour_range':('%s') % obj.get_hours(),
          'show-details':('%s') % obj.about,
          'show_pict':('%s') % obj.show_pict.name,
          }
    return data

def getDayByIndex(dayname):
    return Days.objects.get(day=dayname)

def getPreviousDay(day):
    if day.id==1:
        d = Days.objects.get(id=7)
    else:
        d = Days.objects.get(id=(day.id)-1)
    return d

def getNextDay(day):
    if day.id==7:
        d = Days.objects.get(id=1)
    else:
        d = Days.objects.get(id=(day.id+1))
    return d

def fetchShows(day):
    shows_list=[]
    arr_to_return = []
    shows_list.append(Shows.objects.filter(day=day.id).order_by('starts'))
    for i in xrange(0,len(shows_list)):
        for j in xrange(0,len(shows_list[i])):
            arr_to_return.append(shows_list[i][j])
    return arr_to_return

def getShowsList(dayindex=0):
    day = getDay()
    if dayindex==-1:
        day=getPreviousDay(day)
    elif dayindex==1:
        day = getNextDay(day)
    shows_list = fetchShows(day)
    return shows_list


def get_schedules_array(show,shows_list): 
    array_list = []
    shows_list = shows_list 
    index = shows_list.index(show)
    if index == len(shows_list)-1 or len(shows_list)-2:
        shows_list_2 = querysetToArray(getShowsList(1))
    elif index==0 or index==1:
        shows_list_2 = querysetToArray(getShowsList(-1))
    for i in xrange(-2,3):
        if (i==0):
            array_list.append(serialize_show(shows_list[index]))
            if index == len(shows_list)-1:
                array_list.append(serialize_show(shows_list_2[0]))
                array_list.append(serialize_show(shows_list_2[1]))
                #array_list.reverse()
                break
            
            elif index==0:
                array_list.append(serialize_show(shows_list_2[1]))
                array_list.append(serialize_show(shows_list_2[2]))
                break         
            continue
        elif(index+i>=len(shows_list)):
            index=0
            array_list.append(serialize_show(shows_list[index+i]))
        else:
            if index==1 and i==-2:
                array_list.append(serialize_show(shows_list_2[-1]))
                continue
            if index==len(shows_list)-2 and i == 2:
                array_list.append(serialize_show(shows_list_2[0]))
                continue
            array_list.append(serialize_show(shows_list[index+i]))
    return array_list

    #raise Exception(array_list)   
    #return array_list
    
    
'''
def fill_dayTable():
    days = ("Saturday","Sunday","Monday",'Tuesday','Wednesday','Thursday','Friday')
    for d in DAYS_OF_WEEK_FR:
        Days.objects.create(day=d)y

'''
