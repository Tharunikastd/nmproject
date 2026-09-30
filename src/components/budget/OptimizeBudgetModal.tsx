import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, Check, ArrowRight } from 'lucide-react';

interface OptimizeBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OptimizeBudgetModal: React.FC<OptimizeBudgetModalProps> = ({ isOpen, onClose }) => {
  const { optimizeBudgetAI } = useApp();


  if (!isOpen) return null;

  const handleApply = () => {
    optimizeBudgetAI();
    onClose();
  };

  const suggestions = [
    { category: 'Shopping', current: '₹4,000', proposed: '₹3,000', change: '-₹1,000', note: 'Reduces impulse e-commerce buying' },
    { category: 'Entertainment', current: '₹2,500', proposed: '₹2,000', change: '-₹500', note: 'Limits cinema and streaming add-ons' },
    { category: 'Food & Dining', current: '₹7,000', proposed: '₹6,500', change: '-₹500', note: 'Encourages home cooking on weeknights' },
    { category: 'Emergency Savings', current: '₹15,000', proposed: '₹17,500', change: '+₹2,500', note: 'Accelerates emergency fund timeline by 2 months!' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-lg text-white">PocketSmart AI Budget Optimization</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-xl bg-indigo-950/50 border border-indigo-500/30 space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            AI Strategy Recommendation
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            By shifting ₹2,000 from discretionary Shopping and Entertainment into Emergency Savings, your total monthly savings rate improves from **24% to 30%** without affecting essential living needs!
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Proposed Adjustments:</h4>
          {suggestions.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs"
            >
              <div>
                <span className="font-bold text-slate-200 block">{item.category}</span>
                <span className="text-[11px] text-slate-400">{item.note}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-400 line-through">{item.current}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="font-bold text-emerald-400">{item.proposed}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${item.change.startsWith('+') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white rounded-xl"
          >
            Decline Suggestions
          </button>
          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <Check className="w-4 h-4" />
            Apply Optimized Budget
          </button>
        </div>
      </div>
    </div>
  );
};
