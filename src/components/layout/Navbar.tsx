import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wallet, Sparkles, Menu, X, ArrowRight, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, isLoggedIn, setAuthMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    if (currentPage !== 'landing') {
      setCurrentPage('landing');
    }
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setCurrentPage('auth');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => handleNavClick()}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  PocketSmart
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" /> AI
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick()}
              className="hover:text-emerald-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="hover:text-emerald-400 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="hover:text-emerald-400 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-emerald-400 transition-colors"
            >
              About
            </button>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <User className="w-4 h-4" />
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleAuth('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuth('signup')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick()}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            About
          </button>
          <div className="pt-4 border-t border-slate-800 space-y-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setCurrentPage('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleAuth('login')}
                  className="w-full py-2.5 text-center font-semibold text-slate-300 hover:text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuth('signup')}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-center"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
