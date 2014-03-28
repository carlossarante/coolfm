'''
Created on Jan 21, 2014

@author: Carlos
'''
from django import forms
from django.contrib import admin
from django.db.models import Q
from schedules.models import Shows,Days
from django.contrib.sites.models import Site
from schedules.functions import rangeOcuppied,standarizedTime


class ShowAdminForm(forms.ModelForm):
    class Meta:
        model = Shows
    def clean(self):
        clean_data = self.cleaned_data
        occupied,show = rangeOcuppied(clean_data.get('show_name'),clean_data.get('day'), clean_data.get('starts'),clean_data.get('ends'))
        if occupied:
            raise forms.ValidationError('Time Range conflicts with %s, its time range is %s-%s' % (show,show.starts,show.ends))
        return clean_data

class ShowsAdmin(admin.ModelAdmin):
    form = ShowAdminForm
    
admin.site.register(Shows,ShowsAdmin)
#admin.site.unregister(Site)