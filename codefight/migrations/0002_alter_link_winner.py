# Generated by Django 3.2 on 2021-05-09 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codefight', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='winner',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]