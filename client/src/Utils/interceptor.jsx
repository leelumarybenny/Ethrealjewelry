import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('eathRealToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {

      localStorage.removeItem('eathRealToken'); 
      localStorage.removeItem('username'); 
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default api;
