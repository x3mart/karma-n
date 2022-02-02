from django.shortcuts import render
from rest_framework.generics import DestroyAPIView
from .models import Reviewable
from .serializers import ReviewableSerializer
from checks.models import Check
import django.dispatch
from rest_framework.response import Response
from accounts.models import Account
from accounts.serializers import AccountSerializer

reviewable_detach = django.dispatch.Signal()
# Create your views here.


class ReviewableDetachView(DestroyAPIView):
    queryset = Reviewable.objects.all()
    serializer_class = ReviewableSerializer
    def delete(self, request, *args, **kwargs):
        reviewable = self.get_object()
        if request.auth and reviewable.owner and reviewable.owner.id == request.user.id:
            reviewable.owner = None
            reviewable.save()
            reviewable_detach.send(sender=self.__class__, user=request.user)
            print(self.__class__)
            check = Check.objects.get(screen_name=reviewable.screen_name, resourcetype=reviewable.polymorphic_ctype.model)
            check.aproved = False
            check.code = None
            check.save()
            account = Account.objects.get(pk=request.user.id)
            return Response(AccountSerializer(account).data, status=200)
        return Response({}, status=403)