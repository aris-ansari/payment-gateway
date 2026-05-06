import type { Transaction } from "@/types/payment.types";

const STORAGE_KEY = "payment-transactions";

export function saveTransactions(transactions: Transaction[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function getTransactions() {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Transaction[];
  } catch {
    return [];
  }
}
