import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that require authentication
const PROTECTED_PREFIXES = ["/dashboard", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected route
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // Verify JWT token exists (user is logged in)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Logged-in users visiting public tool pages → redirect to dashboard version
  if (token && pathname.startsWith("/tools/") && pathname !== "/tools") {
    const toolSlug = pathname.replace("/tools/", "");
    return NextResponse.redirect(new URL(`/dashboard/tools/${toolSlug}`, request.url));
  }

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!token) {
    // Redirect unauthenticated users to sign-in
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals, static files, and API
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
