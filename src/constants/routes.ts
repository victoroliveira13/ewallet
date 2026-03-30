export const ROUTES = {
  HOME: '/home',
  SEND: '/send',
  RECEIVE: '/receive',
  HISTORY: '/history',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
