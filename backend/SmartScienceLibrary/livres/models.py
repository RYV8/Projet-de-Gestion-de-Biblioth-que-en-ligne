from django.db import models
from django.contrib.auth import get_user_model
from userauth.models import User, Bibliothecaire, Admin
User = get_user_model()

class Categorie(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Nom')
    description = models.TextField(blank=True, verbose_name='Description')
    date_creation = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Catégorie'
        verbose_name_plural = 'Catégories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Livre(models.Model):
    titre = models.CharField(max_length=200, verbose_name='Titre')
    isbn = models.CharField(max_length=13, unique=True, verbose_name='ISBN')
    auteur = models.CharField(max_length=200, verbose_name='Auteur')
    editeur = models.CharField(max_length=200, verbose_name='Éditeur')
    date_publication = models.DateField(verbose_name='Date de publication')
    
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE, related_name='categorie')
    fichier = models.FileField(upload_to='livres/', blank=True, null=True)

    # Stock et gestion
    stock_total = models.PositiveIntegerField(default=1, verbose_name='Stock total')
    stock_disponible = models.PositiveIntegerField(default=1, verbose_name='Stock disponible')
    prix_achat = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Prix d\'achat')
    
    # Statistiques
    nombre_emprunts = models.PositiveIntegerField(default=0, verbose_name='Nombre d\'emprunts')
    nombre_achats = models.PositiveIntegerField(default=0, verbose_name='Nombre d\'achats')
    
    # Informations supplémentaires
    description = models.TextField(blank=True, verbose_name='Description')
    nombre_pages = models.PositiveIntegerField(null=True, blank=True, verbose_name='Nombre de pages')
    langue = models.CharField(max_length=50, default='Français', verbose_name='Langue')
    
    # Métadonnées
    date_ajout = models.DateTimeField(auto_now_add=True, verbose_name='Date d\'ajout')
    date_modification = models.DateTimeField(auto_now=True, verbose_name='Dernière modification')
    
    class Meta:
        verbose_name = 'Livre'
        verbose_name_plural = 'Livres'
        ordering = ['titre']

    def __str__(self):
        return f"{self.titre} - {self.auteur}"

    @property
    def est_disponible(self):
        return self.stock_disponible > 0

    def diminuer_stock(self):
        if self.stock_disponible > 0:
            self.stock_disponible -= 1
            self.save()

    def augmenter_stock(self):
        if self.stock_disponible < self.stock_total:
            self.stock_disponible += 1
            self.save()
            

class Commentaire(models.Model):
    livre = models.ManyToManyField('livres.Livre', related_name='livrecommenter')
    user = models.ManyToManyField('userauth.User', related_name='usercommenter')
    date_comment = models.DateField( auto_now_add=True)
    note = models.DecimalField(max_digits=2,decimal_places=0,max_length=2,blank=True )
    commentaire = models.TextField(max_length=1000)
    def __str__(self):
        return f"{self.user.username}=> {self.livre.name}"
    class Meta: 
        verbose_name = 'Commentaire'
        verbose_name_plural = 'Commentaires'