import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useTransactions } from '../context/TransactionContext';
import { ArrowLeft } from 'lucide-react';

export function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useTransactions();

  const transaction = state.transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transaction not found
          </h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-8 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Transaction Details
            </h2>

            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </dt>
                <dd className="mt-1 text-lg text-gray-900 dark:text-white">
                  {transaction.name}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Amount
                </dt>
                <dd className="mt-1 text-lg text-gray-900 dark:text-white">
                  ${transaction.amount.toFixed(2)}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Type
                </dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date
                </dt>
                <dd className="mt-1 text-lg text-gray-900 dark:text-white">
                  {format(new Date(transaction.date), 'PPP')}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}