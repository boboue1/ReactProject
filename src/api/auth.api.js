import apiClient from './client';

export const login = (credentials) =>
  apiClient.post('/login', credentials);

export const getMe = () =>
  apiClient.get('/me').then((res) => res.data);

export const refreshToken = (refresh_token) =>
  apiClient.post('/auth/refresh', { refresh_token });