from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.views import APIView

from message import models, serializers


class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj: models.Message):
        return request.method in SAFE_METHODS or request.user == obj.user


class MessageViewSet(viewsets.ModelViewSet):
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def clear(self, request, pk=None):
        if not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)

        self.get_queryset().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        s = serializers.UserSerializer(instance=request.user)
        return Response(s.data)
