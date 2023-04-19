import { useContextSelector } from 'use-context-selector';

import { TransactionContext } from '../contexts/TransactionsContext';

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, context => {
    return context.transactions;
  });

  const summary = transactions.reduce((acc, cur) => {
    if (cur.type === 'income') {
      acc.income += cur.amount;
      acc.total += cur.amount;
    } else {
      acc.outcome += cur.amount;
      acc.total -= cur.amount;
    }

    return acc;
  }, {
    income: 0,
    outcome: 0,
    total: 0,
  });

  return summary;
}
