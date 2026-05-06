import type { PaymentStatus } from "./payment.types";

export interface PaymentApiResponse {
  status: PaymentStatus;

  message: string;
}
