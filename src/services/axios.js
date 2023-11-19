// src/services/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://CAMBIAR_AQUI/api/v1', // Coloca aquí la base URL de tu API
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
