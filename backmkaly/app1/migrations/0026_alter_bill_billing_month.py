# Generated by Django 4.1.3 on 2023-01-29 01:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0025_alter_user_is_admin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='billing_month',
            field=models.CharField(max_length=20, verbose_name='Mes de la factura'),
        ),
    ]
