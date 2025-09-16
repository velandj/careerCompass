# accounts/authentication.py
import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from accounts.models import user_cred  # ✅ use your custom model

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return None  # No auth, DRF will try the next class

        token = auth_header.split(" ")[1]

        try:
            payload = jwt.decode(
                token,
                settings.JWT_SECRET_KEY,   # ✅ consistent key
                algorithms=["HS256"]
            )
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")

        user_id = payload.get("user_id")
        if not user_id:
            raise AuthenticationFailed("Invalid token payload")

        try:
            user = user_cred.objects.get(id=user_id)  # ✅ use custom user table
        except user_cred.DoesNotExist:
            raise AuthenticationFailed("User not found")

        return (user, None)
