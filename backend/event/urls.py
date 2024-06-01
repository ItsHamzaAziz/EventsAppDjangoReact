from django.urls import path
from . import views

urlpatterns = [
    path('get-categories/', views.get_categories, name='get-categories'),
    path('create-event/', views.create_event, name='create-event'),
    path('get-events/', views.get_events, name='get-events'),
    path('latest-events/', views.get_latest_events, name='get-latest-events'),
    path('handle-event/<pk>/', views.handle_event, name='get-event-details'),
]

