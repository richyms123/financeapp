from django.db import models
from apps.Tarjeta.models import Tarjeta

# Create your models here.
class Movimiento(models.Model):
    idMovimiento = models.AutoField(primary_key=True)
    tarjetaDestino = models.ForeignKey(Tarjeta, on_delete=models.CASCADE, related_name='tarjetaDestino')
    tarjetaOrigen = models.ForeignKey(Tarjeta, on_delete=models.CASCADE, related_name='tarjetaOrigen')
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=20)
    concepto = models.CharField(max_length=20)
    fecha = models.DateTimeField(auto_now_add=True,null=False,blank=False)
   
    def __str__(self):
        return  f"{self.tarjetaOrigen.numero} -> {self.tarjetaDestino.numero}  ${self.monto}"
