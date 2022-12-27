from django.contrib import admin

# Register your models here.
from .models import MVC,Record

admin.site.register(MVC)
admin.site.register(Record)