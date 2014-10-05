from rest_framework import pagination
from rest_framework import serializers
from news_Manager.models import Post

class PostSerializer(serializers.ModelSerializer):
	time_posted = serializers.SerializerMethodField('formatTime')
	section = serializers.RelatedField(source='category')
	img = serializers.SerializerMethodField('getImages')
	class Meta:
		model = Post
		fields =('title','slug','time_posted','content','section','user','img','category')
	
	def formatTime(self,obj):
		return obj.date_posted.strftime('%d %B %Y %H:%M')
	
	def getImages(self,obj):
		pic = obj.images_set.all()
		return pic

class PaginatedPostSerializer(pagination.PaginationSerializer):
	#Pagination for posts.
	class Meta:
		object_serializer_class = PostSerializer
