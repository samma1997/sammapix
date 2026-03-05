import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";
import { APP_NAME, APP_URL } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} — Free Image Optimizer, WebP Converter & AI Rename`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Compress JPG, PNG, WebP images for free. Convert to WebP. AI-powered SEO filename generator. 100% client-side — images never leave your browser.",
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
    title: `${APP_NAME} — Free Image Optimizer & AI Rename`,
    description:
      "Compress, convert to WebP, and AI-rename images in seconds. Free forever.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — Free Image Optimizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Free Image Optimizer & AI Rename`,
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Analytics />
      </body>
    </html>
  );
}
