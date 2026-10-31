import { create } from 'zustand';
import {
  clearSession,
  loadSession,
  loginRequest,
  saveSession,
} from '../services/authService';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  // Ініціалізація з localStorage
  init: () => {
    const session = loadSession();
    if (session) {
      set({
        user: session.user,
        token: session.token,
        isAuthenticated: true,
      });
    }
  },

  login: async (credentials) => {
    const data = await loginRequest(credentials);
    saveSession(data);
    set({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    clearSession();
    set({ user: null, token: null, isAuthenticated: false });
  },
}));