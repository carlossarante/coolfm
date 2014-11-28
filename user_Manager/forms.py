from django import forms
from news_Manager.models import Images
from news_Manager.forms import DataURLField
from news_Manager.widgets import ImageCropper,ImageCropped
from news_Manager.picturesHandler import datauriToUploadedFile


class PresenterForm(forms.ModelForm):	
    img = DataURLField(widget=ImageCropper,required=True)
    preview = DataURLField(widget=ImageCropped,required=False)
	class Meta:
		model = Images
		fields = ['first_name','last_name','img','preview','bio']

