from rest_framework import serializers 
from livregestions.models import Emprunt, Achat, Panier, PanierItems, Commande, CommandeItems

class EmpruntSerializer(serializers.ModelSerializer):
    class Meta:
        model =Emprunt
        fields = '__all__'
        
class AchatSerializer(serializers.ModelSerializer):
    class Meta:
        model =Achat
        fields ='__all__' 
        
class PanierSerializer(serializers.ModelSerializer):
    class Meta:
        model =Panier
        fields ='__all__' 
        
class PanierItemsSerializer(serializers.ModelSerializer):
    date_add = serializers.DateTimeField()
    class Meta:
        model = PanierItems
        fields ='__all__' 
class CommandeSerializer(serializers.ModelSerializer):
    class Meta:
        model =Commande
        fields ='__all__' 
        
class CommandeItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model =CommandeItems
        fields ='__all__' 
        
        
        