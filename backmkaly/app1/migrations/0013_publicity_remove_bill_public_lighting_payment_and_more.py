# Generated by Django 4.1.3 on 2023-01-04 23:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0012_remove_client_phone_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Publicity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month_publicity', models.CharField(max_length=20, null=True, verbose_name='Mes')),
                ('type_publicity', models.CharField(max_length=20, null=True, verbose_name='Tipo de publicidad')),
                ('image_publicity', models.ImageField(default='.\\static\\media\\images_pdf\\logo.png', null=True, upload_to='')),
            ],
        ),
        migrations.RemoveField(
            model_name='bill',
            name='public_lighting_payment',
        ),
        migrations.AddField(
            model_name='bill',
            name='publicity',
            field=models.OneToOneField( on_delete=django.db.models.deletion.CASCADE, to='app1.publicity'),
        ),
    ]
