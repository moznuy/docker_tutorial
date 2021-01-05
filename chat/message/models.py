from django.db import models


class Message(models.Model):
    user = models.CharField(max_length=32)
    text = models.TextField()

    posted = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-posted']
