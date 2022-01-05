# Generated by Django 3.2.3 on 2021-12-30 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Check',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('screen_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='телефон или ник')),
                ('content_type', models.CharField(blank=True, max_length=255, null=True, verbose_name='Тип')),
                ('code', models.PositiveIntegerField(blank=True, null=True)),
                ('attempt', models.PositiveIntegerField(default=1)),
                ('time', models.DateTimeField(auto_now=True)),
                ('aproved', models.BooleanField(default=False)),
            ],
        ),
    ]
