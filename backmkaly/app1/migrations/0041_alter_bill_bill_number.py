# Generated by Django 4.1.3 on 2023-02-01 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0040_alter_bill_bill_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='bill_number',
            field=models.IntegerField(unique=True, verbose_name='Numero de factura'),
        ),
    ]
