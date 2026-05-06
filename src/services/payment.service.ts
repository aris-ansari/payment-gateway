import type { PaymentPayload } from "@/types/payment.types";

import type { PaymentApiResponse } from "@/types/api.types";

export async function processPayment(
  payload: PaymentPayload,
  signal: AbortSignal,
): Promise<PaymentApiResponse> {
  const response = await fetch("/api/pay", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),

    signal,
  });

  const data = (await response.json()) as PaymentApiResponse;

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
