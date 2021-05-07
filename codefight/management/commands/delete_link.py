from django.core.management.base import BaseCommand, CommandError
from datetime import datetime,timedelta
from django.utils import timezone
from codefight.models import Link

class Command(BaseCommand):

    def handle(self, *args,**kwargs):
        Link.objects.filter(genration_time__lte=timezone.now()-timedelta(days=1)).delete()

   


       