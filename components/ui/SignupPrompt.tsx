"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "sammapix-signup-prompt-dismissed";
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const SHOW_DELAY_MS = 30_000; // 30 seconds

export default function SignupPrompt() {
  const { status } = useSession();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Never show inside the dashboard (it has its own layout)
    if (pathname.startsWith("/dashboard")) return;
    // Only run for unauthenticated users
    if (status === "loading" || status === "authenticated") return;

    // Check if previously dismissed within 24h
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const dismissedAt = parseInt(raw, 10);
        if (!isNaN(dismissedAt) && Date.now() - dismissedAt < DISMISS_DURATION_MS) {
          return;
        }
      }
    } catch {
      // localStorage not available- just show
    }

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [status, pathname]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  }

  if (!visible) return null;

  return (
    <div
      role="complementary"
      aria-label="Sign up prompt"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#171717] text-white shadow-lg"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Message */}
        <p className="text-sm text-[#D4D4D4] leading-snug">
          <span className="font-semibold text-white">Sign up free</span>
          {" "} - get your personal dashboard + AI tools (5 renames/day)
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/api/auth/signin"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-white text-[#171717] text-sm font-semibold hover:bg-[#E5E5E5] transition-colors whitespace-nowrap"
          >
            Create account
          </Link>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="p-1.5 rounded-sm text-[#A3A3A3] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
