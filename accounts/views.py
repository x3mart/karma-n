from djoser.views import UserViewSet
from djoser.conf import settings


# Create your views here.
class AccountViewSet(UserViewSet):
    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.prefetch_related('services', 'reviewables')
        return qs.exclude(email='AnonymousUser')
    
    def get_serializer_class(self):
        if self.action == "list":
            return settings.SERIALIZERS.users_list
        return super().get_serializer_class()
    
    # @action(methods=['PATCH', 'DELETE', 'GET'], detail=False)
    # def services(self, request, *args, **kwargs):
    #     service = request.data.get('service')
    #     user = request.user
    #     service = Service.objects.filter(pk=service).first()
    #     if request.method == 'PATCH':    
    #         user.services.add(service)
    #     if request.method == 'DELETE':    
    #         user.services.remove(service)
    #     services = user.services.values('id', 'title')
    #     return Response(services, status=200)

        