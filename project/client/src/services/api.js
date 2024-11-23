import axios from 'axios';
import { REACT_APP_API_BASE_URL } from 'config';

const api = axios.create({
  baseURL: REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
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
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const { status, data } = error.response;

      if (status === 401 && data.code === 'EXPIRED') {
        const user = localStorage.getItem('user');
        const refreshToken = user ? JSON.parse(user).refresh_token : null;

        if (refreshToken) {
          try {
            const response = await apiAuthenticator.post('/authenticate/refresh-token', { refresh_token: refreshToken });
            const { access_token, refresh_token } = response.data;

            const updatedUser = { ...JSON.parse(user), access_token, refresh_token };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return api(originalRequest);
          } catch (refreshError) {
            console.log('Refresh token failed:', refreshError);
            localStorage.removeItem('user');
            window.location.href = '/';
          }
        }
      }

      // if (status === 401 || status === 403) {
      // console.log('Unauthorized! Redirecting to login.');
      // localStorage.removeItem('user');
      // window.location.href = '/login';
      // }
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
