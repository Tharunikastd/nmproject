import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/layout/Sidebar';
import { ToastContainer } from '../components/layout/ToastContainer';
import { AddGoalModal } from '../components/goals/AddGoalModal';
import { DepositModal } from '../components/goals/DepositModal';
import type { FinancialGoal } from '../types';

import {
  Target,
  Plus,
  Sparkles,
  PiggyBank,
  Calendar,
  Trash2,
  CheckCircle2,
  Laptop,
  Car,
  GraduationCap,
  Plane,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

export const GoalsPage: React.FC = () => {
  const { goals, deleteGoal, formatCurrency } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDepositGoal, setSelectedDepositGoal] = useState<FinancialGoal | null>(null);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Emergency Fund':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Vehicle':
        return <Car className="w-5 h-5 text-cyan-400" />;
      case 'Education':
        return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case 'Travel':
        return <Plane className="w-5 h-5 text-amber-400" />;
      case 'Gadgets':
        return <Laptop className="w-5 h-5 text-purple-400" />;
      default:
        return <Smartphone className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-emerald-400" />
              <h1 className="text-2xl font-extrabold text-white">Financial Goals Dashboard</h1>
            </div>
            <p className="text-xs text-slate-400">
              Track progress on your major purchases, emergency funds, and investment targets.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            + Create New Goal
          </button>
        </div>

        {/* GOALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const percentage = Math.min(
              100,
              Math.round((goal.currentSavings / goal.targetAmount) * 100)
            );
            const remaining = Math.max(0, goal.targetAmount - goal.currentSavings);
            const isCompleted = percentage >= 100;

            return (
              <div
                key={goal.id}
                className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5 relative overflow-hidden hover:border-slate-700 transition-all shadow-xl group"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      {getCategoryIcon(goal.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {goal.category}
                        </span>
                        {isCompleted && (
                          <span className="flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Goal Achieved!
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-white text-lg mt-1">{goal.name}</h3>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Remove Goal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar & Amount Row */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between text-xs">
                    <div>
                      <span className="text-2xl font-black text-white">
                        {formatCurrency(goal.currentSavings)}
                      </span>
                      <span className="text-slate-400 text-xs ml-1">
                        / {formatCurrency(goal.targetAmount)} goal
                      </span>
                    </div>
                    <span className="font-extrabold text-emerald-400 text-base">{percentage}%</span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isCompleted
                          ? 'bg-emerald-400 shadow-md shadow-emerald-400/50'
                          : 'bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>Remaining: {formatCurrency(remaining)}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" /> Target Date: {goal.targetDate}
                    </span>
                  </div>
                </div>

                {/* AI Savings Recommendation Banner */}
                <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3 text-xs text-slate-300">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-indigo-300 block mb-0.5">AI Goal Recommendation:</span>
                    <span>
                      "To reach your target comfortably, save approximately{' '}
                      <strong className="text-emerald-400">{formatCurrency(goal.monthlyRecommendation)}</strong> per month."
                    </span>
                  </div>
                </div>

                {/* Deposit Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedDepositGoal(goal)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-slate-800 transition-all shadow-sm"
                  >
                    <PiggyBank className="w-4 h-4 text-emerald-400" />
                    + Add Savings Contribution
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <AddGoalModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <DepositModal goal={selectedDepositGoal} onClose={() => setSelectedDepositGoal(null)} />
      <ToastContainer />
    </div>
  );
};
