"use client";

import { usePaymentStore } from "@/store/payment.store";

import { formatDate } from "@/utils/format-date";

import { StatusBadge } from "@/components/common/status-badge";

export function TransactionHistory() {
  const transactions = usePaymentStore((state) => state.transactions);

  if (!transactions.length) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-slate-800">
        <p className="text-sm text-slate-500">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.transactionId}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition-all hover:border-slate-700"
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
        </div>
      ))}
    </div>
  );
}
