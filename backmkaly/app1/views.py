from django.shortcuts import render
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.views import View
from .models import User, Client, Admin, Manager, Operator, Contract, Bill, Legal_entity,Natural_person
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
from django.shortcuts import redirect


#from .models import 
# Create your views here.

def home(request):
    return render(request, "front pagina de inicio")



##def operator_view(request):
    
  ##  return HttpResponse("Operador")



@method_decorator(csrf_exempt)
def autenticate_view(request):
    jd = json.loads(request.body)
    
    email = jd['email']
    password = jd['password']
    username= User.objects.get(email=email).username
    
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
            operator.password = jd['password']
            operator.username = jd['username']
            operator.set_password(operator.password)
            operator.save()
            datos ={'message':"Operator successfully changed"}
            
        else:
            datos={'massage':"operator not found"}

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
            client.password = jd['password']
            client.username = jd['username']
            client.set_password(client.password)
            client.save()
            datos ={'message':"Client successfully changed"}
            
        else:
            datos={'massage':"client not found"}

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
            manager.password = jd['password']
            manager.username = jd['username']
            manager.set_password(manager.password)
            manager.save()
            datos ={'message':"Manager successfully changed"}
            
        else:
            datos={'massage':"manager not found"}

        return JsonResponse(datos)
    



def pdf_view(request):
    pdf=create_pdf(request)
    return FileResponse(pdf, as_attachment=True, filename='factura.pdf')

def send_pdf_view(request):
    pdf=create_pdf(request)
    subject = 'Hola'
    contact_message = "Pruebaaaa"
    from_email = settings.EMAIL_HOST_USER
    to_email = [from_email, 'camyj2010@gmail.com']
    EmailMsg=EmailMessage(subject,contact_message,from_email,to_email)
    EmailMsg.attach('factura.pdf',pdf,'application/pdf')
    EmailMsg.send()
    return HttpResponse("email enviado.")

def create_pdf(request):
    buffer = io.BytesIO()

    # Create the PDF object, using the buffer as its "file."
    p = canvas.Canvas(buffer)

    # Draw things on the PDF. Here's where the PDF generation happens.
    # See the ReportLab documentation for the full list of functionality.
    absolute_path = os.path.dirname(__file__)
    print(absolute_path)
    relative_path = ".\static\media\images_pdf\logo.png"
    full_path = os.path.join(absolute_path, relative_path)
    p.drawImage(full_path,10,790,width=100,height=50,mask='auto')
    pdfmetrics.registerFont(TTFont('Calibri', 'Calibri.ttf'))
    p.setFont('Calibri', 20, leading = None)
    p.drawString(130, 800, "Martin Alfonso Guerra")
    p.setFillColor(colors.yellow) 
    p.setStrokeColor(colors.brown)
    p.roundRect(380, 790, 200, 30, 5, stroke=1, fill=1)
    p.setFillColor(colors.black)
    p.setFont('Calibri', 15, leading = None)
    p.drawString(390, 800, "Total a pagar: 500lucas")
    # Close the PDF object cleanly, and we're done.
    p.showPage()
    p.save()

    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file.
    buffer.seek(0)
    pdf = buffer.getvalue()
    buffer.close()
    return pdf


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

    consumo = dic['energy consumption']
    iva = 0.19
    energyPayment = (calculateFee(stratum,type_client,consumo) * consumo)
    energyPaymentIVA = energyPayment + (energyPayment*iva)
    totalPayment = energyPaymentIVA + street_lighting_value(type_client)
     
    return totalPayment
    



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

   

    

def logout_view(request):
    logout(request)
    return HttpResponse("SE_ESTRESO_CAMILA")




