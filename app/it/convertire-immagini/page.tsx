import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";

const EN_URL = `${APP_URL}/convert`;
const IT_URL = `${APP_URL}/it/convertire-immagini`;

export const metadata: Metadata = {
  title: "Convertitore Immagini Online Gratis",
  description:
    "Converti HEIC, PNG, WebP, AVIF e decine di altri formati direttamente nel browser, senza caricare nulla su alcun server. Gratis su qualsiasi dispositivo.",
  keywords: [
    "convertire immagini online",
    "convertitore immagini gratis",
    "convertire heic in jpg",
    "convertire png in jpg",
    "convertire foto iphone in jpg",
    "convertire webp in jpg",
    "convertire immagini browser",
    "convertitore formato immagini",
  ],
  alternates: {
    canonical: IT_URL,
    languages: { en: EN_URL, it: IT_URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "Convertitore Immagini Online Gratis | SammaPix",
    description:
      "Converti HEIC, PNG, WebP, AVIF e decine di formati nel browser, senza upload. Gratis.",
    type: "website",
    url: IT_URL,
    siteName: APP_NAME,
    locale: "it_IT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Convertitore immagini online gratis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertitore Immagini Online Gratis | SammaPix",
    description:
      "Converti HEIC, PNG, WebP, AVIF e decine di formati nel browser, senza upload. Gratis.",
  },
};

const CONVERSIONS = [
  { pair: "heic-to-jpg", from: "HEIC", to: "JPG", description: "Trasforma le foto iPhone dal formato HEIC in JPG, compatibile con qualsiasi dispositivo e programma." },
  { pair: "heic-to-png", from: "HEIC", to: "PNG", description: "Converti le foto HEIC dell'iPhone in PNG senza perdita di qualità, ideale per l'editing professionale." },
  { pair: "png-to-webp", from: "PNG", to: "WebP", description: "Riduci il peso dei file PNG fino all'80% convertendoli in WebP, il formato ideale per il web." },
  { pair: "jpg-to-webp", from: "JPG", to: "WebP", description: "Ottieni file fino al 35% più leggeri convertendo i JPG in WebP, senza rinunciare alla qualità visiva." },
  { pair: "jpeg-to-webp", from: "JPEG", to: "WebP", description: "Converti i tuoi JPEG in WebP per accelerare il caricamento delle pagine e risparmiare banda." },
  { pair: "webp-to-jpg", from: "WebP", to: "JPG", description: "Converti le immagini WebP in JPG per renderle apribili con qualsiasi app o dispositivo." },
  { pair: "png-to-jpg", from: "PNG", to: "JPG", description: "Riduci il peso dei PNG tra il 60 e l'80% convertendoli in JPG, la scelta più comoda per condividere." },
  { pair: "gif-to-webp", from: "GIF", to: "WebP", description: "Converti GIF animate o statiche in WebP per file più leggeri che mantengono l'animazione." },
  { pair: "webp-to-png", from: "WebP", to: "PNG", description: "Converti le immagini WebP in PNG senza perdita di qualità, pronte per la stampa o l'editing." },
  { pair: "avif-to-jpg", from: "AVIF", to: "JPG", description: "Trasforma i file AVIF di nuova generazione in JPG, supportato da qualsiasi dispositivo e programma." },
  { pair: "tiff-to-jpg", from: "TIFF", to: "JPG", description: "Converti i pesanti file TIFF in JPG leggero, perfetto per inviare e condividere online." },
  { pair: "svg-to-png", from: "SVG", to: "PNG", description: "Trasforma la grafica vettoriale SVG in un'immagine PNG a pixel, pronta per ogni contesto d'uso." },
  { pair: "bmp-to-jpg", from: "BMP", to: "JPG", description: "Converti i vecchi file BMP in JPG compresso per ridurne drasticamente le dimensioni." },
  { pair: "jpg-to-png", from: "JPG", to: "PNG", description: "Converti le foto JPG in PNG senza perdita di qualità, ideale per l'editing e i progetti grafici." },
  { pair: "png-to-ico", from: "PNG", to: "ICO", description: "Trasforma una qualsiasi immagine PNG in un'icona ICO, pronta da usare come favicon sul sito." },
  { pair: "webp-to-gif", from: "WebP", to: "GIF", description: "Converti le immagini WebP in GIF, compatibile con tutti i browser e le applicazioni." },
  { pair: "raw-to-jpg", from: "RAW", to: "JPG", description: "Converti i file RAW della fotocamera (CR2, NEF, ARW) in JPG condivisibili e leggeri." },
  { pair: "tiff-to-png", from: "TIFF", to: "PNG", description: "Converti i file TIFF in PNG senza perdita di qualità, un formato compatto e adatto al web." },
  { pair: "bmp-to-png", from: "BMP", to: "PNG", description: "Trasforma i file BMP non compressi in PNG lossless, con dimensioni molto più contenute." },
  { pair: "gif-to-jpg", from: "GIF", to: "JPG", description: "Converti le immagini GIF statiche in JPG per una resa cromatica superiore e file più compatti." },
  { pair: "avif-to-png", from: "AVIF", to: "PNG", description: "Trasforma i file AVIF di nuova generazione in PNG modificabile e senza perdita di qualità." },
  { pair: "heic-to-webp", from: "HEIC", to: "WebP", description: "Converti le foto HEIC dell'iPhone in WebP ottimizzato per il web, direttamente nel browser." },
  { pair: "svg-to-jpg", from: "SVG", to: "JPG", description: "Converti la grafica vettoriale SVG in un'immagine JPG compatta e pronta da condividere." },
];

const EXPLORE = [
  { name: "Comprimi immagini", href: "/it/tools/comprimere-immagini" },
  { name: "Comprimi a dimensione", href: "/it/comprimi-a-dimensione" },
  { name: "Ridimensiona immagini", href: "/it/ridimensionare-immagini" },
];

export default function ConvertireImmaginiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SammaPix", item: `${APP_URL}/it` },
          { "@type": "ListItem", position: 2, name: "Converti immagini", item: IT_URL },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Convertitore immagini online",
        description: "Converti immagini tra formati (HEIC, JPG, PNG, WebP, AVIF), gratis e nel browser.",
        url: IT_URL,
        publisher: { "@type": "Organization", name: APP_NAME, url: APP_URL },
        mainEntity: {
          "@type": "ItemList",
          name: "Conversioni di formato",
          numberOfItems: CONVERSIONS.length,
          itemListElement: CONVERSIONS.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Converti ${c.from} in ${c.to}`,
            url: `${APP_URL}/convert/${c.pair}`,
            description: c.description,
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
        <span className="text-[#525252]">Converti immagini</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Converti le tue immagini online, gratis e nel browser
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-10">
        Trasforma le tue foto da un formato all'altro direttamente nel browser, senza installare
        nulla e senza caricare i file su nessun server. Tutto avviene sul tuo dispositivo, in pochi
        secondi e gratuitamente.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CONVERSIONS.map(({ pair, from, to, description }) => (
          <Link
            key={pair}
            href={`/convert/${pair}`}
            className="group p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#191919] hover:bg-[#FAFAFA] dark:hover:bg-[#1F1F1F] transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                {from} in {to}
              </p>
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
