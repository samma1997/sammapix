import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/layout/HeroSection";
import PlanBadge from "@/components/ui/PlanBadge";

const COMING_SOON_TOOLS = [
  {
    name: "TwinHunt",
    desc: "Find duplicate and near-duplicate photos using perceptual hashing — 100% in-browser.",
  },
  {
    name: "StampIt",
    desc: "Batch watermark with text or logo — position, opacity, tiled mode.",
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
              Free browser-based tools for photographers — no uploads, no account required for the basics.
            </p>
          </div>

          {/* Tool attivi — card grandi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
                    <PlanBadge />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Compress, convert to WebP and AI-rename — all in one pass, no upload.
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
                    <PlanBadge />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Reads GPS from your photos and sorts them into country folders — download as organized ZIP.
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

            <Link
              href="/tools/travelmap"
              className="group block p-6 border border-gray-200 rounded-lg bg-white hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle cx="8" cy="8" r="6.5" stroke="#6366F1" strokeWidth="1.5" fill="#6366F1" fillOpacity="0.08"/>
                      <circle cx="8" cy="8" r="1.5" fill="#6366F1"/>
                    </svg>
                    <span className="text-base font-semibold text-[#171717]">TravelMap</span>
                    <PlanBadge />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Drop travel photos — see all your spots on an interactive map. Counts countries and km traveled.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["GPS Map", "Countries", "Travel route", "Interactive"].map((f) => (
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
              href="/tools/exif"
              className="group block p-6 border border-gray-200 rounded-lg bg-white hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="2" y="3" width="9" height="11" rx="1.5" stroke="#6366F1" strokeWidth="1.2" fill="#6366F1" fillOpacity="0.08"/>
                      <line x1="4" y1="6.5" x2="9" y2="6.5" stroke="#6366F1" strokeWidth="1" strokeLinecap="round"/>
                      <line x1="4" y1="9" x2="7" y2="9" stroke="#6366F1" strokeWidth="1" strokeLinecap="round"/>
                      <circle cx="11.5" cy="10.5" r="2.5" stroke="#6366F1" strokeWidth="1.2" fill="none"/>
                      <line x1="13.3" y1="12.3" x2="14.5" y2="13.5" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-base font-semibold text-[#171717]">EXIF Lens</span>
                    <PlanBadge />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    View and remove GPS, camera info and private metadata before sharing your photos.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["GPS Remove", "HEIC", "Batch ZIP", "Privacy"].map((f) => (
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
              href="/tools/cull"
              className="group block p-6 border border-gray-200 rounded-lg bg-white hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="1" y="3" width="10" height="10" rx="1.5" stroke="#6366F1" strokeWidth="1.2" fill="#6366F1" fillOpacity="0.08"/>
                      <circle cx="12" cy="5" r="3" fill="#16A34A"/>
                      <path d="M10.5 5 L11.5 6 L13.5 4" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-base font-semibold text-[#171717]">Cull</span>
                    <PlanBadge />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Review photos one by one with keyboard shortcuts. K to keep, X to reject. Download keepers as ZIP.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["K / X keys", "Keyboard review", "HEIC", "ZIP keepers"].map((f) => (
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
              href="/tools/resizepack"
              className="group block p-6 border border-gray-200 rounded-lg bg-white hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="1" y="1" width="9" height="7" rx="1.2" stroke="#6366F1" strokeWidth="1.2" fill="#6366F1" fillOpacity="0.08"/>
                      <path d="M11 2 L15 2 L15 6" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1 10 L1 14 L5 14" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-base font-semibold text-[#171717]">ResizePack</span>
                    <PlanBadge />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Batch resize in px or %, social media presets for Instagram, Twitter and more. Download all as ZIP.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Pixel", "Percentage", "Presets", "Batch ZIP"].map((f) => (
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
