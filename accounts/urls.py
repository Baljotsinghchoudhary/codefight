from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .serializer import CustomTokenObtainPairSerializer


urlpatterns = [
    path('register/', SignUp.as_view(), name='register'),
    path('password-change/',PasswordChange.as_view(),name='password_change'),
    path('password-reset/',PasswordResetToken.as_view()),
    path('password-reset/<uidb64>/<token>',PasswordResetPassword.as_view(),name='password-reset'),
    path('activate/<uidb64>/<token>', EmailActivate.as_view(), name='activate'),
    path('token/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #path('', include('django.contrib.auth.urls')),
]
