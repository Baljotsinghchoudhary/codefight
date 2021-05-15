from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models import Q
from datetime import datetime, timedelta
from rest_framework import generics,views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import exceptions
from .serializer import *
from .models import *
from django.views import View
import requests,json
from django.http import HttpResponse

# Create your views here.
class Home(generics.ListCreateAPIView):
   
    permission_classes = [IsAuthenticated]
    serializer_class=LinkSerializer
  
    def get_queryset(self):
        return Link.objects.filter(Q(user1=self.request.user) | Q(user2=self.request.user),genration_time__gt=datetime.now()-timedelta(hours=1))

    def get(self,request):
        query=self.get_queryset()
        serializer=self.get_serializer(query,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=self.get_serializer(data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class Fight(views.APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ['head']

    def  head(self,request,*args,**kwargs):
        id=kwargs['id']
        try:
            link = Link.objects.get(pk=id)
            if link.user1 == request.user:
                link.user1_active = True
            elif link.user2 == request.user:
                link.user2_active = True
            else:
                raise exceptions.PermissionDenied(detail="Not Authorized")
        except:
            raise exceptions.NotFound()
        return Response(status=200)

class  HackerearthResponse(View):

    def post(self,request,*args,**kwargs):
        room_id=kwargs.get('room_id')
        data=json.loads(request.body)
        response={'type':'exec_resp.message'}
        response['result']=data['result']
        channel_layer = get_channel_layer()
        personalLink="Personal-"+data['context']+"-"+room_id
        sharedLink = "Group-"+room_id  

        if data['request_status']['code']=="CODE_COMPILED":
            response['is_compile']=True
            async_to_sync(channel_layer.group_send)(personalLink,response)
        else:
            link=Link.objects.select_related().get(pk=room_id)
            response['is_compile']=False
            resp=requests.get(data['result']['run_status']['output'])

            if link.problem.output.replace("\r","").strip()!=resp.text.replace("\r","").rstrip():

                response['status']="Wrong Answer"
                async_to_sync(channel_layer.group_send)(personalLink,response)

            else:
                response['status']="Accepted"
                async_to_sync(channel_layer.group_send)(personalLink,response)

                if link.winner is None:
                    link.winner=data['context']
                    link.save()
                    async_to_sync(channel_layer.group_send)(sharedLink,{'type':'winner.message','winner':data['context']})

        return HttpResponse(status=200)
                



