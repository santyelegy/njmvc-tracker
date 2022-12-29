from huey import crontab
from huey.contrib import djhuey as huey
import requests
from bs4 import BeautifulSoup
import re
import json
from django.apps import apps
from datetime import datetime,date

#@huey.periodic_task(crontab(hour='*/2'))
@huey.db_periodic_task(crontab(minute='*/30'))
def call_crawler():
    print("running my periodic task")
    r=requests.get("https://telegov.njportal.com/njmvc/AppointmentWizard/15")
    soup = BeautifulSoup(r.text, 'html.parser')
    scripts = soup.find_all("script",type="text/javascript")
    datas=scripts[1].text.splitlines()[:4]
    output=re.findall('\[.*\]', datas[2])[0]
    timeData=json.loads(output)
    #Record = apps.get_model("api", "Record")
    MVC = apps.get_model("api","MVC")
    AvaliableNow = apps.get_model("api", "AvaliableNow")
    EarliestByDay = apps.get_model("api", "EarliestByDay")
    for data in timeData:
        availableTime=data["FirstOpenSlot"].split("Next Available: ",1)
        if len(availableTime)>1:
            availableTime=datetime.strptime(availableTime[1], '%m/%d/%Y %I:%M %p')
            mvc=MVC.objects.get(locationId=data["LocationId"])
            obj, created = AvaliableNow.objects.update_or_create(
                locationId=mvc,
                defaults={'locationId':mvc,'time':availableTime},
            )
            obj.save()
            obj, created = EarliestByDay.objects.get_or_create(
                locationId=mvc,
                day=date.today(),
                defaults={'locationId': mvc,'earliestTime':availableTime},
            )
            if obj.earliestTime>availableTime:
                obj.earliestTime=availableTime
            obj.save()
        else:
            #should I consider no avilable statement?
            continue
