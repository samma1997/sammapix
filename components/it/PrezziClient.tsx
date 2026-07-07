"use client";

import { useState } from "react";
import { Check, Sparkles, Zap } from "lucide-react";
import CheckoutButton from "@/components/ui/CheckoutButton";

// Pagina prezzi in italiano. Riusa lo stesso checkout (CheckoutButton + /api/checkout/day-pass).
// Prezzi in USD come il resto del sito (l'account Stripe fattura in USD).
export default function PrezziClient() {
  const [annual, setAnnual] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);

  const savePercent = Math.round((1 - 65 / (9 * 12)) * 100);

  async function handleDayPass() {
    setLoadingPass(true);
    try {
      const res = await fetch("/api/checkout/day-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "/it/prezzi" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setLoadingPass(false);
    } catch {
      setLoadingPass(false);
    }
  }

  const freeFeatures = [
    "Tutti gli strumenti inclusi",
    "20 file per volta (batch)",
    "10 operazioni AI al giorno",
    "Nessun download in ZIP",
    "Supporto della community",
  ];
  const proFeatures = [
    "Tutto del piano Free, più:",
    "200 crediti AI al giorno",
    "500 file per volta (batch)",
    "50 MB per file",
    "Download in ZIP",
    "Preset per flussi di lavoro AI",
    "Installa come app desktop",
    "Nessuna pubblicità, supporto prioritario",
  ];

  return (
    <div className="bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            Prezzi semplici, gratis per sempre
          </h1>
          <p className="mt-4 text-base text-[#737373] dark:text-[#A3A3A3]">
            Tutti gli strumenti nel browser, senza caricare nulla. Passa a Pro
            solo se ti serve più potenza. Nessuna carta per provare.
          </p>
        </header>

        {/* Toggle mensile / annuale */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!annual ? "bg-[#171717] dark:bg-white text-white dark:text-[#171717]" : "text-[#737373]"}`}
          >
            Mensile
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${annual ? "bg-[#171717] dark:bg-white text-white dark:text-[#171717]" : "text-[#737373]"}`}
          >
            Annuale <span className="text-indigo-500">risparmi ~{savePercent}%</span>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* FREE */}
          <div className="rounded-2xl border border-gray-200 dark:border-[#2A2A2A] p-6">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">Free</h2>
            <div className="mt-2 mb-4">
              <span className="text-4xl font-bold text-[#171717] dark:text-[#E5E5E5]">$0</span>
              <span className="text-[#737373]"> per sempre</span>
            </div>
            <ul className="space-y-2 mb-6">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" strokeWidth={2} /> {f}
                </li>
              ))}
            </ul>
            <a href="/it" className="block text-center w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-[#2A2A2A] text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-colors">
              Inizia gratis
            </a>
          </div>

          {/* PRO */}
          <div className="rounded-2xl border-2 border-[#6366F1] p-6 relative">
            <span className="absolute -top-3 left-6 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-xs font-semibold px-3 py-1 rounded-full">
              Più scelto
            </span>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">Pro</h2>
            <div className="mt-2 mb-4">
              <span className="text-4xl font-bold text-[#171717] dark:text-[#E5E5E5]">${annual ? "65" : "9"}</span>
              <span className="text-[#737373]">{annual ? " / anno" : " / mese"}</span>
              {annual && (
                <p className="text-xs text-[#6366F1] mt-1">Fatturato annualmente, risparmi ~{savePercent}% sul mensile</p>
              )}
            </div>
            <ul className="space-y-2 mb-6">
              {proFeatures.map((f, i) => (
                <li key={f} className={`flex items-start gap-2 text-sm ${i === 0 ? "font-medium text-[#171717] dark:text-[#E5E5E5]" : "text-[#525252] dark:text-[#A3A3A3]"}`}>
                  {i === 0 ? <Sparkles className="h-4 w-4 mt-0.5 shrink-0 text-[#6366F1]" strokeWidth={2} /> : <Check className="h-4 w-4 mt-0.5 shrink-0 text-[#6366F1]" strokeWidth={2} />} {f}
                </li>
              ))}
            </ul>
            <CheckoutButton size="md" className="w-full gap-1" plan={annual ? "annual" : "monthly"}>
              Passa a Pro
            </CheckoutButton>
          </div>
        </div>

        {/* DAY PASS */}
        <div className="mt-6 rounded-2xl border border-gray-200 dark:border-[#2A2A2A] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
            <div>
              <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">Ti serve solo per oggi? Day Pass a $2,99</h3>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">Sblocca tutte le funzioni Pro per 24 ore. Nessun abbonamento.</p>
            </div>
          </div>
          <button
            onClick={handleDayPass}
            disabled={loadingPass}
            className="shrink-0 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors disabled:opacity-60"
          >
            {loadingPass ? "Attendi…" : "Prendi il Day Pass — $2,99"}
          </button>
        </div>

        <p className="text-center text-xs text-[#A3A3A3] mt-8">
          Pagamento sicuro con Stripe. Puoi disdire quando vuoi. I prezzi sono in dollari USA.
        </p>
      </div>
    </div>
  );
}
