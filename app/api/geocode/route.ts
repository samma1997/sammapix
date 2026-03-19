import { NextRequest, NextResponse } from "next/server";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";

const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "http://localhost:3000",
];

function addSecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set("X-RateLimit-Policy", "60;w=60");
  return res;
}

// In-process cache (reduce Nominatim load within same Lambda instance)
const cache = new Map<string, object>();

// Validate that a string is a finite decimal number within geographic bounds
function isValidCoordinate(value: string, min: number, max: number): boolean {
  // Only allow digits, a leading minus sign, and a single decimal point
  if (!/^-?\d{1,3}(\.\d{1,8})?$/.test(value)) return false;
  const n = parseFloat(value);
  return isFinite(n) && n >= min && n <= max;
}

export async function GET(req: NextRequest) {
  // CSRF: reject cross-origin requests in production
  // Note: same-origin fetch() does NOT send an Origin header, so we allow missing origin
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const { searchParams } = req.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 });
  }

  // Validate coordinate format and range to prevent injection into Nominatim URL
  if (!isValidCoordinate(lat, -90, 90)) {
    return NextResponse.json({ error: "Invalid latitude" }, { status: 400 });
  }
  if (!isValidCoordinate(lon, -180, 180)) {
    return NextResponse.json({ error: "Invalid longitude" }, { status: 400 });
  }

  const cacheKey = `${lat.slice(0, 5)}_${lon.slice(0, 5)}`;

  // Check in-process cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // Build URL with validated, numeric-safe values
  const safeUrl = new URL(NOMINATIM_URL);
  safeUrl.searchParams.set("lat", lat);
  safeUrl.searchParams.set("lon", lon);
  safeUrl.searchParams.set("format", "json");
  safeUrl.searchParams.set("zoom", "10");
  const url = safeUrl.toString();

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "SammaPix/1.0 (https://www.sammapix.com)",
        "Accept-Language": "en",
      },
      next: { revalidate: 86400 }, // cache 24h- same location = same result
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Geocoding failed" }, { status: 502 });
    }

    const data = await res.json();

    // Save in in-process cache
    cache.set(cacheKey, data);

    return addSecurityHeaders(NextResponse.json(data));
  } catch {
    return NextResponse.json({ error: "Geocoding error" }, { status: 500 });
  }
}
