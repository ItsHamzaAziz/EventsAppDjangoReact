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
    events = Event.objects.order_by('date_time')[:6]
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
    events = Event.objects.order_by('date_time')
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT'])
@permission_classes([AllowAny])
def handle_event(request, pk):
    if request.method == 'GET':
        event = Event.objects.get(pk=pk)
        serializer = EventSerializer(event, many=False)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        date_time = request.data.get('dateTime')
        datetime_format = "%Y-%m-%dT%H:%M"
        date_time = datetime.strptime(date_time, datetime_format)

        if request.FILES.get('image'):
            event = Event(
                title = request.data.get('title'),
                description = request.data.get('description'),
                image = request.FILES.get('image'),
                location = request.data.get('location'),
                date_time = date_time,
                category = Category.objects.get(pk=request.data.get('category')),   
                pk = pk
            )
        else:
            event = Event(
                title = request.data.get('title'),
                description = request.data.get('description'),
                location = request.data.get('location'),
                date_time = date_time,
                category = Category.objects.get(pk=request.data.get('category')),   
                pk = pk
            )

        event.save()

        return Response({'message': 'Event updated successfully', 'status': 200})


