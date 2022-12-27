from dataclasses import field
from rest_framework.serializers import ModelSerializer
from .models import MVC,Record

class MVCSerializer(ModelSerializer):
    class Meta:
        model=MVC
        #fields=['body','update','create']
        fields='__all__'

class RecordSerializer(ModelSerializer):
    class Meta:
        model=Record
        fields='__all__'