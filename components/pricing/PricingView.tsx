"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  IconCompress,
  IconWebP,
  IconPngToJpg,
  IconWebpToJpg,
  IconWebpToPng,
  IconSvgToPng,
  IconGifToMp4,
  IconIcoGenerator,
  IconPdfMerge,
  IconColorPicker,
  IconAIRename,
  IconEXIF,
  IconFilmLab,
  IconStampIt,
  IconCropRatio,
  IconTwinHunt,
  IconGeoSort,
  IconTravelMap,
  IconResizePack,
  IconCull,
  IconHEIC,
  IconRemoveBg,
  IconUpscale,
  IconPassportPhoto,
  IconJpgToPdf,
  IconJxl,
  IconUnrar,
  IconOpen7z,
  IconPdfCompress,
  IconPdfRotate,
  IconPdfUnlock,
  IconPdfPageNumbers,
  IconPdfProtect,
  IconRotateImage,
  IconFlipImage,
  IconAddBorder,
  IconRoundImage,
  IconAddText,
  IconImageToBase64,
  IconCollageMaker,
  IconRemovePdfPages,
  IconPdfWatermark,
  IconPdfSign,
  IconPdfOrganize,
  IconCropPdf,
  IconFlattenPdf,
  IconTxtToPdf,
  IconRarToZip,
  IconSevenZToZip,
  IconTarToZip,
  IconMinecraftExtractor,
  IconApkExtractor,
  IconIpaExtractor,
  IconIsoExtractor,
  IconBarcodeGenerator,
  IconQrCodeGenerator,
  IconQrCodeReader,
  IconBarcodeReader,
  IconHashGenerator,
  IconUrlEncodeDecode,
  IconPasswordGenerator,
  IconAiLabel,
  IconAvifToJpg,
  IconConvertToAvif,
  IconAiLabelVideo,
  IconJsonFormatter,
} from "@/components/ui/ToolCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CheckoutButton from "@/components/ui/CheckoutButton";
import MetaAddToWishlist from "@/components/tracking/MetaAddToWishlist";
import dynamic from "next/dynamic";
import { useFoundingStatus, applyFoundingDiscount } from "@/lib/hooks/useFoundingStatus";
import { TOOL_COUNT } from "@/lib/constants";

const FoundingSpotsCounter = dynamic(() => import("@/components/ui/FoundingSpotsCounter"), { ssr: false });
import { Download, Zap, FileStack, Package, Sparkles, MonitorDown, Ban, Headphones, Clock } from "lucide-react";

// ─── Tool grid data ────────────────────────────────────────────────────────────

const toolGrid = [
  { Icon: IconCompress,  name: "Compress",   accent: "#6366F1" },
  { Icon: IconWebP,      name: "WebP",        accent: "#10B981" },
  { Icon: IconPngToJpg,  name: "PNG to JPG",  accent: "#6366F1" },
  { Icon: IconWebpToJpg, name: "WebP to JPG", accent: "#10B981" },
  { Icon: IconWebpToPng, name: "WebP to PNG", accent: "#8B5CF6" },
  { Icon: IconSvgToPng,  name: "SVG to PNG",  accent: "#F97316" },
  { Icon: IconGifToMp4,  name: "GIF to MP4",  accent: "#EC4899" },
  { Icon: IconIcoGenerator, name: "Favicon",  accent: "#0EA5E9" },
  { Icon: IconPdfMerge,  name: "Merge PDF",   accent: "#DC2626" },
  { Icon: IconColorPicker, name: "Color Picker", accent: "#A855F7" },
  { Icon: IconAIRename,  name: "AI Rename",   accent: "#8B5CF6" },
  { Icon: IconEXIF,      name: "EXIF Viewer", accent: "#EF4444" },
  { Icon: IconFilmLab,   name: "Film Filters",accent: "#F59E0B" },
  { Icon: IconStampIt,   name: "Watermark",   accent: "#06B6D4" },
  { Icon: IconCropRatio, name: "Crop & Ratio",accent: "#EC4899" },
  { Icon: IconTwinHunt,  name: "Find Duplicates", accent: "#F97316" },
  { Icon: IconGeoSort,   name: "Sort by Location", accent: "#22C55E" },
  { Icon: IconTravelMap, name: "Photo Map",   accent: "#3B82F6" },
  { Icon: IconResizePack,name: "Batch Resize",accent: "#14B8A6" },
  { Icon: IconCull,      name: "Photo Cull",  accent: "#F43F5E" },
  { Icon: IconHEIC,      name: "HEIC",        accent: "#6366F1" },
  { Icon: IconRemoveBg,  name: "Clean BG",    accent: "#EC4899" },
  { Icon: IconUpscale,   name: "Upscale",     accent: "#8B5CF6" },
  { Icon: IconPassportPhoto, name: "Passport", accent: "#3B82F6" },
  { Icon: IconAIRename,     name: "OCR",       accent: "#F59E0B" },
  { Icon: IconJpgToPdf,     name: "JPG to PDF", accent: "#DC2626" },
  { Icon: IconJxl,          name: "JXL",        accent: "#F59E0B" },
  { Icon: IconUnrar,        name: "Open RAR",   accent: "#0EA5E9" },
  { Icon: IconOpen7z,       name: "Open 7z",    accent: "#8B5CF6" },
  { Icon: IconPdfCompress,  name: "Compress PDF", accent: "#EF4444" },
  { Icon: IconPdfRotate,   name: "Rotate PDF",   accent: "#EF4444" },
  { Icon: IconPdfUnlock,   name: "Unlock PDF",   accent: "#EF4444" },
  { Icon: IconPdfPageNumbers, name: "PDF Page Numbers", accent: "#EF4444" },
  { Icon: IconPdfProtect,     name: "Protect PDF",      accent: "#EF4444" },
  { Icon: IconRotateImage,   name: "Rotate Image",     accent: "#0EA5E9" },
  { Icon: IconFlipImage,     name: "Flip Image",       accent: "#0EA5E9" },
  { Icon: IconAddBorder,     name: "Add Border",       accent: "#0EA5E9" },
  { Icon: IconRoundImage,   name: "Round Image",      accent: "#0EA5E9" },
  { Icon: IconAddText,        name: "Add Text",         accent: "#0EA5E9" },
  { Icon: IconImageToBase64,  name: "Image to Base64",  accent: "#6366F1" },
  { Icon: IconCollageMaker,   name: "Collage Maker",    accent: "#0EA5E9" },
  { Icon: IconRemovePdfPages, name: "Delete PDF Pages", accent: "#EF4444" },
  { Icon: IconPdfWatermark,  name: "Watermark PDF",    accent: "#EF4444" },
  { Icon: IconPdfSign,       name: "Sign PDF",         accent: "#EF4444" },
  { Icon: IconPdfOrganize,   name: "Organize PDF",     accent: "#EF4444" },
  { Icon: IconCropPdf,       name: "Crop PDF",         accent: "#EF4444" },
  { Icon: IconFlattenPdf,    name: "Flatten PDF",      accent: "#EF4444" },
  { Icon: IconTxtToPdf,      name: "TXT to PDF",       accent: "#EF4444" },
  { Icon: IconRarToZip,             name: "RAR to ZIP",           accent: "#0EA5E9" },
  { Icon: IconSevenZToZip,          name: "7Z to ZIP",            accent: "#0EA5E9" },
  { Icon: IconTarToZip,             name: "TAR to ZIP",           accent: "#0EA5E9" },
  { Icon: IconMinecraftExtractor,   name: "Minecraft Extractor",  accent: "#0EA5E9" },
  { Icon: IconApkExtractor,         name: "APK Extractor",         accent: "#0EA5E9" },
  { Icon: IconIpaExtractor,         name: "IPA Extractor",         accent: "#0EA5E9" },
  { Icon: IconIsoExtractor,         name: "ISO Extractor",         accent: "#0EA5E9" },
  { Icon: IconBarcodeGenerator,     name: "Barcode Generator",      accent: "#6366F1" },
  { Icon: IconQrCodeGenerator,      name: "QR Code Generator",     accent: "#6366F1" },
  { Icon: IconQrCodeReader,         name: "QR Code Reader",         accent: "#6366F1" },
  { Icon: IconBarcodeReader,        name: "Barcode Reader",         accent: "#6366F1" },
  { Icon: IconHashGenerator,        name: "Hash Generator",         accent: "#6366F1" },
  { Icon: IconUrlEncodeDecode,      name: "URL Encoder / Decoder",  accent: "#6366F1" },
  { Icon: IconPasswordGenerator,    name: "Password Generator",     accent: "#6366F1" },
  { Icon: IconAiLabel,              name: "Made with AI Label",     accent: "#6366F1" },
  { Icon: IconAvifToJpg,           name: "AVIF to JPG",            accent: "#6366F1" },
  { Icon: IconConvertToAvif,      name: "Convert to AVIF",        accent: "#6366F1" },
  { Icon: IconAiLabelVideo,       name: "AI Label for Video",      accent: "#6366F1" },
  { Icon: IconJsonFormatter,      name: "JSON Formatter",          accent: "#6366F1" },
] as const;

// ─── Day Pass checkout button ──────────────────────────────────────────────────

function DayPassButton({ isIt, pathname }: { isIt: boolean; pathname: string }) {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/day-pass", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: pathname }),
      });
      const data = (await res.json()) as { url?: string; error?: string; code?: string };
      if (data.url) {
        window.location.href = data.url;
      } else if (data.code === "UNAUTHORIZED") {
        window.location.href = `/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`;
      } else if (data.code === "DAY_PASS_ALREADY_ACTIVE") {
        window.location.href = "/dashboard?daypass=active";
      } else {
        alert(
          data.error ??
            (isIt
              ? "Impossibile avviare il checkout. Riprova."
              : "Could not start checkout. Please try again.")
        );
      }
    } catch {
      alert(isIt ? "Errore di rete. Riprova." : "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-md bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-60"
      aria-label={isIt ? "Acquista Day Pass per €2,99" : "Buy Day Pass for $2.99"}
    >
      {loading
        ? (isIt ? "Reindirizzamento…" : "Redirecting…")
        : (isIt ? "Acquista Day Pass, €2,99" : "Get Day Pass — $2.99")}
    </button>
  );
}

// ─── Payment banners ───────────────────────────────────────────────────────────

function PaymentBanners({ isIt }: { isIt: boolean }) {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const canceled = searchParams.get("canceled") === "true";

  useEffect(() => {
    if (!success) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    // Use session-based event ID for deduplication with server-side CAPI
    const subEventId = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    if (typeof w.fbq === "function") w.fbq("track", "Subscribe", { value: 9.00, currency: "USD" }, { eventID: subEventId });
    if (typeof w.gtag === "function") w.gtag("event", "conversion", { send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL, value: 9.00, currency: "USD" });
  }, [success]);

  if (!success && !canceled) return null;
  return (
    <>
      {success && (
        <div className="mb-8 flex items-start gap-3 rounded-md border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 px-4 py-3 text-sm text-green-800 dark:text-green-400">
          <span className="shrink-0 text-base leading-5">🎉</span>
          <span>
            {isIt
              ? "Benvenuto in Pro! Il tuo account è stato aggiornato."
              : "Welcome to Pro! Your account has been upgraded."}
          </span>
        </div>
      )}
      {canceled && (
        <div className="mb-8 flex items-start gap-3 rounded-md border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#252525] px-4 py-3 text-sm text-gray-600 dark:text-[#A3A3A3]">
          <span>
            {isIt
              ? "Pagamento annullato. Sei ancora sul piano gratuito."
              : "Payment canceled. You’re still on the free plan."}
          </span>
        </div>
      )}
    </>
  );
}

// ─── FAQ item ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {q}
        <span className="ml-2 text-[#A3A3A3] dark:text-[#737373] shrink-0 select-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 text-sm text-[#737373] dark:text-[#A3A3A3] border-t border-[#F5F5F5] dark:border-[#2A2A2A]">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Shared Pricing View ───────────────────────────────────────────────────────

export default function PricingView() {
  const rawPathname = usePathname();
  const pathname = rawPathname ?? "";
  const isIt = pathname.startsWith("/it");

  const [annual, setAnnual] = useState(false);
  const savePercent = Math.round((1 - 65 / (9 * 12)) * 100);

  // Founding deal — render discounted price when coupon is still available.
  const founding = useFoundingStatus();
  const isFounding = !!(
    founding &&
    founding.active &&
    founding.spotsLeft > 0 &&
    (founding.percentOff > 0 || founding.amountOff > 0)
  );

  // EUR base prices (cents): monthly €8.99 = 899, annual €64.99 = 6499
  const monthlyBaseCents = isIt ? 899 : 900;
  const annualBaseCents = isIt ? 6499 : 6500;
  const monthlyFinalCents = applyFoundingDiscount(monthlyBaseCents, founding);
  const annualFinalCents = applyFoundingDiscount(annualBaseCents, founding);

  // Format price string: EUR uses comma as decimal separator
  const fmtPrice = (cents: number) => {
    const str = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
    return isIt ? str.replace(".", ",") : str;
  };

  const monthlyFinal = fmtPrice(monthlyFinalCents);
  const annualFinal = fmtPrice(annualFinalCents);
  const curr = isIt ? "€" : "$";

  return (
    <div className="py-20 px-4 sm:px-6 bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <MetaAddToWishlist />
        <Suspense fallback={null}>
          <PaymentBanners isIt={isIt} />
        </Suspense>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-3">
            {isIt ? "Prezzi semplici. Nessuna sorpresa." : "Simple pricing. No surprises."}
          </h1>
          <p className="text-[#737373] dark:text-[#A3A3A3] max-w-lg mx-auto text-sm leading-relaxed">
            {isIt
              ? "Strumenti gratis per sempre. Pro per chi pubblica ogni giorno. Crediti quando ne hai bisogno."
              : "Free tools forever. Pro for daily workflows. Credits when you need more."}
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-7 p-1 bg-[#F5F5F5] dark:bg-[#252525] rounded-md border border-[#E5E5E5] dark:border-[#333]">
            <button
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-colors",
                !annual
                  ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm border border-[#E5E5E5] dark:border-[#444]"
                  : "text-[#737373] dark:text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3]"
              )}
              onClick={() => setAnnual(false)}
            >
              {isIt ? "Mensile" : "Monthly"}
            </button>
            <button
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2",
                annual
                  ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm border border-[#E5E5E5] dark:border-[#444]"
                  : "text-[#737373] dark:text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3]"
              )}
              onClick={() => setAnnual(true)}
            >
              {isIt ? "Annuale" : "Annual"}
              <Badge variant="success">
                {isIt ? `Risparmi ${savePercent}%` : `Save ${savePercent}%`}
              </Badge>
            </button>
          </div>
        </div>

        {/* ── Founding Member banner ──────────────────────────────────────── */}
        <div className="mb-8 border border-[#6366F1]/20 dark:border-[#6366F1]/15 rounded-lg px-5 py-4 bg-[#EEF2FF]/40 dark:bg-[#6366F1]/5 text-center">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
            {isIt ? "Offerta Founding Member" : "Founding Member Deal"}
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            {isIt ? (
              <>
                I primi 200 abbonati Pro bloccano{" "}
                <span className="font-semibold text-[#6366F1]">~€5/mese per sempre</span>.
                {" "}Chi arriva prima ottiene uno sconto permanente in segno di gratitudine.
              </>
            ) : (
              <>
                First 200 Pro subscribers lock in{" "}
                <span className="font-semibold text-[#6366F1]">~$5/month forever</span>.
                {" "}Early adopters get a permanent discount as a thank-you for believing early.
              </>
            )}
          </p>
          <FoundingSpotsCounter />
        </div>

        {/* ── Pricing cards ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          {/* Free card */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-7 bg-white dark:bg-[#1E1E1E] flex flex-col">
            <div className="mb-7">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#737373] mb-3">
                Free
              </h2>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
                  {curr}0
                </span>
                <span className="text-sm text-[#A3A3A3] dark:text-[#737373]">
                  / {isIt ? "per sempre" : "forever"}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-[#737373] dark:text-[#A3A3A3]">
                {isIt ? "Nessuna carta. Nessuna registrazione." : "No credit card. No signup."}
              </p>
            </div>

            <ul className="space-y-2.5 mb-8 flex-1">
              {(isIt
                ? [
                    { icon: Sparkles,   text: `Tutti i ${TOOL_COUNT} strumenti inclusi` },
                    { icon: FileStack,  text: "20 file per batch" },
                    { icon: Zap,        text: "10 rinominazioni AI / giorno" },
                    { icon: Zap,        text: "10 alt text AI / giorno" },
                    { icon: Package,    text: "Nessun download ZIP" },
                    { icon: Headphones, text: "Supporto community" },
                  ]
                : [
                    { icon: Sparkles,   text: `All ${TOOL_COUNT} tools included` },
                    { icon: FileStack,  text: "20 files per batch" },
                    { icon: Zap,        text: "10 AI renames / day" },
                    { icon: Zap,        text: "10 AI alt text / day" },
                    { icon: Package,    text: "No ZIP download" },
                    { icon: Headphones, text: "Community support" },
                  ]
              ).map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
                  <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#D4D4D4] dark:text-[#525252]" strokeWidth={1.5} />
                  {text}
                </li>
              ))}
            </ul>

            <a
              href={`/api/auth/signin?callbackUrl=${isIt ? "/it/prezzi" : "/pricing"}`}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              {isIt ? "Inizia gratis →" : "Start free →"}
            </a>
          </div>

          {/* Pro card */}
          <div className="relative border border-[#6366F1]/40 dark:border-[#6366F1]/30 rounded-xl p-7 bg-white dark:bg-[#1E1E1E] flex flex-col ring-1 ring-[#6366F1]/15 dark:ring-[#6366F1]/10">
            <div className="absolute -top-3 left-6">
              <Badge variant="black">
                {isFounding
                  ? (isIt ? "Prezzo Founding" : "Founding price")
                  : (isIt ? "Più popolare" : "Most popular")}
              </Badge>
            </div>

            <div className="mb-7">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-3">
                Pro
              </h2>
              <div className="flex items-baseline gap-1.5">
                {isFounding && (
                  <span className="text-2xl font-medium text-[#A3A3A3] line-through mr-1">
                    {curr}{annual ? (isIt ? "64,99" : "65") : (isIt ? "8,99" : "9")}
                  </span>
                )}
                <span className="text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
                  {curr}{annual ? annualFinal : monthlyFinal}
                </span>
                <span className="text-sm text-[#A3A3A3] dark:text-[#737373]">
                  {annual ? (isIt ? "/ anno" : "/ year") : (isIt ? "/ mese" : "/ month")}
                </span>
              </div>
              {isFounding ? (
                <p className="mt-1.5 text-sm text-[#16A34A] font-semibold">
                  {isIt
                    ? `${founding!.percentOff}% di sconto per sempre, non scade mai`
                    : `${founding!.percentOff}% off forever — never expires`}
                </p>
              ) : annual ? (
                <p className="mt-1.5 text-sm text-[#737373] dark:text-[#A3A3A3]">
                  {isIt
                    ? `Fatturato annualmente, risparmi ~${savePercent}% sul mensile`
                    : `Billed annually- save ~${savePercent}% vs monthly`}
                </p>
              ) : (
                <p className="mt-1.5 text-sm text-[#737373] dark:text-[#A3A3A3]">
                  {isIt
                    ? "Per chi fotografa e pubblica ogni giorno."
                    : "For photographers who publish."}
                </p>
              )}
            </div>

            <ul className="space-y-2.5 mb-8 flex-1">
              {(isIt
                ? [
                    { icon: Sparkles,   text: "Tutto di Free, in più:", bold: true },
                    { icon: Zap,        text: "200 crediti AI al giorno (1 credito = 1 rinominazione, 1 alt text o 1 azione AI)", bold: false },
                    { icon: FileStack,  text: "500 file per batch", bold: false },
                    { icon: FileStack,  text: "50 MB per file", bold: false },
                    { icon: Package,    text: "Download ZIP", bold: false },
                    { icon: Zap,        text: "Preset per flussi di lavoro AI", bold: false },
                    { icon: MonitorDown,text: "Installa come app desktop", bold: false },
                    { icon: Ban,        text: "Nessuna pubblicità, supporto prioritario", bold: false },
                  ]
                : [
                    { icon: Sparkles,   text: "Everything in Free, plus:", bold: true },
                    { icon: Zap,        text: "200 AI credits / day (1 credit = 1 rename, 1 alt text, or 1 AI action)", bold: false },
                    { icon: FileStack,  text: "500 files per batch", bold: false },
                    { icon: FileStack,  text: "50 MB per file", bold: false },
                    { icon: Package,    text: "ZIP download", bold: false },
                    { icon: Zap,        text: "AI Workflow Pipeline presets", bold: false },
                    { icon: MonitorDown,text: "Install as desktop app", bold: false },
                    { icon: Ban,        text: "No ads, priority support", bold: false },
                  ]
              ).map(({ icon: Icon, text, bold }) => (
                <li key={text} className="flex items-start gap-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
                  <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#6366F1]/60" strokeWidth={1.5} />
                  {bold ? (
                    <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{text}</span>
                  ) : (
                    text
                  )}
                </li>
              ))}
            </ul>

            <CheckoutButton size="md" className="w-full gap-1 mb-3" plan={annual ? "annual" : "monthly"}>
              {isIt ? "Inizia la prova gratuita" : "Start free trial"}
            </CheckoutButton>
            <p className="text-center text-xs text-[#A3A3A3] dark:text-[#737373]">
              {isIt
                ? "Rimborso entro 30 giorni · Disdici quando vuoi"
                : "30-day money-back · Cancel anytime"}
            </p>
          </div>

          {/* Day Pass card */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-7 bg-white dark:bg-[#1E1E1E] flex flex-col">
            <div className="mb-7">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#737373] mb-3">
                Day Pass
              </h2>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
                  {curr}{isIt ? "2,99" : "2.99"}
                </span>
                <span className="text-sm text-[#A3A3A3] dark:text-[#737373]">/ 24h</span>
              </div>
              <p className="mt-1.5 text-sm text-[#737373] dark:text-[#A3A3A3]">
                {isIt
                  ? "Ti serve solo per oggi? Nessun abbonamento."
                  : "Need it once? No subscription."}
              </p>
            </div>

            <ul className="space-y-2.5 mb-8 flex-1">
              {(isIt
                ? [
                    { icon: Clock,     text: "Accesso Pro completo per 24 ore" },
                    { icon: FileStack, text: "500 file per batch" },
                    { icon: Zap,       text: "200 crediti AI durante il pass" },
                    { icon: Package,   text: "Download ZIP incluso" },
                    { icon: Ban,       text: "Nessuna pubblicità mentre è attivo" },
                    { icon: Sparkles,  text: "Pagamento unico, nessun rinnovo" },
                  ]
                : [
                    { icon: Clock,     text: "Full Pro access for 24 hours" },
                    { icon: FileStack, text: "500 files per batch" },
                    { icon: Zap,       text: "200 AI credits during the pass" },
                    { icon: Package,   text: "ZIP download included" },
                    { icon: Ban,       text: "No ads while active" },
                    { icon: Sparkles,  text: "One-time payment, no renewal" },
                  ]
              ).map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
                  <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#D4D4D4] dark:text-[#525252]" strokeWidth={1.5} />
                  {text}
                </li>
              ))}
            </ul>

            <DayPassButton isIt={isIt} pathname={pathname} />
            <p className="text-center text-xs text-[#A3A3A3] dark:text-[#737373] mt-3">
              {isIt
                ? "L’accesso inizia subito dopo il pagamento"
                : "Access starts immediately after payment"}
            </p>
          </div>
        </div>

        {/* ── Desktop app note ───────────────────────────────────────────── */}
        <p className="flex items-center justify-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] mb-14 -mt-4">
          <Download className="h-3 w-3 shrink-0" strokeWidth={1.5} />
          {isIt
            ? "Tutti gli utenti registrati possono installare SammaPix come app desktop per un accesso più rapido."
            : "All registered users can install SammaPix as a desktop app for faster access."}
        </p>

        {/* ── Credits section ─────────────────────────────────────────────── */}
        <div className="mb-16 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <div className="mb-5">
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
              {isIt ? "Hai bisogno di più crediti AI?" : "Need more AI credits?"}
            </p>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
              {isIt
                ? "Acquista crediti. Usali quando vuoi. Non scadono mai."
                : "Buy credits. Use anytime. Never expire."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Starter */}
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#191919]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#737373] mb-2">
                Starter
              </p>
              <p className="text-xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-0.5">
                {isIt ? "€5,99" : "$5.99"}
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-1">
                {isIt ? "100 crediti" : "100 credits"}
              </p>
              <p className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-4">
                {isIt ? "€0,06 / credito" : "$0.06 / credit"}
              </p>
              <a
                href="/dashboard/credits"
                className="w-full inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
              >
                {isIt ? "Acquista" : "Buy"}
              </a>
            </div>

            {/* Standard — highlighted */}
            <div className="border-2 border-[#6366F1] rounded-lg p-4 bg-white dark:bg-[#191919] relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                <span className="inline-block bg-[#6366F1] text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  {isIt ? "Miglior valore" : "Best value"}
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-2">
                Standard
              </p>
              <p className="text-xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-0.5">
                {isIt ? "€11,99" : "$11.99"}
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-1">
                {isIt ? "500 crediti" : "500 credits"}
              </p>
              <p className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-4">
                {isIt ? "€0,024 / credito" : "$0.024 / credit"}
              </p>
              <a
                href="/dashboard/credits"
                className="w-full inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-md bg-[#6366F1] text-white hover:bg-[#4F46E5] transition-colors"
              >
                {isIt ? "Acquista" : "Buy"}
              </a>
            </div>

            {/* Mega */}
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#191919]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#737373] mb-2">
                Mega
              </p>
              <p className="text-xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-0.5">
                {isIt ? "€34,99" : "$34.99"}
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-1">
                {isIt ? "2.000 crediti" : "2,000 credits"}
              </p>
              <p className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-4">
                {isIt ? "€0,017 / credito" : "$0.017 / credit"}
              </p>
              <a
                href="/dashboard/credits"
                className="w-full inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
              >
                {isIt ? "Acquista" : "Buy"}
              </a>
            </div>
          </div>

          <p className="mt-4 text-xs text-[#A3A3A3] dark:text-[#737373]">
            {isIt
              ? "1 credito = 1 operazione AI (rinomina, alt text, organizza, categorizza o trascrivi). I crediti non scadono mai. Funzionano su qualsiasi piano."
              : "1 credit = 1 AI operation (rename, alt text, organize, categorize, or transcribe). Credits never expire. Works on any plan."}
          </p>
        </div>

        {/* ── All tools grid ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-1">
            {isIt
              ? "Tutti gli strumenti inclusi. Entrambi i piani."
              : "All tools included. Both plans."}
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#737373] text-center mb-8">
            {isIt
              ? "Gli utenti Pro ottengono accesso anticipato ai nuovi strumenti al lancio."
              : "Pro users get early access to new tools as they launch."}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1">
            {toolGrid.map(({ Icon, name, accent }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[#F5F5F5] dark:border-[#252525] hover:border-[#E5E5E5] dark:hover:border-[#2A2A2A] transition-colors"
              >
                <Icon accent={accent} />
                <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] text-center leading-tight">
                  {name}
                </span>
              </div>
            ))}
          </div>
          {/* Combo tools */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["AI Alt Text", "Transcribe", "Web Optimize", "Blog Ready", "AI Photo Sort", "Batch Rename"].map((name) => (
              <span
                key={name}
                className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] px-3 py-1.5 rounded-md border border-[#F5F5F5] dark:border-[#252525] bg-white dark:bg-[#191919]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* ── Pro unlocks strip ──────────────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-1">
            {isIt ? "Cosa sblocca Pro" : "What Pro unlocks"}
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#737373] text-center mb-8">
            {isIt
              ? "I miglioramenti al flusso di lavoro che contano davvero."
              : "The workflow upgrades that actually matter."}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E5] dark:divide-[#2A2A2A] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden">
            {(isIt
              ? [
                  { value: "Combo Tools",   unit: "Pipeline in più fasi",      sub: "Preset WebLift e BlogDrop" },
                  { value: "Batch Power",   unit: "500 file in una volta",         sub: "Intere sessioni foto in un solo batch" },
                  { value: "200 AI/giorno", unit: "Rinominazioni + alt text",      sub: "200 crediti AI al giorno, acquistane altri quando vuoi" },
                  { value: "Zero Ads",      unit: "Spazio di lavoro pulito",       sub: "Nessuna distrazione mentre lavori" },
                ]
              : [
                  { value: "Combo Tools", unit: "Multi-step pipelines",     sub: "WebLift, BlogDrop presets" },
                  { value: "Batch Power", unit: "500 files at once",        sub: "Full wedding shoots in one go" },
                  { value: "200 AI/day",  unit: "Renames + alt text",       sub: "200 AI credits daily, plus buy more anytime" },
                  { value: "Zero Ads",    unit: "Clean workspace",          sub: "No distractions while you work" },
                ]
            ).map(({ value, unit, sub }) => (
              <div
                key={unit}
                className="flex flex-col items-center text-center px-4 py-6 bg-white dark:bg-[#1E1E1E]"
              >
                <span className="text-lg font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                  {value}
                </span>
                <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mt-1">
                  {unit}
                </span>
                <span className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mt-2 leading-snug">
                  {sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Built for photographers who publish ────────────────────────── */}
        <div className="mb-16 max-w-2xl mx-auto border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            {isIt
              ? "Pensato per i fotografi che pubblicano"
              : "Built for photographers who publish"}
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-5">
            {isIt
              ? "SammaPix Pro è progettato per un flusso di lavoro preciso: scatta, ritocca, ottimizza, pubblica, senza dover passare da uno strumento all’altro. Che tu gestisca un blog fotografico, pubblichi su Instagram o curi un catalogo e-commerce, la pipeline AI si occupa delle parti ripetitive così tu puoi concentrarti sul lavoro."
              : "SammaPix Pro is designed for one specific workflow: shoot, edit, optimize, publish- without switching between five different tools. Whether you run a photography blog, post on Instagram, or manage an e-commerce catalog, the AI pipeline handles the tedious parts so you can focus on the work."}
          </p>
          <ul className="space-y-2.5">
            {(isIt
              ? [
                  "Comprimi e rinomina 500 foto in un solo batch",
                  "Nomi file SEO generati dall’AI, pronti per WordPress, Webflow o Shopify",
                  "Alt text generato automaticamente, copia e pubblica",
                  "100% nel browser, i tuoi file RAW non toccano mai un server",
                  "Usato da fotografi in oltre 40 paesi",
                ]
              : [
                  "Compress and rename 500 photos in a single batch",
                  "AI-generated SEO filenames ready for WordPress, Webflow, or Shopify",
                  "Alt text generated automatically- paste and publish",
                  "100% browser-based- your RAW files never touch a server",
                  "Trusted by photographers in 40+ countries",
                ]
            ).map((point) => (
              <li
                key={point}
                className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed pl-4 border-l border-[#E5E5E5] dark:border-[#333]"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Social proof ───────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <p className="text-xs text-[#A3A3A3] dark:text-[#737373]">
            {isIt
              ? "Usato da fotografi in oltre 40 paesi · 100% nel browser · Nessun dato condiviso"
              : "Trusted by photographers in 40+ countries · 100% browser-based · No data shared"}
          </p>
        </div>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6 text-center">
            {isIt ? "Domande frequenti" : "Common questions"}
          </h2>
          <div className="space-y-3">
            {isIt ? (
              <>
                <FaqItem
                  q="SammaPix è gratuito?"
                  a="Sì. Tutti gli strumenti sono gratuiti per sempre, senza bisogno di un account. Il piano gratuito non è una prova, non scade mai."
                />
                <FaqItem
                  q="Cosa sono i crediti?"
                  a="I crediti sono acquisti una tantum per gli strumenti AI. 1 credito = 1 azione AI (rinomina, alt text, organizza, categorizza o trascrivi). Non scadono mai e funzionano su qualsiasi piano, gratuito o Pro."
                />
                <FaqItem
                  q="Cosa include il piano Pro?"
                  a="€8,99/mese o €64,99/anno (risparmi il 40%): 200 crediti AI al giorno (rinominazioni + alt text), combo tool come WebLift e BlogDrop, batch fino a 500 file, download ZIP, nessuna pubblicità e supporto prioritario."
                />
                <FaqItem
                  q="Perché passare a Pro?"
                  a="Pro è per i fotografi con un flusso di pubblicazione quotidiano: batch da 500 file, 200 crediti AI al giorno (rinominazioni + alt text), download ZIP, combo tool come WebLift e BlogDrop e zero pubblicità. I crediti sono un’ottima opzione se hai bisogno di crediti AI extra solo di tanto in tanto, senza abbonamento."
                />
                <FaqItem
                  q="Devo creare un account?"
                  a="Non serve un account per la compressione, la conversione WebP, il ridimensionamento, la rimozione EXIF e altri strumenti nel browser. L’account è richiesto solo per AI Rename e la Pipeline AI per evitare abusi delle API."
                />
                <FaqItem
                  q="Le mie immagini vengono caricate su un server?"
                  a="No. Tutti gli strumenti principali elaborano le immagini interamente nel browser. Le immagini non lasciano mai il tuo dispositivo. AI Rename e la generazione di Alt Text inviano una miniatura a Google Gemini per l’analisi, i file in alta risoluzione rimangono in locale."
                />
                <FaqItem
                  q="Posso disdire in qualsiasi momento?"
                  a="Sì. Puoi disdire quando vuoi e manterrai l’accesso Pro fino alla fine del periodo di fatturazione. Nessuna domanda."
                />
              </>
            ) : (
              <>
                <FaqItem
                  q="Is SammaPix free?"
                  a="Yes. All tools are free forever with no account required. The free plan is not a trial- it never expires."
                />
                <FaqItem
                  q="What are credits?"
                  a="Credits are one-time purchases for AI tools. 1 credit = 1 AI action (rename, alt text, organize, categorize, or transcribe). They never expire and work on any plan - Free or Pro."
                />
                <FaqItem
                  q="What does Pro include?"
                  a="Pro ($9/month or $65/year — save 40%) unlocks 200 AI credits/day (renames + alt text), combo tools like WebLift and BlogDrop, batch processing up to 500 files, ZIP download, no ads, and priority support."
                />
                <FaqItem
                  q="Why upgrade to Pro?"
                  a="Pro is for photographers with a daily publishing workflow: 500-file batches, 200 AI credits/day (renames + alt text), ZIP download, combo tools like WebLift and BlogDrop, and zero ads. Credits are a great option if you only need extra AI credits occasionally- no subscription required."
                />
                <FaqItem
                  q="Do I need to create an account?"
                  a="No account needed for compression, WebP conversion, resizing, EXIF removal, and other browser-based tools. An account is only required for AI Rename and the AI Workflow Pipeline to prevent API abuse."
                />
                <FaqItem
                  q="Are my images uploaded to a server?"
                  a="No. All core tools process images entirely in your browser. Images never leave your device. AI Rename and Alt Text generation send a small thumbnail to Google Gemini for analysis- your full-resolution files stay local."
                />
                <FaqItem
                  q="Can I cancel at any time?"
                  a="Yes. Cancel anytime- you keep Pro access until the end of your billing period. No questions asked."
                />
              </>
            )}
          </div>
        </div>

        {/* Product + Offer JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "SammaPix Pro",
              "image": ["https://sammapix.com/og-image.png"],
              "description":
                "AI Workflow Pipeline for photographers- batch processing, AI rename, alt text generation, and zero ads.",
              "brand": { "@type": "Brand", "name": "SammaPix" },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Monthly",
                  "price": isIt ? "8.99" : "9",
                  "priceCurrency": isIt ? "EUR" : "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": isIt ? "https://sammapix.com/it/prezzi" : "https://sammapix.com/pricing",
                },
                {
                  "@type": "Offer",
                  "name": "Yearly",
                  "price": isIt ? "64.99" : "65",
                  "priceCurrency": isIt ? "EUR" : "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": isIt ? "https://sammapix.com/it/prezzi" : "https://sammapix.com/pricing",
                },
                {
                  "@type": "Offer",
                  "name": "Credits Starter",
                  "price": "5.99",
                  "priceCurrency": isIt ? "EUR" : "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": "https://sammapix.com/dashboard/credits",
                  "description": "100 AI operation credits. Never expire.",
                },
                {
                  "@type": "Offer",
                  "name": "Credits Standard",
                  "price": "11.99",
                  "priceCurrency": isIt ? "EUR" : "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": "https://sammapix.com/dashboard/credits",
                  "description": "500 AI operation credits. Never expire.",
                },
                {
                  "@type": "Offer",
                  "name": "Credits Mega",
                  "price": "34.99",
                  "priceCurrency": isIt ? "EUR" : "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": "https://sammapix.com/dashboard/credits",
                  "description": "2000 AI operation credits. Never expire.",
                },
              ],
            }),
          }}
        />

        {/* FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is SammaPix free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. All tools are free forever with no account required. The free plan is not a trial- it never expires.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are credits?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Credits are one-time purchases for AI tools. 1 credit = 1 AI action (rename, alt text, organize, categorize, or transcribe). They never expire and work on any plan - Free or Pro.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What does Pro include?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pro ($9/month or $65/year — save 40%) unlocks 200 AI credits/day (renames + alt text), the AI Workflow Pipeline with Blog, Instagram, and E-commerce presets, batch processing up to 500 files, ZIP download, no ads, and priority support.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why upgrade to Pro?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pro is for photographers with a daily publishing workflow: 500-file batches, 200 AI credits/day (renames + alt text), ZIP download, combo tools like WebLift and BlogDrop, and zero ads. Credits are a great option if you only need extra AI credits occasionally.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to create an account?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No account needed for compression, WebP conversion, resizing, EXIF removal, and other browser-based tools. An account is only required for AI-powered tools like AI Rename and AI Alt Text to prevent API abuse.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are my images uploaded to a server?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All core tools process images entirely in your browser. Images never leave your device. AI Rename and Alt Text generation send a small thumbnail to Google Gemini for analysis- your full-resolution files stay local.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I cancel at any time?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Cancel anytime- you keep Pro access until the end of your billing period. No questions asked.",
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </div>
  );
}
