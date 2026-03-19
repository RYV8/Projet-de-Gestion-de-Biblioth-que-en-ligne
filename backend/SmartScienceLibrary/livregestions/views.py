from django.shortcuts import render

from livregestions.serializers import EmpruntSerializer , AchatSerializer, PanierItemsSerializer,CommandeItemsSerializer,CommandeSerializer
from livres.models import Livre
from livregestions.models import Panier, PanierItems, Commande, CommandeItems,Emprunt, Achat
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from userauth.models import Bibliothecaire, User
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime
from livregestions.utils import send_email_confirm
from django.http import JsonResponse 
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from rest_framework.exceptions import APIException
import subprocess
import json
from pathlib import Path
from django.conf import settings
User =get_user_model()




def verifie_panier(request):
    """
    Vérifie si l'utilisateur a un panier, sinon le crée.
    Retourne le panier de l'utilisateur.
    """
    user = request.user
  
    if user.is_authenticated:
        panier = Panier.objects.filter(user = user)
        if not panier:
            panier =  Panier.objects.create(user = user)
            return panier
        else:
            print(panier.last())
            return panier.last()
        
# cette veu permet d'ajouter des livres a un panier et aussi d'avoir la liste des produits d'un panier en focntion de la requête
class AddPanierViews(APIView):
    """
    Gère l'ajout de livres au panier et la récupération du contenu du panier.
    """
    def post(self,request, *args, **kwargs):
        livre_id =kwargs.get('livre_id')
        panier = verifie_panier(request)
        try:
            livre = Livre.objects.get(id = livre_id)
            paniers_exist= PanierItems.objects.filter(panier = panier, livre = livre)
            if paniers_exist.exists():
                print(f" voici le panier items {PanierItems.objects.filter(panier = panier, livre = livre).first()}")
                PanierItems.objects.filter(panier=panier, livre=livre).first().add_quantite(1)
                return Response(data = {
                "Response":"quantité du livre mise à jour avec succes",
                "data":PanierItemsSerializer(paniers_exist, many=True).data
            }, status=status.HTTP_200_OK)
            panier =PanierItems.objects.create(panier = panier, livre = livre)
            
            return Response(data = {
                "Response":"panier créer avec succes",
                "data":PanierItemsSerializer(panier).data
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            raise APIException(f"Erreur: {e}")
class GetPanierViews(APIView):
    def get(self,request,*args, **kwargs):
        try:
            panier = verifie_panier(request)
            
            panieritems = PanierItems.objects.filter(panier = panier)
            
            return Response(data = PanierItemsSerializer(panieritems, many=True).data, status= status.HTTP_200_OK)
        except Exception as e:
            raise APIException(f"Erreur: {e}")
@api_view( ["POST",])
def retirerLivre(request, *args, **kwargs):
    """
    Retire un livre du panier de l'utilisateur.
    """
    panier = Panier.objects.filter(user=request.user).last()
    if not panier:
        return Response({"error": "Aucun panier trouvé."}, status=status.HTTP_404_NOT_FOUND)
    try:
        panieritems = PanierItems.objects.get(panier=panier,livre =kwargs.get('livre_id'))
        if panieritems.quantite >1:
            panieritems.subs_quantite(1)
            return Response({"success": "Quantité diminuée."}, status=status.HTTP_200_OK)
        else:
            panieritems.delete()
            return Response({"success": "Livre retiré du panier."}, status=status.HTTP_200_OK)

    except PanierItems.DoesNotExist:
        return Response({"error": "Livre non trouvé dans le panier."}, status=status.HTTP_404_NOT_FOUND)
    
    
@api_view( ["POST",])
def add_qt_livre(request, *args, **kwargs):
    """
    ajoute une quantiter 'nbr' du  livre au panier de l'utilisateur.
    """
    panier = Panier.objects.filter(user=request.user).last()
    if not panier:
        return Response({"error": "Aucun panier trouvé."}, status=status.HTTP_404_NOT_FOUND)
    try:
        panieritems = PanierItems.objects.get(panier=panier,livre =kwargs.get('livre_id'))
        
        panieritems.add_quantite(kwargs.get('nbr'))
        return Response({"success": f"{kwargs.get('nbr')} ajouter avec succes"}, status=status.HTTP_200_OK)
    

    except PanierItems.DoesNotExist:
        return Response({"error": "Livre non trouvé dans le panier."}, status=status.HTTP_404_NOT_FOUND)

        
def email_confirm(subject:str,user_id):
    """
    Envoie un email de confirmation à l'utilisateur.
    """
    email = User.objects.get(id = user_id).email

    subjet =subject
      
    context = {
            'date': datetime.today().date,
            'email': email
        }

    receivers = [email]

    has_send = send_email_confirm(
            subjet=subjet,
            receivers=receivers,
            context=context
            )

    if has_send:
        cxt =  {"msg":"mail envoyee avec success."}
    else:
        cxt = {'msg':'email envoie echoue.'}

        

class EmpruntCreateView(APIView):
    """
    Permet à un utilisateur d'emprunter un livre (POST uniquement).
    """

    def post(self, request, *args, **kwargs):
        """cette vue permet d'emprunter un livre

        Args:
            request (POST): l'utiisateur déclenche l'empurnt d'un livre en envoyant l'id du livre

        Returns:
            _type_:message de type json pour confirmer l'emprunt si éventuellement celle est fait: l'id de l'emprutn est retourné
        """
        livre_id = kwargs.get('livre_id')
        try:
            livre = Livre.objects.get(id=livre_id)
        except Livre.DoesNotExist:
            return Response({"error": "Livre introuvable"}, status=404)

        if livre.stock_disponible <= 0:
            return Response({"error": "Stock épuisé"}, status=400)
        
        emprunt = Emprunt.objects.create(
            user=request.user.id,
            livre=livre,
            statut="actif",
            date_emprunt= timezone.now()
        )

        livre.diminuer_stock()

        # Envoi email
        email_confirm(subject="Confirmation de l'emprunt de livre", user_id=request.user.id)

        return Response({"message": "Livre emprunté avec succès", "emprunt_id": emprunt.id}, status=201)


class EmpruntListView(APIView):
    """
    Liste les emprunts de l'utilisateur (GET uniquement).
    """

    def get(self, request):
        emprunts = Emprunt.objects.filter(user=request.user)
        data = [
            {
                "id": e.id,
                "livre": e.livre.titre,
                "statut": e.statut,
                "date_emprunt": e.date_emprunt
            }
            for e in emprunts
        ]
        return Response(data, status=200)


def listEmpruntBiblitohécaire(request):
    """
    Liste tous les emprunts (réservé aux bibliothécaires).
    """
    return Emprunt.objects.all()
 
def nombreEmprunt(request):
    """
    Retourne le nombre total d'emprunts.
    """
    total =Emprunt.objects.all().count()
    return JsonResponse({'total_emprunts':total})
 
class PasserCommandeView(APIView):
    """
    Permet à un utilisateur de passer une commande à partir de son panier.
    """
    def post(self,request, *args, **kwargs):
        panier = verifie_panier(request)
        try:
            panier_items = PanierItems.objects.filter(panier=panier)
            if not panier_items.exists():
                return Response(
                    {"error": "Votre panier est vide."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            commande = Commande.objects.create(user=request.user, statuts="EN_COURS")

            # Lier le panier à la commande (structure existante)
            CommandeItems.objects.create(commande=commande, commandeitems=panier)

            for item in panier_items:
                # Diminuer le stock pour chaque livre commandé
                item.livre.diminuer_stock()

            email_confirm(
                subject="Commande passée avec succès. Elle est en cours.",
                user_id=request.user.id,
            )
            return Response(
                {"message": "La commande est en cours. Merci !"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            raise APIException(f"Erreur: {e}")
    def get(self,request):
        try:
            commande = Commande.objects.filter(user =request.user.id).last()
            commandes_panier =CommandeItems.objects.get(commande = commande).commandeitems
            commandes_panier_items = PanierItems.objects.filter(panier = commandes_panier)
            
            return  Response(data=
                             {"commnde_info":CommandeSerializer(commande).data,"items":PanierItemsSerializer(  commandes_panier_items,  many = True).data}, 
                             status=status.HTTP_200_OK)
        except Exception as e :
            raise APIException(f"Erreur: {e}")

class listCommande(APIView):
    """
        Liste toutes les commandes (réservé aux bibliothécaires).
        """
    permission_classes=[IsAuthenticated]
    def get(self,request):
        
        if Bibliothecaire.objects.filter(user =request.user).exists() :
            try:
                commandes = Commande.objects.all()
              
                data =[]
                for commande in commandes:
                    commande_items=CommandeItems.objects.filter(commande =commande)
                    for commande_item in commande_items:
                        panier =commande_item.commandeitems
                        print(panier)
                        
                        panieritems = PanierItems.objects.filter(panier =panier)
                   
                        data.append({
                            "commande":CommandeSerializer(commande).data,"commande_items":PanierItemsSerializer(panieritems, many=True).data
                        })
                    print("c'est ok")
              
                return Response(data= data, status=status.HTTP_200_OK)   
            except Exception as e:
                raise APIException(f"Erreur: {e}")
        else: 
            return Response(data= {"Exeption":"Vous n'êtes pas un bibliothécaire"}, status=status.HTTP_400_BAD_REQUEST)   



        

def call_kkiapay_verify(reference):
    """
    Appelle le script Kkiapay pour vérifier une transaction.

    Les chemins sont construits à partir de BASE_DIR pour plus de robustesse.
    """
    base_dir = Path(settings.BASE_DIR)
    kkiapay_python = base_dir / "kkiapay_service" / "env2" / "bin" / "python"
    kkiapay_script = base_dir / "kkiapay_service" / "kkiapay.py"
    
    result = subprocess.run(
        [str(kkiapay_python), str(kkiapay_script), reference],
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)

class DOAchat(APIView):
    """cette vue permet de declanché le processus d'acht via kkiapay

    Args:
        APIView (POST): encoieyer la référence de l'achat dasn la fonction fetch
    """
    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            commande = Commande.objects.filter(user=user).last()
            if not commande:
                return Response(
                    {"error": "Aucune commande trouvée pour cet utilisateur."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            reference = request.data.get("reference")  # le ref de la transaction envoyé par le front
            if not reference:
                return Response({"error": "Le champ 'reference' est requis."}, status=status.HTTP_400_BAD_REQUEST)
            transaction_info = call_kkiapay_verify(reference)
            print("commande faites")
           
            if transaction_info['status'] == "SUCCESS":
                achat = Achat.objects.create(user=user, commande=commande, statuts="SUCCESS")
                data = AchatSerializer(achat).data
                return Response(data, status=status.HTTP_200_OK)
            return Response(data={"Erreur":"transaction nons effectué", "satut_kkiapay":transaction_info["status"]}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            
            raise APIException(f"Erreur : {e}")