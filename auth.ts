import { create } from 'zustand';
import { AuthState } from '../types';
import { login as apiLogin } from '../lib/api';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      const user = await apiLogin(email, password);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw new Error('Login failed');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));