import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, Sparkles, ArrowRight, Lock, Mail, User as UserIcon, CheckCircle2 } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { authMode, setAuthMode, setIsLoggedIn, setCurrentPage, updateUserProfile, addToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const isSignUp = authMode === 'signup';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    if (isSignUp) {
      if (!fullName.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      updateUserProfile({ name: fullName, email, isOnboarded: false });
      setIsLoggedIn(true);
      addToast(`Welcome to PocketSmart AI, ${fullName}!`, 'success');
      setCurrentPage('onboarding');
    } else {
      // Login flow
      if (fullName.trim()) {
        updateUserProfile({ name: fullName, email });
      }
      setIsLoggedIn(true);
      addToast('Welcome back to PocketSmart AI!', 'success');
      setCurrentPage('dashboard');
    }
  };

  const handleDemoLogin = () => {
    setIsLoggedIn(true);
    addToast('Logged in as Demo User (Arjun Verma)', 'success');
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background glow ambient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div
        onClick={() => setCurrentPage('landing')}
        className="flex items-center gap-3 cursor-pointer mb-8 group"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-2xl text-white tracking-tight">PocketSmart</span>
          <span className="text-xs text-indigo-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" /> AI Assistant Platform
          </span>
        </div>
      </div>

      {/* Auth Card */}
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative z-10 space-y-6">
        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setError('');
            }}
            className={`py-2.5 text-sm font-bold rounded-xl transition-all ${
              !isSignUp
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setError('');
            }}
            className={`py-2.5 text-sm font-bold rounded-xl transition-all ${
              isSignUp
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl font-extrabold text-white">
            {isSignUp ? 'Create your PocketSmart account' : 'Welcome back'}
          </h2>
          <p className="text-xs text-slate-400">
            {isSignUp
              ? 'Start managing your budget with AI recommendations'
              : 'Enter your credentials to access your dashboard'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Arjun Verma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                placeholder="arjun.verma@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {!isSignUp && (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-800 text-indigo-600 focus:ring-0"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => addToast('Password reset link sent to email address.', 'info')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-400 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {isSignUp ? 'Create Account & Continue' : 'Login to Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative pt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-950 px-2 text-slate-500">Instant Demo Access</span>
          </div>
        </div>

        <button
          onClick={handleDemoLogin}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-800 hover:text-white transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          1-Click Demo Login (Pre-filled Data)
        </button>
      </div>
    </div>
  );
};
