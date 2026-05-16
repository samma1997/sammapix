"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Zap, Check, X, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useFoundingStatus, applyFoundingDiscount } from "@/lib/hooks/useFoundingStatus";
import { fireBeginCheckoutEvent } from "@/lib/checkout-tracking";

// ── Types ─────────────────────────────────────────────────────────────────────

export type UpsellTrigger = "files" | "ai_rename" | "batch" | "file_size" | "steps" | "daily" | "zip" | "upscale_daily" | "power_user";

interface ProUpsellModalProps {
  open: boolean;
  onClose: () => void;
  trigger: UpsellTrigger;
  filesDropped?: number;
  freeLimit?: number;
  /** When trigger === "power_user", number of distinct tools the user has explored. */
  toolsExplored?: number;
}

// ── Copy per trigger ──────────────────────────────────────────────────────────

function getHeadline(trigger: UpsellTrigger): string {
  switch (trigger) {
    case "ai_rename":
      return "You've hit today's AI limit — keep going with Pro";
    case "file_size":
      return "File too large for free plan";
    case "batch":
      return "Batch limit reached";
    case "steps":
      return "Step limit reached";
    case "daily":
      return "Daily limit reached";
    case "zip":
      return "ZIP download is a Pro feature";
    case "upscale_daily":
      return "Daily upscale limit reached";
    case "power_user":
      return "You're getting a lot out of SammaPix";
    default:
      return "You're processing like a pro";
  }
}

function getSubtext(
  trigger: UpsellTrigger,
  filesDropped?: number,
  freeLimit?: number,
  toolsExplored?: number
): string {
  switch (trigger) {
    case "ai_rename":
      return "Free plan: 10 AI ops per day. Pro gives you 200 — enough for an entire shoot. Or grab a one-shot credit pack if you only need extras occasionally.";
    case "file_size":
      return "Free plan supports files up to 20 MB. Pro handles up to 50 MB.";
    case "batch":
      return "You've hit the batch limit. Pro handles up to 500 files at once.";
    case "steps":
      return "Free allows 2 active steps per workflow. Pro unlocks unlimited steps.";
    case "daily":
      return "Free plan: 50 images per day. Pro removes the daily cap.";
    case "zip":
      return "ZIP batch download is a Pro feature. One click, all files in a single archive.";
    case "upscale_daily":
      return "Free plan limits daily upscales. Pro removes the cap and adds 4×/8× scale.";
    case "power_user":
      return `You've explored ${toolsExplored ?? 3}+ tools already — there are 35 total. Pro unlocks unlimited usage, no daily caps, and 500-file batches.`;
    default: {
      if (filesDropped && freeLimit) {
        return `You dropped ${filesDropped} photos — free plan processes the first ${freeLimit}. Pro handles 500 at once.`;
      }
      return `Free plan processes up to ${freeLimit ?? 100} files. Pro handles 500 at once.`;
    }
  }
}

// ── Features list ─────────────────────────────────────────────────────────────

const FEATURES = [
  "Up to 500 files per batch (free: 20)",
  "200 AI ops per day (free: 10)",
  "50 MB max file size · No ads · ZIP download",
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProUpsellModal({
  open,
  onClose,
  trigger,
  filesDropped,
  freeLimit,
  toolsExplored,
}: ProUpsellModalProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const showContinue = trigger === "files" || trigger === "batch";

  // Founding deal — show $5 price + spots-left urgency in CTA.
  // Gated on real discount so stale cached responses don't show "lock $9".
  const founding = useFoundingStatus();
  const isFounding = !!(
    founding &&
    founding.active &&
    founding.spotsLeft > 0 &&
    (founding.percentOff > 0 || founding.amountOff > 0)
  );
  const monthlyFinalCents = applyFoundingDiscount(900, founding);
  const monthlyFinal = (monthlyFinalCents / 100).toFixed(monthlyFinalCents % 100 === 0 ? 0 : 2);

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
      // Not logged in — defer the begin_checkout event to DashboardUpgrade
      // (after signin) so we only fire it for users who actually return.
      const cb = encodeURIComponent("/dashboard/upgrade?plan=monthly");
      router.push(`/auth/signin?callbackUrl=${cb}`);
      onClose();
      return;
    }
    // Logged-in users go straight to Stripe — fire begin_checkout here so
    // GA4/Meta see the event (previously these flows were invisible).
    fireBeginCheckoutEvent("monthly");
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

  const handleBuyCredits = () => {
    trackEvent("upsell_credits_clicked", { trigger });
    router.push("/pricing#credits");
    onClose();
  };

  // Show credit-pack alternative when a one-shot top-up makes sense.
  // Includes 'files' / 'batch' because hitting the batch limit is the most
  // common upsell trigger and most users dropping >20 files are one-time
  // jobs, not recurring Pro candidates.
  const showCreditAlt =
    trigger === "ai_rename" ||
    trigger === "daily" ||
    trigger === "upscale_daily" ||
    trigger === "files" ||
    trigger === "batch";

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
            {getSubtext(trigger, filesDropped, freeLimit, toolsExplored)}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-4">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <span className="flex-shrink-0 h-4 w-4 rounded-full bg-[#6366F1]/10 dark:bg-[#6366F1]/20 flex items-center justify-center">
                  <Check className="h-2.5 w-2.5 text-[#6366F1]" strokeWidth={2.5} />
                </span>
                <span className="text-xs text-[#525252] dark:text-[#A3A3A3]">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Founding urgency line — visible only while spots remain */}
          {isFounding && (
            <div className="mb-3 px-2.5 py-1.5 rounded bg-[#FEF2F2] dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-center">
              <p className="text-[11px] font-medium text-red-700 dark:text-red-400">
                <span className="font-bold">{founding!.spotsLeft}</span> of {founding!.totalSpots} founding spots left ·{" "}
                <span className="font-bold">${monthlyFinal}/mo</span> locks forever
              </p>
            </div>
          )}

          {/* Primary CTA \u2014 explicit free trial */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-semibold rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors mb-2 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
            ) : (
              <Zap className="h-4 w-4" strokeWidth={1.5} />
            )}
            {loading
              ? "Redirecting to checkout..."
              : isFounding
                ? `Lock $${monthlyFinal}/mo forever \u2014 Start trial`
                : "Start 7-day free trial \u2014 $9/mo after"}
          </button>

          {/* Credit pack alternative for AI-ops triggers */}
          {showCreditAlt && (
            <button
              onClick={handleBuyCredits}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors mb-2"
            >
              Or buy a one-shot credit pack from $5.99
            </button>
          )}

          {/* Continue with first N files \u2014 only for files/batch triggers */}
          {showContinue && freeLimit && (
            <button
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-4 py-2 text-sm text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              Continue with first {freeLimit} files
            </button>
          )}

          {/* Trust line \u2014 single row, slightly more visible */}
          <p className="text-center text-xs text-[#737373] dark:text-[#A3A3A3] mt-3">
            30-day money-back \u00b7 Cancel anytime
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
