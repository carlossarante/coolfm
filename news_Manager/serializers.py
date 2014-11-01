from django.utils.html import remove_tags

from rest_framework import pagination
from rest_framework import serializers

from news_Manager.models import Post

class PostSerializer(serializers.ModelSerializer):
	time_posted = serializers.SerializerMethodField('formatTime')
	section = serializers.RelatedField(source='category')
	img = serializers.SerializerMethodField('getImages')
	content = serializers.SerializerMethodField('getContent')
	class Meta:
		model = Post
		fields =('title','slug','time_posted','content','section','user','img')

	def formatTime(self,obj):
		return obj.date_posted.strftime('%d %B %Y %H:%M')
	
	def getImages(self,obj):
		pic = obj.images_set.all()
		return pic
	
	def getContent(self,obj):
		return remove_tags(obj.content,'preview')


class PaginatedPostSerializer(pagination.PaginationSerializer):
	class Meta:
		object_serializer_class = PostSerializer
