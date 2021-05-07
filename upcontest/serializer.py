from rest_framework import serializers
from.models import contest

class ContestSerializer(serializers.ModelSerializer):
    
    class Meta:
            model=contest
            fields='__all__'