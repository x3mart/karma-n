from django.apps import AppConfig


class ReviewablesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'reviewables'

    def ready(self):
        import reviewables.signals
