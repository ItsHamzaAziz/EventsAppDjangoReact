from django.db import models
from base.models import BaseModel
from django.contrib.auth.models import User

class Category(BaseModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'category'
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class Event(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=250)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='events')
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    location = models.CharField(max_length=750)
    date_and_time = models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'event'
        verbose_name = 'Event'
        verbose_name_plural = 'Events'
