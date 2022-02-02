from django.db.models import Avg, Count, Q
from django.dispatch import receiver
from django.db.models.signals import post_save
from reviewables.views import ReviewableDetachView, reviewable_detach
from reviews.models import Attribute, AttributeTitle, UserExecutorAttributeAvgValue, UserCustomerAttributeAvgValue
from .models import Vk, Instagram, Phone, Reviewable
from accounts.models import Account


def update_account(account):
    titles = AttributeTitle.objects.all()
    account.customer_rating = account.reviewables.aggregate(avg=Avg('customer_rating'))['avg']
    account.executor_rating = account.reviewables.aggregate(avg=Avg('executor_rating'))['avg']
    account.reviews_executors_about_me_count = account.reviewables.aggregate(count=Count('reviews', filter=Q(reviews__about_customer=True)))['count']
    account.reviews_customers_about_me_count = account.reviewables.aggregate(count=Count('reviews', filter=~Q(reviews__about_customer=True)))['count']
    for title in titles.filter(about_customer=False):
        attribute, created = UserExecutorAttributeAvgValue.objects.get_or_create(account=account, title=title)
        value = account.reviewables.aggregate(avg=Avg('reviewables_executor_attributes_avg__value', filter=Q(reviewables_executor_attributes_avg__title=title)))['avg']
        attribute.value = value if value else 0
        attribute.save()
    for title in titles.filter(about_customer=True):
        attribute, created = UserCustomerAttributeAvgValue.objects.get_or_create(account=account, title=title)
        value = account.reviewables.aggregate(avg=Avg('reviewables_customer_attributes_avg__value', filter=Q(reviewables_customer_attributes_avg__title=title)))['avg']
        attribute.value = value if value else 0
        attribute.save()
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

@receiver(reviewable_detach, sender=ReviewableDetachView)
def reviewable_post_save(user, **kwargs):
    print('wow')
    account = Account.objects.get(pk=user.id)
    update_account(account)
    