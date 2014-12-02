from django import forms
from user_Manager.models import Presenter
from news_Manager.forms import DataURLField
from news_Manager.widgets import ImageCropper,ImageCropped
from news_Manager.picturesHandler import datauriToUploadedFile


class PresenterForm(forms.ModelForm):	
	img = DataURLField(widget=ImageCropped)	
	preview = DataURLField(widget=ImageCropper(result_image_size=400,as_ratio_x=1,as_ratio_y=1),required=False)
	class Meta:
		model = Presenter
		fields = ['first_name','last_name','img','preview','bio']


	def __init__(self, *args, **kwargs):
		super(PresenterForm, self).__init__(*args, **kwargs)
		self.fields['preview'].required = False
		#self.fields['img'].required = False