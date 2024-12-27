import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';



const TransactionContext = createContext();

const STORAGE_KEY = 'finance_tracker_transactions';

function transactionReducer(state, action) {
  let newState;
  
  switch (action.type) {
    case 'ADD_TRANSACTION':
      newState = {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
      break;
    case 'DELETE_TRANSACTION':
      newState = {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
      break;
    case 'SET_TRANSACTIONS':
      newState = {
        ...state,
        transactions: action.payload,
      };
      break;
    default:
      return state;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState.transactions));
  return newState;
}

function loadInitialState() {
  try {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);
    return {
      transactions: savedTransactions ? JSON.parse(savedTransactions) : [],
    };
  } catch (error) {
    console.error('Error loading transactions:', error);
    return { transactions: [] };
  }
}

export function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, undefined, loadInitialState);

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