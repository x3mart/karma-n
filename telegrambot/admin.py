from django.contrib import admin

from telegrambot.models import TelegramAccount

# Register your models here.
admin.site.register(TelegramAccount)

[[{"text": "Ух ты!", "callback_data": "/like review 13"}, {"text": "Ах ты!", "callback_data": "/dislike review 13"}],[{"text": "Очень позитвно", "callback_data": "/like review 13"}],[{"text": "Like", "callback_data": "/like review 13"}, {"text": "Dislike", "callback_data": "/dislike review 13"}]]