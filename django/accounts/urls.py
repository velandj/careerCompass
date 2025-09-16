from django.urls import path
import accounts.views as v

urlpatterns = [
    path('login/', v.login, name='login'),
    path('createu/', v.create_user, name='createu'),
    path('verify-token/', v.verify_token, name='verify_token'),
]