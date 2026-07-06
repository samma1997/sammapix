import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog — Guide per foto leggere e nitide | SammaPix",
  description:
    "Guide pratiche in italiano per comprimere, ridimensionare e convertire le foto. Tutto nel browser, gratis e senza upload.",
  alternates: {
    canonical: `${APP_URL}/it/blog`,
    languages: { it: `${APP_URL}/it/blog`, en: `${APP_URL}/blog`, "x-default": `${APP_URL}/blog` },
  },
  openGraph: {
    title: "Blog SammaPix in italiano",
    description:
      "Guide pratiche per comprimere, ridimensionare e convertire le foto. Gratis, nel browser, senza upload.",
    url: `${APP_URL}/it/blog`,
    type: "website",
    locale: "it_IT",
  },
};

// Articoli italiani (cresce nel tempo, uno per filiera)
const articles = [
  {
    slug: "come-ridimensionare-una-foto",
    title: "Come ridimensionare una foto senza deformarla",
    description:
      "Le misure giuste per Instagram, WhatsApp, Facebook e fototessera, in pixel o in centimetri. Nel browser, gratis e senza upload, da iPhone, Android o Mac.",
    date: "6 luglio 2026",
    tag: "Guida",
  },
  {
    slug: "come-convertire-heic-in-jpg",
    title: "Come convertire HEIC in JPG, gratis e senza programmi",
    description:
      "Le foto iPhone in HEIC non si aprono su Windows. Ecco come convertirle in JPG nel browser, gratis e senza upload, da Windows, Mac, iPhone o Android.",
    date: "6 luglio 2026",
    tag: "Guida",
  },
  {
    slug: "come-ridurre-peso-di-una-foto",
    title: "Come ridurre il peso di una foto senza perdere qualità",
    description:
      "Perché le foto pesano tanto e come alleggerirle nel browser, gratis e senza upload. Comprimi a 1 MB, 500 KB o 100 KB per email, WhatsApp e Instagram.",
    date: "6 luglio 2026",
    tag: "Guida",
  },
];

export default function ItBlogIndexPage() {
  return (
    <div className="bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <header className="mb-12">
          <span className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Blog
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
            Guide per foto leggere e nitide
          </h1>
          <p className="mt-4 text-base text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            Consigli pratici per comprimere, ridimensionare e convertire le
            foto. Tutto avviene nel tuo browser, gratis e senza caricare nulla.
          </p>
        </header>

        <div className="space-y-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/it/blog/${a.slug}`}
              className="block rounded-xl border border-gray-200 dark:border-[#2A2A2A] p-6 hover:border-gray-300 dark:hover:border-[#3A3A3A] transition-colors"
            >
              <div className="flex items-center gap-3 text-xs mb-3">
                <span className="font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {a.tag}
                </span>
                <span className="text-[#D4D4D4]">&middot;</span>
                <time className="text-[#A3A3A3]">{a.date}</time>
              </div>
              <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
                {a.title}
              </h2>
              <p className="mt-2 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                {a.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Leggi la guida
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
