import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          [
            "flex h-11 w-full rounded-xl border",
            "border-slate-800 bg-slate-950/60",
            "px-4 py-2 text-sm text-slate-100",
            "placeholder:text-slate-500",
            "transition-all duration-200",
            "focus:border-indigo-500",
            "focus:outline-none",
            "focus:ring-2 focus:ring-indigo-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
          ],
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
