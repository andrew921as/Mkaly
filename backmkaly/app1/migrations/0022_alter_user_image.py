# Generated by Django 4.1.3 on 2023-01-28 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0021_alter_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.FileField(default='https://res.cloudinary.com/dvm5lesco/image/upload/v1674920274/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8_wqmaht.jpg', max_length=400, upload_to='imagenes_ussuarios', verbose_name='imagen'),
        ),
    ]
