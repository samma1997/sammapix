import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0-100
  variant?: "default" | "success" | "error";
}

function Progress({ value = 0, variant = "default", className, ...props }: ProgressProps) {
  const trackColor = "bg-gray-100";
  const fillColor =
    variant === "success"
      ? "bg-success"
      : variant === "error"
      ? "bg-error"
      : "bg-gray-900";

  return (
    <div
      className={cn("w-full h-1.5 rounded-full overflow-hidden", trackColor, className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-300 ease-out", fillColor)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

// Animated indeterminate progress
function ProgressIndeterminate({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-1.5 rounded-full overflow-hidden bg-gray-100", className)}>
      <div
        className="h-full bg-gray-900 rounded-full animate-shimmer"
        style={{
          width: "40%",
          background: "linear-gradient(90deg, #E5E5E5 25%, #171717 50%, #E5E5E5 75%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}

export { Progress, ProgressIndeterminate };
