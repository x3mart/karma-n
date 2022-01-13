from notifications.models import Message
from notifications.pagination import MessagePagination
from notifications.serializers import MessageSerializer
from karman.permissions import MessagePermission
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet


# Create your views here.
class MessageViewSet(ReadOnlyModelViewSet):
    permission_classes = [MessagePermission]
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    pagination_class = MessagePagination

    def get_queryset(self):
        account = self.request.user
        queryset = Message.objects.filter(owner=account)
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        message = self.get_object()
        message.is_readed = True
        message.save()
        return super().retrieve(request, *args, **kwargs)
    
    @action(detail=False, methods=['patch'])
    def markreaded(self, request):
        messages_ids = request.data.get('messages')
        if messages_ids == 'all':
            messages = Message.objects.filter(owner=request.user).filter(is_readed=False)
        else:
            messages = Message.objects.filter(pk__in=messages_ids)
        messages.update(is_readed=True)
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data, status=200)