from django.db import models


# Create your models here.
class Message(models.Model):
    title = models.CharField(max_length=255, verbose_name='Заголовок')
    body = models.TextField(verbose_name='Текст')
    owner = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, related_name='messages', verbose_name='Получатель')
    created_at = models.DateTimeField(auto_now_add=True)
    is_readed = models.BooleanField(default=False)

    class Meta:
        verbose_name='Сообщение'
        verbose_name_plural='Сообщения'
        ordering = ['-created_at', 'is_readed']