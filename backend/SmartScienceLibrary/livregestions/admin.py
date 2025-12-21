from livregestions.models import *
from django.contrib import admin 

@admin.register(Emprunt)
class EmpruntAdmin(admin.ModelAdmin):
    
    list_display = [field.name for field in Emprunt._meta.get_fields() if field.concrete]
   
    list_filter = ('user','date_emprunt','date_echeance','livre')
    
    list_per_page = 20

    search_fields = ('user','livre',)
    search_help_text = True
@admin.register(Achat)
class AchatAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Achat._meta.get_fields() if field.concrete]
   
    list_filter = ('user',)

@admin.register(Panier)
class PanierAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Panier._meta.get_fields() if field.concrete]
   
  
@admin.register(PanierItems)
class PanierItemsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in PanierItems._meta.get_fields() if field.concrete]
   
   
@admin.register(Commande)
class CommandeAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Commande._meta.get_fields() if field.concrete]
   

@admin.register(CommandeItems)
class CommandeItemsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in  CommandeItems._meta.get_fields() if field.concrete]
   

