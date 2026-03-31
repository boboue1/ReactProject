import apiClient from '../../api/client';


export const getUsers = () =>
  apiClient.get('/users').then((res) => res.data);

export const createUser = (data) =>
  apiClient.post('/users', data).then((res) => res.data);

//Inscription publique — pointe vers la route /api/register
export const register = (data) =>
  apiClient.post('/register', data).then((res) => res.data);