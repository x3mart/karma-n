# Generated by Django 3.2.3 on 2022-01-27 13:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TelegramAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tg_id', models.BigIntegerField(unique=True)),
                ('is_bot', models.BooleanField()),
                ('first_name', models.CharField(blank=True, max_length=255, null=True)),
                ('last_name', models.CharField(blank=True, max_length=255, null=True)),
                ('username', models.CharField(blank=True, max_length=255, null=True)),
                ('language_code', models.CharField(blank=True, max_length=255, null=True)),
                ('is_auth', models.BooleanField(default=False)),
                ('notofication', models.BooleanField(default=False)),
                ('await_reply', models.BooleanField(default=False)),
                ('reply_type', models.CharField(blank=True, max_length=255, null=True)),
                ('reply_1', models.TextField(blank=True, null=True)),
                ('reply_2', models.TextField(blank=True, null=True)),
                ('reply_3', models.TextField(blank=True, null=True)),
                ('account', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='telegram_accounts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
