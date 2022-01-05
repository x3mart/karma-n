from django.db.models.aggregates import Avg
from reviews.models import Attribute, Comment, AttributeTitle, Review, ReviewTemplate
from django.contrib import admin

# Register your models here.
class AttributeTitleExecuter(AttributeTitle):
    class Meta:
        proxy = True
        verbose_name = 'Название характеристики отзывов на Исполнителя'
        verbose_name_plural = 'Названия характеристик отзывов на Исполнителя'


class AttributeTitleExecuterAdmin(admin.ModelAdmin):
    exclude = ('about_customer',)
    
    def get_queryset(self, request):
        return AttributeTitle.objects.filter(is_customer=False)
    
    def has_delete_permission(self, request, obj=None):
        if self.get_queryset(request).count() < 4:
            return True      
        return False
    
    def has_add_permission(self, request, obj=None):
        if self.get_queryset(request).count() < 4:
            return True      
        return False

class AttributeTitleCustomer(AttributeTitle):
    class Meta:
        proxy = True
        verbose_name = 'Название характеристики отзывов на Заказчика'
        verbose_name_plural = 'Названия характеристик отзывов на Заказчика'


class AttributeTitleCustomerAdmin(admin.ModelAdmin):
    exclude = ('is_customer',)
    
    def get_queryset(self, request):
        return AttributeTitle.objects.filter(is_customer=True)
    
    def has_delete_permission(self, request, obj=None):
        if self.get_queryset(request).count() < 4:
            return True      
        return False
    
    def has_add_permission(self, request, obj=None):
        if self.get_queryset(request).count() < 4:
            return True      
        return False
    
    def save_model(self, request, obj, form, change):
        obj.is_customer = True
        super().save_model(request, obj, form, change)


class AttributeReviewInline(admin.TabularInline):
    model = Attribute
    exclude = ('review_template',)
    readonly_fields = ('title',)
    max_num = 4
    extra = 4

    def has_delete_permission(self, request, obj=None):
        return False
    


class AttributeReviewExecuterTemplateInline(admin.TabularInline):
    model = Attribute
    exclude = ('review',)
    max_num = 4
    extra = 4

    def has_delete_permission(self, request, obj=None):
        return False

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "title":
            kwargs["queryset"] = AttributeTitle.objects.filter(is_customer=False)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class AttributeReviewCustomerTemplateInline(admin.TabularInline):
    model = Attribute
    exclude = ('review',)
    max_num = 4
    extra = 4

    def has_delete_permission(self, request, obj=None):
        return False

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "title":
            kwargs["queryset"] = AttributeTitle.objects.filter(is_customer=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class ReviewTemplateExecuter(ReviewTemplate):
    class Meta:
        proxy = True
        verbose_name = 'Шаблон отзывов на Исполнителя'
        verbose_name_plural = 'Шаблоны отзывов на Исполнителя'


class ReviewTemplateExecuterAdmin(admin.ModelAdmin):
    exclude = ('is_customer',)
    inlines = [
        AttributeReviewExecuterTemplateInline,
    ]

    def get_queryset(self, request):
        return ReviewTemplate.objects.filter(is_customer=False)

class ReviewTemplateCustomer(ReviewTemplate):
    class Meta:
        proxy = True
        verbose_name = 'Шаблон отзывов на Заказчика'
        verbose_name_plural = 'Шаблоны отзывов на Заказчика'



class ReviewTemplateCustomerAdmin(admin.ModelAdmin):
    exclude = ('is_customer',)
    inlines = [
        AttributeReviewCustomerTemplateInline,
    ]

    def get_queryset(self, request):
        return ReviewTemplate.objects.filter(is_customer=True)
    
    def save_model(self, request, obj, form, change):
        if not obj.is_customer:
            obj.is_customer=True
        return super().save_model(request, obj, form, change)

class ReviewAdmin(admin.ModelAdmin):
    inlines = [
        AttributeReviewInline,
    ]

class AttributeTitleAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return AttributeTitle.objects.count() < 4
    def has_add_permission(self, request, obj=None):
        return AttributeTitle.objects.count() < 4


admin.site.register(Review, ReviewAdmin)
admin.site.register(ReviewTemplateExecuter, ReviewTemplateExecuterAdmin)
admin.site.register(ReviewTemplateCustomer, ReviewTemplateCustomerAdmin)
admin.site.register(Comment)
# admin.site.register(Attribute)
admin.site.register(AttributeTitleExecuter, AttributeTitleExecuterAdmin)
admin.site.register(AttributeTitleCustomer, AttributeTitleCustomerAdmin)
