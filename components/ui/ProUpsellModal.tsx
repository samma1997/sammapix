"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Zap, Check, X, Loader2, Clock } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useFoundingStatus, applyFoundingDiscount } from "@/lib/hooks/useFoundingStatus";
import { fireBeginCheckoutEvent } from "@/lib/checkout-tracking";
import { TOOL_COUNT } from "@/lib/constants";

// ── Types ─────────────────────────────────────────────────────────────────────

export type UpsellTrigger = "files" | "ai_rename" | "batch" | "file_size" | "video_size" | "steps" | "daily" | "zip" | "upscale_daily" | "power_user" | "lut_export";

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

function getHeadline(trigger: UpsellTrigger, isIt = false): string {
  if (isIt) {
    switch (trigger) {
      case "ai_rename": return "Hai raggiunto il limite AI di oggi, continua con Pro";
      case "file_size": return "File troppo grande per il piano gratis";
      case "video_size": return "Video pesante? Sbloccalo in pochi secondi";
      case "batch": return "Limite batch raggiunto";
      case "steps": return "Limite di passaggi raggiunto";
      case "daily": return "Limite giornaliero raggiunto";
      case "zip": return "Il download in ZIP è una funzione Pro";
      case "upscale_daily": return "Limite di upscale giornaliero raggiunto";
      case "power_user": return "Stai usando SammaPix alla grande";
      case "lut_export": return "Ti piace quel LUT? Portalo oltre con Pro";
      default: return "Stai lavorando da professionista";
    }
  }
  switch (trigger) {
    case "ai_rename":
      return "You've hit today's AI limit — keep going with Pro";
    case "file_size":
      return "File too large for free plan";
    case "video_size":
      return "Big video? Unlock it in seconds";
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
    case "lut_export":
      return "Love that LUT? Take it further with Pro";
    default:
      return "You're processing like a pro";
  }
}

function getSubtext(
  trigger: UpsellTrigger,
  filesDropped?: number,
  freeLimit?: number,
  toolsExplored?: number,
  isIt = false
): string {
  if (isIt) {
    switch (trigger) {
      case "ai_rename": return "Piano gratis: 10 operazioni AI al giorno. Pro te ne dà 200, abbastanza per un intero servizio.";
      case "file_size": return "Il piano gratis supporta file fino a 20 MB. Pro arriva a 50 MB.";
      case "video_size": return "Il gratis comprime video fino a 500 MB. Con Pro sblocchi i video grandi (fino a diversi GB), oppure prendi un Day Pass video singolo. Tutto resta nel browser, niente upload.";
      case "batch": return "Hai raggiunto il limite del batch. Pro gestisce fino a 500 file insieme.";
      case "steps": return "Il gratis permette 2 passaggi attivi per flusso. Pro li rende illimitati.";
      case "daily": return "Piano gratis: 50 immagini al giorno. Pro toglie il limite giornaliero.";
      case "zip": return "Il download in ZIP è una funzione Pro. Un clic, tutti i file in un unico archivio.";
      case "upscale_daily": return "Il gratis limita gli upscale giornalieri. Pro toglie il limite e aggiunge la scala 4x e 8x.";
      case "power_user": return `Hai già provato ${toolsExplored ?? 3} strumenti, ce ne sono ${TOOL_COUNT} in totale. Pro sblocca uso illimitato, nessun limite giornaliero e batch da 500 file.`;
      case "lut_export": return "Pro applica il tuo LUT fino a 500 foto insieme ed esporta file .cube illimitati. Il gratis include sempre l'export su singola foto.";
      default: {
        if (filesDropped && freeLimit) return `Hai caricato ${filesDropped} foto, il piano gratis ne elabora le prime ${freeLimit}. Pro ne gestisce 500 insieme.`;
        return `Il piano gratis elabora fino a ${freeLimit ?? 100} file. Pro ne gestisce 500 insieme.`;
      }
    }
  }
  switch (trigger) {
    case "ai_rename":
      return "Free plan: 10 AI ops per day. Pro gives you 200 — enough for an entire shoot. Or grab a one-shot credit pack if you only need extras occasionally.";
    case "file_size":
      return "Free plan supports files up to 20 MB. Pro handles up to 50 MB.";
    case "video_size":
      return "Free compresses videos up to 500 MB. Unlock large videos (up to several GB) with Pro, or grab a one-time Video Day Pass. Everything still runs in your browser, nothing uploaded.";
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
      return `You've explored ${toolsExplored ?? 3}+ tools already — there are ${TOOL_COUNT} total. Pro unlocks unlimited usage, no daily caps, and 500-file batches.`;
    case "lut_export":
      return "Pro applies your LUT to up to 500 photos at once and exports unlimited .cube files. Free always includes single-photo exports — no change there.";
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

const VIDEO_FEATURES = [
  "Compress large videos (free: up to 500 MB)",
  "Still 100% in your browser — nothing uploaded",
  "Plus all Pro tools · No ads",
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
  const pathname = usePathname();
  const isIt = (pathname || "").startsWith("/it");
  const pricingHref = isIt ? "/it/prezzi#credits" : "/pricing#credits";
  const [loading, setLoading] = useState(false);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const [dayPassLoading, setDayPassLoading] = useState(false);
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

  // Where this conversion started: the upsell trigger + the current page.
  // Stored on Stripe metadata so we can see the source of every Day Pass / trial.
  const checkoutSource = () => {
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    return `upsell:${trigger}:${path}`;
  };

  const handleCheckout = async () => {
    trackEvent("upsell_clicked", { trigger });
    // Guest checkout: anyone can start. Stripe collects the email and
    // /auth/complete signs them in passwordlessly after payment.
    fireBeginCheckoutEvent("monthly");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "monthly", source: checkoutSource() }),
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

  const handleBuyCredits = async () => {
    trackEvent("upsell_credits_clicked", { trigger });
    // Not logged in (e.g. files/batch triggers): credit purchase needs an
    // account, so fall back to the pricing credits section.
    if (!session) {
      router.push(pricingHref);
      onClose();
      return;
    }
    // Logged-in users go straight to a one-time Stripe checkout for the
    // entry credit pack — no detour to /pricing. This is the low-friction
    // path for episodic users who won't commit to a $9/mo subscription.
    setCreditsLoading(true);
    try {
      const res = await fetch("/api/credits/purchase", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: "credits_100" }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Couldn't create checkout — fall back to the pricing page.
        router.push(pricingHref);
        onClose();
      }
    } catch {
      router.push(pricingHref);
      onClose();
    } finally {
      setCreditsLoading(false);
    }
  };

  const handleDayPass = async () => {
    trackEvent("upsell_daypass_clicked", { trigger });
    // Guest day pass: no login required. /auth/complete signs them in after pay.
    setDayPassLoading(true);
    try {
      const res = await fetch("/api/checkout/day-pass", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: checkoutSource(),
          ...(trigger === "video_size" ? { variant: "video" } : {}),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string; code?: string };
      if (data.url) {
        window.location.href = data.url;
      } else if (data.code === "DAY_PASS_ALREADY_ACTIVE") {
        router.push("/dashboard?daypass=active");
        onClose();
      } else {
        alert(data.error ?? "Could not start checkout. Please try again.");
      }
    } catch (err) {
      alert(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setDayPassLoading(false);
    }
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

  // Video uses a premium Day Pass ($4.99) and a video-focused feature list.
  const isVideoUpsell = trigger === "video_size";
  const FEATURES_IT = [
    "Fino a 500 file per batch (gratis: 20)",
    "200 operazioni AI al giorno (gratis: 10)",
    "50 MB per file · Niente pubblicità · Download ZIP",
  ];
  const VIDEO_FEATURES_IT = [
    "Comprimi video grandi (gratis: fino a 500 MB)",
    "Sempre 100% nel browser, niente upload",
    "Più tutti gli strumenti Pro · Niente pubblicità",
  ];
  const dayPassLabel = isIt
    ? (isVideoUpsell
        ? "Ti serve solo una volta? Day Pass video $4,99, accesso completo 24h"
        : "Ti serve solo una volta? Day Pass $2,99, accesso completo 24h")
    : (isVideoUpsell
        ? "Just need it once? Video Day Pass $4.99 — 24h full access"
        : "Just need it once? Day Pass $2.99 — 24h full access");
  const featureList = isIt
    ? (isVideoUpsell ? VIDEO_FEATURES_IT : FEATURES_IT)
    : (isVideoUpsell ? VIDEO_FEATURES : FEATURES);

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Content */}
        <Dialog.Content
          className={[
            "fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2",
            "max-h-[90vh] overflow-y-auto",
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
            {getHeadline(trigger, isIt)}
          </Dialog.Title>

          {/* Subtext */}
          <p
            id="upsell-description"
            className="text-center text-sm text-[#737373] dark:text-[#A3A3A3] mb-5 leading-relaxed"
          >
            {getSubtext(trigger, filesDropped, freeLimit, toolsExplored, isIt)}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-4">
            {featureList.map((feature) => (
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
              ? (isIt ? "Ti porto al checkout..." : "Redirecting to checkout...")
              : isFounding
                ? (isIt ? `Blocca $${monthlyFinal}/mese per sempre \u2014 Inizia la prova` : `Lock $${monthlyFinal}/mo forever \u2014 Start trial`)
                : (isIt ? "Inizia la prova gratis di 7 giorni \u2014 poi $9/mese" : "Start 7-day free trial \u2014 $9/mo after")}
          </button>

          {/* Credit pack alternative for AI-ops triggers — one-click to Stripe */}
          {showCreditAlt && (
            <button
              onClick={handleBuyCredits}
              disabled={creditsLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors mb-2 disabled:opacity-60"
            >
              {creditsLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
              ) : null}
              {creditsLoading
                ? (isIt ? "Ti porto al checkout..." : "Redirecting to checkout...")
                : (isIt ? "Oppure 100 crediti a $5,99 — una tantum, non scadono" : "Or buy 100 credits for $5.99 — one-time, never expire")}
            </button>
          )}

          {/* Day Pass \u2014 one-time 24h full access */}
          <button
            onClick={handleDayPass}
            disabled={dayPassLoading}
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors mb-2 disabled:opacity-60"
            aria-label={isVideoUpsell ? "Buy a Video Day Pass for $4.99 \u2014 24h full Pro access" : "Buy a Day Pass for $2.99 \u2014 24h full Pro access"}
          >
            {dayPassLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
            ) : (
              <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            )}
            {dayPassLoading ? (isIt ? "Ti porto al checkout..." : "Redirecting to checkout...") : dayPassLabel}
          </button>

          {/* Continue with first N files \u2014 only for files/batch triggers */}
          {showContinue && freeLimit && (
            <button
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-4 py-2 text-sm text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              {isIt ? `Continua con i primi ${freeLimit} file` : `Continue with first ${freeLimit} files`}
            </button>
          )}

          {/* Trust line \u2014 single row, slightly more visible */}
          <p className="text-center text-xs text-[#737373] dark:text-[#A3A3A3] mt-3">
            {isIt ? "Rimborso entro 30 giorni \u00b7 Disdici quando vuoi" : "30-day money-back \u00b7 Cancel anytime"}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
