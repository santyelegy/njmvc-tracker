# Generated by Django 4.1 on 2022-12-27 02:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mvc',
            name='street3',
        ),
    ]
