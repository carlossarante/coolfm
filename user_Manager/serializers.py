from rest_framework import serializers
from user_Manager.models import Presenter
class PresenterSerializer(serializers.ModelSerializer):
	picture = serializers.SerializerMethodField('get_picture_url')
	class Meta:
		model = Presenter
		fields = ('picture','first_name','last_name','bio')
	def get_picture_url(self,obj):
		return ('/media/%s'%obj.img.name)
