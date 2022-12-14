# Generated by Django 4.1.3 on 2022-12-18 22:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(max_length=100, unique=True, verbose_name='Nombre de usuario')),
                ('id_card', models.CharField(max_length=20, unique=True, verbose_name='cedula')),
                ('type_card', models.CharField(max_length=20, verbose_name='Tipo de documento')),
                ('first_name_user', models.CharField(max_length=15, verbose_name='primer nombre')),
                ('sec_name_user', models.CharField(max_length=15, null=True, verbose_name='segundo nombre')),
                ('first_lastname_user', models.CharField(max_length=15, verbose_name='primer apellido')),
                ('sec_lastname_user', models.CharField(max_length=15, null=True, verbose_name='segundo apellido')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='correo electronico')),
                ('city', models.CharField(max_length=20, verbose_name='Ciudad')),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
                'ordering': ['first_lastname_user'],
            },
        ),
        migrations.CreateModel(
            name='bill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bill_number', models.CharField(max_length=40, unique=True, verbose_name='Numero de factura')),
                ('electronic_payment_number', models.CharField(blank=True, max_length=40, null=True, unique=True, verbose_name='Numero de pago electronico')),
                ('expedition_date', models.DateField(verbose_name='Fecha de expedicion')),
                ('expiration_date', models.DateField(verbose_name='Fecha de vencimiento')),
                ('billing_period', models.DateField(verbose_name='Periodo de la factura')),
                ('billing_days', models.IntegerField(verbose_name='Dias de la factura')),
                ('billing_month', models.CharField(max_length=20, unique=True, verbose_name='Mes de la factura')),
                ('billing_status', models.CharField(blank=True, max_length=20, null=True, unique=True, verbose_name='Estado de la factura')),
                ('details', models.TextField(blank=True, max_length=200, null=True, unique=True, verbose_name='Detalles de la factura')),
                ('previous_reading', models.IntegerField(verbose_name='Lectura Previa')),
                ('month_consumption', models.IntegerField(verbose_name='Consumo del mes')),
                ('number_measurer', models.CharField(max_length=20, unique=True, verbose_name='Numero de contrato')),
                ('concepts', models.TextField(max_length=200, unique=True, verbose_name='Numero de contrato')),
                ('public_lighting_payment', models.IntegerField(verbose_name='Pago por alumbrado publico')),
                ('basic_charge', models.IntegerField(verbose_name='Cargo basico')),
                ('other_charges', models.IntegerField(blank=True, null=True, verbose_name='Consumo del mes ')),
                ('total_consumption', models.IntegerField(verbose_name='Total a pagar')),
                ('iva', models.IntegerField(verbose_name='Iva Vigente')),
                ('default_interest', models.IntegerField(blank=True, null=True, verbose_name='Intereses de mora')),
                ('total_payout', models.IntegerField(verbose_name='Total a pagar')),
            ],
        ),
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contract_number', models.CharField(max_length=40, unique=True, verbose_name='Numero de contrato')),
                ('start_contract', models.DateField(verbose_name='Fecha de inicio de contrato')),
                ('service', models.CharField(max_length=40, verbose_name='servicio')),
                ('service_description', models.TextField(blank=True, max_length=200, null=True, verbose_name='Descripcion del servicio')),
                ('postal_code', models.CharField(max_length=15, verbose_name='Codigo postal')),
                ('city', models.CharField(max_length=20, verbose_name='Ciudad')),
                ('neighborhood', models.CharField(max_length=50, verbose_name='Barrio')),
                ('type_of_avenue', models.CharField(max_length=15, verbose_name='Tipo de avenida')),
                ('first_number', models.CharField(max_length=15, verbose_name='Primer numero')),
                ('second_number', models.CharField(max_length=15, verbose_name='Segundo numero')),
                ('stratum_social', models.CharField(max_length=15, verbose_name='Estrato social')),
                ('n_electric_transformer', models.CharField(max_length=15, verbose_name='Numero de transformador')),
                ('transformer_property', models.CharField(max_length=20, verbose_name='Propiedades del transformador')),
                ('type_of_conection', models.CharField(max_length=20, verbose_name='Tipo de conexion')),
            ],
        ),
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('headquarters', models.CharField(max_length=15, null=True, verbose_name='sede de la empresa')),
            ],
            options={
                'abstract': False,
            },
            bases=('app1.user',),
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('Phone', models.CharField(max_length=15, null=True, verbose_name='Telefono del cliente')),
            ],
            options={
                'abstract': False,
            },
            bases=('app1.user',),
        ),
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('headquarters', models.CharField(max_length=15, null=True, verbose_name='sede de la empresa')),
            ],
            options={
                'abstract': False,
            },
            bases=('app1.user',),
        ),
        migrations.CreateModel(
            name='Operator',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('headquarters', models.CharField(max_length=15, verbose_name='sede de la empresa')),
            ],
            options={
                'abstract': False,
            },
            bases=('app1.user',),
        ),
        migrations.CreateModel(
            name='payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_method', models.CharField(max_length=20, unique=True, verbose_name='Metodo de pago')),
                ('payment_place', models.CharField(max_length=20, unique=True, verbose_name='Lugar de pago')),
                ('bill', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='app1.bill')),
            ],
        ),
        migrations.AddField(
            model_name='bill',
            name='contract',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app1.contract'),
        ),
        migrations.CreateModel(
            name='legal_entity',
            fields=[
                ('client_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='app1.client')),
                ('commercial_rate', models.IntegerField(null=True, verbose_name='tasa residencial')),
            ],
            options={
                'abstract': False,
            },
            bases=('app1.client',),
        ),
        migrations.CreateModel(
            name='natural_person',
            fields=[
                ('client_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='app1.client')),
                ('residential_rate', models.IntegerField(null=True, verbose_name='tasa residencial')),
            ],
            options={
                'abstract': False,
            },
            bases=('app1.client',),
        ),
        migrations.AddField(
            model_name='contract',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app1.client'),
        ),
    ]
