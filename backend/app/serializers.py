from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Group


class GroupListSerializer(serializers.ModelSerializer):
    '''Serializer for model Group'''
    users = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Group
        fields = ('id', 'name', 'description', 'users')

    def get_users(self, obj):
        return obj.users.exists()


class GroupFormSerializer(serializers.ModelSerializer):
    '''Serializer for model Group'''

    class Meta:
        model = Group
        fields = ('name', 'description')



class UserListSerializer(serializers.ModelSerializer):
    '''Serializer for model list of Group'''
    # app_groups = serializers.StringRelatedField(many=True)
    app_groups = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'date_joined', 'app_groups')

    def get_app_groups(self, obj):
        return obj.app_groups.values_list("id", "name")


class UserFormSerializer(serializers.ModelSerializer):
    '''Serializer for model list of Group'''

    class Meta:
        model = User
        fields = ('username', 'app_groups')
