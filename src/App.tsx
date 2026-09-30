import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { BudgetPlannerPage } from './pages/BudgetPlannerPage';
import { ExpenseTrackerPage } from './pages/ExpenseTrackerPage';
import { GoalsPage } from './pages/GoalsPage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { ReportsPage } from './pages/ReportsPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'landing':
      return <LandingPage />;
    case 'auth':
      return <AuthPage />;
    case 'onboarding':
      return <OnboardingPage />;
    case 'dashboard':
      return <DashboardPage />;
    case 'ai-assistant':
      return <AIAssistantPage />;
    case 'budget-planner':
      return <BudgetPlannerPage />;
    case 'expense-tracker':
      return <ExpenseTrackerPage />;
    case 'financial-goals':
      return <GoalsPage />;
    case 'ai-insights':
      return <AIInsightsPage />;
    case 'reports':
      return <ReportsPage />;
    case 'profile-settings':
      return <ProfileSettingsPage />;
    default:
      return <LandingPage />;
  }
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
