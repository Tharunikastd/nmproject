import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/layout/Sidebar';
import { ToastContainer } from '../components/layout/ToastContainer';
import { ExpenseDonutChart } from '../components/charts/ExpenseDonutChart';
import { IncomeExpenseBarChart } from '../components/charts/IncomeExpenseBarChart';
import { SpendingTrendChart } from '../components/charts/SpendingTrendChart';
import { ExpenseFormModal } from '../components/transactions/ExpenseFormModal';
import { AIRecommendationCard } from '../components/common/AIRecommendationCard';
import type { Transaction } from '../types';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  Plus,
  Sparkles,
  Trash2,
  Edit2,
  TrendingDown,
} from 'lucide-react';


export const DashboardPage: React.FC = () => {
  const {
    user,
    transactions,
    categoryBudgets,
    aiInsights,
    deleteTransaction,
    applyInsight,
    dismissInsight,
    formatCurrency,
    setCurrentPage,
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Financial calculations
  const totalIncome = user.monthlyIncome;
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const availableBalance = totalIncome - totalExpenses;
  const totalAllocatedBudget = categoryBudgets.reduce((sum, b) => sum + b.allocatedAmount, 0);
  const budgetRemaining = Math.max(0, totalAllocatedBudget - totalExpenses);
  const spendingPercentage = Math.min(100, Math.round((totalExpenses / totalIncome) * 100));

  const topAIInsight = aiInsights.find((i) => !i.isDismissed) || aiInsights[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      <Sidebar onOpenAddExpense={() => setIsAddModalOpen(true)} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* TOP GREETING BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="space-y-1 z-10">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {getGreeting()}, {user.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Here’s your financial overview and real-time AI spending report.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <button
              onClick={() => setCurrentPage('ai-assistant')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Ask AI Assistant
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Monthly Income */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Monthly Income</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white">{formatCurrency(totalIncome)}</div>
            <span className="text-[11px] text-emerald-400 font-medium">Regular Credited Salary</span>
          </div>

          {/* Total Expenses */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Total Expenses</span>
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-rose-400">{formatCurrency(totalExpenses)}</div>
            <span className="text-[11px] text-slate-400 font-medium">{spendingPercentage}% of income spent</span>
          </div>

          {/* Available Balance */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Available Balance</span>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-300">{formatCurrency(availableBalance)}</div>
            <span className="text-[11px] text-emerald-400 font-medium">Positive Cash Flow</span>
          </div>

          {/* Current Savings */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Total Savings</span>
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <PiggyBank className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-teal-300">{formatCurrency(user.currentSavings)}</div>
            <span className="text-[11px] text-teal-400 font-medium">Accumulated Assets</span>
          </div>

          {/* Budget Remaining */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Budget Remaining</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-amber-300">{formatCurrency(budgetRemaining)}</div>
            <span className="text-[11px] text-amber-400 font-medium">Under Target Cap</span>
          </div>
        </div>

        {/* MONTHLY SPENDING PROGRESS BAR */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-200">Monthly Spending Velocity Cap</span>
            <span className="text-emerald-400">
              {formatCurrency(totalExpenses)} / {formatCurrency(totalIncome)} ({spendingPercentage}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                spendingPercentage > 85
                  ? 'bg-rose-500'
                  : spendingPercentage > 65
                  ? 'bg-amber-500'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500'
              }`}
              style={{ width: `${spendingPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>₹0 Start</span>
            <span>Recommended Limit: {formatCurrency(totalIncome * 0.75)}</span>
            <span>Max Salary: {formatCurrency(totalIncome)}</span>
          </div>
        </div>

        {/* AI INSIGHT HIGHLIGHT BANNER */}
        {topAIInsight && (
          <AIRecommendationCard
            insight={topAIInsight}
            onApply={applyInsight}
            onDismiss={dismissInsight}
          />
        )}

        {/* CHARTS GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expense Donut Chart Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Expense Breakdown</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                Category Shares
              </span>
            </div>
            <ExpenseDonutChart budgets={categoryBudgets} />
          </div>

          {/* Income vs Expenses Bar Chart */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Income vs Expenses</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Monthly Comparison
              </span>
            </div>
            <IncomeExpenseBarChart />
          </div>

          {/* Spending Trend Line Chart */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Spending Trend</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                Weekly Velocity
              </span>
            </div>
            <SpendingTrendChart />
          </div>
        </div>

        {/* RECENT TRANSACTIONS TABLE */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-white">Recent Transactions</h3>
              <p className="text-xs text-slate-400">
                Showing last logged activity across your linked accounts
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('expense-tracker')}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              View All Expenses →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {transactions.slice(0, 5).map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{tx.date}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-200">{tx.description}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-800">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{tx.paymentMethod}</td>
                    <td
                      className={`py-3.5 px-4 text-right font-black ${
                        tx.type === 'expense' ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {tx.type === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingTransaction(tx)}
                          className="p-1 rounded text-slate-400 hover:text-indigo-300 hover:bg-slate-800"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Transaction Modal */}
      <ExpenseFormModal
        isOpen={isAddModalOpen || !!editingTransaction}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingTransaction(null);
        }}
        editData={editingTransaction}
      />

      <ToastContainer />
    </div>
  );
};
