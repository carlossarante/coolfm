from PIL import Image
from cStringIO import StringIO
from django.core.files.uploadedfile import SimpleUploadedFile


import os
def createThumbnail(self,size):
    thumb_io = StringIO()
    image = Image.open(StringIO(self.img.read()))
    thumbnail = image.resize(size,Image.ANTIALIAS)
    thumbnail.save(thumb_io,'jpeg')
    thumb_io.seek(0)
    #convert to SimpleUploadedFile, so it can be saved on ImageFields.
    suf = SimpleUploadedFile(os.path.split(self.img.name)[-1],thumb_io.read(), content_type='image/jpeg')
    return suf
    #self.post_thumbnail.save(('%s.%s')%(os.path.splitext(suf.name)[0],'jpeg'),suf,save=False)


def cropper(path,type,y_cord=-70):	
	if not crop_type or not y_cord:
		if crop_type == 'portraits':
			width,height = 472,500
		elif crop_type == 'post-thumbnail':
			width,height = 400,400
		elif crop_type == 'post-real':
			width,height = 600,600
	coords = (0,0,width,height-y_cord)
	cropped_picture = picture.crop(coords)
	return cropped_picture

def createThumbnail(original_img,size):
	thumb_io = StringIO()
	image = Image.open(StringIO(original_img.read()))
	image.thumbnail(size,Image.ANTIALIAS)
	image.save(thumb_io,'PNG')
	#convert to SimpleUploadedFile because it can be saved on ImageFields
	suf = SimpleUploadedFile(os.path.split(original_img.name)[-1],thumb_io.read(), content_type='image/png')
	return suf