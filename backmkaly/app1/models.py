from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.files.storage import FileSystemStorage 
from pathlib import Path
import os



# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,email,id_card,type_card,first_name_user,sec_name_user,first_lastname_user,sec_lastname_user,city,role,image=None, username=None, password=None,is_superuser=False):
        if not email:
            raise ValueError('El usuario debe tener un correo electronico')
        if not id_card:
            raise ValueError('El usuario debe tener un numero de cedula')
        if not first_name_user:
            raise ValueError('El usuario debe tener un nombre como minimo')
        if not first_lastname_user:
            raise ValueError('El usuario debe tener un apellido como minimo')
       
        user = self.model(
            username=username,
            email= self.normalize_email(email),
            id_card=id_card,
            type_card=type_card,
            first_name_user=first_name_user,
            sec_name_user=sec_name_user,
            first_lastname_user= first_lastname_user,
            sec_lastname_user=sec_lastname_user,
            city=city,
            role=role,
            image=image
            )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,username,id_card,type_card,first_name_user,sec_name_user,first_lastname_user,sec_lastname_user,email,city, role, password, image=None):
        user=self.create_user(
            email,
            username=username,
            id_card=id_card,
            type_card=type_card,
            first_name_user=first_name_user,
            sec_name_user=sec_name_user,
            sec_lastname_user=sec_lastname_user,
            first_lastname_user=first_lastname_user,
            city=city, 
            role=role,
            image=image,
            password=password
        )
        
        user.is_superuser=True
        user.is_admin=True
        user.set_password(password)
        user.save()
        return user

        
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField('Nombre de usuario', unique=True,max_length=100, null=False)
    id_card= models.CharField('cedula', unique=True, max_length=20, null=False )
    type_card= models.CharField("Tipo de documento", max_length=20, null=False)
    first_name_user= models.CharField('primer nombre',max_length=15, null=False)
    sec_name_user= models.CharField('segundo nombre',max_length=15, null=True)
    first_lastname_user= models.CharField('primer apellido',max_length=15, null=False)
    sec_lastname_user= models.CharField('segundo apellido',max_length=15, null=True)
    email= models.EmailField('correo electronico', unique=True, max_length=254, null=False)
    #imagen = models.ImageField('Imagen de Perfil', upload_to='perfil/',height_field=None , width_field=None, max_length=200, blank=True, null=True)
    city= models.CharField("Ciudad", max_length=20, null=False)
    is_active= models.BooleanField(default=True)
    is_admin=models.BooleanField(default=False)
    role= models.CharField('nombre rol',max_length=15, null=False)
    image = models.FileField('imagen', upload_to='imagenes_ussuarios', default='https://res.cloudinary.com/dvm5lesco/image/upload/v1674920274/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8_wqmaht.jpg',max_length=400)
    objects=UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','first_name_user','sec_name_user','first_lastname_user','sec_lastname_user','id_card','type_card','city','role']
    
    class Meta: 
        verbose_name='User'
        verbose_name_plural='Users'
        ordering = ['first_lastname_user']
        
    def _str_(self):
        return f'{self.first_name_user},{self.first_lastname_user},{self.sec_name_user},{self.sec_lastname_user},{self.username},{self.id_card},{self.type_card},{self.email},{self.city},{self.is_active},{self.role}'

    def has_perm(self,perm, ob=None):
        return True
    
    def has_module_perms(self, app_label):
        return True
    
    @property
    def is_staff(self):
        return self.is_admin

class Manager(User):
    headquarters= models.CharField('sede de la empresa',max_length=15, null=True)

class Admin(User):
    headquarters= models.CharField('sede de la empresa',max_length=15, null=True)

class Client(User):
    type_client=models.CharField('Tipo de cliente',max_length=30, null=True)

class Natural_person(Client):
    Phone= models.CharField('Telefono del cliente',max_length=15, null=True)  

class Legal_entity(Client):
    Phone= models.CharField('Telefono del cliente',max_length=15, null=True)  

class Operator(User):
    headquarters= models.CharField('sede de la empresa',max_length=15)  


class Contract (models.Model):
    contract_number=models.CharField('Numero de contrato', unique=True, max_length=40, null=False)
    start_contract=models.DateField('Fecha de inicio de contrato', null=False)
    service = models.CharField('servicio', max_length=40, null=False)
    service_description = models.TextField('Descripcion del servicio', max_length=200, null=True, blank=True)
    postal_code = models.CharField('Codigo postal', max_length=15, null=False)
    city = models.CharField('Ciudad', max_length=20, null=False)
    neighborhood = models.CharField('Barrio', max_length=50, null=False)
    type_of_avenue = models.CharField('Tipo de avenida', max_length=15, null=False)
    first_number  = models.CharField('Primer numero', max_length=15, null=False)
    second_number = models.CharField('Segundo numero', max_length=15, null=False)
    stratum_social = models.IntegerField('Estrato social', null=False)
    n_electric_transformer = models.CharField('Numero de transformador', max_length=15, null=False)
    transformer_property = models.CharField('Propiedades del transformador', max_length=20, null=False)
    type_of_conection = models.CharField('Tipo de conexion', max_length=20, null=False)
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE
    )

class Publicity (models.Model):
    month_publicity = models.CharField('Mes', unique=False, max_length=20, null=True)
    type_publicity = models.CharField('Tipo de publicidad', unique=False, max_length=20, null=True)
    image_publicity =  models.FileField('imagen publicidad', upload_to='imagenes_publicidad', default='https://res.cloudinary.com/dvm5lesco/image/upload/v1674920274/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8_wqmaht.jpg',max_length=400)
    
    
class Bill (models.Model):
    bill_number = models.CharField('Numero de factura', unique=True, max_length=40, null=False)
    electronic_payment_number = models.CharField('Numero de pago electronico', max_length=40, null=True, blank=True)
    expedition_date = models.DateField('Fecha de expedicion',null=False)
    expiration_date = models.DateField('Fecha de vencimiento',null=False)
    billing_period = models.DateField('Periodo de la factura',null=False)
    billing_days = models.IntegerField('Dias de la factura',null=False)
    billing_month = models.CharField('Mes de la factura', max_length=20, null=False)
    billing_status = models.CharField('Estado de la factura', max_length=20, null=True, blank=True, default='pendiente')
    month_consumption = models.FloatField('Consumo del mes', null=False)
    public_light = models.FloatField('Valor de la luz publica', null=False, default=0)
    other_charges = models.IntegerField('Otros cargos ', null=True, blank=True)
    total_consumption=models.FloatField('Total a pagar por consumo', null=False)
    default_interest= models.FloatField('IVA', null=True, blank=True)
    total_payout = models.FloatField('Total a pagar',null=False)
    BASE_DIR = Path(__file__).resolve().parent.parent
    fs = FileSystemStorage(location=os.path.join(BASE_DIR, 'app1/static/media'))
    pdf_bill =  models.FileField('pdf factura', upload_to='pdf',max_length=4000, null = True, blank=True, storage=fs)
    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE
    )
    publicity = models.ForeignKey(
        Publicity,
        on_delete=models.CASCADE
    )

class Payment (models.Model):
    payment_method = models.CharField('Metodo de pago', unique=True, max_length=20, null=False)
    payment_place = models.CharField('Lugar de pago', unique=True, max_length=20, null=False)
    bill = models.OneToOneField (
        Bill, 
        on_delete=models.CASCADE
    ) 

