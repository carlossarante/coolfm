from django import forms
from news_Manager.models import Images
from news_Manager.widgets import ImageCropper


class ImageInlineForm(forms.ModelForm):
	#img = forms.ImageField(widget=ImageCropper())
	class Meta:
		model = Images
		fields = ['img','post_thumbnail']
