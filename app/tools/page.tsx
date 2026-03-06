import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Image Tools for Photographers | SammaPix",
  description:
    "Browser-based image tools for photographers — compress, WebP, AI rename, GeoSort, EXIF and more. No upload, no account needed.",
  alternates: { canonical: "https://sammapix.com/tools" },
};

// ─── Mini SVG illustrations ────────────────────────────────────────────────

function IconCrunch() {
  return (
    <svg width="80" height="64" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Foto originale grande */}
      <rect x="4" y="8" width="32" height="24" rx="2" stroke="#171717" strokeWidth="1.5" fill="#F5F5F5"/>
      <rect x="8" y="12" width="10" height="7" rx="1" fill="#D4D4D4"/>
      <path d="M8 28 L16 20 L24 26 L32 18" stroke="#A3A3A3" strokeWidth="1" fill="none"/>
      {/* Freccia compressione */}
      <path d="M40 20 L52 20" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M49 17 L52 20 L49 23" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Onde compressione */}
      <path d="M43 16 Q45 14 47 16 Q49 18 51 16" stroke="#6366F1" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M43 24 Q45 22 47 24 Q49 26 51 24" stroke="#6366F1" strokeWidth="1" fill="none" strokeLinecap="round"/>
      {/* Foto compressa piccola */}
      <rect x="56" y="12" width="20" height="15" rx="2" stroke="#171717" strokeWidth="1.5" fill="#F5F5F5"/>
      <rect x="59" y="15" width="6" height="4" rx="1" fill="#D4D4D4"/>
      <path d="M59 25 L62 21 L66 24 L72 19" stroke="#A3A3A3" strokeWidth="1" fill="none"/>
      {/* Label WebP */}
      <rect x="54" y="42" width="26" height="12" rx="3" fill="#171717"/>
      <text x="67" y="51" fontSize="7" fontWeight="600" fill="white" textAnchor="middle" fontFamily="monospace">WebP</text>
    </svg>
  );
}

function IconGeoSort() {
  return (
    <svg width="80" height="64" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mappa stilizzata */}
      <rect x="8" y="10" width="64" height="44" rx="3" stroke="#6366F1" strokeWidth="1.5" fill="#EEF2FF"/>
      {/* Linee mappa */}
      <path d="M8 28 Q25 22 40 30 Q55 38 72 28" stroke="#C7D2FE" strokeWidth="1" fill="none"/>
      <path d="M20 10 L20 54" stroke="#C7D2FE" strokeWidth="0.75" strokeDasharray="3 3"/>
      <path d="M50 10 L50 54" stroke="#C7D2FE" strokeWidth="0.75" strokeDasharray="3 3"/>
      {/* Pin Giappone */}
      <circle cx="56" cy="20" r="5" fill="#6366F1"/>
      <path d="M56 25 L56 32" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="56" cy="20" r="2" fill="white"/>
      {/* Pin Italia */}
      <circle cx="26" cy="35" r="5" fill="#171717"/>
      <path d="M26 40 L26 47" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="26" cy="35" r="2" fill="white"/>
      {/* Pin Thailandia */}
      <circle cx="44" cy="18" r="4" fill="#F59E0B"/>
      <path d="M44 22 L44 28" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="44" cy="18" r="1.5" fill="white"/>
    </svg>
  );
}

function IconExifLens() {
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Corpo macchina */}
      <rect x="8" y="16" width="40" height="30" rx="3" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
      <rect x="12" y="10" width="12" height="8" rx="2" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
      {/* Obiettivo */}
      <circle cx="28" cy="31" r="9" stroke="#404040" strokeWidth="1.5" fill="white"/>
      <circle cx="28" cy="31" r="5" stroke="#D4D4D4" strokeWidth="1"/>
      <circle cx="28" cy="31" r="2" fill="#404040"/>
      {/* Lente/Magnifier overlay */}
      <circle cx="52" cy="20" r="12" stroke="#6366F1" strokeWidth="1.5" fill="white" fillOpacity="0.9"/>
      <circle cx="52" cy="20" r="7" stroke="#6366F1" strokeWidth="1"/>
      {/* Linee metadata dentro la lente */}
      <line x1="47" y1="18" x2="57" y2="18" stroke="#6366F1" strokeWidth="1" strokeLinecap="round"/>
      <line x1="47" y1="21" x2="54" y2="21" stroke="#6366F1" strokeWidth="1" strokeLinecap="round"/>
      {/* Handle lente */}
      <line x1="61" y1="29" x2="66" y2="34" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IconCull() {
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stack foto dietro */}
      <rect x="18" y="8" width="36" height="26" rx="2" stroke="#D4D4D4" strokeWidth="1.5" fill="#FAFAFA" transform="rotate(-6 18 8)"/>
      <rect x="16" y="12" width="36" height="26" rx="2" stroke="#A3A3A3" strokeWidth="1.5" fill="#F5F5F5" transform="rotate(-2 16 12)"/>
      {/* Foto principale */}
      <rect x="14" y="16" width="36" height="26" rx="2" stroke="#171717" strokeWidth="1.5" fill="white"/>
      <rect x="18" y="20" width="12" height="8" rx="1" fill="#E5E5E5"/>
      <path d="M18 38 L26 30 L34 36 L42 26" stroke="#D4D4D4" strokeWidth="1" fill="none"/>
      {/* Checkmark verde */}
      <circle cx="54" cy="20" r="9" fill="#16A34A"/>
      <path d="M49 20 L52 23 L59 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* X rossa */}
      <circle cx="54" cy="44" r="9" fill="#DC2626"/>
      <path d="M50 40 L58 48 M58 40 L50 48" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IconResizePack() {
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Foto grande */}
      <rect x="4" y="6" width="36" height="28" rx="2" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
      <rect x="8" y="10" width="10" height="7" rx="1" fill="#E5E5E5"/>
      {/* Frecce resize che puntano inward */}
      <path d="M44 14 L54 14 L54 24" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M44 14 L48 10" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 40 L4 50 L14 50" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 50 L0 54" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Foto piccola risultato */}
      <rect x="44" y="32" width="24" height="18" rx="2" stroke="#6366F1" strokeWidth="1.5" fill="#EEF2FF"/>
      <rect x="47" y="35" width="6" height="4" rx="1" fill="#C7D2FE"/>
      {/* Misure */}
      <text x="56" y="52" fontSize="7" fill="#6366F1" textAnchor="middle" fontWeight="600" fontFamily="monospace">500KB</text>
    </svg>
  );
}

function IconStampIt() {
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Foto sotto */}
      <rect x="6" y="24" width="60" height="32" rx="2" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
      <rect x="10" y="28" width="14" height="10" rx="1" fill="#E5E5E5"/>
      {/* Stamp tool */}
      <rect x="26" y="2" width="20" height="10" rx="2" fill="#171717"/>
      <rect x="30" y="12" width="12" height="6" rx="1" fill="#404040"/>
      {/* Timbro applicato */}
      <rect x="20" y="38" width="32" height="12" rx="1" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 2" fill="#EEF2FF"/>
      <text x="36" y="47" fontSize="7" fill="#6366F1" textAnchor="middle" fontWeight="600" fontFamily="monospace">© 2025</text>
      {/* Freccia applicazione */}
      <path d="M36 18 L36 36" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
    </svg>
  );
}

function IconCropRatio() {
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Foto originale */}
      <rect x="4" y="4" width="48" height="36" rx="2" stroke="#D4D4D4" strokeWidth="1.5" fill="#FAFAFA"/>
      {/* Crop overlay */}
      <rect x="12" y="10" width="32" height="24" stroke="#171717" strokeWidth="2" fill="none"/>
      {/* Handles agli angoli */}
      <rect x="10" y="8" width="6" height="6" rx="1" fill="#171717"/>
      <rect x="40" y="8" width="6" height="6" rx="1" fill="#171717"/>
      <rect x="10" y="30" width="6" height="6" rx="1" fill="#171717"/>
      <rect x="40" y="30" width="6" height="6" rx="1" fill="#171717"/>
      {/* Ratio label */}
      <rect x="52" y="18" width="18" height="12" rx="2" fill="#171717"/>
      <text x="61" y="27" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">16:9</text>
      {/* Oscuramento fuori crop */}
      <path d="M4 4 L12 4 L12 10 L4 10 Z" fill="#00000015"/>
      <path d="M44 4 L52 4 L52 10 L44 10 Z" fill="#00000015"/>
    </svg>
  );
}

function IconTwinHunt() {
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Foto 1 */}
      <rect x="2" y="10" width="30" height="40" rx="2" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
      <rect x="6" y="14" width="10" height="7" rx="1" fill="#E5E5E5"/>
      <path d="M6 42 L12 34 L18 40 L26 30" stroke="#D4D4D4" strokeWidth="1" fill="none"/>
      {/* Foto 2 — quasi identica */}
      <rect x="40" y="10" width="30" height="40" rx="2" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
      <rect x="44" y="14" width="10" height="7" rx="1" fill="#E5E5E5"/>
      <path d="M44 42 L50 34 L56 40 L64 30" stroke="#D4D4D4" strokeWidth="1" fill="none"/>
      {/* Connessione similiarity */}
      <path d="M32 30 L40 30" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      <circle cx="36" cy="30" r="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
      <text x="36" y="33" fontSize="6" fill="#92400E" textAnchor="middle" fontWeight="700">=</text>
    </svg>
  );
}

function IconFilmLab() {
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Film strip */}
      <rect x="4" y="10" width="64" height="40" rx="2" fill="#171717"/>
      {/* Perforazioni sinistra */}
      {[14, 26, 38, 50].map(x => (
        <rect key={x} x={x} y="13" width="6" height="8" rx="1" fill="#404040"/>
      ))}
      {[14, 26, 38, 50].map(x => (
        <rect key={x + 100} x={x} y="39" width="6" height="8" rx="1" fill="#404040"/>
      ))}
      {/* Frame 1 — con grain/colore */}
      <rect x="8" y="24" width="18" height="12" rx="1" fill="#92400E" fillOpacity="0.7"/>
      <circle cx="11" cy="27" r="1" fill="#FEF3C7" fillOpacity="0.6"/>
      <circle cx="16" cy="31" r="0.75" fill="#FEF3C7" fillOpacity="0.5"/>
      <circle cx="22" cy="26" r="0.75" fill="#FEF3C7" fillOpacity="0.6"/>
      {/* Frame 2 — B&W */}
      <rect x="28" y="24" width="18" height="12" rx="1" fill="#737373"/>
      <circle cx="31" cy="28" r="1" fill="white" fillOpacity="0.4"/>
      <circle cx="38" cy="32" r="0.75" fill="white" fillOpacity="0.3"/>
      {/* Frame 3 — cross process */}
      <rect x="48" y="24" width="18" height="12" rx="1" fill="#0369A1" fillOpacity="0.6"/>
      <circle cx="52" cy="27" r="1" fill="#7DD3FC" fillOpacity="0.7"/>
      <circle cx="59" cy="31" r="0.75" fill="#7DD3FC" fillOpacity="0.5"/>
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ACTIVE = [
  {
    name: "Crunch",
    href: "/tools/compress",
    description: "Comprimi, converti in WebP e rinomina con AI — tutto in una passata. Nessun upload.",
    features: ["Compress", "WebP", "AI Rename", "Batch ZIP"],
    bg: "#F5F5F5",
    Illustration: IconCrunch,
  },
  {
    name: "GeoSort",
    href: "/tools/geosort",
    description: "Legge il GPS dalle foto e organizza in cartelle per paese. Scarichi uno ZIP pronto: Japan/, Thailand/, Italy/...",
    features: ["GPS EXIF", "Auto folders", "Batch ZIP", "No upload"],
    bg: "#EEF2FF",
    Illustration: IconGeoSort,
  },
];

const SOON = [
  { name: "EXIF Lens",  Illustration: IconExifLens,  description: "Visualizza e rimuovi GPS, camera, timestamps. Proteggi la privacy prima di pubblicare." },
  { name: "Cull",       Illustration: IconCull,      description: "Review rapida con tastiera: K tieni, X scarta. Lightroom-style, gratis." },
  { name: "ResizePack", Illustration: IconResizePack, description: "Ridimensiona in batch: px, % o target file-size. Preset web, social, stampa." },
  { name: "StampIt",    Illustration: IconStampIt,   description: "Watermark testo o logo in batch. Posizione, opacità, modalità tiled anti-ritaglio." },
  { name: "CropRatio",  Illustration: IconCropRatio, description: "Ritaglia in formato preciso: 1:1, 4:5, 16:9, A4. Smart centering opzionale." },
  { name: "TwinHunt",   Illustration: IconTwinHunt,  description: "Trova duplicati e quasi-identici con perceptual hashing — tutto client-side." },
  { name: "FilmLab",    Illustration: IconFilmLab,   description: "Grain cinematografico, vignette e color grading analogico su batch." },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

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

        {/* Tool attivi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {ACTIVE.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group flex flex-col border border-gray-200 rounded-xl bg-white hover:border-gray-400 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Banda illustrazione */}
              <div
                className="flex items-center justify-center h-36"
                style={{ backgroundColor: tool.bg }}
              >
                <tool.Illustration />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-semibold text-[#171717]">{tool.name}</span>
                  <span className="text-[10px] font-medium text-white bg-[#171717] px-2 py-0.5 rounded-full">Free</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{tool.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.features.map((f) => (
                    <span key={f} className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">{f}</span>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-4 flex justify-end">
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-200" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon */}
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-5">In arrivo</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SOON.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col border border-dashed border-gray-200 rounded-xl bg-white overflow-hidden"
            >
              {/* Mini illustrazione */}
              <div className="flex items-center justify-center h-24 bg-gray-50 border-b border-dashed border-gray-200">
                <div className="opacity-40 scale-75 origin-center">
                  <tool.Illustration />
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-sm font-medium text-gray-500">{tool.name}</span>
                  <span className="text-[9px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wide">soon</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
