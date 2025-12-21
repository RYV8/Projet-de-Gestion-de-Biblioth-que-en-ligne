from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from datetime import timedelta

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not username:
            raise ValueError("Le nom d'utilisateur doit être défini")
        if not email:
            raise ValueError("L'adresse email doit être renseignée")
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Le superuser doit avoir is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Le superuser doit avoir is_superuser=True.')

        return self.create_user(email, username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, )
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username',]  

    objects = UserManager()

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.username})"

    @property
    def full_name(self):
        return f"{self.username} {self.first_name}"
     

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='userauth_users',  # C'est l'ajout le plus important
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='userauth_user_permissions',  # Et celui-ci
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )


class Bibliothecaire(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='bibliothecaire')
    numero_employer = models.CharField(max_length=20, unique=True)
    date_embauche = models.DateField(auto_created=True, auto_now=True)
    departement = models.CharField(max_length=100, blank=True)
    salaire = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    class Meta:
        verbose_name = 'Bibliothécaire'
        verbose_name_plural = 'Bibliothécaires'

    def __str__(self):
        return f"Bibliothécaire: {self.user.full_name}"

    @property
    def duree_travail(self):
        return timezone.now().date() - self.date_embauche


class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin')
    niveau_acces = models.CharField(max_length=50, default='complet')
    date_nomination = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Administrateur'
        verbose_name_plural = 'Administrateurs'

    def __str__(self):
        return f"Admin: {self.user.full_name}"