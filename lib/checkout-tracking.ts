/**
 * Single point of truth for "user just kicked off a Stripe checkout".
 *
 * Fired from:
 * - components/ui/CheckoutButton.tsx       (Pricing / Try Pro CTAs)
 * - components/ui/ProUpsellModal.tsx       (in-tool soft paywall)
 * - components/dashboard/DashboardUpgrade.tsx  (manual click + auto-resume)
 *
 * Without this every checkout entry from the upsell modal or the
 * /dashboard/upgrade auto-start was invisible to GA4 — analytics looked
 * like "0 begin_checkout" while Stripe saw real sessions being created.
 */
export function fireBeginCheckoutEvent(plan: "monthly" | "annual"): string {
  const eventId = `ic_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  if (typeof window === "undefined") return eventId;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (typeof w.fbq === "function") {
    w.fbq("track", "InitiateCheckout", { plan }, { eventID: eventId });
  }
  if (typeof w.gtag === "function") {
    w.gtag("event", "begin_checkout", { plan });
  }
  return eventId;
}
