import { NextRequest, NextResponse } from "next/server";

// i18n/locale detection removed- site is English-only.
// Middleware is kept minimal for future use (e.g. auth checks).

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals, static files, and API
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
