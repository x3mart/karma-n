from notifications.models import Message
from notifications.serializers import MessageSerializer
from karman.permissions import MessagePermission
from rest_framework.decorators import action
from collections import OrderedDict
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.pagination import LimitOffsetPagination


class MessagePagination(LimitOffsetPagination):
    def get_unreaded(self, queryset):
        return queryset.filter(is_readed__exact=False).count()
    
    def paginate_queryset(self, queryset, request, view=None):
        self.limit = self.get_limit(request)
        if self.limit is None:
            return None

        self.count = self.get_count(queryset)
        self.unreaded = self.get_unreaded(queryset)
        self.offset = self.get_offset(request)
        self.request = request
        if self.count > self.limit and self.template is not None:
            self.display_page_controls = True

        if self.count == 0 or self.offset > self.count:
            return []
        return list(queryset[self.offset:self.offset + self.limit])

    def get_paginated_response(self, data):
        print(self.request)
        return Response(OrderedDict([
                ('unreaded', self.unreaded),
                ('count', self.count),
                ('next', self.get_next_link()),
                ('previous', self.get_previous_link()),
                ('results', data)
            ]))


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
        messages = Message.objects.filter(pk__in=messages_ids)
        messages.update(is_readed=True)
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data, status=200)