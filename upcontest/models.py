from django.db import models
# Create your models here.

class contest(models.Model):
        
    site=models.CharField(max_length=255,primary_key=True)
    data=models.JSONField(default=dict,blank=True)
    
    def __str__(self):
        return self.site
