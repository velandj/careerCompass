from django.urls import path
from . import views

urlpatterns = [
    path('colleges/', views.colleges_list, name='colleges-list'),
    path('colleges/government/', views.government_colleges, name='government-colleges'),  # ✅ new
    path('careers/', views.careers_list, name='careers-list'),
    path('quiz/home/', views.quiz_home, name='quiz-home'),
    path('quiz/questions/', views.quiz_questions, name='quiz-questions'),
    path('quiz/submit/', views.submit_quiz, name='submit-quiz'),
    path('quiz/results/', views.my_results, name='my-results'),
    path('dashboard/', views.user_dashboard, name='user-dashboard'),
]
