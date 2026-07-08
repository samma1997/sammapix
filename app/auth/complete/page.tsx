"use client";

/**
 * /auth/complete — Auto-login dopo un checkout Stripe riuscito.
 *
 * Stripe reindirizza qui con ?session_id=cs_... dopo il pagamento.
 * Questa pagina chiama signIn("stripe-checkout") che verifica server-side
 * la checkout session e crea la sessione NextAuth, poi redireziona al dest.
 *
 * Sicurezza: la verifica avviene nel CredentialsProvider.authorize()
 * server-side via Stripe API — il client non può falsificare nulla.
 */

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Sparkles } from "lucide-react";

function CompleteInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams.get("session_id") ?? "";
  const rawDest = searchParams.get("dest") ?? "/dashboard";
  // Only allow internal relative paths (block open redirect to //evil.com etc).
  const dest = rawDest.startsWith("/") && !rawDest.startsWith("//") ? rawDest : "/dashboard";

  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!sessionId.startsWith("cs_")) {
      setErrorMsg("Link di pagamento non valido.");
      setStatus("error");
      return;
    }

    let cancelled = false;

    async function complete() {
      try {
        const result = await signIn("stripe-checkout", {
          session_id: sessionId,
          redirect: false,
        });

        if (cancelled) return;

        if (result?.ok && !result.error) {
          // Login riuscito — redirect verso la destinazione
          router.push(dest);
        } else {
          // Sessione già usata, non pagata, o errore interno
          setErrorMsg(
            result?.error === "CredentialsSignin"
              ? "Non è stato possibile verificare il pagamento. Se hai appena pagato, attendi qualche secondo e riprova."
              : "Si è verificato un errore durante l'accesso automatico."
          );
          setStatus("error");
        }
      } catch {
        if (!cancelled) {
          setErrorMsg("Errore di connessione. Riprova o accedi manualmente.");
          setStatus("error");
        }
      }
    }

    complete();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "error") {
    return (
      <div className="min-h-screen bg-white dark:bg-[#191919] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="h-10 w-10 rounded-lg border border-gray-200 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1E1E1E] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-brand" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
            Qualcosa non ha funzionato
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#737373] mb-6 leading-relaxed">
            {errorMsg}
          </p>
          <a
            href="/auth/signin"
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90 transition-colors"
          >
            Accedi manualmente
          </a>
          <p className="mt-4 text-xs text-gray-400 dark:text-[#525252]">
            Se hai pagato e non riesci ad accedere,{" "}
            <a
              href="mailto:support@sammapix.com"
              className="underline underline-offset-2 hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
            >
              contattaci
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center mb-6">
          <div className="h-10 w-10 rounded-lg border border-gray-200 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1E1E1E] flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-brand" strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
          Configurazione account in corso...
        </h1>
        <p className="text-sm text-gray-500 dark:text-[#737373] mb-6">
          Non chiudere questa pagina.
        </p>
        {/* Spinner */}
        <div className="flex justify-center">
          <div className="h-6 w-6 rounded-full border-2 border-brand border-t-transparent animate-spin" />
        </div>
      </div>
    </div>
  );
}

export default function AuthCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-[#191919] flex items-center justify-center">
          <div className="h-6 w-6 rounded-full border-2 border-brand border-t-transparent animate-spin" />
        </div>
      }
    >
      <CompleteInner />
    </Suspense>
  );
}
