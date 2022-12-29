from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import MVC,Record,AvaliableNow,EarliestByDay
from .serializers import MVCSerializer,AvaliableNowSerializer,EarliestByDaySerializer
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