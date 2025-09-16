import React, { useState, useEffect } from "react";
import { quizAPI } from "../api/apiService";
import "./Quiz.css";

function Quiz({ onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await quizAPI.getQuestions();
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setError('Failed to load quiz questions. Please try again.');
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

 const submitQuiz = async () => {
  const quizAnswers = questions.map(q => ({
    questionId: q.id,
    answer: answers[q.id] || 1,
    category: q.category
  }));

  try {
    const result = await quizAPI.submitQuiz(quizAnswers); // ✅ just pass the array
 // ✅ wrap in object
    onComplete(result);
  } catch (error) {
    console.error('Failed to submit quiz:', error);
    setError('Failed to submit quiz. Please try again.');
  }
};

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading Quiz Questions...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>No Questions Available</h2>
          <p>Please contact administrator to add quiz questions.</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];

  return (
    <div className="quiz-container">
      {/* Progress */}
      <div className="quiz-progress-header">
        <div>
          <h2>Career Aptitude Quiz</h2>
          <p>Discovering your academic strengths</p>
        </div>
        <div className="quiz-progress-header-pro">
          <span>Progress</span>
          <div className="cur">
            {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question Card */}
      <div className="quiz-card">
        <div className="quiz-subject">{question.subject || question.category}</div>
        <h3>{question.question}</h3>

        <div className="options">
          {[
            { value: "1", label: "Strongly Disagree", emoji: "😟" },
            { value: "2", label: "Disagree", emoji: "🙁" },
            { value: "3", label: "Neutral", emoji: "😐" },
            { value: "4", label: "Agree", emoji: "🙂" },
            { value: "5", label: "Strongly Agree", emoji: "😊" }
          ].map(option => (
            <div
              key={option.value}
              className={`quiz-option ${currentAnswer?.toString() === option.value ? "selected" : ""}`}
              onClick={() => handleAnswerChange(question.id, parseInt(option.value))}
            >
              <span className="emoji">{option.emoji}</span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="quiz-nav">
          <button onClick={previousQuestion} disabled={currentQuestion === 0}>
            Previous
          </button>
          {currentQuestion === questions.length - 1 ? (
            <button onClick={submitQuiz} disabled={!currentAnswer}>
              Complete Assessment
            </button>
          ) : (
            <button onClick={nextQuestion} disabled={!currentAnswer}>
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;