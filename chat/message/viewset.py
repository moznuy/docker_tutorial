from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from message import models, serializers


class MessageViewSet(viewsets.ModelViewSet):
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer

    @action(detail=False, methods=['post'])
    def clear(self, request, pk=None):
        self.get_queryset().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
