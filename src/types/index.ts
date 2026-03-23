export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: "credit" | "debit";
  category: "shopping" | "food" | "transport" | "entertainment" | "transfer" | "salary";
  date: string;
  icon: string;
}

export interface Contact {
  id: string;
  name: string;
  username: string;
  avatar: string;
  initials: string;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "transfer" | "info" | "alert";
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  balance: number;
  initials: string;
  color: string;
}
