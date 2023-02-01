from django.urls import path,include
from . import views

#from django.contrib.auth.views import login, logout_then_login

urlpatterns = [
    #path('', views.home),
    #path('operator_view/', views.operator_view),
    path('admin_view/', views.AdminView.as_view(), name = 'users_list'),
    path('admin_view/<int:id>', views.AdminView.as_view(), name = 'singular_user'),
    path('admin_edit/<int:id>', views.AdminEdit.as_view(), name = 'edit_admin'),
    path('admin_enable/<int:id>', views.AdminEnable.as_view(), name = 'enable_user'),
    
    path('operator_view/', views.OperatorView.as_view(), name = 'clients_list'),
    path('operator_view/<int:id>', views.OperatorView.as_view(), name = 'singular_client'),
    path('operator_edit/<int:id>', views.OperatorEdit.as_view(), name = 'edit_operator'),
    path('client_view/<int:client_id>', views.ClientView.as_view(), name = 'singular_contract'),
    path('client_edit/<int:id>', views.ClientEdit.as_view(), name = 'edit_client'),
    path('search_all_bills/<int:client_id>', views.SearchAllBills.as_view(), name = 'search_all_bills'),
    path('search_bill/<int:bill_id>', views.SearchBill.as_view(), name = 'search_bill'),
    path('manager_view/', views.ManagerView.as_view(), name = 'analitics'),
    path('manager_edit/<int:id>', views.ManagerEdit.as_view(), name = 'edit_manager'),
    path('landing_publicity/', views.Landing_publicity.as_view(), name = 'singular_publicity'),
    #path('autenticate_view/', views.authenticate),
    path('pdf_view/', views.send_pdf_view),
    path('logout_view/', views.logout_view),
    path('autenticate_view/', views.autenticate_view),
    path('create_contract/<int:id>', views.CreateContract.as_view(), name = 'create_contract'),
    path('client_pay/<int:bill_id>', views.ClientPay.as_view(), name = 'client_pay'),
    path('create_checkout/<int:bill_num>', views.CreateCheckoutSessionView.as_view(), name = 'create_checkout'),
    #path('create_bill/<int:id>', views.CreateBill.as_view(), name = 'create_bill')
   # path('admin_editing/<id_card>', views.admin_editing),
    #path('admin_edit/', views.admin_edit),
    #path('admin_post/', views.admin_post),
    #path('admin_delete/<id_card>', views.admin_delete), 
   # path('json/', views.admin_get),  # para ajax: views.UserList.as_view()  
]