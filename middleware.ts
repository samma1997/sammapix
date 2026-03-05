import { NextRequest, NextResponse } from "next/server";
import { COUNTRY_TO_LOCALE, SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/translations";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Don't override if user already has a locale cookie set
  if (request.cookies.get("NEXT_LOCALE")) {
    return response;
  }

  // 1. Try Vercel's built-in geo header (free on all plans, injected at edge)
  const country = request.headers.get("x-vercel-ip-country");
  let locale = country ? COUNTRY_TO_LOCALE[country] ?? null : null;

  // 2. Fallback: Accept-Language header (works in local dev too)
  if (!locale) {
    const acceptLang = request.headers.get("accept-language") ?? "";
    const preferred = acceptLang.split(",")[0]?.split("-")[0]?.toLowerCase();
    if (preferred && SUPPORTED_LOCALES.includes(preferred as never)) {
      locale = preferred as typeof DEFAULT_LOCALE;
    }
  }

  // 3. Final fallback: English
  locale = locale ?? DEFAULT_LOCALE;

  // Set cookie for 1 year — Server Components read this
  response.cookies.set("NEXT_LOCALE", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals, static files, and API
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
