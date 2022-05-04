from django.contrib.auth import authenticate, login,get_user_model
from rest_framework import serializers,exceptions
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from rest_framework.validators import UniqueTogetherValidator

# Get the UserModel
UserModel = get_user_model()

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(style={'input_type': 'password'})
    
    @staticmethod
    def get_username(username,email):
        if email:
            try:
                username = UserModel.objects.get(email__iexact=email).get_username()
            except UserModel.DoesNotExist:
                pass

        return username
    
    def validate(self,data):
        """
        Try to authenticate user
        """
        request = self.context['request']
        
        username = self.get_username(data.get('username'),data.get('email'))
        
        user = authenticate(request,username=username,password=data['password'])
    
        if user is not None:
            login(request,user)
            return data
        else:
            raise serializers.ValidationError(_("Wrong credentials was given"))


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserModel
        fields = ('username','first_name','last_name','email','is_staff','is_active','is_superuser','last_login','date_joined','uuid')
        read_only_fields = ('is_active','is_superuser','last_login','date_joined','uuid')
        
        validators = [
            UniqueTogetherValidator(
                queryset=UserModel.objects.all(),
                fields=['username']
            ),
            UniqueTogetherValidator(
                queryset=UserModel.objects.all(),
                fields=['email']
            )
        ]