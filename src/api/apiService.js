// src/api/apiService.js
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    // if backend returns { message: ... } or { detail: ... }
    throw new Error(data.message || data.detail || 'API request failed');
  }
  return data;
};

// Auth API (match backend: /api/accounts/)
export const authAPI = {
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },

  register: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/accounts/createu/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },

  verifyToken: async () => {
    const response = await fetch(`${API_BASE_URL}/accounts/verify-token/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(response);
  },
};

// Quiz API (match backend under core)
export const quizAPI = {
  getQuizHome: async () => {
    const response = await fetch(`${API_BASE_URL}/core/quiz/home/`);
    return handleResponse(response);
  },
  getQuestions: async () => {
    const response = await fetch(`${API_BASE_URL}/core/quiz/questions/`);
    return handleResponse(response);
  },
  submitQuiz: async (answers) => {
  const response = await fetch(`${API_BASE_URL}/core/quiz/submit/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ answers }),  // backend gets { "answers": [ ... ] }
  });
  return handleResponse(response);
},

  getMyResults: async () => {
    const response = await fetch(`${API_BASE_URL}/core/quiz/results/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(response);
  },
};

// Colleges & Careers
export const collegesAPI = {
  getColleges: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/core/colleges/?${params}`);
    return handleResponse(response);
  },
};

export const careersAPI = {
  getCareers: async (category = '') => {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    const response = await fetch(`${API_BASE_URL}/core/careers/${params}`);
    return handleResponse(response);
  },
};

export const dashboardAPI = {
  getUserDashboard: async () => {
    const response = await fetch(`${API_BASE_URL}/core/dashboard/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(response);
  },
};
