from django.test import TestCase


from ..models import Space, Place

from .serializers import SpaceSerializer, PlaceSerializer


class SpaceSerializerTest(TestCase):
    def setUp(self) -> None:
        self.space = Space.objects.create(
            name="Work", description="This is my work")
        super().setUp()

    def test_check_can_name_be_unique(self):

        serializer = SpaceSerializer(
            data={'name': "Work", 'description': "This is my new work"})

        self.assertEqual(serializer.is_valid(), False)


class PlaceSerializerTest(TestCase):
    def setUp(self) -> None:
        self.space = Space.objects.create(
            name='Work', description='This is my work')
        self.place = Place.objects.create(name='Living room', space=self.space)
        super().setUp()

    def test_check_can_name_be_unique(self):

        serializer = PlaceSerializer(
            data={'name': 'Living room', 'space': self.space.uuid})

        self.assertEqual(serializer.is_valid(), False)

    def test_check_can_add_with_different_name(self):
        serializer = PlaceSerializer(
            data={'name': 'Bathroom', 'space': self.space.uuid})

        self.assertEqual(serializer.is_valid(), True)
