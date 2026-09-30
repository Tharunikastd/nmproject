import React, { useState } from 'react';
import type { CategoryBudget } from '../../types';
import { useApp } from '../../context/AppContext';


interface ExpenseDonutChartProps {
  budgets: CategoryBudget[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Rent: '#6366f1', // Indigo
  Food: '#10b981', // Emerald
  Bills: '#f59e0b', // Amber
  Transportation: '#06b6d4', // Cyan
  Shopping: '#ec4899', // Pink
  Entertainment: '#a855f7', // Purple
  Education: '#3b82f6', // Blue
  Health: '#ef4444', // Red
  Savings: '#14b8a6', // Teal
  Other: '#64748b', // Slate
};

export const ExpenseDonutChart: React.FC<ExpenseDonutChartProps> = ({ budgets }) => {
  const { formatCurrency } = useApp();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const activeBudgets = budgets.filter((b) => b.spentAmount > 0);
  const totalSpent = activeBudgets.reduce((sum, b) => sum + b.spentAmount, 0);

  if (totalSpent === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-sm">
        <p>No expense data recorded yet for this period.</p>
      </div>
    );
  }

  // Calculate SVG arc paths for donut
  let cumulativeAngle = 0;
  const radius = 70;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  const slices = activeBudgets.map((b) => {
    const percentage = (b.spentAmount / totalSpent) * 100;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativeAngle / 100) * circumference);
    cumulativeAngle += percentage;
    const color = CATEGORY_COLORS[b.category] || '#94a3b8';

    return {
      category: b.category,
      amount: b.spentAmount,
      percentage: percentage.toFixed(1),
      strokeDasharray,
      strokeDashoffset,
      color,
    };
  });

  const activeItem = slices.find((s) => s.category === hoveredCategory) || slices[0];

  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-6">
      {/* SVG Donut */}
      <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
          {slices.map((slice) => (
            <circle
              key={slice.category}
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke={slice.color}
              strokeWidth={strokeWidth}
              strokeDasharray={slice.strokeDasharray}
              strokeDashoffset={slice.strokeDashoffset}
              className="transition-all duration-300 cursor-pointer hover:opacity-80"
              onMouseEnter={() => setHoveredCategory(slice.category)}
              onMouseLeave={() => setHoveredCategory(null)}
            />
          ))}
        </svg>

        {/* Donut Center Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            {hoveredCategory ? hoveredCategory : 'Total Spent'}
          </span>
          <span className="text-base font-extrabold text-white mt-0.5">
            {formatCurrency(hoveredCategory ? activeItem.amount : totalSpent)}
          </span>
          {hoveredCategory && (
            <span className="text-xs font-semibold text-emerald-400">
              {activeItem.percentage}%
            </span>
          )}
        </div>
      </div>

      {/* Legend list */}
      <div className="w-full max-w-xs space-y-2 overflow-y-auto max-h-56 pr-1">
        {slices.map((slice) => (
          <div
            key={slice.category}
            onMouseEnter={() => setHoveredCategory(slice.category)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer ${
              hoveredCategory === slice.category
                ? 'bg-slate-800 border border-slate-700'
                : 'hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: slice.color }}
              />
              <span className="font-medium text-slate-200">{slice.category}</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-slate-100">{formatCurrency(slice.amount)}</span>
              <span className="text-slate-400 text-[10px]">({slice.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
