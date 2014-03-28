# -*- coding: utf-8 -*-
from suit_redactor.widgets import RedactorWidget
from django import forms
from django.contrib import admin
from news_Manager.widgets import WYMEditor
from news_Manager.models import Post,Categories,Images


class AddImageFields(admin.StackedInline):
    model = Images

class NewsForm(forms.ModelForm):
    #content = forms.CharField(widget=RedactorWidget)
    category = forms.ModelChoiceField(queryset=Categories.objects.all())
    class Meta:
        widgets = {
            'content': RedactorWidget(editor_options={'lang': 'en'})
        }
        model = Post
        exclude = ['date_posted']

class PostAdmin(admin.ModelAdmin):
    form = NewsForm
    fieldsets = [
        ('Information', {'fields': ('title','slug','category')}),
        ('Body', {'classes': ('full-width',), 'fields': ('content',)}),
        ('Status', {'fields': ('is_published',)}),
    ]
    inlines=[AddImageFields,]
    
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

