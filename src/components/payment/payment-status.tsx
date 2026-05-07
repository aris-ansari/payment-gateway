import { AlertCircle, CheckCircle2, Loader2, Timer } from "lucide-react";

import { usePaymentStore } from "@/store/payment.store";

export function PaymentStatus() {
  const paymentStatus = usePaymentStore((state) => state.paymentStatus);

  if (paymentStatus === "IDLE") {
    return null;
  }

  if (paymentStatus === "PROCESSING") {
    return (
      <div className="animate-in fade-in slide-in-from-top-2 flex items-center gap-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">
        <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />

        <div>
          <p className="font-medium text-indigo-100">Processing payment</p>

          <p className="text-sm text-indigo-300">
            Please wait while we verify your transaction
          </p>
        </div>
      </div>
    );
  }

  if (paymentStatus === "SUCCESS") {
    return (
      <div className="animate-in fade-in slide-in-from-top-2 flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
        <CheckCircle2 className="h-5 w-5 text-green-400" />

        <div>
          <p className="font-medium text-green-100">Payment successful</p>

          <p className="text-sm text-green-300">
            Your transaction was completed successfully
          </p>
        </div>
      </div>
    );
  }

  if (paymentStatus === "FAILED") {
    return (
      <div className="animate-in fade-in slide-in-from-top-2 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
        <AlertCircle className="h-5 w-5 text-red-400" />

        <div>
          <p className="font-medium text-red-100">Payment failed</p>

          <p className="text-sm text-red-300">
            Something went wrong with your transaction
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-2 flex items-center gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
      <Timer className="h-5 w-5 text-yellow-400" />

      <div>
        <p className="font-medium text-yellow-100">Payment timeout</p>

        <p className="text-sm text-yellow-300">
          The payment request took too long
        </p>
      </div>
    </div>
  );
}
