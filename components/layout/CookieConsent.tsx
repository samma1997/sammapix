"use client";

import { useState, useEffect, useCallback } from "react";
import { getConsent, setConsent, type ConsentState } from "@/lib/consent";

// Read env vars at module level (baked in at build time)
const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim();
const GOOGLE_ADS_ID = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "").trim();
const GA4_ID = (process.env.NEXT_PUBLIC_GA4_ID ?? "").trim();
const ADSENSE_PUB_ID = (process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "").trim();

function loadScript(src: string): void {
  const el = document.createElement("script");
  el.src = src;
  el.async = true;
  document.head.appendChild(el);
}

function loadInlineScript(code: string): void {
  const el = document.createElement("script");
  el.textContent = code;
  document.head.appendChild(el);
}

function initMetaPixel(pixelId: string): void {
  if ((window as any).fbq) return;
  // Load fbevents.js first
  loadScript("https://connect.facebook.net/en_US/fbevents.js");
  // Init pixel via inline script
  loadInlineScript(
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
    "n.callMethod.apply(n,arguments):n.queue.push(arguments)};" +
    "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';" +
    "n.queue=[]}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');" +
    "fbq('init','" + pixelId + "');" +
    "fbq('track','PageView');"
  );
}

function initGtag(adsId: string, ga4Id: string): void {
  if ((window as any).gtag) return;
  const primaryId = adsId || ga4Id;
  if (!primaryId) return;

  loadScript("https://www.googletagmanager.com/gtag/js?id=" + primaryId);

  let configLines = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());";
  if (adsId) configLines += "gtag('config','" + adsId + "');";
  if (ga4Id) configLines += "gtag('config','" + ga4Id + "');";

  loadInlineScript(configLines);
}

function initAdSense(pubId: string): void {
  if (document.querySelector("script[src*='adsbygoogle']")) return;
  const el = document.createElement("script");
  el.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + pubId;
  el.async = true;
  el.crossOrigin = "anonymous";
  document.head.appendChild(el);
}

export default function CookieConsent() {
  const [consent, setConsentState] = useState<ConsentState>("pending");
  const [mounted, setMounted] = useState(false);

  const loadAllTracking = useCallback(() => {
    if (typeof window === "undefined") return;
    if (META_PIXEL_ID) initMetaPixel(META_PIXEL_ID);
    if (GOOGLE_ADS_ID || GA4_ID) initGtag(GOOGLE_ADS_ID, GA4_ID);
    if (ADSENSE_PUB_ID) initAdSense(ADSENSE_PUB_ID);
  }, []);

  useEffect(() => {
    setMounted(true);
    const saved = getConsent();
    setConsentState(saved);
    if (saved === "accepted") loadAllTracking();
  }, [loadAllTracking]);

  const handleAccept = () => {
    setConsent("accepted");
    setConsentState("accepted");
    loadAllTracking();
  };

  const handleReject = () => {
    setConsent("rejected");
    setConsentState("rejected");
  };

  if (!mounted || consent !== "pending") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] px-4 py-4 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          We use cookies for analytics and advertising. Essential cookies (authentication) are always active.{" "}
          <a href="/privacy#cookies" className="underline hover:text-[#171717] dark:hover:text-[#E5E5E5]">
            Learn more
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleReject}
            className="rounded-md border border-[#E5E5E5] dark:border-[#444] bg-white dark:bg-[#252525] px-4 py-2 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#333] transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="rounded-md bg-[#171717] dark:bg-[#E5E5E5] px-4 py-2 text-sm font-medium text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
