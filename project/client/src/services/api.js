import axios from 'axios';
import { REACT_APP_API_BASE_URL } from 'config';

const api = axios.create({
  baseURL: REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).access_token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        console.log('Unauthorized! Redirecting to login.');
      }
    }
    return Promise.reject(error);
  }
);

const apiAuthenticator = axios.create({
  baseURL: REACT_APP_API_BASE_URL || 'http://localhost:8080/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api, apiAuthenticator };
