"use client";

import { useMemo } from "react";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";

import { FormField } from "@/components/form/form-field";
import { CurrencySelect } from "@/components/form/currency-select";

import { CardPreview } from "@/components/payment/card-preview";

import { paymentSchema, type PaymentFormValues } from "@/utils/payment-schema";

import { formatCardNumber } from "@/utils/format-card-number";
import { formatExpiryDate } from "@/utils/format-expiry-date";

import { detectCardType } from "@/utils/detect-card-type";

import { usePayment } from "@/hooks/use-payment";

export function PaymentForm() {
  const { makePayment, isLoading } = usePayment();

  const {
    control,
    register,
    watch,
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
      amount: undefined,
      currency: "INR",
    },
  });

  const cardholderName = watch("cardholderName");

  const cardNumber = watch("cardNumber");

  const expiryDate = watch("expiryDate");

  const currency = watch("currency");

  const cardType = useMemo(
    () => detectCardType(cardNumber || ""),
    [cardNumber],
  );

  async function onSubmit(values: PaymentFormValues) {
    try {
      await makePayment({
        transactionId: crypto.randomUUID(),

        cardholderName: values.cardholderName,

        cardNumber: values.cardNumber,

        expiryDate: values.expiryDate,

        cvv: values.cvv,

        amount: values.amount,

        currency: values.currency,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      <CardPreview
        cardholderName={cardholderName}
        cardNumber={cardNumber}
        expiryDate={expiryDate}
        cardType={cardType}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Payment Details</h2>

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
          <Controller
            control={control}
            name="cardNumber"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                onChange={(event) => {
                  field.onChange(formatCardNumber(event.target.value));
                }}
              />
            )}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Expiry Date"
            htmlFor="expiryDate"
            error={errors.expiryDate?.message}
          >
            <Controller
              control={control}
              name="expiryDate"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="MM/YY"
                  maxLength={5}
                  onChange={(event) => {
                    field.onChange(formatExpiryDate(event.target.value));
                  }}
                />
              )}
            />
          </FormField>

          <FormField label="CVV" htmlFor="cvv" error={errors.cvv?.message}>
            <Input
              placeholder={cardType === "AMEX" ? "1234" : "123"}
              maxLength={cardType === "AMEX" ? 4 : 3}
              {...register("cvv")}
            />
          </FormField>
        </div>

        <FormField
          label="Amount"
          htmlFor="amount"
          error={errors.amount?.message}
        >
          <div className="flex gap-3">
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <CurrencySelect value={field.value} onChange={field.onChange} />
              )}
            />

            <Input
              id="amount"
              type="number"
              placeholder="100"
              className="flex-1"
              {...register("amount", {
                valueAsNumber: true,
              })}
            />
          </div>
        </FormField>

        <Button
          type="submit"
          aria-busy={isLoading}
          className="w-full"
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Processing Payment..." : `Pay with ${currency}`}
        </Button>
      </form>
    </div>
  );
}
