from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
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
    events = Event.objects.order_by('-created_at')[:6]
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    event = Event.objects.create(
        title = request.data.get('title'),
        description = request.data.get('description'),
        image = request.FILES.get('image'),
        location = request.data.get('location'),
        category = Category.objects.get(uuid=request.data.get('category')),
        date_and_time = request.data.get('dateTime'),
        user = request.user
    )

    return Response({'message': 'Event created successfully', 'status': 200})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_events(request):
    events = Event.objects.order_by('-created_at')
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_event_details(request, pk):
    event = Event.objects.get(pk=pk)
    serializer = EventSerializer(event, many=False)
    return Response(serializer.data)



@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def handle_event(request, pk):
    if request.method == 'PUT':
        event = Event.objects.get(pk=pk)

        if request.FILES.get('image'):
            print(request.data)
            event.title = request.data.get('title')
            event.description = request.data.get('description')
            event.image = request.FILES.get('image')
            event.location = request.data.get('location')
            event.date_and_time = request.data.get('dateTime')
            event.category = Category.objects.get(name=request.data.get('categorySelected'))
        else:
            print(request.data)
            event.title = request.data.get('title')
            event.description = request.data.get('description')
            event.location = request.data.get('location')
            event.date_and_time = request.data.get('dateTime')
            event.category = Category.objects.get(name=request.data.get('categorySelected'))

        event.save()

        return Response({'message': 'Event updated successfully', 'status': 200})
    
    elif request.method == 'DELETE':
        event = Event.objects.get(pk=pk)
        event.delete()

        return Response({'message': 'Event deleted successfully', 'status': 200})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_events(request):
    events = Event.objects.filter(user=request.user).order_by('-created_at')
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


