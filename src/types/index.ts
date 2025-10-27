export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  shop?: string;
  tags?: string[];
  recurring?: boolean;
  recurringPeriod?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  budget?: number;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  address?: string;
  phone?: string;
  website?: string;
  notes?: string;
  totalSpent: number;
  lastVisit?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  estimatedPrice?: number;
  isPurchased: boolean;
  notes?: string;
}

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  totalEstimated: number;
  totalActual?: number;
  createdDate: string;
  completedDate?: string;
  isCompleted: boolean;
}

export interface Loan {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  interestRate: number;
  monthlyPayment: number;
  startDate: string;
  endDate: string;
  lender: string;
  type: 'personal' | 'mortgage' | 'auto' | 'student' | 'credit_card' | 'other';
  nextPaymentDate: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsTotal: number;
  budgetUtilization: number;
  monthlyTrend: number;
}

export interface AppSettings {
  currency: string;
  dateFormat: string;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  backupEnabled: boolean;
  language: string;
}