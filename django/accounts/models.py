# backend_proj/accounts/models.py
from django.db import models

class user_cred(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=255)  # store hashed via make_password
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
