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
from .models import *


@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def tg_update_handler(request):
    update = Update(request.data)
    if hasattr(update,'message') and hasattr(update.message, 'chat'):
        chat_id = update.message.chat.id
        button1 = InlineButton(text=f'Привет  {update.message.chat.username}', callback_data=f'Привет {update.message.chat.username}')
    else:
        chat_id=1045490278
        button1 = InlineButton(text=f'Привет Nemo', callback_data=f'Привет Немо')
    tgdata = request.data
    if hasattr(update,'callback_query'):
        method = "answerCallbackQuery"
        callback_aswer = AnswerCallbackQuery(callback_query_id = update.callback_query.id, text = update.callback_query.data, show_alert=True)
        callback_aswer_data = AnswerCallbackQuerySerializer(callback_aswer).data
        button1 = InlineButton(text='Привет', callback_data=f'Привет')
        response = requests.post(TG_URL + method, callback_aswer_data)
        # print(response.json())
    method = "sendMessage"
    button2 = InlineButton(text='Пока', callback_data='show_user_review 3')
    keyboard = [[button1, button2], [button2]]
    reply_markup = ReplyMarkup()
    reply_markup.inline_keyboard = keyboard
    reply_markup_data = ReplyMarkupSerializer(reply_markup).data
    reply_markup_json = JSONRenderer().render(reply_markup_data)
    text = f"<pre><code class='language-python'>{tgdata}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>" 
    if hasattr(update,'callback_query'):
        text = f"<pre><code class='language-python'>{tgdata}</code></pre> \n \n <pre><code class='language-python'>{callback_aswer_data}</code></pre> \n \n<pre><code class='language-python'>{response.json()}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>"
    send_message = SendMessage(chat_id=chat_id, text=text, reply_markup=reply_markup_json)
    data = SendMessageSerializer(send_message).data
    # print(data)
    response = requests.post(TG_URL + method, data)
    print(response.json())
    return Response({}, status=200)

    