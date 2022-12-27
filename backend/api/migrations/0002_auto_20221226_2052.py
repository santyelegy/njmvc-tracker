# Generated by Django 4.1 on 2022-12-27 01:52

from django.db import migrations
import json
import os

def init_data(apps, schema_editor):
    # We can't import the MVC model directly as it may be a newer
    # version than this migration expects. We use the historical version.

    MVC = apps.get_model('api', 'MVC')
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, '../initData/location.json')
    f = open(filename)
    datas=json.load(f)
    for data in datas:
        mvc=MVC.objects.create(name=data["Name"],street1=data["Street1"],street2=data["Street2"],city=data["City"],locationId=data["LocAppointments"][0]["LocationId"])
        mvc.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_mvc_street2'),
    ]

    operations = [
        migrations.RunPython(init_data),
    ]