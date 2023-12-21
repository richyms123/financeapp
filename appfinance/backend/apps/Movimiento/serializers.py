from rest_framework import serializers
from apps.Movimiento.models import Movimiento
from apps.Tarjeta.serializers import TarjetaSerializerListar
from apps.Tarjeta.models import Tarjeta

class MovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimiento
        fields = '__all__'

class MovimientoSerializerListar(serializers.ModelSerializer):
    tarjetaDestino = TarjetaSerializerListar()
    tarjetaOrigen = TarjetaSerializerListar()
    class Meta:
        model = Movimiento
        fields = '__all__'