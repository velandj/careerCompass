from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import QuizQuestion, QuizResult, College, Career, UserProfile
from .serializers import QuizQuestionSerializer, QuizResultSerializer, CollegeSerializer, CareerSerializer
from accounts.auth_utils import get_user_from_token
from django.db.models import Q

@api_view(['GET'])
def quiz_home(request):
    data = {
        "title": "Career Guidance Quiz",
        "subtitle": "Discover your interests and aptitudes to make informed decisions about your academic future.",
        "total_questions": QuizQuestion.objects.count(),
        "estimated_time": "15-20 minutes",
        "guidelines": [
            "Answer honestly based on your interests",
            "No right or wrong answers",
            "Scale of 1-5 for each question",
            "Review answers before submitting",
        ],
        "features": [
            {"title": "Discover Your Strengths", "desc": "Identify your abilities across Engineering, Medical, Arts, Commerce, and Technology"},
            {"title": "Personalized Recommendations", "desc": "Get tailored course suggestions and career paths"},
            {"title": "Informed Decisions", "desc": "Make confident academic choices with data-driven insights"},
        ]
    }
    return Response(data)
@api_view(['GET'])
def quiz_questions(request):
    """Get all quiz questions or create default ones if none exist"""
    questions = QuizQuestion.objects.all()
    
    # If no questions exist, create default ones
    if not questions.exists():
        default_questions = [
            # Medical
            {"question": "I enjoy understanding how living organisms function and interact with their environment.", "category": "medical", "subject": "Biology"},
            {"question": "I am curious about the human body, diseases, and medical treatments.", "category": "medical", "subject": "Medical Science"},
            {"question": "I find it interesting to study anatomy, physiology, and how medications work.", "category": "medical", "subject": "Health Sciences"},
            {"question": "I am passionate about helping people recover from illnesses and maintaining good health.", "category": "medical", "subject": "Healthcare"},
            {"question": "I enjoy studying genetics, microbiology, and biochemical processes.", "category": "medical", "subject": "Life Sciences"},

            # Engineering
            {"question": "I am interested in understanding the laws of motion, energy, and matter.", "category": "engineering", "subject": "Physics"},
            {"question": "I enjoy solving mathematical problems and working with numbers and formulas.", "category": "engineering", "subject": "Mathematics"},
            {"question": "I find it fascinating to conduct experiments and observe chemical reactions.", "category": "engineering", "subject": "Chemistry"},
            {"question": "I am interested in building and designing mechanical systems or structures.", "category": "engineering", "subject": "Engineering Design"},
            {"question": "I enjoy understanding how machines work and solving technical problems.", "category": "engineering", "subject": "Applied Sciences"},

            # Technology
            {"question": "I enjoy working with computers and learning about new software applications.", "category": "technology", "subject": "Computer Science"},
            {"question": "I like creating websites, mobile apps, or digital solutions to problems.", "category": "technology", "subject": "Information Technology"},
            {"question": "I am fascinated by robotics, artificial intelligence, and automation.", "category": "technology", "subject": "Advanced Technology"},
            {"question": "I enjoy analyzing data and finding patterns in large datasets.", "category": "technology", "subject": "Data Science"},
            {"question": "I am interested in cybersecurity, networks, and protecting digital information.", "category": "technology", "subject": "Information Security"},

            # Arts
            {"question": "I enjoy reading literature, writing stories, or analyzing texts.", "category": "arts", "subject": "Literature/Language"},
            {"question": "I am interested in understanding different cultures, societies, and human behavior.", "category": "arts", "subject": "Social Studies"},
            {"question": "I enjoy learning about historical events and their impact on the present.", "category": "arts", "subject": "History"},
            {"question": "I am interested in geography, maps, and understanding different places.", "category": "arts", "subject": "Geography"},
            {"question": "I enjoy creative activities like drawing, painting, music, or performing arts.", "category": "arts", "subject": "Creative Arts"},

            # Commerce
            {"question": "I am interested in understanding how businesses operate and make decisions.", "category": "commerce", "subject": "Business Studies"},
            {"question": "I enjoy working with financial data, budgets, and accounting principles.", "category": "commerce", "subject": "Accounting"},
            {"question": "I am interested in economic trends, market behavior, and financial systems.", "category": "commerce", "subject": "Economics"},
            {"question": "I enjoy planning events, managing teams, and organizing projects.", "category": "commerce", "subject": "Management"},
            {"question": "I am interested in marketing, sales, and understanding consumer behavior.", "category": "commerce", "subject": "Marketing"},
        ]
        
        for q_data in default_questions:
            QuizQuestion.objects.create(**q_data)
        
        questions = QuizQuestion.objects.all()
    
    serializer = QuizQuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def submit_quiz(request):
    user = get_user_from_token(request)
    if not user:
        return Response({'detail': 'Authentication required'}, status=401)

    data = request.data
    answers = data.get("answers", [])
    
    if not answers:
        return Response({'detail': 'No answers provided'}, status=400)
    
    # Calculate scores
    totals = {"engineering": 0, "medical": 0, "arts": 0, "commerce": 0, "technology": 0}
    for answer in answers:
        category = answer.get("category", "").lower()
        value = int(answer.get("answer", 0))
        if category in totals:
            totals[category] += value

    # Find recommended stream
    recommended_stream = max(totals, key=totals.get)
    
    # Save result
    result = QuizResult.objects.create(
        user=user,
        scores=totals,
        answers=answers,
        recommended_stream=recommended_stream
    )
    
    # Update user profile
    profile, created = UserProfile.objects.get_or_create(user=user)
    profile.completed_quizzes += 1
    profile.preferred_stream = recommended_stream
    profile.save()
    
    serializer = QuizResultSerializer(result)
    return Response(serializer.data, status=201)

@api_view(['GET'])
def my_results(request):
    user = get_user_from_token(request)
    if not user:
        return Response({'detail': 'Authentication required'}, status=401)
        
    results = QuizResult.objects.filter(user=user).order_by('-created_at')
    serializer = QuizResultSerializer(results, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def colleges_list(request):
    """Get colleges with optional filtering"""
    colleges = College.objects.all()
    
    # Filter by type if provided
    college_type = request.GET.get('type')
    if college_type:
        colleges = colleges.filter(college_type__icontains=college_type)
    
    # Search by name or location
    search = request.GET.get('search')
    if search:
        colleges = colleges.filter(
            Q(name__icontains=search) | Q(location__icontains=search)
        )
    
    serializer = CollegeSerializer(colleges, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def government_colleges(request):
    """Get all government colleges"""
    colleges = College.objects.filter(college_type__iexact="Government")
    serializer = CollegeSerializer(colleges, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def careers_list(request):
    """Get career information"""
    careers = Career.objects.all()
    
    # Filter by stream/category if provided
    category = request.GET.get('category')
    if category:
        careers = careers.filter(title__icontains=category)
    
    serializer = CareerSerializer(careers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_dashboard(request):
    """Get user dashboard data"""
    user = get_user_from_token(request)
    if not user:
        return Response({'detail': 'Authentication required'}, status=401)
    
    profile, created = UserProfile.objects.get_or_create(user=user)
    recent_results = QuizResult.objects.filter(user=user).order_by('-created_at')[:3]
    
    data = {
        'username': user.username,
        'profile': {
            'preferred_stream': profile.preferred_stream,
            'completed_quizzes': profile.completed_quizzes,
            'interests': profile.interests,
        },
        'recent_results': QuizResultSerializer(recent_results, many=True).data,
        'recommendations': {
            'colleges_count': College.objects.count(),
            'careers_count': Career.objects.count(),
        }
    }
    
    return Response(data)
