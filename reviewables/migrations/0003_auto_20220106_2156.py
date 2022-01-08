# Generated by Django 3.2.3 on 2022-01-06 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviewables', '0002_auto_20220105_1730'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reviewable',
            old_name='rating',
            new_name='customer_rating',
        ),
        migrations.AddField(
            model_name='reviewable',
            name='executor_rating',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
    ]