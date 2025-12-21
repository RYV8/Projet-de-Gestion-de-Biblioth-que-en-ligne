from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from userauth.serializers import UserSerializer
from django.contrib.auth import get_user_model

from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

User = get_user_model()

class UserInfoView(ListAPIView):
    """
    Récupère les informations de l'utilisateur connecté.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

class GoogleLogin(SocialLoginView):
    """
    Authentification via Google OAuth2.
    """
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173/"  
    client_class = OAuth2Client

class FacebookLogin(SocialLoginView):
    """
    Authentification via Facebook OAuth2.
    """
    callback_url = "http://localhost:5173/"  
    adapter_class = FacebookOAuth2Adapter