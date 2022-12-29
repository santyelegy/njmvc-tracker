from django.urls import path
from . import views

urlpatterns=[
    path('mvc/',views.getMVC,name="MVC-data"),
    path('time/',views.getTime,name="Time-data"),
    path('history/',views.getHistory,name="History-data"),
]