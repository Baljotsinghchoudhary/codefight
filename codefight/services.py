import requests
import json
from django.http import JsonResponse
from .models import*
from django.http import Http404
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import time

COMPILE_URL = 'https://api.hackerearth.com/v3/code/compile/'
RUN_URL = 'https://api.hackerearth.com/v3/code/run/'

CLIENT_SECRET = 'e5ac09b6f3b80181b3bc987ad650a3df8c7845ce'


def compile(request,id):
    data = {
        'client_secret': CLIENT_SECRET,
        'async': 0,
        'source': request.POST.get('code'),
        'lang': request.POST.get('lang'),
        'time_limit': 1,
        'memory_limit': 262144,
    }

    r = requests.post(COMPILE_URL, data=data)
    r = r.json()
    context = {}
    context['compile_status'] = r['compile_status']
    channel_layer=get_channel_layer()
    async_to_sync(channel_layer.group_send)(f"Group_{id}", {
    "type": "chat_message",
    "username":'SYSTEM',
    "message": request.user.first_name+"#compiled the program",
})

    return JsonResponse(context)


def run(request, id):
    try:
        current_link=Link.objects.get(pk=id)
        current_test_case = current_link.problem.input
        current_output_case = current_link.problem.output
        data = {
            'client_secret': CLIENT_SECRET,
            'async': 0,
            'input': current_test_case,
            'source': request.POST.get('code'),
            'lang': request.POST.get('lang'),
            'time_limit': 1,
            'memory_limit': 262144,
        }
        r = requests.post(RUN_URL, data=data)
        r = r.json()
        context = {}
        context['message'] = "WRONG ANSWER"
        context['compile_status'] = r['compile_status']
        context['run_status'] = r['run_status']['status']
        channel_layer=get_channel_layer()

        if context['run_status'] == "AC":
            context['signal'] = r['run_status']['signal']
            str1 = r['run_status']['output'].rstrip()
            str2 = current_output_case.strip().replace('\r', '')
            if str1 == str2:
                context['message'] = "ALL TEST CASES PASSED"
                if current_link.winner=='TO BE DECLARED':
                    current_link.winner=request.user.first_name
                    current_link.save()
                    async_to_sync(channel_layer.group_send)(f"Group_{id}", {
    "type": "system_message",
    "winner":request.user.first_name,
    })

            else:
                context['run_status'] = "WRONG ANSWER"
        
        async_to_sync(channel_layer.group_send)(f"Group_{id}", {
    "type": "chat_message",
    "username":'SYSTEM',
    "message": request.user.first_name+"#SUBMITTED THE CODE",
    })

        return JsonResponse(context)
    except:
        return JsonResponse({}, status=404)
