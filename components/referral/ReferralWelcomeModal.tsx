"use client";

import React, { useState, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sparkles, X, ArrowRight } from "lucide-react";

// ── Constants ────────────────────────────────────────────────────────────────

const LS_KEY = "referral_welcome_shown";

// ── Component ────────────────────────────────────────────────────────────────

export default function ReferralWelcomeModal() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status !== "authenticated") return;

    // Check if already shown
    if (localStorage.getItem(LS_KEY)) return;

    // Check if user was referred (ref cookie exists)
    const hasRefCookie = document.cookie.split(";").some((c) => c.trim().startsWith("ref="));
    if (!hasRefCookie) return;

    // Small delay to avoid showing immediately on page load
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [status]);

  const handleClose = useCallback(() => {
    setOpen(false);
    localStorage.setItem(LS_KEY, "1");
  }, []);

  const handleExplore = useCallback(() => {
    handleClose();
    router.push("/dashboard");
  }, [handleClose, router]);

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
          aria-describedby="referral-welcome-desc"
        >
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm p-1 text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </Dialog.Close>

          {/* Sparkle icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-5">
            <Sparkles className="h-7 w-7 text-[#8B5CF6]" strokeWidth={1.5} />
          </div>

          <Dialog.Title className="text-center text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            You&apos;re in &mdash; and you&apos;ve got 50 bonus AI ops
          </Dialog.Title>

          <p
            id="referral-welcome-desc"
            className="text-center text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed"
          >
            Welcome to SammaPix! Your referral bonus has been applied. Use AI Rename, Alt Text, Transcribe, and more &mdash; 50 operations on us.
          </p>

          <button
            onClick={handleExplore}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Explore tools
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
