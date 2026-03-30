export const ROUTES = {
  HOME: '/home',
  SEND: '/send',
  SEND_CONFIRM: '/send/confirm',
  RECEIVE: '/receive',
  HISTORY: '/history',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
