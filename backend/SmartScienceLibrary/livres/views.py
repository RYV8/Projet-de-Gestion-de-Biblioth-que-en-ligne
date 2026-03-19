from django.shortcuts import render

from livres.serializers import LivresSerializer, CategorieSerializer,CommentaireSerializer
from livres.models import Livre, Categorie, Commentaire
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly, IsAdminUser, AllowAny
from django.http import FileResponse, Http404


import os
from django.shortcuts import redirect, render
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from django.http import JsonResponse

from rest_framework import  filters
from django_filters.rest_framework import DjangoFilterBackend

from livres.filters import LivreFilter


# from django_filters import rest_framework as filters
## Gestion des livres: lister, mettre a jour , supprimer, rechercher
class ListLivreView(ListAPIView):
    """
    Liste tous les livres disponibles.
    Permet la recherche, le tri et le filtrage.
    Accessible à tous.
    """
    permission_classes=[ AllowAny]
    queryset = Livre.objects.all()
    serializer_class =LivresSerializer
    
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = LivreFilter
    ordering_fields = ['titre', 'categorie__name', 'auteur']  # Utilise le champ réel de la FK
    search_fields = ['titre', 'categorie__name', 'auteur']   


class CreateLivresView(CreateAPIView):
    """
    Crée un nouveau livre.
    Réservé aux administrateurs.
    """
    permission_classes=[ IsAdminUser]
    queryset = Livre.objects.all()
    serializer_class =LivresSerializer
   


class RetrieveUpdateDeleteLivreView(RetrieveUpdateDestroyAPIView):
    """
    Récupère, met à jour ou supprime un livre spécifique.
    Réservé aux administrateurs.
    """
    permission_classes=[ IsAdminUser]
    queryset = Livre.objects.all()
    serializer_class =LivresSerializer
    
    
## filtrer les livres 
class ListeFilter():
    pass


## Gestion des Categories: lister, mettre a jour , supprimer, rechercher
class ListCategorieView(ListAPIView):
    """
    Liste toutes les catégories de livres.
    Accessible à tous.
    """
    permission_classes=[ AllowAny]
    queryset = Categorie.objects.all()
    serializer_class =CategorieSerializer
 
class CreateCategorieView(ListCreateAPIView):
    """
    Crée une nouvelle catégorie de livre.
    Réservé aux administrateurs.
    """
    permission_classes=[ IsAdminUser]
    queryset = Categorie.objects.all()
    serializer_class =CategorieSerializer
    
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('name',)
class RetrieveUpdateDeleteCategorieView(RetrieveUpdateDestroyAPIView):
    """
    Récupère, met à jour ou supprime une catégorie spécifique.
    Réservé aux administrateurs.
    """
    permission_classes=[ IsAdminUser]
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
# commenter un livre

class AddCOmment(CreateAPIView):
    """
    Ajoute un commentaire à un livre.
    Accessible à tous.
    """
    permission_classes=[ AllowAny]
    queryset =Commentaire.objects.all()
    serializer_class = CommentaireSerializer 
    
class DeleteComment(DestroyAPIView):
    """
    Supprime un commentaire existant.
    """
    queryset =Commentaire.objects.all()
    serializer_class = CommentaireSerializer 
    
    
def telecharger_livre(request, livre_id):
    """
    Télécharge le fichier associé à un livre.
    """
    try:
        livre = Livre.objects.get(id=livre_id)
        if livre.fichier:
            return FileResponse(livre.fichier.open(), as_attachment=True, filename=livre.fichier.name)
        else:
            raise Http404("Fichier non disponible.")
    except Livre.DoesNotExist:
        raise Http404("Livre introuvable.")
    

# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# flow = Flow.from_client_secrets_file(
#     os.path.join(BASE_DIR, 'client_secret.json'),
#     scopes=['https://www.googleapis.com/auth/books'],
#     redirect_uri='http://localhost:8000/oauth2callback/'
# )

# # Stockage temporaire du token (à remplacer par une DB en prod)
# credentials_storage = {}

# def google_auth(request):
#     auth_url, _ = flow.authorization_url(prompt='consent')
#     return redirect(auth_url)

# def google_callback(request):
#     flow.fetch_token(authorization_response=request.build_absolute_uri())
#     credentials_storage['credentials'] = flow.credentials
#     return redirect('get_books')

# def get_books(request):
#     credentials = credentials_storage.get('credentials')
#     if not credentials:
#         return JsonResponse({'error': 'Non authentifié'}, status=401)

#     service = build('books', 'v1', credentials=credentials)
#     result = service.volumes().list(q='math physics chemistry computer science').execute()

#     books = [
#         {
#             'title': item['volumeInfo'].get('title'),
#             'authors': item['volumeInfo'].get('authors'),
#             'link': item['volumeInfo'].get('previewLink'),
#         }
#         for item in result.get('items', [])
#     ]
#     return JsonResponse({'books': books})
