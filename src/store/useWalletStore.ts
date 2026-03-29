import { create } from 'zustand';
import type { Transaction, Contact } from '../types';
import {
  transactions as initialTransactions,
  contacts as initialContacts,
  currentUser,
} from '../constants/mockData';

interface WalletState {
  balance: number;
  transactions: Transaction[];
  contacts: Contact[];
  sendTransfer: (contact: Contact, amount: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: currentUser.balance,
  transactions: initialTransactions,
  contacts: initialContacts,

  sendTransfer: (contact, amount) =>
    set((state) => {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        title: `Transfer to ${contact.name}`,
        subtitle: 'Transfer',
        amount: -amount,
        type: 'debit',
        category: 'transfer',
        date: 'Just now',
        timestamp: new Date().toISOString(),
        icon: '💸',
      };
      return {
        balance: state.balance - amount,
        transactions: [newTransaction, ...state.transactions],
      };
    }),
}));
