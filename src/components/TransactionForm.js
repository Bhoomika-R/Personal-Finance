import React, { useRef } from 'react';
import { useTransactions } from '../context/TransactionContext';

export function TransactionForm() {
  const formRef = useRef(null);
  const { addTransaction } = useTransactions();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const transaction = {
      name: formData.get('name'),
      amount: parseFloat(formData.get('amount')),
      type: formData.get('type'),
      date: new Date().toISOString(),
    };

    addTransaction(transaction);
    form.reset();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Transaction Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          step="0.01"
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Type
        </label>
        <select
          id="type"
          name="type"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-primary-dark dark:hover:bg-primary"
      >
        Add Transaction
      </button>
    </form>
  );
}