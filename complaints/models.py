from django.db import models

# Create your models here.
class Complaint(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.TextField(verbose_name='Текст')
    owner = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, related_name='my_complaints')
    accused  = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, related_name='complaints_about_me', null=True)
    review  = models.PositiveIntegerField(null=True)
    comment  = models.PositiveIntegerField(null=True)
    is_readed = models.BooleanField(default=False)
    is_closed = models.BooleanField(default=False)
    resume = models.TextField(verbose_name='Что сделано')

    class Meta:
        verbose_name = 'Жалоба'
        verbose_name_plural = 'Жалобы'
        ordering = ['-created_at', 'is_readed']


class ComplaintTemplate(models.Model):
    body = models.TextField(verbose_name='Текст')

    class Meta:
        verbose_name = 'Шаблон жалобы'
        verbose_name_plural = 'Шаблоны жалоб'
