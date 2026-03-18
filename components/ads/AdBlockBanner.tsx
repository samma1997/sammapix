"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  detectAdBlock,
  hasAdBlockBannerBeenDismissed,
  dismissAdBlockBanner,
} from "@/lib/adblock-detector";

export default function AdBlockBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (hasAdBlockBannerBeenDismissed()) return;

    detectAdBlock().then((hasAdBlock) => {
      if (!cancelled && hasAdBlock) {
        setVisible(true);
      }
    });

    return () => { cancelled = true; };
  }, []);

  const handleDismiss = () => {
    dismissAdBlockBanner();
    setVisible(false);
  };

  if (!visible || pathname?.startsWith("/dashboard")) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] animate-slide-up">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <Heart className="h-4 w-4 text-gray-400 shrink-0" strokeWidth={1.5} />
        <p className="flex-1 text-sm text-gray-600 dark:text-[#A3A3A3]">
          Looks like you&apos;re using an ad blocker. SammaPix is free because of ads.
          <span className="hidden sm:inline">
            {" "}Consider whitelisting us- or go Pro to remove them entirely.
          </span>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://support.google.com/chrome/answer/157179"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5] border border-gray-200 dark:border-[#2A2A2A] rounded px-2 py-1 transition-colors hidden sm:block"
          >
            Whitelist
          </a>
          <Link href="/pricing">
            <Button variant="primary" size="sm">
              Get Pro
            </Button>
          </Link>
          <button
            onClick={handleDismiss}
            className="p-1 text-gray-400 dark:text-[#737373] hover:text-gray-700 dark:hover:text-[#A3A3A3] rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
