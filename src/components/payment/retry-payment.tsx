"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/common/button";

import { MAX_RETRY_ATTEMPTS } from "@/constants/payment";

import { usePaymentStore } from "@/store/payment.store";

import { usePayment } from "@/hooks/use-payment";

export function RetryPayment() {
  const transactions = usePaymentStore((state) => state.transactions);

  const latestTransaction = transactions[0];

  const { makePayment, isLoading } = usePayment();

  const lastPaymentPayload = usePaymentStore(
    (state) => state.lastPaymentPayload,
  );

  if (!latestTransaction) {
    return null;
  }

  const canRetry =
    latestTransaction.retryCount < MAX_RETRY_ATTEMPTS &&
    (latestTransaction.status === "FAILED" ||
      latestTransaction.status === "TIMEOUT");

  if (!canRetry) {
    return null;
  }

  async function handleRetry() {
    if (!lastPaymentPayload || !latestTransaction) {
      return;
    }

    try {
      await makePayment(lastPaymentPayload, latestTransaction);
    } catch {
      // handled globally
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-slate-100">Retry payment</p>

          <p className="mt-1 text-sm text-slate-400">
            Attempt {latestTransaction.retryCount} of {MAX_RETRY_ATTEMPTS}
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleRetry}
          disabled={isLoading}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          {isLoading ? "Retrying..." : "Retry"}
        </Button>
      </div>
    </div>
  );
}
