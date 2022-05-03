from django.contrib.auth import logout
from django.views.decorators.csrf import ensure_csrf_cookie
from .serializers import LoginSerializer

from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@ensure_csrf_cookie
def set_csrf_view(request):
    return Response({})
@api_view(['POST'])
def login_view(request):
    
    serializer = LoginSerializer(data=request.data,context={'request':request})
    
    if serializer.is_valid():
        return Response({},status=status.HTTP_200_OK)
    else:
        return Response({},status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({},status=status.HTTP_200_OK)