"use client";

/**
 * CoffeePopup — a friendly first-visit nudge for free users.
 *
 * Privacy-first: everything is localStorage only, nothing is sent to a server.
 * Non-blocking corner card (not a full-screen interstitial) so it never covers
 * content on load and stays clear of Google's intrusive-interstitial rules.
 *
 * Either/or ask: buy a coffee (Stripe pay-what-you-want) OR follow Luca's
 * photography on Instagram, so people who won't pay can still give a follow.
 */

import { useEffect, useState } from "react";

const COFFEE_URL = "https://buy.stripe.com/28EcN53Q2bJufav8ZVbII03";
const INSTAGRAM_URL = "https://www.instagram.com/lucasammarco.web/";

const KEY_COFFEE_DONE = "sx_coffee_done"; // permanent: clicked, or "don't show again"
const KEY_COFFEE_SNOOZE = "sx_coffee_snooze"; // timestamp: hidden until then (X / snooze)
const AFTER_DOWNLOAD_MS = 1500; // show shortly AFTER the download completes
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000; // soft dismiss hides it for 14 days

export default function CoffeePopup() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canShow = () => {
      try {
        if (localStorage.getItem(KEY_COFFEE_DONE)) return false;
        const snooze = parseInt(localStorage.getItem(KEY_COFFEE_SNOOZE) ?? "0", 10);
        if (snooze && Date.now() < snooze) return false;
        return true;
      } catch {
        return false;
      }
    };

    // Show ONLY after the user actually downloaded their result (task done,
    // value delivered). Fired by downloadBlob() / incrementDownloadCount().
    let shown = false;
    const onDownload = () => {
      if (shown || !canShow()) return;
      shown = true;
      setTimeout(() => setOpen(true), AFTER_DOWNLOAD_MS);
    };
    window.addEventListener("sx:file-downloaded", onDownload);
    return () => window.removeEventListener("sx:file-downloaded", onDownload);
  }, []);

  const permanentDone = () => {
    try { localStorage.setItem(KEY_COFFEE_DONE, "1"); } catch {}
  };
  const doSnooze = () => {
    try { localStorage.setItem(KEY_COFFEE_SNOOZE, String(Date.now() + SNOOZE_MS)); } catch {}
  };

  const animateOut = (after: () => void) => {
    setClosing(true);
    after();
    setTimeout(() => setOpen(false), 220);
  };

  const close = () => animateOut(doSnooze); // X: comes back in 14 days
  const dontShow = () => animateOut(permanentDone); // permanent

  const onCoffee = () => {
    permanentDone();
    window.open(COFFEE_URL, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Support SammaPix"
      className="fixed bottom-4 right-4 z-[9999] w-[340px] max-w-[calc(100vw-2rem)]"
      style={{
        animation: closing
          ? "sx-coffee-out 0.2s cubic-bezier(0.32,0.72,0,1) forwards"
          : "sx-coffee-in 0.45s cubic-bezier(0.32,0.72,0,1)",
      }}
    >
      <style>{`
        @keyframes sx-coffee-in { from { opacity:0; transform: translateY(18px) scale(0.96) } to { opacity:1; transform: translateY(0) scale(1) } }
        @keyframes sx-coffee-out { to { opacity:0; transform: translateY(18px) scale(0.96) } }
      `}</style>

      <div className="relative rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1B1B1B] shadow-2xl shadow-black/10 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#6366F1] via-[#DD2A7B] to-[#F58529]" />

        <div className="p-5">
          {/* Close (X) — soft snooze */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-3 right-3 h-7 w-7 flex items-center justify-center rounded-lg text-[#A3A3A3] hover:text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#262626] transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {/* Header: photo + name */}
          <div className="flex items-center gap-3 mb-3.5">
            <img
              src="/luca-sammarco.jpg"
              alt="Luca Sammarco"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover shrink-0 ring-2 ring-[#EEF0FF] dark:ring-[#2A2A2A]"
            />
            <div>
              <p className="text-[15px] font-semibold text-[#171717] dark:text-[#E5E5E5] leading-tight">
                Hey, I&apos;m Luca 👋
              </p>
              <p className="text-[12px] text-[#A3A3A3] leading-tight mt-0.5">maker of SammaPix</p>
            </div>
          </div>

          <p className="text-[13.5px] leading-relaxed text-[#525252] dark:text-[#A3A3A3] mb-4">
            All 90+ tools are free and run in your browser, nothing uploaded. If SammaPix helps you, pick one, either one makes my day:
          </p>

          {/* Either / or CTAs with icons */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={onCoffee}
              className="group flex items-center gap-3 w-full bg-[#6366F1] hover:bg-[#5457E5] text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-lg shrink-0">☕</span>
              <span className="flex-1 text-left leading-tight">Buy me a coffee<br/><span className="text-[11px] font-normal text-white/80">any amount, one time</span></span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:translate-x-0.5 transition-transform"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={permanentDone}
              className="group flex items-center gap-3 w-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-sm font-semibold px-4 py-3 rounded-xl hover:opacity-95 transition-opacity"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
              </span>
              <span className="flex-1 text-left leading-tight">Follow my photography<br/><span className="text-[11px] font-normal text-white/85">@lucasammarco.web</span></span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:translate-x-0.5 transition-transform"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>

          {/* Bottom dismiss — permanent, friendly */}
          <button
            onClick={dontShow}
            className="mt-3.5 block w-full text-center text-[12px] text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#C4C4C4] transition-colors"
          >
            Don&apos;t show again, take me to my files
          </button>
        </div>
      </div>
    </div>
  );
}
