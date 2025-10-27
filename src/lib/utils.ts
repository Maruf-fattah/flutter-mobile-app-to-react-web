import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Transaction, FinancialSummary, Budget } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date utilities
export const formatDate = (date: string | Date, format: string = 'MM/dd/yyyy'): string => {
  const d = new Date(date);
  
  switch (format) {
    case 'MM/dd/yyyy':
      return d.toLocaleDateString('en-US');
    case 'dd/MM/yyyy':
      return d.toLocaleDateString('en-GB');
    case 'yyyy-MM-dd':
      return d.toISOString().split('T')[0];
    default:
      return d.toLocaleDateString();
  }
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Financial calculations
export const calculateFinancialSummary = (transactions: Transaction[]): FinancialSummary => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });
  
  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  // Calculate previous month for trend
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const previousMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === previousMonth && 
           transactionDate.getFullYear() === previousYear;
  });
  
  const previousBalance = previousMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0) - 
    previousMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const monthlyTrend = previousBalance === 0 ? 0 : 
    ((balance - previousBalance) / Math.abs(previousBalance)) * 100;
  
  return {
    totalIncome,
    totalExpenses,
    balance,
    savingsTotal: Math.max(0, balance), // Simplified savings calculation
    budgetUtilization: 0, // Will be calculated with budget data
    monthlyTrend
  };
};

export const calculateBudgetUtilization = (transactions: Transaction[], budgets: Budget[]): number => {
  if (budgets.length === 0) return 0;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  let totalBudget = 0;
  let totalSpent = 0;
  
  budgets.forEach(budget => {
    if (budget.period === 'monthly') {
      totalBudget += budget.amount;
      
      const categorySpent = transactions
        .filter(t => {
          const transactionDate = new Date(t.date);
          return t.type === 'expense' &&
                 t.category === budget.category &&
                 transactionDate.getMonth() === currentMonth &&
                 transactionDate.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
        
      totalSpent += categorySpent;
    }
  });
  
  return totalBudget === 0 ? 0 : (totalSpent / totalBudget) * 100;
};

// Category utilities
export const getCategoryColor = (categoryName: string, categories: any[]): string => {
  const category = categories.find(c => c.name === categoryName);
  return category?.color || '#6b7280';
};

// Date range utilities
export const getDateRange = (period: 'week' | 'month' | 'year'): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);
  
  switch (period) {
    case 'week':
      start.setDate(now.getDate() - now.getDay());
      end.setDate(start.getDate() + 6);
      break;
    case 'month':
      start.setDate(1);
      end.setMonth(start.getMonth() + 1, 0);
      break;
    case 'year':
      start.setMonth(0, 1);
      end.setMonth(11, 31);
      break;
  }
  
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
};

// Transaction filtering
export const filterTransactionsByDateRange = (
  transactions: Transaction[], 
  startDate: Date, 
  endDate: Date
): Transaction[] => {
  return transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

export const groupTransactionsByCategory = (transactions: Transaction[]): Record<string, Transaction[]> => {
  return transactions.reduce((groups, transaction) => {
    const category = transaction.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

// Search utilities
export const searchTransactions = (transactions: Transaction[], query: string): Transaction[] => {
  const lowercaseQuery = query.toLowerCase();
  return transactions.filter(t => 
    t.description.toLowerCase().includes(lowercaseQuery) ||
    t.category.toLowerCase().includes(lowercaseQuery) ||
    (t.shop && t.shop.toLowerCase().includes(lowercaseQuery))
  );
};

// Export utilities
export const downloadFile = (content: string, filename: string, contentType: string = 'application/json'): void => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Recurring transaction utilities
export const getNextRecurringDate = (lastDate: string, period: 'daily' | 'weekly' | 'monthly' | 'yearly'): string => {
  const date = new Date(lastDate);
  
  switch (period) {
    case 'daily':
      date.setDate(date.getDate() + 1);
      break;
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'yearly':
      date.setFullYear(date.getFullYear() + 1);
      break;
  }
  
  return date.toISOString().split('T')[0];
};