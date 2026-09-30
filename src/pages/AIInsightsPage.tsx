import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/layout/Sidebar';
import { ToastContainer } from '../components/layout/ToastContainer';
import { AIRecommendationCard } from '../components/common/AIRecommendationCard';
import type { PriorityLevel } from '../types';
import {
  Sparkles,
  ShieldAlert,
  PiggyBank,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';


export const AIInsightsPage: React.FC = () => {
  const { aiInsights, applyInsight, dismissInsight, user, transactions, formatCurrency } = useApp();
  const [priorityFilter, setPriorityFilter] = useState<'All' | PriorityLevel>('All');

  // Compute key insight figures
  const foodExpense = transactions
    .filter((t) => t.category === 'Food' && t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = Math.round(((user.monthlyIncome - totalExpense) / user.monthlyIncome) * 100);

  const filteredInsights = aiInsights.filter(
    (i) => priorityFilter === 'All' || i.priority === priorityFilter
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <h1 className="text-2xl font-extrabold text-white">AI Financial Insights</h1>
            </div>
            <p className="text-xs text-slate-400">
              Algorithmic spending diagnosis, anomaly detection, and priority-ranked savings strategies.
            </p>
          </div>

          {/* Priority filter buttons */}
          <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800">
            {(['All', 'High', 'Medium', 'Low'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  priorityFilter === p
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* SUMMARY INSIGHT TILES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Spending Insights Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm border-b border-slate-800 pb-3">
              <ShieldAlert className="w-5 h-5" /> Spending Insights
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Highest Category:</span>
                <span className="font-bold text-white">Rent ({formatCurrency(18000)})</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Variable Expense:</span>
                <span className="font-bold text-amber-300">Food ({formatCurrency(foodExpense)})</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Unusual Spikes:</span>
                <span className="font-bold text-rose-400">Shopping +18%</span>
              </div>
            </div>
          </div>

          {/* Savings Insights Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm border-b border-slate-800 pb-3">
              <PiggyBank className="w-5 h-5" /> Savings Insights
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Current Savings Rate:</span>
                <span className="font-bold text-emerald-400 text-sm">{savingsRate}%</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Suggested Monthly SIP:</span>
                <span className="font-bold text-teal-300">{formatCurrency(18000)}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Savings Trend:</span>
                <span className="font-bold text-emerald-300">📈 Upwards (+₹2,500)</span>
              </div>
            </div>
          </div>

          {/* AI Strategy Advice Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm border-b border-slate-800 pb-3">
              <Lightbulb className="w-5 h-5" /> Recommended Actions
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Reduce unnecessary digital subscriptions (Save ~₹450)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Set a weekly food dining budget cap of ₹1,500</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Increase Emergency Fund allocation by ₹2,000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* INSIGHTS CARDS LIST */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-lg text-white">Active AI Recommendations</h3>
          {filteredInsights.length === 0 ? (
            <div className="glass-panel p-8 text-center text-slate-400 text-sm rounded-2xl">
              No recommendations matching the selected priority level.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInsights.map((insight) => (
                <AIRecommendationCard
                  key={insight.id}
                  insight={insight}
                  onApply={applyInsight}
                  onDismiss={dismissInsight}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};
