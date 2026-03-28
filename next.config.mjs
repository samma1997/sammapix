/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable source maps in production to prevent code inspection
  productionBrowserSourceMaps: false,
  // Disable x-powered-by header (don't reveal Next.js)
  poweredByHeader: false,
  // ESLint 8 + next/core-web-vitals + next/typescript produces a circular JSON
  // error during the build lint phase. TypeScript type-check still runs via tsc.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable source maps in production to prevent code inspection
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      { source: '/destinations', destination: '/about', permanent: true },
      { source: '/destinations/:slug', destination: '/about/:slug', permanent: true },
      { source: '/portfolio/:slug', destination: '/about/:slug', permanent: true },
      // Old blog slugs → new equivalents (301 permanent redirects)
      { source: '/blog/ai-image-renaming-seo', destination: '/blog/ai-image-renaming-seo-guide', permanent: true },
      { source: '/blog/tinypng-alternative', destination: '/vs/tinypng', permanent: true },
      { source: '/blog/remove-exif-data-photos', destination: '/blog/remove-exif-protect-privacy', permanent: true },
      { source: '/blog/compress-images-for-website', destination: '/blog/compress-images-without-losing-quality', permanent: true },
      { source: '/blog/jpg-to-webp-converter', destination: '/blog/complete-guide-webp-format', permanent: true },
      { source: '/blog/reduce-image-size-without-losing-quality', destination: '/blog/compress-images-without-losing-quality', permanent: true },
      { source: '/blog/best-image-format-for-web', destination: '/blog/best-image-format-for-web-2026', permanent: true },
      { source: '/blog/image-seo-guide', destination: '/blog/ai-image-renaming-seo-guide', permanent: true },
      { source: '/blog/compress-png-without-losing-quality', destination: '/blog/compress-images-without-losing-quality', permanent: true },
      { source: '/blog/optimize-images-wordpress', destination: '/blog/optimize-images-wordpress-guide', permanent: true },
      { source: '/blog/geosort-sort-photos-by-location', destination: '/blog/organize-travel-photos-by-country', permanent: true },
      { source: '/blog/travel-map-gps-photos', destination: '/blog/create-travel-photo-map', permanent: true },
      { source: '/blog/how-to-cull-photos-fast', destination: '/blog/cull-photos-faster-workflow', permanent: true },
      { source: '/blog/find-duplicate-photos-free', destination: '/blog/find-delete-duplicate-photos', permanent: true },
      // Tool shortcut redirects (fix 404s from Semrush audit)
      { source: '/compress', destination: '/tools/compress', permanent: true },
      { source: '/tools/resize', destination: '/tools/resizepack', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async headers() {
    return [
      // Static assets — immutable cache for hashed files
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Public assets — 1 week cache
      {
        source: "/icon-:size.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800" },
        ],
      },
      {
        source: "/og-image.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800" },
        ],
      },
{
        source: "/(.*)",
        headers: [
          // Anti-scraping: prevent Google/Bing from caching page copies
          { key: "X-Robots-Tag", value: "noarchive" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            // geolocation is intentionally allowed only for GeoSort/TravelMap tool
            value: "camera=(), microphone=(), geolocation=(self), payment=(https://js.stripe.com)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Cross-Origin policies — prevent data leakage via Spectre-class attacks
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // 'unsafe-inline' is required by Next.js for inline style tags and
              // React hydration scripts. 'unsafe-eval' has been REMOVED — Next.js
              // App Router does not require it.
              "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob: https://js.stripe.com https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://connect.facebook.net https://accounts.google.com https://apis.google.com https://www.dropbox.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              // blob: is required for client-side image preview URLs (createObjectURL)
              // data: is required for base64 thumbnails sent to the AI rename API
              "img-src 'self' data: blob: https://lh3.googleusercontent.com https://avatars.githubusercontent.com https://siteground.com https://*.siteground.com https://picsum.photos https://fastly.picsum.photos https://*.tile.openstreetmap.org https://tile.openstreetmap.org https://res.cloudinary.com https://images.unsplash.com https://www.facebook.com https://www.google.com https://www.googleadservices.com",
              // worker-src blob: is required for JSZip and browser-image-compression workers
              "worker-src 'self' blob: https://staticimgly.com https://*.staticimgly.com",
              // Nominatim geocoding is called server-side; client only hits /api/geocode
              "connect-src 'self' blob: https://api.stripe.com https://*.tile.openstreetmap.org https://nominatim.openstreetmap.org https://va.vercel-scripts.com https://www.google-analytics.com https://*.google-analytics.com https://www.facebook.com https://connect.facebook.net https://googleads.g.doubleclick.net https://www.google.com https://pagead2.googlesyndication.com https://fonts.gstatic.com https://www.googleapis.com https://accounts.google.com https://content.googleapis.com https://www.dropbox.com https://dl.dropboxusercontent.com https://api.dropboxapi.com https://staticimgly.com https://*.staticimgly.com",
              "frame-src https://js.stripe.com https://accounts.google.com https://docs.google.com https://www.dropbox.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://checkout.stripe.com",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
