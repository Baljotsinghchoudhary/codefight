# Generated by Django 3.2 on 2021-05-03 07:14

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=255, primary_key=True, serialize=False, validators=[django.core.validators.MinLengthValidator(3, message='Username must have 3 characters')], verbose_name='Username'),
        ),
    ]
