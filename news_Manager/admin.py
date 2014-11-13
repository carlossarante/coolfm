# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django import forms
from django.contrib import admin
from django.shortcuts import render_to_response,RequestContext
from django.http import HttpResponse
from django.db import models
from slughifi import slughifi
from news_Manager.widgets import WYMEditor
from news_Manager.models import Post,Categories,Images
from news_Manager.forms import ImageInlineForm
from suit_ckeditor.widgets import CKEditorWidget



    
class AddImageFields(admin.StackedInline):
    model = Images
    fields = ('img',)




class NewsForm(forms.ModelForm):
   #content = forms.CharField()
    category = forms.ModelChoiceField(queryset=Categories.objects.all())
    class Meta:
        model = Post
        exclude = ['date_posted','slug']
    

class PostAdmin(admin.ModelAdmin):
    #import ipdb;ipdb.set_trace()
    form = NewsForm
    inlines=[AddImageFields]

    def save_model(self, request, obj, form, change):
        try:
            slug = slughifi(obj.title)
            Post.objects.get(slug=slug)
            if not change:
                return HttpResponse('Post slug and title already exists')
            else: 
                return obj
        except:
            obj.slug = slug
            obj.save()
            return obj
    def response_add(self,request, obj, post_url_continue='../%s/'):
        import json
        p = Post.objects.get(title=obj.title)
        return HttpResponse(p.id)


    class Media:
        js = js = ('js/jquery.js','/static/ckeditor/ckeditor.js',
                   'js/jquery.adminpreview.js',)



admin.site.register(Post,PostAdmin)
admin.site.register(Categories)
#admin.site.register(Images)
