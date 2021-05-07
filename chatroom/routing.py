from . import consumer
from django.urls import path

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>',consumer.ChatConsumer.as_asgi()),
]