import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 });
  }

  const numLat = parseFloat(lat);
  const numLon = parseFloat(lon);
  if (isNaN(numLat) || isNaN(numLon)) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${numLat}&lon=${numLon}&format=json&zoom=5`,
      {
        headers: {
          "User-Agent": "SammaPix/1.0 (sammapix.com)",
          "Accept-Language": "en",
          "Referer": "https://sammapix.com",
        },
        next: { revalidate: 86400 }, // cache 24h — stessa coordinata, stesso paese
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: `Nominatim error ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=86400" },
    });
  } catch {
    return NextResponse.json({ error: "Geocode failed" }, { status: 502 });
  }
}
