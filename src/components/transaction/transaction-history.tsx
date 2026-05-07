"use client";

import { usePaymentStore } from "@/store/payment.store";

import { formatDate } from "@/utils/format-date";

import { StatusBadge } from "@/components/common/status-badge";

export function TransactionHistory() {
  const transactions = usePaymentStore((state) => state.transactions);

  const setSelectedTransaction = usePaymentStore(
    (state) => state.setSelectedTransaction,
  );

  const selectedTransaction = usePaymentStore(
    (state) => state.selectedTransaction,
  );

  if (!transactions.length) {
    return (
      <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 px-6 text-center">
        <p className="font-medium text-slate-300">No transactions yet</p>

        <p className="mt-2 text-sm text-slate-500">
          Your recent payment activity will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <button
          key={transaction.transactionId}
          type="button"
          onClick={() => setSelectedTransaction(transaction)}
          className={`w-full rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            selectedTransaction?.transactionId === transaction.transactionId
              ? "border-indigo-500 bg-slate-900"
              : "border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-slate-100">
                {transaction.cardholderName}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                **** **** **** {transaction.cardLastFour}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {formatDate(transaction.timestamp)}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-slate-100">
                {transaction.currency} {transaction.amount}
              </p>

              <div className="mt-2">
                <StatusBadge status={transaction.status} />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
