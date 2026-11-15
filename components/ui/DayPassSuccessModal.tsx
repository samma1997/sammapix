"use client";

/**
 * DayPassSuccessModal — momento celebrativo post-acquisto Day Pass.
 *
 * Globale: montato nei Providers, si attiva su QUALSIASI pagina quando l'URL ha
 * ?daypass=active (il checkout ora riporta l'utente al TOOL che stava usando).
 * - Celebra + mostra cosa ha sbloccato.
 * - Rinfresca la sessione (il JWT prende subito il piano Pro).
 * - Rassicura (il pass è salvato, niente più "anonimo e basta").
 * - "Continua" → chiude e resta sul tool per usarlo subito.
 */
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Sparkles, Package, Layers, Zap, Ban, Clock, ArrowRight } from "lucide-react";

const PERKS = [
  { icon: Layers, text: "Batch fino a 500 file in una volta" },
  { icon: Package, text: "Download ZIP di tutti i risultati" },
  { icon: Zap, text: "200 operazioni AI al giorno" },
  { icon: Ban, text: "Niente pubblicità" },
];

const PERKS_EN = [
  { icon: Layers, text: "Batch up to 500 files at once" },
  { icon: Package, text: "ZIP download of all your results" },
  { icon: Zap, text: "200 AI operations per day" },
  { icon: Ban, text: "No ads" },
];

export default function DayPassSuccessModal() {
  const [open, setOpen] = useState(false);
  const [isIt, setIsIt] = useState(false);
  const { update } = useSession();

  // Apre la modale + rinfresca il piano Pro. Chiamato sia dal param URL (flusso
  // redirect) sia da un evento custom (flusso Express inline, che NON ricarica la
  // pagina così l'utente non perde i file che aveva caricato).
  function celebrate() {
    if (typeof window === "undefined") return;
    setIsIt(window.location.pathname.startsWith("/it"));
    setOpen(true);
    update().catch(() => {}); // JWT prende subito il piano Pro
    // Segna che l'utente ha comprato un Day Pass: alla scadenza l'upsell diventa
    // un re-sell a caldo ("le tue 24h sono finite, riprendi").
    try { localStorage.setItem("sammapix_daypass_had", String(Date.now())); } catch { /* storage off */ }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1) Flusso redirect: ?daypass=active nell'URL.
    const params = new URLSearchParams(window.location.search);
    if (params.get("daypass") === "active") {
      celebrate();
      params.delete("daypass");
      const q = params.toString();
      window.history.replaceState({}, "", window.location.pathname + (q ? `?${q}` : "") + window.location.hash);
    }

    // 2) Flusso Express inline: evento custom, niente reload (stato preservato).
    const onEvt = () => celebrate();
    window.addEventListener("daypass:success", onEvt);
    return () => window.removeEventListener("daypass:success", onEvt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const perks = isIt ? PERKS : PERKS_EN;
  const t = (it: string, en: string) => (isIt ? it : en);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby="daypass-success-desc"
          className={[
            "fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2",
            "max-h-[90vh] overflow-y-auto rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A]",
            "bg-white dark:bg-[#1E1E1E] p-7 shadow-2xl text-center",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%]",
            "duration-300",
          ].join(" ")}
        >
          {/* Icona celebrativa */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-lg shadow-[#6366F1]/30">
            <Sparkles className="h-7 w-7 text-white" strokeWidth={1.75} />
          </div>

          <Dialog.Title className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            {t("Sei Pro per 24 ore! 🎉", "You're Pro for 24 hours! 🎉")}
          </Dialog.Title>
          <p id="daypass-success-desc" className="mt-1.5 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            {t(
              "Pagamento riuscito. Hai sbloccato tutto, qui sotto cosa puoi fare adesso:",
              "Payment successful. Everything's unlocked — here's what you can do now:",
            )}
          </p>

          {/* Cosa ha sbloccato */}
          <div className="mt-5 space-y-2.5 text-left">
            {perks.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6366F1]/10 dark:bg-[#6366F1]/15">
                  <p.icon className="h-4 w-4 text-[#6366F1]" strokeWidth={1.75} />
                </div>
                <span className="text-sm text-[#171717] dark:text-[#E5E5E5]">{p.text}</span>
              </div>
            ))}
          </div>

          {/* Rassicurazione: pass salvato + scadenza */}
          <div className="mt-5 flex items-start gap-2 rounded-lg bg-[#FAFAFA] dark:bg-[#252525] px-3 py-2.5 text-left">
            <Clock className="h-4 w-4 shrink-0 mt-0.5 text-[#737373]" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              {t(
                "Il tuo pass è attivo e salvato: continui dove avevi lasciato. Ti avvisiamo prima che scada.",
                "Your pass is active and saved — pick up right where you left off. We'll remind you before it expires.",
              )}
            </p>
          </div>

          {/* CTA: torna a usare il tool (sei già sulla pagina giusta) */}
          <button
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#171717] dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-[#171717] transition-colors hover:bg-[#2A2A2A] dark:hover:bg-gray-100"
          >
            {t("Inizia a usarlo", "Start using it")}
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
