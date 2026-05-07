import { create } from "zustand";

import type {
  PaymentStatus,
  Transaction,
  PaymentPayload,
} from "@/types/payment.types";

interface PaymentStore {
  paymentStatus: PaymentStatus;

  transactions: Transaction[];

  selectedTransaction: Transaction | null;

  lastPaymentPayload: PaymentPayload | null;

  setPaymentStatus: (status: PaymentStatus) => void;

  addTransaction: (transaction: Transaction) => void;

  updateTransaction: (
    transactionId: string,
    updates: Partial<Transaction>,
  ) => void;

  hydrateTransactions: (transactions: Transaction[]) => void;

  setSelectedTransaction: (transaction: Transaction | null) => void;

  setLastPaymentPayload: (payload: PaymentPayload | null) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  paymentStatus: "IDLE",

  transactions: [],

  selectedTransaction: null,

  lastPaymentPayload: null,

  setPaymentStatus: (status) =>
    set({
      paymentStatus: status,
    }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  updateTransaction: (transactionId, updates) =>
    set((state) => {
      const updatedTransactions = state.transactions.map((transaction) =>
        transaction.transactionId === transactionId
          ? {
              ...transaction,
              ...updates,
            }
          : transaction,
      );

      const updatedSelectedTransaction =
        state.selectedTransaction?.transactionId === transactionId
          ? {
              ...state.selectedTransaction,
              ...updates,
            }
          : state.selectedTransaction;

      return {
        transactions: updatedTransactions,

        selectedTransaction: updatedSelectedTransaction,
      };
    }),

  hydrateTransactions: (transactions) =>
    set({
      transactions,
    }),

  setSelectedTransaction: (transaction) =>
    set({
      selectedTransaction: transaction,
    }),

  setLastPaymentPayload: (payload) =>
    set({
      lastPaymentPayload: payload,
    }),
}));
