from django.contrib.auth import get_user_model
from django.db import models


class Message(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='messages')
    text = models.TextField()

    posted = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-posted']
