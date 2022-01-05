from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Check(models.Model):
    screen_name = models.CharField(max_length=255, blank=True, null=True, verbose_name='телефон или ник')
    resourcetype = models.CharField(max_length=255, blank=True, null=True, verbose_name='Тип')
    code = models.PositiveIntegerField(blank=True, null=True)
    attempt = models.PositiveIntegerField(default=1)
    time = models.DateTimeField(auto_now=True)
    aproved = models.BooleanField(default=False)