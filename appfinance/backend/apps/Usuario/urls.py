# Importaciones necesarias de Django
from django.urls import path
from apps.Usuario.api import usuario_api_view, usuario_detail_api_view, login_api_view
# Lista de patrones de URL
urlpatterns = [
    # URL para operaciones generales de usuarios (listar y crear)
    path('usuarios/', usuario_api_view, name='usuario_api'),
    # URL para operaciones específicas de un usuario (obtener detalles, actualizar, eliminar)
    path('usuarios/<int:pk>/', usuario_detail_api_view, name='usuario_detail_api'),
    path('login/',login_api_view, name='login_api')
]