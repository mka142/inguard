from cgitb import lookup
from django.contrib.auth import logout,get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.decorators import api_view,action
from rest_framework.response import Response
from rest_framework import status,authentication,viewsets,permissions

from .serializers import LoginSerializer, UserSerializer

UserModel = get_user_model()

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

class UserViewset(viewsets.ReadOnlyModelViewSet):
    queryset = UserModel.objects.all()
    authencitation_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    serializer_class = UserSerializer
    
    
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        # Get current user data
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)
    