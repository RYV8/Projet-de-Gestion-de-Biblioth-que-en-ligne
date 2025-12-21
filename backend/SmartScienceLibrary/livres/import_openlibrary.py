from livres.models import Livre, Categorie
import requests

from django.core.management.base import BaseCommand

from datetime import datetime

# # Script pour remplir la base de donné avec des livre de openlibrary
# def import_openlibrary(self, sujet,nombre= 10 ):
#     API_Key = "AIzaSyA7uZm4QCzWHGKD2OnX8q49U1w7OH5962Q"
#     url= f"https://www.googleapis.com/books/v1/volumes?q=intitle:${sujet}+subject:science&key=API_Key "
#     response = requests.get(url)
   
#     if response.status_code!=200:
#         print("Erreur lors de la requête")
#         return
#     data =response.json()
# import requests
# from livres.models import Livre

# Remplace par ta propre clé API
GOOGLE_BOOKS_API_KEY = 'AIzaSyA7uZm4QCzWHGKD2OnX8q49U1w7OH5962Q'

class Command(BaseCommand):
    help = "Importe des livres depuis Google Books API"

    def handle(self, *args, **options):
        sujets = ['mathématiques', 'physique', 'informatique', 'chimie']
        for sujet in sujets:
            self.stdout.write(f"Importation pour le sujet : {sujet}")
            self.import_books(sujet)

    def import_books(self, sujet):
        url = f"https://www.googleapis.com/books/v1/volumes?q={sujet}&maxResults=10"
        response = requests.get(url)

        if response.status_code != 200:
            self.stderr.write(f"Échec de la requête pour {sujet}")
            return

        data = response.json()
        items = data.get("items", [])
        
        for item in items:
            volume = item.get("volumeInfo", {})
            titre = volume.get("title", "Titre inconnu")
            auteurs = ", ".join(volume.get("authors", ["Auteur inconnu"]))
            editeur = volume.get("publisher", "Éditeur inconnu")
            date_pub = volume.get("publishedDate", "2000-01-01")
            isbn_list = volume.get("industryIdentifiers", [])
            isbn = isbn_list[0]['identifier'] if isbn_list else "0000000000000"
            description = volume.get("description", "")
            pages = volume.get("pageCount", 100)
            langue = volume.get("language", "fr")

            # Création de la catégorie si elle n’existe pas
            categorie, _ = Categorie.objects.get_or_create(nom=sujet.capitalize())

            # Vérifie si le livre existe déjà
            if Livre.objects.filter(isbn=isbn).exists():
                continue

            # Création du livre
            Livre.objects.create(
                titre=titre[:200],
                isbn=isbn[:13],
                auteur=auteurs[:200],
                editeur=editeur[:200],
                date_publication=self.format_date(date_pub),
                categorie=categorie,
                stock_total=5,
                stock_disponible=5,
                prix_achat=0.0,
                description=description,
                nombre_pages=pages,
                langue=langue
            )
            self.stdout.write(f"Ajouté : {titre}")

    def format_date(self, date_str):
        try:
            if len(date_str) == 4:
                return datetime.strptime(date_str, "%Y").date()
            elif len(date_str) == 7:
                return datetime.strptime(date_str, "%Y-%m").date()
            else:
                return datetime.strptime(date_str, "%Y-%m-%d").date()
        except:
            return datetime.strptime("2000-01-01", "%Y-%m-%d").date()
