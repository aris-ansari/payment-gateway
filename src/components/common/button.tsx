import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-xl",
    "text-sm font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-indigo-500",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-indigo-500 text-white hover:bg-indigo-400",

        secondary:
          "border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800",

        danger:
          "bg-red-500 text-white hover:bg-red-400",
      },

      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-6 text-base",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className
      )}
      {...props}
    />
  );
}