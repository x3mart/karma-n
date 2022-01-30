from email import message
from django.apps import apps
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
from reviews.views import get_comments, get_reviews, set_like
from .serializers import *
from .models import *
from reviews.models import Review


COMMANDS_LIST = ('reviews', 'user_info', 'start', 'login', 'me', 'like', 'dislike', 'comments')

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


    def get_button_position(self, markup, text, action=None, **kwargs):
        row = 0
        for line in markup:
            for button in range(0,len(line)): 
                if markup[row][button]['text'] in text:
                    return (row, button)
            row +=1
        return (123, 123) 
    
    def get_edited_markup(self, markup, text, action=None, **kwargs):
        pass

    def get_likes_markup(self, likeable, tg_account, c_type):
        keyboard = []
        if tg_account.account:
            text1 = 'I Like It' if likeable.is_my_like else 'Like'
            text2 = 'I Don\'t Like It' if likeable.is_my_dislike else 'Dislike'
            button1 = InlineButton(text=text1, callback_data=f'/like {c_type} {likeable.id}')
            button2 = InlineButton(text=text2, callback_data=f'/dislike {c_type} {likeable.id}')
            keyboard = [[button1, button2]]
        return keyboard

    def get_markup(self, name, tg_account=None, **kwargs):
        if name == 'start' and tg_account and tg_account.account:
            button1 = InlineButton(text='Инфа о себе', callback_data=f'/me')
            button2 = InlineButton(text='Искать отзывы', callback_data=f'/reviews')
            keyboard = [[button1], [button2]]
        elif name == 'me' and tg_account and tg_account.account:
            button1 = InlineButton(text='Редактировать', url='https://novosti247.ru')
            button2 = InlineButton(text='Искать отзывы', callback_data=f'/reviews')
            keyboard = [[button1]]
            for reviewable in tg_account.account.reviewables.all():
                executor_rating = reviewable.executor_rating if reviewable.executor_rating else 0
                customer_rating = reviewable.customer_rating if reviewable.customer_rating else 0
                button = InlineButton(text=f'{reviewable.screen_name} {executor_rating}/{customer_rating}', callback_data=f'/reviews {reviewable.screen_name} 0 5')
                keyboard.append([button])
            keyboard.append([button2])
        elif name == 'reviews':
            review = kwargs.get('review')
            keyboard = self.get_likes_markup(review, tg_account, 'review')
            if review.comments.exists():
                button = InlineButton(text='Посмотреть коментарии', callback_data=f'/comments {review.id} 0')
                keyboard.append([button])
            if kwargs['more']:
                button = InlineButton(text='Показать еще', callback_data=f'/reviews {kwargs["screen_name"]} {kwargs["offset_start"]} {kwargs["offset_end"]}')
                keyboard.append([button])
            elif kwargs['last']:
                button = InlineButton(text='Это все отзывы. Искать еще?', callback_data=f'/reviews')
                keyboard.append([button])
        elif name =='comments':
            comment = kwargs.get('comment')
            keyboard = self.get_likes_markup(comment, tg_account, 'comment')
            if kwargs['number'] == 0:
                button1 = InlineButton(text='<<', callback_data=f'/review {kwargs["review_id"]}')
            else:
                button1 = InlineButton(text='<<', callback_data=f'/comments {kwargs["review_id"]} {kwargs["number"] - 1}')
            button2 = InlineButton(text='>>', callback_data=f'/comments {kwargs["review_id"]} {kwargs["number"] + 1}')
            comment_buttons = [button1, button2]
            if kwargs['number'] == kwargs['number'] - 1:
                comment_buttons.pop(1)
            keyboard.append(comment_buttons)
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
    def __init__(self, chat_id, text=None, reply_markup=None, message_id=None, parse_mode='HTML') -> None:
        self.chat_id = chat_id
        self.text = text
        self.parse_mode = parse_mode
        self.reply_markup = reply_markup
        self.message_id = message_id
    
    def edit_text(self):
        data = SendMessageSerializer(self).data
        response = requests.post(TG_URL + 'editMessageText', data)
        return response
    
    def edit_markup(self):
        data = SendMessageSerializer(self).data
        response = requests.post(TG_URL + 'editMessageReplyMarkup', data)
        return response

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
    def get_account_id(self):
        return self.tg_account.account.id if self.tg_account.account else 1
    
    def command_handler(self, text):
        command = ''
        if text.startswith('/'):
            command_message = text.split(' ')
            command = command_message.pop(0).replace('/', '')
        if command in COMMANDS_LIST:
                return (command, command_message)
        else:
            return (None, [])

    def get_chat(self, source):
        if source == 'callback_query':
            chat_id=self.callback_query.message.chat.id
        else:
            chat_id=self.message.chat.id
        return chat_id
    
    def get_message(self,source):
        if source == 'callback_query':
            message=self.callback_query.message
        else:
            message=self.message
        return message
    
    def command_dispatcher(self, source, command, args=[]):
        chat_id = self.get_chat(source)
        message = self.get_message(source)
        kwargs = {}
        if command == 'start':
            if self.tg_account.account:
                text = render_to_string('start_for_auth.html', {'account': self.tg_account.account})
            else:
                text = render_to_string('start.html', {'reviews_count': Review.objects.count(), 'reviewable_count': Reviewable.objects.count()})
            reply_markup = ReplyMarkup().get_markup(command, self.tg_account)
            response = SendMessage(chat_id, text, reply_markup).send()
        elif command == 'user_info':
            try:
                text = render_to_string('user_info.html', {'user': Account.objects.get(pk=int(args[0]))})
                reply_markup = ReplyMarkup().get_markup(command, tg_account=self.tg_account)
            except:
                text = "Такого пользователя нет"
                reply_markup = None
            response = SendMessage(chat_id, text, reply_markup).send()
        elif command == 'me':
            if self.tg_account and self.tg_account.account:
                text = render_to_string('user_info.html', {'user': self.tg_account.account})
            else:
                text = "Что бы посмотреть информацию О себе, надо авторизоваться"
            reply_markup = ReplyMarkup().get_markup(command, tg_account=self.tg_account)
            response = SendMessage(chat_id, text, reply_markup).send()
        elif command == 'login':
            self.tg_account.await_reply = True
            self.tg_account.reply_type = 'email'
            self.tg_account.save()
            response = SendMessage(chat_id, 'Введите email').send()
        elif command == 'reviews':
            if len(args):
                account_id = self.get_account_id()
                reviews = get_reviews(account_id).filter(reviewable__screen_name=args[0]).order_by('-created_at')
                reviews_count = reviews.count()
                try:
                    offset_start = int(args[1])
                    offset_end = int(args[2])
                except:
                    offset_start = 0
                    offset_end = 5
                reviews = reviews[offset_start:offset_end]
                count = len(reviews)
                if not reviews.exists():
                    response = SendMessage(chat_id, "Отзывов нет").send()
                # Убираем кнопку "Показать еще" после нажатия
                if offset_start > 0:
                    row, position = ReplyMarkup().get_button_position(message.reply_markup['inline_keyboard'], ['Показать еще',])
                    message.reply_markup['inline_keyboard'].pop(row)
                    reply_markup = JSONRenderer().render(message.reply_markup)
                    response = SendMessage(chat_id, None, reply_markup, message.message_id).edit_markup()
                for review in reviews:
                    count -= 1
                    kwargs['more'] = False if count > 0 or offset_end >= reviews_count else True
                    kwargs['last'] = False if count > 0 or kwargs['more'] else True
                    kwargs['review']= review
                    kwargs['screen_name']= args[0]
                    kwargs['offset_start'] = offset_end
                    kwargs['offset_end'] = offset_end + 5 if offset_end + 5 < reviews_count else reviews_count
                    text =  render_to_string('review.html', {'review': review})
                    reply_markup = ReplyMarkup().get_markup(command, tg_account=self.tg_account, **kwargs)
                    response = SendMessage(chat_id, text, reply_markup).send()
            else:
                response = SendMessage(chat_id, "Введите аккаунт (durov или id123456) или номер телефона (7(xxx)xxx-xx-xx)").send()
                self.tg_account.await_reply = True
                self.tg_account.reply_type = 'screen_name'
                self.tg_account.save()
        elif command in ['like', 'dislike']:
            if not self.tg_account.account or len(args) < 2:
                return None
            dislike = command == 'dislike'
            model = apps.get_model('reviews', args[0].capitalize())
            object = model.objects.get(pk=int(args[1]))
            object = set_like(object, self.tg_account.account, dislike)
            object.save()
            text =  render_to_string(f'{args[0]}.html', {'review': object})
            row, position = ReplyMarkup().get_button_position(message.reply_markup['inline_keyboard'], ['Like', 'I Like It'])
            like_text = message.reply_markup['inline_keyboard'][row][position]['text']
            dislike_text = message.reply_markup['inline_keyboard'][row][position + 1]['text']
            message.reply_markup['inline_keyboard'][row][position]['text'] = 'I Like It' if like_text == 'Like' and not dislike else 'Like'
            message.reply_markup['inline_keyboard'][row][position + 1]['text'] = 'I Don\'t Like It' if dislike_text == 'Dislike' and dislike else 'Dislike'
            reply_markup = JSONRenderer().render(message.reply_markup)
            response = SendMessage(chat_id, text, reply_markup, message.message_id).edit_text()
        elif command == 'comments':
            account_id = self.get_account_id()
            comments = get_comments(account_id)
            comments_count = comments.count()
            comment = comments.filter(commented_review_id=int(args[0]))[int(args[1])]
            text =  render_to_string('comment.html', {'comment': comment})
            kwargs['comment'] = comment
            kwargs['number'] = int(args[1])
            kwargs['review_id'] = int(args[0])
            kwargs['comments_count'] = comments_count
            reply_markup = ReplyMarkup().get_markup(command, tg_account=self.tg_account, **kwargs)
            response = SendMessage(chat_id, text, reply_markup, message.message_id).edit_text()
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
                reply_markup = ReplyMarkup().get_markup('start', self.tg_account)
                response = SendMessage(chat_id=self.message.chat.id, text=text, reply_markup=reply_markup).send()
                response = requests.post(TG_URL + 'deleteMessage', data={'chat_id':self.message.chat.id, 'message_id': self.message.message_id})
            else:
                response = SendMessage(chat_id=self.message.chat.id, text='Фигня').send()
            self.tg_account.await_reply = False
            self.tg_account.reply_type = None
            self.tg_account.reply_1 = None
            self.tg_account.save()
        if self.tg_account.reply_type =='screen_name':
            args = [text, '0', '5']
            response = self.command_dispatcher('message', 'reviews', args)
            self.tg_account.await_reply = False
            self.tg_account.reply_type = None
            self.tg_account.save()
        return response
    
    def message_dispatcher(self):
        command, args = self.command_handler(self.message.text)
        self.tg_account = get_tg_account(self.message.user)
        if self.tg_account.await_reply:
            response = self.await_despatcher(self.message.text)
        if command:
            # response = SendMessage(chat_id=1045490278, text=command).send()
            response = self.command_dispatcher('message', command, args)
        else:
            text = "No commands in message"
            # response = SendMessage(chat_id=self.message.chat.id, text=text).send()
            response = None
        return response
    
    def callback_dispatcher(self):
        command, args = self.command_handler(self.callback_query.data)
        self.tg_account = get_tg_account(self.callback_query.user)
        response = self.callback_query.answer()
        if command:
            response = self.command_dispatcher('callback_query', command, args)
        else:
            text = "No commands in callback_query"
            # response = SendMessage(chat_id=self.message.chat.id, text=text).send()
        return response


@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def tg_update_handler(request):
    # response = SendMessage(chat_id=1045490278, text='update').send()
    try:
        update = Update(request.data)
        if hasattr(update,'message'):
            # response = SendMessage(chat_id=1045490278, text='message').send()
            update.message_dispatcher()
        elif hasattr(update,'callback_query'):
            update.callback_dispatcher()
        # method = "sendMessage"
        # send_message = SendMessage(chat_id=1045490278, text=f'{request.data}')
        # data = SendMessageSerializer(send_message).data
        # requests.post(TG_URL + method, data)
    except:
        pass
    return Response({}, status=200)

    