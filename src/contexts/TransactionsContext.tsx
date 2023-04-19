import { ReactNode, useState, useEffect, useCallback } from 'react';
import { createContext } from 'use-context-selector';

import { api } from '../lib/axios';

interface ITransaction {
  id: string;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateTransactionDTO {
  description: string;
  type: 'income' | 'outcome';
  category: string;
  amount: number;
}

interface ITransactionContext {
  transactions: ITransaction[];
  getTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: ICreateTransactionDTO) => Promise<void>;
}

interface ITransactionsProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as ITransactionContext);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [ transactions, setTransactions ] = useState<ITransaction[]>([]);

  const getTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        },
      });
  
      setTransactions(response.data);
    },
    [],
  );

  const createTransaction = useCallback(
    async ({
      description,
      amount,
      category,
      type,
    }: ICreateTransactionDTO) => {
      const createdTransaction = await api.post('/transactions', {
        description,
        amount,
        category,
        type,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      setTransactions(state => [createdTransaction.data, ...state]);
    },
    [],
  );

  useEffect(() => {
    getTransactions();
  },[getTransactions]);

  return (
    <TransactionContext.Provider value={{
      transactions,
      getTransactions,
      createTransaction,
    }}>
      {children}
    </TransactionContext.Provider>
  );
}
