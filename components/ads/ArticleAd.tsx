"use client";

import { useSession } from "next-auth/react";
import AdUnit from "@/components/ads/AdUnit";

/**
 * Annuncio a fine articolo del blog.
 * Solo utenti anonimi: AdUnit gia' fa il gate, qui gatiamo anche il messaggio
 * "registrati per togliere gli ads", che trasforma l'annuncio in una leva di
 * conversione alla registrazione (chi si registra toglie la pubblicita').
 */
export default function ArticleAd() {
  const { status } = useSession();
  if (status !== "unauthenticated") return null;

  return (
    <div className="my-10">
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
