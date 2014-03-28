# Create your views here.
from django.http import HttpResponse
from django.core.mail import EmailMessage
from mailer.models import Mails
from django.template.loader import render_to_string
from django.core.mail import send_mail
from coolFM.views import index

def subscribe_me(request):
    try:
    	send_mail('contact', ('%s \n %s\n\n%s') %  (request.POST['name'],request.POST['mail'],request.POST['message']), 'contacto@conuco.do',['info@radiocoolhaiti.com'], fail_silently=False)
    	return index(request)

    except ValueError: 
    	return HttpResponse("Failed")

