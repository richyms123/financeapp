# Importaciones necesarias de Django y el modelo Usuario
from django.db import models
from apps.Usuario.models import Usuario
# Definición del modelo Tarjeta
class Tarjeta(models.Model):
    # Campos de la entidad
    idTarjeta = models.AutoField(primary_key=True, null=False, blank=False)
    compania = models.CharField(max_length=50, null=False, blank=False)
    tipo = models.CharField(max_length=50, null=False, blank=False)
    # Campo de texto para el número de tarjeta, debe ser único
    numero = models.CharField(max_length=16, null=False, blank=False, unique=True)
    cvv = models.CharField(max_length=3, null=False, blank=False)
    fechaVencimiento = models.CharField(max_length=5, null=False, blank=False)
    # Campo numérico para el saldo de la tarjeta
    saldo = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    # Relación de clave foránea con el modelo Usuario
    # Si se elimina un usuario, sus tarjetas asociadas también se eliminarán
    propietario = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=False, blank=False)
    # Método para representar el objeto Tarjeta como un string
    def __str__(self):
        return f"{self.idTarjeta} - {self.propietario.nombre} {self.propietario.apellido}"
