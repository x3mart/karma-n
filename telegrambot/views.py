from django.shortcuts import render
from django.http import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from karman.settings import TG_URL
import requests
from rest_framework.renderers import JSONRenderer
from .serializers import *

class AnswerCallbackQuery():
    def __init__(self, text, url=None, callback_query_id=None, show_alert=False):
        self.text = text
        self.show_alert = show_alert
        self.callback_query_id = callback_query_id
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


@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def tg_update_handler(request):
    # print(request.META)
    callback_query = request.data.get('callback_query')
    tgdata = request.data
    if callback_query:
        method = "answerCallbackQuery"
        callback_aswer = AnswerCallbackQuery(callback_query_id = callback_query['id'], text = callback_query['id'], show_alert=False)
        callback_aswer_data = AnswerCallbackQuerySerializer(callback_aswer).data
        # print(callback_aswer_data)
        data = JSONRenderer().render(callback_aswer_data)
        # print(callback_aswer_data)
        response = requests.post(TG_URL + method, data)
        # print(response.json())
    method = "sendMessage"
    button1 = InlineButton(text='Привет', callback_data='show_user_review 2')
    button2 = InlineButton(text='Пока', callback_data='show_user_review 2')
    keyboard = [[button1, button2], [button2]]
    reply_markup = ReplyMarkup()
    reply_markup.inline_keyboard = keyboard
    reply_markup_data = ReplyMarkupSerializer(reply_markup).data
    reply_markup_json = JSONRenderer().render(reply_markup_data)
    # data = {"chat_id":1045490278, "text": f"<pre><code class='language-python'>{tgdata}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>", "parse_mode":"HTML","reply_markup":reply_markup_json}
    data = {"chat_id":1045490278, "text": f"<pre><code class='language-python'>{tgdata}</code></pre> \n \n<pre><code class='language-python'>{response.json()}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>", "parse_mode":"HTML","reply_markup":reply_markup_json}
    response = requests.post(TG_URL + method, data)
    # print(response.json())
    return Response({},status=200)


{'update_id': 351822288, 'callback_query': {'id': '4490346553341109267', 'message': {'message_id': 108, 'from': {'id': 5038109651, 'is_bot': True, 'first_name': 'karma-n', 'username': 'x3mart_test_bot'}, 'chat': {'id': 1045490278, 'first_name': 'Vyatcheslav', 'last_name': 'Morozov', 'username': 'x3mart', 'type': 'private'}, 'date': 1642885444, 'text': "{'update_id': 351822287, 'message': {'message_id': 107, 'from': {'id': 1045490278, 'is_bot': False, 'first_name': 'Vyatcheslav', 'last_name': 'Morozov', 'username': 'x3mart', 'language_code': 'ru'}, 'chat': {'id': 1045490278, 'first_name': 'Vyatcheslav', 'last_name': 'Morozov', 'username': 'x3mart', 'type': 'private'}, 'date': 1642885444, 'text': 'xczvzcvz'}} \n Вот тут крутое сообщение!!! \n \n  Coll message!!!", 'entities': [{'offset': 0, 'length': 361, 'type': 'pre', 'language': 'python'}, {'offset': 396, 'length': 16, 'type': 'text_link', 'url': 'https://novosti247.ru/api/reviews/'}], 'chat_instance': '3809238572327023370', 'data': 'show_user_review 2'}}}