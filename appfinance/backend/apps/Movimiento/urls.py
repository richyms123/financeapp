# Importaciones necesarias de Django
from django.urls import path
from apps.Movimiento.api import movimiento_api_view, transferir_api_view

urlpatterns = [
    path('movimientos/', movimiento_api_view, name='movimiento_api_view'),
    path('transferir/', transferir_api_view, name='transferir_api_view'),
]