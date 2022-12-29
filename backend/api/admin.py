from django.contrib import admin

# Register your models here.
from .models import MVC,Record,EarliestByDay,AvaliableNow

admin.site.register(MVC)
admin.site.register(Record)
admin.site.register(EarliestByDay)
admin.site.register(AvaliableNow)