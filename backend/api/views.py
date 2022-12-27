from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import MVC,Record
from .serializers import MVCSerializer,RecordSerializer
# Create your views here.

@api_view(['GET'])
def getMVC(request):
    mvcs= MVC.objects.all()
    serializer=MVCSerializer(mvcs,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTime(request):
    records= Record.objects.all()
    serializer=RecordSerializer(records,many=True)
    return Response(serializer.data)