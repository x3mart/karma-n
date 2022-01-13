from django.db import models

# Create your models here.
class ServiceCategory(models.Model):
    title = models.CharField(verbose_name='Название', max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
    
    def __str__(self):
        return self.title

class Service(models.Model):
    title = models.CharField(verbose_name='Название', max_length=255)
    is_active = models.BooleanField(default=True)
    category = models.ForeignKey('ServiceCategory', on_delete=models.PROTECT, verbose_name='Категория', related_name='services')

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'
        unique_together = ['title', 'category']
    
    def __str__(self):
        return self.title