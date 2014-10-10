from django.utils import simplejson as json
from django.http import HttpResponse

from user_Manager.serializers import PresenterSerializer
from user_Manager.models import Presenter



def getPresenters(request):
	presenters = Presenter.objects.all()
	data = PresenterSerializer(presenters,many=True).data
	return HttpResponse(json.dumps(data),mimetype='application/json')