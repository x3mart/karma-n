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
from django.contrib.auth import authenticate

from reviewables.models import Reviewable
from .serializers import *
from .models import *
from reviews.models import Review


COMMANDS_LIST = ('reviews', 'user_info', 'start', 'login', 'me')

def get_tg_account(user):
    tg_account, created = TelegramAccount.objects.get_or_create(tg_id=user['id'])
    if created:
        user.pop('id')
        tg_account = TelegramAccount.objects.filter(pk=tg_account.id)
        tg_account.update(**user)
        tg_account = tg_account.first()
    return tg_account

class ReplyMarkup():
    def __init__(self):
        pass

    def get_markup(self, name, tg_account=None):
        if name == 'start' and tg_account and tg_account.account:
            button1 = InlineButton(text='Инфа о себе', callback_data=f'/me')
            button2 = InlineButton(text='Искать отзывы', callback_data=f'/reviews')
            keyboard = [[button1], [button2]]
        elif name == 'me' and tg_account and tg_account.account:
            button1 = InlineButton(text='Редактировать', url='https://novosti247.ru')
            button2 = InlineButton(text='Искать отзывы', callback_data=f'/reviews')
            keyboard = [[button1]]
            for reviewable in tg_account.account.reviewables.all():
                button = InlineButton(text=f'Отзывы о {reviewable.screen_name}', callback_data=f'/reviews {reviewable.screen_name}')
                keyboard.append([button])
            keyboard.append([button2])
        else:
            button1 = InlineButton(text='Авторизоваться', callback_data=f'/login')
            button2 = InlineButton(text='Зарегистрироваться', url='https://novosti247.ru')
            button3 = InlineButton(text='Искать отзывы', callback_data=f'/reviews')
            keyboard = [[button1], [button2], [button3]]
        self.inline_keyboard = keyboard
        reply_markup_data = ReplyMarkupSerializer(self).data
        return JSONRenderer().render(reply_markup_data)

class CallbackQuery():
    def __init__(self, data) -> None:
        for key, value in data.items():
            if key == 'message':
                self.__setattr__(key, Message(value))
            elif key == 'from':
                self.__setattr__('user', value)
            else:
                self.__setattr__(key, value)
    
    def answer(self, text=None, show_alert=None):
        answer = AnswerCallbackQuery(callback_query_id=self.id, text=text, show_alert=show_alert)
        data = AnswerCallbackQuerySerializer(answer).data
        response = requests.post(TG_URL + 'answerCallbackQuery', data)
        return response

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
    
    def command_handler(self, text):
        command = ''
        if text.startswith('/'):
            command_message = text.split(' ')
            command = command_message.pop(0).replace('/', '')
        if command in COMMANDS_LIST:
                return (command, command_message)
        else:
            return (None, [])
    
    def command_dispatcher(self, source, command, args=[]):
        if command == 'start':
            if self.tg_account.account:
                text = render_to_string('start_for_auth.html', {'account': self.tg_account.account})
            else:
                text = render_to_string('start.html', {'reviews_count': Review.objects.count(), 'reviewable_count': Reviewable.objects.count()})
            reply_markup = ReplyMarkup().get_markup(command, self.tg_account)
            response = SendMessage(chat_id=self.message.chat.id, text=text, reply_markup=reply_markup).send()
        elif command == 'user_info':
            if source == 'callback_query':
                response = self.callback_query.answer()
                chat_id=self.callback_query.message.chat.id
            else:
                chat_id=self.message.chat.id
            text = render_to_string('user_info.html', {'user': Account.objects.get(pk=int(args[0]))})
            reply_markup = ReplyMarkup().get_markup(command, tg_account=self.tg_account)
            response = SendMessage(chat_id=chat_id, text=text, reply_markup=reply_markup).send()
        elif command == 'me':
            if source == 'callback_query':
                response = self.callback_query.answer()
                chat_id=self.callback_query.message.chat.id
            else:
                chat_id=self.message.chat.id
            if self.tg_account and self.tg_account.account:
                text = render_to_string('user_info.html', {'user': self.tg_account.account})
            else:
                text = "Что бы посмотреть информацию О себе, надо авторизоваться"
            reply_markup = ReplyMarkup().get_markup(command, tg_account=self.tg_account)
            response = SendMessage(chat_id=chat_id, text=text, reply_markup=reply_markup).send()
        elif command == 'login':
            if source == 'callback_query':
                response = self.callback_query.answer()
                chat_id=self.callback_query.message.chat.id
            else:
                chat_id=self.message.chat.id
            self.tg_account.await_reply = True
            self.tg_account.reply_type = 'email'
            self.tg_account.save()
            response = SendMessage(chat_id=chat_id, text='Введите email').send()
        else:
            response = None
        return response
    
    def await_despatcher(self, text,):
        if self.tg_account.reply_type =='email':
            self.tg_account.reply_type = 'password'
            self.tg_account.reply_1 = text.strip()
            self.tg_account.save()
            response = SendMessage(chat_id=self.message.chat.id, text='Введите пароль').send()
        elif self.tg_account.reply_type =='password':
            account = authenticate(email=self.tg_account.reply_1, password=text.strip())
            if account is not None:
                self.tg_account.account = account
                text = render_to_string('start_for_auth.html', {'account': account})
                response = SendMessage(chat_id=self.message.chat.id, text=text).send()
                response = requests.post(TG_URL + 'deleteMessage', data={'chat_id':self.message.chat.id, 'message_id': self.message.message_id})
            else:
                response = SendMessage(chat_id=self.message.chat.id, text='Фигня').send()
            self.tg_account.await_reply = False
            self.tg_account.reply_type = None
            self.tg_account.reply_1 = None
            self.tg_account.save()
        return response
    
    def message_dispatcher(self):
        command, args = self.command_handler(self.message.text)
        self.tg_account = get_tg_account(self.message.user)
        if self.tg_account.await_reply:
            response = self.await_despatcher(self.message.text)
        elif command:
            response = self.command_dispatcher('message', command, args)
        else:
            text = "No commands in message"
            response = None
        return response
    
    def callback_dispatcher(self):
        command, args = self.command_handler(self.callback_query.data)
        self.tg_account = get_tg_account(self.callback_query.user)
        if command:
            response = self.command_dispatcher('callback_query', command, args)
        else:
            text = "No commands in callback_query"
            response = None
        return response


@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def tg_update_handler(request):
    update = Update(request.data)
    if hasattr(update,'message'):
        update.message_dispatcher()
    elif hasattr(update,'callback_query'):
        update.callback_dispatcher()
    #     # method = "answerCallbackQuery"
    #     # callback_aswer = AnswerCallbackQuery(callback_query_id = update.callback_query.id, text = update.callback_query.data, show_alert=True)
    #     # callback_aswer_data = AnswerCallbackQuerySerializer(callback_aswer).data
    #     # button1 = InlineButton(text='Привет', callback_data=f'Привет')
    #     # response = requests.post(TG_URL + method, callback_aswer_data)
    #     # print(response.json())else:
    # #     chat_id=1045490278
    method = "sendMessage"
    # # button2 = InlineButton(text='Пока', callback_data='show_user_review 3')
    # # keyboard = [[button1, button2], [button2]]
    # # reply_markup = ReplyMarkup()
    # # reply_markup.inline_keyboard = keyboard
    # # reply_markup_data = ReplyMarkupSerializer(reply_markup).data
    # # reply_markup_json = JSONRenderer().render(reply_markup_data)
    # # text = f"<pre><code class='language-python'>{tgdata}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>" 
    # # if hasattr(update,'callback_query'):
    # #     text = f"<pre><code class='language-python'>{tgdata}</code></pre> \n \n <pre><code class='language-python'>{callback_aswer_data}</code></pre> \n \n<pre><code class='language-python'>{response.json()}</code></pre> \n Вот тут крутое сообщение!!! \n \n <a href='https://novosti247.ru/api/reviews/'> Coll message!!! </a>"
    send_message = SendMessage(chat_id=1045490278, text=f'{request.data}')
    data = SendMessageSerializer(send_message).data
    # # # print(data)
    requests.post(TG_URL + method, data)
    # # print(result.json())
    return Response({}, status=200)

    