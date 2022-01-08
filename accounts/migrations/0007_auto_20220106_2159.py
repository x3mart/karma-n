# Generated by Django 3.2.3 on 2022-01-06 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20220106_2156'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='reviews_customers_about_me_count',
            field=models.PositiveIntegerField(default=0, verbose_name='Отзывы заказчиков обо мне'),
        ),
        migrations.AlterField(
            model_name='account',
            name='reviews_executors_about_me_count',
            field=models.PositiveIntegerField(default=0, verbose_name='Отзывы исполнителей обо мне'),
        ),
    ]