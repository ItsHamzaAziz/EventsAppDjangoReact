# Generated by Django 5.0.6 on 2024-05-25 18:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='date',
            new_name='date_time',
        ),
    ]
