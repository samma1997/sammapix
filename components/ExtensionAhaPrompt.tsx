"use client";

import { useEffect, useState } from "react";
import { EXTENSION_LIVE } from "@/lib/constants";

// TODO: swap for the real Chrome Web Store listing URL once approved.
const STORE_URL = "https://chromewebstore.google.com/search/SammaPix";

/**
 * Mounted once (in LayoutShell). Listens for a `sp:tool-success` window event that
 * tools dispatch after a successful action (compress, extract, download…) and, at
 * that "aha" moment, slides up a one-time invite to add the Chrome extension.
 * Hidden entirely until EXTENSION_LIVE is turned on.
 */
export default function ExtensionAhaPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!EXTENSION_LIVE) return;
    try { if (localStorage.getItem("sp-aha-dismissed") === "1") return; } catch {}
    let shown = false;
    const onSuccess = () => {
      if (shown) return;
      shown = true;
      window.setTimeout(() => setShow(true), 900); // let the download feel done first
    };
    // Universal trigger: any download link click = the user just got a result.
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && typeof t.closest === "function" && t.closest("a[download]")) onSuccess();
    };
    window.addEventListener("sp:tool-success", onSuccess as EventListener);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("sp:tool-success", onSuccess as EventListener);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  function dismiss() {
    setShow(false);
    try { localStorage.setItem("sp-aha-dismissed", "1"); } catch {}
  }

  if (!show) return null;

  return (
    <div className="fixed z-[70] left-1/2 bottom-5 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md animate-[spAha_.4s_cubic-bezier(.2,.7,.2,1)]">
      <style>{`@keyframes spAha{from{opacity:0;transform:translate(-50%,14px)}to{opacity:1;transform:translate(-50%,0)}}`}</style>
      <div className="rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1C1C1C] shadow-[0_20px_50px_-16px_rgba(23,23,23,0.35)] p-4 flex items-center gap-3.5">
        <div className="flex-none h-11 w-11 rounded-xl bg-[#F5F3FF] dark:bg-[#241d3a] inline-flex items-center justify-center">
          <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#8B5CF6" />
            <g fill="#fff"><rect x="8" y="6" width="4" height="4" /><rect x="12" y="6" width="4" height="4" /><rect x="16" y="6" width="4" height="4" /><rect x="20" y="6" width="4" height="4" /><rect x="8" y="10" width="4" height="4" /><rect x="8" y="14" width="4" height="4" /><rect x="12" y="14" width="4" height="4" /><rect x="16" y="14" width="4" height="4" /><rect x="20" y="14" width="4" height="4" /><rect x="20" y="18" width="4" height="4" /><rect x="8" y="22" width="4" height="4" /><rect x="12" y="22" width="4" height="4" /><rect x="16" y="22" width="4" height="4" /><rect x="20" y="22" width="4" height="4" /></g>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">Loved that? Keep it one click away</p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">Add SammaPix to Chrome — the whole toolbox in your side panel.</p>
        </div>
        <a href={STORE_URL} target="_blank" rel="noopener" className="flex-none inline-flex items-center rounded-lg bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] font-medium px-3.5 py-2 text-xs hover:opacity-90 transition-opacity">
          Add to Chrome
        </a>
        <button onClick={dismiss} aria-label="Dismiss" className="flex-none text-[#A3A3A3] hover:text-[#737373] text-lg leading-none -mt-0.5">×</button>
      </div>
    </div>
  );
}
