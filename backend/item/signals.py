from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Item, ItemUsage

@receiver(post_save,sender='item.Item')
def create_item_usage(sender,instance,*args,**kwargs):
    #if instance.id is None:
    #    return
    
    queryset = ItemUsage.objects.filter(item=instance).order_by('-date')
    latest = queryset.first()
    
    
    
    kind = ItemUsage.ADDED
    if latest:
        if latest.quantity == instance.quantity:
            return
        if latest.quantity > instance.quantity:
            kind = ItemUsage.USED
    
    ItemUsage.objects.create(
        quantity=instance.quantity,
        item=instance,
        user=instance.updated_by,
        kind=kind,)
    
    