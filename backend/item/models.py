from django.db import models
from django.conf import settings
from db_utils import UUIDModel,PathAndRename
from taggit.managers import TaggableManager
# Create your models here.

class Item(UUIDModel):
    place = models.ForeignKey('space.Place',on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=50)
    description = models.TextField(null=True,blank=True)
    image = models.ImageField(upload_to=PathAndRename('item/item'),null=True,blank=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True)
    
    quantity = models.PositiveIntegerField(default=0)
    trash = models.BooleanField(default=False)
    tags = TaggableManager()
    
class ItemUsage(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True)
    item = models.ForeignKey('item.Item',on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    quantity = models.PositiveIntegerField()
    
    USED = 'USED'
    ADDED = 'ADDED'
    
    KIND_CHOICES = [
        (USED,'Used'),
        (ADDED,'Added')
    ]
    kind = models.CharField(choices=KIND_CHOICES,max_length=5)