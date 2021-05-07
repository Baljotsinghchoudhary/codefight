from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserCreationForm, UserChangeForm
from .models import User
# Register your models here.


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('username','email', 'first_name', 'last_name', 'last_login')
    list_filter = ('is_superuser', 'is_staff', 'is_active', 'is_confirm_email')
    readonly_fields = ('last_login',)
    fieldsets = (
        ('BASIC', {'fields': ('username','email', 'password', 'first_name',
                              'last_name', 'last_login')}),
        ('STATE', {'fields': ('is_superuser', 'is_staff', 'is_active', 'is_confirm_email')}),
        ('GOUPS', {'fields': ('groups',)})
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    # used to display add model in admin
    add_fieldsets = (
        ("User", {
            'classes': ('wide',),
            'fields': ('username','email', 'first_name', 'last_name', 'password1', 'password2', 'is_staff', 'is_confirm_email', 'is_active', 'is_superuser'), 
        }),  # display while creating
    )
    search_fields = ('username','email', 'first_name', 'last_name')
    ordering = ('username',)
    filter_horizontal = ('groups',)


# Now register the new UserAdmin...
admin.site.register(User, UserAdmin)
