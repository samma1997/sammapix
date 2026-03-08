"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  MapPin,
  RotateCcw,
  Globe,
  Camera,
  Navigation,
  AlertCircle,
  Share2,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PhotoPoint {
  file: File | null;       // null in shared/read-only mode
  lat: number;
  lon: number;
  date: Date | null;
  country: string | null;
  displayName: string | null;
  thumbnailUrl?: string;   // blob URL created from file, revoked on reset
  name: string;            // filename (available even in shared mode)
  isShared?: boolean;      // true when loaded from URL hash
}

interface ShareData {
  points: Array<{
    lat: number;
    lon: number;
    country: string | null;
    displayName: string | null;
    date: string | null;
    name: string;
  }>;
  generatedAt: string;
}

type UIState = "idle" | "processing" | "map";
type GeocodingState = "idle" | "running" | "done";

// ── Helpers ───────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function totalDistanceKm(points: PhotoPoint[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += haversineKm(
      points[i - 1].lat,
      points[i - 1].lon,
      points[i].lat,
      points[i].lon
    );
  }
  return total;
}

function gridKey(lat: number, lon: number): string {
  return `${lat.toFixed(1)}_${lon.toFixed(1)}`;
}

async function reverseGeocode(
  lat: number,
  lon: number
): Promise<{ country: string | null; displayName: string | null }> {
  const res = await fetch(`/api/geocode?lat=${lat}&lon=${lon}`);
  if (!res.ok) return { country: null, displayName: null };
  const data = (await res.json()) as {
    address?: { country?: string; city?: string; town?: string; village?: string };
    display_name?: string;
  };
  const country = data.address?.country || null;
  const city =
    data.address?.city ||
    data.address?.town ||
    data.address?.village ||
    null;
  const displayName =
    city && country
      ? `${city}, ${country}`
      : country || data.display_name?.split(",")[0] || null;
  return { country, displayName };
}

// Country colors — one per country (deterministic hash)
const COUNTRY_COLORS = [
  "#6366F1",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
  "#F97316",
  "#06B6D4",
];

function colorForCountry(country: string, colorMap: Map<string, string>): string {
  if (colorMap.has(country)) return colorMap.get(country)!;
  const idx = colorMap.size % COUNTRY_COLORS.length;
  const color = COUNTRY_COLORS[idx];
  colorMap.set(country, color);
  return color;
}

const MAX_TRAVELMAP_FREE = 100;
const MAX_TRAVELMAP_PRO = 500;

// ── Main Component ────────────────────────────────────────────────────────────

export default function TravelMapClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const travelLimit = isPro ? MAX_TRAVELMAP_PRO : MAX_TRAVELMAP_FREE;
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progressMessage, setProgressMessage] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [points, setPoints] = useState<PhotoPoint[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isSharedView, setIsSharedView] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [geocodingState, setGeocodingState] = useState<GeocodingState>("idle");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [geocodingProgress, setGeocodingProgress] = useState({ current: 0, total: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);

  // ── Inject Leaflet CSS once ────────────────────────────────────────────────
  useEffect(() => {
    const id = "leaflet-css";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
  }, []);

  // ── Check URL hash for shared map on mount ────────────────────────────────
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#map=")) {
      try {
        const raw = decodeURIComponent(atob(hash.slice(5)));
        const shareData = JSON.parse(raw) as ShareData;
        const sharedPoints: PhotoPoint[] = shareData.points.map((sp) => ({
          file: null,
          lat: sp.lat,
          lon: sp.lon,
          date: sp.date ? new Date(sp.date) : null,
          country: sp.country,
          displayName: sp.displayName,
          thumbnailUrl: undefined,
          name: sp.name,
          isShared: true,
        }));
        setPoints(sharedPoints);
        setIsSharedView(true);
        setUiState("map");
      } catch {
        // Ignore malformed hash
      }
    }
  }, []);

  // ── Cleanup blob URLs on unmount ───────────────────────────────────────────
  useEffect(() => {
    return () => {
      points.forEach((p) => {
        if (p.thumbnailUrl) URL.revokeObjectURL(p.thumbnailUrl);
      });
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stable ref to always-current points so the marker-update effect can read them
  const pointsRef = useRef<PhotoPoint[]>([]);
  pointsRef.current = points;

  // ── Build Leaflet map once when entering "map" state ──────────────────────
  useEffect(() => {
    if (uiState !== "map" || points.length === 0) return;
    if (!mapContainerRef.current) return;
    // Don't rebuild if map already exists (e.g. points updated during geocoding)
    if (leafletMapRef.current) return;

    const timer = setTimeout(async () => {
      const L = (await import("leaflet")).default;

      // Fix default icon webpack issue
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Read current points from ref (may be ahead of closure)
      const currentPoints = pointsRef.current;

      markersRef.current = [];

      const container = mapContainerRef.current!;
      const map = L.map(container, { zoomControl: true }).setView(
        [currentPoints[0].lat, currentPoints[0].lon],
        5
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const colorMap = new Map<string, string>();

      // Draw dashed polyline connecting all points in order
      const latlngs: [number, number][] = currentPoints.map((p) => [p.lat, p.lon]);
      L.polyline(latlngs, {
        color: "#A3A3A3",
        weight: 2,
        dashArray: "6 6",
        opacity: 0.8,
      }).addTo(map);

      // Add markers
      for (let i = 0; i < currentPoints.length; i++) {
        const p = currentPoints[i];
        const country = p.country || "Unknown";
        const color = colorForCountry(country, colorMap);

        const icon = L.divIcon({
          className: "",
          html: `<div style="
            width:28px;height:28px;border-radius:50%;
            background:${color};border:3px solid white;
            box-shadow:0 2px 6px rgba(0,0,0,0.25);
            display:flex;align-items:center;justify-content:center;
            font-size:10px;font-weight:700;color:white;font-family:Inter,sans-serif;
          ">${i + 1}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const dateStr = p.date
          ? p.date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "Unknown date";

        // Build popup content — include thumbnail only when available
        let thumbnailHtml = "";
        if (p.thumbnailUrl) {
          thumbnailHtml = `<img src="${p.thumbnailUrl}" style="width:100px;height:75px;object-fit:cover;border-radius:4px;margin-bottom:6px;display:block;" alt="${p.name}" />`;
        }

        const popupContent = `
          <div style="font-family:Inter,sans-serif;min-width:180px;max-width:220px;">
            ${thumbnailHtml}
            <div style="font-weight:600;font-size:13px;color:#171717;margin-bottom:2px;">${p.displayName || p.country || "Loading..."}</div>
            <div style="font-size:11px;color:#A3A3A3;margin-bottom:2px;">${p.name}</div>
            <div style="font-size:11px;color:#737373;">${dateStr}</div>
          </div>
        `;

        const marker = L.marker([p.lat, p.lon], { icon })
          .bindPopup(popupContent, { maxWidth: 240 })
          .addTo(map);

        markersRef.current.push(marker);
      }

      // Fit map to all points — cap zoom so nearby clusters don't zoom to street level
      if (currentPoints.length > 1) {
        const bounds = L.latLngBounds(latlngs);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
      }

      leafletMapRef.current = map;
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiState]);

  // ── Update marker popups when geocoding fills in country names ────────────
  useEffect(() => {
    if (uiState !== "map") return;
    if (!leafletMapRef.current) return;
    if (geocodingState !== "running" && geocodingState !== "done") return;

    // Update popup content for each marker that now has a country name
    points.forEach((p, i) => {
      const marker = markersRef.current[i];
      if (!marker) return;
      if (!p.country && !p.displayName) return;

      const dateStr = p.date
        ? p.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Unknown date";

      let thumbnailHtml = "";
      if (p.thumbnailUrl) {
        thumbnailHtml = `<img src="${p.thumbnailUrl}" style="width:100px;height:75px;object-fit:cover;border-radius:4px;margin-bottom:6px;display:block;" alt="${p.name}" />`;
      }

      const popupContent = `
        <div style="font-family:Inter,sans-serif;min-width:180px;max-width:220px;">
          ${thumbnailHtml}
          <div style="font-weight:600;font-size:13px;color:#171717;margin-bottom:2px;">${p.displayName || p.country || "Unknown location"}</div>
          <div style="font-size:11px;color:#A3A3A3;margin-bottom:2px;">${p.name}</div>
          <div style="font-size:11px;color:#737373;">${dateStr}</div>
        </div>
      `;

      marker.setPopupContent(popupContent);
    });
  }, [points, uiState, geocodingState]);

  // ── Process uploaded files ─────────────────────────────────────────────────

  const processFiles = useCallback(async (files: File[]) => {
    const imageFiles = files.filter((f) => f.type.startsWith("image/") || f.name.toLowerCase().endsWith(".heic") || f.name.toLowerCase().endsWith(".heif"));
    if (imageFiles.length === 0) return;

    const accepted = imageFiles.slice(0, travelLimit);
    const errorMessages: string[] = [];

    if (imageFiles.length > travelLimit) {
      errorMessages.push(
        isPro
          ? `Pro plan: only the first ${travelLimit} photos were processed.`
          : `Free plan: only the first ${travelLimit} photos were processed. Upgrade to Pro to plot up to 500 photos.`
      );
    }

    setUiState("processing");
    setProgressPercent(0);
    setGeocodingState("idle");
    setGeocodingProgress({ current: 0, total: 0 });

    let exifr: typeof import("exifr");
    try {
      exifr = await import("exifr");
    } catch {
      setErrors(["Failed to load EXIF reader. Please try again."]);
      setUiState("idle");
      return;
    }

    // Timeout helper
    const withTimeout = <T,>(p: Promise<T>, ms: number, fallback: T) =>
      Promise.race([p, new Promise<T>((r) => setTimeout(() => r(fallback), ms))]);

    const isHeicFile = (f: File) =>
      f.type === "image/heic" || f.type === "image/heif" ||
      f.name.toLowerCase().endsWith(".heic") || f.name.toLowerCase().endsWith(".heif");
    const isJpegFile = (f: File) =>
      f.type === "image/jpeg" || f.name.toLowerCase().endsWith(".jpg") || f.name.toLowerCase().endsWith(".jpeg");

    // ── Step 1: Read GPS from ALL files in parallel (fast) ─────────────────
    setProgressMessage(`Reading GPS from ${accepted.length} photos…`);
    setProgressPercent(20);

    const gpsResults = await Promise.all(
      accepted.map(async (file) => {
        try {
          const [gps, exifData] = await Promise.all([
            withTimeout(exifr.gps(file), 8000, null),
            withTimeout(exifr.parse(file, ["DateTimeOriginal", "CreateDate"]).catch(() => null), 8000, null),
          ]);
          if (!gps) return null;
          let date: Date | null = null;
          if (exifData?.DateTimeOriginal) date = new Date(exifData.DateTimeOriginal);
          else if (exifData?.CreateDate) date = new Date(exifData.CreateDate);
          return { file, lat: gps.latitude, lon: gps.longitude, date };
        } catch {
          errorMessages.push(`Could not read EXIF from ${file.name} — skipped.`);
          return null;
        }
      })
    );

    const rawPoints = gpsResults.filter(Boolean) as Array<{
      file: File; lat: number; lon: number; date: Date | null;
    }>;

    if (rawPoints.length === 0) {
      setErrors([...errorMessages, "No GPS data found in any of the uploaded photos."]);
      setUiState("idle");
      return;
    }

    setProgressMessage("Almost ready…");
    setProgressPercent(80);

    // ── Step 2: Fast thumbnails — exifr embedded or direct JPEG URL ─────────
    // (HEIC API conversion runs in background AFTER map is shown)
    const rawWithThumb = await Promise.all(
      rawPoints.map(async (p) => {
        let thumbnailUrl: string | undefined;
        try {
          const thumbData = await withTimeout(exifr.thumbnail(p.file), 3000, null);
          if (thumbData && thumbData.length > 0) {
            thumbnailUrl = URL.createObjectURL(new Blob([new Uint8Array(thumbData)], { type: "image/jpeg" }));
          }
        } catch { /* skip */ }
        if (!thumbnailUrl && isJpegFile(p.file)) {
          thumbnailUrl = URL.createObjectURL(p.file);
        }
        return { ...p, thumbnailUrl };
      })
    );

    // Sort by date
    rawWithThumb.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.getTime() - b.date.getTime();
    });

    // ── Step 3: Show map immediately with what we have ──────────────────────
    const initialPoints: PhotoPoint[] = rawWithThumb.map((p) => ({
      file: p.file,
      lat: p.lat,
      lon: p.lon,
      date: p.date,
      country: null,
      displayName: null,
      thumbnailUrl: p.thumbnailUrl,
      name: p.file.name,
    }));

    setProgressPercent(100);
    setProgressMessage("Map ready!");
    setPoints(initialPoints);
    setErrors(errorMessages);
    setUiState("map");

    // ── Step 4: Load HEIC thumbnails in background (5 concurrent) ──────────
    const heicPoints = rawWithThumb
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => !p.thumbnailUrl && isHeicFile(p.file));

    if (heicPoints.length > 0) {
      const CONCURRENCY = 5;
      let nextIdx = 0;
      const heicWorker = async () => {
        while (nextIdx < heicPoints.length) {
          const item = heicPoints[nextIdx++];
          if (!item) continue;
          const { p, i } = item;
          try {
            const fd = new FormData();
            fd.append("file", p.file);
            const res = await fetch("/api/heic-preview", { method: "POST", body: fd });
            if (res.ok) {
              const url = URL.createObjectURL(await res.blob());
              setPoints((prev) => {
                const updated = [...prev];
                updated[i] = { ...updated[i], thumbnailUrl: url };
                return updated;
              });
            }
          } catch { /* skip */ }
        }
      };
      // Fire and forget — map is already shown
      Promise.all(Array.from({ length: Math.min(CONCURRENCY, heicPoints.length) }, () => heicWorker()));
    }

    // ── Step 3: Reverse-geocode unique grid areas in background ───────────
    const uniqueKeys: string[] = [];
    for (const p of rawPoints) {
      const key = gridKey(p.lat, p.lon);
      if (!uniqueKeys.includes(key)) {
        uniqueKeys.push(key);
      }
    }

    if (uniqueKeys.length === 0) return;

    setGeocodingState("running");
    setGeocodingProgress({ current: 0, total: uniqueKeys.length });

    const gridToGeo = new Map<
      string,
      { country: string | null; displayName: string | null }
    >();

    for (let k = 0; k < uniqueKeys.length; k++) {
      const key = uniqueKeys[k];
      setGeocodingProgress({ current: k + 1, total: uniqueKeys.length });

      const [latStr, lonStr] = key.split("_");
      const lat = parseFloat(latStr);
      const lon = parseFloat(lonStr);

      try {
        const geo = await reverseGeocode(lat, lon);
        gridToGeo.set(key, geo);
      } catch {
        gridToGeo.set(key, { country: null, displayName: null });
      }

      // Update the points state incrementally so the map/sidebar refreshes
      setPoints((prev) =>
        prev.map((p) => {
          const pKey = gridKey(p.lat, p.lon);
          const geo = gridToGeo.get(pKey);
          if (!geo) return p;
          return { ...p, country: geo.country, displayName: geo.displayName };
        })
      );

      if (k < uniqueKeys.length - 1) {
        await delay(1100);
      }
    }

    setGeocodingState("done");
  }, [travelLimit, isPro]);

  // ── Event handlers ─────────────────────────────────────────────────────────

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      processFiles(Array.from(e.dataTransfer.files));
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(Array.from(e.target.files ?? []));
    },
    [processFiles]
  );

  const handleReset = useCallback(() => {
    // Revoke all blob URLs to avoid memory leaks
    points.forEach((p) => {
      if (p.thumbnailUrl) URL.revokeObjectURL(p.thumbnailUrl);
    });
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }
    markersRef.current = [];
    setUiState("idle");
    setPoints([]);
    setErrors([]);
    setProgressPercent(0);
    setProgressMessage("");
    setLinkCopied(false);
    setIsSharedView(false);
    setGeocodingState("idle");
    setGeocodingProgress({ current: 0, total: 0 });
    // Clear the hash
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [points]);

  const handleShareMap = useCallback(() => {
    const shareData: ShareData = {
      points: points.map((p) => ({
        lat: p.lat,
        lon: p.lon,
        country: p.country,
        displayName: p.displayName,
        date: p.date?.toISOString() ?? null,
        name: p.name,
      })),
      generatedAt: new Date().toISOString(),
    };
    const encoded = btoa(encodeURIComponent(JSON.stringify(shareData)));
    window.location.hash = `map=${encoded}`;
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    });
  }, [points]);

  const handlePanToPoint = useCallback((index: number) => {
    if (!leafletMapRef.current) return;
    const p = points[index];
    leafletMapRef.current.setView([p.lat, p.lon], 10, { animate: true });
    const marker = markersRef.current[index];
    if (marker) marker.openPopup();
  }, [points]);

  // ── Stats ──────────────────────────────────────────────────────────────────

  const uniqueCountries = Array.from(
    new Set(points.map((p) => p.country).filter(Boolean))
  ) as string[];

  const distanceKm = Math.round(totalDistanceKm(points));

  const countryCounts = new Map<string, number>();
  for (const p of points) {
    const c = p.country || "Unknown";
    countryCounts.set(c, (countryCounts.get(c) || 0) + 1);
  }
  const countryList = Array.from(countryCounts.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">

      {/* ── Shared view banner ── */}
      {isSharedView && uiState === "map" && (
        <div className="mb-4 flex items-center justify-between gap-3 px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-md">
          <p className="text-sm text-[#525252]">
            <span className="mr-1">📍</span>
            Viewing a shared TravelMap &mdash;{" "}
            <span className="font-medium text-[#171717]">
              {uniqueCountries.length} {uniqueCountries.length === 1 ? "country" : "countries"}
            </span>
            ,{" "}
            <span className="font-medium text-[#171717]">
              {points.length} {points.length === 1 ? "photo" : "photos"}
            </span>
          </p>
          <button
            onClick={handleReset}
            className="shrink-0 text-xs font-medium text-[#6366F1] hover:underline"
          >
            Create yours →
          </button>
        </div>
      )}

      {/* ── Idle: DropZone ── */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone — click or drag travel photos to upload"
          className={[
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-[#6366F1] bg-[#6366F1]/5"
              : "border-[#D4D4D4] bg-[#FAFAFA] hover:border-[#A3A3A3] hover:bg-[#F5F5F5]",
          ].join(" ")}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.heic,.heif"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] bg-white flex items-center justify-center">
              <MapPin className="h-6 w-6 text-[#737373]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] mb-1">
                Drop your travel photos
              </p>
              <p className="text-xs text-[#737373]">
                GPS coordinates are read and plotted on your map
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3] max-w-xs leading-relaxed">
              All processing happens in your browser — photos never leave your device
            </p>
            {isPro ? (
              <span className="text-[11px] text-[#A3A3A3]">
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-[#171717] text-white px-1.5 py-0.5 rounded mr-1">PRO</span>
                Up to 500 photos
              </span>
            ) : (
              <p className="text-[11px] text-[#C4C4C4]">
                Free: up to {MAX_TRAVELMAP_FREE} photos &middot;{" "}
                <Link href="/pricing" className="underline hover:text-[#737373]">
                  Pro: 500
                </Link>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Processing: progress bar ── */}
      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] rounded-lg p-8 bg-white">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-[#525252]">
                Processing
              </span>
              <span className="text-xs text-[#A3A3A3]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#171717] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#737373] truncate">{progressMessage}</p>
          <p className="text-xs text-[#A3A3A3] mt-2">
            Nominatim requires 1 request/sec — please wait
          </p>
        </div>
      )}

      {/* ── Map view ── */}
      {uiState === "map" && (
        <div className="space-y-4">

          {/* Header row */}
          <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
            <p className="text-sm font-medium text-[#171717]">
              {points.length} photo{points.length !== 1 ? "s" : ""} plotted
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Start over
            </button>
          </div>

          {/* Geocoding in-progress banner */}
          {geocodingState === "running" && (
            <div className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] bg-[#FAFAFA] rounded-md">
              <div className="h-3 w-3 rounded-full border-2 border-[#6366F1] border-t-transparent animate-spin shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#525252]">
                  Fetching location names... {geocodingProgress.current}/{geocodingProgress.total}
                </p>
                <p className="text-xs text-[#A3A3A3]">
                  1 request/sec (Nominatim limit) — map is already usable
                </p>
              </div>
              <div className="shrink-0 w-24 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6366F1] rounded-full transition-all duration-500"
                  style={{
                    width: geocodingProgress.total > 0
                      ? `${Math.round((geocodingProgress.current / geocodingProgress.total) * 100)}%`
                      : "0%"
                  }}
                />
              </div>
            </div>
          )}

          {/* Error notices */}
          {errors.length > 0 && (
            <div className="border border-[#E5E5E5] rounded-md p-4 bg-[#FAFAFA]">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle
                  className="h-4 w-4 text-[#D97706] shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-xs font-medium text-[#525252]">
                  {errors.length} notice{errors.length !== 1 ? "s" : ""}
                </span>
              </div>
              <ul className="space-y-1">
                {errors.map((err, i) => (
                  <li key={i} className="text-xs text-[#737373]">
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stats bar — above the map */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-[#E5E5E5] rounded-md p-3 bg-white flex items-center gap-3">
              <Globe className="h-4 w-4 text-[#737373] shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-lg font-semibold text-[#171717] leading-none">
                  {uniqueCountries.length}
                </p>
                <p className="text-xs text-[#737373] mt-0.5">
                  {uniqueCountries.length === 1 ? "country" : "countries"}
                </p>
              </div>
            </div>
            <div className="border border-[#E5E5E5] rounded-md p-3 bg-white flex items-center gap-3">
              <Camera className="h-4 w-4 text-[#737373] shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-lg font-semibold text-[#171717] leading-none">
                  {points.length}
                </p>
                <p className="text-xs text-[#737373] mt-0.5">
                  {points.length === 1 ? "photo" : "photos"}
                </p>
              </div>
            </div>
            <div className="border border-[#E5E5E5] rounded-md p-3 bg-white flex items-center gap-3">
              <Navigation className="h-4 w-4 text-[#737373] shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-lg font-semibold text-[#171717] leading-none">
                  {distanceKm.toLocaleString()}
                </p>
                <p className="text-xs text-[#737373] mt-0.5">km traveled</p>
              </div>
            </div>
          </div>

          {/* Map container — isolation:isolate traps all Leaflet z-indexes so the map never overlaps the navbar */}
          <div
            className="border border-[#E5E5E5] rounded-lg overflow-hidden"
            style={{ isolation: "isolate" }}
          >
            <div
              ref={mapContainerRef}
              style={{ height: "350px", width: "100%" }}
              className="sm:!h-[500px]"
              aria-label="Interactive travel map"
            />
          </div>

          {/* Photo strip — shown when any point has a thumbnail (local uploads) */}
          {!isSharedView && points.some((p) => p.thumbnailUrl) && (
            <div>
              <p className="text-xs font-semibold text-[#525252] uppercase tracking-wide mb-2">
                Photo timeline
              </p>
              <div
                className="border border-[#E5E5E5] rounded-lg bg-white p-2"
                style={{ overflowX: "auto" }}
              >
                <div style={{ display: "flex", gap: "8px", padding: "4px" }}>
                  {points.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handlePanToPoint(i)}
                      title={`${p.name} — ${p.displayName || p.country || "Unknown"}`}
                      className="shrink-0 flex flex-col items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] rounded"
                      style={{ width: "72px" }}
                    >
                      {p.thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.thumbnailUrl}
                          alt={p.name}
                          style={{
                            width: 72,
                            height: 72,
                            objectFit: "cover",
                            borderRadius: 6,
                            display: "block",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 72,
                            height: 72,
                            borderRadius: 6,
                            background: "#F5F5F5",
                            border: "1px solid #E5E5E5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span style={{ fontSize: 20 }}>📷</span>
                        </div>
                      )}
                      {p.country && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 500,
                            color: "#525252",
                            background: "#F5F5F5",
                            border: "1px solid #E5E5E5",
                            borderRadius: "4px",
                            padding: "1px 4px",
                            maxWidth: "70px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "block",
                            textAlign: "center",
                          }}
                        >
                          {p.country}
                        </span>
                      )}
                      {p.date && (
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#A3A3A3",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Two-column lower section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Country list */}
            {countryList.length > 0 && (
              <div className="border border-[#E5E5E5] rounded-md bg-white overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E5E5E5]">
                  <p className="text-xs font-semibold text-[#525252] uppercase tracking-wide">
                    Countries visited
                  </p>
                </div>
                <ul className="divide-y divide-[#F5F5F5]">
                  {countryList.map(([country, count]) => (
                    <li
                      key={country}
                      className="flex items-center justify-between px-4 py-2.5"
                    >
                      <span className="text-sm text-[#171717]">{country}</span>
                      <span className="text-xs text-[#A3A3A3]">
                        {count} photo{count !== 1 ? "s" : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              {/* Share map button — only in non-shared mode */}
              {!isSharedView && (
                <button
                  onClick={handleShareMap}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#6366F1] text-white text-sm font-medium rounded-md hover:bg-[#4F46E5] transition-colors"
                >
                  {linkCopied ? (
                    <>
                      <LinkIcon className="h-4 w-4" strokeWidth={1.5} />
                      Link copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4" strokeWidth={1.5} />
                      Share your map
                    </>
                  )}
                </button>
              )}

              {!isSharedView && (
                <p className="text-xs text-[#A3A3A3] text-center leading-relaxed px-2">
                  Use your browser&rsquo;s screenshot tool to save the map as an image
                </p>
              )}

              {isSharedView && (
                <p className="text-xs text-[#A3A3A3] text-center leading-relaxed px-2">
                  This is a read-only shared map. Upload your own photos to create yours.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
