from django.db.models import Avg, Count, Q
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Attribute, Review
from accounts.models import Account


@receiver(post_save, sender=Attribute)
def atribute_post_save(instance, created, **kwargs):
    if instance.review_template:
        template = instance.review_template
        avg = template.attributes.aggregate(avg=Avg('value'))['avg']
        template.rating = avg
        template.save()

@receiver(post_save, sender=Review)
def review_post_save(instance, created, **kwargs):
    if not created:
        reviewable = instance.reviewable
        reviewable.customer_rating = reviewable.reviews.filter(is_active=True).filter(about_customer=True).aggregate(avg=Avg('rating'))['avg']
        reviewable.executor_rating = reviewable.reviews.filter(is_active=True).exclude(about_customer=True).aggregate(avg=Avg('rating'))['avg']
        reviewable.save()
        owner = Account.objects.get(pk=instance.owner.id)
        owner.my_reviews_about_customers_count = owner.likeable.filter(is_active=True).aggregate(count=Count('review', filter=Q(review__about_customer=True )))['count']
        owner.my_reviews_about_executors_count = owner.likeable.filter(is_active=True).aggregate(count=Count('review', filter=~Q(review__about_customer=True)))['count']
        owner.save()
        if reviewable.owner:
            reviewable_owner = Account.objects.get(pk=reviewable.owner.id)
            reviewable_owner.reviews_executors_about_me_count = reviewable_owner.reviewables.aggregate(count=Count('reviews', filter=Q(reviews__about_customer=True)))['count']
            reviewable_owner.reviews_customers_about_me_count = reviewable_owner.reviewables.aggregate(count=Count('reviews', filter=~Q(reviews__about_customer=True)))['count']
            reviewable_owner.save()

    

        
    