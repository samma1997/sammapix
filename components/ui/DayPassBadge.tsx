"use client";

/**
 * DayPassBadge — pill "Pro · Xh rimaste" durante un Day Pass attivo.
 *
 * Rinforza il valore ("sto usando una cosa che ho pagato") + leggera urgenza.
 * Legge la scadenza salvata in localStorage all'acquisto (sammapix_daypass_expires).
 * Si nasconde quando scade (e pulisce il flag). Globale, montato nei Providers.
 */
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export default function DayPassBadge() {
  const [msLeft, setMsLeft] = useState<number | null>(null);
  const [isIt, setIsIt] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsIt(window.location.pathname.startsWith("/it"));

    const read = () => {
      let exp = 0;
      try { exp = Number(localStorage.getItem("sammapix_daypass_expires") || 0); } catch { /* storage off */ }
      const ms = exp - Date.now();
      if (!exp || ms <= 0) {
        setMsLeft(null);
        if (exp && ms <= 0) { try { localStorage.removeItem("sammapix_daypass_expires"); } catch { /* */ } }
      } else {
        setMsLeft(ms);
      }
    };

    read();
    const onStart = () => read();
    window.addEventListener("daypass:started", onStart);
    const iv = setInterval(read, 60_000); // aggiorna ogni minuto
    return () => { window.removeEventListener("daypass:started", onStart); clearInterval(iv); };
  }, []);

  if (msLeft === null) return null;

  const h = Math.floor(msLeft / 3_600_000);
  const m = Math.floor((msLeft % 3_600_000) / 60_000);
  const label = h >= 1 ? `${h}h` : `${m}m`;
  const word = isIt ? "rimaste" : "left";

  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-[#6366F1]/30 bg-white/90 dark:bg-[#1E1E1E]/90 px-3 py-1.5 text-xs font-medium text-[#4338CA] dark:text-[#A5B4FC] shadow-lg backdrop-blur-sm"
      role="status"
      aria-label={`Day Pass Pro active, ${label} ${word}`}
    >
      <Zap className="h-3.5 w-3.5 text-[#6366F1]" strokeWidth={2} fill="currentColor" />
      <span>Pro · {label} {word}</span>
    </div>
  );
}
