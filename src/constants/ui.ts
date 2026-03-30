import type { Notification } from '../types';

export const TRANSACTION_FILTERS = ['All', 'Income', 'Expense'] as const;
export type TransactionFilter = (typeof TRANSACTION_FILTERS)[number];

export const PROFILE_MENU_ITEMS = [
  { icon: '💳', label: 'My Cards', description: 'Manage your cards', route: null },
  {
    icon: '🔔',
    label: 'Notifications',
    description: 'Push notifications',
    route: '/notifications',
  },
  { icon: '🔒', label: 'Security', description: 'Password & biometrics', route: null },
  { icon: '🌍', label: 'Language', description: 'English', route: null },
  { icon: '❓', label: 'Help & Support', description: 'FAQ & contact', route: null },
  { icon: '⚙️', label: 'Settings', description: 'App settings', route: null },
] as const;

export const NOTIFICATION_TYPE_CONFIG: Record<Notification['type'], { icon: string; bg: string }> =
  {
    transfer: { icon: '💸', bg: '#00D97E20' },
    info: { icon: 'ℹ️', bg: '#2196F320' },
    alert: { icon: '⚠️', bg: '#FFB30020' },
  };

export const QUICK_ACTIONS = [
  { label: 'Send', icon: '↑', route: '/send' as string | null, highlighted: true },
  { label: 'Receive', icon: '↓', route: '/receive' as string | null, highlighted: false },
  { label: 'Top Up', icon: '+', route: null, highlighted: false },
  { label: 'More', icon: '•••', route: null, highlighted: false },
] as const;
