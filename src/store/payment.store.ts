import { create } from "zustand";

import type { PaymentStatus, Transaction } from "@/types/payment.types";

interface PaymentStore {
  paymentStatus: PaymentStatus;

  transactions: Transaction[];

  selectedTransaction: Transaction | null;

  setPaymentStatus: (status: PaymentStatus) => void;

  addTransaction: (transaction: Transaction) => void;

  updateTransaction: (
    transactionId: string,
    updates: Partial<Transaction>,
  ) => void;

  hydrateTransactions: (transactions: Transaction[]) => void;

  setSelectedTransaction: (transaction: Transaction | null) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  paymentStatus: "IDLE",

  transactions: [],

  selectedTransaction: null,

  setPaymentStatus: (status) =>
    set({
      paymentStatus: status,
    }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  updateTransaction: (transactionId, updates) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.transactionId === transactionId
          ? {
              ...transaction,
              ...updates,
            }
          : transaction,
      ),
    })),

  hydrateTransactions: (transactions) =>
    set({
      transactions,
    }),

  setSelectedTransaction: (transaction) =>
    set({
      selectedTransaction: transaction,
    }),
}));
