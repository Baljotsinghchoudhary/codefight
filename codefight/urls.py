from django.urls import path, include
from . import views
from .import services

urlpatterns = [
    path('', views.Home.as_view(), name='codefight_home'),
    path('<int:id>', views.Fight.as_view(),name='codefight_fight'),
    path('hackerearthcallback/<str:room_id>',views.HackerearthResponse)
]
