from PIL import Image
from cStringIO import StringIO
from django.core.files.uploadedfile import SimpleUploadedFile
from news_Manager.models import Images
import os, uuid,datetime,hashlib

def generateFileName():
	h = hashlib.sha1(datetime.datetime.now().strftime('%d-%m-%Y %H:%M:%S'))
	return h



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

def setThumbnail(request,post):
	number_of_images = request.POST.get('size_of_image_form',1)
	for i in xrange(0,number_of_images):
		post.images_set.add(image=request.FILES['id_images-set-%s-img',i],post_thumbnail=request.FILES['thumbnail-image-set-i'])
	return post
