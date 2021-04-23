from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User

from .serializers import (
    GroupListSerializer, 
    GroupFormSerializer, 
    UserListSerializer, 
    UserFormSerializer)
from .models import Group


class GroupViewSet(ModelViewSet):
    '''GRUD for model Group'''
    serializer_class = GroupFormSerializer
    queryset = Group.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return GroupListSerializer
        return super().get_serializer_class()


class UserViewSet(ModelViewSet):
    '''GRUD for model User'''
    serializer_class = UserFormSerializer
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        return super().get_serializer_class()
