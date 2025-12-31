import { create } from 'zustand';
import { authAPI } from '../api/auth';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { user, access_token } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        user,
        token: access_token,
        isAuthenticated: true
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  },

  register: async (data) => {
    try {
      const response = await authAPI.register(data);
      const { user, access_token } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        user,
        token: access_token,
        isAuthenticated: true
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({
        user: null,
        token: null,
        isAuthenticated: false
      });
    }
  },

  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role === 'admin';
  },
}));

export default useAuthStore;
