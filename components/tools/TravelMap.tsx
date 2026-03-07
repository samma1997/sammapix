"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  MapPin,
  RotateCcw,
  Copy,
  ExternalLink,
  Globe,
  Camera,
  Navigation,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PhotoPoint {
  file: File;
  lat: number;
  lon: number;
  date: Date | null;
  country: string | null;
  displayName: string | null;
}

type UIState = "idle" | "processing" | "map";

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
  const displayName = city && country ? `${city}, ${country}` : country || data.display_name?.split(",")[0] || null;
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

const MAX_TRAVELMAP_FREE = 50;

// ── Main Component ────────────────────────────────────────────────────────────

export default function TravelMapClient() {
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progressMessage, setProgressMessage] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [points, setPoints] = useState<PhotoPoint[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null);

  // Inject Leaflet CSS once
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

  // Build/update Leaflet map when points change and we're in map state
  useEffect(() => {
    if (uiState !== "map" || points.length === 0) return;
    if (!mapContainerRef.current) return;

    // Small timeout to ensure DOM is ready
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

      // Destroy existing map if re-initializing
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }

      const container = mapContainerRef.current!;
      const map = L.map(container, { zoomControl: true }).setView(
        [points[0].lat, points[0].lon],
        4
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Build country color map
      const colorMap = new Map<string, string>();

      // Draw dashed polyline connecting all points in order
      const latlngs: [number, number][] = points.map((p) => [p.lat, p.lon]);
      L.polyline(latlngs, {
        color: "#A3A3A3",
        weight: 2,
        dashArray: "6 6",
        opacity: 0.8,
      }).addTo(map);

      // Add markers
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const country = p.country || "Unknown";
        const color = colorForCountry(country, colorMap);

        // Circular DivIcon
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

        const popupContent = `
          <div style="font-family:Inter,sans-serif;min-width:160px;">
            <div style="font-weight:600;font-size:13px;color:#171717;margin-bottom:4px;">${p.file.name}</div>
            <div style="font-size:12px;color:#737373;margin-bottom:2px;">${p.displayName || p.country || "Unknown location"}</div>
            <div style="font-size:11px;color:#A3A3A3;">${dateStr}</div>
          </div>
        `;

        L.marker([p.lat, p.lon], { icon })
          .bindPopup(popupContent, { maxWidth: 220 })
          .addTo(map);
      }

      // Fit map to all points
      if (points.length > 1) {
        const bounds = L.latLngBounds(latlngs);
        map.fitBounds(bounds, { padding: [40, 40] });
      }

      leafletMapRef.current = map;
    }, 100);

    return () => clearTimeout(timer);
  }, [uiState, points]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // ── Process uploaded files ─────────────────────────────────────────────────

  const processFiles = useCallback(async (files: File[]) => {
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    const accepted = imageFiles.slice(0, MAX_TRAVELMAP_FREE);
    const errorMessages: string[] = [];

    if (imageFiles.length > MAX_TRAVELMAP_FREE) {
      errorMessages.push(
        `Free plan: only the first ${MAX_TRAVELMAP_FREE} photos were processed. Upgrade to Pro to plot up to 500 photos.`
      );
    }

    setUiState("processing");
    setProgressPercent(0);

    // Lazy-load exifr
    let exifr: typeof import("exifr");
    try {
      exifr = await import("exifr");
    } catch {
      setErrors(["Failed to load EXIF reader. Please try again."]);
      setUiState("idle");
      return;
    }

    // ── Step 1: Read GPS and date from every file ──────────────────────────
    const rawPoints: Array<{
      file: File;
      lat: number;
      lon: number;
      date: Date | null;
    }> = [];

    for (let i = 0; i < accepted.length; i++) {
      const file = accepted[i];
      setProgressMessage(
        `Reading GPS from photo ${i + 1} of ${accepted.length} — ${file.name}`
      );
      setProgressPercent(Math.round(((i + 1) / accepted.length) * 40));

      try {
        const [gps, exifData] = await Promise.all([
          exifr.gps(file),
          exifr.parse(file, ["DateTimeOriginal", "CreateDate"]).catch(() => null),
        ]);

        if (gps) {
          let date: Date | null = null;
          if (exifData?.DateTimeOriginal) {
            date = new Date(exifData.DateTimeOriginal);
          } else if (exifData?.CreateDate) {
            date = new Date(exifData.CreateDate);
          }
          rawPoints.push({ file, lat: gps.latitude, lon: gps.longitude, date });
        }
      } catch {
        errorMessages.push(`Could not read EXIF from ${file.name} — skipped.`);
      }
    }

    if (rawPoints.length === 0) {
      setErrors([
        ...errorMessages,
        "No GPS data found in any of the uploaded photos.",
      ]);
      setUiState("idle");
      return;
    }

    // Sort by date if available (photos without dates go to end)
    rawPoints.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.getTime() - b.date.getTime();
    });

    // ── Step 2: Reverse-geocode unique grid areas ──────────────────────────
    const gridToGeo = new Map<
      string,
      { country: string | null; displayName: string | null }
    >();

    const uniqueKeys: string[] = [];
    for (const p of rawPoints) {
      const key = gridKey(p.lat, p.lon);
      if (!gridToGeo.has(key) && !uniqueKeys.includes(key)) {
        uniqueKeys.push(key);
      }
    }

    for (let k = 0; k < uniqueKeys.length; k++) {
      const key = uniqueKeys[k];
      setProgressMessage(
        `Fetching location for area ${k + 1} of ${uniqueKeys.length}...`
      );
      setProgressPercent(
        40 + Math.round(((k + 1) / Math.max(uniqueKeys.length, 1)) * 55)
      );

      const [latStr, lonStr] = key.split("_");
      const lat = parseFloat(latStr);
      const lon = parseFloat(lonStr);

      try {
        const geo = await reverseGeocode(lat, lon);
        gridToGeo.set(key, geo);
      } catch {
        gridToGeo.set(key, { country: null, displayName: null });
        errorMessages.push(
          `Could not fetch location name for area ${key}.`
        );
      }

      if (k < uniqueKeys.length - 1) {
        await delay(1100);
      }
    }

    // ── Step 3: Build final points array ──────────────────────────────────
    const finalPoints: PhotoPoint[] = rawPoints.map((p) => {
      const key = gridKey(p.lat, p.lon);
      const geo = gridToGeo.get(key) || { country: null, displayName: null };
      return {
        file: p.file,
        lat: p.lat,
        lon: p.lon,
        date: p.date,
        country: geo.country,
        displayName: geo.displayName,
      };
    });

    setProgressPercent(100);
    setProgressMessage("Done!");
    setPoints(finalPoints);
    setErrors(errorMessages);
    setUiState("map");
  }, []);

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
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }
    setUiState("idle");
    setPoints([]);
    setErrors([]);
    setProgressPercent(0);
    setProgressMessage("");
    setCopied(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleCopyCoordinates = useCallback(() => {
    const json = JSON.stringify(
      points.map((p) => ({
        file: p.file.name,
        lat: p.lat,
        lon: p.lon,
        date: p.date?.toISOString() ?? null,
        location: p.displayName ?? p.country ?? null,
      })),
      null,
      2
    );
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [points]);

  const googleMapsUrl = useCallback(() => {
    // Google Maps directions with up to 8 waypoints (API limit)
    const sample = points.slice(0, 10);
    if (sample.length < 2) return null;
    const origin = `${sample[0].lat},${sample[0].lon}`;
    const destination = `${sample[sample.length - 1].lat},${sample[sample.length - 1].lon}`;
    const waypoints = sample
      .slice(1, -1)
      .map((p) => `${p.lat},${p.lon}`)
      .join("|");
    const base = "https://www.google.com/maps/dir/";
    return `${base}?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ""}`;
  }, [points]);

  // ── Stats ──────────────────────────────────────────────────────────────────

  const uniqueCountries = Array.from(
    new Set(points.map((p) => p.country).filter(Boolean))
  ) as string[];

  const distanceKm = Math.round(totalDistanceKm(points));

  // Country list with counts
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
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
            accept="image/*"
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
            <p className="text-[11px] text-[#C4C4C4]">
              Free: up to {MAX_TRAVELMAP_FREE} photos &middot;{" "}
              <Link href="/pricing" className="underline hover:text-[#737373]">
                Pro: 500
              </Link>
            </p>
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

          {/* Map container */}
          <div className="border border-[#E5E5E5] rounded-lg overflow-hidden">
            <div
              ref={mapContainerRef}
              style={{ height: "480px", width: "100%" }}
              aria-label="Interactive travel map"
            />
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-[#E5E5E5] rounded-md p-4 bg-white text-center">
              <div className="flex items-center justify-center mb-1">
                <Globe className="h-4 w-4 text-[#737373]" strokeWidth={1.5} />
              </div>
              <p className="text-xl font-semibold text-[#171717]">
                {uniqueCountries.length}
              </p>
              <p className="text-xs text-[#737373] mt-0.5">
                {uniqueCountries.length === 1 ? "country" : "countries"}
              </p>
            </div>
            <div className="border border-[#E5E5E5] rounded-md p-4 bg-white text-center">
              <div className="flex items-center justify-center mb-1">
                <Camera className="h-4 w-4 text-[#737373]" strokeWidth={1.5} />
              </div>
              <p className="text-xl font-semibold text-[#171717]">
                {points.length}
              </p>
              <p className="text-xs text-[#737373] mt-0.5">
                {points.length === 1 ? "photo" : "photos"}
              </p>
            </div>
            <div className="border border-[#E5E5E5] rounded-md p-4 bg-white text-center">
              <div className="flex items-center justify-center mb-1">
                <Navigation
                  className="h-4 w-4 text-[#737373]"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-xl font-semibold text-[#171717]">
                {distanceKm.toLocaleString()}
              </p>
              <p className="text-xs text-[#737373] mt-0.5">km traveled</p>
            </div>
          </div>

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

            {/* Export actions */}
            <div className="space-y-2">
              <button
                onClick={handleCopyCoordinates}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors"
              >
                <Copy className="h-4 w-4" strokeWidth={1.5} />
                {copied ? "Copied!" : "Copy coordinates as JSON"}
              </button>

              {googleMapsUrl() && (
                <a
                  href={googleMapsUrl()!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5E5] text-[#171717] text-sm font-medium rounded-md hover:bg-[#F5F5F5] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                  Open route in Google Maps
                </a>
              )}

              <p className="text-xs text-[#A3A3A3] text-center leading-relaxed px-2">
                Use your browser&rsquo;s screenshot tool to save the map as an image
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
