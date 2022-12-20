from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core import serializers
from django.contrib.auth.hashers import make_password
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.views import View
from .models import User
from django.http.response import JsonResponse
from django.contrib import messages
import json


#from .models import 
# Create your views here.

def home(request):
    return render(request, "front pagina de inicio")

def client_view(request):
    
    return HttpResponse("Cliente")


def operator_view(request):
    
    return HttpResponse("Operador")


def manager_view(request):
    
    return HttpResponse("Gerente")

    
class AutenticateLogin(View):

    method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self,request):
        pass

    def post(self,request):
        jd = json.loads(request.body)
        username = jd['username']
        password = jd['password']
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request, user)
            datos={'The credentials seems good'}
            return JsonResponse(datos)
        else:
            datos={'The credentials are incorrect'}
            return JsonResponse(datos)

    def put(self,request):
        pass

    def delete(self,request):
        pass
        

"""
class loginView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        #username = request.POST['username']
        #password = request.POST['password']
        user = authenticate(username=request.POST['username'], password=request.POST['password'])

        if user is not None:
            login(request, user)
            print("hola")
            datos={'message':"Success"}
            
        else:   
            print("mierda")
            datos={'message':"Fail"}  
        
        return JsonResponse(datos)"""
"""
    
    def post(self,request):
        jd = json.loads(request.body)
        print(jd)
        user = authenticate(request, username=jd['username'], password=jd['password'])
        if( user is not None):
            login(request, user)
            datos={'message':"Success"}
        else:
            datos={'message':"Fail"}

        return JsonResponse(datos)   """ 

        
    
class AdminView(View):

    method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):     
        if(id > 0):
            users=list(User.objects.filter(id=id).values())
            if len(users) > 0:
                user=users[0]
                datos={'message':"Success",'users':user}
            else:
                datos={'message':"User not found..."}
            return JsonResponse(datos)
        else:   
            users = list(User.objects.values())  
            if len(users) > 0:
                datos={'message':"Success",'users':users}
            else:
                datos={'message':"Users not found..."}
            return JsonResponse(datos)
    
    def post(self, request):
        #print(request.body)
        jd = json.loads(request.body)
        #print(jd)
        user = User.objects.create(password=jd['password'],is_superuser=jd['is_superuser'],username=jd['username'],id_card=jd['id_card'], type_card=jd['type_card'],first_name_user=jd['first_name_user'],
            sec_name_user=jd['sec_name_user'],first_lastname_user=jd['first_lastname_user'],
            sec_lastname_user=jd['sec_lastname_user'],email=jd['email'],city=jd['city'],is_active=jd['is_active'],is_admin=jd['is_admin'])
        user.set_password(user.password) 
        user.save()
        datos={'message':"Success"}
        return JsonResponse(datos)

    
    def put(self,request,id):
        jd = json.loads(request.body)
        users=list(User.objects.filter(id=id).values())
        if len(users) > 0:
            user = User.objects.get(id=id)
            user.password = jd['password']
            user.is_superuser = jd['is_superuser']
            user.username = jd['username']
            user.type_card = jd['type_card']
            user.first_name_user = jd['first_name_user']
            user.sec_name_user = jd['sec_name_user']
            user.first_lastname_user = jd['first_lastname_user']
            user.sec_lastname_user = jd['sec_lastname_user']
            user.email = jd['email']
            user.city = jd['city']
            user.is_active = jd['is_active']
            user.is_admin = jd['is_admin']
            user.set_password(user.password)
            user.save()
            datos={'message':"Success"}
        else:
            datos={'message':"User not found..."}

        
        return JsonResponse(datos)
            
    """
    def delete(self,request,id):
        user=list(User.objects.filter(id=id).values())
        if len(user) > 0:
            User.objects.filter(id=id).delete()
            datos={'message':"Success"}
        else:
            datos={'message':"Users not found..."}
        return JsonResponse(datos)
"""
        


