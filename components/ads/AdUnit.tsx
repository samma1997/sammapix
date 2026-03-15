"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface AdUnitProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({
  adSlot,
  adFormat = "auto",
  className = "",
}: AdUnitProps) {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded or blocked
    }
  }, []);

  // Don't render in dashboard
  if (pathname?.startsWith("/dashboard")) return null;

  // Don't render in development
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded text-xs text-gray-400 ${className}`}
        style={{ minHeight: 90 }}
      >
        Ad placeholder (dev)
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}
