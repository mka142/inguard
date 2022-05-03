from django.test import TestCase
from django.contrib.auth import get_user_model
# Create your tests here.
from .models import Item,ItemUsage

User = get_user_model()


class ItemUsageCreate_test(TestCase):
    """
    Check if ItemUsage is created when we change Item object
    """
    def setUp(self) -> None:
        self.user = User.objects.create_user('user','user@user.com','user')
        self.item = Item.objects.create(
            place=None,
            name='item1',
            description='',
            image=None,
            updated_by=self.user,
            quantity=10)
        
        return super().setUp()
    
    def test_check_if_after_first_created_is_created_item_usage(self):
        try:
            ItemUsage.objects.get(item=self.item)
            self.assertTrue(True)
        except:
            self.assertTrue(False)
    def test_check_after_update(self):
        self.item.quantity = 5
        self.item.save()
        
        latest = ItemUsage.objects.filter(item=self.item).order_by('-date').first()
        
        self.assertEqual(latest.quantity,5)
        self.assertEqual(latest.kind,ItemUsage.USED)
        self.assertEqual(latest.user,self.user)
    def test_when_added_more(self):
        self.item.quantity = 5
        self.item.save()
        self.item.quantity = 8
        self.item.save()
        
        latest = ItemUsage.objects.filter(item=self.item).order_by('-date').first()
        
        self.assertEqual(latest.quantity,8)
        self.assertEqual(latest.kind,ItemUsage.ADDED)