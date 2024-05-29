from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Event, Category
from .serializers import CategorySerializer, EventSerializer
from rest_framework.response import Response
from datetime import datetime

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
@permission_classes([IsAuthenticated])
def create_event(request):
    date_time = request.data.get('dateTime')
    datetime_format = "%Y-%m-%dT%H:%M"
    date_time = datetime.strptime(date_time, datetime_format)

    event = Event.objects.create(
        title = request.data.get('title'),
        description = request.data.get('description'),
        image = request.FILES.get('image'),
        location = request.data.get('location'),
        date_time = date_time,
        category = Category.objects.get(pk=request.data.get('category')),
        user = request.user
    )

    return Response({'message': 'Event created successfully', 'status': 200})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)






