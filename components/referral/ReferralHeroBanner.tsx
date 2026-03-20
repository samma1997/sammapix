"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Gift, X } from "lucide-react";

/**
 * Full-width top banner for referred users (when ?ref= cookie is present).
 * Shows only when the user is NOT logged in and a referral cookie exists.
 */
export default function ReferralHeroBanner() {
  const { status } = useSession();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status === "authenticated") return;

    // Check for ref cookie or ref in URL
    const hasRefCookie = document.cookie.split(";").some((c) => c.trim().startsWith("ref="));
    const params = new URLSearchParams(window.location.search);
    const hasRefParam = params.has("ref");

    if (hasRefCookie || hasRefParam) {
      setVisible(true);
    }
  }, [status]);

  if (!visible || dismissed || status === "authenticated") return null;

  return (
    <div className="w-full bg-[#8B5CF6] text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3">
        <Gift className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        <p className="text-sm font-medium text-center">
          You were invited &mdash; sign up and get 50 free AI ops
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
