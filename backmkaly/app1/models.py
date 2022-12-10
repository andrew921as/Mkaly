from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

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
        user.save()
        return user
        
class User(AbstractBaseUser):
    username = models.CharField('Nombre de usuario', unique=True,max_length=100, null=False )
    id_card= models.CharField('cedula', unique=True, max_length=20, null=False  )
    type_card= models.CharField("Tipo de documento", max_length=20, null=False  )
    first_name_user= models.CharField('primer nombre',max_length=15, null=False )
    sec_name_user= models.CharField('segundo nombre',max_length=15, null=True )
    first_lastname_user= models.CharField('primer apellido',max_length=15, null=False )
    sec_lastname_user= models.CharField('segundo apellido',max_length=15, null=True)
    email= models.EmailField('correo electronico', unique=True, max_length=254, null=False)
    #imagen = models.ImageField('Imagen de Perfil', upload_to='perfil/',height_field=None , width_field=None, max_length=200, blank=True, null=True)
    city= models.CharField("Ciudad", max_length=20, null=False)
    is_active= models.BooleanField(default=True)
    is_admin= models.BooleanField(default=False)
    objects=UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','first_name_user','sec_name_user','first_lastname_user','sec_lastname_user','id_card','type_card','city']

    def _str_(self):
        return f'{self.first_name_user},{self.first_lastname_user},{self.sec_name_user},{self.sec_lastname_user},{self.username},{self.id_card},{self.type_card},{self.email},{self.city},{self.is_active},{self.is_admin}'

    def has_perm(self,perm, ob=None):
        return True
    
    def has_module_perms(self, app_label):
        return True
    
    @property
    def is_staff(self):
        return self.is_admin