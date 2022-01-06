from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os


def user_directory_path(instance, filename):
    name, extension = os.path.splitext(filename)
    return 'avatars/{0}/{1}{2}'.format(slugify(unidecode(instance.name)), slugify(unidecode(name)), extension)


# Create your models here.
class AccountManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Укажите Ваш e-mail')

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
            is_active = True,
            )
        user.set_password(password)
        user.save()
        return user


    def create_superuser(self, email, name, password):
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
            is_staff = True,
            is_superuser = True,
            is_active = True
            )
        user.set_password(password)
        user.save()
        return user


class Account(AbstractBaseUser, PermissionsMixin):
    class Sex(models.TextChoices):
        MALE = 'male', _('Мужчина')
        FEMALE = 'female', _('Женщина')

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, verbose_name='Ник')
    full_name = models.CharField(max_length=255, verbose_name='Имя', null=True, blank=True,)
    avatar = models.ImageField(upload_to=user_directory_path, null=True, blank=True,)
    is_private = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False, verbose_name='Сотрудник')
    birthday = models.DateField(null=True, blank=True, verbose_name='День рождения')
    sex = models.CharField(
        max_length=6,
        choices=Sex.choices,
        null=True,
        blank=True,
        verbose_name='Пол'
    )
    city = models.CharField(max_length=255, null=True, blank=True, default='Москва', verbose_name='Город')
    rating = models.DecimalField(decimal_places=1, default=0, max_digits=2, null=True, blank=True)
    about =models.TextField(null=True, blank=True,)
    services = models.ManyToManyField('services.Service', verbose_name='Услуги', related_name='accounts')

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =['name',]

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['id']
    
    def __str__(self):
        return self.name