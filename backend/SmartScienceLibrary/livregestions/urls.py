from django.urls import path 
from livregestions.views import  GetPanierViews, AddPanierViews,retirerLivre,EmpruntCreateView, EmpruntListView,listEmpruntBiblitohécaire,nombreEmprunt,PasserCommandeView,listCommande,DOAchat,add_qt_livre
from django.conf import settings
from django.conf.urls.static import static


app_name ='livregestions'
urlpatterns = [
    path("add_panier/<int:livre_id>/", AddPanierViews.as_view(), name="add_panier"),
    path("views_all_panier/",GetPanierViews.as_view(), name="add_panier"),
    path("retirerLivre/<int:livre_id>/", retirerLivre, name="retirerLivre_panier"),
    path("add_qt_livre/<int:livre_id>/<int:nbr>/", add_qt_livre, name="add_qt_livre"),
    path("make_emprunt_user/<int:livre_id>/", EmpruntCreateView.as_view(), name="make_view_emprunt"),
    path("list_emprunt_user/", EmpruntListView.as_view(), name="list_emprunt"),

    path("list_emprunt_biblio/", listEmpruntBiblitohécaire, name="list_emprunt_biblio"),
    path("pass_view_commnade/", PasserCommandeView.as_view(), name="pass_view_commnade"),
    path("list_commande_biblio/", listCommande.as_view(), name="list_commande_biblio"),
    path("nombre_emprunt/", nombreEmprunt, name="nombre_emprunt"),
    
    path("make_achat/", DOAchat.as_view(), name="")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
