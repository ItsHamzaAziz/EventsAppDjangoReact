from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Event, Category
from .serializers import CategorySerializer, EventSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_categories(request):
    categories = Category.objects.order_by('name')
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_latest_events(request):
    events = Event.objects.order_by('-date_time')[:12]
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_event(request):
    print(request.data)
    print(request.user)

    return Response({'message': 'In View'})








