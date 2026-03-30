import { create } from 'zustand';

interface PushTokenState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const usePushTokenStore = create<PushTokenState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));
