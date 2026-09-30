import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { PageView } from '../../context/AppContext';
import {
  LayoutDashboard,
  Bot,
  PieChart,
  Receipt,
  Target,
  Sparkles,
  FileSpreadsheet,
  Settings,
  LogOut,
  Wallet,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  RotateCcw,
} from 'lucide-react';

interface SidebarProps {
  onOpenAddExpense?: () => void;
}

interface NavItem {
  id: PageView;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenAddExpense }) => {
  const { currentPage, setCurrentPage, setIsLoggedIn, user, resetToDemoData } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'ai-assistant', label: 'AI Assistant', icon: <Bot className="w-5 h-5 text-cyan-400" />, badge: 'AI' },
    { id: 'budget-planner', label: 'Budget Planner', icon: <PieChart className="w-5 h-5" /> },
    { id: 'expense-tracker', label: 'Expenses', icon: <Receipt className="w-5 h-5" /> },
    { id: 'financial-goals', label: 'Financial Goals', icon: <Target className="w-5 h-5 text-emerald-400" /> },
    { id: 'ai-insights', label: 'AI Insights', icon: <Sparkles className="w-5 h-5 text-amber-400" /> },
    { id: 'reports', label: 'Reports', icon: <FileSpreadsheet className="w-5 h-5" /> },
    { id: 'profile-settings', label: 'Profile & Settings', icon: <Settings className="w-5 h-5" /> },
  ];


  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col justify-between glass-panel border-r border-slate-800 transition-all duration-300 z-30 ${
          collapsed ? 'w-20' : 'w-64'
        } min-h-screen sticky top-0`}
      >
        <div className="flex flex-col h-full">
          {/* Top Logo Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800/80">
            {!collapsed && (
              <div
                onClick={() => setCurrentPage('landing')}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center shadow-md">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-100 text-base leading-tight">PocketSmart</span>
                  <span className="text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-emerald-400" /> AI Edition
                  </span>
                </div>
              </div>
            )}
            {collapsed && (
              <div
                onClick={() => setCurrentPage('landing')}
                className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center cursor-pointer"
              >
                <Wallet className="w-5 h-5 text-white" />
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Action Button */}
          {onOpenAddExpense && (
            <div className="p-3">
              <button
                onClick={onOpenAddExpense}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all ${
                  collapsed ? 'px-0' : 'px-3'
                }`}
                title="Add Expense"
              >
                <PlusCircle className="w-4 h-4 shrink-0" />
                {!collapsed && <span>Add Expense</span>}
              </button>
            </div>
          )}

          {/* Nav Items List */}
          <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/90 text-white font-semibold shadow-md shadow-indigo-500/20 border border-indigo-400/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Controls / User Profile */}
          <div className="p-3 border-t border-slate-800/80 space-y-2">
            <button
              onClick={resetToDemoData}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-amber-300 hover:bg-slate-800/60 rounded-lg transition-colors ${
                collapsed ? 'justify-center' : ''
              }`}
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4 shrink-0 text-amber-400" />
              {!collapsed && <span>Reset Demo Data</span>}
            </button>

            <div
              className={`flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800 ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm shrink-0">
                {user.name.charAt(0)}
              </div>
              {!collapsed && (
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-bold text-slate-200 truncate">{user.name}</span>
                  <span className="text-[11px] text-slate-400 truncate">{user.email}</span>
                </div>
              )}
              {!collapsed && (
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-800 px-2 py-2 flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px] leading-none">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
