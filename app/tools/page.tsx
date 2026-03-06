import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Zap, MapPin, ScanLine, Layers, Maximize2,
  Stamp, Crop, Copy, Film, ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Image Tools for Photographers | SammaPix",
  description:
    "Browser-based image tools for photographers — compress, WebP, AI rename, GeoSort, EXIF and more. No upload, no account needed.",
  alternates: { canonical: "https://sammapix.com/tools" },
};

const ACTIVE = [
  {
    name: "Crunch",
    href: "/tools/compress",
    description: "Comprimi, converti in WebP e rinomina con AI — tutto in una passata. Nessun upload.",
    features: ["Compress", "WebP", "AI Rename", "Batch ZIP"],
    icon: Zap,
    color: "#171717",
    bg: "#F5F5F5",
  },
  {
    name: "GeoSort",
    href: "/tools/geosort",
    description: "Legge il GPS dalle foto e crea cartelle per destinazione. Scarichi uno ZIP pronto: Japan/, Thailand/, Italy/...",
    features: ["GPS EXIF", "Auto folders", "Batch ZIP", "No upload"],
    icon: MapPin,
    color: "#6366F1",
    bg: "#EEF2FF",
  },
];

const SOON = [
  { name: "EXIF Lens",   icon: ScanLine,  description: "Visualizza e rimuovi GPS, camera, timestamps. Proteggi la privacy prima di pubblicare." },
  { name: "Cull",        icon: Layers,    description: "Review rapida con tastiera: K tieni, X scarta. Lightroom-style, gratis." },
  { name: "ResizePack",  icon: Maximize2, description: "Ridimensiona in batch: px, % o target file-size. Preset web, social, stampa." },
  { name: "StampIt",     icon: Stamp,     description: "Watermark testo o logo in batch. Posizione, opacità, modalità tiled anti-ritaglio." },
  { name: "CropRatio",   icon: Crop,      description: "Ritaglia in formato preciso: 1:1, 4:5, 16:9, A4. Smart centering con face detection." },
  { name: "TwinHunt",    icon: Copy,      description: "Trova duplicati e quasi-identici con perceptual hashing — tutto client-side." },
  { name: "FilmLab",     icon: Film,      description: "Grain cinematografico, vignette e color grading analogico su batch." },
];

export default function ToolsPage() {
  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Image Tools</h1>
          <p className="text-sm text-gray-500 max-w-lg">
            Strumenti gratuiti per fotografi. Tutto nel browser — nessun upload, nessuna registrazione per le funzioni base.
          </p>
        </div>

        {/* Tool attivi — card grandi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {ACTIVE.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.name}
                href={tool.href}
                className="group flex flex-col border border-gray-200 rounded-xl bg-white hover:border-gray-400 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Top colored band con icona */}
                <div
                  className="flex items-center justify-center h-28"
                  style={{ backgroundColor: tool.bg }}
                >
                  <Icon
                    className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: tool.color }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base font-semibold text-[#171717]">{tool.name}</span>
                    <span className="text-[10px] font-medium text-white bg-[#171717] px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.features.map((f) => (
                      <span
                        key={f}
                        className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer arrow */}
                <div className="px-5 pb-4 flex justify-end">
                  <ArrowRight
                    className="h-4 w-4 text-gray-300 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-200"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Coming soon */}
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-5">In arrivo</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SOON.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="flex flex-col p-4 border border-dashed border-gray-200 rounded-xl bg-white"
              >
                {/* Icona */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-sm font-medium text-gray-500 truncate">{tool.name}</span>
                    <span className="text-[9px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wide flex-shrink-0">
                      soon
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{tool.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
