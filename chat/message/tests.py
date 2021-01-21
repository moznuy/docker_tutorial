import uuid

from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from . import models


class MessageTestCase(APITestCase):
    def setUp(self) -> None:
        self.users = [get_user_model().objects.create_user(username=str(uuid.uuid4())) for _ in range(2)]
        self.messages = {user: [models.Message.objects.create(user=user) for _ in range(5)] for user in self.users}

    def test_delete_not_own_messages(self):
        self.client.force_login(self.users[1])

        message_id = self.messages[self.users[0]][0].id
        resp: Response = self.client.delete(reverse('message-detail', args=[message_id]))

        self.assertEqual(resp.status_code, 403)
        # Sanity check
        models.Message.objects.get(pk=message_id)

