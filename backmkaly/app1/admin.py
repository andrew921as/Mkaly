from django.contrib import admin
from .models import User, Contract, Client, Admin, Manager, Operator, Natural_person, Legal_entity, Bill, Payment,Publicity
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin 
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
# from django.contrib.auth.forms import UserChangeForm


# Register your models here.
admin.site.register(User)
admin.site.register(Contract)
admin.site.register(Client)
admin.site.register(Admin)
admin.site.register(Manager)
admin.site.register(Operator)
admin.site.register(Natural_person)
admin.site.register(Legal_entity)
admin.site.register(Bill)
admin.site.register(Payment)
admin.site.register(Publicity)



