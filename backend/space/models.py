from django.db import models
from location_field.models.plain import PlainLocationField
from db_utils import UUIDModel,PathAndRename
from django.conf import settings

# Create your models here.


    


class Space(UUIDModel):
    name = models.CharField(max_length=50)
    description = models.TextField(null=True,blank=True)
    location = PlainLocationField(null=True,blank=True)
    image = models.ImageField(upload_to=PathAndRename('space/space'),null=True,blank=True)

class Place(UUIDModel):
    space = models.ForeignKey('space.Space',on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(null=True,blank=True)
    image = models.ImageField(upload_to=PathAndRename('space/place'),null=True,blank=True)