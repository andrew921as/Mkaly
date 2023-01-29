#from django.shortcuts import renderFileResponse
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.views import View
from django.core.files import File
from .models import User, Client, Admin, Manager, Operator, Contract, Bill, Legal_entity,Natural_person, Publicity
from django.http.response import JsonResponse
import json, requests, ast , io ,os
from django.http import FileResponse
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import letter, A4
from django.core.mail import EmailMessage
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
#from django.shortcuts import redirect
from datetime import date 
from dateutil.relativedelta import relativedelta
from io import BytesIO
import threading
import time
import random



#from .models import 
# Create your views here.

"""
def home(request):
    return render(request, "front pagina de inicio")
"""


##def operator_view(request):
    
  ##  return HttpResponse("Operador")



@method_decorator(csrf_exempt)
def autenticate_view(request):
    jd = json.loads(request.body)
    
    email = jd['email']
    password = jd['password']
   
    try:
        username= User.objects.get(email=email).username
        
    except ObjectDoesNotExist:
        datos={"ok": False, 'message':"Wrong credentials"}
        return JsonResponse(datos)
    user = authenticate(username=username, password=password)
    userData = list(User.objects.filter(username=user).values()) 
    
    if user is not None:
            datos={"ok": True, 'message':"Successful Login", "user": userData[0]}
            login(request, user)
            return JsonResponse(datos) 
            
    else:
        datos={"ok": False, 'message':"Wrong credentials"}
        return JsonResponse(datos)

class OperatorView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):     
        if(id > 0):
            client=list(Client.objects.filter(id=id).values())
            if len(clients) > 0:
                client=clients[0]
                datos={'message':"Success",'users':client}
            else:
                datos={'message':"User not found..."}
            return JsonResponse(datos)
        else:   
            clients = list(Client.objects.values())  
            if len(clients) > 0:
                datos={'message':"Success",'users':clients}
            else:
                datos={'message':"Users not found..."}
            return JsonResponse(datos)
    
    
    def post(self, request):
        #print(request.body)
        jd = json.loads(request.body)
        #print(jd)
        if (jd['type_client']=='natural'):
            client = Natural_person.objects.create(password=jd['password'],username=jd['username'],id_card=jd['id_card'], type_card=jd['type_card'],first_name_user=jd['first_name_user'],
                sec_name_user=jd['sec_name_user'],first_lastname_user=jd['first_lastname_user'],
                sec_lastname_user=jd['sec_lastname_user'],email=jd['email'],city=jd['city'], role='client', Phone=jd['Phone'],type_client=jd['type_client'])
        if (jd['type_client']=='legal'):
            client = Legal_entity.objects.create(password=jd['password'],username=jd['username'],id_card=jd['id_card'], type_card=jd['type_card'],first_name_user=jd['first_name_user'],
                sec_name_user=jd['sec_name_user'],first_lastname_user=jd['first_lastname_user'],
                sec_lastname_user=jd['sec_lastname_user'],email=jd['email'],city=jd['city'], role='client', Phone=jd['Phone'],type_client=jd['type_client'])
                        
        client.set_password(client.password) 
        client.save()
        datos={'message':"Success"}
        return JsonResponse(datos)
    
    
    def put(self,request,id):
        jd = json.loads(request.body)
        clients=list(Client.objects.filter(id=id).values())
        if len(clients) > 0:
            if (jd['type_client']=='natural'):
                client = Natural_person.objects.get(id=id)
                client.password = jd['password']
                client.username = jd['username']
                client.type_card = jd['type_card']
                client.first_name_user = jd['first_name_user']
                client.sec_name_user = jd['sec_name_user']
                client.first_lastname_user = jd['first_lastname_user']
                client.sec_lastname_user = jd['sec_lastname_user']
                client.email = jd['email']
                client.city = jd['city']
                client.is_active = jd['is_active']
                client.Phone=jd['Phone']
                client.type_client=jd['type_client']
                client.role = 'client'
                client.set_password(client.password)
                client.save()
                datos={'message':"Success client change"}
                
            if (jd['type_client']=='legal'):
                client = Legal_entity.objects.get(id=id)
                client.password = jd['password']
                client.username = jd['username']
                client.type_card = jd['type_card']
                client.first_name_user = jd['first_name_user']
                client.sec_name_user = jd['sec_name_user']
                client.first_lastname_user = jd['first_lastname_user']
                client.sec_lastname_user = jd['sec_lastname_user']
                client.email = jd['email']
                client.city = jd['city']
                client.is_active = jd['is_active']
                client.Phone=jd['Phone']
                client.type_client=jd['type_client']
                client.role = 'client'
                client.set_password(client.password)
                client.save()
                datos={'message':"Success client change"}
        else:
            datos={'message':"Client not found..."}

        
        return JsonResponse(datos)

class OperatorEdit(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def put(self,request,id):
        jd = json.loads(request.body)
        operators = list(Operator.objects.filter(id=id).values())
        if (len(operators) > 0):
            operator = Operator.objects.get(id=id)
            if 'password' in jd:
                operator.password = jd['password']
                operator.set_password(operator.password)
            elif 'username' in jd:
                operator.username = jd['username']
            elif 'image' in jd:
                operator.image = jd['image']
                    
            operator.save()
            datos ={'message':"Operator successfully changed"}
        else:
            datos={'massage':"operator not found"}

        return JsonResponse(datos)

class AdminEnable(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def put(self,request,id):
        jd = json.loads(request.body)
        users = list(User.objects.filter(id=id).values())
        if (len(users) > 0):
            user = User.objects.get(id=id)
            
            user.is_active = jd['is_active']        
            user.save()
            datos ={'message':"User successfully changed"}
        else:
            datos={'massage':"User not found"}

        return JsonResponse(datos)

        
    
class AdminView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):     
        if(id > 0):
            users=list(User.objects.filter(id=id).values())
            if len(users) > 0:
                user=users[0]
                datos={'message':"Success",'user':user}
            else:
                datos={'message':"User not found..."}
            return JsonResponse(datos)
        else:   
            users = list(User.objects.values())
            contracts = list(Contract.objects.values())
            bills = list(Bill.objects.values())
            if len(users) > 0:
                datos={'message':"Success list of users",'users':users,'contracts':contracts,'bills':bills}
            else:
                datos={'message':"Users not found..."}
                
            return JsonResponse(datos)
    
    def post(self, request):
        #print(request.body)
        jd = json.loads(request.body)
        #print(jd)
        if (jd['role']=='client'and jd['type_client']=='natural'):
            user = Natural_person.objects.create(password=jd['password'],username=jd['username'],id_card=jd['id_card'], type_card=jd['type_card'],first_name_user=jd['first_name_user'],
                sec_name_user=jd['sec_name_user'],first_lastname_user=jd['first_lastname_user'],
                sec_lastname_user=jd['sec_lastname_user'],email=jd['email'],city=jd['city'], role='client', Phone=jd['Phone'],type_client=jd['type_client'])
        if (jd['role']=='client'and jd['type_client']=='legal'):
            user = Natural_person.objects.create(password=jd['password'],username=jd['username'],id_card=jd['id_card'], type_card=jd['type_card'],first_name_user=jd['first_name_user'],
                sec_name_user=jd['sec_name_user'],first_lastname_user=jd['first_lastname_user'],
                sec_lastname_user=jd['sec_lastname_user'],email=jd['email'],city=jd['city'], role='client', Phone=jd['Phone'],type_client=jd['type_client'])
        if (jd['role']=='admin'):
            user = Admin.objects.create(password=jd['password'],is_superuser='True',username=jd['username'],id_card=jd['id_card'], type_card=jd['type_card'],first_name_user=jd['first_name_user'],
                sec_name_user=jd['sec_name_user'],first_lastname_user=jd['first_lastname_user'],
                sec_lastname_user=jd['sec_lastname_user'],email=jd['email'],city=jd['city'],role=jd['role'], headquarters='Sur')
        if (jd['role']=='manager'):
            user = Manager.objects.create(password=jd['password'],username=jd['username'],id_card=jd['id_card'], type_card=jd['type_card'],first_name_user=jd['first_name_user'],
                sec_name_user=jd['sec_name_user'],first_lastname_user=jd['first_lastname_user'],
                sec_lastname_user=jd['sec_lastname_user'],email=jd['email'],city=jd['city'],role=jd['role'], headquarters='Sur')
        if (jd['role']=='operator'):
            user = Operator.objects.create(password=jd['password'],username=jd['username'],id_card=jd['id_card'], type_card=jd['type_card'],first_name_user=jd['first_name_user'],
                sec_name_user=jd['sec_name_user'],first_lastname_user=jd['first_lastname_user'],
                sec_lastname_user=jd['sec_lastname_user'],email=jd['email'],city=jd['city'],role=jd['role'], headquarters='Sur')
        user.set_password(user.password) 
        user.save()
        datos={'message':"Success"}
        return JsonResponse(datos)

    
    def put(self,request,id):
        jd = json.loads(request.body)
        users=list(User.objects.filter(id=id).values())
        if len(users) > 0:
            if (jd['role']=='client'and jd['type_client']=='natural'):
                user = Natural_person.objects.get(id=id)
                user.password = jd['password']
                user.username = jd['username']
                user.type_card = jd['type_card']
                user.first_name_user = jd['first_name_user']
                user.sec_name_user = jd['sec_name_user']
                user.first_lastname_user = jd['first_lastname_user']
                user.sec_lastname_user = jd['sec_lastname_user']
                user.email = jd['email']
                user.city = jd['city']
                user.is_active = jd['is_active']
                user.role = jd['role']
                user.type_client=jd['type_client']
                user.telefono='123'
                user.set_password(user.password)
                user.save()
                datos={'message':"Success"}
            if (jd['role']=='client'and jd['type_client']=='legal'):
                user = Legal_entity.objects.get(id=id)
                user.password = jd['password']
                user.username = jd['username']
                user.type_card = jd['type_card']
                user.first_name_user = jd['first_name_user']
                user.sec_name_user = jd['sec_name_user']
                user.first_lastname_user = jd['first_lastname_user']
                user.sec_lastname_user = jd['sec_lastname_user']
                user.email = jd['email']
                user.city = jd['city']
                user.is_active = jd['is_active']
                user.role = jd['role']
                user.type_client=jd['type_client']
                user.telefono='123'
                user.set_password(user.password)
                user.save()
                datos={'message':"Success"}

            if (jd['role']=='operator'):
                user = Operator.objects.get(id=id)
                user.password = jd['password']
                user.username = jd['username']
                user.type_card = jd['type_card']
                user.first_name_user = jd['first_name_user']
                user.sec_name_user = jd['sec_name_user']
                user.first_lastname_user = jd['first_lastname_user']
                user.sec_lastname_user = jd['sec_lastname_user']
                user.email = jd['email']
                user.city = jd['city']
                user.is_active = jd['is_active']
                user.role = jd['role']
                user.headquarters='Sur'
                user.set_password(user.password)
                user.save()
                datos={'message':"Success"}

            if (jd['role']=='manager'):
                user = Manager.objects.get(id=id)
                user.password = jd['password']
                user.username = jd['username']
                user.type_card = jd['type_card']
                user.first_name_user = jd['first_name_user']
                user.sec_name_user = jd['sec_name_user']
                user.first_lastname_user = jd['first_lastname_user']
                user.sec_lastname_user = jd['sec_lastname_user']
                user.email = jd['email']
                user.city = jd['city']
                user.is_active = jd['is_active']
                user.role = jd['role']
                user.headquarters='Sur'
                user.set_password(user.password)
                user.save()
                datos={'message':"Success"}

            if (jd['role']=='admin'):
                user = Admin.objects.get(id=id)
                user.password = jd['password']
                user.is_superuser = 'True'
                user.username = jd['username']
                user.type_card = jd['type_card']
                user.first_name_user = jd['first_name_user']
                user.sec_name_user = jd['sec_name_user']
                user.first_lastname_user = jd['first_lastname_user']
                user.sec_lastname_user = jd['sec_lastname_user']
                user.email = jd['email']
                user.city = jd['city']
                user.is_active = jd['is_active']
                user.role = jd['role']
                user.headquarters='Sur'
                user.set_password(user.password)
                user.save()
                datos={'message':"Success"}
        else:
            datos={'message':"User not found..."}

        
        return JsonResponse(datos)

class AdminEdit(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def put(self,request,id):
        jd = json.loads(request.body)
        admins = list(Operator.objects.filter(id=id).values())
        if (len(admins) > 0):
            admin = Operator.objects.get(id=id)
            if 'password' in jd:
                admin.password = jd['password']
                admin.set_password(admin.password)
            elif 'username' in jd:
                admin.username = jd['username']
            elif 'image' in jd:
                admin.image = jd['image']
                    
            admin.save()
            datos ={'message':"Admin successfully changed"}
        else:
            datos={'massage':"Admin not found"}

        return JsonResponse(datos)




    
class ClientView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, client_id):     
        contracts = list(Contract.objects.filter(client_id=client_id).values())
        self_contract = Contract.objects.get(client_id=client_id)
        bills = list(Bill.objects.filter(contract_id=self_contract.id).values())
        
        #print(contracts[0].id + "---------------------------------------------------------------------------------------------------")
        if ( len(bills) > 0):
            contract=contracts[0]
            bill=bills[0]
            datos={'message':"Success",'Contract':contract,'Bill':bill}
        else:
            datos={'message':"Contract not found..."}
        return JsonResponse(datos)
         
    
    def put(self,request,id):
        jd = json.loads(request.body)
        contracts=list(Contract.objects.filter(id=id).values())
        if len(contracts) > 0:
            contract = Contract.objects.get(id=id)
            contract.contract_number = jd['contract_number']
            contract.start_contract = jd['username']
            contract.service = jd['type_card']
            contract.service_description = jd['first_name_user']
            contract.postal_code = jd['sec_name_user']
            contract.city = jd['first_lastname_user']
            contract.neighborhood = jd['sec_lastname_user']
            contract.type_of_avenue = jd['email']
            contract.first_number = jd['city']
            contract.second_nummber = jd['is_active']
            contract.stratum_social = jd['role']
            contract.n_electric_transformer = jd['n_electric_transformer']
            contract.transformer_property = jd['role']
            contract.type_of_conection = jd['role']
            contract.client = jd['client']
            datos={'message':"Success"}
        else:
            datos={'message':"Contract not found..."}

        return JsonResponse(datos)

class ClientEdit(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def put(self,request,id):
        jd = json.loads(request.body)
        clients = list(Client.objects.filter(id=id).values())
        if (len(clients) > 0):
            client = Client.objects.get(id=id)
            if 'password' in jd:
                client.password = jd['password']
                client.set_password(client.password)
            elif 'username' in jd:
                client.username = jd['username']
            elif 'image' in jd:
                client.image = jd['image']
                    
            client.save()
            datos ={'message':"Client successfully changed"}
            
            
        else:
            datos={'massage':"Client not found"}

        return JsonResponse(datos)


class ManagerView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):        
        clients = list(Client.objects.values())
        contracts = list(Contract.objects.values())
        bills = list(Bill.objects.values())
        if len(clients) > 0:
            datos={'message':"Success list of analitics",'clients':clients,'contracts':contracts,'bills':bills}
        else:
            datos={'message':"Analitics not found..."}
            
        return JsonResponse(datos)

class ManagerEdit(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def put(self,request,id):
        jd = json.loads(request.body)
        managers = list(Operator.objects.filter(id=id).values())
        if (len(managers) > 0):
            manager = Manager.objects.get(id=id)
            if 'password' in jd:
                manager.password = jd['password']
                manager.set_password(manager.password)
            elif 'username' in jd:
                manager.username = jd['username']
            elif 'image' in jd:
                manager.image = jd['image']
                    
            manager.save()
            datos ={'message':"Manager successfully changed"}
            
        else:
            datos={'massage':"Manager not found"}

        return JsonResponse(datos)

class Landing_publicity(View):
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)  

    def post(self, request):
        #print(request.body)
        jd = json.loads(request.body)
        #print(jd)
        
        Publi = Publicity.objects.create(
        month_publicity=jd['month_publicity'], type_publicity=jd['type_publicity'],image_publicity=jd['image_publicity'])
              
        Publi.save()
        datos={'message':"Success"}
        return JsonResponse(datos)
    


class CreateContract(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, id):
        #print(request.body)
        clients=list(Client.objects.filter(id=id).values())
        client=clients[0]   
        jd = json.loads(request.body)
        #print(jd)
        if (client["type_client"] == 'natural'):
            contract = Contract.objects.create(contract_number=jd['contract_number'],start_contract=jd['start_contract'],
            service=jd['service'],service_description=jd['service_description'],postal_code=jd['postal_code'],
            city=jd['city'],neighborhood=jd['neighborhood'],type_of_avenue=jd['type_of_avenue'],
            first_number=jd['first_number'],second_number=jd['second_number'],stratum_social=jd['stratum_social'],n_electric_transformer=jd['n_electric_transformer'],
            transformer_property=jd['transformer_property'],type_of_conection=jd['type_of_conection'],client_id=client["id"])
            #generateBills(client["id"],jd['stratum_social'],client["type_client"])
            

        if (client["type_client"] == 'legal'):
            contract = Contract.objects.create(contract_number=jd['contract_number'],start_contract=jd['start_contract'],
            service=jd['service'],service_description=jd['service_description'],postal_code=jd['postal_code'],
            city=jd['city'],neighborhood=jd['neighborhood'],type_of_avenue=jd['type_of_avenue'],
            first_number=jd['first_number'],second_number=jd['second_number'],stratum_social=jd['stratum_social'],n_electric_transformer=jd['n_electric_transformer'],
            transformer_property=jd['transformer_property'],type_of_conection=jd['type_of_conection'],client_id=client["id"])    
            #generateBills(client["id"],jd['stratum_social'],client["type_client"])
        contract.save()
        
        contracts=list(Contract.objects.filter(contract_number=jd["contract_number"]).values())
        contractt=contracts[0]
        generateBills(contractt["id"],client["id"],contractt['stratum_social'],client["type_client"])
        datos={'message':"Success"}
        return JsonResponse(datos)
"""
class CreateBill(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, id):
        #print(request.body)
        clients=list(Client.objects.filter(id=id).values())
        client=clients[0]   
        contracts=list(Contract.objects.filter(client_id=client["id"]).values())
        contract=contracts[0]
        #contract object (12)
        print(contract)
        #print(jd)
        if (client["type_client"] == 'natural'):
            generateBills(contract["id"],client["id"],contract["stratum_social"],client["type_client"])
        if (client["type_client"] == 'legal'):
            generateBills(contract["id"],client["id"],contract["stratum_social"],client["type_client"])
            #generateBills(client["id"],jd['stratum_social'],client["type_client"])
        datos={'message':"Success"}
        return JsonResponse(datos)
"""
def caso2E(date):
    i = date.day
    number = 0
    while(i != 2 ): 
        if((date + relativedelta(days=number)).month != date.month):
            break
        else:
            number += 1
   
    return relativedelta(days=number+1) + date , number+1


def expeditionDate(date):
    interval1 = relativedelta(days=1)
    usar = date + interval1
    if(date.day < 2):
        fechita = usar
    elif (date.day > 2):
        fechita = caso2E(date)[0]
    else:
        fechita = date
    
    return fechita


def caso2B(date):
    i = date.day
    number = 0
    while(i != 2 ): 
        if((date + relativedelta(days=number)).month != date.month):
            break
        else:
            number += 1
   
    return relativedelta(days=number+1) + date


def billPeriod(date):
    interval1 = relativedelta(days=1)
    usar = date + interval1
    if(date.day < 2):
        fechita = usar
    elif (date.day > 2):
        fechita = caso2B(date)
    else:
        fechita = date
    
    return fechita

def caso1y2B(date):
    i = date.day
    number = 0
    while(i != 2 ): 
        if((date - relativedelta(days=number)).day == 2):
            break
        else:
            number += 1
    if(date.day == 1):
        return date - relativedelta(days=number+1) 
    else:
        return date - relativedelta(days=number) 


def dateBefore(date):
    if(date.day < 2 or date.day > 2):
        fechita = caso1y2B(date)
    else:
        fechita = date
    
    return fechita

def generateBills(idContract,idClient,stratum,type_client,billPeriod=date.today()):  
    expedition = expeditionDate(date.today())
    interval = 30
    interval_convert = relativedelta(days=interval)
    expiration = expedition + interval_convert
    nosabemos = 12347
    previous_month = expedition - relativedelta(days=3)
    bill_month = previous_month.strftime("%B")
    function_total = total_Payment(idClient,stratum,type_client)
    billNumber = random.getrandbits(10)
    
    bill = Bill.objects.create(bill_number=billNumber,electronic_payment_number=nosabemos,expedition_date= expedition,
    expiration_date=expiration, billing_period=billPeriod,billing_days=interval,billing_month=bill_month,
    month_consumption=function_total[0],other_charges=street_lighting_value(type_client),
    total_consumption=function_total[2],default_interest=function_total[1],
    total_payout=function_total[3],contract_id=idContract,publicity_id=1) #aca no pongo status porque hay un default
    bill.save()
    bill = Bill.objects.get(bill_number=billNumber)
    pdf = create_pdf()
    bill.pdf_bill.save("factura.pdf", File(BytesIO(pdf)))
    
    



def generateBillsPerMonth(idContract,idClient,stratum,type_client,billPeriod):
        generateBills(idContract,idClient,stratum,type_client,dateBefore(date.today()))

def allTheClients():
    client = list(Client.objects.values())
    contract = list(Contract.objects.values())

    for i in range(len(client)):
        for j in range(len(contract)):
            if (client[i]["id"] == contract[j]["client_id"]):
                generateBillsPerMonth(contract[j]["id"],client[i]["id"],contract[j]["stratum"],client[i]["type_client"])
# Tarea a ejecutarse cada determinado tiempo.
def timer():
    while True:
        time.sleep(30*86400)
        allTheClients()
       # 3 segundos.
# Iniciar la ejecución en segundo plano.
t = threading.Thread(target=timer)
t.start()


def pdf_view(request):
    pdf=create_pdf()
    return FileResponse(pdf, as_attachment=True, filename='factura.pdf')

def send_pdf_view(request):
    pdf=create_pdf()
    subject = 'Hola'
    contact_message = "Pruebaaaa"
    from_email = settings.EMAIL_HOST_USER
    to_email = [from_email, 'camyj2010@gmail.com']
    EmailMsg=EmailMessage(subject,contact_message,from_email,to_email)
    EmailMsg.attach('factura.pdf',pdf,'application/pdf')
    EmailMsg.send()
    return HttpResponse("email enviado.")

def create_pdf():
    buffer = io.BytesIO()

    # Create the PDF object, using the buffer as its "file."
    p = canvas.Canvas(buffer)

    # Draw things on the PDF. Here's where the PDF generation happens.
    # See the ReportLab documentation for the full list of functionality.
  # Create the PDF object, using the buffer as its "file."
    p = canvas.Canvas(buffer, pagesize=(200,260), bottomup=0)
    # Draw things on the PDF. Here's where the PDF generation happens.
    # See the ReportLab documentation for the full list of functionality.
    # Logo Section
# Setting th origin to (10,40)
    p.translate(10,40)
    # Inverting the scale for getting mirror Image of logo
    # Inserting Logo into the Canvas at required position
    # Title Section
    # Again Inverting Scale For strings insertion
    # Again Setting the origin back to (0,0) of top-left
    p.translate(-10,-40)
    # Setting the font for Name title of company
    p.setFont("Helvetica-Bold",10)
    # Inserting the name of the company
    #p.drawCentredString(125,20,"XYZ PRIVATE LIMITED")
    # For under lining the title
    #p.line(70,22,180,22)
    # Changing the font size for Specifying Address
    absolute_path = os.path.dirname(__file__)
    print(absolute_path)
    relative_path = ".\static\media\images_pdf\logo.png"
    full_path = os.path.join(absolute_path, relative_path)
    p.saveState()
    p.scale(1,-1)
    x_val = 10
    y_val = -40
    p.drawImage(full_path,x_val,y_val,width=60,height=30)
    p.restoreState()
    p.setFillColorRGB(2, 62, 138)
    p.setLineWidth(0.4)
    p.roundRect(116,10,75,30,5,stroke=1,fill=True)
    p.setFillColor(canvas.black)
    p.setFont("Helvetica-Bold",3.5)
    p.drawCentredString(130,16,"Nombre         :")
    p.drawCentredString(160,16,"CARLOS CACERES") # DATO NOMBRE
    p.drawCentredString(130,21,"Estrato          :")
    p.drawCentredString(160,21,"4") # DATO ESTRATO
    p.drawCentredString(130,26,"Tipo               :")
    p.drawCentredString(160,26,"Natural") # DATO TIPO DE PERSONA
    p.drawCentredString(130,31,"No. Contrato :")
    p.drawCentredString(160,31,"8563") # DATO CONTRATO
    p.drawCentredString(130,36,"Dirreccion     :")
    p.drawCentredString(160,36,"CALLE 14 B 33 101") # DATO DIRRECCION
    # p.setFont("Helvetica-Bold",5)
    # p.drawCentredString(125,30,"Block No. 101, Triveni Apartments, Pitam Pura,")
    # p.drawCentredString(125,35,"New Delhi - 110034, India")
    # # Changing the font size for Specifying GST Number of firm
    # p.setFont("Helvetica-Bold",6)
    # p.drawCentredString(125,42,"GSTIN : 07AABCS1429B1Z")
    # Line Seprating the page header from the body
    p.setLineWidth(0.4)
    p.line(5,45,195,45)
    # Document Information
    # SOYYYY YOOOOOOOOOOOOOOOOOOOO
    # Changing the font for Document title
    p.setFont("Courier-Bold",6)
    p.drawCentredString(100,55,"RECIBO DE CONSUMO")
    # This Block Consist of Costumer Details
    #p.roundRect(15,63,170,40,10,stroke=1,fill=0)
    p.setFont("Helvetica-Bold",4)
    p.drawRightString(65,70,"No. Factura             :")
    p.drawCentredString(75,70,"3560") # DATO NUMERO DE FACTURA
    p.drawRightString(65,75,"No. Factura Electornica :")
    p.drawCentredString(75,75,"3301") # DATO NUMERO DE FACTURA ELECTRONICA
    p.drawRightString(135,70,"Fecha Expedicion:")
    p.drawRightString(160,70,"02/05/2023") # DATO FECHA DE EXPEDICION
    p.drawRightString(135,75,"Fecha Expiracion:")
    p.drawRightString(160,75,"02/05/2023") # DATO FECHA DE EXPIRACION
    p.drawRightString(135,80,"Periodo:")
    p.drawCentredString(150,80,"01") # DATO PERIODO
    p.drawRightString(135,85,"Dia:")
    p.drawCentredString(150,85,"02") # DATO DIA
    p.drawRightString(135,90,"Mes:")
    p.drawCentredString(150,90,"02") # DATO MES
    # This Block Consist of Item Description
    #p.roundRect(15,108,170,30,10,stroke=1,fill=0)
    p.setLineWidth(0.4)
    p.line(15,120,185,120)
    p.drawCentredString(30,116,"CONSUMO")
    p.drawCentredString(30,126,"100") # DATO CONSUMO
    p.drawCentredString(65,114,"VALOR")
    p.drawCentredString(65,118,"UNITARIO")
    p.drawCentredString(65,126,"1000000,00") # DATO VALOR UNITARIO
    p.drawCentredString(95,114,"VALOR")
    p.drawCentredString(95,118,"TOTAL")
    p.drawCentredString(95,126,"1000000,00") # DATO VALOR TOTAL
    p.drawCentredString(130,114,"SUBSIDIO")
    p.drawCentredString(130,118,"(CONTRIBUCION)")
    p.drawCentredString(130,126,"1000000,00") # DATO SUBSIDIO  
    p.drawCentredString(165,114,"TOTAL")
    p.drawCentredString(165,118,"CONSUMO")
    p.drawCentredString(165,126,"1000000,00") # DATO CONSUMO TOTAL  
    # Drawing table for Item Description
    p.line(15,210,185,210)
    # p.line(45,108,45,220)
    # p.line(75,108,75,220)
    # p.line(105,108,105,220)
    # p.line(135,108,135,220)
    # p.line(160,108,160,220)
    # Declaration and Signature
    p.setFont("Helvetica-Bold",3)
    p.drawCentredString(42,160,"173 kWh-mes para alturas inferiores a 1000m")
    p.drawCentredString(26,165,"sobre el nivel del mar")
    p.drawCentredString(50,170,"130 kWh-mes para alturas iguales o superiores a 1000m")
    p.drawCentredString(26,175,"sobre el nivel del mar")
    p.drawRightString(160,170,"Alumbrado publico:")
    p.drawCentredString(170,170,"100000,00") # DATO ALUMBRADO PUBLICO
    p.drawRightString(160,160,"IVA:")
    p.drawCentredString(170,160,"19%")
    p.drawRightString(160,165,"Otros:")
    p.drawCentredString(170,165,"100000,00") # DATO OTROS
    p.setFillColorRGB(255,255,0)
    p.setLineWidth(0.4)
    p.roundRect(91,180,90,20,5,stroke=1,fill=True)
    p.setFillColor(canvas.black)
    p.drawRightString(140,188,"PAGO TOTAL (CONSUMO) :")
    p.drawCentredString(150,188,"100000,00") # DATO PAGO TOTAL CONSUMO
    p.drawRightString(140,193,"PAGO TOTAL           :")
    p.drawCentredString(150,193,"100000,00") # DATO PAGO TOTAL 
    p.line(15,220,185,220)
    p.line(100,220,100,238)
    p.drawString(20,225,"We declare that above mentioned")
    p.drawString(20,230,"information is true.")
    p.drawString(20,235,"(This is system generated invoice)")
    p.drawRightString(180,235,"Authorised Signatory")
    p.showPage()
    p.save()

    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file.
    buffer.seek(0)
    pdf = buffer.getvalue()
    buffer.close()
    return pdf
"""
def consumption(id):
        url = "https://energy-service-ds-v3cot.ondigitalocean.app/consumption"
        payload = json.dumps({
        "client_id": id,
        })
        headers = {
        'Content-Type': 'application/json'
        }
        response = requests.request("POST", url, headers=headers, data=payload)
        dic = ast.literal_eval(response.text)

        consumo = dic['energy consumption']

        return consumo
"""

def calculateFee(stratum,type_client,consumo): 
    # CS : subsistence consumption , E: Stratum, C: Comercial or Contribution
    feeE1 = 0.7
    feeE2 = 0.4
    feeE3 = 0.15

    contributionE5 = 0.2
    contributionE6 = 0.2
    contributionC = 0.2

    CSE1 = 330.66
    CSE2 = 413.12
    CSE3 = 673.77
    CSE4 = 792.56
    CSE5 = 951.07
    CSE6 = 951.07
    CSC = 765.65

    CSCC = CSC + (CSC*contributionC)

    feePreCSE1 = CSE1 - (feeE1*CSE1)
    feePreCSE2 = CSE2 - (feeE2*CSE2)
    feePreCSE3 = CSE3 - (feeE3*CSE3)
    feePreCSE4 = CSE4

    feeCE5 = CSE5 + (contributionE5*CSE5)
    feeCE6 = CSE6 + (contributionE6*CSE6)

    feeSubCSE1 = feePreCSE1 + (consumo - 130)*CSE1
    feeSubCSE2 = feePreCSE2 + (consumo - 130)*CSE2
    feeSubCSE3 = feePreCSE3 + (consumo - 130)*CSE3
    feeSubCSE4 = feePreCSE4 + (consumo - 130)*CSE4
    
    fee = 0

    if (type_client == "natural"):
        if (consumo <= 130):
            if(stratum == 1):
                fee = feePreCSE1
            elif(stratum == 2):
                fee = feePreCSE2
            elif(stratum == 3):
                fee = feePreCSE3
            elif(stratum == 4):
                fee = feePreCSE4
            elif(stratum == 5):
                fee = feeCE5
            elif(stratum == 6):
                fee = feeCE6
        else:
            if(stratum == 1):
                fee = feeSubCSE1
            elif(stratum == 2):
                fee = feeSubCSE2
            elif(stratum == 3):
                fee = feeSubCSE3
            elif(stratum == 4):
                fee = feeSubCSE4
            elif(stratum == 5):
                fee = feeCE5
            elif(stratum == 6):
                fee = feeCE6
    elif (type_client == "legal"):
        fee = CSCC

    return fee

"""  
def subsidy(stratum):
    if (stratum == 1):
        subsidy = 0.7
    elif (stratum == 2):
        subsidy = 0.4
    elif (stratum == 3):
        subsidy == 0.15
        
    return subsidy
"""


def street_lighting_value(type_client):
    if (type_client == "natural"):
        street_lighting = 21590.86
    elif (type_client == "legal"):
        street_lighting = 30000

    return street_lighting

def total_Payment(id,stratum,type_client):
    
    url = "https://energy-service-ds-v3cot.ondigitalocean.app/consumption"
    payload = json.dumps({
    "client_id": id,
    })
    headers = {
    'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    dic = ast.literal_eval(response.text)

    transform = int(dic['energy consumption'])
    consumo = transform
    iva = 0.19
    street_value = street_lighting_value(type_client)
    energyPayment = (calculateFee(stratum,type_client,consumo) * consumo)
    energyPaymentIVA = energyPayment + (energyPayment*iva)
    totalPayment = energyPaymentIVA + street_value
     
    return consumo,iva,energyPayment,totalPayment
    




   

    

def logout_view(request):
    logout(request)
    return HttpResponse("SE_ESTRESO_CAMILA")





