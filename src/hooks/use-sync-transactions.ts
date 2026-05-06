"use client";

import { useEffect } from "react";

import { getTransactions, saveTransactions } from "@/lib/storage";

import { usePaymentStore } from "@/store/payment.store";

export function useSyncTransactions() {
  const transactions = usePaymentStore((state) => state.transactions);

  const hydrateTransactions = usePaymentStore(
    (state) => state.hydrateTransactions,
  );

  useEffect(() => {
    hydrateTransactions(getTransactions());
  }, [hydrateTransactions]);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);
}
