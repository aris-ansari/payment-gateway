import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        [
          "rounded-2xl border border-slate-800",
          "bg-slate-900/70",
          "shadow-2xl shadow-black/20",
          "backdrop-blur-sm",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}