from django.urls  import path
from . import views

urlpatterns=[
    path('',views.GetContest.as_view(),name='upcoming_contest')
]