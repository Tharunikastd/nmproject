import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/layout/Sidebar';
import { ToastContainer } from '../components/layout/ToastContainer';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Calendar,
} from 'lucide-react';


export const ReportsPage: React.FC = () => {
  const { user, transactions, categoryBudgets, formatCurrency, addToast } = useApp();

  const [selectedMonth, setSelectedMonth] = useState('September 2026');

  const totalIncome = user.monthlyIncome;
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const netSavings = Math.max(0, totalIncome - totalExpenses);
  const savingsRate = Math.round((netSavings / totalIncome) * 100);

  const handleDownloadReport = () => {
    window.print();
    addToast('Opening printable report preview...', 'info');
  };

  const handleExportCSV = () => {
    // Generate real CSV header and rows from transactions
    const headers = ['ID', 'Date', 'Description', 'Category', 'Payment Method', 'Type', 'Amount (INR)'];
    const rows = transactions.map((t) => [
      t.id,
      t.date,
      `"${t.description.replace(/"/g, '""')}"`,
      t.category,
      t.paymentMethod,
      t.type,
      t.amount,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PocketSmart_Report_${selectedMonth.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Exported CSV report successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto printable-area">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6 text-purple-400" />
              <h1 className="text-2xl font-extrabold text-white">Monthly Financial Reports</h1>
            </div>
            <p className="text-xs text-slate-400">
              Download formal financial summary statements and export transaction ledger data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <Calendar className="w-4 h-4 text-slate-400" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none"
              >
                <option value="September 2026">September 2026</option>
                <option value="August 2026">August 2026</option>
                <option value="July 2026">July 2026</option>
              </select>
            </div>

            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              Print / Save PDF
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* REPORT SUMMARY STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400">Total Monthly Income</span>
            <div className="text-2xl font-black text-white">{formatCurrency(totalIncome)}</div>
            <div className="text-[11px] text-emerald-400 font-medium">100% Account Inflow</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400">Total Monthly Expenses</span>
            <div className="text-2xl font-black text-rose-400">{formatCurrency(totalExpenses)}</div>
            <div className="text-[11px] text-slate-400 font-medium">
              {((totalExpenses / totalIncome) * 100).toFixed(1)}% of Income
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400">Net Retained Savings</span>
            <div className="text-2xl font-black text-emerald-400">{formatCurrency(netSavings)}</div>
            <div className="text-[11px] text-emerald-400 font-medium">Liquid Surplus</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400">Savings Percentage</span>
            <div className="text-2xl font-black text-indigo-300">{savingsRate}%</div>
            <div className="text-[11px] text-indigo-400 font-medium">Target Benchmark: 20%+</div>
          </div>
        </div>

        {/* CATEGORY SPENDING BREAKDOWN TABLE */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-lg text-white">Category Spending Statement ({selectedMonth})</h3>
            <span className="text-xs text-slate-400 font-mono">USER: {user.name}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Allocated Limit</th>
                  <th className="py-3 px-4 text-right">Actual Spent</th>
                  <th className="py-3 px-4 text-right">Variance</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {categoryBudgets.map((b) => {
                  const variance = b.allocatedAmount - b.spentAmount;
                  const isOver = variance < 0;

                  return (
                    <tr key={b.category} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-200">{b.category}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                        {formatCurrency(b.allocatedAmount)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-100">
                        {formatCurrency(b.spentAmount)}
                      </td>
                      <td
                        className={`py-3.5 px-4 text-right font-mono font-bold ${
                          isOver ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {isOver ? '-' : '+'}{formatCurrency(Math.abs(variance))}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isOver
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {isOver ? 'Over Limit' : 'Within Budget'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MONTH TO MONTH COMPARATIVE METRICS */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-lg text-white">Month-to-Month Comparative Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400">August vs September Expenses</span>
              <div className="text-lg font-bold text-emerald-400">-₹4,380 (-9.1%)</div>
              <p className="text-[11px] text-slate-400">Great reduction in dining expenses!</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400">Goal Savings Rate</span>
              <div className="text-lg font-bold text-indigo-300">+4.2% Growth</div>
              <p className="text-[11px] text-slate-400">Higher proportion shifted to emergency fund.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400">Budget Health Index</span>
              <div className="text-lg font-bold text-emerald-400">92 / 100 (Optimal)</div>
              <p className="text-[11px] text-slate-400">Low debt burden and high liquidity.</p>
            </div>
          </div>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};
