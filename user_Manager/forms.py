from django import forms
from user_Manager.models import Presenter
from news_Manager.forms import DataURLField
from news_Manager.widgets import ImageCropper,ImageCropped
from news_Manager.picturesHandler import datauriToUploadedFile


class PresenterForm(forms.ModelForm):	
    img = DataURLField(widget=ImageCropper,required=True)
    preview = DataURLField(widget=ImageCropped,required=False)
    class Meta:
		model = Presenter
		fields = ['first_name','last_name','img','preview','bio']

