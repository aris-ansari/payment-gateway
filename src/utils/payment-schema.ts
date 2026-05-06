import { z } from "zod";

export const paymentSchema = z.object({
  cardholderName: z
    .string()
    .min(3, "Cardholder name is required"),

  cardNumber: z
    .string()
    .min(19, "Card number is incomplete"),

  expiryDate: z
    .string()
    .min(5, "Expiry date is required"),

  cvv: z
    .string()
    .min(3, "CVV is required"),

  amount: z
    .number({
      error: "Amount is required",
    })
    .positive("Amount must be greater than 0"),

  currency: z.enum(["INR", "USD"]),
});

export type PaymentFormValues = z.infer<
  typeof paymentSchema
>;