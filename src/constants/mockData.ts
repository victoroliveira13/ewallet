import type { Transaction, Contact, Notification, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  username: '@alexjohnson',
  email: 'alex@example.com',
  balance: 2430.0,
  initials: 'AJ',
  color: '#00D97E',
};

export const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Netflix',
    subtitle: 'Entertainment',
    amount: -12.99,
    type: 'debit',
    category: 'entertainment',
    date: 'Today, 2:30 PM',
    timestamp: new Date(new Date().setHours(14, 30, 0, 0)).toISOString(),
    icon: '🎬',
  },
  {
    id: '2',
    title: 'Salary',
    subtitle: 'Monthly income',
    amount: 4500.0,
    type: 'credit',
    category: 'salary',
    date: 'Today, 9:00 AM',
    timestamp: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    icon: '💰',
  },
  {
    id: '3',
    title: 'Uber',
    subtitle: 'Transportation',
    amount: -8.5,
    type: 'debit',
    category: 'transport',
    date: 'Yesterday, 6:45 PM',
    timestamp: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      d.setHours(18, 45, 0, 0);
      return d.toISOString();
    })(),
    icon: '🚗',
  },
  {
    id: '4',
    title: 'Starbucks',
    subtitle: 'Food & Drinks',
    amount: -5.75,
    type: 'debit',
    category: 'food',
    date: 'Yesterday, 8:15 AM',
    timestamp: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      d.setHours(8, 15, 0, 0);
      return d.toISOString();
    })(),
    icon: '☕',
  },
  {
    id: '5',
    title: 'Transfer from Sarah',
    subtitle: 'Personal',
    amount: 150.0,
    type: 'credit',
    category: 'transfer',
    date: 'Mar 25, 3:00 PM',
    timestamp: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 4);
      d.setHours(15, 0, 0, 0);
      return d.toISOString();
    })(),
    icon: '💸',
  },
  {
    id: '6',
    title: 'Amazon',
    subtitle: 'Shopping',
    amount: -67.3,
    type: 'debit',
    category: 'shopping',
    date: 'Mar 24, 1:20 PM',
    timestamp: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 5);
      d.setHours(13, 20, 0, 0);
      return d.toISOString();
    })(),
    icon: '🛒',
  },
  {
    id: '7',
    title: 'Spotify',
    subtitle: 'Entertainment',
    amount: -9.99,
    type: 'debit',
    category: 'entertainment',
    date: 'Mar 15, 12:00 PM',
    timestamp: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 14);
      d.setHours(12, 0, 0, 0);
      return d.toISOString();
    })(),
    icon: '🎵',
  },
  {
    id: '8',
    title: "McDonald's",
    subtitle: 'Food & Drinks',
    amount: -15.4,
    type: 'debit',
    category: 'food',
    date: 'Feb 20, 7:30 PM',
    timestamp: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 37);
      d.setHours(19, 30, 0, 0);
      return d.toISOString();
    })(),
    icon: '🍔',
  },
];

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Miller',
    username: '@sarahmiller',
    avatar: '',
    initials: 'SM',
    color: '#FF6B6B',
  },
  {
    id: '2',
    name: 'John Doe',
    username: '@johndoe',
    avatar: '',
    initials: 'JD',
    color: '#2196F3',
  },
  {
    id: '3',
    name: 'Emily Chen',
    username: '@emilychen',
    avatar: '',
    initials: 'EC',
    color: '#9C27B0',
  },
  {
    id: '4',
    name: 'Marcus Williams',
    username: '@marcusw',
    avatar: '',
    initials: 'MW',
    color: '#FFB300',
  },
  {
    id: '5',
    name: 'Lisa Park',
    username: '@lisapark',
    avatar: '',
    initials: 'LP',
    color: '#00D97E',
  },
  {
    id: '6',
    name: 'Tom Clark',
    username: '@tomclark',
    avatar: '',
    initials: 'TC',
    color: '#FF4757',
  },
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Transfer Received',
    message: 'Sarah Miller sent you $150.00',
    time: '2 min ago',
    read: false,
    type: 'transfer',
  },
  {
    id: '2',
    title: 'Payment Successful',
    message: 'Your payment of $12.99 to Netflix was successful',
    time: '1 hour ago',
    read: false,
    type: 'info',
  },
  {
    id: '3',
    title: 'Low Balance Alert',
    message: 'Your balance is below $100',
    time: '3 hours ago',
    read: true,
    type: 'alert',
  },
  {
    id: '4',
    title: 'Transfer Received',
    message: 'John Doe sent you $200.00',
    time: 'Yesterday',
    read: true,
    type: 'transfer',
  },
  {
    id: '5',
    title: 'Security Alert',
    message: 'New login detected on your account',
    time: '2 days ago',
    read: true,
    type: 'alert',
  },
];
