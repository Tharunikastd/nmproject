import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/layout/Sidebar';
import { ToastContainer } from '../components/layout/ToastContainer';
import {
  User,
  Settings,
  Bell,
  Coins,
  ShieldCheck,
  RotateCcw,
  Check,
  Mail,
  Briefcase,
} from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const { user, updateUserProfile, resetToDemoData, addToast } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age.toString());
  const [occupation, setOccupation] = useState(user.occupation);
  const [monthlyIncome, setMonthlyIncome] = useState(user.monthlyIncome.toString());
  const [preferredCurrency, setPreferredCurrency] = useState(user.preferredCurrency || '₹');
  const [budgetReminders, setBudgetReminders] = useState(user.budgetReminders);
  const [notificationsEnabled, setNotificationsEnabled] = useState(user.notificationsEnabled);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      age: parseInt(age) || 26,
      occupation,
      monthlyIncome: parseFloat(monthlyIncome) || 75000,
      preferredCurrency,
      budgetReminders,
      notificationsEnabled,
    });
    addToast('Profile & settings updated successfully!', 'success');
  };


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-indigo-400" />
              <h1 className="text-2xl font-extrabold text-white">Profile & Application Settings</h1>
            </div>
            <p className="text-xs text-slate-400">
              Update personal details, currency display preferences, security, and budget notification rules.
            </p>
          </div>
        </div>

        {/* PROFILE INFORMATION FORM */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg text-white">Personal Information</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Occupation</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Default Salary (₹)</label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:shadow-lg shadow-emerald-500/20"
              >
                <Check className="w-4 h-4" /> Save Profile Details
              </button>
            </div>
          </form>
        </div>

        {/* APPLICATION PREFERENCES */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Coins className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-lg text-white">App Preferences</h3>
          </div>

          <div className="space-y-4 text-sm">
            {/* Preferred Currency */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Preferred Currency Symbol</span>
                <span className="text-xs text-slate-400">Choose display symbol for dashboard metrics</span>
              </div>
              <select
                value={preferredCurrency}
                onChange={(e) => setPreferredCurrency(e.target.value)}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="₹">₹ (Indian Rupee - INR)</option>
                <option value="$">$ (US Dollar - USD)</option>
                <option value="€">€ (Euro - EUR)</option>
                <option value="£">£ (British Pound - GBP)</option>
              </select>
            </div>

            {/* Monthly Budget Reminder Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="font-bold text-white block">Monthly Budget Reminders</span>
                  <span className="text-xs text-slate-400">Receive alerts when categories hit 80% limit</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={budgetReminders}
                onChange={(e) => setBudgetReminders(e.target.checked)}
                className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0 cursor-pointer"
              />
            </div>

            {/* Notifications Enabled */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="font-bold text-white block">Smart AI Notifications</span>
                  <span className="text-xs text-slate-400">Enable automated smart tips in toast messages</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* SYSTEM RESET ZONE */}
        <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 space-y-4 bg-rose-950/10">
          <div className="flex items-center gap-2 text-rose-400 font-bold">
            <RotateCcw className="w-5 h-5" /> Reset Demo Environment State
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Want to test the app from scratch or re-populate initial demonstration dataset? Clicking reset restores all transactions, budgets, goals, and chat context.
          </p>
          <button
            onClick={resetToDemoData}
            className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-colors shadow-md shadow-rose-600/30"
          >
            Reset All Application Data to Demo Defaults
          </button>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};
