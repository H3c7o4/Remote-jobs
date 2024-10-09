// src/services/axios.ts
import axios from 'axios';

const APIURL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: APIURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

export default api;