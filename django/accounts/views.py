from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import user_cred
from django.db import IntegrityError
import jwt
from django.conf import settings
from datetime import datetime, timedelta


def generate_jwt_token(user):
    """Generate JWT token for user"""
    payload = {
        'username': user.username,
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=7),  # Token expires in 7 days
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')


@api_view(['POST'])
def login(request, format=None):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'message': 'Username and password required'}, status=400)

    try:
        user_get = user_cred.objects.get(username=username)
    except user_cred.DoesNotExist:
        return Response({'message': 'User does not exist'}, status=404)

    if check_password(password, user_get.password):
        token = generate_jwt_token(user_get)
        return Response({
            'message': 'Successfully logged in',
            'token': token,
            'username': user_get.username,
            'user_id': user_get.id
        }, status=200)
    else:
        return Response({'message': 'Wrong password'}, status=401)


@api_view(['POST'])
def create_user(request, format=None):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'message': 'Username and password required'}, status=400)

    if len(password) < 6:
        return Response({'message': 'Password must be at least 6 characters long'}, status=400)

    try:
        enc_pass = make_password(password)
        obj = user_cred(username=username, password=enc_pass)
        obj.save()

        # Generate token for new user
        token = generate_jwt_token(obj)

        return Response({
            'message': 'User created successfully',
            'token': token,
            'username': obj.username,
            'user_id': obj.id
        }, status=201)
    except IntegrityError:
        return Response({'message': 'Username already exists'}, status=400)


@api_view(['GET'])
def verify_token(request):
    """Verify if token is valid"""
    from accounts.auth_utils import get_user_from_token
    user = get_user_from_token(request)

    if user:
        return Response({
            'valid': True,
            'username': user.username,
            'user_id': user.id
        }, status=200)
    else:
        return Response({'valid': False}, status=401)
