from huey import crontab
from huey.contrib import djhuey as huey
import requests
from bs4 import BeautifulSoup
import re
import json
from django.apps import apps
from datetime import datetime

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
    Record = apps.get_model("api", "Record")
    MVC = apps.get_model("api","MVC")
    for data in timeData:
        availableTime=data["FirstOpenSlot"].split("Next Available: ",1)
        if len(availableTime)>1:
            availableTime=datetime.strptime(availableTime[1], '%m/%d/%Y %I:%M %p')
            #availableTime.tzinfo=tz.gettz('America/New_York')
            mvc=MVC.objects.get(locationId=data["LocationId"])
            record=Record.objects.create(locationId=mvc,time=availableTime)
            record.save()
        else:
            #should I consider no avilable statement?
            continue
