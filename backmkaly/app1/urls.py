from django.urls import path,include
from . import views

#from django.contrib.auth.views import login, logout_then_login

urlpatterns = [
    path('', views.home),
    path('client_view/', views.client_view),
    #path('operator_view/', views.operator_view),
    path('manager_view/', views.manager_view),
    path('admin_view/', views.AdminView.as_view(), name = 'users_list'),
    path('admin_view/<int:id>', views.AdminView.as_view(), name = 'singular_user'),
    #path('login_view/', views.loginView.as_view(), name = 'login'),
    path('operator_view/', views.OperatorView.as_view(), name = 'clients_list'),
    path('operator_view/<int:id>', views.OperatorView.as_view(), name = 'singular_client'),
    path('autenticate_view/', views.autenticate_view),
   # path('admin_editing/<id_card>', views.admin_editing),
    #path('admin_edit/', views.admin_edit),
    #path('admin_post/', views.admin_post),
    #path('admin_delete/<id_card>', views.admin_delete), 
   # path('json/', views.admin_get),  # para ajax: views.UserList.as_view()  
]