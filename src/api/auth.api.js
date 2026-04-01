import apiClient from './client';

export const login = (credentials) =>
  apiClient.post('/login', credentials);

//recupere les infos de l'utilisateur connecté
export const getMe = () =>
  apiClient.get('/me').then((res) => res.data);

export const refreshToken = (refresh_token) =>
  apiClient.post('/auth/refresh', { refresh_token });