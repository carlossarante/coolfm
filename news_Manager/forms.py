from django import forms
from news_Manager.models import Images
from news_Manager.widgets import ImageCropper,ImageCropped


class ImageInlineForm(forms.ModelForm):
	img = forms.ImageField(widget=ImageCropper())
<<<<<<< HEAD
=======
	post_thumbnail = forms.ImageField(widget=ImageCropped)
>>>>>>> 9305babf586d1d8080466f9855c7e227dbeda0f0
	class Meta:
		model = Images
		fields = ['img','post_thumbnail']
