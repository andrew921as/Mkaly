# Generated by Django 4.1.3 on 2023-01-28 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0024_remove_bill_concepts_remove_bill_details_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
    ]
