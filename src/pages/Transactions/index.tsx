import { useContextSelector } from 'use-context-selector';

import {
  brazilianAmountFormatter,
  brazilianDateFormatter,
} from '../../utils/formatter';
import { TransactionContext } from '../../contexts/TransactionsContext';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';

import {
  TransactionsContainer,
  TransactionsTable,
  PriceHighlight,
} from './styles';

export function Transactions() {
  const transactions = useContextSelector(TransactionContext, context => {
    return context.transactions;
  });

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {brazilianAmountFormatter.format(transaction.amount)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{brazilianDateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
