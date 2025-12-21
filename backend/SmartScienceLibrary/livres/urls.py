from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


from livres.views import *
app_name ="livres"

urlpatterns = [
    path('list/',ListLivreView.as_view(), name='livreList'),
    path("create/", CreateLivresView.as_view(), name="createLivre"),
    path("retrieve_destroy_livre/<int:pk>/", RetrieveUpdateDeleteLivreView.as_view(), name="retrieve_destroyLivres"),
    path("retrieve_destroy_categorie/<int:pk>", RetrieveUpdateDeleteCategorieView.as_view(), name="retrieve_destroycategorie"),
    path("create_categorie/",CreateCategorieView.as_view(), name="createcategorie"),
    path("list_categorie/",ListCategorieView.as_view(), name="listcategorie"),
    path("add_comment/", AddCOmment.as_view(), name="addcomment"),
    path("delete_comment/<int:pk>/", DeleteComment.as_view(), name="deletecomment"),
    path('livres/<int:livre_id>/telecharger/', telecharger_livre, name='telecharger_livre'),
    # path('authorize/', google_auth, name='google_auth'),
    # path('oauth2callback/', google_callback, name='google_callback'),
    # path('books/', get_books, name='get_books'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)