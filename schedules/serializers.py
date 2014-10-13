from rest_framework import serializers
from schedules.models import Shows


class ShowSerializer(serializers.ModelSerializer):
	start_time = serializers.SerializerMethodField('getStartingTime')
	class Meta:
		model = Shows
		fields = ('show_name','show_pict','about','participants','start_time')

	def getStartingTime(self,obj):
		return obj.starts.strftime('%H:%M')
