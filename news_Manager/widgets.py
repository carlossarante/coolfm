from django import forms
from django.forms import widgets
from django.conf import settings
from django.utils.safestring import mark_safe

class WYMEditor(forms.Textarea):
    #change this for the exact location of your package in your staticfiles
    class Media:
        js = (
            '/static/js/jquery.js', 
            '/static/wymeditor/jquery.wymeditor.pack.js',
        )

    def __init__(self, language=None, attrs=None):
        self.language = language or settings.LANGUAGE_CODE[:2]
        self.attrs = {'class': 'wymeditor'}
        if attrs:
            self.attrs.update(attrs)
        super(WYMEditor, self).__init__(attrs)

    def render(self, name, value, attrs=None):
        rendered = super(WYMEditor, self).render(name, value, attrs)
        return rendered + mark_safe(u'''<script type="text/javascript">
            jQuery('#id_%s').wymeditor({
                updateSelector: '.submit-row input[type=submit]',
                updateEvent: 'click',
                lang: '%s',
            });
            </script>''' % (name, self.language))

#Based on Angular JS's library for cropping.
class ImageCropper(widgets.FileInput):
    def __init__(self,*args,**kwargs):
        self.result_image_size = kwargs.pop('result_image_size')
        self.as_ratio_x = kwargs.pop('as_ratio_x')
        self.as_ratio_y = kwargs.pop('as_ratio_y')        
        super(ImageCropper,self).__init__(*args,**kwargs)
        
    def render(self,name,value,attrs=None):
        return mark_safe('''
            <div  ng-controller="ImgCtrl">
                <input type="file" name = '%s' onchange="angular.element(this).scope().handleFileSelect(event)" ng-model="form" ng-disabled="sended"/>
                <input name="%s" type="hidden"  value="{{myImage}}" />
                <div class="cropArea">
                    <img-crop image="myImage" area-min-size="50" result-image="myCroppedImage" result-image-size="%s" area-type="square" as-ratio-x="%s" as-ratio-y="%s"></img-crop>
                </div>
                <div>
                    <img ng-src="{{myCroppedImage}}" style="width:200px;" ng-class="{hidden:true}" onload="angular.element(this).scope().cropImg()" />
                </div>
            </div>
        ''' % (name,name,self.result_image_size,self.as_ratio_x,self.as_ratio_y))

class ImageCropped(widgets.TextInput):
    def render(self,name,value,attrs=None):
        return mark_safe('''
            <div><img id="%s" style="width:200px;"/></div>
            <input name="%s" type="hidden"  value="" />
        ''' % (name,name))