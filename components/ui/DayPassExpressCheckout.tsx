"use client";

/**
 * DayPassExpressCheckout
 *
 * Renders an Express Checkout Element (Apple Pay / Google Pay one-tap) for the
 * Day Pass upsell. Uses the vanilla @stripe/stripe-js (v8) — NOT
 * @stripe/react-stripe-js, which is not installed.
 *
 * Deferred-intent flow (Stripe documented pattern):
 * - On mount: loads Stripe.js with the public key (NO fetch to /intent, NO
 *   PaymentIntent created). Creates an Elements group in deferred mode
 *   (`mode:'payment'`, no clientSecret) so Stripe can probe wallet availability
 *   without any server round-trip.
 * - On `ready`: if no Apple Pay / Google Pay wallet is available on this device,
 *   renders nothing so the existing redirect button remains the only option.
 * - On `confirm` (user authorises in their wallet):
 *     1. elements.submit() — validates the deferred Elements state.
 *     2. POST /api/checkout/day-pass/intent — creates the PaymentIntent NOW,
 *        only for real buyers. Returns clientSecret.
 *     3. stripe.confirmPayment({ elements, clientSecret, redirect:'if_required' })
 *        — completes the payment.
 *   This guarantees ZERO PaymentIntents are created unless the user confirms.
 * - Fetch-fail / init error / no wallets → renders nothing (silent fallback to
 *   the redirect button).
 * - confirmPayment errors → inline message without breaking the modal.
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
  | "loading"    // loading Stripe.js + mounting element (no PI created yet)
  | "ready"      // element mounted, wallets available, waiting for user
  | "hidden"     // no wallets available on this device
  | "error"      // fatal initialisation error (renders nothing)
  | "confirming" // confirm flow in flight (submit → create PI → confirmPayment)
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

  // Refs to keep stable references accessible inside event-handler closures.
  const stripeRef = useRef<Stripe | null>(null);
  const elementsRef = useRef<StripeElements | null>(null);
  const expressRef = useRef<StripeExpressCheckoutElement | null>(null);

  useEffect(() => {
    // Guard: abort if the effect is cleaned up (strict-mode double-invoke or
    // prop change) before async work completes.
    let aborted = false;

    async function init() {
      // 1. Read the publishable key from the public env var.
      //    We must load Stripe BEFORE any PI is created, so we cannot depend
      //    on the intent endpoint returning the key (that endpoint is only
      //    called at confirm time, after the user authorises).
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!publishableKey) {
        setStatus("error");
        return;
      }

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

      // 3. Create Elements in DEFERRED mode — no clientSecret, no PaymentIntent.
      //    `paymentMethodCreation: 'manual'` tells Stripe we will create the PI
      //    ourselves (at confirm time) rather than letting Elements auto-create
      //    one. This is the documented deferred-intent pattern.
      const amount = variant === "video" ? 499 : 299;
      const elements = stripe.elements({
        mode: "payment",
        amount,
        currency: "usd",
        paymentMethodCreation: "manual",
      });
      elementsRef.current = elements;

      // 4. Create the Express Checkout Element.
      //    - emailRequired: Stripe collects email from guest wallets so the
      //      webhook can resolve the email for the Day Pass grant.
      //    - buttonType: "buy" is the honest label for a one-time purchase.
      //    - paymentMethods: Apple Pay + Google Pay only. Link / PayPal / Klarna
      //      require redirects and break the in-modal flow.
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
          // No wallet — render nothing, fallback to the redirect button.
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

      // 7. Listen to `click` — resolve with line items so the native payment
      //    sheet shows the correct total before the user authorises.
      expressElement.on("click", ({ resolve }) => {
        const lineAmount = variant === "video" ? 499 : 299;
        resolve({
          lineItems: [
            {
              name:
                variant === "video"
                  ? "SammaPix Video Day Pass (24h)"
                  : "SammaPix Day Pass (24h)",
              amount: lineAmount,
            },
          ],
        });
      });

      // 8. Listen to `confirm` — the buyer has authorised payment in their
      //    wallet. THIS is the only place a PaymentIntent is ever created.
      //
      //    Deferred flow (Stripe docs):
      //      a. elements.submit()   — validate Elements state before PI creation.
      //      b. POST /intent        — create the PaymentIntent on the server.
      //      c. stripe.confirmPayment({ elements, clientSecret, ... })
      //
      //    The same `elements` instance used to mount the Express Checkout
      //    Element must be passed to confirmPayment — elementsRef.current is
      //    that exact instance.
      expressElement.on("confirm", async ({ paymentFailed }) => {
        if (aborted) return;
        setStatus("confirming");
        setConfirmError(null);

        const currentStripe = stripeRef.current;
        const currentElements = elementsRef.current;
        if (!currentStripe || !currentElements) {
          paymentFailed({ reason: "fail" });
          setStatus("ready");
          return;
        }

        // a. Submit the Elements group to validate its state.
        const { error: submitError } = await currentElements.submit();
        if (submitError) {
          paymentFailed({ reason: "fail" });
          setConfirmError(
            submitError.message ??
              "Payment validation failed. Please try again."
          );
          setStatus("ready");
          return;
        }

        // b. Create the PaymentIntent NOW (first and only time).
        let clientSecret: string;
        try {
          const res = await fetch("/api/checkout/day-pass/intent", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ source, variant }),
          });

          if (!res.ok) {
            if (res.status === 409) {
              // Day pass already active — treat as success (idempotent).
              setStatus("done");
              onSuccess();
              return;
            }
            paymentFailed({ reason: "fail" });
            setConfirmError(
              "Could not start payment. Please try again or use another method."
            );
            setStatus("ready");
            return;
          }

          const data = (await res.json()) as {
            clientSecret?: string;
            publishableKey?: string;
            error?: string;
            code?: string;
          };
          if (!data.clientSecret) {
            paymentFailed({ reason: "fail" });
            setConfirmError(
              "Payment configuration error. Please try again."
            );
            setStatus("ready");
            return;
          }
          clientSecret = data.clientSecret;
        } catch {
          // Network error.
          paymentFailed({ reason: "fail" });
          setConfirmError(
            "Network error. Please check your connection and try again."
          );
          setStatus("ready");
          return;
        }

        // c. Confirm the payment using the same Elements instance.
        const appUrl =
          process.env.NEXT_PUBLIC_APP_URL ||
          (typeof window !== "undefined"
            ? window.location.origin
            : "https://sammapix.com");
        const returnUrl = `${appUrl}/dashboard?daypass=active`;

        try {
          const result = await currentStripe.confirmPayment({
            elements: currentElements,
            clientSecret,
            confirmParams: { return_url: returnUrl },
            redirect: "if_required",
          });

          if (result.error) {
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
        className={
          status === "loading"
            ? "animate-pulse rounded-md bg-[#F5F5F5] dark:bg-[#2A2A2A]"
            : ""
        }
        aria-hidden={status === "loading"}
      />

      {/* Inline error — only visible after a failed confirmPayment */}
      {confirmError && (
        <p className="mt-1 text-center text-[11px] text-red-500 dark:text-red-400 leading-tight">
          {confirmError}
        </p>
      )}
    </div>
  );
}
