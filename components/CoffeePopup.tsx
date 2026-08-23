"use client";

/**
 * CoffeePopup — a gentle, one-time "buy me a coffee" nudge for loyal free users.
 *
 * Privacy-first by design: everything is tracked in localStorage only, nothing
 * is ever sent to a server. It counts how many separate visits (days/sessions)
 * a person has made and, once they have come back a few times, shows a single
 * friendly coffee invite. Dismissed or clicked, it never shows again.
 *
 * This targets the ~8% who return but never pay a Day Pass (they got their free
 * result and are done). No pressure, the tools stay free.
 */

import { useEffect, useState } from "react";

const COFFEE_URL = "https://buy.stripe.com/28EcN53Q2bJufav8ZVbII03";
const INSTAGRAM_URL = "https://www.instagram.com/lucasammarco.web/";

const KEY_VISITS = "sx_visits";
const KEY_LAST_VISIT_DAY = "sx_last_visit_day";
const KEY_COFFEE_DONE = "sx_coffee_done"; // permanent: clicked coffee or "don't ask again"
const KEY_COFFEE_SNOOZE = "sx_coffee_snooze"; // timestamp: hidden until then ("Not now")
const VISITS_THRESHOLD = 3; // show from the 3rd distinct visit onwards
const APPEAR_DELAY_MS = 25000; // let them use the tool first
const SNOOZE_MS = 21 * 24 * 60 * 60 * 1000; // "Not now" hides it for 21 days

function todayStr(): string {
  // Local date only (no time) so multiple sessions in one day count as one visit.
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function CoffeePopup() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(KEY_COFFEE_DONE)) return;
      // Snoozed via "Not now"? Stay hidden until the snooze expires.
      const snooze = parseInt(localStorage.getItem(KEY_COFFEE_SNOOZE) ?? "0", 10);
      if (snooze && Date.now() < snooze) return;

      // Count a new visit once per calendar day.
      const today = todayStr();
      const lastDay = localStorage.getItem(KEY_LAST_VISIT_DAY);
      let visits = parseInt(localStorage.getItem(KEY_VISITS) ?? "0", 10) || 0;
      if (lastDay !== today) {
        visits += 1;
        localStorage.setItem(KEY_VISITS, String(visits));
        localStorage.setItem(KEY_LAST_VISIT_DAY, today);
      }

      if (visits < VISITS_THRESHOLD) return;

      const t = setTimeout(() => setOpen(true), APPEAR_DELAY_MS);
      return () => clearTimeout(t);
    } catch {
      /* localStorage blocked — do nothing */
    }
  }, []);

  const permanentDone = () => {
    try { localStorage.setItem(KEY_COFFEE_DONE, "1"); } catch {}
  };
  const snooze = () => {
    try { localStorage.setItem(KEY_COFFEE_SNOOZE, String(Date.now() + SNOOZE_MS)); } catch {}
  };

  // "Not now" / X: snooze, so it reappears in ~3 weeks if they keep coming back.
  const close = () => {
    setClosing(true);
    snooze();
    setTimeout(() => setOpen(false), 220);
  };

  // "Don't ask me again": gone for good.
  const dontAsk = () => {
    setClosing(true);
    permanentDone();
    setTimeout(() => setOpen(false), 220);
  };

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
      className="fixed bottom-4 right-4 z-[9999] w-[320px] max-w-[calc(100vw-2rem)]"
      style={{
        animation: closing
          ? "sx-coffee-out 0.2s cubic-bezier(0.32,0.72,0,1) forwards"
          : "sx-coffee-in 0.42s cubic-bezier(0.32,0.72,0,1)",
      }}
    >
      <style>{`
        @keyframes sx-coffee-in { from { opacity:0; transform: translateY(16px) scale(0.96) } to { opacity:1; transform: translateY(0) scale(1) } }
        @keyframes sx-coffee-out { to { opacity:0; transform: translateY(16px) scale(0.96) } }
        @keyframes sx-coffee-steam { 0%,100%{ opacity:.3; transform: translateY(0) } 50%{ opacity:.9; transform: translateY(-3px) } }
      `}</style>
      <div className="relative rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1B1B1B] shadow-xl shadow-black/10 p-5">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 h-6 w-6 flex items-center justify-center rounded-md text-[#A3A3A3] hover:text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#262626] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Foto di Luca — rende personale e richiama l'angolo fotografia/IG */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src="/luca-sammarco.jpg"
            alt="Luca Sammarco"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover shrink-0 border border-[#E5E5E5] dark:border-[#2A2A2A]"
          />
          <div>
            <p className="text-[14px] font-semibold text-[#171717] dark:text-[#E5E5E5] leading-tight">
              You keep coming back, thanks. 🙏
            </p>
            <p className="text-[12px] text-[#A3A3A3] leading-tight mt-0.5">Luca, maker of SammaPix</p>
          </div>
        </div>
        <p className="text-[13px] leading-relaxed text-[#525252] dark:text-[#A3A3A3] mb-4">
          SammaPix is free and always will be. If it saves you time, pick one, either one makes my day:
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={onCoffee}
            className="w-full bg-[#6366F1] hover:bg-[#5457E5] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            ☕ Buy me a coffee
          </button>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={permanentDone}
            className="w-full text-center bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            📸 Follow my photography on Instagram
          </a>
        </div>

        {/* Dismiss: Not now (ricompare fra ~3 sett) vs mai piu */}
        <div className="mt-3 flex items-center justify-center gap-4">
          <button onClick={close} className="text-[12px] text-[#A3A3A3] hover:text-[#525252] transition-colors">
            Not now
          </button>
          <span className="text-[#E5E5E5] dark:text-[#333]">·</span>
          <button onClick={dontAsk} className="text-[12px] text-[#C4C4C4] dark:text-[#5A5A5A] hover:text-[#A3A3A3] transition-colors">
            Don&apos;t ask again
          </button>
        </div>
      </div>
    </div>
  );
}
