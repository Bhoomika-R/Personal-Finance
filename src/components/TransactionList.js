import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useTransactions } from '../context/TransactionContext';
import { ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';

export function TransactionList() {
  const { state } = useTransactions();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {state.transactions.length === 0 ? (
          <p className="p-4 text-center text-gray-500 dark:text-gray-400">
            No transactions yet
          </p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {state.transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-6 h-6 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-6 h-6 text-red-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(transaction.date), 'PPP')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-sm font-medium ${
                        transaction.type === 'income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => navigate(`/transaction/${transaction.id}`)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}