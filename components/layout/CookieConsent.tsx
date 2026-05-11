"use client";

import { useState, useEffect, useCallback } from "react";
import { getConsent, setConsent, type ConsentState } from "@/lib/consent";

// Read env vars at module level (baked in at build time)
const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim();
const GOOGLE_ADS_ID = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "").trim();
const GA4_ID = (process.env.NEXT_PUBLIC_GA4_ID ?? "").trim();
const ADSENSE_PUB_ID = (process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "").trim();
const CLARITY_PROJECT_ID = (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "").trim();
// Cloudflare Google tag gateway: serve gtag.js + collect from first-party path
// (bypass ad-blockers). When set, gtag loads via /<path>/gtag/js + transport_url.
const TAG_GATEWAY_PATH = (process.env.NEXT_PUBLIC_TAG_GATEWAY_PATH ?? "").trim();

/**
 * Defer script injection to idle time so tracking scripts never compete
 * with LCP resources on the main thread.
 */
function deferToIdle(fn: () => void): void {
  if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(fn, { timeout: 3000 });
  } else {
    setTimeout(fn, 2000);
  }
}

function loadScript(src: string): void {
  deferToIdle(() => {
    const el = document.createElement("script");
    el.src = src;
    el.async = true;
    document.head.appendChild(el);
  });
}

function loadInlineScript(code: string): void {
  deferToIdle(() => {
    const el = document.createElement("script");
    el.textContent = code;
    document.head.appendChild(el);
  });
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

  const gatewayPath = TAG_GATEWAY_PATH.replace(/\/+$/, "");
  const loaderUrl = gatewayPath
    ? gatewayPath + "/gtag/js?id=" + primaryId
    : "https://www.googletagmanager.com/gtag/js?id=" + primaryId;
  loadScript(loaderUrl);

  let configLines = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());";
  const transportUrl = gatewayPath ? location.origin + gatewayPath : "";
  const cfgOpts = transportUrl ? ",{transport_url:'" + transportUrl + "',first_party_collection:true}" : "";
  if (adsId) configLines += "gtag('config','" + adsId + "'" + cfgOpts + ");";
  if (ga4Id) configLines += "gtag('config','" + ga4Id + "'" + cfgOpts + ");";

  loadInlineScript(configLines);
}

function initAdSense(pubId: string): void {
  if (document.querySelector("script[src*='adsbygoogle']")) return;
  deferToIdle(() => {
    const el = document.createElement("script");
    el.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + pubId;
    el.async = true;
    el.crossOrigin = "anonymous";
    document.head.appendChild(el);
  });
}

function initClarity(projectId: string): void {
  // Microsoft Clarity · heatmap + session recording.
  // Usiamo lo snippet ufficiale Microsoft (script tag injection) invece del
  // package npm @microsoft/clarity: il dynamic import in build production
  // fallisce silenziosamente in alcuni casi e la dashboard non riceve dati.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).clarity) return;
  loadInlineScript(
    "(function(c,l,a,r,i,t,y){" +
    "c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};" +
    "t=l.createElement(r);t.async=1;t.src=\"https://www.clarity.ms/tag/\"+i;" +
    "y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);" +
    "})(window,document,\"clarity\",\"script\",\"" + projectId + "\");"
  );
}

export default function CookieConsent() {
  const [consent, setConsentState] = useState<ConsentState>("pending");
  const [mounted, setMounted] = useState(false);

  const loadAllTracking = useCallback(() => {
    if (typeof window === "undefined") return;
    if (META_PIXEL_ID) initMetaPixel(META_PIXEL_ID);
    if (GOOGLE_ADS_ID || GA4_ID) initGtag(GOOGLE_ADS_ID, GA4_ID);
    if (ADSENSE_PUB_ID) initAdSense(ADSENSE_PUB_ID);
    if (CLARITY_PROJECT_ID) initClarity(CLARITY_PROJECT_ID);
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
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 rounded-xl border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Cookie preferences</p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            We use cookies for analytics and advertising to improve your experience.{" "}
            <a href="/privacy#cookies" className="underline hover:text-[#6366F1]">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReject}
            className="flex-1 rounded-lg border border-[#E5E5E5] dark:border-[#444] bg-white dark:bg-[#252525] px-4 py-2.5 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#333] transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 rounded-lg bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5558E6] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
