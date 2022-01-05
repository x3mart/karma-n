from django.db import models
from django.db.models.aggregates import Avg
from polymorphic.models import PolymorphicModel
from django.template.defaultfilters import truncatechars
import django.dispatch

# Create your models here.
class Likeable(PolymorphicModel):
    body = models.TextField(null=True, blank=True)
    owner = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, related_name='%(class)s')
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)


class Review(Likeable):
    rating = models.DecimalField(decimal_places=1, default=5, max_digits=3, null=True, blank=True)
    reviewable = models.ForeignKey('reviewables.Reviewable', on_delete=models.CASCADE, related_name='reviews', null=True, blank=True)
    service = models.ForeignKey('services.Service', on_delete=models.PROTECT, related_name='reviews', verbose_name='Услуга', null=True, blank=True)
    about_customer = models.BooleanField(default=False, verbose_name='О заказчике')
    count_likes = models.IntegerField(verbose_name='Количество лайков', default=0)

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
        # ordering = ['-created_at']
    
    def __str__(self):
        return truncatechars(self.body, 55)


class Attribute(models.Model):
    value = models.DecimalField(decimal_places=1, default=5, max_digits=2)
    title = models.ForeignKey('AttributeTitle', on_delete=models.CASCADE, related_name='attributes',)
    review = models.ForeignKey('Review', on_delete=models.CASCADE, related_name='attributes', blank=True, null=True)
    review_template = models.ForeignKey('ReviewTemplate', on_delete=models.CASCADE, related_name='attributes', blank=True, null=True)


    class Meta:
        verbose_name = 'Характеристика'
        verbose_name_plural = 'Характеристики'
        unique_together = [['title', 'review'], ['title', 'review_template']]

class AttributeTitle(models.Model):
    title = models.CharField(max_length=60, verbose_name='Название')
    is_customer = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Название характеристики'
        verbose_name_plural = 'Названия характеристик'
    
    def __str__(self):
        return self.title


class Comment(Likeable):
    commented_review = models.ForeignKey('Review', on_delete=models.CASCADE, related_name='comments')


    class Meta:
        verbose_name = 'Коментарий'
        verbose_name_plural = 'Коментарии'
        ordering = ['-created_at']


class Like(models.Model):
    owner = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, related_name='likes')
    likeable = models.ForeignKey('Likeable', on_delete=models.CASCADE, related_name='likes', blank=True, null=True)
    dislike = models.BooleanField(default=False)


    class Meta:
        pass

class ReviewTemplate(models.Model):
    body = models.TextField(verbose_name='Текст')
    rating = models.DecimalField(decimal_places=1, default=5, max_digits=2)
    is_customer = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Шаблон отзыва'
        verbose_name_plural = 'Шаблоны отзывов'
    
    def __str__(self):
        return self.body


