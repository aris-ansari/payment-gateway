import type { PaymentStatus } from "@/types/payment.types";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: PaymentStatus;
}

const statusStyles: Record<PaymentStatus, string> = {
  IDLE: "border-slate-700 bg-slate-800 text-slate-300",

  PROCESSING: "border-indigo-500/20 bg-indigo-500/10 text-indigo-300",

  SUCCESS: "border-green-500/20 bg-green-500/10 text-green-300",

  FAILED: "border-red-500/20 bg-red-500/10 text-red-300",

  TIMEOUT: "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        [
          "inline-flex items-center rounded-full border",
          "px-2.5 py-1 text-xs font-medium",
        ],
        statusStyles[status],
      )}
    >
      {status}
    </div>
  );
}
