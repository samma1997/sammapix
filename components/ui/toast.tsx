"use client";

import * as React from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info" | "default";

export interface ToastData {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastProps extends ToastData {
  onClose: (id: string) => void;
}

function Toast({ id, message, variant = "default", onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => onClose(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-success shrink-0" strokeWidth={1.5} />,
    error: <AlertCircle className="h-4 w-4 text-error shrink-0" strokeWidth={1.5} />,
    info: <Info className="h-4 w-4 text-brand shrink-0" strokeWidth={1.5} />,
    default: null,
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm",
        "animate-slide-up text-sm text-gray-700 max-w-sm w-full",
        variant === "error" && "border-red-200 bg-red-50",
        variant === "success" && "border-green-200 bg-green-50"
      )}
      role="alert"
    >
      {icons[variant]}
      <span className="flex-1 leading-snug">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
        aria-label="Close"
      >
        <X className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}

// Toast container
interface ToastContainerProps {
  toasts: ToastData[];
  onClose: (id: string) => void;
}

function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}

// Toast hook
export function useToast() {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const toast = React.useCallback((message: string, variant: ToastVariant = "default") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const closeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, toast, closeToast, ToastContainer };
}

export { Toast, ToastContainer };
