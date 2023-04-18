import { ThemeProvider } from 'styled-components';

import { TransactionsProvider } from './contexts/TransactionsContext';
import { Transactions } from './pages/Transactions';

import { darkTheme } from './styles/themes/dark';
import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  );
}
