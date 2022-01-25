from django.db import models

# Create your models here.
class SendMessage():
    def __init__(self, chat_id, text, parse_mode='HTML', reply_markup=None) -> None:
        self.chat_id = chat_id
        self.text = text
        self.parse_mode = parse_mode
        self.reply_markup = reply_markup


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


class TgUser():
    def __init__(self, data) -> None:
        for key, value in data.items():
            self.__setattr__(key, value)


class Chat():
    def __init__(self, data) -> None:
        for key, value in data.items():
            self.__setattr__(key, value)


class Message():
    def __init__(self, data):
        for key, value in data.items():
            if key == 'reply_to_message':
                self.__setattr__(key, Message(value))
            elif key == 'from':
                self.__setattr__(key, TgUser(value))
            elif key == 'chat':
                self.__setattr__(key, Chat(value))
            else:
                self.__setattr__(key, value)


class CallbackQuery():
    def __init__(self, data) -> None:
        for key, value in data.items():
            if key == 'message':
                self.__setattr__(key, Message(value))
            elif key == 'from':
                self.__setattr__(key, TgUser(value))
            else:
                self.__setattr__(key, value)


class Update():
    def __init__(self, data) -> None:
        for key, value in data.items():
            if key == 'message':
                self.__setattr__(key, Message(value))
            elif key == 'callback_query':
                self.__setattr__(key, CallbackQuery(value))
            else:
                self.__setattr__(key, value)