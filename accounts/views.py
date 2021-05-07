
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics,views,exceptions
from .serializer import *
from .models import User
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .token import account_activation_token,account_reset_token
from .sendemail import SendMailPaswordReset
from django.core.exceptions import ValidationError


class SignUp(generics.CreateAPIView):

    serializer_class=UserSerializer

    def perform_create(self, serializer):
        user=serializer.save()
        SendMailActivation(self.request,user)

class PasswordChange(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PasswordChangeSerializer

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': 'Password Updated'}) 


class EmailActivate(views.APIView):

    def get(self,request,*args,**kwargs):
        try:
            uidb64=kwargs['uidb64']
            token=kwargs['token']
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.is_confirm_email = True
            user.save()

            return Response ({'message': 'YOUR EMAIL ACCOUNT SUCCESSFULLY ACTIVATED'})
        return Response({'error':"Invalid Link"})

class PasswordResetToken(views.APIView):
   
    def post(self,request):
        email=request.data.get("email")
        try:
           user=User.objects.get(email=email.lower())
           SendMailPaswordReset(request,user)
           
        except Exception as e:
            pass
           
        finally:
            return Response({"message":"If an account exists with the email you entered. You should receive link shortly"})
    


class PasswordResetPassword(views.APIView):

    def  post(self,request,*args,**kwargs):
        user=None
        password=request.data.get("password")

        if password is None:
            raise exceptions.ValidationError(detail={"error":"Pls provide password"})
        try:
            validate_password(password)
            uidb64=kwargs['uidb64']
            token=kwargs['token']
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise exceptions.ValidationError(detail={"error":"User does Not exist"})

        except  ValidationError as e:
            raise exceptions.ValidationError(detail={"error":e.messages})

        if user is not None and account_reset_token.check_token(user, token):
            user.is_active = True
            user.is_confirm_email=True
            user.set_password(password)
            user.save()
            return Response({'detail':'Password Changed SuccessFully'})
        return  Response({"error":"INVALID LINK"})

       

    

