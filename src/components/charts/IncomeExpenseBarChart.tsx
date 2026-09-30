import React from 'react';
import { useApp } from '../../context/AppContext';

export const IncomeExpenseBarChart: React.FC = () => {
  const { formatCurrency } = useApp();

  const data = [
    { month: 'Jun', income: 70000, expense: 41000 },
    { month: 'Jul', income: 72000, expense: 45000 },
    { month: 'Aug', income: 75000, expense: 48000 },
    { month: 'Sep', income: 75000, expense: 43620 },
  ];

  const maxVal = 85000;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-6 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-emerald-500 shadow-sm shadow-emerald-500/30" />
          <span className="text-slate-300">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-indigo-500 shadow-sm shadow-indigo-500/30" />
          <span className="text-slate-300">Expenses</span>
        </div>
      </div>

      <div className="h-52 flex items-end justify-between gap-4 pt-4 border-b border-slate-800">
        {data.map((item) => {
          const incomeHeightPercent = (item.income / maxVal) * 100;
          const expenseHeightPercent = (item.expense / maxVal) * 100;

          return (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="flex items-end gap-2 w-full justify-center h-full max-w-[80px]">
                {/* Income Bar */}
                <div
                  className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg transition-all duration-500 relative group/bar hover:brightness-110"
                  style={{ height: `${incomeHeightPercent}%` }}
                >
                  <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold pointer-events-none whitespace-nowrap border border-emerald-500/30 shadow-lg z-10">
                    {formatCurrency(item.income)}
                  </div>
                </div>

                {/* Expense Bar */}
                <div
                  className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-500 relative group/bar hover:brightness-110"
                  style={{ height: `${expenseHeightPercent}%` }}
                >
                  <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-indigo-300 px-2 py-0.5 rounded text-[10px] font-bold pointer-events-none whitespace-nowrap border border-indigo-500/30 shadow-lg z-10">
                    {formatCurrency(item.expense)}
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
