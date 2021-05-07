from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from django.db import close_old_connections
from urllib.parse import parse_qs
import jwt
from django.conf import settings

@database_sync_to_async
def get_user(pk):
    User=get_user_model()
    try:
        user = User.objects.get(pk=pk)
        return user
    except User.DoesNotExist:
        return AnonymousUser()



class JwtAuthMiddleware():

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):

       # Close old database connections to prevent usage of timed out connections
        close_old_connections()

        try:
            token = parse_qs(scope["query_string"].decode("utf8"))["token"][0]
            UntypedToken(token)
            decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            scope["user"] = await get_user(decoded['username'])
        except (InvalidToken, TokenError,KeyError) as e :
            scope["user"]=AnonymousUser()
        finally:
            return await self.app(scope,receive,send)


