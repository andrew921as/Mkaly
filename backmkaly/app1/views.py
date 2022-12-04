from django.shortcuts import render, redirect
from django.http import HttpResponse
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
    usuariosListados = Usuarios.objects.all()
    return render(request, "front", {"usuarios": usuariosListados})


def admin_editing(request,documento,tipo_documento,registro):
    usuario = Usuario.objects.get(documento=documento,tipo_documento=tipo_documento)
    return render(request, "plantilla editar del front", {"usuario":usuario})

def admin_edit(request):
    documento = request.POST['txtfDoc']
    tipo_documento = request.POST['txtfTipoDoc']
    pri_nombre_usuario = request.POST['txtfPriNom']
    seg_nombre_usuario = request.POST['txtfSegNom']
    pri_apellido_usuario = request.POST['txtfPrimApe']
    seg_apellido_usuario = request.POST['txtfSegApe']
    correo = request.POST['txtfCorreo']
    contraseña = request.POST['txtfCont']
    ciudad = request.POST['txtfCiudad']

    usuario = Usuario.objects.get(documento=documento,tipo_documento=tipo_documento)
    usuario.pri_nombre_usuario = pri_nombre_usuario
    usuario.seg_nombre_usuario = seg_nombre_usuario
    usuario.pri_apellido_usuario = pri_apellido_usuario
    usuario.seg_apellido_usuario = seg_apellido_usuario
    usuario.correo = correo
    usuario.contraseña = contraseña
    usuario.ciudad = ciudad
    usuario.save()

    return redirect('/admin_view')
    

def admin_post(request):
    documento = request.POST['txtfDoc']
    tipo_documento = request.POST['txtfTipoDoc']
    pri_nombre_usuario = request.POST['txtfPriNom']
    seg_nombre_usuario = request.POST['txtfSegNom']
    pri_apellido_usuario = request.POST['txtfPrimApe']
    seg_apellido_usuario = request.POST['txtfSegApe']
    correo = request.POST['txtfCorreo']
    contraseña = request.POST['txtfCont']
    ciudad = request.POST['txtfCiudad']

    usuario = Usuario.objects.create( #Usuario es la tabla que se supone esta en la base de datos
        documento=documento, tipo_documento=tipo_documento,pri_nombre_usuario=pri_nombre_usuario,
        seg_nombre_usuario=seg_nombre_usuario,pri_apellido_usuario=pri_apellido_usuario,
        seg_apellido_usuario=seg_apellido_usuario,correo=correo,contraseña=contraseña,ciudad=ciudad)

    return redirect('/admin_view')

def admin_delete(request,documento,tipo_documento):
    usuario = Usuario.objects.get(documento=documento,tipo_documento=tipo_documento)
    usuario.delete()
    return redirect('/admin_view')

