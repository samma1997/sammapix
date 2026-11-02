"use client";

/**
 * DayPassExpressCheckout
 *
 * Renders an Express Checkout Element (Apple Pay / Google Pay one-tap) for the
 * Day Pass upsell. Uses the vanilla @stripe/stripe-js (v8) — NOT
 * @stripe/react-stripe-js, which is not installed.
 *
 * Behaviour:
 * - On mount, fetches a PaymentIntent client secret from
 *   /api/checkout/day-pass/intent.
 * - Loads Stripe.js, creates an Elements group with that client secret, mounts
 *   the expressCheckout element into a hidden container.
 * - On `ready`: if no payment methods are available (no Apple Pay / Google Pay
 *   wallet on this device), renders nothing so the existing redirect button
 *   remains the only option.
 * - On `confirm`: calls stripe.confirmPayment with redirect: 'if_required'.
 *   On success without redirect, calls onSuccess() so the modal closes and
 *   the user is routed to /dashboard?daypass=active.
 * - Fetch-fail / intent-error / any unexpected exception: renders nothing
 *   (silent fallback to the redirect button).
 * - Errors during confirmPayment: shows a small inline message without
 *   breaking the modal.
 */

import { useEffect, useRef, useState } from "react";
import {
  loadStripe,
  type Stripe,
  type StripeElements,
  type StripeExpressCheckoutElement,
} from "@stripe/stripe-js";

// ── Types ────────────────────────────────────────────────────────────────────

interface DayPassExpressCheckoutProps {
  source: string;
  variant?: "standard" | "video";
  onSuccess: () => void;
}

// ── Internal state machine ────────────────────────────────────────────────────

type Status =
  | "loading"   // fetching intent + loading Stripe.js
  | "ready"     // element mounted, wallets available
  | "hidden"    // no wallets available on this device
  | "error"     // fatal initialisation error (renders nothing)
  | "confirming" // confirmPayment in flight
  | "done";      // payment confirmed, onSuccess called

// ── Component ─────────────────────────────────────────────────────────────────

export default function DayPassExpressCheckout({
  source,
  variant = "standard",
  onSuccess,
}: DayPassExpressCheckoutProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [confirmError, setConfirmError] = useState<string | null>(null);

  // Refs to keep stable references across the effect closure.
  const stripeRef = useRef<Stripe | null>(null);
  const elementsRef = useRef<StripeElements | null>(null);
  const expressRef = useRef<StripeExpressCheckoutElement | null>(null);
  const clientSecretRef = useRef<string | null>(null);

  useEffect(() => {
    // Guard: abort if already initialised (strict-mode double-invoke).
    let aborted = false;

    async function init() {
      // 1. Fetch PaymentIntent client secret from the new intent endpoint.
      let clientSecret: string;
      let publishableKey: string;
      try {
        const res = await fetch("/api/checkout/day-pass/intent", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source, variant }),
        });
        if (!res.ok) {
          // 409 = day pass already active — surface silently, no error mount.
          if (res.status === 409) {
            onSuccess(); // already has access, close modal
          }
          setStatus("error");
          return;
        }
        const data = (await res.json()) as {
          clientSecret?: string;
          publishableKey?: string;
          error?: string;
          code?: string;
        };
        if (!data.clientSecret || !data.publishableKey) {
          setStatus("error");
          return;
        }
        clientSecret = data.clientSecret;
        publishableKey = data.publishableKey;
      } catch {
        // Network error — fail silently.
        setStatus("error");
        return;
      }

      if (aborted) return;
      clientSecretRef.current = clientSecret;

      // 2. Load Stripe.js.
      let stripe: Stripe | null;
      try {
        stripe = await loadStripe(publishableKey);
      } catch {
        setStatus("error");
        return;
      }
      if (!stripe || aborted) {
        setStatus("error");
        return;
      }
      stripeRef.current = stripe;

      // 3. Create Elements group with the PaymentIntent client secret.
      const elements = stripe.elements({ clientSecret });
      elementsRef.current = elements;

      // 4. Create the Express Checkout Element.
      //    - emailRequired: true ensures Stripe collects email from guest wallets
      //      so the webhook can resolve the email for the Day Pass grant.
      //    - buttonType: "buy" is the most honest label for a one-time purchase.
      //    - paymentMethods: only Apple Pay + Google Pay (no Link / PayPal / Klarna
      //      which would require redirect and break the in-modal flow).
      const expressElement = elements.create("expressCheckout", {
        emailRequired: true,
        buttonType: {
          applePay: "buy",
          googlePay: "buy",
        },
        paymentMethods: {
          applePay: "auto",
          googlePay: "auto",
          link: "never",
          paypal: "never",
          amazonPay: "never",
          klarna: "never",
        },
        buttonHeight: 44,
      });
      expressRef.current = expressElement;

      // 5. Listen to `ready` — hide if no wallets are available on this device.
      expressElement.on("ready", ({ availablePaymentMethods }) => {
        if (aborted) return;
        if (
          !availablePaymentMethods ||
          (!availablePaymentMethods.applePay &&
            !availablePaymentMethods.googlePay)
        ) {
          // No wallet available — render nothing, fallback to redirect button.
          setStatus("hidden");
        } else {
          setStatus("ready");
        }
      });

      // 6. Listen to `loaderror` — hide silently.
      expressElement.on("loaderror", () => {
        if (aborted) return;
        setStatus("error");
      });

      // 7. Listen to `click` — resolve with the payment amount so the native
      //    payment sheet shows the correct total.
      expressElement.on("click", ({ resolve }) => {
        const amount = variant === "video" ? 499 : 299;
        resolve({
          lineItems: [
            {
              name:
                variant === "video"
                  ? "SammaPix Video Day Pass (24h)"
                  : "SammaPix Day Pass (24h)",
              amount,
            },
          ],
        });
      });

      // 8. Listen to `confirm` — the buyer has authorised payment in their
      //    wallet. Call stripe.confirmPayment with redirect: 'if_required'.
      expressElement.on("confirm", async ({ paymentFailed }) => {
        if (aborted) return;
        setStatus("confirming");
        setConfirmError(null);

        const appUrl =
          process.env.NEXT_PUBLIC_APP_URL ||
          (typeof window !== "undefined" ? window.location.origin : "https://sammapix.com");
        const returnUrl = `${appUrl}/dashboard?daypass=active`;

        try {
          const result = await stripe!.confirmPayment({
            elements: elementsRef.current!,
            clientSecret: clientSecretRef.current!,
            confirmParams: { return_url: returnUrl },
            redirect: "if_required",
          });

          if (result.error) {
            // Communicate the failure back to the wallet sheet so it can show
            // an error message, then surface a human-readable error inline.
            paymentFailed({ reason: "fail" });
            setConfirmError(
              result.error.message ??
                "Payment failed. Please try again or use another method."
            );
            setStatus("ready");
            return;
          }

          // Payment succeeded without a redirect (wallet-native path).
          setStatus("done");
          onSuccess();
        } catch (err) {
          paymentFailed({ reason: "fail" });
          setConfirmError(
            err instanceof Error
              ? err.message
              : "An unexpected error occurred. Please try again."
          );
          setStatus("ready");
        }
      });

      // 9. Mount the element into the DOM container.
      if (mountRef.current && !aborted) {
        expressElement.mount(mountRef.current);
      }
    }

    init().catch(() => {
      if (!aborted) setStatus("error");
    });

    return () => {
      aborted = true;
      // Unmount to avoid DOM leaks on strict-mode double-invoke.
      try {
        expressRef.current?.unmount();
      } catch {
        // expressCheckout unmount can throw if the element was never mounted.
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, variant]);

  // ── Render ──────────────────────────────────────────────────────────────────

  // Don't take up any space if wallets aren't available or init failed.
  if (status === "hidden" || status === "error" || status === "done") {
    return null;
  }

  return (
    <div className="w-full mb-2">
      {/* The Express Checkout Element mounts here. Stripe.js controls the
          rendering — it injects the Apple Pay / Google Pay buttons into this
          div via an iframe. Height is driven by buttonHeight (44px) in the
          element options above plus Stripe's internal padding. */}
      <div
        ref={mountRef}
        // Minimum height prevents layout shift while the element loads.
        // Stripe's iframe sits inside so the outer div is 100% width.
        style={{ minHeight: status === "loading" ? "44px" : undefined }}
        className={status === "loading" ? "animate-pulse rounded-md bg-[#F5F5F5] dark:bg-[#2A2A2A]" : ""}
        aria-hidden={status === "loading"}
      />

      {/* Inline error — only visible if confirmPayment returned an error */}
      {confirmError && (
        <p className="mt-1 text-center text-[11px] text-red-500 dark:text-red-400 leading-tight">
          {confirmError}
        </p>
      )}
    </div>
  );
}
