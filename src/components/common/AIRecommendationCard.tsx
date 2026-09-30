import React from 'react';
import type { AIInsight, PriorityLevel } from '../../types';

import { Sparkles, ArrowRight, X, AlertTriangle, Lightbulb, ShieldAlert, Check } from 'lucide-react';

interface AIRecommendationCardProps {
  insight: AIInsight;
  onApply?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  insight,
  onApply,
  onDismiss,
}) => {
  const getPriorityStyle = (priority: PriorityLevel) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Low':
      default:
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      case 'spending':
        return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'savings':
        return <Check className="w-5 h-5 text-emerald-400" />;
      default:
        return <Lightbulb className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800/90 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300 shadow-md">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            {getIcon(insight.type)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-2.5 h-2.5 text-emerald-400" /> AI Insight
              </span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getPriorityStyle(insight.priority)}`}>
                {insight.priority} Priority
              </span>
            </div>
            <h4 className="font-bold text-slate-100 text-base mt-1 leading-snug">{insight.title}</h4>
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={() => onDismiss(insight.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            title="Dismiss Insight"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-sm text-slate-300 leading-relaxed mb-4">{insight.description}</p>

      {insight.actionText && onApply && (
        <div className="flex items-center justify-end pt-2 border-t border-slate-800/60">
          <button
            onClick={() => onApply(insight.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/30 text-indigo-200 text-xs font-bold border border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            {insight.actionText}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
