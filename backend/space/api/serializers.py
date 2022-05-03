from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from api_utils.fields import UUIDRelatedField

from ..models import Space,Place

class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = ['uuid','name','location','description','image']
        
        validators = [
            UniqueTogetherValidator(
                queryset=Space.objects.all(),
                fields=['name']
            )
        ]

class PlaceSerializer(serializers.ModelSerializer):
    
    space = UUIDRelatedField(
        queryset=Space.objects.all(),
        uuid_field='uuid'
    )
    
    class Meta:
        model = Place
        fields = ['space','name','description','image','uuid']
        
        validators = [
            UniqueTogetherValidator(
                queryset=Place.objects.all(),
                fields=['name']
            )
        ]