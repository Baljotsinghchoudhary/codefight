from django.urls import path, include
from . import views
from .import services

urlpatterns = [
    path('', views.home.as_view(), name='codefight_home'),
    path('<int:id>', views.fight.as_view(),name='codefight_fight'),
    path('<int:id>/compile', services.compile, name='compile'),
    path('<int:id>/run', services.run),

]
