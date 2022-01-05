from notifications.models import Message
from notifications.serializers import MessageSerializer
from karman.permissions import MessagePermission
from django.db.models import Count
from rest_framework.generics import ListAPIView


# Create your views here.
class MessageList(ListAPIView):
    permission_classes = [MessagePermission]
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Message.objects.annotate(count_messege=Count('message')).annotate(count_ureaded=Count('message', filter(message__is_readed__exact=False))).filter(owner=user)[:20]
        return queryset