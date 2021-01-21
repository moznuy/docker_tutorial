from rest_framework import serializers

from message import models


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Message
        fields = '__all__'
        read_only_fields = ['user']
