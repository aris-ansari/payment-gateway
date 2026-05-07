"use client";

import { useState } from "react";

import { processPayment } from "@/services/payment.service";

import { PAYMENT_TIMEOUT_MS, MAX_RETRY_ATTEMPTS } from "@/constants/payment";

import { usePaymentStore } from "@/store/payment.store";

import type { PaymentPayload, Transaction } from "@/types/payment.types";

export function usePayment() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    setPaymentStatus,
    addTransaction,
    updateTransaction,
    setLastPaymentPayload,
  } = usePaymentStore();

  async function makePayment(
    payload: PaymentPayload,
    existingTransaction?: Transaction,
  ) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, PAYMENT_TIMEOUT_MS);

    try {
      setIsLoading(true);

      setPaymentStatus("PROCESSING");

      setLastPaymentPayload(payload);

      if (!existingTransaction) {
        addTransaction({
          transactionId: payload.transactionId,

          amount: payload.amount,

          currency: payload.currency,

          status: "PROCESSING",

          timestamp: new Date().toISOString(),

          retryCount: 0,

          cardholderName: payload.cardholderName,

          cardLastFour: payload.cardNumber.replace(/\s/g, "").slice(-4),
        });
      } else {
        updateTransaction(payload.transactionId, {
          status: "PROCESSING",

          retryCount: existingTransaction.retryCount + 1,
        });
      }

      const response = await processPayment(payload, controller.signal);

      updateTransaction(payload.transactionId, {
        status: response.status,
      });

      setPaymentStatus(response.status);

      return response;
    } catch (error) {
      const isTimeout =
        error instanceof DOMException && error.name === "AbortError";

      const status = isTimeout ? "TIMEOUT" : "FAILED";

      updateTransaction(payload.transactionId, {
        status,

        failureReason: isTimeout ? "Request timeout" : "Payment failed",

        retryCount: existingTransaction
          ? existingTransaction.retryCount + 1
          : 1,
      });

      setPaymentStatus(status);

      throw error;
    } finally {
      clearTimeout(timeoutId);

      setIsLoading(false);
    }
  }

  return {
    makePayment,

    isLoading,

    maxRetries: MAX_RETRY_ATTEMPTS,
  };
}
