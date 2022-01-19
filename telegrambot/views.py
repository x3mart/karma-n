from django.shortcuts import render
from django.http import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from karman.settings import TG_URL
import requests
from rest_framework.renderers import JSONRenderer
from .serializers import *

class Button:
    def __init__(self, text, url=None, callback_data=None):
        self.text = text
        self.url = url
        self.callback_data = callback_data


@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def tg_update_handler(request):
    tgdata = request.data
    keyboard = ["Найти отзыв", "Оставить отзыв"]
    button1 = Button(text='Привет', url='https://novosti247.ru/api/reviews/')
    button2 = Button(text='Пока', url='https://novosti247.ru/api/reviews/')
    # 
    reply_markup = {}
    reply_markup['inline_keyboard'] = [[button1, button2], [button2]]
    reply_markup = ReplyMarkup(reply_markup).data
    reply_markup = JSONRenderer().render(reply_markup)
    data = {"chat_id":1045490278, "text": f"{tgdata}", "reply_markup":reply_markup}

    response = requests.post(TG_URL + "sendMessage", data)
    print(response.json())
    return Response({},status=200)