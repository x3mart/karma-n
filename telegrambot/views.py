from django.shortcuts import render
from django.http import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from karman.settings import TG_URL
import requests
from rest_framework.renderers import JSONRenderer
from .serializers import *

class InlineButton:
    def __init__(self, text, url=None, callback_data=None, login_url=None, switch_inline_query=None):
        self.text = text
        self.login_url = login_url
        self.callback_data = callback_data
        self.switch_inline_query = switch_inline_query
        if url:
            self.url = url


class KeyboardButton():
    def __init__(self, text, request_contact=None, request_location=None, request_poll=None):
        self.text = text
        self.request_contact = request_contact
        self.request_location = request_location
        self.request_poll = request_poll
    

class ReplyMarkup():
    def __init__(self):
        pass


class Update():
    def __init__(self) -> None:
        pass


@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def tg_update_handler(request):
    # print(request.META)
    tgdata = request.data
    button1 = InlineButton(text='Привет', callback_data='show_user_review 2')
    button2 = InlineButton(text='Пока', callback_data='show_user_review 2')
    keyboard = [[button1, button2], [button2]]
    reply_markup = ReplyMarkup()
    reply_markup.inline_keyboard = keyboard
    reply_markup_data = ReplyMarkupSerializer(reply_markup).data
    reply_markup_json = JSONRenderer().render(reply_markup_data)
    print(reply_markup_data)
    print(reply_markup_json)
    data = {"chat_id":1045490278, "text": f"<pre><code class='language-python'>{tgdata}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>", "parse_mode":"HTML","reply_markup":reply_markup_json}
    method = "sendMessage"
    response = requests.post(TG_URL + method, data)
    print(response.json())
    return Response({},status=200)
