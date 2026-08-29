"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface AdUnitProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
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
  const { status } = useSession();
  const initialized = useRef(false);

  // ── Regola: annunci SOLO per utenti anonimi (non loggati). ──────────────────
  // Se l'utente fa accesso (free o Pro), zero annunci: il "niente pubblicita'"
  // e' un motivo per registrarsi e tiene pulita l'esperienza di chi si impegna.
  // "loading" non conta come anonimo, cosi' evitiamo il flash di un annuncio
  // che poi sparisce quando si scopre che l'utente e' loggato.
  const isAnonymous = status === "unauthenticated";
  const inDashboard = pathname?.startsWith("/dashboard");
  const isProd = process.env.NODE_ENV === "production";
  const showAd = isAnonymous && !inDashboard;

  useEffect(() => {
    if (!showAd || !isProd || initialized.current) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded or blocked
    }
  }, [showAd, isProd]);

  // Loggati (free/Pro), dashboard, o sessione ancora in caricamento: niente annuncio.
  if (!showAd) return null;

  // In sviluppo: niente annuncio nè placeholder (fastidiosi mentre si sviluppa).
  if (!isProd) return null;

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      data-ad-client={(process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "ca-pub-4145672488138909").trim()}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}
