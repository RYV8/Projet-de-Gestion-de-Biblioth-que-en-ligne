from django.urls import path
from django.conf import settings
from django.conf.urls.static import static



from userauth.views import *
app_name ="userauth"

from .views import UserInfoView, GoogleLogin, FacebookLogin

urlpatterns = [
    path('user/', UserInfoView.as_view(), name='user-info'),
    path('google/', GoogleLogin.as_view(), name='google-login'),
    path('facebook/', FacebookLogin.as_view(), name='facebook-login'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)