import django_filters
from .models import Livre

class LivreFilter(django_filters.FilterSet):
    titre = django_filters.CharFilter(field_name="titre", lookup_expr="icontains")
    categorie = django_filters.CharFilter(field_name="categorie", lookup_expr="icontains")
    auteur = django_filters.CharFilter(field_name="auteur", lookup_expr="icontains")

    class Meta:
        model = Livre
        fields = ["titre", "categorie", "auteur"]
