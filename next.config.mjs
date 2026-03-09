/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/destinations', destination: '/portfolio', permanent: true },
      { source: '/destinations/:slug', destination: '/portfolio/:slug', permanent: true },
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
      {
        source: "/(.*)",
        headers: [
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
              "script-src 'self' 'unsafe-inline' https://js.stripe.com https://pagead2.googlesyndication.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              // blob: is required for client-side image preview URLs (createObjectURL)
              // data: is required for base64 thumbnails sent to the AI rename API
              "img-src 'self' data: blob: https://lh3.googleusercontent.com https://avatars.githubusercontent.com https://siteground.com https://*.siteground.com https://picsum.photos https://fastly.picsum.photos https://res.cloudinary.com https://*.tile.openstreetmap.org https://tile.openstreetmap.org",
              // worker-src blob: is required for JSZip and browser-image-compression workers
              "worker-src 'self' blob:",
              // Nominatim geocoding is called server-side; client only hits /api/geocode
              "connect-src 'self' https://api.stripe.com https://*.tile.openstreetmap.org https://nominatim.openstreetmap.org",
              "frame-src https://js.stripe.com",
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
