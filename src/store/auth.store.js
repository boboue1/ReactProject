import { jwtDecode } from 'jwt-decode';

export const authStore = {
  getToken: () => localStorage.getItem('access_token'),

  setTokens: (token, refreshToken) => {
    localStorage.setItem('access_token', token);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
  },

  clear: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  getUser: () => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    try { return jwtDecode(token); }
    catch { return null; }
  },

  isAuthenticated: () => {
    const user = authStore.getUser();
    if (!user) return false;
    return user.exp * 1000 > Date.now();
  },

  hasRole: (role) => {
    return authStore.getUser()?.roles?.includes(role) ?? false;
  },
};