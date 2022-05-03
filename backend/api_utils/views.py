from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics

import magic


def image(obj,image_field='image'):
    image = getattr(obj,image_field,None)
    if not image:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    mime = magic.Magic(mime=True)

    content_type = mime.from_file(image.file.name)

    return HttpResponse(image, content_type=content_type)

class RequestInContextAPIView(generics.GenericAPIView):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context