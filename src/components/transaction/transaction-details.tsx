"use client";

import { StatusBadge } from "@/components/common/status-badge";

import { formatDate } from "@/utils/format-date";

import { usePaymentStore } from "@/store/payment.store";

export function TransactionDetails() {
  const selectedTransaction = usePaymentStore(
    (state) => state.selectedTransaction,
  );

  if (!selectedTransaction) {
    return (
      <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-800">
        <p className="text-sm text-slate-500">
          Select a transaction to view details
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">
            Transaction Details
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {selectedTransaction.transactionId}
          </p>
        </div>

        <StatusBadge status={selectedTransaction.status} />
      </div>

      <div className="mt-6 space-y-4">
        <DetailRow
          label="Cardholder"
          value={selectedTransaction.cardholderName}
        />

        <DetailRow
          label="Card"
          value={`**** **** **** ${selectedTransaction.cardLastFour}`}
        />

        <DetailRow
          label="Amount"
          value={`${selectedTransaction.currency} ${selectedTransaction.amount}`}
        />

        <DetailRow
          label="Attempts"
          value={String(selectedTransaction.retryCount)}
        />

        <DetailRow
          label="Date"
          value={formatDate(selectedTransaction.timestamp)}
        />

        {selectedTransaction.failureReason ? (
          <DetailRow
            label="Failure Reason"
            value={selectedTransaction.failureReason}
          />
        ) : null}
      </div>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3 last:border-none last:pb-0">
      <p className="text-sm text-slate-400">{label}</p>

      <p className="text-right text-sm font-medium text-slate-100">{value}</p>
    </div>
  );
}
