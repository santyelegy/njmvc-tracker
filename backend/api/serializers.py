from dataclasses import field
from rest_framework.serializers import ModelSerializer
from .models import MVC,Record,AvaliableNow,EarliestByDay

class MVCSerializer(ModelSerializer):
    class Meta:
        model=MVC
        #fields=['body','update','create']
        fields='__all__'

class RecordSerializer(ModelSerializer):
    class Meta:
        model=Record
        fields='__all__'

class AvaliableNowSerializer(ModelSerializer):
    class Meta:
        model=AvaliableNow
        fields='__all__'

class EarliestByDaySerializer(ModelSerializer):
    class Meta:
        model=EarliestByDay
        fields='__all__'