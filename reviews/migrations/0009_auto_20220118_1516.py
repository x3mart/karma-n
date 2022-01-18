# Generated by Django 3.2.3 on 2022-01-18 12:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('reviewables', '0004_auto_20220107_0230'),
        ('reviews', '0008_rename_account_reviewableattributeavgvalue_reviewable'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReviewableCustomerAttributeAvgValue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DecimalField(decimal_places=1, default=0, max_digits=2)),
                ('reviewable', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='reviewables_customer_attributes_avg', to='reviewables.reviewable')),
                ('title', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='reviews.attributetitle')),
            ],
            options={
                'ordering': ['title'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ReviewableExecutorAttributeAvgValue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DecimalField(decimal_places=1, default=0, max_digits=2)),
                ('reviewable', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='reviewables_executor_attributes_avg', to='reviewables.reviewable')),
                ('title', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='reviews.attributetitle')),
            ],
            options={
                'ordering': ['title'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserCustomerAttributeAvgValue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DecimalField(decimal_places=1, default=0, max_digits=2)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='users_customer_attributes_avg', to=settings.AUTH_USER_MODEL)),
                ('title', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='reviews.attributetitle')),
            ],
            options={
                'ordering': ['title'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserExecuterAttributeAvgValue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DecimalField(decimal_places=1, default=0, max_digits=2)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='users_executer_attributes_avg', to=settings.AUTH_USER_MODEL)),
                ('title', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='reviews.attributetitle')),
            ],
            options={
                'ordering': ['title'],
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='userattributeavgvalue',
            name='account',
        ),
        migrations.RemoveField(
            model_name='userattributeavgvalue',
            name='title',
        ),
        migrations.DeleteModel(
            name='ReviewableAttributeAvgValue',
        ),
        migrations.DeleteModel(
            name='UserAttributeAvgValue',
        ),
    ]