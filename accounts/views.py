from checks.models import Check
from rest_framework.views import APIView
from rest_framework.response import Response
from djoser.views import UserViewSet
from rest_framework.decorators import action
from.serializers import AccountSerializer

# Create your views here.
class AccountViewSet(UserViewSet):
    @action(["patch"], detail=False)
    def phone_attach(self, request, *args, **kwargs):
        pass
        # serializer = PhoneAddSerializer(data=request.data)
        # if serializer.is_valid():
        #     data = serializer.validated_data
        # else:
        #     return Response(serializer.errors,status=400)
        # user = request.user
        # check = Check.objects.filter(phone=data['phone_number']).first()
        # if not check or not check.aproved:
        #     return Response({'error':'Подтвердите Ваш телефон'}, status=403)
        # phone = Phone.objects.filter(phone_number=data['phone_number']).first()
        # if phone and phone.owner:
        #     return Response({'error':'Телефон уже обрел владельца'}, status=403)
        # if phone:
        #     user.phones.add(phone)
        # else:
        #     phone = Phone.objects.create(owner=user, **data)
        # return Response(AccountSerializer(user).data)
        