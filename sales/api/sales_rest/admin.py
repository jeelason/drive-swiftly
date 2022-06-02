from django.contrib import admin

from .models import Salesperson, SalesHistory, Customer

@admin.register(Salesperson)
class ShoeAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesHistory)
class ShoeAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class ShoeAdmin(admin.ModelAdmin):
    pass


