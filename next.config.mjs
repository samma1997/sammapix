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
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://pagead2.googlesyndication.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://cdnjs.cloudflare.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://lh3.googleusercontent.com https://avatars.githubusercontent.com https://siteground.com https://*.siteground.com https://picsum.photos https://fastly.picsum.photos https://*.tile.openstreetmap.org https://tile.openstreetmap.org https://unpkg.com https://cdnjs.cloudflare.com",
              "connect-src 'self' https://generativelanguage.googleapis.com https://api.stripe.com https://*.tile.openstreetmap.org",
              "frame-src https://js.stripe.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
