# Generated by Django 4.1 on 2022-12-30 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_earliestbyday_avaliablenow'),
    ]

    operations = [
        migrations.AddField(
            model_name='mvc',
            name='lat',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='mvc',
            name='long',
            field=models.FloatField(null=True),
        ),
    ]