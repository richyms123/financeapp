# Importamos el módulo serializers de Django Rest Framework, que nos permite crear serializadores para modelos,
# y los modelos y serializadores necesarios de nuestras aplicaciones.
from rest_framework import serializers
from apps.Tarjeta.models import Tarjeta
from apps.Usuario.serializers import UsuarioSerializer
# Definimos TarjetaSerializer, que hereda de ModelSerializer.
# Este serializador se utiliza para convertir instancias de Tarjeta a JSON y viceversa.
class TarjetaSerializer(serializers.ModelSerializer):
    # Meta clase interna define las configuraciones específicas del serializador.
    class Meta:
        model = Tarjeta  # Especificamos que el modelo relacionado es Tarjeta.
        fields = '__all__'  # Utilizamos '_all_' para incluir todos los campos del modelo en el serializador.
# Definimos TarjetaSerializerListar, similar a TarjetaSerializer, pero con un enfoque en listar tarjetas.
class TarjetaSerializerListar(serializers.ModelSerializer):
    # Aquí, definimos un campo anidado para 'propietario'.
    # Este campo utiliza UsuarioSerializer para representar detalladamente al propietario de la tarjeta.
    propietario = UsuarioSerializer()
    # La clase Meta interna proporciona las configuraciones para este serializador.
    class Meta:
        model = Tarjeta  # Asociamos este serializador con el modelo Tarjeta.
        fields = '__all__'  # Incluimos todos los campos del modelo Tarjeta en el serializador.