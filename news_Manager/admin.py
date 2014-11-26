# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.shortcuts import render_to_response,RequestContext
from django.http import HttpResponse
from django.db import models
from django.forms.models import BaseInlineFormSet
from django import forms
from slughifi import slughifi
from news_Manager.widgets import WYMEditor
from news_Manager.models import Post,Categories,Images
from news_Manager.forms import ImageInlineForm
from suit_ckeditor.widgets import CKEditorWidget

class AddImageFields(admin.StackedInline):
    model = Images
    fields = ('img','post_thumbnail')
    form = ImageInlineForm
    extra =1

class NewsForm(forms.ModelForm):
    category = forms.ModelChoiceField(queryset=Categories.objects.all())
    class Meta:
        model = Post
        exclude = ['date_posted','slug']
    

class PostAdmin(admin.ModelAdmin):
    form = NewsForm
    inlines=[AddImageFields]
    formfield_overrides = { models.TextField: {'widget': forms.Textarea(attrs={'class':'ckeditor'})}, }
    fieldsets = [
        ('Information', {'fields': ('title','category')}),
        ('Body', {'fields': ('content',)}),
        ('Status', {'fields': ('is_published',)}),
    ]

    def save_model(self, request, obj, form, change):
        try:
            slug = slughifi(obj.title)
            Post.objects.get(slug=slug)
            if not change:
                return HttpResponse('Post slug and title already exists')
            else: 
                return HttpResponse(obj.id)
        except:
            obj.slug = slug
            obj.save()
            return obj


    class Media:
        js = js = ('js/jquery.js','ckeditor/ckeditor.js')


admin.site.register(Post,PostAdmin)
admin.site.register(Categories)
    