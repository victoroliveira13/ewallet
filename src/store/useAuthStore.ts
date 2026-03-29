import { create } from 'zustand';
import type { User } from '../types';
import { currentUser } from '../constants/mockData';

interface AuthState {
  user: User;
  isAuthenticated: boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: currentUser,
  isAuthenticated: true,
  logout: () => set({ isAuthenticated: false }),
}));
