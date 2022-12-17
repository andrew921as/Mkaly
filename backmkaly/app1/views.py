from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import User
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
    userList = User.objects.all()
    return render(request, "gestionCursos.html", {"users": userList})


def admin_editing(request,id_card):
    user = User.objects.get(id_card=id_card)
    return render(request, "edicionCurso.html", {"user":user})

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