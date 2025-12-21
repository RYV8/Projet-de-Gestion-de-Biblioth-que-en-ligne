from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Bibliothecaire, Admin

class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('email', 'username', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'is_superuser')
    search_fields = ('email', 'username')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password', 'username', 'first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )

admin.site.register(User, UserAdmin)

@admin.register(Bibliothecaire)  
class BiblothecaireAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Bibliothecaire._meta.get_fields() if field.concrete]
   
    list_filter = ('user',)
    
@admin.register(Admin)
class AministrateurAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Admin._meta.get_fields() if field.concrete]

    list_filter = ('user',)