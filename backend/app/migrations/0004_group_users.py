# Generated by Django 3.2 on 2021-04-15 17:12

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0003_remove_group_users'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='app_groups', to=settings.AUTH_USER_MODEL, verbose_name='Groups'),
        ),
    ]
