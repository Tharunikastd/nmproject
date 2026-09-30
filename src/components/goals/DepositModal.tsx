import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { FinancialGoal } from '../../types';

import { X, PiggyBank, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DepositModalProps {
  goal: FinancialGoal | null;
  onClose: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ goal, onClose }) => {
  const { depositToGoal, formatCurrency } = useApp();
  const [amount, setAmount] = useState('');

  if (!goal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) {
      depositToGoal(goal.id, val);

      // Trigger confetti animation if goal is reached!
      if (goal.currentSavings + val >= goal.targetAmount) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-sm rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Add Savings Contribution</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
          <div className="text-slate-400">Target Goal:</div>
          <div className="font-bold text-slate-100 text-sm">{goal.name}</div>
          <div className="flex justify-between text-[11px] text-slate-400 pt-1">
            <span>Target: {formatCurrency(goal.targetAmount)}</span>
            <span>Saved: {formatCurrency(goal.currentSavings)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Deposit Amount (₹)</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Add Savings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
