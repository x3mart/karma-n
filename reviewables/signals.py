from django.db.models.aggregates import Avg
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Vk, Instagram, Phone, Reviewable


def update_account(account):
    account.customer_rating = account.reviewables.aggregate(avg=Avg('customer_rating'))['avg']
    account.executor_rating = account.reviewables.aggregate(avg=Avg('executor_rating'))['avg']
    account.save()

@receiver(post_save, sender=Reviewable)
def reviewable_post_save(instance, **kwargs):
    if instance.owner:
        update_account(instance.owner)
        

@receiver(post_save, sender=Phone)
def phone_post_save(instance, **kwargs):
    if instance.owner:
        update_account(instance.owner)

@receiver(post_save, sender=Vk)
def vk_post_save(instance, **kwargs):
    if instance.owner:
        update_account(instance.owner)

@receiver(post_save, sender=Instagram)
def instagram_post_save(instance, **kwargs):
    if instance.owner:
        update_account(instance.owner)
    