"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Gift, Copy, Check, ExternalLink, Clock, ArrowRight, Loader2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SentGift {
  id: string;
  recipientName: string;
  recipientEmail: string | null;
  plan: string;
  date: string;
  status: "pending" | "paid" | "redeemed";
  redeemCode: string;
}

interface ReceivedGift {
  id: string;
  senderName: string;
  message: string | null;
  plan: string;
  date: string;
  activeUntil: string | null;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-0.5 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
      {children}
    </p>
  );
}

function StatusBadge({ status }: { status: SentGift["status"] }) {
  if (status === "redeemed") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-[#16A34A]">
        <Check className="h-3 w-3" strokeWidth={2} />
        Redeemed
      </span>
    );
  }
  if (status === "paid") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
        <Clock className="h-3 w-3" strokeWidth={1.5} />
        Paid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[#D97706]">
      <Clock className="h-3 w-3" strokeWidth={1.5} />
      Pending
    </span>
  );
}

function CopyRedeemButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const url = `https://sammapix.com/gift/redeem/${code}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-[#6366F1] hover:text-[#4F46E5] transition-colors duration-150"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" strokeWidth={2} />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" strokeWidth={1.5} />
          Copy link
        </>
      )}
    </button>
  );
}

function SentGiftCard({ gift }: { gift: SentGift }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-b-0">
      <div className="h-8 w-8 rounded-full bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center shrink-0 mt-0.5">
        <Gift className="h-4 w-4 text-[#737373]" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
              To: {gift.recipientName}
            </p>
            {gift.recipientEmail && (
              <p className="text-xs text-[#A3A3A3] truncate">{gift.recipientEmail}</p>
            )}
            {!gift.recipientEmail && (
              <p className="text-xs text-[#D4D4D4] dark:text-[#404040]">&mdash;</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">{gift.plan}</p>
            <p className="text-[11px] text-[#A3A3A3] dark:text-[#525252]">
              {gift.status === "paid" || gift.status === "redeemed" ? "Paid" : "Pending"} &middot; {gift.date}
            </p>
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-3">
          <StatusBadge status={gift.status} />
          {gift.status === "pending" && <CopyRedeemButton code={gift.redeemCode} />}
        </div>
      </div>
    </div>
  );
}

function ReceivedGiftCard({ gift }: { gift: ReceivedGift }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-b-0">
      <div className="h-8 w-8 rounded-full bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center shrink-0 mt-0.5">
        <Gift className="h-4 w-4 text-[#6366F1]" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
              From: {gift.senderName}
            </p>
            {gift.message && (
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] italic truncate">
                &ldquo;{gift.message}&rdquo;
              </p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">{gift.plan}</p>
            <p className="text-[11px] text-[#A3A3A3] dark:text-[#525252]">{gift.date}</p>
          </div>
        </div>
        {gift.activeUntil && (
          <p className="mt-1.5 text-xs text-[#16A34A]">
            Active until {gift.activeUntil}
          </p>
        )}
      </div>
    </div>
  );
}

function EmptyState({
  message,
  cta,
}: {
  message: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="px-4 py-8 text-center">
      <p className="text-sm text-[#A3A3A3] dark:text-[#525252]">{message}</p>
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-colors duration-150"
        >
          {cta.label}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function DashboardGifts() {
  const [sentGifts, setSentGifts] = useState<SentGift[]>([]);
  const [receivedGifts, setReceivedGifts] = useState<ReceivedGift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchGifts() {
      setLoading(true);
      try {
        const [sentRes, receivedRes] = await Promise.allSettled([
          fetch("/api/gift/sent"),
          fetch("/api/gift/received"),
        ]);

        if (!cancelled) {
          if (sentRes.status === "fulfilled" && sentRes.value.ok) {
            const data = await sentRes.value.json();
            setSentGifts(data.gifts ?? []);
          }
          if (receivedRes.status === "fulfilled" && receivedRes.value.ok) {
            const data = await receivedRes.value.json();
            setReceivedGifts(data.gifts ?? []);
          }
        }
      } catch {
        // API routes don't exist yet — gracefully show empty states
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGifts();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Gift SammaPix Pro
          </h1>
          <p className="mt-1 text-sm text-[#737373] dark:text-[#A3A3A3]">
            Send a Pro subscription to a friend or colleague.
          </p>
        </div>
        <Link
          href="/dashboard/gift"
          className="inline-flex items-center gap-1.5 shrink-0 px-4 py-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors duration-150"
        >
          Gift a subscription
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </div>

      <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] mb-8" />

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-5 w-5 text-[#A3A3A3] animate-spin" strokeWidth={1.5} />
        </div>
      )}

      {/* Content */}
      {!loading && (
        <div className="space-y-8">
          {/* Gifts Sent */}
          <div>
            <SectionLabel>
              Gifts Sent{sentGifts.length > 0 ? ` (${sentGifts.length})` : ""}
            </SectionLabel>
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-white dark:bg-[#1E1E1E]">
              {sentGifts.length === 0 ? (
                <EmptyState
                  message="You haven't sent any gifts yet."
                  cta={{ label: "Gift a subscription", href: "/gift" }}
                />
              ) : (
                sentGifts.map((gift) => <SentGiftCard key={gift.id} gift={gift} />)
              )}
            </div>
          </div>

          {/* Gifts Received */}
          <div>
            <SectionLabel>
              Gifts Received{receivedGifts.length > 0 ? ` (${receivedGifts.length})` : ""}
            </SectionLabel>
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-white dark:bg-[#1E1E1E]">
              {receivedGifts.length === 0 ? (
                <EmptyState message="No gifts received yet." />
              ) : (
                receivedGifts.map((gift) => <ReceivedGiftCard key={gift.id} gift={gift} />)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
