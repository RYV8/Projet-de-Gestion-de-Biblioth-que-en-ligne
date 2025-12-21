from django.test import TestCase, Client
from django.urls import reverse
from .models import Livre, Panier

class PanierViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.livre = Livre.objects.create(id=1, titre="Test Livre", quantite=10)
        # Créez un utilisateur si nécessaire

    def test_ajouter_livre_au_panier(self):
        url = reverse('ajouter_au_panier')  # Remplacez par le nom réel de votre URL
        data = {
            'livre_id': 1,
            'quantite': 5
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        panier = Panier.objects.get(livre_id=1)
        self.assertEqual(panier.quantite, 5)