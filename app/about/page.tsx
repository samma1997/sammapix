import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Chi sono — Luca Sammarco, Travel Photographer & Tool Builder | SammaPix",
  description:
    "Sono Luca Sammarco: fotografo di viaggio e sviluppatore. Ho costruito SammaPix per risolvere i problemi che avevo io stesso con l'ottimizzazione delle immagini. Scopri la mia storia e il mio workflow.",
};

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

      {/* Header */}
      <header className="mb-12">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Chi sono</p>
        <h1 className="text-2xl font-semibold text-[#171717] leading-snug mb-4">
          Luca Sammarco
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Travel photographer. Developer. Costruisco strumenti per risolvere problemi che incontro io stesso sul campo.
        </p>
        <div className="mt-6 h-px bg-gray-100" />
      </header>

      {/* Storia */}
      <section className="mb-12 space-y-5 text-sm text-gray-600 leading-relaxed">
        <p>
          Ho iniziato a fotografare seriamente durante il primo viaggio in Asia — Sri Lanka, 2025.
          Tornavo a casa con centinaia di file: RAW da convertire, JPEG da comprimere, nomi casuali
          da sistemare prima di caricarli sul sito. Un processo lungo, ripetitivo, che rubava tempo
          che avrei preferito passare a scattare o a editare.
        </p>
        <p>
          Ho cercato una soluzione: nessuno strumento gratuito faceva tutto in un posto solo.
          TinyPNG comprime ma non rinomina. Squoosh è ottimo per un file alla volta ma non gestisce
          batch. I tool con AI per il rinomino o costano o caricano le tue foto su server di terzi.
          Per un fotografo che vuole proteggere il proprio lavoro, non va bene.
        </p>
        <p>
          Così ho costruito <strong className="text-[#171717] font-medium">SammaPix</strong>: compressione batch,
          conversione WebP, e rinomino AI — tutto direttamente nel browser.
          Nessun upload, nessun account obbligatorio per le funzioni base, nessuna foto che lascia
          il tuo dispositivo senza il tuo consenso.
        </p>
        <p>
          L&apos;obiettivo non è diventare un&apos;altra piattaforma di massa. È costruire il workflow
          che avrei voluto avere io — e renderlo disponibile a chiunque lavori con le immagini:
          fotografi di viaggio, wedding photographer, content creator, sviluppatori web.
        </p>
      </section>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-12" />

      {/* Workflow */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-[#171717] mb-4 lowercase tracking-wide">
          il mio workflow post-viaggio
        </h2>
        <ol className="space-y-4 text-sm text-gray-600">
          <li className="flex gap-3">
            <span className="text-xs text-gray-300 font-mono pt-0.5 select-none">01</span>
            <div>
              <p className="font-medium text-[#171717]">Selezione e edit in Lightroom</p>
              <p className="text-gray-500 mt-0.5">
                Export JPEG a qualità 85 — bilanciamento qualità/peso ottimale per il web.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-xs text-gray-300 font-mono pt-0.5 select-none">02</span>
            <div>
              <p className="font-medium text-[#171717]">Compressione batch + conversione WebP</p>
              <p className="text-gray-500 mt-0.5">
                Trascino tutto in SammaPix. I file passano da 2-3 MB a 400-600 KB in formato WebP,
                senza perdita percettibile. Il browser non carica tutto questo peso inutilmente.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-xs text-gray-300 font-mono pt-0.5 select-none">03</span>
            <div>
              <p className="font-medium text-[#171717]">Rinomino AI con filename SEO</p>
              <p className="text-gray-500 mt-0.5">
                L&apos;AI analizza ogni immagine e genera nomi descrittivi:
                <code className="text-[11px] bg-gray-100 px-1 rounded mx-1">DSC_4821.jpg</code>
                diventa
                <code className="text-[11px] bg-gray-100 px-1 rounded mx-1">sigiriya-rock-fortress-sunrise-sri-lanka.webp</code>.
                Google capisce cosa c&apos;è nell&apos;immagine, la indicizza meglio in Google Images.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-xs text-gray-300 font-mono pt-0.5 select-none">04</span>
            <div>
              <p className="font-medium text-[#171717]">Upload sul sito</p>
              <p className="text-gray-500 mt-0.5">
                File già ottimizzati, già rinominati. Il sito carica veloce, le immagini
                compaiono in Google Images con context corretto.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <div className="h-px bg-gray-100 mb-12" />

      {/* Per i fotografi */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-[#171717] mb-3 lowercase tracking-wide">
          perché i fotografi dovrebbero ottimizzare le immagini
        </h2>
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            La maggior parte dei fotografi cura ogni dettaglio dello scatto e dell&apos;editing,
            poi carica file da 4 MB su WordPress senza pensarci. Il risultato: il sito è lento,
            il PageSpeed score è basso, Google penalizza il ranking.
          </p>
          <p>
            WebP al posto di JPEG riduce il peso del 25-35% a parità di qualità visiva.
            La compressione intelligente porta a riduzioni del 60-70% rispetto all&apos;originale.
            Un sito portfolio che carica in 1.5 secondi invece di 4 secondi converte molto meglio —
            che tu stia vendendo print, cercando collaborazioni, o costruendo un pubblico.
          </p>
          <p>
            I filename SEO non sono fondamentali come la link building o il contenuto,
            ma contribuiscono al relevance signal per Google Images — una fonte di traffico
            spesso ignorata dai fotografi, che invece può portare clienti qualificati.
          </p>
        </div>
      </section>

      <div className="h-px bg-gray-100 mb-12" />

      {/* I tool */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-[#171717] mb-4 lowercase tracking-wide">
          strumenti che ho costruito
        </h2>
        <div className="space-y-3">
            <Link
            href="/tools"
            className="group flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-[#171717]">SammaPix — Image Optimizer</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Comprimi, converti in WebP e rinomina con AI — tutto in una passata, nel browser.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Compress", "WebP", "AI Rename", "Batch ZIP"].map((f) => (
                  <span key={f} className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <div className="h-px bg-gray-100 mb-12" />

      {/* Portfolio */}
      <section className="mb-4">
        <h2 className="text-sm font-semibold text-[#171717] mb-3 lowercase tracking-wide">
          i miei viaggi
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          Ho fotografato in Sri Lanka, Bali, Giappone, Thailandia e Cina.
          Ogni viaggio ha la sua galleria — ogni foto ha una descrizione del contesto,
          del luogo, della luce. Fotografia di viaggio documentaria, non patinata.
        </p>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm text-[#171717] hover:text-gray-500 transition-colors font-medium"
        >
          Vai al portfolio
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </section>

    </main>
  );
}
