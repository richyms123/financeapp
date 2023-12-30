# Importaciones necesarias de Django Rest Framework y otros módulos
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, JSONParser
from apps.Tarjeta.models import Tarjeta
from apps.Movimiento.models import Movimiento
from apps.Movimiento.serializers import MovimientoSerializer, MovimientoSerializerListar
from apps.Tarjeta.serializers import TarjetaSerializer, TarjetaSerializerListar

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, JSONParser])
def movimiento_api_view(request):
    if request.method == 'GET':
        mov = Movimiento.objects.all()  
        mov_serializado = MovimientoSerializerListar(mov, many=True)  
        return Response(mov_serializado.data, status=status.HTTP_200_OK)  

   
    elif request.method == 'POST':
        mov_serializado = MovimientoSerializer(data=request.data)  # Serializar los datos recibidos
        if mov_serializado.is_valid():  # Validar los datos
            mov_serializado.save()  # Guardar la nueva tarjeta
            return Response({'message': 'Movimiento creado correctamente!'}, status=status.HTTP_201_CREATED) # Respuesta de éxito
        return Response(mov_serializado.errors, status=status.HTTP_400_BAD_REQUEST)  # Manejo de errores

@api_view(['POST'])
@parser_classes([MultiPartParser, JSONParser])
def transferir_api_view(request):
    origen = request.data.get('origen')
    destino = request.data.get('destino')
    cantidad = int(request.data.get('cantidad', 0))

    tarjeta_origen = Tarjeta.objects.filter(idTarjeta=origen).first()
    tarjeta_destino = Tarjeta.objects.filter(idTarjeta=destino).first()

    if tarjeta_origen and tarjeta_destino:
        if tarjeta_origen.saldo >= cantidad:
            tarjeta_origen.saldo -= cantidad
            tarjeta_destino.saldo += cantidad
            tarjeta_origen.save()
            tarjeta_destino.save()
            mov = Movimiento(
                tipo='Transferencia', 
                monto=cantidad, 
                tarjetaOrigen=tarjeta_origen, 
                tarjetaDestino=tarjeta_destino
            )
            mov.save()
            return Response({'message': 'Transferencia realizada correctamente!'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Saldo insuficiente en la tarjeta de origen.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'No se encontraron las tarjetas especificadas.'}, status=status.HTTP_404_NOT_FOUND)