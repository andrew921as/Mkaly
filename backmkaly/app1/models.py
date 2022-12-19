from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin 



# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,email,id_card,type_card,first_name_user,sec_name_user,first_lastname_user,sec_lastname_user,city,username=None, password=None):
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
            city=city

            )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,username,id_card,type_card,first_name_user,sec_name_user,first_lastname_user,sec_lastname_user,email,city, password ):
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
            password=password
        )
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
    is_admin= models.BooleanField(default=False)
    objects=UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','first_name_user','sec_name_user','first_lastname_user','sec_lastname_user','id_card','type_card','city']
    
    class Meta: 
        verbose_name='User'
        verbose_name_plural='Users'
        ordering = ['first_lastname_user']
        
    def _str_(self):
        return f'{self.first_name_user},{self.first_lastname_user},{self.sec_name_user},{self.sec_lastname_user},{self.username},{self.id_card},{self.type_card},{self.email},{self.city},{self.is_active},{self.is_admin}'

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
    Phone= models.CharField('Telefono del cliente',max_length=15, null=True)  


class natural_person(Client):
    residential_rate=models.IntegerField('tasa residencial', null=True)

class legal_entity(Client):
    commercial_rate=models.IntegerField('tasa residencial', null=True)
      
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
    stratum_social = models.CharField('Estrato social', max_length=15, null=False)
    n_electric_transformer = models.CharField('Numero de transformador', max_length=15, null=False)
    transformer_property = models.CharField('Propiedades del transformador', max_length=20, null=False)
    type_of_conection = models.CharField('Tipo de conexion', max_length=20, null=False)
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE
    )

class bill (models.Model):
    bill_number = models.CharField('Numero de factura', unique=True, max_length=40, null=False)
    electronic_payment_number = models.CharField('Numero de pago electronico', unique=True, max_length=40, null=True, blank=True)
    expedition_date = models.DateField('Fecha de expedicion',null=False)
    expiration_date = models.DateField('Fecha de vencimiento',null=False)
    billing_period = models.DateField('Periodo de la factura',null=False)
    billing_days = models.IntegerField('Dias de la factura',null=False)
    billing_month = models.CharField('Mes de la factura', unique=True, max_length=20, null=False)
    billing_status = models.CharField('Estado de la factura', unique=True, max_length=20, null=True, blank=True)
    details = models.TextField('Detalles de la factura', unique=True, max_length=200, null=True, blank=True)
    previous_reading = models.IntegerField('Lectura Previa', null=False)
    month_consumption = models.IntegerField('Consumo del mes', null=False)
    number_measurer = models.CharField('Numero de contrato', unique=True, max_length=20, null=False)
    concepts = models.TextField('Numero de contrato', unique=True, max_length=200, null=False)
    public_lighting_payment = models.IntegerField('Pago por alumbrado publico', null=False)
    basic_charge = models.IntegerField('Cargo basico', null=False)
    other_charges = models.IntegerField('Consumo del mes ', null=True, blank=True)
    total_consumption=models.IntegerField('Total a pagar', null=False)
    iva = models.IntegerField('Iva Vigente',null=False)
    default_interest= models.IntegerField('Intereses de mora', null=True, blank=True)
    total_payout = models.IntegerField('Total a pagar',null=False)
    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE
    )

class payment (models.Model):
    payment_method = models.CharField('Metodo de pago', unique=True, max_length=20, null=False)
    payment_place = models.CharField('Lugar de pago', unique=True, max_length=20, null=False)
    bill = models.OneToOneField (
        bill, 
        on_delete=models.CASCADE
    ) 