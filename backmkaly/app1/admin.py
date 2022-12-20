from django.contrib import admin
from .models import User, Contract, Client, Admin, Manager, Operator, natural_person, legal_entity, bill, payment
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
admin.site.register(natural_person)
admin.site.register(legal_entity)
admin.site.register(bill)
admin.site.register(payment)



