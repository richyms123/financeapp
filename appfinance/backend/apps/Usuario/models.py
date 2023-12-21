from django.db import models

# Create your models here.
class Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    rfc=models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre
    