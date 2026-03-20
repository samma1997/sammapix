// Standard Meta Pixel events that should use fbq('track', ...) instead of trackCustom
const META_STANDARD_EVENTS = new Set([
  "AddPaymentInfo", "AddToCart", "AddToWishlist", "CompleteRegistration",
  "Contact", "CustomizeProduct", "Donate", "FindLocation",
  "InitiateCheckout", "Lead", "PageView", "Purchase", "Schedule",
  "Search", "StartTrial", "SubmitApplication", "Subscribe", "ViewContent",
]);

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
  }

  // Meta Pixel — use standard 'track' for known events, 'trackCustom' for others
  if (typeof w.fbq === "function") {
    if (META_STANDARD_EVENTS.has(name)) {
      w.fbq("track", name, params);
    } else {
      w.fbq("trackCustom", name, params);
    }
  }
}
