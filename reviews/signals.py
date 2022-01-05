from django.db.models.aggregates import Avg
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import ReviewTemplate, Review


@receiver(post_save, sender=ReviewTemplate)
def review_template_post_save(instance, created, **kwargs):
    if instance.attributes:
        avg = instance.attributes.aggregate(avg=Avg('value'))['avg']
        if instance.rating != avg:
            instance.rating = avg
            instance.save()

@receiver(post_save, sender=Review)
def user_post_save(instance, **kwargs):
    if instance.attributes:
        avg = instance.attributes.aggregate(avg=Avg('value'))['avg']
        if instance.rating != avg:
            instance.rating = avg
            instance.save()
