from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    """Model definition for Group."""
    name = models.CharField("Name", max_length=32, unique=True)
    description = models.CharField("Description", max_length=255)
    users = models.ManyToManyField(User, related_name='app_groups', blank=True, verbose_name="Groups")

    class Meta:
        """Meta definition for Group."""
        verbose_name = 'Group'
        verbose_name_plural = 'Groups'

    def __str__(self):
        """Unicode representation of Group."""
        return self.name

