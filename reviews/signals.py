from django.db.models import Avg, Count, Q
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Attribute, Review, ReviewableCustomerAttributeAvgValue, ReviewableExecutorAttributeAvgValue, Comment
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
    if not created and instance.about_customer:
        attributes = instance.attributes.all()
        reviewable = instance.reviewable
        for attribute in attributes:
            reviewable_attribute, created = ReviewableCustomerAttributeAvgValue.objects.get_or_create(reviewable=reviewable, title=attribute.title)
            reviewable_attribute.value = reviewable.reviews.filter(is_active=True).aggregate(avg=Avg('attributes__value', filter=Q(attributes__title=attribute.title)))['avg']
            reviewable_attribute.save()
        reviewable.customer_rating = reviewable.reviews.filter(is_active=True).filter(about_customer=True).aggregate(avg=Avg('rating'))['avg']
        reviewable.save()
        owner = Account.objects.get(pk=instance.owner.id)
        owner.my_reviews_about_customers_count = owner.likeable.filter(is_active=True).aggregate(count=Count('review', filter=Q(review__about_customer=True )))['count']
        owner.save()
    elif not created and not instance.about_customer:
        attributes = instance.attributes.all()
        reviewable = instance.reviewable
        for attribute in attributes:
            reviewable_attribute, created = ReviewableExecutorAttributeAvgValue.objects.get_or_create(reviewable=reviewable, title=attribute.title)
            reviewable_attribute.value = reviewable.reviews.filter(is_active=True).aggregate(avg=Avg('attributes__value', filter=Q(attributes__title=attribute.title)))['avg']
            reviewable_attribute.save()
        reviewable.executor_rating = reviewable.reviews.filter(is_active=True).exclude(about_customer=True).aggregate(avg=Avg('rating'))['avg']
        reviewable.save()
        owner = Account.objects.get(pk=instance.owner.id)
        owner.my_reviews_about_executors_count = owner.likeable.filter(is_active=True).aggregate(count=Count('review', filter=~Q(review__about_customer=True)))['count']
        owner.save()

@receiver(post_save, sender=Comment)
def comment_post_save(instance, created, **kwargs):
    if created:
        review = Review.objects.filter(pk=instance.commented_review.id)
        review.update(count_comments = Comment.objects.filter(commented_review_id=review.id).count())
        review.save()

    

        
    