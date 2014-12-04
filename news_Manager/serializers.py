from django.utils.html import remove_tags

from rest_framework import pagination
from rest_framework import serializers

from news_Manager.models import Post

import re



class PostSerializer(serializers.ModelSerializer):
	time_posted = serializers.SerializerMethodField('formatTime')
	section = serializers.StringRelatedField(source='category',read_only=True)
	img = serializers.SerializerMethodField('getImages')
	content = serializers.SerializerMethodField('getContent')
	preview = serializers.SerializerMethodField('getPreview')
	class Meta:
		model = Post
		fields =('title','slug','time_posted','content','section','user','img','preview')

	def getPreview(self,obj):
		pattern = re.compile('<preview .*?>(.*?)</preview>')
		text_preview = pattern.findall(obj.content)
		try:
			return remove_tags(text_preview,'preview')
		except:
			return ('%s...') % remove_tags(obj.content[:150],'preview')

	def formatTime(self,obj):
		return obj.date_posted.strftime('%d %B %Y %H:%M') 
	
	def getImages(self,obj):
		data = []
		for p in obj.photos.all():
			data.append(['/media/%s' % p.img.name,'/media/%s' % p.post_thumbnail.name])
		return data
	
	def getContent(self,obj):
		#First, we have to remove the preview tag.
		return remove_tags(obj.content,'preview')


class PaginatedPostSerializer(pagination.PaginationSerializer):
	class Meta:
		object_serializer_class = PostSerializer
