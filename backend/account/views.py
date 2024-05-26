from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    username = data.get('usernameRegister')
    email = data.get('emailRegister')
    password = data.get('passwordRegister')

    if User.objects.filter(username=username).exists():
        return Response({'message': 'Username already exists'})
    
    if User.objects.filter(email=email).exists():
        return Response({'message': 'Email already exists'})
    
    user = User.objects.create_user(username=username, email=email, password=password)

    return Response({'message': 'User created successfully.'})


