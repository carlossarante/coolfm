from django import forms
from news_Manager.models import Images
from news_Manager.widgets import ImageCropper,ImageCropped


class ImageInlineForm(forms.ModelForm):
	img = forms.ImageField(widget=ImageCropper())
	post_thumbnail = forms.ImageField(widget=ImageCropped)
	class Meta:
		model = Images
		fields = ['img','post_thumbnail']
