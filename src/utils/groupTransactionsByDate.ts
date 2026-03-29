import type { Transaction } from '../types';

export interface TransactionSection {
  title: string;
  data: Transaction[];
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getGroupLabel(timestamp: string): string {
  const txDate = startOfDay(new Date(timestamp));
  const today = startOfDay(new Date());

  const diffDays = Math.round((today.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays <= 6) return 'Esta semana';

  const sameMonth =
    txDate.getMonth() === today.getMonth() && txDate.getFullYear() === today.getFullYear();
  if (sameMonth) return 'Este mês';

  return 'Mais antigo';
}

const SECTION_ORDER = ['Hoje', 'Ontem', 'Esta semana', 'Este mês', 'Mais antigo'];

export function groupTransactionsByDate(transactions: Transaction[]): TransactionSection[] {
  const grouped: Record<string, Transaction[]> = {};

  for (const tx of transactions) {
    const label = getGroupLabel(tx.timestamp);
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(tx);
  }

  return SECTION_ORDER.filter((title) => grouped[title]).map((title) => ({
    title,
    data: grouped[title],
  }));
}
