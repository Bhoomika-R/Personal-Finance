import React from 'react';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { Summary } from '../components/Summary';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Finance Tracker
            </h1>
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Summary />
            <TransactionList />
          </div>
          <div>
            <TransactionForm />
          </div>
        </div>
      </main>
    </div>
  );
}