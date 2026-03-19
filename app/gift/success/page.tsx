"use client";

import React, { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Copy, Gift, ArrowRight } from "lucide-react";

export default function GiftSuccessPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [copied, setCopied] = useState(false);

  const redeemUrl = code ? `https://sammapix.com/gift/redeem/${code}` : "";

  const handleCopy = useCallback(async () => {
    if (!redeemUrl) return;
    try {
      await navigator.clipboard.writeText(redeemUrl);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = redeemUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }, [redeemUrl]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#16A34A]/10">
          <Check className="h-8 w-8 text-[#16A34A]" strokeWidth={2} />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-[#171717] dark:text-white">
          Gift purchased!
        </h1>
        <p className="mt-2 text-sm text-[#737373] dark:text-[#A3A3A3]">
          Your gift is ready to be shared. Send the redeem link to the recipient.
        </p>

        {/* Redeem link box */}
        {code && (
          <div className="mt-8 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="h-4 w-4 text-[#6366F1]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Redeem link
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                readOnly
                value={redeemUrl}
                className="flex-1 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] px-3 py-2 text-sm text-[#171717] dark:text-[#E5E5E5] select-all outline-none"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 rounded-md bg-[#171717] dark:bg-[#E5E5E5] px-3.5 py-2 text-sm font-medium text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" strokeWidth={2} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Copy
                  </>
                )}
              </button>
            </div>

            <p className="mt-3 text-xs text-[#A3A3A3] dark:text-[#525252]">
              Share this link with the recipient. They will need to sign in to redeem.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/gifts"
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] px-4 py-2.5 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors"
          >
            View your gifts
          </Link>
          <Link
            href="/gift"
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#171717] dark:bg-[#E5E5E5] px-4 py-2.5 text-sm font-medium text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
          >
            Gift another
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
