import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that require authentication
const PROTECTED_PREFIXES = ["/dashboard", "/admin"];

// ── Bot / Scraper Detection ──────────────────────────────────────────────────

/** Known scraping / mirroring user-agent substrings (case-insensitive match). */
const BLOCKED_UA_PATTERNS = [
  // Mirroring tools
  "httrack",
  "website-scraper",
  "websitescraper",
  "webripper",
  "webcopier",
  "sitecopy",
  "sitesucker",
  "teleport",
  "webcapture",
  "offline explorer",
  "blackwidow",
  "webzip",
  "pavuk",
  // CLI downloaders used for mirroring
  "wget",
  "curl",
  "httpie",
  "aria2",
  // Scripting libraries
  "python-requests",
  "python-urllib",
  "python-httpx",
  "aiohttp",
  "scrapy",
  "node-fetch",
  "axios",
  "go-http-client",
  "java/",
  "apache-httpclient",
  "okhttp",
  "libwww-perl",
  "mechanize",
  "lwp-trivial",
  "lwp::simple",
  // SEO / content scrapers (not search engines)
  "dotbot",
  "mj12bot",
  "blexbot",
  "megaindex",
  "rogerbot",
  "seznambot",
  "linkdexbot",
  // Headless browsers (non-standard UA patterns)
  "headlesschrome",
  "phantomjs",
  "slimerjs",
  // Generic
  "bot/scrape",
  "scraper",
  "harvest",
  "collector",
  "extractor",
];

/** Legitimate bots we must NEVER block (search engines, ads, social, AI). */
const ALLOWED_BOTS = [
  "googlebot",
  "google-extended",
  "bingbot",
  "slurp",          // Yahoo
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "applebot",
  "facebookexternalhit",
  "facebot",
  "twitterbot",
  "linkedinbot",
  "pinterestbot",
  "whatsapp",
  "telegrambot",
  "discordbot",
  "slackbot",
  // AI crawlers
  "gptbot",
  "chatgpt-user",
  "claude-web",
  "anthropic-ai",
  "claude-code",
  "semrushbot",
  "ahrefsbot",
  "perplexitybot",
  "ccbot",
  "omgilibot",
  // Monitoring / verification
  "uptimerobot",
  "pingdom",
  "statuspage",
  "stripe",
  "vercel",
  // Google services (Ads verification, PageSpeed, etc.)
  "adsbot-google",
  "mediapartners-google",
  "google-inspectiontool",
  "chrome-lighthouse",
  "pagespeed",
  "google-adwords",
];

function isAllowedBot(ua: string): boolean {
  const lower = ua.toLowerCase();
  return ALLOWED_BOTS.some((allowed) => lower.includes(allowed));
}

function isBlockedBot(ua: string): boolean {
  const lower = ua.toLowerCase();
  if (isAllowedBot(lower)) return false;
  return BLOCKED_UA_PATTERNS.some((pattern) => lower.includes(pattern));
}

// ── Rate Limiting (in-memory, per-instance) ──────────────────────────────────
// This is a lightweight per-instance store. On Vercel each edge function instance
// has its own memory, so this is not globally consistent — but it adds meaningful
// friction for aggressive scrapers hitting the same PoP. Vercel Edge Config or
// KV could be used for a stricter global rate limit if needed.

interface RateBucket {
  count: number;
  resetAt: number;
}

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 60; // max requests per window for unauthenticated visitors

const rateLimitMap = new Map<string, RateBucket>();

// Periodically prune stale entries to avoid memory growth
let lastPrune = Date.now();
function pruneIfNeeded() {
  const now = Date.now();
  if (now - lastPrune < 120_000) return; // prune at most every 2 min
  lastPrune = now;
  for (const [key, bucket] of rateLimitMap) {
    if (bucket.resetAt < now) rateLimitMap.delete(key);
  }
}

function isRateLimited(ip: string): boolean {
  pruneIfNeeded();
  const now = Date.now();
  const bucket = rateLimitMap.get(ip);

  if (!bucket || bucket.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count++;
  return bucket.count > RATE_LIMIT_MAX;
}

// ── Suspicious pattern detection ──────────────────────────────────────────────

function hasSuspiciousPatterns(request: NextRequest): boolean {
  const { pathname } = request.nextUrl;

  // Block attempts to download common archive/export paths
  if (/\.(sql|env|git|bak|backup|dump|tar|gz|zip)$/i.test(pathname)) {
    return true;
  }

  // Block wp-admin, xmlrpc, and other WordPress probes
  if (
    pathname.includes("wp-admin") ||
    pathname.includes("wp-login") ||
    pathname.includes("xmlrpc") ||
    pathname.includes("wp-content") ||
    pathname.includes("wp-includes")
  ) {
    return true;
  }

  // Block path traversal attempts
  if (pathname.includes("..") || pathname.includes("//")) {
    return true;
  }

  return false;
}

// ── Referral cookie helper ────────────────────────────────────────────────────

function attachRefCookie(response: NextResponse, code: string | null): NextResponse {
  if (!code) return response;
  response.cookies.set("sammapix_ref", code, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
    httpOnly: false, // Client JS needs to read this to call /api/referral/claim
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return response;
}

// ── Middleware ────────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";
  const hostname = request.headers.get("host") || "";

  // ── Subdomain routing: growth.sammapix.com ────────────────────────────────
  const isGrowthSubdomain = hostname.startsWith("growth.");

  if (isGrowthSubdomain) {
    // On growth subdomain: only allow /dashboard/growth/*, /auth/*, /api/*, /_next/*
    if (
      !pathname.startsWith("/dashboard/growth") &&
      !pathname.startsWith("/auth") &&
      !pathname.startsWith("/api/") &&
      !pathname.startsWith("/_next/") &&
      pathname !== "/favicon.ico"
    ) {
      // Redirect everything else to the growth dashboard
      return NextResponse.redirect(new URL("/dashboard/growth", request.url));
    }

    // On growth subdomain: restrict to admin email only
    const growthToken = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (pathname.startsWith("/dashboard/growth")) {
      if (!growthToken) {
        const signInUrl = new URL("/auth/signin", request.url);
        signInUrl.searchParams.set("callbackUrl", "/dashboard/growth");
        return NextResponse.redirect(signInUrl);
      }
      // Only allow lucasamm97@gmail.com
      if (growthToken.email !== "lucasamm97@gmail.com") {
        return new NextResponse("Access denied", { status: 403 });
      }
    }

    // No SEO headers, no bot blocking on growth subdomain
    return NextResponse.next();
  }

  // ── Main domain: /dashboard/growth accessible but admin-only ──────────
  // (Growth subdomain is an alias — both work for now)

  // ── Referral cookie capture ──────────────────────────────────────────────
  // Capture ?ref=SPIX-XXXX on ANY page, set 30-day cookie.
  // Only set if user is not already logged in and code format is valid.
  const refParam = request.nextUrl.searchParams.get("ref");
  let referralCookieResponse: string | null = null; // Referral code to set as cookie

  if (refParam && /^SPIX-[A-Z0-9]{4}$/.test(refParam)) {
    // Only set if no existing referral cookie (first link wins)
    const existingRef = request.cookies.get("sammapix_ref")?.value;
    if (!existingRef) {
      referralCookieResponse = refParam; // Store code to attach later
    }
  }

  // 0. Honeypot trap — only bots follow hidden links to /sp-trap
  if (pathname === "/sp-trap" || pathname === "/sp-admin") {
    const ip = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? "unknown";
    console.warn(`[honeypot] Bot trapped: IP=${ip} UA=${ua.slice(0, 80)} path=${pathname}`);
    // Ban this IP from rate limiter by filling up their bucket
    const entry = rateLimitMap.get(ip);
    if (entry) {
      entry.count = RATE_LIMIT_MAX + 100;
    } else {
      rateLimitMap.set(ip, { count: RATE_LIMIT_MAX + 100, resetAt: Date.now() + 3600_000 });
    }
    return new NextResponse("Not found", { status: 404 });
  }

  // 1. Block suspicious path patterns
  if (hasSuspiciousPatterns(request)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2. Block known scraping user agents
  if (isBlockedBot(ua)) {
    return new NextResponse(
      "Access denied. If you believe this is a mistake, contact support@sammapix.com",
      { status: 403, headers: { "Retry-After": "86400" } }
    );
  }

  // 3. Rate limit unauthenticated requests (skip static assets, API, and allowed bots like Googlebot/SemrushBot)
  if (!pathname.startsWith("/api/") && !pathname.startsWith("/_next/") && !isAllowedBot(ua)) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (ip !== "unknown" && isRateLimited(ip)) {
      return new NextResponse("Too Many Requests. Please slow down.", {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
        },
      });
    }
  }

  // 4. Check if this is a protected route
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // Verify JWT token exists (user is logged in)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 5. Logged-in users visiting public tool pages -> redirect to dashboard version
  if (token && pathname.startsWith("/tools/") && pathname !== "/tools") {
    const toolSlug = pathname.replace("/tools/", "");
    const redirect = NextResponse.redirect(new URL(`/dashboard/tools/${toolSlug}`, request.url));
    return attachRefCookie(redirect, referralCookieResponse);
  }

  if (!isProtected) {
    const response = NextResponse.next();
    // Add anti-scraping headers to every response
    response.headers.set("X-Robots-Tag", "noarchive");
    return attachRefCookie(response, referralCookieResponse);
  }

  if (!token) {
    // Redirect unauthenticated users to sign-in
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    const redirect = NextResponse.redirect(signInUrl);
    // Attach referral cookie even on redirect so it survives OAuth flow
    return attachRefCookie(redirect, referralCookieResponse);
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noarchive");
  return attachRefCookie(response, referralCookieResponse);
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals, static files, and API
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
