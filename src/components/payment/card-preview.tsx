import type { CardType } from "@/types/payment.types";

interface CardPreviewProps {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cardType: CardType;
}

export function CardPreview({
  cardholderName,
  cardNumber,
  expiryDate,
  cardType,
}: CardPreviewProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl",
        "border border-slate-700",
        "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950",
        "p-6 shadow-2xl shadow-black/30",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-300">
          Virtual Card
        </div>

        <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-slate-100 backdrop-blur">
          {cardType}
        </div>
      </div>

      <div className="mt-10">
        <p className="text-2xl font-semibold tracking-[0.2em] text-white">
          {cardNumber ||
            "•••• •••• •••• ••••"}
        </p>
      </div>

      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Cardholder
          </p>

          <p className="mt-1 text-sm font-medium text-white">
            {cardholderName || "YOUR NAME"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Expires
          </p>

          <p className="mt-1 text-sm font-medium text-white">
            {expiryDate || "MM/YY"}
          </p>
        </div>
      </div>
    </div>
  );
}