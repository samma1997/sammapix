import { NextRequest, NextResponse } from "next/server";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";

// In-process cache (reduce Nominatim load within same Lambda instance)
const cache = new Map<string, object>();

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 });
  }

  const cacheKey = `${lat.slice(0, 5)}_${lon.slice(0, 5)}`;

  // Check in-process cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  const url = `${NOMINATIM_URL}?lat=${lat}&lon=${lon}&format=json&zoom=10`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "SammaPix/1.0 (https://www.sammapix.com)",
        "Accept-Language": "en",
      },
      next: { revalidate: 86400 }, // cache 24h — same location = same result
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Geocoding failed" }, { status: 502 });
    }

    const data = await res.json();

    // Save in in-process cache
    cache.set(cacheKey, data);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Geocoding error" }, { status: 500 });
  }
}
