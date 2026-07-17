"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import AdUnit from "@/components/ads/AdUnit";

/**
 * Annuncio a fine articolo del blog.
 * Solo utenti anonimi: AdUnit gia' fa il gate, qui gatiamo anche il messaggio
 * "registrati per togliere gli ads", che trasforma l'annuncio in una leva di
 * conversione alla registrazione.
 *
 * Se AdSense non riempie lo spazio (es. sito non ancora approvato, o nessun
 * annuncio disponibile), nascondiamo tutto il blocco per non lasciare un buco
 * bianco. Riappare da solo appena c'e' un annuncio vero.
 */
export default function ArticleAd() {
  const { status } = useSession();
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (status !== "unauthenticated") return;
    const t = setTimeout(() => {
      const ins = ref.current?.querySelector("ins.adsbygoogle");
      // AdSense imposta data-ad-status="filled" quando serve un annuncio,
      // "unfilled" quando non ne ha. Se non e' filled, nascondi il blocco.
      if (ins?.getAttribute("data-ad-status") !== "filled") setHidden(true);
    }, 4000);
    return () => clearTimeout(t);
  }, [status]);

  if (status !== "unauthenticated" || hidden) return null;

  return (
    <div ref={ref} className="my-10">
      <p className="text-[10px] uppercase tracking-wide text-[#A3A3A3] dark:text-[#525252] mb-1.5">
        Pubblicità
      </p>
      <AdUnit adSlot="2928846393" className="rounded-lg overflow-hidden" />
      <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-2">
        Vedi questa pubblicità perché non hai un account.{" "}
        <a
          href="/auth/signin"
          className="text-[#6366F1] hover:underline font-medium"
        >
          Registrati gratis
        </a>{" "}
        per navigare senza annunci.
      </p>
    </div>
  );
}
