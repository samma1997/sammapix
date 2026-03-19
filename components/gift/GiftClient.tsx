"use client";

import React, { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Gift, Mail, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Constants ───────────────────────────────────────────────────────────────

const PLAN = {
  name: "Pro",
  monthlyPrice: 7,
  tagline: "For image enthusiasts",
};

const DURATIONS = [
  { months: 1, label: "1 month", price: 7 },
  { months: 3, label: "3 months", price: 21 },
  { months: 6, label: "6 months", price: 42 },
  { months: 12, label: "1 year", price: 60 },
] as const;

const ACCENT_COLORS = [
  { value: "#6366F1", label: "Indigo" },
  { value: "#EC4899", label: "Pink" },
  { value: "#10B981", label: "Green" },
  { value: "#F59E0B", label: "Amber" },
  { value: "#3B82F6", label: "Blue" },
  { value: "#EF4444", label: "Red" },
] as const;

type DeliveryMethod = "email" | "link";

// ─── Gift Card Preview ──────────────────────────────────────────────────────

function GiftCardPreview({
  color,
  recipientName,
  senderName,
  months,
  message,
}: {
  color: string;
  recipientName: string;
  senderName: string;
  months: number;
  message: string;
}) {
  const durationLabel = months === 12 ? "1 year" : `${months} month${months > 1 ? "s" : ""}`;

  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-lg"
      style={{ minHeight: 340 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${color}22 0%, ${color}44 40%, ${color}66 100%)`,
        }}
      />
      <div
        className="absolute top-0 right-0 h-40 w-40 rounded-full opacity-20 blur-3xl"
        style={{ background: color }}
      />
      <div
        className="absolute bottom-0 left-0 h-32 w-32 rounded-full opacity-15 blur-2xl"
        style={{ background: color }}
      />

      {/* Content */}
      <div className="relative flex h-full min-h-[340px] flex-col justify-between p-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5" style={{ color }} strokeWidth={1.5} />
          <span className="text-sm font-semibold tracking-tight text-[#171717] dark:text-white">
            SammaPix
          </span>
          <span
            className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
            style={{ background: color }}
          >
            Pro
          </span>
        </div>

        {/* Main text */}
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold tracking-tight text-[#171717] dark:text-white">
            {recipientName ? `A gift for ${recipientName}` : "A gift for you"}
          </h3>
          <p className="text-sm leading-relaxed text-[#525252] dark:text-[#A3A3A3]">
            {senderName || "Someone"} has gifted you{" "}
            <span className="font-medium text-[#171717] dark:text-white">
              {durationLabel}
            </span>{" "}
            of SammaPix Pro
          </p>
          {message && (
            <p className="mt-2 border-l-2 pl-3 text-sm italic text-[#737373] dark:text-[#A3A3A3]"
              style={{ borderColor: color }}
            >
              {message}
            </p>
          )}
        </div>

        {/* Footer */}
        <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">sammapix.com</p>
      </div>
    </div>
  );
}

// ─── Main Client Component ──────────────────────────────────────────────────

export default function GiftClient() {
  const { data: session } = useSession();

  // Form state
  const [selectedDuration, setSelectedDuration] = useState<number>(3);
  const [accentColor, setAccentColor] = useState<string>(ACCENT_COLORS[0].value);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("email");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState(session?.user?.name || "");
  const [giftMessage, setGiftMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill sender name when session loads
  React.useEffect(() => {
    if (session?.user?.name && !senderName) {
      setSenderName(session.user.name);
    }
  }, [session?.user?.name, senderName]);

  // Derived values
  const selectedPlan = DURATIONS.find((d) => d.months === selectedDuration);
  const totalPrice = selectedPlan?.price ?? 0;

  const canSubmit = useMemo(() => {
    if (deliveryMethod === "email") {
      return recipientName.trim() !== "" && recipientEmail.trim() !== "";
    }
    return true;
  }, [deliveryMethod, recipientName, recipientEmail]);

  async function handleSubmit() {
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/gift/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          months: selectedDuration,
          accentColor,
          deliveryMethod,
          recipientName: recipientName.trim() || undefined,
          recipientEmail: deliveryMethod === "email" ? recipientEmail.trim() : undefined,
          senderName: senderName.trim() || undefined,
          giftMessage: giftMessage.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Gift creation failed:", err);
      alert(err instanceof Error ? err.message : "Failed to create gift. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-1.5 text-sm text-[#525252] dark:border-[#2A2A2A] dark:bg-[#262626] dark:text-[#A3A3A3]">
          <Gift className="h-4 w-4" strokeWidth={1.5} />
          Gift a subscription
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#171717] dark:text-white sm:text-4xl">
          Give the gift of perfect images
        </h1>
        <p className="mt-3 text-base text-[#737373] dark:text-[#A3A3A3]">
          Send someone a SammaPix Pro subscription. They will love it.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col-reverse gap-10 lg:flex-row lg:gap-12">
        {/* ── Left column: Form (60%) ───────────────────────────────── */}
        <div className="w-full lg:w-[60%]">
          {/* Plan Selection */}
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3]">
              Plan
            </h2>
            <button
              type="button"
              className="w-full rounded-lg border-2 border-[#171717] bg-white p-5 text-left transition dark:border-white dark:bg-[#191919]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#171717] dark:border-white">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#171717] dark:bg-white" />
                  </div>
                  <div>
                    <span className="text-base font-semibold text-[#171717] dark:text-white">
                      {PLAN.name}
                    </span>
                    <span className="ml-2 text-sm text-[#737373] dark:text-[#A3A3A3]">
                      ${PLAN.monthlyPrice}/month
                    </span>
                  </div>
                </div>
                <span className="text-sm text-[#A3A3A3] dark:text-[#525252]">
                  {PLAN.tagline}
                </span>
              </div>
            </button>
          </section>

          {/* Duration Selection */}
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3]">
              Duration
            </h2>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => {
                const isActive = selectedDuration === d.months;
                return (
                  <button
                    key={d.months}
                    type="button"
                    onClick={() => setSelectedDuration(d.months)}
                    className={cn(
                      "rounded-lg border px-5 py-3 text-sm font-medium transition",
                      isActive
                        ? "border-[#171717] bg-[#171717] text-white dark:border-white dark:bg-white dark:text-[#171717]"
                        : "border-[#E5E5E5] bg-white text-[#525252] hover:border-[#D4D4D4] hover:bg-[#FAFAFA] dark:border-[#2A2A2A] dark:bg-[#191919] dark:text-[#A3A3A3] dark:hover:border-[#404040] dark:hover:bg-[#262626]"
                    )}
                  >
                    <span>{d.label}</span>
                    <span className={cn("ml-2", isActive ? "text-white/70 dark:text-[#171717]/60" : "text-[#A3A3A3] dark:text-[#525252]")}>
                      ${d.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Total */}
          <section className="mb-8 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-5 py-4 dark:border-[#2A2A2A] dark:bg-[#262626]">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-[#737373] dark:text-[#A3A3A3]">Total</span>
              <span className="text-2xl font-semibold tracking-tight text-[#171717] dark:text-white">
                ${totalPrice}.00
              </span>
            </div>
            {selectedDuration === 12 && (
              <p className="mt-1 text-right text-xs text-[#10B981]">
                Save $24 compared to monthly
              </p>
            )}
          </section>

          {/* Personalize */}
          <section className="mb-8">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3]">
              Customize your gift
            </h2>

            {/* Color picker */}
            <div className="mb-6">
              <label className="mb-2 block text-sm text-[#525252] dark:text-[#A3A3A3]">
                Card accent color
              </label>
              <div className="flex gap-3">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    aria-label={`Select ${c.label} color`}
                    onClick={() => setAccentColor(c.value)}
                    className={cn(
                      "relative h-9 w-9 rounded-full transition-transform hover:scale-110",
                      accentColor === c.value && "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#191919]"
                    )}
                    style={{
                      background: c.value,
                      ...(accentColor === c.value ? { ringColor: c.value } : {}),
                    }}
                  >
                    {accentColor === c.value && (
                      <Check className="absolute inset-0 m-auto h-4 w-4 text-white" strokeWidth={2.5} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery method toggle */}
            <div className="mb-6">
              <label className="mb-2 block text-sm text-[#525252] dark:text-[#A3A3A3]">
                Delivery method
              </label>
              <div className="inline-flex rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-1 dark:border-[#2A2A2A] dark:bg-[#262626]">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("email")}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition",
                    deliveryMethod === "email"
                      ? "bg-white text-[#171717] shadow-sm dark:bg-[#404040] dark:text-white"
                      : "text-[#737373] hover:text-[#525252] dark:text-[#525252] dark:hover:text-[#A3A3A3]"
                  )}
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  Send an email
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("link")}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition",
                    deliveryMethod === "link"
                      ? "bg-white text-[#171717] shadow-sm dark:bg-[#404040] dark:text-white"
                      : "text-[#737373] hover:text-[#525252] dark:text-[#525252] dark:hover:text-[#A3A3A3]"
                  )}
                >
                  <Link2 className="h-4 w-4" strokeWidth={1.5} />
                  Get a shareable link
                </button>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              {deliveryMethod === "email" ? (
                <>
                  <InputField
                    label="Recipient name"
                    value={recipientName}
                    onChange={setRecipientName}
                    placeholder="Their name"
                    required
                  />
                  <InputField
                    label="Recipient email"
                    value={recipientEmail}
                    onChange={setRecipientEmail}
                    placeholder="their@email.com"
                    type="email"
                    required
                  />
                  <InputField
                    label="Your name"
                    value={senderName}
                    onChange={setSenderName}
                    placeholder="Your name"
                  />
                  <TextareaField
                    label="Gift message"
                    value={giftMessage}
                    onChange={setGiftMessage}
                    placeholder="Write a personal message (optional)"
                    maxLength={200}
                  />
                </>
              ) : (
                <>
                  <InputField
                    label="Recipient name"
                    value={recipientName}
                    onChange={setRecipientName}
                    placeholder="Their name (optional)"
                  />
                  <InputField
                    label="Your name"
                    value={senderName}
                    onChange={setSenderName}
                    placeholder="Your name"
                  />
                  <TextareaField
                    label="Gift message"
                    value={giftMessage}
                    onChange={setGiftMessage}
                    placeholder="Write a personal message (optional)"
                    maxLength={200}
                  />
                </>
              )}
            </div>
          </section>

          {/* CTA */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-medium transition",
              canSubmit && !isSubmitting
                ? "bg-[#171717] text-white hover:bg-[#262626] active:bg-[#404040] dark:bg-white dark:text-[#171717] dark:hover:bg-[#E5E5E5]"
                : "cursor-not-allowed bg-[#E5E5E5] text-[#A3A3A3] dark:bg-[#2A2A2A] dark:text-[#525252]"
            )}
          >
            {isSubmitting ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Gift className="h-5 w-5" strokeWidth={1.5} />
            )}
            {isSubmitting ? "Creating gift..." : "Continue to payment"}
          </button>
        </div>

        {/* ── Right column: Preview (40%) ──────────────────────────── */}
        <div className="w-full lg:sticky lg:top-24 lg:w-[40%] lg:self-start">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3]">
            Preview
          </h2>
          <GiftCardPreview
            color={accentColor}
            recipientName={recipientName}
            senderName={senderName}
            months={selectedDuration}
            message={giftMessage}
          />
          <p className="mt-3 text-center text-xs text-[#A3A3A3] dark:text-[#525252]">
            This is how the gift card will look
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Reusable Field Components ──────────────────────────────────────────────

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-[#525252] dark:text-[#A3A3A3]">
        {label}
        {required && <span className="ml-0.5 text-[#EF4444]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-[#E5E5E5] bg-white px-3.5 py-2.5 text-sm text-[#171717] placeholder-[#A3A3A3] outline-none transition focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] dark:border-[#2A2A2A] dark:bg-[#191919] dark:text-white dark:placeholder-[#525252] dark:focus:border-[#6366F1]"
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  maxLength?: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="text-sm text-[#525252] dark:text-[#A3A3A3]">{label}</label>
        {maxLength && (
          <span className="text-xs text-[#A3A3A3] dark:text-[#525252]">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(maxLength ? e.target.value.slice(0, maxLength) : e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={3}
        className="w-full resize-none rounded-md border border-[#E5E5E5] bg-white px-3.5 py-2.5 text-sm text-[#171717] placeholder-[#A3A3A3] outline-none transition focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] dark:border-[#2A2A2A] dark:bg-[#191919] dark:text-white dark:placeholder-[#525252] dark:focus:border-[#6366F1]"
      />
    </div>
  );
}
