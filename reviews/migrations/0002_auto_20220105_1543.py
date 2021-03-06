# Generated by Django 3.2.3 on 2022-01-05 12:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Likeable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
        ),
        migrations.RemoveConstraint(
            model_name='like',
            name='unique_together',
        ),
        migrations.RemoveConstraint(
            model_name='like',
            name='unique_without_review',
        ),
        migrations.RemoveConstraint(
            model_name='like',
            name='unique_without_comment',
        ),
        migrations.RenameField(
            model_name='comment',
            old_name='review',
            new_name='commented_review',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='body',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='id',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='owner',
        ),
        migrations.RemoveField(
            model_name='like',
            name='comment',
        ),
        migrations.RemoveField(
            model_name='like',
            name='review',
        ),
        migrations.RemoveField(
            model_name='review',
            name='body',
        ),
        migrations.RemoveField(
            model_name='review',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='review',
            name='id',
        ),
        migrations.RemoveField(
            model_name='review',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='review',
            name='owner',
        ),
        migrations.AddField(
            model_name='likeable',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likeable', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='likeable',
            name='polymorphic_ctype',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='polymorphic_reviews.likeable_set+', to='contenttypes.contenttype'),
        ),
        migrations.AddField(
            model_name='comment',
            name='likeable_ptr',
            field=models.OneToOneField(auto_created=True, default=1, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='reviews.likeable'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='like',
            name='likeable',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='reviews.likeable'),
        ),
        migrations.AddField(
            model_name='review',
            name='likeable_ptr',
            field=models.OneToOneField(auto_created=True, default=1, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='reviews.likeable'),
            preserve_default=False,
        ),
    ]
