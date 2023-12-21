# Importaciones necesarias de Django
from django.urls import path
from apps.Tarjeta.api import tarjeta_api_view, tarjeta_detail_api_view, tarjeta_usuario_api_view, tarjeta_numero_api_view
# Lista de patrones de URL
urlpatterns = [
    # URL para operaciones generales de tarjetas (listar y crear)
    path('tarjetas/', tarjeta_api_view, name='tarjeta_api'),
    # URL para operaciones específicas de una tarjeta (obtener detalles, actualizar, eliminar)
    path('tarjetas/<int:pk>/', tarjeta_detail_api_view, name='tarjeta_detail_api'),
    path('tarjetas_usuario/<int:pk>/', tarjeta_usuario_api_view, name='tarjeta_usuario_api'),
    path('tarjeta_numero/<int:num>/', tarjeta_numero_api_view, name='tarjeta_numero_api'),
]