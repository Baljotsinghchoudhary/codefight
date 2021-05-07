from django.core.management.base import BaseCommand, CommandError
from datetime import datetime,timedelta
from upcontest.models import contest
import requests
from asgiref.sync import sync_to_async,async_to_sync
from bs4 import BeautifulSoup

class Command(BaseCommand):

    def handle(self, *args,**kwargs):
        self.get_codechef()
        self.get_codeforces()

    def get_codechef(self):
        result={}
        url="https://www.codechef.com/contests"
        page=requests.get(url)
        codechef,created=contest.objects.get_or_create(pk="CODECHEF")
        soup=BeautifulSoup(page.content,"html.parser")
        table=soup.find_all(class_='dataTable')[1]
        table_row=table.find_all('td')
        for i in range(1,len(table_row),4):
            result[i//4]={'url':'https://www.codechef.com/'+table_row[i].a['href'],'name':table_row[i].get_text().strip(),'start':datetime.strptime(table_row[i+1].get_text().strip(),'%d %b %Y %H:%M:%S').strftime('%d-%m-%Y %H:%M'),'end':datetime.strptime(table_row[i+2].get_text().strip(),'%d %b %Y %H:%M:%S').strftime('%d-%m-%Y %H:%M')}
        codechef.data=result
        codechef.save()


    def get_codeforces(self):
        result={}
        url="https://codeforces.com/contests"
        page=requests.get(url)
        codeforces,created=contest.objects.get_or_create(pk="CODEFORCES")
        soup=BeautifulSoup(page.content,"html.parser")
        table_row=soup.find('table').find_all('td')

        for i in range(0,len(table_row),6):
            result[i//6]={'url':url,'name':table_row[i].get_text().strip(),'start':(datetime.strptime(table_row[i+2].get_text().strip(),'%b/%d/%Y %H:%M')+timedelta(hours=2.5)).strftime('%d-%m-%Y %H:%M'),'end':table_row[i+3].get_text().strip()}
        codeforces.data=result
        codeforces.save()
        


       