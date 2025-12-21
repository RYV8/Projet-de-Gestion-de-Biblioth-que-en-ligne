from rest_framework import serializers
from livres.models import Livre, Categorie,Commentaire

class LivresSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Livre
        fields = '__all__'
class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model= Categorie 
        fields = '__all__'
        
class CommentaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commentaire
        fields= '__all__'