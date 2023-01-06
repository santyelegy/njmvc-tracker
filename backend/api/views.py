from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import MVC,Register,AvaliableNow,EarliestByDay
from .serializers import MVCSerializer,AvaliableNowSerializer,EarliestByDaySerializer
from datetime import datetime
from django.core.mail import send_mail
from django.conf import settings
import smtplib
import ssl
# Create your views here.

@api_view(['GET'])
def getMVC(request):
    mvcs= MVC.objects.all()
    serializer=MVCSerializer(mvcs,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTime(request):
    records= AvaliableNow.objects.all()
    serializer=AvaliableNowSerializer(records,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getHistory(request):
    history=EarliestByDay.objects.all()
    serializer=EarliestByDaySerializer(history,many=True)
    return Response(serializer.data)



@api_view(['POST'])
def createRegister(request):
    data=request.data
    print(request.data)
    register=Register.objects.create(
        locationId=MVC.objects.get(id=data["id"]),
        email=data["email"],
        day=datetime.strptime(data['day'], '%Y-%m-%d')
    )
    register.save()
    port = settings.EMAIL_PORT
    smtp_server = settings.EMAIL_HOST
    sender_email = settings.EMAIL_HOST_USER
    password = settings.EMAIL_HOST_PASSWORD
    receiver_email = data["email"]
    subject = 'Website registration'
    body = 'registration success'
    message = 'Subject: {}\n\n{}'.format(subject, body)
    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()  # Can be omitted
        server.starttls(context=context)
        server.ehlo()  # Can be omitted
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
    return Response("success")