import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide rounded border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-600 border-gray-200",
        brand: "bg-brand-light text-brand border-indigo-200",
        success: "bg-success-light text-success border-green-200",
        error: "bg-error-light text-error border-red-200",
        warning: "bg-warning-light text-warning border-amber-200",
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
