from django.contrib import admin
from livres.models import *
@admin.register(Livre)
class LivreAdmin(admin.ModelAdmin):
    
    list_display = [field.name for field in Livre._meta.get_fields() if field.concrete]
   
    list_filter = ('categorie', 'date_publication', 'langue')

    search_fields = ('titre', 'auteur', 'isbn')
    list_per_page = 40

  
    search_help_text = True
    
@admin.register(Categorie)
class CategorieAdmin(admin.ModelAdmin):
    list_display =[field.name for field in Categorie._meta.get_fields() if field.concrete]
    list_filter = ('date_creation',)


@admin.register(Commentaire)
class CommentaireAdmin(admin.ModelAdmin):
    list_display = ['note','date_comment']
    list_filter = ('date_comment',)
    