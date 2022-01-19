from django.shortcuts import render
from django.http import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from karman.settings import TG_URL
import requests


@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def tg_update_handler(request):
    tgdata = request.data
    keyboard = ["Найти отзыв", "Оставить отзыв"]
    reply_markup = {"replyKeyboardMarkup":{
    "keyboard": keyboard, 
    "resize_keyboard":True, 
    "one_time_keyboard":True
    }
    }
    data = {"chat_id":"1045490278", "text": f"{tgdata}", "reply_markup":"{\"keyboard\":[[{\"text\":\"на сайт\", \"url\":\"https://novosti247.ru/\"},{\"text\":\"mario\"}]]}"
}

    response = requests.post(TG_URL + "sendMessage", data)
    # print(response.json())
    return Response({},status=200)