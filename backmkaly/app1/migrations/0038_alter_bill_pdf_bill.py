# Generated by Django 4.1.3 on 2023-01-29 20:41

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0037_remove_bill_electronic_payment_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='pdf_bill',
            field=models.FileField(blank=True, max_length=4000, null=True, storage=django.core.files.storage.FileSystemStorage(location='C:\\Users\\camyj\\OneDrive\\Documentos\\Universidad\\Quinto Semestre\\desarrollo de software 1\\Proyecto\\Mkaly\\backmkaly\\app1/static/media'), upload_to='pdf', verbose_name='pdf factura'),
        ),
    ]