from django.urls import path
from . import views

urlpatterns=[
    path('MVC/',views.getMVC,name="MVC-data"),
    path('Record/',views.getTime,name="Time-data"),
]