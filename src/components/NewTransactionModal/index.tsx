import * as z from 'zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useContextSelector } from 'use-context-selector';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, ArrowCircleUp, ArrowCircleDown } from 'phosphor-react';

import { TransactionContext } from '../../contexts/TransactionsContext';

import {
  Overlay,
  Content,
  CloseButton,
  TransactionsType,
  TransactionTypeButton
} from './styles';

const newTransactionFormSchema = z.object({
  description: z.string(),
  amount: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const createTransaction = useContextSelector(TransactionContext, context => {
      return context.createTransaction;
    },
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  async function handleCreateNewTransaction({
    description,
    amount,
    category,
    type,
  }: NewTransactionFormInputs) {
    await createTransaction({
      description,
      amount,
      category,
      type,
    });

    reset(); 
  }

  return (
  <Dialog.Portal>
    <Overlay />

    <Content>
      <Dialog.Title>Nova transação</Dialog.Title>
      <CloseButton>
        <X size={24} />
      </CloseButton>
      
      <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <input
          type="text"
          placeholder="Descrição"
          required
          {...register('description')}
        />

        <input
          type="number"
          placeholder="Valor"
          required
          {...register('amount', { valueAsNumber: true })}
        />

        <input
          type="text"
          placeholder="Categoria"
          required
          {...register('category')}
        />

        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            return (
              <TransactionsType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>

                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionsType>
            );
          }}
        />

        <button type="submit" disabled={isSubmitting}>
          Cadastrar
        </button>
      </form>
    </Content>
  </Dialog.Portal>
  );
}
