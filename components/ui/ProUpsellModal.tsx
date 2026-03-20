"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Zap, Check, X, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ── Types ─────────────────────────────────────────────────────────────────────

export type UpsellTrigger = "files" | "ai_rename" | "batch" | "file_size" | "steps" | "daily";

interface ProUpsellModalProps {
  open: boolean;
  onClose: () => void;
  trigger: UpsellTrigger;
  filesDropped?: number;
  freeLimit?: number;
}

// ── Copy per trigger ──────────────────────────────────────────────────────────

function getHeadline(trigger: UpsellTrigger): string {
  switch (trigger) {
    case "ai_rename":
      return "You've hit today's AI rename limit";
    case "file_size":
      return "File too large for free plan";
    case "batch":
      return "Batch limit reached";
    case "steps":
      return "Step limit reached";
    case "daily":
      return "Daily limit reached";
    default:
      return "You're processing like a pro";
  }
}

function getSubtext(
  trigger: UpsellTrigger,
  filesDropped?: number,
  freeLimit?: number
): string {
  switch (trigger) {
    case "ai_rename":
      return "Free plan gets 10 AI operations per day. Pro gives you 500- enough for an entire shoot.";
    case "file_size":
      return "Free plan supports files up to 20 MB. Upgrade to Pro to handle files up to 50 MB.";
    case "batch":
      return "You've hit the batch processing limit. Upgrade to Pro to handle up to 500 files at once.";
    case "steps":
      return "Free plan allows up to 2 active steps per workflow. Upgrade to Pro for unlimited steps.";
    case "daily":
      return "Free plan allows 50 images per day. Upgrade to Pro for unlimited processing.";
    default: {
      if (filesDropped && freeLimit) {
        return `You dropped ${filesDropped} photos- free plan processes the first ${freeLimit}. Upgrade to handle 500 at once.`;
      }
      return `Free plan processes up to ${freeLimit ?? 100} files. Upgrade to handle 500 at once.`;
    }
  }
}

// ── Features list ─────────────────────────────────────────────────────────────

const FEATURES = [
  "Up to 500 files per batch",
  "500 AI operations per day",
  "50 MB max file size · Zero ads",
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProUpsellModal({
  open,
  onClose,
  trigger,
  filesDropped,
  freeLimit,
}: ProUpsellModalProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const showContinue = trigger === "files" || trigger === "batch";

  // Track upsell shown when modal opens
  const [tracked, setTracked] = useState(false);
  if (open && !tracked) {
    trackEvent("upsell_shown", { trigger });
    setTracked(true);
  }
  if (!open && tracked) {
    setTracked(false);
  }

  const handleCheckout = async () => {
    trackEvent("upsell_clicked", { trigger });
    if (!session) {
      router.push("/api/auth/signin?callbackUrl=/dashboard/upgrade");
      onClose();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "monthly" }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(`Checkout error: ${data.error ?? "no URL returned"}`);
      }
    } catch (err) {
      alert(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Content */}
        <Dialog.Content
          className={[
            "fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2",
            "rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A]",
            "bg-white dark:bg-[#1E1E1E] p-6 shadow-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "duration-200",
          ].join(" ")}
          aria-describedby="upsell-description"
        >
          {/* Close button */}
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-60 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 dark:ring-offset-[#1E1E1E]"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-[#737373]" strokeWidth={1.5} />
            </button>
          </Dialog.Close>

          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-[#6366F1]/10 dark:bg-[#6366F1]/20 flex items-center justify-center mx-auto mb-4">
            <Zap className="h-6 w-6 text-[#6366F1]" strokeWidth={1.5} />
          </div>

          {/* Headline */}
          <Dialog.Title className="text-center text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            {getHeadline(trigger)}
          </Dialog.Title>

          {/* Subtext */}
          <p
            id="upsell-description"
            className="text-center text-sm text-[#737373] dark:text-[#A3A3A3] mb-5 leading-relaxed"
          >
            {getSubtext(trigger, filesDropped, freeLimit)}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <span className="flex-shrink-0 h-4 w-4 rounded-full bg-[#6366F1]/10 dark:bg-[#6366F1]/20 flex items-center justify-center">
                  <Check className="h-2.5 w-2.5 text-[#6366F1]" strokeWidth={2.5} />
                </span>
                <span className="text-xs text-[#525252] dark:text-[#A3A3A3]">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Primary CTA */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-semibold rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors mb-3 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
            ) : (
              <Zap className="h-4 w-4" strokeWidth={1.5} />
            )}
            {loading ? "Redirecting to checkout..." : "Upgrade to Pro \u2014 $7/mo"}
          </button>

          {/* Secondary CTA */}
          {showContinue && freeLimit && (
            <button
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-4 py-2 text-sm text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              Continue with first {freeLimit} files
            </button>
          )}

          {/* Money-back guarantee */}
          <p className="text-center text-[11px] text-[#A3A3A3] dark:text-[#525252] mt-3">
            30-day money-back guarantee
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
