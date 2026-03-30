export const ROUTES = {
  HOME: '/home',
  SEND: '/send',
  RECEIVE: '/receive',
  HISTORY: '/history',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
