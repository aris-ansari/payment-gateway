import { z } from "zod";

import { detectCardType } from "./detect-card-type";
import { isExpiryValid } from "./is-expiry-valid";

export const paymentSchema = z
  .object({
    cardholderName: z.string().trim().min(3, "Cardholder name is required"),

    cardNumber: z.string().min(15, "Card number is incomplete"),

    expiryDate: z.string().refine(isExpiryValid, {
      message: "Enter a valid expiry date",
    }),

    cvv: z.string(),

    amount: z
      .number({
        error: "Amount is required",
      })
      .positive("Amount must be greater than 0"),

    currency: z.enum(["INR", "USD"]),
  })
  .superRefine((values, context) => {
    const cardType = detectCardType(values.cardNumber);

    if (cardType === "AMEX" && values.cvv.length !== 4) {
      context.addIssue({
        code: "custom",
        path: ["cvv"],
        message: "Amex CVV must be 4 digits",
      });
    }

    if (cardType !== "AMEX" && values.cvv.length !== 3) {
      context.addIssue({
        code: "custom",
        path: ["cvv"],
        message: "CVV must be 3 digits",
      });
    }
  });

export type PaymentFormValues = z.infer<typeof paymentSchema>;
