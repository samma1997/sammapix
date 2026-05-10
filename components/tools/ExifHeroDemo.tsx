"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, MapPin, Calendar, Settings, Image as ImageIcon, ShieldOff, type LucideIcon } from "lucide-react";

/**
 * EXIF hero demo — mock UI metadata viewer + strip animation.
 *
 * Cycle phases:
 *  1. "scanning" — foto sulla sx, metadata panel con campi che appaiono uno
 *      alla volta (typing animation light)
 *  2. "ready" — tutti i campi visibili, banner privacy "GPS exposes your
 *      home / hotel location"
 *  3. "stripping" — campi sensibili (GPS) si fade-out e diventano "[ removed ]"
 *  4. "done" — tutti i sensitive removed, badge verde "✓ Privacy-safe"
 *  5. Reset
 *
 * La foto è la mountain lake (compress-photo) tematicamente perfetta:
 * caso d'uso #1 EXIF removal = "ho fatto una foto al mio viaggio, voglio
 * pubblicarla senza rivelare la location esatta del mio Airbnb".
 */

type Field = {
  key: string;
  Icon: LucideIcon;
  label: string;
  value: string;
  sensitive: boolean; // GPS = sensitive (gets "removed")
};

const FIELDS: Field[] = [
  { key: "camera", Icon: Camera, label: "Camera", value: "Canon EOS R5 · 24-70mm f/2.8", sensitive: false },
  { key: "gps", Icon: MapPin, label: "GPS", value: "51.3217° N · 116.1860° W", sensitive: true },
  { key: "date", Icon: Calendar, label: "Captured", value: "2025-09-15 · 18:42 UTC", sensitive: true },
  { key: "settings", Icon: Settings, label: "Settings", value: "ISO 100 · f/8 · 1/250s", sensitive: false },
  { key: "size", Icon: ImageIcon, label: "Resolution", value: "8192 × 5464 · 18.4 MB", sensitive: false },
];

type Phase = "scanning" | "ready" | "stripping" | "done";

const SCAN_FIELD_DELAY_MS = 280;
const READY_PAUSE_MS = 1400;
const STRIP_FIELD_DELAY_MS = 350;
const DONE_PAUSE_MS = 2000;

export default function ExifHeroDemo() {
  const [phase, setPhase] = useState<Phase>("scanning");
  const [visibleCount, setVisibleCount] = useState(0); // for scanning phase
  const [strippedKeys, setStrippedKeys] = useState<Set<string>>(new Set());
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timeouts.push(t);
      });

    async function runCycle() {
      while (!cancelledRef.current) {
        // 1. Scanning — fields appear sequentially
        setPhase("scanning");
        setVisibleCount(0);
        setStrippedKeys(new Set());
        for (let i = 1; i <= FIELDS.length; i++) {
          if (cancelledRef.current) return;
          setVisibleCount(i);
          await sleep(SCAN_FIELD_DELAY_MS);
        }
        if (cancelledRef.current) return;

        // 2. Ready pause
        setPhase("ready");
        await sleep(READY_PAUSE_MS);
        if (cancelledRef.current) return;

        // 3. Stripping — sensitive fields fade out one by one
        setPhase("stripping");
        for (const f of FIELDS) {
          if (cancelledRef.current) return;
          if (f.sensitive) {
            setStrippedKeys((prev) => new Set([...prev, f.key]));
            await sleep(STRIP_FIELD_DELAY_MS);
          }
        }
        if (cancelledRef.current) return;

        // 4. Done state
        setPhase("done");
        await sleep(DONE_PAUSE_MS);
        if (cancelledRef.current) return;
      }
    }

    runCycle();

    return () => {
      cancelledRef.current = true;
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div className="rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] text-[#A3A3A3] font-mono truncate">IMG_0042.jpg · exif viewer</span>
        <span className="inline-flex items-center gap-1 text-[10px] text-[#0EA5E9] font-medium">
          <ShieldOff className="h-3 w-3" strokeWidth={2} />
          {phase === "done" ? "safe" : phase === "stripping" ? "stripping…" : "metadata"}
        </span>
      </div>

      {/* Body: photo + metadata panel */}
      <div className="grid grid-cols-[100px_1fr] gap-3 p-3">
        {/* Photo thumbnail */}
        <div className="relative">
          <div className="aspect-square rounded overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demo/compress-photo.jpg"
              alt="Mountain lake travel photo with EXIF metadata showing GPS coordinates and camera info"
              className="w-full h-full object-cover"
            />
          </div>
          {phase === "done" && (
            <div className="absolute -top-1 -right-1 bg-[#16A34A] text-white rounded-full p-1 shadow-sm">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          )}
        </div>

        {/* Metadata fields */}
        <ul role="list" className="space-y-1.5">
          {FIELDS.map((f, i) => {
            const visible = i < visibleCount || phase !== "scanning";
            const stripped = strippedKeys.has(f.key);
            return (
              <li
                key={f.key}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                }`}
              >
                <f.Icon
                  className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                    stripped
                      ? "text-[#A3A3A3]"
                      : f.sensitive
                        ? "text-[#DC2626]"
                        : "text-[#525252] dark:text-[#A3A3A3]"
                  }`}
                  strokeWidth={1.75}
                />
                <span className="text-[10px] uppercase tracking-wide text-[#A3A3A3] w-16 shrink-0">
                  {f.label}
                </span>
                <span
                  className={`text-[12px] font-mono truncate transition-colors ${
                    stripped
                      ? "text-[#A3A3A3] line-through"
                      : f.sensitive
                        ? "text-[#DC2626] font-semibold"
                        : "text-[#171717] dark:text-[#E5E5E5]"
                  }`}
                >
                  {stripped ? "[ removed ]" : f.value}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer status */}
      <div className="px-3 py-2.5 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
        {phase === "scanning" && (
          <p className="text-[11px] text-[#0EA5E9] flex items-center gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
            Reading EXIF tags…
          </p>
        )}
        {phase === "ready" && (
          <p className="text-[11px] text-[#DC2626] flex items-center gap-1.5 font-semibold">
            <MapPin className="h-3 w-3" strokeWidth={2.5} />
            GPS exposes the exact location · privacy risk
          </p>
        )}
        {phase === "stripping" && (
          <p className="text-[11px] text-[#F97316] flex items-center gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] animate-pulse" />
            Stripping sensitive metadata…
          </p>
        )}
        {phase === "done" && (
          <p className="text-[11px] text-[#16A34A] flex items-center gap-1.5 font-semibold">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            All sensitive metadata removed · safe to share
          </p>
        )}
      </div>
    </div>
  );
}
