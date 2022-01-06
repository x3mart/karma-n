from django.db.models.aggregates import Avg
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Attribute, ReviewTemplate, Review


@receiver(post_save, sender=Attribute)
def atribute_post_save(instance, created, **kwargs):
    if instance.review_template:
        template = instance.review_template
        avg = template.attributes.aggregate(avg=Avg('value'))['avg']
        template.rating = avg
        template.save()

@receiver(post_save, sender=Review)
def review_post_save(instance, **kwargs):
    reviewable = instance.reviewable
    reviewable.rating = reviewable.reviews.aggregate(avg=Avg('rating'))['avg']
    reviewable.save()