import type { CardType } from "@/types/payment.types";

export function detectCardType(cardNumber: string): CardType {
  const sanitized = cardNumber.replace(/\s/g, "");

  if (/^4/.test(sanitized)) {
    return "VISA";
  }

  if (/^5[1-5]/.test(sanitized)) {
    return "MASTERCARD";
  }

  if (/^3[47]/.test(sanitized)) {
    return "AMEX";
  }

  return "UNKNOWN";
}
