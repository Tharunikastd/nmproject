export type Category = 
  | 'Food'
  | 'Rent'
  | 'Transportation'
  | 'Education'
  | 'Shopping'
  | 'Entertainment'
  | 'Bills'
  | 'Health'
  | 'Savings'
  | 'Other';

export type PaymentMethod = 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash';

export type PriorityLevel = 'Low' | 'Medium' | 'High';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  occupation: string;
  monthlyIncome: number;
  currentSavings: number;
  existingLoans: number;
  preferredCurrency: string;
  isOnboarded: boolean;
  theme: 'dark' | 'light';
  notificationsEnabled: boolean;
  budgetReminders: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: Category;
  amount: number;
  type: 'expense' | 'income';
  paymentMethod: PaymentMethod;
}

export interface CategoryBudget {
  category: Category;
  allocatedAmount: number;
  spentAmount: number;
  iconName?: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  category: 'Emergency Fund' | 'Vehicle' | 'Education' | 'Travel' | 'Investment' | 'Gadgets' | 'Other';
  targetAmount: number;
  currentSavings: number;
  targetDate: string;
  monthlyRecommendation: number;
  icon?: string;
}

export interface AIInsight {
  id: string;
  type: 'spending' | 'savings' | 'recommendation' | 'alert';
  title: string;
  description: string;
  priority: PriorityLevel;
  category?: Category;
  impactAmount?: number;
  date: string;
  actionText?: string;
  isDismissed?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestions?: string[];
  insightCard?: {
    title: string;
    description: string;
    type: 'tip' | 'alert' | 'suggestion';
  };
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
