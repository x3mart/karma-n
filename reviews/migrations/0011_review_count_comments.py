# Generated by Django 3.2.3 on 2022-01-28 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0010_auto_20220118_1601'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='count_comments',
            field=models.IntegerField(default=0, verbose_name='Количество коментариев'),
        ),
    ]
