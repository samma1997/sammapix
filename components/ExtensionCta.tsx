"use client";

import { useEffect, useState } from "react";

// TODO: swap for the real Chrome Web Store listing URL once approved.
const STORE_URL = "https://chromewebstore.google.com/detail/hjapemceemgeefiojpngmnpblokkacgd";

function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#8B5CF6" />
      <g fill="#fff">
        <rect x="8" y="6" width="4" height="4" /><rect x="12" y="6" width="4" height="4" /><rect x="16" y="6" width="4" height="4" /><rect x="20" y="6" width="4" height="4" />
        <rect x="8" y="10" width="4" height="4" />
        <rect x="8" y="14" width="4" height="4" /><rect x="12" y="14" width="4" height="4" /><rect x="16" y="14" width="4" height="4" /><rect x="20" y="14" width="4" height="4" />
        <rect x="20" y="18" width="4" height="4" />
        <rect x="8" y="22" width="4" height="4" /><rect x="12" y="22" width="4" height="4" /><rect x="16" y="22" width="4" height="4" /><rect x="20" y="22" width="4" height="4" />
      </g>
    </svg>
  );
}

/**
 * Extension promo. Two variants:
 *  - "bar": slim dismissible strip, site-wide, high visibility
 *  - "card": a card for the bottom of tool pages, high-intent, non-intrusive
 */
export default function ExtensionCta({ variant = "card", forcePreview = false }: { variant?: "bar" | "card"; forcePreview?: boolean }) {
  const [show, setShow] = useState(forcePreview);
  useEffect(() => {
    if (forcePreview) return;
    try {
      if (localStorage.getItem("sp-ext-cta-dismissed") !== "1") setShow(true);
    } catch { setShow(true); }
  }, [forcePreview]);

  function dismiss() {
    setShow(false);
    try { localStorage.setItem("sp-ext-cta-dismissed", "1"); } catch {}
  }

  if (!show) return null;

  if (variant === "bar") {
    return (
      <div className="w-full bg-[#171717] text-white">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-center gap-x-3 gap-y-1.5 text-sm flex-wrap">
          <span className="inline-flex items-center gap-2">
            <Mark size={17} />
            <span><b className="font-semibold">New</b> — SammaPix for Chrome: grab, compress &amp; clean images on any page.</span>
          </span>
          <a href={STORE_URL} target="_blank" rel="noopener" className="inline-flex items-center rounded-md bg-white text-[#171717] font-semibold px-3 py-1.5 text-xs hover:bg-[#f0f0f0] transition-colors">
            Add to Chrome — free →
          </a>
          <button onClick={dismiss} aria-label="Dismiss" className="ml-1 text-white/60 hover:text-white text-lg leading-none">×</button>
        </div>
      </div>
    );
  }

  // card
  return (
    <div className="relative rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 overflow-hidden">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.14),transparent)] pointer-events-none" aria-hidden="true" />
      <div className="flex-none inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#2A2A2A]">
        <Mark size={26} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">Get SammaPix for Chrome</h3>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#6366F1] bg-[#F5F3FF] dark:bg-[#241d3a] px-2 py-0.5 rounded-full">Free</span>
        </div>
        <p className="mt-1 text-sm text-[#737373] dark:text-[#A3A3A3]">
          The whole toolbox in your side panel — plus grab every image from any page in bulk.
        </p>
      </div>
      <a href={STORE_URL} target="_blank" rel="noopener" className="flex-none inline-flex items-center justify-center rounded-lg bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] font-medium px-4 py-2.5 text-sm hover:opacity-90 transition-opacity">
        Add to Chrome →
      </a>
      <button onClick={dismiss} aria-label="Dismiss" className="absolute top-3 right-3 text-[#A3A3A3] hover:text-[#737373] text-lg leading-none sm:static sm:ml-1">×</button>
    </div>
  );
}
