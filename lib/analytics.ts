export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  // Google Analytics 4
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, params);
  }
  // Meta Pixel
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("trackCustom", name, params);
  }
}
