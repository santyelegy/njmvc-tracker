import requests
from bs4 import BeautifulSoup
import re


#get data
r=requests.get("https://telegov.njportal.com/njmvc/AppointmentWizard/15")
soup = BeautifulSoup(r.text, 'html.parser')
scripts = soup.find_all("script",type="text/javascript")
datas=scripts[1].text.splitlines()[:4]

def process(data):
    output=re.findall('\[.*\]', data)[0][1:-1]
    return re.findall("\{[^\}]*\}",output)
#line 1: empty
#line 2: locationData
#line 3: timeData
#line 4: locationModel
locationData=process(datas[1])
timeData=process(datas[2])
locationModel=process(datas[3])
