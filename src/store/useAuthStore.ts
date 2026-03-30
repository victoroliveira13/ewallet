import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import type { User } from '../types';
import { currentUser } from '../constants/mockData';

const STORAGE_KEYS = {
  SESSION: '@ewallet/auth_session',
  BIOMETRICS: '@ewallet/biometrics_enabled',
} as const;

const AVATAR_COLORS = ['#00D97E', '#2196F3', '#FF6B6B', '#9C27B0', '#FFB300', '#FF4757'];

function buildUser(name: string, email: string): User {
  const parts = name.trim().split(' ');
  const initials =
    parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  const color = AVATAR_COLORS[email.charCodeAt(0) % AVATAR_COLORS.length];
  return {
    id: Date.now().toString(),
    name,
    username: `@${email.split('@')[0].toLowerCase()}`,
    email,
    balance: 0,
    initials,
    color,
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface AuthState {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  biometricsEnabled: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  authenticateWithBiometrics: () => Promise<boolean>;
  enableBiometrics: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: currentUser,
  isAuthenticated: false,
  isLoading: true,
  biometricsEnabled: false,

  login: async (email, password) => {
    if (!EMAIL_RE.test(email)) throw new Error('E-mail inválido.');
    if (password.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres.');
    const name = email
      .split('@')[0]
      .replace(/[._]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const user = buildUser(name, email);
    await AsyncStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  register: async (name, email, password) => {
    if (!name.trim()) throw new Error('Informe seu nome.');
    if (!EMAIL_RE.test(email)) throw new Error('E-mail inválido.');
    if (password.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres.');
    const user = buildUser(name.trim(), email.toLowerCase());
    await AsyncStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: async () => {
    // Atualiza estado imediatamente para resposta instantânea na UI
    set({ user: currentUser, isAuthenticated: false, biometricsEnabled: false });
    // Limpa storage em background
    AsyncStorage.multiRemove([STORAGE_KEYS.SESSION, STORAGE_KEYS.BIOMETRICS]).catch(() => {});
  },

  restoreSession: async () => {
    try {
      const [raw, bioRaw] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.SESSION),
        AsyncStorage.getItem(STORAGE_KEYS.BIOMETRICS),
      ]);
      if (raw) {
        const user: User = JSON.parse(raw);
        set({ user, isAuthenticated: true, biometricsEnabled: bioRaw === 'true' });
      }
    } catch {
      // session corrupted — stay logged out
    } finally {
      set({ isLoading: false });
    }
  },

  authenticateWithBiometrics: async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!compatible || !enrolled) return false;
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Entrar na carteira',
      fallbackLabel: 'Usar senha',
    });
    return result.success;
  },

  enableBiometrics: async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !isEnrolled) throw new Error('Biometria não disponível neste dispositivo.');
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirme sua identidade para habilitar biometria',
      fallbackLabel: 'Usar senha',
    });
    if (!result.success) throw new Error('Autenticação biométrica falhou.');
    await AsyncStorage.setItem(STORAGE_KEYS.BIOMETRICS, 'true');
    set({ biometricsEnabled: true });
  },
}));
