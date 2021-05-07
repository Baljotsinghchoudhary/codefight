from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from django.core.validators import MinLengthValidator
# Create your models here.



class UserManager(BaseUserManager):

    def create_user(self,username,email,first_name,last_name,password=None,is_superuser=False,is_staff=False,is_confirm_email=False,is_active=False):

        if not username:
            raise ValueError("Users must have Username")
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have an password")
        if not first_name:
            raise ValueError("Users must have an First name")
        if not last_name:
            raise ValueError("Users must have an Last name")
        user=self.model(
            username=username,
            email=email.lower(), 
            is_staff=is_staff,
            is_superuser=is_superuser,
            first_name=first_name,
            last_name=last_name,
            is_confirm_email=is_confirm_email,
            is_active=is_active
        )
        user.set_password(password) #bulit in method in BaseUserManager sets hashpyed value
        
        user.save(using=self._db)   # overide database using using parameter
        return user

    def create_superuser(self,username,email,first_name,last_name,password=None):
        return self.create_user(username,email,first_name,last_name,password,is_superuser=True,is_staff=True,is_confirm_email=True,is_active=True)


class User(AbstractBaseUser,PermissionsMixin):

    username=models.CharField(
        verbose_name='Username',
        max_length=255,
        primary_key=True,
        validators=[MinLengthValidator(3,message="Username must have 3 characters")]
    )
    email = models.EmailField(
        verbose_name='Email Address',
        max_length=255,
        unique=True,
    )
    #verbose_name name to be shown during rendering field in admin
    first_name=models.CharField(
        verbose_name="First Name",
        max_length=255,
    )
    last_name=models.CharField(
        verbose_name="Last Name",
        max_length=255,
    )
    is_confirm_email=models.BooleanField(default=False,verbose_name="Confirmed Email")
    is_active = models.BooleanField(default=True )
    is_superuser = models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)

    objects = UserManager() #CUSTOM USER MANAGER

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','first_name','last_name'] #username and password are default

    def __str__(self):
        return self.username


