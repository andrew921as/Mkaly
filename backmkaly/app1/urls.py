from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('client_view/', views.client_view),
    path('operator_view/', views.operator_view),
    path('manager_view/', views.manager_view),
    path('admin_post/', views.admin_post),
    path('admin_delete/<id_card>', views.admin_delete),
    path('admin_editing/<id_card>', views.admin_editing),
    path('admin_edit/', views.admin_edit),
    path('admin_view/', views.admin_view),
    
]