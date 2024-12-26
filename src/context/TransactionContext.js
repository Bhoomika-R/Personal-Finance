import React, { createContext, useContext, useReducer, useMemo } from 'react';

const TransactionContext = createContext();

function transactionReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
}

export function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, {
    transactions: [],
  });

  const summary = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthTransactions = state.transactions.filter((t) => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const income = thisMonthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = thisMonthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [state.transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  return (
    <TransactionContext.Provider
      value={{
        state,
        addTransaction,
        deleteTransaction,
        summary,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}