from django.contrib import admin
from .models import Career, College, QuizQuestion, QuizResult, UserProfile

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ("title", "demand", "salary_range")
    search_fields = ("title",)
    list_filter = ("demand",)

@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "college_type")
    search_fields = ("name", "location")
    list_filter = ("college_type",)

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ("question", "category", "subject")
    search_fields = ("question",)
    list_filter = ("category", "subject")

@admin.register(QuizResult)
class QuizResultAdmin(admin.ModelAdmin):
    list_display = ("user", "recommended_stream", "created_at")
    search_fields = ("user__username",)
    list_filter = ("recommended_stream", "created_at")

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "preferred_stream", "completed_quizzes", "created_at")
    search_fields = ("user__username",)
    list_filter = ("preferred_stream", "created_at")