import { NextRequest, NextResponse } from "next/server";

/**
 * Allowed origins for API requests in production.
 * Same-origin fetch() does NOT send an Origin header, so missing origin is allowed.
 */
const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
];

/**
 * Validate the Origin header on API requests.
 * Returns a 403 NextResponse if the origin is not allowed, or null if OK.
 *
 * Rules:
 * - In development, always allow (no origin check).
 * - Missing Origin header is allowed (same-origin requests don't send it).
 * - If Origin is present, it must match one of our allowed origins.
 *
 * Usage:
 *   const originError = validateOrigin(request);
 *   if (originError) return originError;
 */
export function validateOrigin(request: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV !== "production") return null;

  const origin = request.headers.get("origin");
  if (!origin) return null; // same-origin fetch doesn't send Origin

  if (!ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  return null;
}

/**
 * Add standard security headers to an API response.
 */
export function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Robots-Tag", "noindex, noarchive");
  return response;
}
