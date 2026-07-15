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
 * True if the request comes from a browser extension (chrome-extension:// origin).
 */
export function isExtensionOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !!origin && origin.startsWith("chrome-extension://");
}

/**
 * Reflect a chrome-extension:// origin with credentialed-CORS headers so the SammaPix
 * browser extension can call user-scoped endpoints. Safe because those endpoints still
 * require the user's own auth session — this only relaxes the CSRF origin check.
 */
export function withExtensionCors(request: NextRequest, response: NextResponse): NextResponse {
  const origin = request.headers.get("origin");
  if (origin && origin.startsWith("chrome-extension://")) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.append("Vary", "Origin");
  }
  return response;
}

/**
 * Add standard security headers to an API response.
 */
export function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Robots-Tag", "noindex, noarchive");
  return response;
}
