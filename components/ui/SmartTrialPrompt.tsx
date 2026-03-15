"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { UserSession } from "@/types/user";

const LIMIT_HITS_KEY = "sammapix-limit-hits";
const DISMISSED_KEY = "sammapix-trial-prompt-dismissed";
const HITS_THRESHOLD = 3;
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ── Helpers ───────────────────────────────────────────────────────────────────

function getLimitHits(): number {
  try {
    return parseInt(localStorage.getItem(LIMIT_HITS_KEY) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    return !isNaN(ts) && Date.now() - ts < DISMISS_DURATION_MS;
  } catch {
    return false;
  }
}

// ── Public API — call this wherever a limit is hit ────────────────────────────

export function recordLimitHit(): void {
  try {
    const current = getLimitHits();
    localStorage.setItem(LIMIT_HITS_KEY, String(current + 1));
    // Dispatch a custom event so the component can react without a re-render loop
    window.dispatchEvent(new Event("sammapix:limit-hit"));
  } catch {
    // ignore
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SmartTrialPrompt() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const checkShouldShow = useCallback(() => {
    // Never show inside the dashboard
    if (pathname.startsWith("/dashboard")) return;
    if (status !== "authenticated") return;
    const typedSession = session as UserSession | null;
    if (typedSession?.user?.plan !== "free") return;
    if (isDismissed()) return;
    if (getLimitHits() >= HITS_THRESHOLD) {
      setOpen(true);
    }
  }, [status, session, pathname]);

  useEffect(() => {
    checkShouldShow();
  }, [checkShouldShow]);

  // Also re-check whenever a limit-hit event fires
  useEffect(() => {
    window.addEventListener("sammapix:limit-hit", checkShouldShow);
    return () => window.removeEventListener("sammapix:limit-hit", checkShouldShow);
  }, [checkShouldShow]);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
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
          aria-describedby="trial-prompt-description"
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

          {/* Headline */}
          <Dialog.Title className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2 pr-6">
            You&apos;re hitting your limits
          </Dialog.Title>

          {/* Body */}
          <p
            id="trial-prompt-description"
            className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed"
          >
            You&apos;ve used all your free AI renames {HITS_THRESHOLD} times this week. Pro gives
            you 200/day plus the full AI Workflow pipeline.
          </p>

          {/* Primary CTA */}
          <Link href="/try-pro" onClick={dismiss}>
            <button className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-semibold rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors mb-3">
              Try Pro free for 30 days
            </button>
          </Link>

          {/* Fine print */}
          <p className="text-center text-[11px] text-[#A3A3A3] dark:text-[#525252] mb-4">
            No credit card required &middot; Cancel anytime
          </p>

          {/* Secondary CTA */}
          <div className="flex justify-end">
            <button
              onClick={dismiss}
              className="text-sm text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              Maybe later
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
