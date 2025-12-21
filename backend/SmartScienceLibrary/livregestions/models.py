from django.db import models
from livres.models import Livre
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from userauth.models import Bibliothecaire, Admin
User =get_user_model()

 
class Panier(models.Model):
    user =   models.ForeignKey("userauth.User",related_name='user_buyer', on_delete=models.CASCADE)
    date_create = models.DateField( auto_now_add=True)
    
class PanierItems(models.Model):
    panier = models.ForeignKey("livregestions.Panier", related_name='panier', on_delete=models.CASCADE)
    livre = models.ForeignKey("livres.Livre", related_name='livreitem', on_delete=models.CASCADE)
    quantite = models.PositiveIntegerField(default=1)
    date_add= models.DateTimeField( auto_now_add=True)
    
    @property
    def is_diponible(self, *args, **kwargs):
        return self.quantiter< self.livre.stock_disponible
   
    def total_price(self, *args, **kwargs):
        return (self.livre.prix_achat)*self.quantite
    def add_quantite(self, nbr):
        self.quantite+=nbr
        self.save()
        return self.quantite
    def subs_quantite(self, nbr):
        self.quantite=self.quantite - nbr
        self.save()
        return self.quantite
    def __str__(self):
        return f"{self.livre.titre} (Quantité: {self.quantite}) dans le panier de {self.panier.user.username}"
    class Meta:
        verbose_name = 'PanierItem'
        verbose_name_plural = 'PanierItems'
STATUS = [  ("en_cours","EN_COURS"),
     ("Effectué","ÉFFECTUÉ"),
     ("Echoué","ÉCHOUÉ")]
    
          
class Commande(models.Model):
        user =   models.ForeignKey("userauth.User",related_name='user_commande', on_delete=models.CASCADE)
        date_commande = models.DateTimeField(auto_now_add=True)
        statuts = models.CharField(choices=STATUS,default="EN_COURS", max_length=50)
         
        adresse_livraison = models.TextField()
class CommandeItems(models.Model):
        commande = models.ForeignKey("livregestions.Commande", related_name='commande', on_delete=models.CASCADE)
        commandeitems = models.ForeignKey("livregestions.Panier",related_name='livre_comander', on_delete=models.CASCADE)
        

class Emprunt(models.Model):
    STATUT_CHOICES = [
        ('actif', 'Actif'),
        ('retourne', 'Retourné'),
        ('en_retard', 'En retard'),
        ('perdu', 'Perdu'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    livre = models.ForeignKey('livres.Livre', on_delete=models.CASCADE, related_name='emprunts')
    
    date_emprunt = models.DateTimeField(auto_now_add=True)
    date_echeance = models.DateTimeField()
    date_retour_effectif = models.DateTimeField(null=True, blank=True)
    
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES)
    bibliothecaire_emprunt = models.ForeignKey(
        Bibliothecaire, 
        on_delete=models.SET_NULL, 
        null=True,
        related_name='emprunts_geres'
    )
    
    notes = models.TextField(blank=True, verbose_name='Notes')
    
    class Meta:
        verbose_name = 'Emprunt'
        verbose_name_plural = 'Emprunts'
        ordering = ['-date_emprunt']

    def __str__(self):
        return f"{self.livre.titre} emprunté par {self.user.full_name}"

    @property
    def duree_emprunt(self):
        if self.date_retour_effectif:
            return self.date_retour_effectif - self.date_emprunt
        return timezone.now() - self.date_emprunt

    @property
    def jours_retard(self):
        if self.statut == 'retourne':
            return 0
        
        maintenant = timezone.now()
        if maintenant > self.date_echeance:
            return (maintenant - self.date_echeance).days
        return 0

    @property
    def est_en_retard(self):
        return self.jours_retard > 0

    def marquer_retourne(self):
        self.statut = 'retourne'
        self.date_retour_effectif = timezone.now()
        self.livre.augmenter_stock()
        self.save()

    def save(self, *args, **kwargs):
        # Définir automatiquement la date d'échéance (14 jours par défaut)
        if not self.date_echeance:
            self.date_echeance = self.date_emprunt + timedelta(days=14)
        
        # Mettre à jour le statut si en retard
        if self.statut == 'actif' and self.est_en_retard:
            self.statut = 'en_retard'
            
        super().save(*args, **kwargs)

class Achat(models.Model):
    STATUT_CHOICES = [
        ('en_attente', 'En attente'),
        ('confirme', 'Confirmé'),
        ('paye', 'Payé'),
        ('livre', 'Livré'),
        ('annule', 'Annulé'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achats')
    commande= models.ForeignKey("livregestions.Commande", related_name='commandes', on_delete=models.CASCADE)  
    date_livraison = models.DateTimeField(null=True, blank=True)
    
    
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='en_attente')
   
    methode_paiement = models.CharField(max_length=50, blank=True)
    
    class Meta:
        verbose_name = 'Achat'
        verbose_name_plural = 'Achats'
       

    def __str__(self):
        return f"{self. statut} "

    @property
    def confirmer_achat(self):
        self.statut = 'confirme'
        commandeitems = CommandeItems.objects.get(commande = self.commande)
        
        livre = Livre.objects.get(id = commandeitems.livre_comander.livre)
        livre.nombre_achats += self.quantite
        livre.save()
        self.save()  
       