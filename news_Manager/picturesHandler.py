from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile

import cStringIO,base64,re,uuid,StringIO

def get_a_uuid():
    return str(uuid.uuid4())

def convertToDjangoFile(pil_file):
	thumb_file = InMemoryUploadedFile(image, None, ('%s.png') % get_a_uuid(), 'image/png',image.len, None)
	return thumb_file

def convertToPilFile(data_url):
	imgstr = str(data_url).replace('data:image/png;base64,','')
	pic = cStringIO.StringIO()
	image_string = cStringIO.StringIO(base64.b64decode(imgstr))
	image = Image.open(image_string)
	image.save(pic, format='png')
	pic.seek(0)
	return image	


def convertToDjangoFile(djpicture):
	thumb_io = StringIO.StringIO()
	djpicture.save(thumb_io, format='PNG')
	thumb_file = InMemoryUploadedFile(djpicture, None, ('%s.png') % get_a_uuid(), 'image/png',djpicture.size, None)
	return thumb_file


def imageFromDataURL(data_url):
	#import ipdb; ipdb.set_trace()
	pil_file = convertToPilFile(data_url)
	return convertToDjangoFile(pil_file)
