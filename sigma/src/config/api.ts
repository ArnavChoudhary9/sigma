// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// API Endpoints
export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    SIGNUP: '/api/auth/signup',
    REFRESH: '/api/auth/refresh',
    CURRENT_USER: '/api/auth/whoami',
  },
  
  // Search
  SEARCH: '/api/search'
};

