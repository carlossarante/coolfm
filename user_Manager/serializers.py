from rest_framework import serializers
from user_Manager.models import Presenter
class PresenterSerializer(serializers.ModelSerializer):
	class Meta:
		model = Presenter
