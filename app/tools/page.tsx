import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Image Tools for Photographers | SammaPix",
  description:
    "Browser-based image tools for photographers — compress, convert to WebP, AI rename, GeoSort by location, and more. No upload, no account needed.",
  alternates: { canonical: "https://sammapix.com/tools" },
};

const ACTIVE = [
  {
    name: "Crunch",
    href: "/tools/compress",
    tagline: "Compress · WebP · AI Rename · Batch ZIP",
    description:
      "Comprimi, converti in WebP e rinomina con AI — tutto in una passata. Nessun upload, tutto nel browser.",
  },
];

const SOON = [
  {
    name: "GeoSort",
    description:
      "Legge il GPS dalle foto e crea cartelle per destinazione. Scarichi uno ZIP già organizzato: Thailand/, Japan/, Italy/... senza fare nulla.",
  },
  {
    name: "EXIF Lens",
    description:
      "Visualizza e rimuovi metadati GPS, camera, timestamps. Proteggi la privacy prima di pubblicare. Export CSV.",
  },
  {
    name: "Cull",
    description:
      "Review rapida con tastiera: K per tenere, X per scartare. Esporta solo le migliori. Lightroom-style, gratis.",
  },
  {
    name: "ResizePack",
    description:
      "Ridimensiona in batch: px, percentuale o target file-size ('max 500KB'). Preset per web, social, stampa.",
  },
  {
    name: "StampIt",
    description:
      "Aggiungi testo o logo watermark in batch. Posizione, opacità, dimensione. Modalità tiled per protezione avanzata.",
  },
  {
    name: "CropRatio",
    description:
      "Ritaglia in formato preciso: 1:1, 4:5, 16:9, A4, custom. Smart centering opzionale con face detection.",
  },
  {
    name: "TwinHunt",
    description:
      "Trova foto duplicate e quasi-identiche con perceptual hashing — client-side, nessun upload.",
  },
  {
    name: "FilmLab",
    description:
      "Grain cinematografico, vignette e color grading analogico su batch. WebGL-accelerated.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          <div className="mb-10">
            <h1 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Image Tools</h1>
            <p className="text-sm text-gray-500 max-w-lg">
              Strumenti gratuiti per fotografi. Tutto nel browser — nessun upload, nessuna registrazione per le funzioni base.
            </p>
          </div>

          {/* Tool attivo */}
          {ACTIVE.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group block mb-4 p-6 border border-gray-200 rounded-lg bg-white hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base font-semibold text-[#171717]">{tool.name}</span>
                    <span className="text-[10px] font-medium text-white bg-[#171717] px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{tool.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.tagline.split(" · ").map((f) => (
                      <span key={f} className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-700 transition-colors flex-shrink-0 mt-1" strokeWidth={1.5} />
              </div>
            </Link>
          ))}

          {/* Coming soon */}
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 mt-10">In arrivo</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SOON.map((tool) => (
              <div key={tool.name} className="p-5 border border-dashed border-gray-200 rounded-lg bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-500">{tool.name}</span>
                  <span className="text-[9px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-dashed border-gray-200 uppercase tracking-wide">
                    soon
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
