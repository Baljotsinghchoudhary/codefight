from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .token import account_activation_token,account_reset_token
from django.core.mail import EmailMessage
from .models import User



def SendMailActivation(request,user):
        
    current_site = get_current_site(request)
    subject = 'VERIFY YOUR EMAIL ACCOUNT'
    message = render_to_string('registration/email-active.html', {
        'email': user.email,
        'domain': current_site.domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
    })
    email=EmailMessage(subject,message,from_email='no-reply-Codefight@gmail.com',to=[user.email])
    email.content_subtype = "html"
    email.send()
        
def SendMailPaswordReset(request,user):
    current_site = get_current_site(request)
    subject = 'RESET YOUR PASSWORD'
    message = render_to_string('registration/password_reset_email.html', {
        'email': user.email,
        'domain': current_site.domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_reset_token.make_token(user),
    })
    email=EmailMessage(subject,message,from_email='no-reply-Codefight@gmail.com',to=[user.email])
    email.content_subtype = "html"
    email.send()

