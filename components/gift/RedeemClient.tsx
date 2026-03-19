"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Gift, Check, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

type RedeemState = "loading" | "invalid" | "ready" | "redeeming" | "success";

interface GiftInfo {
  senderName: string;
  months: number;
  message?: string;
  color: string;
}

const COLOR_GRADIENTS: Record<string, string> = {
  indigo: "from-indigo-500 to-indigo-700",
  violet: "from-violet-500 to-violet-700",
  blue: "from-blue-500 to-blue-700",
  emerald: "from-emerald-500 to-emerald-700",
  rose: "from-rose-500 to-rose-700",
  amber: "from-amber-500 to-amber-700",
  cyan: "from-cyan-500 to-cyan-700",
  fuchsia: "from-fuchsia-500 to-fuchsia-700",
};

function getGradient(color: string): string {
  return COLOR_GRADIENTS[color] || COLOR_GRADIENTS.indigo;
}

export default function RedeemClient({ code }: { code: string }) {
  const { data: session, status: sessionStatus } = useSession();
  const [state, setState] = useState<RedeemState>("loading");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [giftInfo, setGiftInfo] = useState<GiftInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const checkGift = useCallback(async () => {
    try {
      const res = await fetch(`/api/gift/check?code=${encodeURIComponent(code)}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(
          data.error || "This gift code is invalid or has already been redeemed."
        );
        setState("invalid");
        return;
      }
      const data = await res.json();
      setGiftInfo({
        senderName: data.senderName,
        months: data.months,
        message: data.message,
        color: data.color || "indigo",
      });
      setState("ready");
    } catch {
      setErrorMessage("Something went wrong. Please try again later.");
      setState("invalid");
    }
  }, [code]);

  useEffect(() => {
    checkGift();
  }, [checkGift]);

  const handleRedeem = async () => {
    setIsRedeeming(true);
    try {
      const res = await fetch("/api/gift/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Failed to redeem gift. Please try again.");
        setIsRedeeming(false);
        setState("invalid");
        return;
      }
      setIsRedeeming(false);
      setState("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again later.");
      setIsRedeeming(false);
      setState("invalid");
    }
  };

  // Loading state
  if (state === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className="w-8 h-8 animate-spin text-[#A3A3A3] mx-auto mb-4"
            strokeWidth={1.5}
          />
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            Checking your gift code...
          </p>
        </div>
      </div>
    );
  }

  // Invalid / error state
  if (state === "invalid") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-5">
            <AlertCircle
              className="w-7 h-7 text-red-500"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-xl font-semibold text-[#171717] dark:text-white mb-2">
            Gift code not valid
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-8 leading-relaxed">
            {errorMessage}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#171717] dark:text-white bg-white dark:bg-[#191919] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] transition-colors"
          >
            Go to homepage
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (state === "success" && giftInfo) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center mx-auto mb-5">
            <Check
              className="w-7 h-7 text-green-600 dark:text-green-400"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-xl font-semibold text-[#171717] dark:text-white mb-2">
            Gift redeemed!
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-8 leading-relaxed">
            You now have {giftInfo.months} month{giftInfo.months > 1 ? "s" : ""} of
            SammaPix Pro.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-[#171717] text-white hover:bg-[#262626] transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    );
  }

  // Ready state
  if (state === "ready" && giftInfo) {
    const isLoggedIn = sessionStatus === "authenticated" && !!session;
    const isSessionLoading = sessionStatus === "loading";

    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Gift card visual */}
          <div
            className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${getGradient(
              giftInfo.color
            )} p-6 text-white mb-6`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <Gift className="w-full h-full" strokeWidth={0.5} />
            </div>
            <div className="relative z-10">
              <Gift className="w-6 h-6 mb-4 opacity-80" strokeWidth={1.5} />
              <p className="text-sm opacity-80 mb-1">A gift from</p>
              <p className="text-lg font-semibold mb-3">{giftInfo.senderName}</p>
              <div className="h-px bg-white/20 mb-3" />
              <p className="text-sm font-medium opacity-90">
                {giftInfo.months} month{giftInfo.months > 1 ? "s" : ""} of SammaPix
                Pro
              </p>
              {giftInfo.message && (
                <p className="mt-3 text-sm italic opacity-75 leading-relaxed">
                  &ldquo;{giftInfo.message}&rdquo;
                </p>
              )}
            </div>
          </div>

          {/* Action area */}
          <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-5">
            {isSessionLoading ? (
              <div className="flex items-center justify-center py-2">
                <Loader2
                  className="w-5 h-5 animate-spin text-[#A3A3A3]"
                  strokeWidth={1.5}
                />
              </div>
            ) : isLoggedIn ? (
              <>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 text-center leading-relaxed">
                  Signed in as{" "}
                  <span className="text-[#171717] dark:text-white font-medium">
                    {session.user?.email}
                  </span>
                </p>
                <button
                  onClick={handleRedeem}
                  disabled={isRedeeming}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-md bg-[#171717] text-white hover:bg-[#262626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRedeeming ? (
                    <>
                      <Loader2
                        className="w-4 h-4 animate-spin"
                        strokeWidth={1.5}
                      />
                      Redeeming...
                    </>
                  ) : (
                    <>
                      <Gift className="w-4 h-4" strokeWidth={1.5} />
                      Redeem your gift
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 text-center leading-relaxed">
                  Sign in to your account to redeem this gift.
                </p>
                <Link
                  href={`/auth/signin?callbackUrl=/gift/redeem/${encodeURIComponent(
                    code
                  )}`}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-md bg-[#171717] text-white hover:bg-[#262626] transition-colors"
                >
                  Sign in to redeem your gift
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback (should not reach here)
  return null;
}
