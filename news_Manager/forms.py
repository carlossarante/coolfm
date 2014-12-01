from django import forms

from news_Manager.models import Images
from news_Manager.widgets import ImageCropper,ImageCropped
from news_Manager.picturesHandler import datauriToUploadedFile


class DataURLField(forms.ImageField):
	def to_python(self,value):
		if not value:
			return []
		img = datauriToUploadedFile(value)
		return img

	def validate(self,value):
		super(DataURLField,self).validate(value)

class ImageInlineForm(forms.ModelForm):	
	img = DataURLField(widget=ImageCropper(as_ratio_x=1.77,as_ratio_y=1),required=False)
	post_thumbnail = DataURLField(widget=ImageCropped)

	class Meta:
		model = Images
		fields = ['img','post_thumbnail','post']
	

	def __init__(self, *args, **kwargs):
		super(ImageInlineForm, self).__init__(*args, **kwargs)
		self.fields['post_thumbnail'].required = False
		#self.fields['img'].required = False