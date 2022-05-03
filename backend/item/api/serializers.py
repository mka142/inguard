from rest_framework import serializers
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)
from rest_framework.validators import UniqueTogetherValidator
from api_utils.fields import UUIDRelatedField

from ..models import Item
from space.models import Place


class ItemSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    place = UUIDRelatedField(
        queryset=Place.objects.all(),
        uuid_field='uuid'
    )
    
    updated_by = serializers.SlugRelatedField(
        read_only=True,
        slug_field='uuid'
    )

    class Meta:
        model = Item
        fields = [
            'place',
            'name',
            'description',
            'image',
            'quantity',
            'trash',
            'tags',
            'uuid',
            'updated_by'
        ]

        validators = [
            UniqueTogetherValidator(
                queryset=Item.objects.all(),
                fields=['place', 'name']
            )
        ]
        
    def get_request_user(self):
        if 'request' in self.context.keys():
            return self.context['request'].user
        return None
    
    def update(self,instance,validated_data):
        instance.updated_by = self.get_request_user()
        return super().update(instance,validated_data)
    
    def create(self,validated_data):
        validated_data['updated_by'] = self.get_request_user()
        return super().create(validated_data)