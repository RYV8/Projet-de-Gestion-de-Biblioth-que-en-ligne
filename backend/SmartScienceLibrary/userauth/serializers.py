from rest_framework import serializers
from userauth.models import User, Bibliothecaire, Admin

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields ='__all__'
        
class BibliothecaireSerializer(serializers.ModelSerializer):
    class Meta:
        model= Bibliothecaire
        fields ='__all__'
        
        
        
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model=Admin
        fields ='__all__'
        