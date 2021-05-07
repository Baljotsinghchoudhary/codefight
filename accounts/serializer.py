from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from.models import User
from django.utils.safestring import mark_safe
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions
from .sendemail import SendMailActivation

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(max_length=128, write_only=True, required=True,validators=[validate_password],help_text=mark_safe("""<ul><li>Your password can’t be too similar to your other personal information.</li>
    <li>Your password must contain at least 8 characters.</li>
    <li>Your password can’t be a commonly used password.</li>
    <li>Your password can’t be entirely numeric.</li></ul>"""))

    class Meta:
            model=User
            fields=['username','email','first_name','last_name','password']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'].lower(),
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        
        user.save()
        return user
   
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        
        data = super().validate(attrs)
        
        user=User.objects.get(email=attrs.get("email").lower())
        if user.is_confirm_email==False:
            SendMailActivation(self.context['request'],user)
            raise exceptions.NotAuthenticated(
            detail='Email not Verified.We have sent Mail Pls verify',
        )
        return data

class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=128, write_only=True, required=True,validators=[validate_password])
    new_password = serializers.CharField(max_length=128, write_only=True, required=True,validators=[validate_password])

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                ('Your old password was entered incorrectly. Please enter it again.')
            )
        return value

