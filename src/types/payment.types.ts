export type PaymentStatus =
  | "IDLE"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED"
  | "TIMEOUT";

export type CardType = "VISA" | "MASTERCARD" | "AMEX" | "UNKNOWN";

export type Currency = "INR" | "USD";

export interface PaymentPayload {
  transactionId: string;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
  currency: Currency;
}

export interface Transaction {
  transactionId: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  timestamp: string;
  retryCount: number;
  cardholderName: string;
  cardLastFour: string;
  failureReason?: string;
}
