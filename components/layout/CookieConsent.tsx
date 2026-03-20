"use client";

import { useState, useEffect, useCallback } from "react";
import { getConsent, setConsent, type ConsentState } from "@/lib/consent";

/**
 * GDPR-compliant cookie consent banner + conditional tracking script loader.
 * - Shows banner if consent is "pending"
 * - Loads Meta Pixel, Google Ads, GA4, and AdSense ONLY after "accepted"
 * - Never loads tracking scripts if "rejected"
 */
export default function CookieConsent() {
  const [consent, setConsentState] = useState<ConsentState>("pending");
  const [mounted, setMounted] = useState(false);

  const loadTrackingScripts = useCallback(() => {
    if (typeof window === "undefined") return;

    const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
    const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
    const adsensePubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

    // Meta Pixel
    if (metaPixelId && !(window as any).fbq) {
      const script = document.createElement("script");
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${metaPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }

    // Google Ads + GA4
    if (googleAdsId && !(window as any).gtag) {
      // Load gtag.js
      const gtagScript = document.createElement("script");
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);

      // Configure gtag
      const configScript = document.createElement("script");
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAdsId}');
        ${ga4Id ? `gtag('config', '${ga4Id}');` : ""}
      `;
      document.head.appendChild(configScript);
    }

    // AdSense
    if (adsensePubId && !document.querySelector(`script[src*="adsbygoogle"]`)) {
      const adsScript = document.createElement("script");
      adsScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePubId}`;
      adsScript.async = true;
      adsScript.crossOrigin = "anonymous";
      document.head.appendChild(adsScript);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const currentConsent = getConsent();
    setConsentState(currentConsent);

    // If already accepted from a previous visit, load scripts immediately
    if (currentConsent === "accepted") {
      loadTrackingScripts();
    }
  }, [loadTrackingScripts]);

  const handleAccept = () => {
    setConsent("accepted");
    setConsentState("accepted");
    loadTrackingScripts();
  };

  const handleReject = () => {
    setConsent("rejected");
    setConsentState("rejected");
  };

  if (!mounted) return null;

  // Only show banner when pending
  if (consent !== "pending") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] px-4 py-4 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          We use cookies for analytics and advertising. Essential cookies (authentication) are always active.{" "}
          <a
            href="/privacy#cookies"
            className="underline hover:text-[#171717] dark:hover:text-[#E5E5E5]"
          >
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
