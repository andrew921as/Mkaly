# Generated by Django 4.1.3 on 2023-01-29 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0033_bill_pdf_bill'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='pdf_bill',
            field=models.FileField(blank=True, max_length=4000, null=True, upload_to='pdf/', verbose_name='pdf factura'),
        ),
    ]
