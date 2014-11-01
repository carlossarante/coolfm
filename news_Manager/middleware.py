class JSONMiddleware(object):
    """
    Process application/json requests data from GET and POST requests.
    """
    def process_request(self, request):
        if 'application/json' in request.META['CONTENT_TYPE']:
            data = json.loads(request.body)
            q_data = QueryDict('', mutable=True)
            for key, value in data.iteritems():
                if isinstance(value, list):
                    for x in value:
                        q_data.update({key: x})
                else:
                    q_data.update({key: value})

            if request.method == 'GET':
                request.GET = q_data

            if request.method == 'POST':
                request.POST = q_data
        return None
