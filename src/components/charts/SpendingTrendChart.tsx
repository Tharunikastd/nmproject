import React from 'react';
import { useApp } from '../../context/AppContext';

export const SpendingTrendChart: React.FC = () => {
  const { formatCurrency } = useApp();

  const points = [
    { day: 'Week 1', amount: 18500 },
    { day: 'Week 2', amount: 6400 },
    { day: 'Week 3', amount: 9200 },
    { day: 'Week 4', amount: 9520 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Current Month Trajectory</span>
        <span className="font-semibold text-indigo-400">Average: ₹10,905 / week</span>
      </div>

      <div className="relative h-44 w-full flex items-end">
        <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Background grid lines */}
          <line x1="0" y1="20" x2="400" y2="20" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
          <line x1="0" y1="70" x2="400" y2="70" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
          <line x1="0" y1="120" x2="400" y2="120" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />

          {/* Area polygon */}
          <polygon
            points="0,150 0,30 133,110 266,85 400,82 400,150"
            fill="url(#areaGradient)"
          />

          {/* Smooth path */}
          <path
            d="M 0 30 L 133 110 L 266 85 L 400 82"
            fill="none"
            stroke="#6366f1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Interactive dots */}
          <circle cx="0" cy="30" r="5" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
          <circle cx="133" cy="110" r="5" fill="#6366f1" stroke="#0f172a" strokeWidth="2" />
          <circle cx="266" cy="85" r="5" fill="#6366f1" stroke="#0f172a" strokeWidth="2" />
          <circle cx="400" cy="82" r="5" fill="#06b6d4" stroke="#0f172a" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex justify-between text-xs font-semibold text-slate-400 px-1 pt-1">
        {points.map((p) => (
          <div key={p.day} className="flex flex-col items-center">
            <span>{p.day}</span>
            <span className="text-[10px] text-slate-300 font-normal">{formatCurrency(p.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
