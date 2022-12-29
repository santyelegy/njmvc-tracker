from django.db import models

# Create your models here.

class MVC(models.Model):
    name=models.TextField(null=False,blank=False)
    street1=models.TextField()
    street2=models.TextField(null=True,blank=True)
    city=models.TextField()
    locationId=models.IntegerField()

    def __str__(self):
        return self.name

class Record(models.Model):
    locationId=models.ForeignKey(MVC, on_delete=models.CASCADE)
    time=models.DateTimeField()
    createdTime=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.locationId)

class AvaliableNow(models.Model):
    locationId=models.OneToOneField(MVC,on_delete=models.CASCADE)
    time=models.DateTimeField()

    def __str__(self):
        return str(self.locationId)

class EarliestByDay(models.Model):
    locationId=models.ForeignKey(MVC,on_delete=models.CASCADE)
    earliestTime=models.DateTimeField()
    day=models.DateField(auto_now_add=True)
    def __str__(self):
        return str(self.locationId)
