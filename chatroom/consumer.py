from channels.generic.websocket import AsyncJsonWebsocketConsumer
from codefight.models import Link,problem
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from channels.exceptions import DenyConnection
from django.contrib.auth.models import AnonymousUser
import asyncio
from codefight.services import CompileAndRun

class ChatConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):

        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.user=self.scope['user']
        self.sharedLink = "Group-"+self.room_id   #send message to both the user
        self.personalLink="Personal-"+self.user.username+"-"+self.room_id    #send message to single user
        
        result=await self.Verify()
        if result:
            await self.JoinGroup()  # Join room group
            await self.accept() #accept Connection
            if self.link.user1_active and self.link.user2_active:
                await self.channel_layer.group_send(
                    self.sharedLink,{
                    "type":"problem.message",
                    "problem":self.link.problem.description,
                    "winner":self.link.winner,
                    "username":self.user.username
                    }    
                )
        else:
           await self.close()  #reject

       
    async def disconnect(self, close_code):

        # Leave room group
         await asyncio.gather(
            self.channel_layer.group_discard(self.sharedLink,self.channel_name),
            self.channel_layer.group_discard(self.personalLink,self.channel_name)
         )

    async def  JoinGroup(self):
        await asyncio.gather(
        self.channel_layer.group_add(self.sharedLink,self.channel_name),
        self.channel_layer.group_add(self.personalLink,self.channel_name)
        )
       
    async def Verify(self):

        try:
            self.link=await database_sync_to_async(Link.objects.select_related().get)(pk=self.room_id)

            if self.link.user1.pk==self.scope['user'].pk:
                self.link.user1_active=True
            elif self.link.user2.pk==self.scope['user'].pk:
                self.link.user2_active=True
            else:
                raise Exception("Permission Denied")
            await database_sync_to_async(self.link.save)()
            return True

        except Exception as e:
            return False

    
    async def receive_json(self,data): # Receive message from WebSocket
        data['username']=self.user.username
        # Send message to room group
        if data['type']=="chat.message":
            await self.channel_layer.group_send(self.sharedLink,data)   
        elif data['type']=="system.message":
            await self.channel_layer.group_send(
                self.sharedLink,{
                "type":"chat.message",
                "username":"system",
                "message":data['username']+" is compiling and running code"
                })
            await self.channel_layer.group_send(self.personalLink,data)


    
    async def chat_message(self, event):  # Receive message from room group
        await self.send_json(event)   # Send message to WebSocket
    
    async def problem_message(self,event):
        await self.send_json(event)

    async def system_message(self,event): 
        await CompileAndRun(**event,input=self.link.problem.input,room_id=self.room_id)
    
    async def exec_resp_message(self,event):
        await self.send_json(event)
    
    async def winner_message(self,event):
        await self.send_json(event)

    
