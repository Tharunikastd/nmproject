import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Wallet, Target, Sparkles, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import type { Category } from '../types';


export const OnboardingPage: React.FC = () => {
  const { user, updateUserProfile, addGoal, setCurrentPage, addToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Personal
  const [name, setName] = useState(user.name || '');
  const [age, setAge] = useState(user.age ? user.age.toString() : '26');
  const [occupation, setOccupation] = useState(user.occupation || 'Software Engineer');

  // Step 2: Financials
  const [monthlyIncome, setMonthlyIncome] = useState(
    user.monthlyIncome ? user.monthlyIncome.toString() : '75000'
  );
  const [savings, setSavings] = useState(
    user.currentSavings ? user.currentSavings.toString() : '120000'
  );
  const [existingLoans, setExistingLoans] = useState(
    user.existingLoans ? user.existingLoans.toString() : '15000'
  );

  // Step 3: Expenses
  const [expenses, setExpenses] = useState<Record<Category, string>>({
    Food: '7000',
    Rent: '18000',
    Transportation: '3000',
    Education: '3000',
    Shopping: '4000',
    Entertainment: '2500',
    Bills: '4000',
    Health: '2000',
    Savings: '18000',
    Other: '2500',
  });

  // Step 4: Goal
  const [goalName, setGoalName] = useState('Emergency Fund');
  const [goalCategory, setGoalCategory] = useState<
    'Emergency Fund' | 'Vehicle' | 'Education' | 'Travel' | 'Investment' | 'Gadgets' | 'Other'
  >('Emergency Fund');
  const [goalTarget, setGoalTarget] = useState('100000');
  const [goalTargetDate, setGoalTargetDate] = useState('2026-12-31');

  const handleExpenseChange = (cat: Category, val: string) => {
    setExpenses((prev) => ({ ...prev, [cat]: val }));
  };

  const handleComplete = () => {
    const inc = parseFloat(monthlyIncome) || 75000;
    const sav = parseFloat(savings) || 120000;
    const loans = parseFloat(existingLoans) || 15000;

    updateUserProfile({
      name,
      age: parseInt(age) || 26,
      occupation,
      monthlyIncome: inc,
      currentSavings: sav,
      existingLoans: loans,
      isOnboarded: true,
    });

    if (goalName && parseFloat(goalTarget) > 0) {
      addGoal({
        name: goalName,
        category: goalCategory,
        targetAmount: parseFloat(goalTarget),
        currentSavings: Math.min(sav, parseFloat(goalTarget) * 0.4),
        targetDate: goalTargetDate,
      });
    }

    addToast('Financial profile successfully configured!', 'success');
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-xl w-full text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Financial Profile Onboarding
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">Let’s Set Up Your Smart Budget</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          PocketSmart AI uses this profile to generate personalized monthly advice.
        </p>

        {/* Progress Bar Steps */}
        <div className="flex items-center justify-between pt-4 max-w-md mx-auto">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === s
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 ring-2 ring-indigo-400'
                    : step > s
                    ? 'bg-emerald-500 text-slate-950 font-extrabold'
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              {s < 4 && <div className={`w-8 sm:w-12 h-0.5 ${step > s ? 'bg-emerald-500' : 'bg-slate-800'}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative z-10">
        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <User className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base text-white">Step 1: Personal Information</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Arjun Verma"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="26"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="Software Engineer"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Financial Info */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Wallet className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-base text-white">Step 2: Monthly Financial Overview</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Income (₹)</label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="75000"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Current Savings (₹)</label>
                <input
                  type="number"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                  placeholder="120000"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Loans / EMI / Debt (₹)</label>
                <input
                  type="number"
                  value={existingLoans}
                  onChange={(e) => setExistingLoans(e.target.value)}
                  placeholder="15000"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Monthly Expenses */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-base text-white">Step 3: Monthly Expense Allocation (₹)</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
              {(Object.keys(expenses) as Category[]).map((cat) => (
                <div key={cat}>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">{cat}</label>
                  <input
                    type="number"
                    value={expenses[cat]}
                    onChange={(e) => handleExpenseChange(cat, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Financial Goal */}
        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Target className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base text-white">Step 4: Primary Financial Goal</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Goal Purpose</label>
              <select
                value={goalCategory}
                onChange={(e) => {
                  const cat = e.target.value as any;
                  setGoalCategory(cat);
                  setGoalName(cat);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="Emergency Fund">Emergency Fund</option>
                <option value="Vehicle">Buy a Vehicle</option>
                <option value="Education">Education & Courses</option>
                <option value="Travel">Travel & Vacation</option>
                <option value="Investment">Investment Capital</option>
                <option value="Gadgets">Laptop or Gadgets</option>
                <option value="Other">Other Custom Goal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Goal Name</label>
              <input
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="e.g. 6-Month Emergency Buffer"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Amount (₹)</label>
                <input
                  type="number"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  placeholder="100000"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Date</label>
                <input
                  type="date"
                  value={goalTargetDate}
                  onChange={(e) => setGoalTargetDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep((prev) => (prev + 1) as any)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-xs hover:shadow-lg hover:shadow-indigo-500/30"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs hover:shadow-lg hover:shadow-emerald-500/20"
            >
              Complete Setup & Open Dashboard
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
