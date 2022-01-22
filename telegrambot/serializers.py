from rest_framework import serializers


class AnswerCallbackQuerySerializer(serializers.Serializer):
    callback_query_id = serializers.CharField()
    text = serializers.CharField()


class InlineKeyboardButtonSerializer(serializers.Serializer):
    text = serializers.CharField(required=False)
    url = serializers.URLField(required=False)
    callback_data = serializers.CharField(required=False)


class ReplyMarkupSerializer(serializers.Serializer):
    inline_keyboard = serializers.SerializerMethodField()

    def get_inline_keyboard(self, obj):
        keyboards = []
        for row in obj.inline_keyboard:
            keyboards.append(InlineKeyboardButtonSerializer(row, many=True).data)
        return keyboards

class AnswerCallbackQuerySerializer(serializers.Serializer):
    text = serializers.CharField(required=False)
    url = serializers.URLField(required=False)
    callback_query_id = serializers.IntegerField()
    show_alert = serializers.BooleanField(required=False)