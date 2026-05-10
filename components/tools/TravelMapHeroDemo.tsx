"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * TravelMap hero demo — real OpenStreetMap tile (zoom 5, Europe) as background,
 * 6 pin che appaiono in sequenza alla loro vera posizione GPS, connessi da
 * linea tratteggiata cronologica. Counter live country/km/photos.
 *
 * La mappa è composta da 12 tile OSM zoom 5 (4 col × 3 row) compositati offline
 * in `public/demo/travelmap-europe.webp` (124KB). Le coordinate dei pin sono
 * calcolate da lat/lon reali via proiezione Web Mercator allineata ai tile.
 */

type City = {
  city: string;
  flag: string;
  lat: number;
  lon: number;
  legKm: number;  // Haversine straight-line dal pin precedente
  photos: number;
};

const CITIES: City[] = [
  { city: "Lisbon", flag: "🇵🇹", lat: 38.72, lon: -9.13, legKm: 0,    photos: 18 },
  { city: "Madrid", flag: "🇪🇸", lat: 40.42, lon: -3.70, legKm: 504,  photos: 22 },
  { city: "Paris",  flag: "🇫🇷", lat: 48.85, lon: 2.35,  legKm: 1054, photos: 31 },
  { city: "Berlin", flag: "🇩🇪", lat: 52.52, lon: 13.40, legKm: 880,  photos: 24 },
  { city: "Zagreb", flag: "🇭🇷", lat: 45.81, lon: 15.98, legKm: 833,  photos: 19 },
  { city: "Rome",   flag: "🇮🇹", lat: 41.90, lon: 12.50, legKm: 510,  photos: 28 },
];

/** Map background covers tiles z=5, x=15..18, y=10..12 → bbox below */
const MAP_BBOX = {
  lonW: -11.25,
  lonE: 33.75,
  latN: 55.78,
  latS: 31.95,
};

const VB_W = 460;
const VB_H = 345;

/** Lat/lon → display pixel using Web Mercator projection */
function project(lat: number, lon: number): { x: number; y: number } {
  // x is linear in longitude
  const x = ((lon - MAP_BBOX.lonW) / (MAP_BBOX.lonE - MAP_BBOX.lonW)) * VB_W;

  // y is Mercator-projected
  const latToY = (l: number) =>
    (1 - Math.log(Math.tan((l * Math.PI) / 180) + 1 / Math.cos((l * Math.PI) / 180)) / Math.PI) / 2;
  const yN = latToY(MAP_BBOX.latN);
  const yS = latToY(MAP_BBOX.latS);
  const yLat = latToY(lat);
  const y = ((yLat - yN) / (yS - yN)) * VB_H;

  return { x, y };
}

const POINTS = CITIES.map((c) => ({ ...c, ...project(c.lat, c.lon) }));

const STEP_MS = 1100;
const PAUSE_MS = 1800;

export default function TravelMapHeroDemo() {
  const [step, setStep] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStep((s) => {
        if (s >= POINTS.length) {
          timeoutId = setTimeout(() => {
            if (!cancelled) setStep(1);
          }, PAUSE_MS);
          return s;
        }
        timeoutId = setTimeout(tick, STEP_MS);
        return s + 1;
      });
    };
    timeoutId = setTimeout(tick, STEP_MS);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [hasInteracted, step]);

  const visible = POINTS.slice(0, step);
  const totalKm = visible.reduce((sum, p) => sum + p.legKm, 0);
  const totalPhotos = visible.reduce((sum, p) => sum + p.photos, 0);
  const countries = new Set(visible.map((p) => p.flag)).size;
  const last = visible[visible.length - 1];

  return (
    <div className="relative">
      <div
        className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F1F5F9]"
        style={{ aspectRatio: "4/3" }}
      >
        {/* OSM map background */}
        <Image
          src="/demo/travelmap-europe.webp"
          alt="OpenStreetMap of Europe showing photo route from Lisbon to Madrid, Paris, Berlin, Zagreb, and Rome"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 460px"
          className="object-cover"
        />

        {/* Pins + travel line in SVG overlay */}
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {/* dashed travel line */}
          {visible.length >= 2 && (
            <polyline
              points={visible.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 5"
              style={{
                filter: "drop-shadow(0 1px 3px rgba(59,130,246,0.5))",
                animation: "travelmap-draw 0.5s ease-out",
              }}
            />
          )}

          {/* pins */}
          {visible.map((p, i) => (
            <g
              key={i}
              style={{
                transformOrigin: `${p.x}px ${p.y}px`,
                animation: i === visible.length - 1 ? "travelmap-pin 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
              }}
            >
              {/* pulse halo on latest pin */}
              {i === visible.length - 1 && step < POINTS.length && (
                <circle cx={p.x} cy={p.y} r="14" fill="#3B82F6" fillOpacity="0.18">
                  <animate attributeName="r" values="9;18;9" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="fill-opacity" values="0.25;0;0.25" dur="1.6s" repeatCount="indefinite" />
                </circle>
              )}
              {/* shadow */}
              <ellipse cx={p.x} cy={p.y + 11} rx="6" ry="2" fill="rgba(0,0,0,0.25)" />
              {/* pin body */}
              <circle cx={p.x} cy={p.y} r="11" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2.5" />
              {/* number */}
              <text
                x={p.x}
                y={p.y + 3.5}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#FFFFFF"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {i + 1}
              </text>
            </g>
          ))}
        </svg>

        {/* "Reading EXIF locally" indicator */}
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#1E40AF] dark:text-[#93C5FD] px-2 py-1 rounded backdrop-blur-sm bg-white/85 dark:bg-[#0F1729]/85 border border-[#BFDBFE] dark:border-[#1E3A8A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            Reading EXIF locally
          </span>
        </div>

        {/* Stats panel (bottom) */}
        <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm">
            <span className="text-[12px]">{last?.flag ?? ""}</span>
            <span className="text-[12px] font-semibold text-[#171717] dark:text-[#E5E5E5]">
              {last?.city ?? "—"}
            </span>
          </div>
          <div className="flex items-center gap-2.5 px-2.5 py-1 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm">
            <Stat label="Countries" value={countries} />
            <Divider />
            <Stat label="km" value={totalKm.toLocaleString()} />
            <Divider />
            <Stat label="Photos" value={totalPhotos} />
          </div>
        </div>
      </div>

      {/* Country chips below — compact */}
      <div className="hidden md:flex items-center justify-center gap-1 mt-1.5 flex-wrap">
        {CITIES.map((p, i) => {
          const active = i < step;
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                setStep(i + 1);
                setHasInteracted(true);
              }}
              className={cn(
                "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded border transition-all duration-300",
                active
                  ? "border-[#3B82F6] bg-[#3B82F6]/[0.08] text-[#1E40AF]"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#A3A3A3] hover:bg-[#F5F5F5]"
              )}
            >
              <span className="text-[11px]">{p.flag}</span>
              <span>{p.city}</span>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes travelmap-pin {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.18); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes travelmap-draw {
          0% { stroke-dashoffset: 80; opacity: 0.3; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center leading-none">
      <span className="text-[12px] font-bold text-[#171717] dark:text-[#E5E5E5] tabular-nums">{value}</span>
      <span className="text-[8px] text-[#737373] uppercase tracking-wide">{label}</span>
    </div>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-[#E5E5E5] dark:bg-[#2A2A2A]" />;
}
