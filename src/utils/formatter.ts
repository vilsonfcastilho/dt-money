export const brazilianDateFormatter = new Intl.DateTimeFormat('pt-BR');

export const brazilianAmountFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
