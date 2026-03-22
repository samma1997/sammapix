import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import LayoutShell from "@/components/layout/LayoutShell";
import { APP_NAME, APP_URL } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/next";
import CookieConsent from "@/components/layout/CookieConsent";
import AntiCopy from "@/components/layout/AntiCopy";
import { headers } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME}- Free Image Optimizer, WebP Converter & AI Rename`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Compress JPG, PNG, WebP images for free. Convert to WebP. AI-powered SEO filename generator. 100% client-side- images never leave your browser.",
  keywords: [
    "image compressor",
    "webp converter",
    "ai image renaming",
    "free image optimizer",
    "tinypng alternative",
    "compress images online",
  ],
  authors: [{ name: "Luca Sammarco", url: "https://lucasammarco.com" }],
  creator: "Luca Sammarco",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME}- Free Image Optimizer & AI Rename`,
    description:
      "Compress, convert to WebP, and AI-rename images in seconds. Free forever.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix - Free Image Optimizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME}- Free Image Optimizer & AI Rename`,
    description:
      "Compress, convert to WebP, and AI-rename images in seconds. Free forever.",
    images: ["/og-image.png"],
    creator: "@lucasammarco",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json",
  other: {
    "impact-site-verification": "ea5238e5-3e70-4cdb-b4d2-ebdd254df866",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detect growth subdomain on the server side using request headers.
  // On growth.sammapix.com we render a completely bare shell with zero
  // SammaPix chrome — no Providers, no LayoutShell, no CookieConsent,
  // no AntiCopy, no Analytics. The growth app is fully self-contained.
  const headersList = await headers();
  const hostname = headersList.get("host") || "";
  const isGrowthSubdomain = hostname.startsWith("growth.");

  if (isGrowthSubdomain) {
    return (
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}`,
            }}
          />
        </head>
        <body className="font-sans antialiased bg-white dark:bg-[#191919] text-gray-900 dark:text-[#E5E5E5] min-h-screen">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}` }} />
        {/* Preconnect to external origins to reduce connection latency (LCP impact) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        )}
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
          <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        )}
        {/* iOS PWA support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SammaPix" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-[#191919] text-gray-900 dark:text-[#E5E5E5] min-h-screen flex flex-col transition-colors duration-150" data-sp-v="2" data-sp-o="LS">{/*
        ═══════════════════════════════════════════════════════════════
        SammaPix — Copyright 2026 Luca Sammarco. All rights reserved.
        Unauthorized reproduction, scraping, mirroring, or derivative
        work is strictly prohibited. This source code, design, layout,
        and all associated assets are proprietary intellectual property.
        Fingerprint: SP-2026-LS-9F3A7B2E — Automated monitoring active.
        ═══════════════════════════════════════════════════════════════
      */}
        <Providers>
          <LayoutShell>{children}</LayoutShell>
          {/* Tracking scripts are loaded by CookieConsent after user consent */}
          <CookieConsent />
          <AntiCopy />
        </Providers>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://sammapix.com/#organization",
                  "name": "SammaPix",
                  "url": "https://sammapix.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://sammapix.com/og-image.png",
                    "width": 1200,
                    "height": 630,
                  },
                  "founder": {
                    "@type": "Person",
                    "name": "Luca Sammarco",
                    "url": "https://lucasammarco.com",
                  },
                  "description":
                    "Free browser-based image optimization tools. Compress, convert, resize, and enhance photos without uploading to any server.",
                  "sameAs": [
                    "https://github.com/samma1997",
                    "https://twitter.com/lucasammarco",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://sammapix.com/#website",
                  "url": "https://sammapix.com",
                  "name": "SammaPix",
                  "publisher": { "@id": "https://sammapix.com/#organization" },
                  "description":
                    "The fastest free image optimizer. Compress, convert to WebP, and AI-rename your images- no signup needed.",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://sammapix.com/tools?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
