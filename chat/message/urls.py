from rest_framework.routers import SimpleRouter

from message import viewset

router = SimpleRouter()
router.register('message', viewset.MessageViewSet)

urlpatterns = router.urls
