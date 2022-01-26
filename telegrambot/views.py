from email import message
from django.shortcuts import render
from django.http import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from accounts.models import Account
from karman.settings import TG_URL
import requests
from django.template.loader import render_to_string
import json
from rest_framework.renderers import JSONRenderer
from .serializers import *
from .models import *


COMMANDS_LIST = ('review', 'user_info')

class SendMessage():
    def __init__(self, chat_id, text, parse_mode='HTML', reply_markup=None) -> None:
        self.chat_id = chat_id
        self.text = text
        self.parse_mode = parse_mode
        self.reply_markup = reply_markup
    
    def send(self):
        data = SendMessageSerializer(self).data
        response = requests.post(TG_URL + 'sendMessage', data)
        return response


class Update():
    def __init__(self, data) -> None:
        for key, value in data.items():
            if key == 'message':
                self.__setattr__(key, Message(value))
            elif key == 'callback_query':
                self.__setattr__(key, CallbackQuery(value))
            else:
                self.__setattr__(key, value)
    
    def command_handler(self, message):
        if message.text.startswith('/'):
            command_message = message.text.split(' ')
            command = command_message.pop(0).replace('/', '')
            if command in COMMANDS_LIST:
                return (command, command_message)
        else:
            return (None, [])
    
    def message_dispatcher(self):
        command, args = self.command_handler(self.message)
        if command == 'user_info':
            text = render_to_string('user_info.html', {'user': Account.objects.get(pk=2)})
            # text = 'command'
        else:
            text = "No commands"
        response = SendMessage(chat_id=self.message.chat.id, text=text).send()
        return response
        # chat_id = self.message.chat.id
        # button1 = InlineButton(text=f'Привет  {self.message.chat.username}', callback_data=f'Привет {self.message.chat.username}')


@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def tg_update_handler(request):
    # tgdata = request.data 
    # send_message = SendMessage(chat_id=1045490278, text=f"{tgdata}")
    # data = SendMessageSerializer(send_message).data
    # response = requests.post(TG_URL + "sendMessage", data)
    update = Update(request.data)
    if hasattr(update,'message'):
        result = update.message_dispatcher()
        SendMessage(chat_id=1045490278, text=result.json).send()
    # # elif hasattr(update,'callback_query'):
    # #     pass
    #     # method = "answerCallbackQuery"
    #     # callback_aswer = AnswerCallbackQuery(callback_query_id = update.callback_query.id, text = update.callback_query.data, show_alert=True)
    #     # callback_aswer_data = AnswerCallbackQuerySerializer(callback_aswer).data
    #     # button1 = InlineButton(text='Привет', callback_data=f'Привет')
    #     # response = requests.post(TG_URL + method, callback_aswer_data)
    #     # print(response.json())else:
    # #     chat_id=1045490278
    # method = "sendMessage"
    # # button2 = InlineButton(text='Пока', callback_data='show_user_review 3')
    # # keyboard = [[button1, button2], [button2]]
    # # reply_markup = ReplyMarkup()
    # # reply_markup.inline_keyboard = keyboard
    # # reply_markup_data = ReplyMarkupSerializer(reply_markup).data
    # # reply_markup_json = JSONRenderer().render(reply_markup_data)
    # # text = f"<pre><code class='language-python'>{tgdata}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>" 
    # # if hasattr(update,'callback_query'):
    # #     text = f"<pre><code class='language-python'>{tgdata}</code></pre> \n \n <pre><code class='language-python'>{callback_aswer_data}</code></pre> \n \n<pre><code class='language-python'>{response.json()}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>"
    # send_message = SendMessage(chat_id=1045490278, text=f'{tgdata}')
    # data = SendMessageSerializer(send_message).data
    # # # print(data)
    # response = requests.post(TG_URL + method, data)
    # # print(result.json())
    return Response({}, status=200)

    