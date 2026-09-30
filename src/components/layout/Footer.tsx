import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wallet, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand info */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg text-white">PocketSmart AI</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Your intelligent personal finance companion. Track budgets, optimize spending, save for goals, and leverage AI financial insights.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Powered by Smart Financial Algorithms
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentPage('auth')} className="hover:text-emerald-400 transition-colors">
                AI Budget Planner
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('auth')} className="hover:text-emerald-400 transition-colors">
                Expense Tracker
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('auth')} className="hover:text-emerald-400 transition-colors">
                Financial Goal Tracker
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('auth')} className="hover:text-emerald-400 transition-colors">
                Smart Monthly Reports
              </button>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
            <li><a href="#features" className="hover:text-emerald-400 transition-colors">Smart AI Assistant</a></li>
            <li><a href="#about" className="hover:text-emerald-400 transition-colors">50/30/20 Rule Guide</a></li>
            <li><a href="#features" className="hover:text-emerald-400 transition-colors">Privacy & Data Protection</a></li>
          </ul>
        </div>

        {/* Security / Disclaimer */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Trust & Security
          </h4>
          <p className="text-xs leading-relaxed text-slate-400">
            All user financial profile data is stored locally in your client device browser with bank-grade local encryption principles.
          </p>
          <div className="mt-3 text-[11px] text-slate-400 border-l-2 border-indigo-500/50 pl-2 py-1">
            Disclaimer: AI suggestions are for educational purposes and financial awareness only, not certified financial advice.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          © {new Date().getFullYear()} PocketSmart AI – Your Smart Budget & Recommendation Assistant. All rights reserved.
        </div>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Security</span>
        </div>
      </div>
    </footer>
  );
};
