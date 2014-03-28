# -*- coding: utf-8 -*-
import HTMLParser
from django.conf.urls import patterns, include, url
from django import forms
from django.contrib import admin
from django.shortcuts import render_to_response,RequestContext
from django.db import models
from slughifi import slughifi
from news_Manager.widgets import WYMEditor
from news_Manager.models import Post,Categories,Images
from suit_ckeditor.widgets import CKEditorWidget


class AddImageFields(admin.StackedInline):
    model = Images

class NewsForm(forms.ModelForm):
   # content = forms.CharField()
    category = forms.ModelChoiceField(queryset=Categories.objects.all())
    class Meta:
        model = Post
        exclude = ['date_posted','slug']

class PostAdmin(admin.ModelAdmin):
    form = NewsForm
    formfield_overrides = { models.TextField: {'widget': forms.Textarea(attrs={'class':'ckeditor'})}, }
    fieldsets = [
        ('Information', {'fields': ('title','category')}),
        ('Body', {'fields': ('content',)}),
        ('Status', {'fields': ('is_published',)}),
    ]
    inlines=[AddImageFields,]
    def save_model(self, request, obj, form, change):
        obj.slug = slughifi(obj.title)
        obj.save()
    class Media:
        js = js = ('js/jquery.js','/static/ckeditor/ckeditor.js',
                   'js/jquery.adminpreview.js',)






admin.site.register(Post,PostAdmin)
admin.site.register(Categories)

'''
class ShowCreationForm(forms.ModelForm):
    
    show_name = forms.CharField(label='Nom:')
    show_pict = forms.ImageField(label='Photo du coverture')
    starts_hour = forms.TimeField(label='Heure Initial')
    ends_hour = forms.TimeField(label='Heure Finale')
    class Meta:
        model = Shows
'''

