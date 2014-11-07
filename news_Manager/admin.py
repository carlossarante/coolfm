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
from news_Manager.forms import ImageInlineForm
from suit_ckeditor.widgets import CKEditorWidget



    
class AddImageFields(admin.StackedInline):
    model = Images
    fields = ('img',)
    #exclude = ('post_thumbnail',)
    list_display=('img_thumbnail',)
    form = ImageInlineForm




class NewsForm(forms.ModelForm):
   #content = forms.CharField()
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

    def save_formset(self, request, form, formset, change):
                    instance = formset.save(commit=False)
                    for form in formset:
                        if form._meta.model == Image: 
                            for name,picture in request.FILES.iteritems():
                                if name == ('thumbnail-%s' % form.img.name):
                                    instance.post_thumbnail = picture
                    formset.save_m2m()


    class Media:
        js = js = ('js/jquery.js','/static/ckeditor/ckeditor.js',
                   'js/jquery.adminpreview.js',)



admin.site.register(Post,PostAdmin)
admin.site.register(Categories)
admin.site.register(Images)
