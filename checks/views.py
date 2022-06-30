from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.throttling import UserRateThrottle
from rest_framework import permissions
from django.utils import timezone
from datetime import timedelta
import requests
import random
from django.apps import apps
from .models import Check
from django.contrib.contenttypes.models import ContentType
from .serializers import GetCodeSerializer, CheckCodeSerializer
from karman.settings import SMSAERO, VK_SECRET, VK_TOKEN
import numpy as np
from utils.reviewables import clean_phone
from reviewables.models import Vk, Phone, Instagram, Reviewable
from accounts.models import Account
from accounts.serializers import AccountSerializer

# Create your views here.
def set_code():
    return random.randint(11111, 99999)

def get_random_id():
    random_id = random.randint(-2147483648, 2147483647)
    return np.int32(random_id)  

def send_code_possibility(check, created):
    error_message = None
    if created:
        return error_message
    if check.aproved:
        error_message = {'error':f'{check.screen_name} уже прошел проверку'}
    if not check.attempt == 1 and (check.time + timedelta(seconds=20)) > timezone.now():
            error_message = {'error':'Попробуйте позже'}
    if check.attempt > 3 and (check.time + timedelta(minutes=20)) > timezone.now():
        error_message = {'error':'Попробуйте позже'} 
    return error_message

class CodesRateThrottle(UserRateThrottle):
    scope = 'codes'


@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
@throttle_classes([CodesRateThrottle])
def get_code(request):
    serializer = GetCodeSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
    else:
        return Response(serializer.errors,status=400)
    screen_name = data.get('screen_name', None)
    type = data.get('resourcetype', None)
    code = set_code()
    if screen_name and type == 'phone':
        screen_name = clean_phone(screen_name)
        data['screen_name'] = screen_name
        check, created = Check.objects.get_or_create(**data)
        error_message = send_code_possibility(check, created)
        if error_message:
            return Response(error_message, status=400)
        url = f'https://x3mart@gmail.com:{SMSAERO}@gate.smsaero.ru/v2/flashcall/send'
        call_data = {
            'phone':screen_name,
            'code':f'{code}'
            }
        try:
            call_reponse = requests.get(url, params=call_data)
            call = call_reponse.json()
        except:
            return Response({'error':'Ошибка связи. Отправьте запрос еще раз'}, status=400)
        if not call['success']:
            return Response({'error':call['message']}, call['data'])
    elif screen_name and type == 'vk':
        url = 'https://api.vk.com/method/utils.resolveScreenName'
        vk_data = {
            'v':'5.131',
            'access_token':VK_TOKEN,
            'screen_name':screen_name
        }
        vk_response = requests.post(url, data=vk_data)
        error = vk_response.json().get('error', None)
        if error:
            return Response(error, status=400)
        response = vk_response.json().get('response')
        if not len(response):
            return Response({'error':'Аккаунт не существует'}, status=400)
        if response['type'] != 'user':
            return Response({'error':'Для верификации не личного аккаунта обратитесь к администрации'}, status=400)
        check, created = Check.objects.get_or_create(**data)
        error_message = send_code_possibility(check, created)
        if error_message:
            return Response(error_message, status=400)
        user_id = response['object_id']
        url = 'https://api.vk.com/method/messages.send'
        vk_data['message'] = f'Ваш код подтверждения аккаунта на сайте Karma-N {code}',
        vk_data['random_id'] = get_random_id(),
        vk_data['user_id'] = user_id
        vk_response = requests.post(url, data=vk_data)
        error = vk_response.json().get('error', None)
        if error and error['error_code'] == 901:
            return Response({'error':'Необходимо Ваше разрешение на получение сообщений от группы Karma-N'}, status=400)
        if error:
            return Response(error['error_msg'], status=400)
    else:
        return Response({'error':'Отсутствуют необходимые параметры запроса'}, status=400)      
    if (check.time + timedelta(minutes=20)) < timezone.now():
        check.attempt = 1
    else:
        check.attempt = check.attempt + 1
    check.code = code
    check.save()
    return Response({},status=200)

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def check_code(request):
    serializer = CheckCodeSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
    else:
        return Response(serializer.errors, status=400)
    screen_name = data.get('screen_name', None)
    type = data.get('resourcetype', None)
    code = data.pop('code', None)
    try:
        check = Check.objects.get(**data)
    except:
        return Response({'error':f'Для {screen_name} не было запросов кода подтверждения'}, status=400) 
    if check.aproved:
        return Response({'error':f'{check.screen_name} уже прошел проверку'}, status=400)
    if (check.time + timedelta(minutes=20)) < timezone.now():
        return Response({'error':'Истек срок ввода кода подтверждения'}, status=400)
    if code == check.code:
        check.aproved = True
        if check.email and check.email != request.user.email:
            reviewable = Reviewable.objects.filter(screen_name=screen_name).filter(polymorphic_ctype__model=type).delete()
        check.email = request.user.email
        check.save()
        model = apps.get_model('reviewables', type.capitalize())
        reviewable, created = model.objects.get_or_create(screen_name=screen_name)
        if type == 'vk':
            url = 'https://api.vk.com/method/utils.resolveScreenName'
            vk_data = {
                'v':'5.131',
                'access_token':VK_TOKEN,
                'screen_name':screen_name
            }
            vk_response = requests.post(url, data=vk_data)
            error = vk_response.json().get('error', None)
            if error:
                return Response(error, status=400)
            response = vk_response.json().get('response')
            reviewable.user_id = response.get('object_id', None)
            reviewable.user_type = response.get('type', None)
        reviewable.owner = request.user
        reviewable.save()
        account = Account.objects.get(pk=request.user.id)
        return Response(AccountSerializer(account).data, status=200)
    else:
        return Response({'error':'Неверный код подтверждения'}, status=400)

    
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def vk_handler(request):
    secret = request.data.get('secret', None)
    if secret == VK_SECRET:
        return Response({},status=200,)
    # if request.data.get('group_id') == 209432771:
    #     return HttpResponse('f85e17c9',status=200, content_type='text/plain')
    return HttpResponseBadRequest()