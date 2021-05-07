from .serializer import ContestSerializer
from rest_framework import generics
from rest_framework.response import Response
from .models import contest



class GetContest(generics.ListCreateAPIView):
    queryset =contest.objects.all()
    serializer_class =ContestSerializer

