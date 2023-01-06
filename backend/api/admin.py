from django.contrib import admin

# Register your models here.
from .models import MVC,EarliestByDay,AvaliableNow,Register

admin.site.register(MVC)
admin.site.register(EarliestByDay)
admin.site.register(AvaliableNow)
admin.site.register(Register)