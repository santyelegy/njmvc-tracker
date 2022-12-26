import requests
from bs4 import BeautifulSoup
import re
import json

#get data
r=requests.get("https://telegov.njportal.com/njmvc/AppointmentWizard/15")
soup = BeautifulSoup(r.text, 'html.parser')
scripts = soup.find_all("script",type="text/javascript")
datas=scripts[1].text.splitlines()[:4]
"""
def process(data):
    
    return re.findall("\{[^\}]*\}",output)
"""
def process(data):
    output=re.findall('\[.*\]', data)[0]
    return json.loads(output)
#line 1: empty
#line 2: locationData
#line 3: timeData
#line 4: locationModel
locationData=process(datas[1])
timeData=process(datas[2])
locationModel=process(datas[3])

location=[]
workingDay=[]
for data in locationData:
    if "Name" in data:
        location.append(data)
    else:
        workingDay.append(data)
with open('./src/data/location.json', 'w') as f:
    json.dump(location, f)
with open('./src/data/timeData.json', 'w') as f:
    json.dump(timeData, f)
with open('./src/data/locationModel.json', 'w') as f:
    json.dump(locationModel, f)