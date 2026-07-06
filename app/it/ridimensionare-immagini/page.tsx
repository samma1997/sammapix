import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";

const EN_URL = `${APP_URL}/resize`;
const IT_URL = `${APP_URL}/it/ridimensionare-immagini`;

export const metadata: Metadata = {
  title: "Ridimensiona Immagini per Social e E-commerce",
  description:
    "Ridimensiona foto online gratis per Instagram, WhatsApp, TikTok e tutti i social. Nessun upload, nessun software: funziona direttamente nel tuo browser.",
  keywords: [
    "ridimensionare immagini online",
    "ridimensionare foto per instagram",
    "ridimensionare immagine per whatsapp",
    "cambiare dimensione foto online gratis",
    "ridimensionare foto social",
    "dimensioni foto instagram",
    "resize immagini online",
  ],
  alternates: {
    canonical: IT_URL,
    languages: { en: EN_URL, it: IT_URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "Ridimensiona Immagini per Social e E-commerce | SammaPix",
    description:
      "Ridimensiona foto online gratis per Instagram, WhatsApp, TikTok e tutti i social. Nessun upload, tutto nel browser.",
    type: "website",
    url: IT_URL,
    siteName: APP_NAME,
    locale: "it_IT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ridimensiona immagini per ogni piattaforma" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridimensiona Immagini per Social e E-commerce | SammaPix",
    description:
      "Ridimensiona foto online gratis per Instagram, WhatsApp, TikTok e tutti i social. Tutto nel browser.",
  },
};

const PLATFORMS = [
  { slug: "instagram", label: "Instagram", description: "Adatta le tue foto al formato perfetto per il feed, le Stories e i Reels di Instagram." },
  { slug: "facebook", label: "Facebook", description: "Ridimensiona le immagini per post, copertine e annunci Facebook senza perdere un pixel di qualità." },
  { slug: "twitter", label: "Twitter / X", description: "Prepara immagini nelle dimensioni giuste per i post su Twitter / X e cattura l'attenzione al primo sguardo." },
  { slug: "linkedin", label: "LinkedIn", description: "Ottimizza foto e banner per il profilo LinkedIn e i tuoi contenuti professionali." },
  { slug: "youtube-thumbnail", label: "YouTube", description: "Crea miniature YouTube nitide e proporzionate che invogliano al clic fin dalla prima impressione." },
  { slug: "pinterest", label: "Pinterest", description: "Ridimensiona le foto al formato verticale ideale per i Pin di Pinterest e aumenta la visibilità organica." },
  { slug: "tiktok", label: "TikTok", description: "Adatta le immagini al formato verticale di TikTok per cover e contenuti sempre perfetti." },
  { slug: "discord", label: "Discord", description: "Ridimensiona avatar, banner e immagini per i tuoi server Discord nel formato corretto." },
  { slug: "slack", label: "Slack", description: "Prepara avatar e immagini condivise nelle dimensioni ideali per Slack, senza rallentare il canale." },
  { slug: "twitch", label: "Twitch", description: "Crea thumbnail, banner e avatar per il tuo canale Twitch ottimizzati e dal look professionale." },
  { slug: "telegram", label: "Telegram", description: "Ridimensiona le foto per gruppi, canali e profilo Telegram in pochi secondi, direttamente dal browser." },
  { slug: "threads", label: "Threads", description: "Prepara le immagini nelle dimensioni giuste per pubblicare su Threads senza ritagli inattesi." },
  { slug: "mastodon", label: "Mastodon", description: "Adatta foto e avatar al formato corretto per il tuo profilo Mastodon su qualsiasi istanza." },
  { slug: "snapchat", label: "Snapchat", description: "Ottimizza le immagini al formato verticale di Snapchat per Storie e Snap sempre a schermo pieno." },
  { slug: "whatsapp", label: "WhatsApp", description: "Ridimensiona le foto per WhatsApp mantenendo la qualità anche dopo la compressione automatica." },
  { slug: "email-header", label: "Header Email", description: "Crea header email leggeri e proporzionati, compatibili con tutti i principali client di posta." },
  { slug: "ebay", label: "eBay", description: "Prepara le foto dei tuoi prodotti eBay nelle dimensioni raccomandate dalla piattaforma per massimizzare la visibilità." },
  { slug: "amazon", label: "Amazon", description: "Ridimensiona le immagini prodotto per rispettare i requisiti Amazon e migliorare le conversioni in scheda." },
  { slug: "shopify-product", label: "Prodotto Shopify", description: "Ottimizza le foto prodotto per il tuo negozio Shopify, rapide da caricare e sempre nitide su ogni dispositivo." },
  { slug: "etsy-listing", label: "Inserzione Etsy", description: "Prepara le immagini delle inserzioni Etsy nelle proporzioni ideali per valorizzare i tuoi articoli fatti a mano." },
  { slug: "blog-header", label: "Header Blog", description: "Crea immagini header per il blog nelle dimensioni giuste per qualsiasi tema WordPress o CMS." },
  { slug: "passport", label: "Foto Tessera", description: "Ridimensiona la foto al formato tessera richiesto per documenti, candidature e moduli ufficiali online." },
  { slug: "visa", label: "Foto Visto", description: "Adatta la foto al formato esatto richiesto per le domande di visto, rispettando le specifiche di ogni paese." },
];

const EXPLORE = [
  { name: "Comprimi a dimensione", href: "/it/comprimi-a-dimensione" },
  { name: "Comprimi immagini", href: "/it/tools/comprimere-immagini" },
  { name: "Converti formato", href: "/convert" },
  { name: "Foto tessera", href: "/tools/passport-photo" },
];

export default function RidimensionareImmaginiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SammaPix", item: `${APP_URL}/it` },
          { "@type": "ListItem", position: 2, name: "Ridimensiona", item: IT_URL },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Ridimensiona immagini per ogni piattaforma",
        description:
          "Ridimensiona immagini per social, e-commerce e documenti, gratis e nel browser.",
        url: IT_URL,
        publisher: { "@type": "Organization", name: APP_NAME, url: APP_URL },
        mainEntity: {
          "@type": "ItemList",
          name: "Piattaforme",
          numberOfItems: PLATFORMS.length,
          itemListElement: PLATFORMS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Ridimensiona per ${p.label}`,
            url: `${APP_URL}/resize/${p.slug}`,
            description: p.description,
          })),
        },
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-10">
        <Link href="/it" className="hover:text-[#525252] transition-colors">
          {APP_NAME}
        </Link>
        <span>/</span>
        <span className="text-[#525252]">Ridimensiona</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Ridimensiona le foto per ogni piattaforma, gratis
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-10">
        Ogni social, ogni marketplace, ogni documento ha le sue dimensioni. Con SammaPix puoi
        ridimensionare le immagini direttamente nel browser, gratis e senza caricare nulla su server
        esterni.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PLATFORMS.map(({ slug, label, description }) => (
          <Link
            key={slug}
            href={`/resize/${slug}`}
            className="group p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#191919] hover:bg-[#FAFAFA] dark:hover:bg-[#1F1F1F] transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">{label}</p>
              <ArrowRight
                className="h-3.5 w-3.5 text-[#A3A3A3] group-hover:text-[#525252] dark:group-hover:text-[#A3A3A3] transition-colors"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-xs text-[#737373] leading-relaxed">{description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Esplora altro</h2>
        <div className="flex flex-wrap gap-2">
          {EXPLORE.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              {l.name} <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
