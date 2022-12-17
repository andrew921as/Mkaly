import json
from django.shortcuts import render, redirect
from django.views.generic import ListView
from django.http import HttpResponse
from .models import User
from django.core import serializers

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


def admin_view(request):
    user = User.objects.all()
    return render(request, "gestionCursos.html", {"users": user})


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

"""
class UserList(ListView):
    model = User
    template_name = "pruebaJson.html"
    
    def get_queryset(self):
        return self.model.objects.filter(is_active=True)

    def admin_get(self,request,*args,**kwargs):
        if is_ajax(request):
        #     
        #     user_list = []
        #     for user in self.get_queryset():
        #         user_data = {}
        #         user_data['username'] = user.username
        #         user_data['id_card'] = user.id_card
        #         user_data['type_card'] = user.type_card
        #         user_data['first_name_user'] = user.first_name_user
        #         user_data['sec_name_user'] = user.sec_name_user
        #         user_data['first_lastname_user'] = user.first_lastname_user
        #         user_data['sec_lastname_user'] = user.sec_lastname_user
        #         user_data['email'] = user.email
        #         user_data['city'] = user.city
        #         user_data['headquarters'] = user.headquarters
        #         user_list.append(user_data)
        #     data = json.dumps(user_list)
        #     
            data = serializers.serialize('json',self.get_queryset())
            print(data)
            return HttpResponse(data,'application/json')
        else:
           return render(request, self.template_name)
                
"""
def get_queryset():
    user = User.objects.filter(is_active=True)
    return user

def admin_get(request,*args,**kwargs):        
    data = serializers.serialize('json',get_queryset())        
    return HttpResponse(data,'application/json')


def admin_editing(request,id_card):
    user = User.objects.get(id_card=id_card)
    return render(request, "edicionCurso.html", {"users":user})

def admin_edit(request):
    username = request.POST['txtfUsername']
    id_card = request.POST['txtfDoc']
    type_card = request.POST['txtfDocType']
    first_name_user = request.POST['txtfFirstUserName']
    sec_name_user = request.POST['txtfSecUserName']
    first_lastname_user = request.POST['txtfFirstUserLastname']
    sec_lastname_user = request.POST['txtfSecUserLastname']
    email = request.POST['txtfEmail']
    city = request.POST['txtfCity']
    headquarters = request.POST['txtfHead']

    user = User.objects.get(id_card=id_card)
    user.username = username
    user.type_card = type_card
    user.first_name_user = first_name_user
    user.sec_name_user = sec_name_user
    user.first_lastname_user = first_lastname_user
    user.sec_lastname_user = sec_lastname_user
    user.email = email
    user.city = city
    user.headquarters = headquarters
    user.save()

    return redirect('/admin_view')
    

def admin_post(request):
    username = request.POST['txtfUsername']
    id_card = request.POST['txtfDoc']
    type_card = request.POST['txtfDocType']
    first_name_user = request.POST['txtfFirstUserName']
    sec_name_user = request.POST['txtfSecUserName']
    first_lastname_user = request.POST['txtfFirstUserLastname']
    sec_lastname_user = request.POST['txtfSecUserLastname']
    email = request.POST['txtfEmail']
    city = request.POST['txtfCity']
    headquarters = request.POST['txtfHead']

    #User es la tabla que se supone esta en la base de datos
    usuario = User.objects.create(username=username,id_card=id_card, type_card=type_card,first_name_user=first_name_user,
        sec_name_user=sec_name_user,first_lastname_user=first_lastname_user,
        sec_lastname_user=sec_lastname_user,email=email,city=city,headquarters=headquarters)
    return redirect('/admin_view')

def admin_delete(request,id_card):
    usuario = User.objects.get(id_card=id_card)
    usuario.delete()
    return redirect('/admin_view')