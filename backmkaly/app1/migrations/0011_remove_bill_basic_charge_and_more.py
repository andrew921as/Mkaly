# Generated by Django 4.1.3 on 2023-01-04 21:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0010_remove_user_is_admin'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bill',
            name='basic_charge',
        ),
        migrations.RemoveField(
            model_name='bill',
            name='previous_reading',
        ),
    ]
