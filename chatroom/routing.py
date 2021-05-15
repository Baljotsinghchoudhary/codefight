from . import consumer
from django.urls import path

websocket_urlpatterns = [
    path('ws/chat/<str:room_id>',consumer.ChatConsumer.as_asgi()),
]