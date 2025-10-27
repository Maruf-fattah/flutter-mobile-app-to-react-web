import { 
  Transaction, 
  Category, 
  Shop, 
  SavingsGoal, 
  Budget, 
  GroceryList, 
  Loan, 
  AppSettings 
} from '@/types';

const STORAGE_KEYS = {
  TRANSACTIONS: 'daily-expenses-transactions',
  CATEGORIES: 'daily-expenses-categories',
  SHOPS: 'daily-expenses-shops',
  SAVINGS_GOALS: 'daily-expenses-savings-goals',
  BUDGETS: 'daily-expenses-budgets',
  GROCERY_LISTS: 'daily-expenses-grocery-lists',
  LOANS: 'daily-expenses-loans',
  SETTINGS: 'daily-expenses-settings'
};

// Generic storage functions
export const getStorageData = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error);
    return defaultValue;
  }
};

export const setStorageData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to localStorage for key ${key}:`, error);
  }
};

// Transaction storage
export const getTransactions = (): Transaction[] => {
  return getStorageData(STORAGE_KEYS.TRANSACTIONS, []);
};

export const saveTransaction = (transaction: Transaction): void => {
  const transactions = getTransactions();
  const existingIndex = transactions.findIndex(t => t.id === transaction.id);
  
  if (existingIndex >= 0) {
    transactions[existingIndex] = transaction;
  } else {
    transactions.push(transaction);
  }
  
  setStorageData(STORAGE_KEYS.TRANSACTIONS, transactions);
};

export const deleteTransaction = (id: string): void => {
  const transactions = getTransactions().filter(t => t.id !== id);
  setStorageData(STORAGE_KEYS.TRANSACTIONS, transactions);
};

// Category storage
export const getCategories = (): Category[] => {
  const defaultCategories: Category[] = [
    { id: '1', name: 'Food & Dining', type: 'expense', color: '#ef4444', icon: 'UtensilsCrossed' },
    { id: '2', name: 'Transportation', type: 'expense', color: '#f97316', icon: 'Car' },
    { id: '3', name: 'Shopping', type: 'expense', color: '#eab308', icon: 'ShoppingBag' },
    { id: '4', name: 'Entertainment', type: 'expense', color: '#a855f7', icon: 'Gamepad2' },
    { id: '5', name: 'Bills & Utilities', type: 'expense', color: '#06b6d4', icon: 'Receipt' },
    { id: '6', name: 'Healthcare', type: 'expense', color: '#ec4899', icon: 'Heart' },
    { id: '7', name: 'Salary', type: 'income', color: '#22c55e', icon: 'Banknote' },
    { id: '8', name: 'Freelance', type: 'income', color: '#10b981', icon: 'Briefcase' },
    { id: '9', name: 'Investments', type: 'income', color: '#059669', icon: 'TrendingUp' },
    { id: '10', name: 'Other Income', type: 'income', color: '#16a34a', icon: 'PlusCircle' }
  ];
  
  return getStorageData(STORAGE_KEYS.CATEGORIES, defaultCategories);
};

export const saveCategory = (category: Category): void => {
  const categories = getCategories();
  const existingIndex = categories.findIndex(c => c.id === category.id);
  
  if (existingIndex >= 0) {
    categories[existingIndex] = category;
  } else {
    categories.push(category);
  }
  
  setStorageData(STORAGE_KEYS.CATEGORIES, categories);
};

// Shop storage
export const getShops = (): Shop[] => {
  return getStorageData(STORAGE_KEYS.SHOPS, []);
};

export const saveShop = (shop: Shop): void => {
  const shops = getShops();
  const existingIndex = shops.findIndex(s => s.id === shop.id);
  
  if (existingIndex >= 0) {
    shops[existingIndex] = shop;
  } else {
    shops.push(shop);
  }
  
  setStorageData(STORAGE_KEYS.SHOPS, shops);
};

// Savings goals storage
export const getSavingsGoals = (): SavingsGoal[] => {
  return getStorageData(STORAGE_KEYS.SAVINGS_GOALS, []);
};

export const saveSavingsGoal = (goal: SavingsGoal): void => {
  const goals = getSavingsGoals();
  const existingIndex = goals.findIndex(g => g.id === goal.id);
  
  if (existingIndex >= 0) {
    goals[existingIndex] = goal;
  } else {
    goals.push(goal);
  }
  
  setStorageData(STORAGE_KEYS.SAVINGS_GOALS, goals);
};

// Budget storage
export const getBudgets = (): Budget[] => {
  return getStorageData(STORAGE_KEYS.BUDGETS, []);
};

export const saveBudget = (budget: Budget): void => {
  const budgets = getBudgets();
  const existingIndex = budgets.findIndex(b => b.id === budget.id);
  
  if (existingIndex >= 0) {
    budgets[existingIndex] = budget;
  } else {
    budgets.push(budget);
  }
  
  setStorageData(STORAGE_KEYS.BUDGETS, budgets);
};

// Grocery lists storage
export const getGroceryLists = (): GroceryList[] => {
  return getStorageData(STORAGE_KEYS.GROCERY_LISTS, []);
};

export const saveGroceryList = (list: GroceryList): void => {
  const lists = getGroceryLists();
  const existingIndex = lists.findIndex(l => l.id === list.id);
  
  if (existingIndex >= 0) {
    lists[existingIndex] = list;
  } else {
    lists.push(list);
  }
  
  setStorageData(STORAGE_KEYS.GROCERY_LISTS, lists);
};

// Loan storage
export const getLoans = (): Loan[] => {
  return getStorageData(STORAGE_KEYS.LOANS, []);
};

export const saveLoan = (loan: Loan): void => {
  const loans = getLoans();
  const existingIndex = loans.findIndex(l => l.id === loan.id);
  
  if (existingIndex >= 0) {
    loans[existingIndex] = loan;
  } else {
    loans.push(loan);
  }
  
  setStorageData(STORAGE_KEYS.LOANS, loans);
};

// Settings storage
export const getSettings = (): AppSettings => {
  const defaultSettings: AppSettings = {
    currency: 'USD',
    dateFormat: 'MM/dd/yyyy',
    theme: 'system',
    notifications: true,
    backupEnabled: false,
    language: 'en'
  };
  
  return getStorageData(STORAGE_KEYS.SETTINGS, defaultSettings);
};

export const saveSettings = (settings: AppSettings): void => {
  setStorageData(STORAGE_KEYS.SETTINGS, settings);
};

// Utility functions
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const exportData = (): string => {
  const data = {
    transactions: getTransactions(),
    categories: getCategories(),
    shops: getShops(),
    savingsGoals: getSavingsGoals(),
    budgets: getBudgets(),
    groceryLists: getGroceryLists(),
    loans: getLoans(),
    settings: getSettings(),
    exportDate: new Date().toISOString()
  };
  
  return JSON.stringify(data, null, 2);
};

export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.transactions) setStorageData(STORAGE_KEYS.TRANSACTIONS, data.transactions);
    if (data.categories) setStorageData(STORAGE_KEYS.CATEGORIES, data.categories);
    if (data.shops) setStorageData(STORAGE_KEYS.SHOPS, data.shops);
    if (data.savingsGoals) setStorageData(STORAGE_KEYS.SAVINGS_GOALS, data.savingsGoals);
    if (data.budgets) setStorageData(STORAGE_KEYS.BUDGETS, data.budgets);
    if (data.groceryLists) setStorageData(STORAGE_KEYS.GROCERY_LISTS, data.groceryLists);
    if (data.loans) setStorageData(STORAGE_KEYS.LOANS, data.loans);
    if (data.settings) setStorageData(STORAGE_KEYS.SETTINGS, data.settings);
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};