# Generated by Django 3.2.3 on 2022-01-17 12:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0007_reviewableattributeavgvalue_userattributeavgvalue'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reviewableattributeavgvalue',
            old_name='account',
            new_name='reviewable',
        ),
    ]
