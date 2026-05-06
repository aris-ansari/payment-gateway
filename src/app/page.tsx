"use client";

import { Card } from "@/components/common/card";

import { PaymentForm } from "@/components/payment/payment-form";

import { PaymentStatus } from "@/components/payment/payment-status";

import { TransactionHistory } from "@/components/transaction/transaction-history";

import { useSyncTransactions } from "@/hooks/use-sync-transactions";

export default function HomePage() {
  useSyncTransactions();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-6 lg:px-8">
        <section>
          <h1 className="text-3xl font-bold tracking-tight">Payment Gateway</h1>

          <p className="mt-2 text-sm text-slate-400">
            Secure and seamless payment experience
          </p>
        </section>

        <PaymentStatus />

        <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <Card className="p-6">
            <PaymentForm />
          </Card>

          <Card className="p-6">
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Transaction History</h2>

                <p className="text-sm text-slate-400">
                  Recent payment activity
                </p>
              </div>

              <TransactionHistory />
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
