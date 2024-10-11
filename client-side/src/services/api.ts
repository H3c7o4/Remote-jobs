// src/services/axios.ts
import axios from 'axios';
// 'https://remote-jobs-k0hp.onrender.com' 'http://localhost:8000'

const APIURL = 'https://remote-jobs-k0hp.onrender.com';

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