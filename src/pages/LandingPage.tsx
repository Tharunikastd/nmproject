import React from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Receipt,
  Target,
  FileSpreadsheet,
  Zap,
  CheckCircle2,
  Bot,
  Brain,
  Lock,
} from 'lucide-react';


export const LandingPage: React.FC = () => {
  const { setCurrentPage, setAuthMode, isLoggedIn } = useApp();

  const handleStart = () => {
    if (isLoggedIn) {
      setCurrentPage('dashboard');
    } else {
      setAuthMode('signup');
      setCurrentPage('auth');
    }
  };

  const handleExplore = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-indigo-400" />,
      title: 'AI Budget Recommendations',
      description: 'Get instant algorithmic suggestions on where to optimize spending and increase your monthly savings rate.',
    },
    {
      icon: <Receipt className="w-6 h-6 text-emerald-400" />,
      title: 'Seamless Expense Tracking',
      description: 'Log and categorize your daily expenses effortlessly with support for UPI, Credit Cards, and Net Banking.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
      title: 'Smart Spending Insights',
      description: 'Visual analytics detect unusual spikes in spending and automatically alert you before categories exceed budget.',
    },
    {
      icon: <Target className="w-6 h-6 text-amber-400" />,
      title: 'Financial Goals Tracker',
      description: 'Set custom targets for laptops, vehicles, emergency funds, or trips with automated monthly savings targets.',
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-purple-400" />,
      title: 'Monthly Financial Reports',
      description: 'Comprehensive financial breakdowns with 1-click printable PDF summaries and instant CSV data exports.',
    },
    {
      icon: <Bot className="w-6 h-6 text-rose-400" />,
      title: '24/7 AI Financial Assistant',
      description: 'Ask real-time questions like "Can I afford a phone?" or "How can I save ₹5,000?" for immediate guidance.',
    },
  ];

  const steps = [
    { num: '01', title: 'Enter Your Income', desc: 'Input your monthly salary or earnings to establish your financial starting line.' },
    { num: '02', title: 'Add Your Expenses', desc: 'Track food, rent, bills, shopping, and entertainment quickly.' },
    { num: '03', title: 'Set Financial Goals', desc: 'Define target amounts and dates for your big upcoming purchases or savings.' },
    { num: '04', title: 'Let AI Analyze', desc: 'PocketSmart AI evaluates your spending velocity and category distributions.' },
    { num: '05', title: 'Get Smart Recommendations', desc: 'Receive tailored budget optimizations and actionable financial tips.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-lg animate-pulse-glow">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Next-Gen Personal Finance Powered by Artificial Intelligence
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Take Control of Your Money with <br />
            <span className="bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              PocketSmart AI
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
            PocketSmart AI helps you plan your budget, track spending, reach your financial goals, and make smarter everyday money decisions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-400 text-slate-950 font-extrabold text-base shadow-xl shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              Start Budgeting Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleExplore}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900/80 text-slate-200 font-bold text-base border border-slate-800 hover:bg-slate-800 hover:text-white transition-all"
            >
              Explore Features
            </button>
          </div>

          {/* Interactive Mock Dashboard Preview */}
          <div className="pt-12 max-w-5xl mx-auto">
            <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl shadow-indigo-950/50 space-y-6 text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">pocketsmart.ai/dashboard</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5" /> AI Active
                </div>
              </div>

              {/* Preview Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-medium">Monthly Income</span>
                  <div className="text-2xl font-black text-white">₹75,000</div>
                  <div className="text-[11px] text-emerald-400 font-medium">+ Salary Credited</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-medium">Total Expenses</span>
                  <div className="text-2xl font-black text-indigo-300">₹43,620</div>
                  <div className="text-[11px] text-indigo-400 font-medium">58% of Income spent</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-medium">Available Balance</span>
                  <div className="text-2xl font-black text-emerald-400">₹31,380</div>
                  <div className="text-[11px] text-emerald-400 font-medium">Healthy Cashflow</div>
                </div>
              </div>

              {/* AI Recommendation Banner Preview */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/40 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">💡 Smart Budget Suggestion</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      High Impact
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    "You spent 18% less on dining out this month! Redirecting ₹1,200 into your Emergency Fund will reach your 6-month goal 3 weeks ahead of schedule."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/60 border-t border-slate-900">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Everything You Need to Master Your Money
            </h2>
            <p className="text-slate-400 text-base">
              Designed with simplicity and power. PocketSmart AI provides clear visibility and actionable advice for your daily expenses and long-term financial freedom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 space-y-3 group"
              >
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 w-fit group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Simple 5-Step Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How PocketSmart AI Works
            </h2>
            <p className="text-slate-400 text-base">
              Start budgeting intelligently in less than 2 minutes with no complicated setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 relative hover:border-slate-700 transition-all"
              >
                <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                  {step.num}
                </span>
                <h4 className="font-bold text-base text-white">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-t border-slate-900">
        <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Built for Everyday Budgeting & Big Goals</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              PocketSmart AI removes the complexity of traditional financial spreadsheets. Whether you are a student, young professional, or freelancer, our AI assistant helps you maintain healthy savings without sacrificing your lifestyle.
            </p>
            <div className="space-y-2 pt-2 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Follows proven 50/30/20 financial rule principles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Calculates rupee-by-rupee category spend limits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% private & client-side encrypted storage</span>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="font-bold text-white text-sm">Bank-Level Privacy Guarantee</h4>
                <p className="text-xs text-slate-400">Your financial data stays exclusively on your device.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
              STATUS: SECURE_LOCAL_DATA<br />
              ENCRYPTION: ACTIVE<br />
              AI_ENGINE: ONLINE
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto glass-panel p-10 sm:p-16 rounded-3xl border border-indigo-500/40 space-y-6 relative z-10 shadow-2xl shadow-indigo-950/60">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Ready to make every rupee count?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Join thousands of smart budgeters using PocketSmart AI to plan budgets, reach targets, and save more money every month.
          </p>
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};
