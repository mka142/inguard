from django.contrib.auth import authenticate, login
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    
    def validate(self,data):
        """
        Try to authenticate user
        """
        request = self.context['request']
        user = authenticate(request,username=data['username'],password=data['password'])
    
        if user is not None:
            login(request,user)
            return data
        else:
            raise serializers.ValidationError("Wrong user or password")
    