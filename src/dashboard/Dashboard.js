import React, { useState, useEffect } from "react";
import { dashboardAPI } from "../api/apiService";
import "./Dashboard.css";
import CourseToCareer from "../coursetocareer/CourseToCareer";
import CollegeDirectory from "../collegedirectory/CollegeDirectory";
import TimelineTracker from "../timeline/TimelineTracker";
import Alerts from "../timeline/Alerts";
import QuizHome from "../quiz/QuizHome";
import Quiz from "../quiz/Quiz";
import { QuizResults } from "../quiz/QuizResults";

function Dashboard({ username, onLogout }) {
  const [activeView, setActiveView] = useState("main");
  const [dashboardData, setDashboardData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Quiz states
  const [quizState, setQuizState] = useState("home");
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await dashboardAPI.getUserDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // Quiz functions
  const startQuiz = () => {
    setQuizState("quiz");
  };

  const completeQuiz = (result) => {
    setQuizResult(result);
    setQuizState("results");
  };

  const resetQuiz = () => {
    setQuizState("home");
    setQuizResult(null);
  };

  // Navigation header
  const NavigationBar = () => {
    return (
      <div className="nav-bar">
        <div className="nav-left">🎓 Career Dashboard</div>

        {/* Hamburger menu button (mobile) */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Menu items */}
        <div className={`nav-right ${menuOpen ? "show" : ""}`}>
          <button onClick={() => { setActiveView("main"); setMenuOpen(false); }}>
            Home
          </button>
          <button onClick={() => { setActiveView("quiz"); setMenuOpen(false); }}>
            Aptitude Quiz
          </button>
          <button onClick={() => { setActiveView("career-mapping"); setMenuOpen(false); }}>
            Course to Career
          </button>
          <button onClick={() => { setActiveView("college-directory"); setMenuOpen(false); }}>
            College Directory
          </button>
          <button onClick={() => { setActiveView("alerts"); setMenuOpen(false); }}>
            Alerts
          </button>
          <button onClick={() => { onLogout(); setMenuOpen(false); }} style={{ color: '#ff6b6b' }}>
🚪 → Logout
          </button>
        </div>
      </div>
    );
  };

  // Routing logic
  let content;
  if (activeView === "career-mapping") {
    content = <CourseToCareer />;
  } else if (activeView === "college-directory") {
    content = <CollegeDirectory />;
  } else if (activeView === "timeline") {
    content = <TimelineTracker />;
  } else if (activeView === "alerts") {
    content = <Alerts />;
  } else if (activeView === "quiz") {
    content = (
      <div className="dashboard-quiz">
        {quizState === "home" && <QuizHome onStartQuiz={startQuiz} />}
        {quizState === "quiz" && <Quiz onComplete={completeQuiz} />}
        {quizState === "results" && quizResult && (
          <QuizResults
            scores={quizResult.scores}
            result={quizResult}
            onRetakeQuiz={resetQuiz}
          />
        )}
      </div>
    );
  } else {
    content = (
      <div className="dashboard-landing">
        <header className="hero-section">
          <h1>Welcome back, {username}! 🎉</h1>
          <p>
            Your one-stop guide after 12th – explore careers, colleges, exams,
            and scholarships!
          </p>
        </header>

        {dashboardData && (
          <section className="user-stats">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Quiz Completed</h3>
                <p className="stat-number">{dashboardData.profile.completed_quizzes}</p>
              </div>
              <div className="stat-card">
                <h3>Recommended Stream</h3>
                <p className="stat-stream">{dashboardData.profile.preferred_stream || 'Take quiz to discover'}</p>
              </div>
              <div className="stat-card">
                <h3>Available Colleges</h3>
                <p className="stat-number">{dashboardData.recommendations.colleges_count}</p>
              </div>
            </div>
          </section>
        )}

        <section className="features">
          <h2>🚀 Features for You</h2>
          <div className="features-grid">
            <div className="feature-card">
              🎯 Personalized Career Guidance
              <p>Get suggestions based on your interests & aptitude.</p>
            </div>
            <div className="feature-card">
              🏫 College Finder
              <p>
                Explore top colleges with cut-offs, fees, and admission process.
              </p>
            </div>
            <div className="feature-card">
              📝 Aptitude Quiz
              <p>Discover the best-fit streams and careers for you.</p>
            </div>
            <div className="feature-card">
              📈 Career Roadmap
              <p>Plan your journey step by step towards success.</p>
            </div>
          </div>
        </section>
                     <section className="importance-govt-college">
          <h2>🏛️ Why Government Colleges Matter</h2>
          <div className="importance-grid">
            <div className="importance-card">
              💰 <strong>Affordable Education</strong>
              <p>Government colleges provide quality education at much lower fees compared to private institutions.</p>
            </div>
            <div className="importance-card">
              🎓 <strong>Experienced Faculty</strong>
              <p>They have highly qualified professors with years of teaching and research experience.</p>
            </div>
            <div className="importance-card">
              🌍 <strong>Recognition & Opportunities</strong>
              <p>Government colleges are widely recognized, opening doors to scholarships, internships, and global opportunities.</p>
            </div>
            <div className="importance-card">
              🤝 <strong>Diverse Peer Network</strong>
              <p>Students from different regions and backgrounds bring cultural diversity and collaboration opportunities.</p>
            </div>
          </div>
        </section>

        <section className="call-to-action">
          <h2>✨ Ready to Begin?</h2>
          <p>
            {dashboardData?.profile.completed_quizzes > 0 
              ? 'Retake the quiz or explore more features!'
              : 'Start with the Aptitude Quiz to know where you fit best!'
            }
          </p>
          <button className="cta-btn" onClick={() => setActiveView("quiz")}>
            {dashboardData?.profile.completed_quizzes > 0 ? 'View Quiz Results' : 'Start Quiz'} 🚀
          </button>
        </section>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      {content}
    </div>
  );
}

export default Dashboard;
