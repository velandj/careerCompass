import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { GraduationCap, Target, TrendingUp, Users } from "lucide-react";
import "./QuizHome.css";

export default function QuizHome({ onStartQuiz }) {
  return (
    <div className="quiz-container">
      {/* Hero Section */}
      <div className="quiz-hero">
        <div className="quiz-hero-icon-wrapper">
          <div className="quiz-hero-pulse"></div>
          <div className="quiz-hero-icon">
            <GraduationCap className="quiz-hero-svg" />
          </div>
        </div>
        
        <div className="quiz-hero-text">
          <h1 className="quiz-title">Career Guidance Quiz</h1>
          <p className="quiz-subtitle">
            Discover your interests and aptitudes to make informed decisions about your academic future. 
            Our comprehensive assessment will help you choose the right stream after Class 10 or 12.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="quiz-features">
        <Card className="quiz-card blue-card">
          <CardHeader className="quiz-card-header">
            <div className="quiz-card-icon blue-bg">
              <Target className="quiz-card-svg blue-text" />
            </div>
            <CardTitle className="quiz-card-title blue-text-dark">Discover Your Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="quiz-card-desc blue-text">
              Identify your natural abilities and interests across Engineering, Medical, Arts, Commerce, and Technology domains.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="quiz-card green-card">
          <CardHeader className="quiz-card-header">
            <div className="quiz-card-icon green-bg">
              <TrendingUp className="quiz-card-svg green-text" />
            </div>
            <CardTitle className="quiz-card-title green-text-dark">Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="quiz-card-desc green-text">
              Get tailored course suggestions and career paths based on your quiz results and aptitude scores.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="quiz-card purple-card">
          <CardHeader className="quiz-card-header">
            <div className="quiz-card-icon purple-bg">
              <Users className="quiz-card-svg purple-text" />
            </div>
            <CardTitle className="quiz-card-title purple-text-dark">Informed Decisions</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="quiz-card-desc purple-text">
              Make confident choices about your academic future with data-driven insights and detailed guidance.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="quiz-cta">
        <CardHeader className="quiz-cta-header">
          <CardTitle className="quiz-cta-title">Ready to Begin Your Journey?</CardTitle>
          <CardDescription className="quiz-cta-subtitle">
            The quiz contains 25 questions covering different subject areas. 
            It will take approximately 12-18 minutes to complete.
          </CardDescription>
        </CardHeader>
        <CardContent className="quiz-cta-content">
          <div className="quiz-guidelines">
            <div className="quiz-guidelines-col">
              <div className="quiz-guideline">
                <span className="dot"></span>
                <span>Answer honestly based on your interests</span>
              </div>
              <div className="quiz-guideline">
                <span className="dot"></span>
                <span>No right or wrong answers</span>
              </div>
            </div>
            <div className="quiz-guidelines-col">
              <div className="quiz-guideline">
                <span className="dot"></span>
                <span>Scale of 1-5 for each question</span>
              </div>
              <div className="quiz-guideline">
                <span className="dot"></span>
                <span>Review answers before submitting</span>
              </div>
            </div>
          </div>
          
          <Button onClick={onStartQuiz} className="quiz-start-btn" size="lg">
            <GraduationCap className="quiz-start-icon" />
            Start Your Career Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
