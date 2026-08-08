"use client";

import { useSession } from "next-auth/react";
import AdUnit from "@/components/ads/AdUnit";

/**
 * Banner orizzontale IN ALTO (sopra il tool, sotto la navbar) — la posizione a
 * resa piu' alta (above the fold = piu' viewability = RPM migliore).
 * Solo desktop/tablet (md+): su mobile NON lo mettiamo, per non spingere giu' la
 * dropzone (chi arriva deve usare il tool subito, se no rimbalza e Google declassa).
 * Altezza riservata (minHeight) per non causare layout shift (CLS = danno SEO).
 * Solo utenti anonimi (AdUnit fa gia' il gate: loggati/Pro = zero ads).
 */
export default function TopLeaderboardAd() {
  const { status } = useSession();
  if (status !== "unauthenticated") return null;

  return (
    <div className="hidden md:block max-w-5xl mx-auto px-4 sm:px-6 pt-4">
      <div style={{ minHeight: 90 }}>
        <AdUnit adSlot="2928846393" adFormat="horizontal" className="rounded-lg overflow-hidden" />
      </div>
    </div>
  );
}
