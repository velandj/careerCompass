from django.db import models
from accounts.models import user_cred

class Career(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    demand = models.IntegerField(default=0)
    skills_required = models.JSONField(default=list, blank=True)
    salary_range = models.CharField(max_length=100, blank=True)
    growth_prospects = models.TextField(blank=True)

    def __str__(self):
        return self.title

class College(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    website = models.URLField(blank=True)
    college_type = models.CharField(max_length=50, default='Government')
    fees = models.CharField(max_length=100, blank=True)
    facilities = models.JSONField(default=list, blank=True)
    cutoff_marks = models.CharField(max_length=100, blank=True)
    # type =models.CharField(max_length=50,default='Engineeering')
    
    def __str__(self):
        return self.name

class QuizQuestion(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=50)  # medical, engineering, etc.
    subject = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return self.question

class QuizResult(models.Model):
    user = models.ForeignKey(user_cred, on_delete=models.CASCADE)
    scores = models.JSONField()
    answers = models.JSONField()
    recommended_stream = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Result for {self.user.username} - {self.recommended_stream}"

class UserProfile(models.Model):
    user = models.OneToOneField(user_cred, on_delete=models.CASCADE)
    preferred_stream = models.CharField(max_length=100, blank=True)
    interests = models.JSONField(default=list, blank=True)
    completed_quizzes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Profile for {self.user.username}"