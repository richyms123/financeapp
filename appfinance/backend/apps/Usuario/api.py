# Importaciones necesarias de Django Rest Framework y otros módulos
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, JSONParser
from apps.Usuario.models import Usuario
from apps.Usuario.serializers import UsuarioSerializer
# Primera vista: Para listar y crear usuarios
@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, JSONParser])
def usuario_api_view(request):
    # Listar usuarios
    if request.method == 'GET':
        usuario = Usuario.objects.all()  # Obtener todos los usuarios
        usuario_serializer = UsuarioSerializer(usuario, many=True)  # Serializar los datos
        return Response(usuario_serializer.data, status=status.HTTP_200_OK)  # Respuesta con los usuarios
    # Crear un nuevo usuario
    elif request.method == 'POST':
        usuario_serializer = UsuarioSerializer(data=request.data)  # Serializar los datos recibidos
        if usuario_serializer.is_valid():  # Validar los datos
            usuario_serializer.save()  # Guardar el nuevo usuario
            return Response({'message': 'Usuario creado correctamente!'}, status=status.HTTP_201_CREATED) # Respuesta de éxito
        return Response(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Manejo de errores


# Segunda vista: Para manejar un usuario específico (listar, actualizar, eliminar)
@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, JSONParser])
def usuario_detail_api_view(request, pk=None):
    # Encontrar el usuario específico por su clave primaria (pk)
    usuario = Usuario.objects.filter(idUsuario=pk).first()
    # Si se encuentra el usuario
    if usuario:
        # Obtener detalles del usuario
        if request.method == 'GET':
            usuario_serializer = UsuarioSerializer(usuario) # Serializar los datos del usuario
            return Response(usuario_serializer.data, status=status.HTTP_200_OK) # Respuesta con los datos del usuario
        # Actualizar usuario
        elif request.method == 'PUT':
            usuario_serializer = UsuarioSerializer(usuario, data=request.data)# Serializar los datos
            if usuario_serializer.is_valid(): # Validar los datos
                usuario_serializer.save() # Guardar los datos
                return Response({'message':'Usuario actualizado correctamente!'}, status=status.HTTP_200_OK) # Respuesta de éxito
            return Response(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST) # Manejo de errores
        # Eliminar usuario
        elif request.method == 'DELETE':
            try:
                usuario.delete() # Eliminar el usuario
                return Response({'message':'Usuario eliminado correctamente!'}, status=status.HTTP_200_OK) # Respuesta de éxito
            except Exception as e:
                return Response({'message':'¡No es posible eliminar un usuario en uso!'}, status=status.HTTP_409_CONFLICT) # Manejo de errores
    # Si no se encuentra el usuario
    return Response({'message':'No se encontró el usuario indicado'}, status=status.HTTP_400_BAD_REQUEST)   # Manejo de errores


@api_view(['POST'])
@parser_classes([MultiPartParser,JSONParser])
def login_api_view(request):
    rfc = request.data['rfc']
    usr = Usuario.objects.filter(rfc=rfc).first()
    if usr:
        usr_srlzr = UsuarioSerializer(usr)
        return Response({
            'usuario':usr_srlzr.data,
            'message':'Usuario encontrado'
        }, status=status.HTTP_200_OK)
    return Response({
        'message':'Usuario no encontrado'}  
    ,status=status.HTTP_400_BAD_REQUEST)
