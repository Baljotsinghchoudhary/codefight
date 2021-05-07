from chatroom.middleware import JwtAuthMiddleware
from channels.routing import ProtocolTypeRouter, URLRouter
from chatroom.routing import websocket_urlpatterns
from django.core.asgi import get_asgi_application

application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket":JwtAuthMiddleware (
        URLRouter(
            websocket_urlpatterns
        )
    ),
})