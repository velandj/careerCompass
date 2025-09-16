# backend_proj/accounts/auth_utils.py
import jwt
from django.conf import settings
from accounts.models import user_cred

def get_token_from_request(request):
    auth = request.META.get('HTTP_AUTHORIZATION') or request.headers.get('Authorization')
    if not auth:
        return None
    if auth.startswith('Bearer '):
        return auth.split(' ', 1)[1].strip()
    return auth.strip()

def get_user_from_token(request):
    token = get_token_from_request(request)
    if not token:
        return None
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=['HS256'])  # ✅ fixed
    except Exception:
        return None
    user_id = payload.get('user_id')
    if not user_id:
        return None
    try:
        return user_cred.objects.get(id=user_id)  # ✅ custom user model
    except user_cred.DoesNotExist:
        return None
