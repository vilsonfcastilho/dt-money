import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react';

import { brazilianAmountFormatter } from '../../utils/formatter';
import { useSummary } from '../../hooks/useSummary';

import { SummaryContainer, SummaryCard } from './styles';

export function Summary() {
  const summary = useSummary();

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color='#00B37E' />
        </header>

        <strong>{brazilianAmountFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color='#F75A68' />
        </header>

        <strong>{brazilianAmountFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant='green'>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color='#FFFFFF' />
        </header>

        <strong>{brazilianAmountFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}