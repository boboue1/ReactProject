import apiClient from './client';

export const login = (credentials) =>
  apiClient.post('/auth/login', credentials);

export const refreshToken = (refresh_token) =>
  apiClient.post('/auth/refresh', { refresh_token });