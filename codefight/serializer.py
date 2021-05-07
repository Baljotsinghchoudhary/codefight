from rest_framework import serializers
from .models  import *


class LinkSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Link
        fields=['user1','user2','pk']
        read_only_fields=['user1']
    
    def create(self,validated_data):
    
        link=Link(**validated_data)
        link.user1=self.context['request'].user

        if link.user1==link.user2:
            raise serializers.ValidationError({"detail": "User Cannot invite Himself/Herself"})
        link.problem=problem.objects.order_by("?").first()
        link.save()
        return link
       
