from django.shortcuts import render
from django.http import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from karman.settings import TG_URL
import requests
import json
from rest_framework.renderers import JSONRenderer
from .serializers import *

class AnswerCallbackQuery():
    def __init__(self, text, url=None, callback_query_id=None, show_alert=False, cache_time=0):
        self.text = text
        self.show_alert = show_alert
        self.callback_query_id = callback_query_id
        self.cache_time = cache_time
        if url:
            self.url = url

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

class SendMessage():
    def __init__(self, chat_id, text, parse_mode='HTML', reply_markup=None) -> None:
        self.chat_id = chat_id
        self.text = text
        self.parse_mode = parse_mode
        self.reply_markup = reply_markup


@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def tg_update_handler(request):
    # print(request.META)
    callback_query = request.data.get('callback_query')
    chat = request.data.get('chat')
    if chat:
        chat_id = chat['id']
    else:
        chat_id=1045490278
    tgdata = request.data
    if callback_query:
        method = "answerCallbackQuery"
        callback_aswer = AnswerCallbackQuery(callback_query_id = callback_query['id'], text = callback_query['data'], show_alert=True)
        callback_aswer_data = AnswerCallbackQuerySerializer(callback_aswer).data
        response = requests.post(TG_URL + method, callback_aswer_data)
        # print(response.json())
    method = "sendMessage"
    button1 = InlineButton(text='Привет', callback_data='show_user_review 2')
    button2 = InlineButton(text='Пока', callback_data='show_user_review 3')
    keyboard = [[button1, button2], [button2]]
    reply_markup = ReplyMarkup()
    reply_markup.inline_keyboard = keyboard
    reply_markup_data = ReplyMarkupSerializer(reply_markup).data
    reply_markup_json = JSONRenderer().render(reply_markup_data)
    text = f"<pre><code class='language-python'>{tgdata}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>" 
    if callback_query:
        text = f"<pre><code class='language-python'>{tgdata}</code></pre> \n \n <pre><code class='language-python'>{callback_aswer_data}</code></pre> \n \n<pre><code class='language-python'>{response.json()}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>"
    send_message = SendMessage(chat_id=chat_id, text=text, reply_markup=reply_markup_json)
    data = SendMessageSerializer(send_message).data
    # print(data)
    response = requests.post(TG_URL + method, data)
    # print(response.json())
    return Response({}, status=200)