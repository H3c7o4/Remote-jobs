import api from './api';

interface SignUpData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface ActivationData {
  uid: string;
  token: string;
}

const authService = {
  signUp: async (data: SignUpData) => {
    return await api.post('/users/auth/users/', data);
  },

  signIn: async (data: SignInData) => {
    return await api.post('/users/auth/jwt/create/', data);
  },

  activate: async (data: ActivationData) => {
    return await api.post('/users/auth/users/activation/', data);
  },

  getCurrentUser: async () => {
    return await api.get('/users/auth/users/me/');
  }
};

export default authService;
