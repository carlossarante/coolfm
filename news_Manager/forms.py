from django import forms

from news_Manager.models import Images
from news_Manager.widgets import ImageCropper,ImageCropped
from news_Manager.picturesHandler import imageFromDataURL,convertToDjangoFile,convertToPilFile



class DataURLField(forms.ImageField):
	def to_python(self,value):
		if not value:
			return []
		#import ipdb; ipdb.set_trace()
		img = convertToPilFile(value)
		return img

class CroppedImageField(forms.ImageField):
	#__metaclass__ = models.SubfieldBase
	def to_python(self,value):
		img = super(CroppedImageField,self).to_python(value)
		#import ipdb; ipdb.set_trace()
		if not value:
			return []
		return img

class ImageInlineForm(forms.ModelForm):	
	img = forms.ImageField(widget=ImageCropper)
	post_thumbnail = DataURLField(widget=ImageCropped)
	class Meta:
		model = Images
		fields = ['img','post_thumbnail']

	def __init__(self, *args, **kwargs):
		super(ImageInlineForm, self).__init__(*args, **kwargs)
		self.fields['post_thumbnail'].required = False


	def save(self, commit=True, force_insert=False, force_update=False, *args, **kwargs):
		m = super(ImageInlineForm, self).save(commit=False, *args, **kwargs)
		if commit:
			m.save()