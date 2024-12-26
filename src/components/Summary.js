import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

export function Summary() {
  const { summary } = useTransactions();

  const items = [
    {
      title: 'Total Income',
      amount: summary.income,
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      className: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Total Expenses',
      amount: summary.expenses,
      icon: <TrendingDown className="w-6 h-6 text-red-500" />,
      className: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      title: 'Net Balance',
      amount: summary.balance,
      icon: <DollarSign className="w-6 h-6 text-blue-500" />,
      className: 'bg-blue-50 dark:bg-blue-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className={`p-4 rounded-lg ${item.className}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
              <p className="text-2xl font-semibold mt-1">
                ${item.amount.toFixed(2)}
              </p>
            </div>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}