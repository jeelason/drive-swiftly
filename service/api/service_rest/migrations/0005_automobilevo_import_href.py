# Generated by Django 4.0.3 on 2022-05-09 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_remove_technician_href'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(max_length=200, null=True, unique=True),
        ),
    ]