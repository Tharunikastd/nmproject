import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/layout/Sidebar';
import { ToastContainer } from '../components/layout/ToastContainer';
import { OptimizeBudgetModal } from '../components/budget/OptimizeBudgetModal';
import type { Category } from '../types';
import {
  PieChart,
  Sparkles,
  AlertTriangle,
  Sliders,
} from 'lucide-react';


export const BudgetPlannerPage: React.FC = () => {
  const { user, categoryBudgets, updateCategoryBudget, formatCurrency } = useApp();
  const [isOptimizeOpen, setIsOptimizeOpen] = useState(false);

  const totalIncome = user.monthlyIncome;
  const needsBudget = totalIncome * 0.5; // 50% Needs
  const wantsBudget = totalIncome * 0.3; // 30% Wants
  const savingsBudget = totalIncome * 0.2; // 20% Savings

  const totalAllocated = categoryBudgets.reduce((sum, b) => sum + b.allocatedAmount, 0);
  const totalSpent = categoryBudgets.reduce((sum, b) => sum + b.spentAmount, 0);
  const remainingUnallocated = totalIncome - totalAllocated;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <PieChart className="w-6 h-6 text-indigo-400" />
              <h1 className="text-2xl font-extrabold text-white">Monthly Budget Planner</h1>
            </div>
            <p className="text-xs text-slate-400">
              Set spending limits per category and let AI align your budget with the 50/30/20 rule.
            </p>
          </div>

          <button
            onClick={() => setIsOptimizeOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            Optimize My Budget
          </button>
        </div>

        {/* 50/30/20 SUMMARY TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400">Total Income</span>
            <div className="text-2xl font-black text-white">{formatCurrency(totalIncome)}</div>
            <span className="text-[11px] text-emerald-400">Monthly Revenue</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400">50% Essential Needs</span>
            <div className="text-2xl font-black text-indigo-300">{formatCurrency(needsBudget)}</div>
            <span className="text-[11px] text-slate-400">Rent, Bills, Medicine</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400">30% Lifestyle Wants</span>
            <div className="text-2xl font-black text-teal-300">{formatCurrency(wantsBudget)}</div>
            <span className="text-[11px] text-slate-400">Dining, Shopping, Movies</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400">20% Goal Savings</span>
            <div className="text-2xl font-black text-emerald-400">{formatCurrency(savingsBudget)}</div>
            <span className="text-[11px] text-emerald-400">SIP, Emergency Fund</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400">Unallocated Cash</span>
            <div
              className={`text-2xl font-black ${
                remainingUnallocated >= 0 ? 'text-amber-300' : 'text-rose-400'
              }`}
            >
              {formatCurrency(remainingUnallocated)}
            </div>
            <span className="text-[11px] text-slate-400">Available to allocate</span>
          </div>
        </div>

        {/* CATEGORY BUDGET LIMIT ADJUSTER CARDS */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-lg text-white">Category Budget Limits</h3>
            </div>
            <div className="text-xs text-slate-400">
              Total Spent: <span className="font-bold text-rose-400">{formatCurrency(totalSpent)}</span> /{' '}
              <span className="font-bold text-emerald-400">{formatCurrency(totalAllocated)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryBudgets.map((item) => {
              const isOverBudget = item.spentAmount > item.allocatedAmount;
              const usedPercentage = Math.min(
                100,
                Math.round((item.spentAmount / (item.allocatedAmount || 1)) * 100)
              );

              return (
                <div
                  key={item.category}
                  className={`p-5 rounded-2xl bg-slate-900 border transition-all ${
                    isOverBudget ? 'border-rose-500/50 bg-rose-950/20' : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-200">{item.category}</span>
                      {isOverBudget && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          <AlertTriangle className="w-3 h-3 text-rose-400" /> Over Budget
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400">Limit:</span>
                      <input
                        type="number"
                        value={item.allocatedAmount}
                        onChange={(e) =>
                          updateCategoryBudget(
                            item.category as Category,
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-24 px-2 py-1 text-right text-xs font-bold font-mono rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">Spent: {formatCurrency(item.spentAmount)}</span>
                      <span className={isOverBudget ? 'text-rose-400 font-extrabold' : 'text-slate-300'}>
                        {usedPercentage}% used
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isOverBudget ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-500 to-indigo-500'
                        }`}
                        style={{ width: `${usedPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                      <span>
                        Remaining:{' '}
                        <strong className={isOverBudget ? 'text-rose-400' : 'text-emerald-400'}>
                          {formatCurrency(Math.max(0, item.allocatedAmount - item.spentAmount))}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <OptimizeBudgetModal isOpen={isOptimizeOpen} onClose={() => setIsOptimizeOpen(false)} />
      <ToastContainer />
    </div>
  );
};
