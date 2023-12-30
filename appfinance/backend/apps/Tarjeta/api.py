from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, JSONParser
from apps.Tarjeta.models import Tarjeta
from apps.Tarjeta.serializers import TarjetaSerializer, TarjetaSerializerListar


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, JSONParser])
def tarjeta_api_view(request):
     if request.method == 'GET':
        tarjeta = Tarjeta.objects.all()  # Obtener todas las tarjetas
        tarjeta_serializer = TarjetaSerializerListar(tarjeta, many=True)  # Serializar los datos
        return Response(tarjeta_serializer.data, status=status.HTTP_200_OK)  # Respuesta con las tarjetas
     # Crear una nueva tarjeta
     elif request.method == 'POST':
        tarjeta_serializer = TarjetaSerializer(data=request.data)  # Serializar los datos recibidos
        if tarjeta_serializer.is_valid():  # Validar los datos
            tarjeta_serializer.save()  # Guardar la nueva Tarjeta
            return Response({'message': 'Tarjeta creada correctamente!'}, status=status.HTTP_201_CREATED) # Respuesta de éxito
        return Response(tarjeta_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Manejo de errores
     
# Segunda vista: Para manejar una tarjeta específica (listar, actualizar, eliminar)
@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, JSONParser])
def tarjeta_detail_api_view(request, pk=None):
    # Encontrar la tarjeta específica por su clave primaria (pk)
    tarjeta = Tarjeta.objects.filter(idTarjeta=pk).first()
     # Si se encuentra la tarjeta
    if tarjeta:
        # Obtener detalles de la tarjeta
        if request.method == 'GET':
            tarjeta_serializer = TarjetaSerializerListar(tarjeta) # Serializar los datos de la tarjeta
            return Response(tarjeta_serializer.data, status=status.HTTP_200_OK) # Respuesta con los datos de la tarjeta
        # Actualizar tarjeta
        elif request.method == 'PUT':
            tarjeta_serializer = TarjetaSerializer(tarjeta, data=request.data)# Serializar los datos
            if tarjeta_serializer.is_valid(): # Validar los datos
                tarjeta_serializer.save() # Guardar los datos
                return Response({'message':'Tarjeta actualizada correctamente!'}, status=status.HTTP_200_OK) # Respuesta de éxito
            return Response(tarjeta_serializer.errors, status=status.HTTP_400_BAD_REQUEST) # Manejo de errores
        # Eliminar tarjeta
        elif request.method == 'DELETE':
            try:
                tarjeta.delete() # Eliminar la tarjeta
                return Response({'message':'Tarjeta eliminada correctamente!'}, status=status.HTTP_200_OK) # Respuesta de éxito
            except Exception as e:
                return Response({'message':'¡No es posible eliminar la tarjeta en uso!'}, status=status.HTTP_409_CONFLICT) # Manejo de errores
    # Si no se encuentra la tarjeta
    return Response({'message':'No se encontró la tarjeta indicada'}, status=status.HTTP_400_BAD_REQUEST)   # Manejo de errores

@api_view(['GET'])
@parser_classes([MultiPartParser, JSONParser])
def tarjeta_usuario_api_view(request, pk=None):
    tarjetas = Tarjeta.objects.filter(propietario=pk)
    tjts_srlzr = TarjetaSerializer(tarjetas, many=True)
    return Response(tjts_srlzr.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@parser_classes([MultiPartParser, JSONParser])
def tarjeta_numero_api_view(request, num=None):
    tarjeta = Tarjeta.objects.filter(numero=num).first()
    
    if tarjeta:
        tjts_srlzr = TarjetaSerializerListar(tarjeta)
        return Response(tjts_srlzr.data, status=status.HTTP_200_OK)
    
    return Response({'message':'No se encontró la tarjeta indicada'}, status=status.HTTP_400_BAD_REQUEST)