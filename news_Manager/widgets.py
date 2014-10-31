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
class ImageCropper(widgets.TextInput):
    def render(self,name,value,attrs=None):
        return mark_safe('''
                            <div  ng-controller="Ctrl">
                                <input type="file" onchange="angular.element(this).scope().handleFileSelect(event)" />
                                <div class="cropArea">
                                    <img-crop image="myImage" result-image="myCroppedImage" area-type="square"></img-crop>
                                </div>
                                <div>Cropped Image:</div>
                                <div><img ng-src="{{myCroppedImage}}" /></div>
                            </div>
                        ''')
