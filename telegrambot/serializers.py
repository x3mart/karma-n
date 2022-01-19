from rest_framework import serializers


class AnswerCallbackQuery(serializers.Serializer):
    callback_query_id = serializers.CharField()
    text = serializers.CharField()


class InlineKeyboardButton(serializers.Serializer):
    text = serializers.CharField(required=False)
    url = serializers.URLField(required=False)
    callback_data = serializers.CharField(required=False)


class ReplyMarkup(serializers.Serializer):
    inline_keyboard = serializers.SerializerMethodField()

    def get_inline_keyboard(self, obj):
        keyboards = []
        for row in obj['inline_keyboard']:
            keyboards.append(InlineKeyboardButton(row, many=True).data)
        return keyboards