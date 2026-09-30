import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserProfile,
  Transaction,
  CategoryBudget,
  FinancialGoal,
  AIInsight,
  ChatMessage,
  ToastMessage,
  Category,
} from '../types';

import {
  initialUserProfile,
  initialTransactions,
  initialCategoryBudgets,
  initialGoals,
  initialAIInsights,
  initialChatMessages,
} from '../data/mockData';

export type PageView =
  | 'landing'
  | 'auth'
  | 'onboarding'
  | 'dashboard'
  | 'ai-assistant'
  | 'budget-planner'
  | 'expense-tracker'
  | 'financial-goals'
  | 'ai-insights'
  | 'reports'
  | 'profile-settings';

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  user: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, updatedTx: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  // Category Budgets
  categoryBudgets: CategoryBudget[];
  updateCategoryBudget: (category: Category, amount: number) => void;
  optimizeBudgetAI: () => void;

  // Goals
  goals: FinancialGoal[];
  addGoal: (goal: Omit<FinancialGoal, 'id' | 'monthlyRecommendation'>) => void;
  depositToGoal: (goalId: string, amount: number) => void;
  deleteGoal: (id: string) => void;

  // AI Insights
  aiInsights: AIInsight[];
  dismissInsight: (id: string) => void;
  applyInsight: (id: string) => void;

  // AI Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  clearChat: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // System
  resetToDemoData: () => void;
  formatCurrency: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page state
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('ps_isLoggedIn');
    return saved ? JSON.parse(saved) : true; // default logged in for easy demo access
  });
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // User Profile state
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ps_user');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  // Transactions state
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('ps_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  // Budgets state
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>(() => {
    const saved = localStorage.getItem('ps_budgets');
    return saved ? JSON.parse(saved) : initialCategoryBudgets;
  });

  // Goals state
  const [goals, setGoals] = useState<FinancialGoal[]>(() => {
    const saved = localStorage.getItem('ps_goals');
    return saved ? JSON.parse(saved) : initialGoals;
  });

  // AI Insights state
  const [aiInsights, setAiInsights] = useState<AIInsight[]>(() => {
    const saved = localStorage.getItem('ps_insights');
    return saved ? JSON.parse(saved) : initialAIInsights;
  });

  // Chat Messages state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('ps_chat');
    return saved ? JSON.parse(saved) : initialChatMessages;
  });

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state with LocalStorage
  useEffect(() => {
    localStorage.setItem('ps_isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('ps_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ps_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ps_budgets', JSON.stringify(categoryBudgets));
  }, [categoryBudgets]);

  useEffect(() => {
    localStorage.setItem('ps_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('ps_insights', JSON.stringify(aiInsights));
  }, [aiInsights]);

  useEffect(() => {
    localStorage.setItem('ps_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatCurrency = (amount: number): string => {
    const currency = user.preferredCurrency || '₹';
    return `${currency}${amount.toLocaleString('en-IN')}`;
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    addToast('Profile updated successfully!', 'success');
  };

  // Transaction operations
  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: 'tx_' + Date.now(),
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Recalculate category spent amounts if it's an expense
    if (tx.type === 'expense') {
      setCategoryBudgets((prevBudgets) =>
        prevBudgets.map((b) =>
          b.category === tx.category
            ? { ...b, spentAmount: b.spentAmount + tx.amount }
            : b
        )
      );
    }

    addToast(`Added transaction: ${tx.description} (${formatCurrency(tx.amount)})`, 'success');
  };

  const editTransaction = (id: string, updatedTx: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedTx } : t))
    );
    addToast('Transaction updated', 'info');
  };

  const deleteTransaction = (id: string) => {
    const target = transactions.find((t) => t.id === id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));

    if (target && target.type === 'expense') {
      setCategoryBudgets((prevBudgets) =>
        prevBudgets.map((b) =>
          b.category === target.category
            ? { ...b, spentAmount: Math.max(0, b.spentAmount - target.amount) }
            : b
        )
      );
    }
    addToast('Transaction deleted', 'warning');
  };

  // Category Budget operations
  const updateCategoryBudget = (category: Category, amount: number) => {
    setCategoryBudgets((prev) =>
      prev.map((b) => (b.category === category ? { ...b, allocatedAmount: amount } : b))
    );
    addToast(`Updated ${category} budget to ${formatCurrency(amount)}`, 'success');
  };

  const optimizeBudgetAI = () => {
    // Re-adjust budgets mathematically to save an extra 10-15% on non-essential categories
    setCategoryBudgets((prev) =>
      prev.map((b) => {
        if (b.category === 'Shopping') return { ...b, allocatedAmount: Math.max(b.spentAmount, 3000) };
        if (b.category === 'Entertainment') return { ...b, allocatedAmount: Math.max(b.spentAmount, 2000) };
        if (b.category === 'Food') return { ...b, allocatedAmount: Math.max(b.spentAmount, 6500) };
        if (b.category === 'Savings') return { ...b, allocatedAmount: b.allocatedAmount + 2500 };
        return b;
      })
    );

    addToast('PocketSmart AI has optimized your budget allocation!', 'success');
  };

  // Financial Goals operations
  const addGoal = (newGoalData: Omit<FinancialGoal, 'id' | 'monthlyRecommendation'>) => {
    const monthsRemaining = 6;
    const remaining = Math.max(0, newGoalData.targetAmount - newGoalData.currentSavings);
    const monthlyRec = Math.ceil(remaining / monthsRemaining);

    const goal: FinancialGoal = {
      ...newGoalData,
      id: 'goal_' + Date.now(),
      monthlyRecommendation: monthlyRec,
    };

    setGoals((prev) => [goal, ...prev]);
    addToast(`New goal "${goal.name}" created!`, 'success');
  };

  const depositToGoal = (goalId: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const newSavings = g.currentSavings + amount;
          return { ...g, currentSavings: newSavings };
        }
        return g;
      })
    );
    addToast(`Saved ${formatCurrency(amount)} towards goal! 🎉`, 'success');
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    addToast('Goal removed', 'warning');
  };

  // AI Insights operations
  const dismissInsight = (id: string) => {
    setAiInsights((prev) => prev.filter((i) => i.id !== id));
    addToast('Insight dismissed', 'info');
  };

  const applyInsight = (id: string) => {
    const insight = aiInsights.find((i) => i.id === id);
    if (insight) {
      if (insight.category === 'Shopping') {
        updateCategoryBudget('Shopping', 3000);
      } else if (insight.actionText?.includes('Emergency Fund')) {
        depositToGoal('goal_1', 1200);
      }
      dismissInsight(id);
      addToast('Applied AI Recommendation!', 'success');
    }
  };

  // AI Assistant Chat operations
  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Calculate dynamic stats from context for smart custom AI answers
    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = user.monthlyIncome - totalExpenses;
    const shoppingExpense = transactions
      .filter((t) => t.category === 'Shopping' && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const foodExpense = transactions
      .filter((t) => t.category === 'Food' && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // Simulate intelligent AI logic
    setTimeout(() => {
      let aiText = '';
      let suggestions: string[] = [];
      const lower = text.toLowerCase();

      if (lower.includes('save') && lower.includes('5,000')) {
        aiText = `Here is a tailored action plan to save **₹5,000** this month:\n\n` +
          `1. **Reduce Dining & Swiggy:** Your current food expenses total ${formatCurrency(foodExpense)}. Cooking 4 extra meals at home saves ~₹2,200.\n` +
          `2. **Limit Impulse Shopping:** Shopping currently stands at ${formatCurrency(shoppingExpense)}. Setting a strict ₹3,000 cap saves ~₹1,800.\n` +
          `3. **Optimize Subscriptions:** Cancel unused streaming or gym apps for ~₹1,000 savings.\n\n` +
          `💡 Total Savings Potential: **₹5,000+** per month!`;
        suggestions = ['Apply food budget cap', 'Show spending breakdown', 'Update savings goal'];
      } else if (lower.includes('spending too much') || lower.includes('unnecessary')) {
        aiText = `Based on your recent transactions, here are your top spending areas:\n\n` +
          `• **Rent:** ${formatCurrency(18000)} (Fixed necessary expense)\n` +
          `• **Food & Dining:** ${formatCurrency(foodExpense)} (12% higher than average)\n` +
          `• **Shopping:** ${formatCurrency(shoppingExpense)} (Near monthly category cap)\n\n` +
          `🎯 **Recommendation:** Reducing dining out by 15% will free up ${formatCurrency(1500)} every month.`;
        suggestions = ['How can I cut food expenses?', 'Set food spending limit', 'View all transactions'];
      } else if (lower.includes('phone') || lower.includes('afford')) {
        aiText = `Let's analyze if you can afford a **₹20,000 phone** right now:\n\n` +
          `• **Monthly Income:** ${formatCurrency(user.monthlyIncome)}\n` +
          `• **Current Total Expenses:** ${formatCurrency(totalExpenses)}\n` +
          `• **Available Cashflow:** ${formatCurrency(balance)}\n\n` +
          `✅ **Verdict:** Yes, you can afford it! However, paying full cash will use ${( (20000 / balance) * 100 ).toFixed(0)}% of your remaining monthly balance. ` +
          `I recommend setting up a 3-month savings plan of **₹6,666/month** so your emergency buffer remains untouched!`;
        suggestions = ['Create a Phone Goal', 'Show monthly budget', 'Find savings tricks'];
      } else if (lower.includes('divide') || lower.includes('salary') || lower.includes('50/30/20')) {
        const needs = user.monthlyIncome * 0.5;
        const wants = user.monthlyIncome * 0.3;
        const savings = user.monthlyIncome * 0.2;

        aiText = `Using the gold-standard **50/30/20 Budget Rule** for your ${formatCurrency(user.monthlyIncome)} salary:\n\n` +
          `🏠 **50% Needs (${formatCurrency(needs)}):** Rent, Electricity, Groceries, Medicine.\n` +
          `🎉 **30% Wants (${formatCurrency(wants)}):** Dining, Cinema, Shopping, Outings.\n` +
          `💰 **20% Savings (${formatCurrency(savings)}):** SIP Mutual Funds, Emergency Fund, Goals.\n\n` +
          `Currently, you are allocating ${formatCurrency(user.currentSavings)} in liquid savings. Excellent work!`;
        suggestions = ['Optimize my categories', 'Create Emergency Fund', 'View my budget'];
      } else if (lower.includes('budget') || lower.includes('create')) {
        aiText = `Here is your customized monthly budget outline based on your ${formatCurrency(user.monthlyIncome)} income:\n\n` +
          `• Rent: ${formatCurrency(18000)}\n` +
          `• Food & Groceries: ${formatCurrency(7000)}\n` +
          `• Utilities & Bills: ${formatCurrency(4000)}\n` +
          `• Transportation: ${formatCurrency(3000)}\n` +
          `• Shopping & Leisure: ${formatCurrency(4000)}\n` +
          `• Emergency Savings: ${formatCurrency(18000)}\n\n` +
          `You can adjust category caps in the **Budget Planner** tab anytime.`;
        suggestions = ['Go to Budget Planner', 'Optimize budget with AI', 'Set alerts'];
      } else {
        aiText = `I analyzed your inquiry alongside your live budget. You currently have a net monthly balance of **${formatCurrency(balance)}** after all logged expenses.\n\n` +
          `Would you like me to generate a personalized savings breakdown, scan for recurring subscriptions, or suggest category limits for this month?`;
        suggestions = [
          'Analyze my spending',
          'Create my budget',
          'Help me save money',
          'Find unnecessary expenses',
        ];
      }

      const aiMsg: ChatMessage = {
        id: 'msg_' + Date.now(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions,
      };

      setChatMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const clearChat = () => {
    setChatMessages([initialChatMessages[0]]);
    addToast('Chat history cleared', 'info');
  };

  const resetToDemoData = () => {
    setUser(initialUserProfile);
    setTransactions(initialTransactions);
    setCategoryBudgets(initialCategoryBudgets);
    setGoals(initialGoals);
    setAiInsights(initialAIInsights);
    setChatMessages(initialChatMessages);
    localStorage.clear();
    addToast('Application reset to initial demo state!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isLoggedIn,
        setIsLoggedIn,
        authMode,
        setAuthMode,
        user,
        updateUserProfile,
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        categoryBudgets,
        updateCategoryBudget,
        optimizeBudgetAI,
        goals,
        addGoal,
        depositToGoal,
        deleteGoal,
        aiInsights,
        dismissInsight,
        applyInsight,
        chatMessages,
        sendChatMessage,
        clearChat,
        toasts,
        addToast,
        removeToast,
        resetToDemoData,
        formatCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
