import requests,json
from django.http import Http404
from asgiref.sync import sync_to_async
from django.conf  import settings



async def CompileAndRun(*args,**kwargs):
    data = {
        'source': kwargs.get('code'),
        'lang': kwargs.get('lang'),
        'input':kwargs.get('input'),
        'context':kwargs.get('username'),
        'time_limit': 2,
        'callback':"https://webhook.site/59b33275-2ce4-4532-8e54-806a9f00c2ec"   #during depolyment  demo domain/room_id
    }
    headers = {"client-secret": settings.HACKER_EARTH_CLIENT_SECRET,"content-type":"application/json"}
    await sync_to_async(requests.post)(settings.HACKEREARTH_URL, data=json.dumps(data),headers=headers)



