import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide rounded border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#3A3A3A]",
        brand: "bg-brand-light text-brand border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900",
        success: "bg-success-light text-success border-green-200 dark:bg-green-950/30 dark:border-green-900",
        error: "bg-error-light text-error border-red-200 dark:bg-red-950/30 dark:border-red-900",
        warning: "bg-warning-light text-warning border-amber-200 dark:bg-amber-950/30 dark:border-amber-900",
        black: "bg-gray-900 text-white border-gray-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
