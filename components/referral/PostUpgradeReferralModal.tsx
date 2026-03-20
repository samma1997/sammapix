"use client";

import React, { useState, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Gift, Copy, Check, X, Share2 } from "lucide-react";
import { APP_URL } from "@/lib/constants";

// ── Constants ────────────────────────────────────────────────────────────────

const LS_KEY = "referral_post_upgrade_shown";

// ── Props ────────────────────────────────────────────────────────────────────

interface PostUpgradeReferralModalProps {
  userPlan: string;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function PostUpgradeReferralModal({ userPlan }: PostUpgradeReferralModalProps) {
  const [open, setOpen] = useState(false);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (userPlan !== "pro") return;

    // Check if already shown
    const alreadyShown = localStorage.getItem(LS_KEY);
    if (alreadyShown) return;

    // Fetch referral link and show modal
    async function init() {
      try {
        const res = await fetch("/api/referral/generate");
        if (res.ok) {
          const data = await res.json();
          setReferralLink(data.link);
          setCanShare(typeof navigator !== "undefined" && !!navigator.share);
          setOpen(true);
        }
      } catch {
        // Silently fail
      }
    }
    init();
  }, [userPlan]);

  const handleDismiss = useCallback(() => {
    setOpen(false);
    localStorage.setItem(LS_KEY, "1");
  }, []);

  const handleCopy = useCallback(async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [referralLink]);

  const handleShare = useCallback(async () => {
    if (!referralLink || !navigator.share) return;
    try {
      await navigator.share({
        title: "SammaPix \u2014 Free Image Optimizer",
        text: "Try SammaPix for free with 50 bonus AI credits.",
        url: referralLink,
      });
    } catch {
      // User cancelled
    }
  }, [referralLink]);

  function handleShareTwitter() {
    if (!referralLink) return;
    const text = `If you edit photos for work, SammaPix is actually useful \u2014 AI rename, compress, HEIC convert, duplicate finder, all in the browser. Try it free (50 bonus AI credits): ${referralLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function handleShareWhatsApp() {
    if (!referralLink) return;
    const text = `Hey \u2014 found this tool for photo/file management, it's solid. AI rename, compress, HEIC converter. Browser-based, no install. Use my link for 50 free AI credits: ${referralLink}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  if (!referralLink) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
          aria-describedby="post-upgrade-referral-desc"
        >
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm p-1 text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </Dialog.Close>

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-5">
            <Gift className="h-7 w-7 text-[#8B5CF6]" strokeWidth={1.5} />
          </div>

          <Dialog.Title className="text-center text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            You&apos;re on Pro. Now pay it forward.
          </Dialog.Title>

          <p
            id="post-upgrade-referral-desc"
            className="text-center text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed"
          >
            Share your link with friends. They get 50 free AI credits, and you earn 25 bonus credits for every signup.
          </p>

          {/* Share buttons */}
          <div className="space-y-2 mb-4">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium rounded-lg transition-colors"
            >
              {copied ? <Check className="h-4 w-4" strokeWidth={2} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
              {copied ? "Copied!" : "Copy referral link"}
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleShareTwitter}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-lg text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                Twitter
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-lg text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp
              </button>
              {canShare && (
                <button
                  onClick={handleShare}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-lg text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
                >
                  <Share2 className="h-4 w-4" strokeWidth={1.5} />
                  Share
                </button>
              )}
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="w-full text-center text-sm text-[#A3A3A3] hover:text-[#737373] transition-colors py-1"
          >
            Maybe later
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
