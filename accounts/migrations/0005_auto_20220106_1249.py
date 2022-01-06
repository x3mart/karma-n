# Generated by Django 3.2.3 on 2022-01-06 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_account_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='my_reviews_count',
            field=models.PositiveIntegerField(default=0, verbose_name='Мои отзывы'),
        ),
        migrations.AddField(
            model_name='account',
            name='reviews_about_me_count',
            field=models.PositiveIntegerField(default=0, verbose_name='Отзывы обо мне'),
        ),
    ]