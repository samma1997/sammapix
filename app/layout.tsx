import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import LayoutShell from "@/components/layout/LayoutShell";
import { APP_NAME, APP_URL } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/next";

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
  manifest: "/manifest.json",
  other: {
    "impact-site-verification": "ea5238e5-3e70-4cdb-b4d2-ebdd254df866",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}` }} />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-[#191919] text-gray-900 dark:text-[#E5E5E5] min-h-screen flex flex-col transition-colors duration-150">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}</Script>
        )}
        {/* Google Ads gtag */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
            `}</Script>
          </>
        )}
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
