"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { FormField } from "@/components/form/form-field";

import {
  paymentSchema,
  type PaymentFormValues,
} from "@/utils/payment-schema";

import { formatCardNumber } from "@/utils/format-card-number";
import { formatExpiryDate } from "@/utils/format-expiry-date";
import { detectCardType } from "@/utils/detect-card-type";

export function PaymentForm() {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",

    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      amount: 0,
      currency: "INR",
    },
  });

  const cardNumber = watch("cardNumber");

  const cardType = useMemo(
    () => detectCardType(cardNumber || ""),
    [cardNumber]
  );

  function onSubmit(values: PaymentFormValues) {
    console.log(values);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Payment Details
          </h2>

          <p className="text-sm text-slate-400">
            Enter your card information
          </p>
        </div>

        <div className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
          {cardType}
        </div>
      </div>

      <FormField
        label="Cardholder Name"
        htmlFor="cardholderName"
        error={errors.cardholderName?.message}
      >
        <Input
          id="cardholderName"
          placeholder="John Doe"
          aria-invalid={!!errors.cardholderName}
          aria-describedby="cardholderName-error"
          {...register("cardholderName")}
        />
      </FormField>

      <FormField
        label="Card Number"
        htmlFor="cardNumber"
        error={errors.cardNumber?.message}
      >
        <Input
          id="cardNumber"
          placeholder="4242 4242 4242 4242"
          maxLength={19}
          aria-invalid={!!errors.cardNumber}
          aria-describedby="cardNumber-error"
          {...register("cardNumber")}
          onChange={(event) => {
            setValue(
              "cardNumber",
              formatCardNumber(
                event.target.value
              ),
              {
                shouldValidate: true,
              }
            );
          }}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Expiry Date"
          htmlFor="expiryDate"
          error={errors.expiryDate?.message}
        >
          <Input
            id="expiryDate"
            placeholder="MM/YY"
            maxLength={5}
            aria-invalid={!!errors.expiryDate}
            aria-describedby="expiryDate-error"
            {...register("expiryDate")}
            onChange={(event) => {
              setValue(
                "expiryDate",
                formatExpiryDate(
                  event.target.value
                ),
                {
                  shouldValidate: true,
                }
              );
            }}
          />
        </FormField>

        <FormField
          label="CVV"
          htmlFor="cvv"
          error={errors.cvv?.message}
        >
          <Input
            id="cvv"
            placeholder="123"
            maxLength={4}
            aria-invalid={!!errors.cvv}
            aria-describedby="cvv-error"
            {...register("cvv")}
          />
        </FormField>
      </div>

      <FormField
        label="Amount"
        htmlFor="amount"
        error={errors.amount?.message}
      >
        <Input
          id="amount"
          type="number"
          placeholder="100"
          aria-invalid={!!errors.amount}
          aria-describedby="amount-error"
          {...register("amount", {
            valueAsNumber: true,
          })}
        />
      </FormField>

      <Button
        type="submit"
        className="w-full"
        disabled={!isValid}
      >
        Continue Payment
      </Button>
    </form>
  );
}