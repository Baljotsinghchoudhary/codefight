from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from . import views
from .import services

urlpatterns = [
    path('', views.Home.as_view(), name='codefight_home'),
    path('<int:id>', views.Fight.as_view(),name='codefight_fight'),
    path('hackerearthcallback/<str:room_id>',csrf_exempt(views.HackerearthResponse.as_view()))
]
