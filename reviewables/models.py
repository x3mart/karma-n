from django.db import models
from polymorphic.models import PolymorphicModel
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Reviewable(PolymorphicModel):
    screen_name = models.CharField(max_length=150, null=True, blank=True)
    rating = models.DecimalField(decimal_places=1, default=0, max_digits=2)
    owner = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, verbose_name='Владелец', null=True, related_name='reviewables')

    class Meta:
        unique_together = ['screen_name', 'polymorphic_ctype']

    def __str__(self):
        return str(self.screen_name)

class Phone(Reviewable):

    class Meta:
        verbose_name = 'Телефон'
        verbose_name_plural = 'Телефоны'


class VK(Reviewable):
    user_id = models.PositiveIntegerField(null=True, blank=True)
    user_type = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        verbose_name = 'ВК'
        verbose_name_plural = 'ВК'


class Instagram(Reviewable):
    user_id = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        verbose_name = 'Инстаграм'
        verbose_name_plural = 'Инстаграм'

