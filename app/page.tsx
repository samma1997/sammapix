import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/layout/HeroSection";

const COMING_SOON_TOOLS = [
  {
    name: "EXIF Inspector",
    desc: "Visualizza e rimuovi metadati GPS, camera, e dati privati dalle foto.",
  },
  {
    name: "Photo Culling",
    desc: "Seleziona rapidamente le migliori foto da un batch con tastiera.",
  },
  {
    name: "Image Resizer",
    desc: "Ridimensiona in px o percentuale, mantieni aspect ratio.",
  },
  {
    name: "Background Remover",
    desc: "Rimuovi lo sfondo con AI in un click. Nessun upload.",
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

          {/* Tool principale — card grande */}
          <Link
            href="/tools"
            className="group block mb-4 p-6 border border-gray-200 rounded-lg bg-white hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-semibold text-[#171717]">SammaPix</span>
                  <span className="text-[10px] font-medium text-white bg-[#171717] px-2 py-0.5 rounded-full">
                    Free
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  Comprimi, converti in WebP e rinomina le tue immagini con AI — tutto in una sola passata, direttamente nel browser.
                </p>
                {/* Feature pills */}
                <div className="flex flex-wrap gap-2">
                  {["Compress", "WebP Converter", "AI Rename", "Batch ZIP"].map((f) => (
                    <span
                      key={f}
                      className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowRight
                className="h-4 w-4 text-gray-300 group-hover:text-gray-700 transition-colors flex-shrink-0 mt-1"
                strokeWidth={1.5}
              />
            </div>
          </Link>

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
