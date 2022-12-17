from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
##from django.contrib.auth.forms import UserChangeForm




# Register your models here.
admin.site.register(User)
"""admin.site.register(User)
class UserAdmin(BaseUserAdmin):
     form = UserChangeForm
  fieldsets = (
      (None, {'fields': ('email', 'password', )}),
      (_('Personal info'), {'fields': ('first_name_user', 'first_lastname_user')}),
      (_('Permissions'), {'fields': ('is_active', 'is_superuser',
                                     'groups', 'user_permissions')}),
      (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('user_info'), {'fields': ('native_name', 'phone_no')}),
  )
  add_fieldsets = (
      (None, {
          'classes': ('wide', ),
          'fields': ('email', 'password1', 'password2'),
      }),
  )
  list_display = ['email', 'first_name', 'last_name', 'is_staff', "native_name", "phone_no"]
  search_fields = ('email', 'first_name', 'last_name')
  ordering = ('email', )
admin.site.register(User, UserAdmin)"""