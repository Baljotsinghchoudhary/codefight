from channels.generic.websocket import AsyncWebsocketConsumer
import json
from codefight.models import Link,problem
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
import time
import datetime
from channels.exceptions import DenyConnection
from django.contrib.auth.models import AnonymousUser


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"Group_{self.room_name}"
        self.user=self.scope['user']
        try:
            link=await database_sync_to_async(Link.objects.get)(pk=self.room_name)
            prob=await database_sync_to_async(problem.objects.get)(pk=link.problem_id)
            if link.user1_id!=self.scope['user'].pk and link.user2_id!=self.scope['user'].pk:
                raise Exception

            # Join room group
            await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
            )
            await self.accept()
            if link.user1_active==True and link.user2_active==True:
                await self.channel_layer.group_send(self.room_group_name, {
                "type": "problem_message",
                "problem": prob.description,
                "winner":link.winner,
                })
        except Exception:
            self.close()

    async def disconnect(self, close_code):

        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'username': self.user.username,
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        type=event['type']
        message = event['message']
        username=event['username']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type':type,
            'username':username,
            'message': message
        }))
    
    async def problem_message(self,event):
        type=event['type']
        problem = event['problem']
        winner=event['winner']  
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type':type,
            "problem":problem,
            "winner":winner,
            
        }))

    async def system_message(self,event):
        type=event['type']
        winner= event['winner']  
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type':type,
            'winner':winner,
        }))


    
