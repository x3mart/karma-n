# Generated by Django 3.2.3 on 2022-01-13 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0003_auto_20220106_1313'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servicecategory',
            name='title',
            field=models.CharField(max_length=255, unique=True, verbose_name='Название'),
        ),
        migrations.AlterUniqueTogether(
            name='service',
            unique_together={('title', 'category')},
        ),
    ]
