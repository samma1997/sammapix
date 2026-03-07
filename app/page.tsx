import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/layout/HeroSection";

const COMING_SOON_TOOLS = [
  {
    name: "Cull",
    desc: "Review rapida da tastiera: K tieni, X scarta. Esporta solo le migliori.",
  },
  {
    name: "StampIt",
    desc: "Watermark testo o logo in batch con posizione, opacità e modalità tiled.",
  },
  {
    name: "EXIF Lens",
    desc: "Visualizza e rimuovi metadati GPS e dati privati prima di pubblicare.",
  },
  {
    name: "ResizePack",
    desc: "Ridimensiona in batch in px o percentuale, esporta ZIP pronto.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — strip fotografica full-height */}
      <HeroSection />

      {/* Tools */}
      <section className="py-16 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">

          {/* Header sezione */}
          <div className="mb-10">
            <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              Image Tools
            </h2>
            <p className="text-sm text-gray-500 max-w-lg">
              Strumenti gratuiti per ottimizzare immagini nel browser — nessun upload, nessun account richiesto per le funzioni base.
            </p>
          </div>

          {/* Tool attivi — 2 card grandi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Link
              href="/tools/compress"
              className="group block p-6 border border-gray-200 rounded-lg bg-white hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M2 5 L5 8 L2 11" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 5 L11 8 L14 11" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="6" y="5" width="4" height="6" rx="1" fill="#6366F1" fillOpacity="0.15" stroke="#6366F1" strokeWidth="1"/>
                    </svg>
                    <span className="text-base font-semibold text-[#171717]">Crunch</span>
                    <span className="text-[10px] font-medium text-white bg-[#171717] px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Comprimi, converti in WebP e rinomina con AI — tutto nel browser.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Compress", "WebP", "AI Rename", "ZIP"].map((f) => (
                      <span key={f} className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-700 transition-colors flex-shrink-0 mt-1" strokeWidth={1.5} />
              </div>
            </Link>

            <Link
              href="/tools/geosort"
              className="group block p-6 border border-gray-200 rounded-lg bg-white hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M8 1.5C5.79 1.5 4 3.29 4 5.5C4 8.5 8 14.5 8 14.5C8 14.5 12 8.5 12 5.5C12 3.29 10.21 1.5 8 1.5Z" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#6366F1" fillOpacity="0.12"/>
                      <circle cx="8" cy="5.5" r="1.5" fill="#6366F1"/>
                    </svg>
                    <span className="text-base font-semibold text-[#171717]">GeoSort</span>
                    <span className="text-[10px] font-medium text-white bg-[#171717] px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Legge il GPS dalle foto e crea cartelle per paese — scarica ZIP organizzato.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["GPS EXIF", "Country Folders", "ZIP"].map((f) => (
                      <span key={f} className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-700 transition-colors flex-shrink-0 mt-1" strokeWidth={1.5} />
              </div>
            </Link>
          </div>

          {/* Grid coming soon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COMING_SOON_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="p-4 border border-dashed border-gray-200 rounded-lg bg-white"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-medium text-gray-400">{tool.name}</span>
                  <span className="text-[9px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-dashed border-gray-200 uppercase tracking-wide">
                    soon
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
