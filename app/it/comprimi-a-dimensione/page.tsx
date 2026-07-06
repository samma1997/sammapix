import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";
import { getAllTargets } from "@/lib/compress-targets";

const EN_URL = `${APP_URL}/compress-to`;
const IT_URL = `${APP_URL}/it/comprimi-a-dimensione`;

export const metadata: Metadata = {
  title: "Comprimi Immagine a Dimensione Esatta",
  description:
    "Comprimi foto e immagini a una dimensione esatta in KB o MB nel browser, gratis e senza upload. Ideale per concorsi pubblici, SPID, PA e allegati email.",
  keywords: [
    "comprimere immagine a dimensione esatta",
    "comprimere foto a 100 kb",
    "ridurre immagine a 2 mb",
    "comprimere foto a kb",
    "comprimere immagine a 20 kb",
    "ridurre peso foto online",
    "comprimere foto gratis senza upload",
    "comprimere immagine concorso pubblico",
  ],
  alternates: {
    canonical: IT_URL,
    languages: { en: EN_URL, it: IT_URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "Comprimi Immagine a Dimensione Esatta | SammaPix",
    description:
      "Comprimi foto e immagini a una dimensione esatta in KB o MB nel browser, gratis e senza upload.",
    type: "website",
    url: IT_URL,
    siteName: APP_NAME,
    locale: "it_IT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Comprimi immagine a dimensione esatta" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comprimi Immagine a Dimensione Esatta | SammaPix",
    description:
      "Comprimi foto a una dimensione esatta in KB o MB nel browser, gratis e senza upload.",
  },
};

const DESCRIZIONI: Record<string, string> = {
  "5kb": "Per icone o immagini simbolo su siti web con limiti di peso molto stringenti.",
  "10kb": "Perfetta per thumbnail di prodotti dove la velocità di caricamento è la priorità assoluta.",
  "15kb": "Utile per immagini leggere da inserire in newsletter o campagne di email marketing.",
  "20kb": "Richiesta da alcuni portali della PA per la foto tessera allegata alle domande di iscrizione online.",
  "25kb": "Peso limite per caricare la foto su certi moduli di iscrizione istituzionale o portali comunali.",
  "30kb": "Dimensione spesso indicata dai portali ministeriali per la foto identificativa del candidato.",
  "35kb": "Ideale per immagini di profilo su piattaforme aziendali e intranet con limiti di upload ridotti.",
  "40kb": "Richiesta da alcuni bandi di selezione pubblica per la foto allegata alla domanda di partecipazione.",
  "45kb": "Peso limite per il caricamento di immagini su portali di formazione professionale e piattaforme universitarie.",
  "50kb": "Limite comune per la foto su bandi di concorso pubblico, portali MIUR e iscrizioni universitarie.",
  "100kb": "Il peso più richiesto in Italia: foto per concorsi pubblici, CIE, patente di guida e moduli PA.",
  "150kb": "Dimensione ideale per allegati su portali regionali e comunali, curricula e domande di assunzione.",
  "200kb": "Utile per scansioni di documenti da caricare su fascicolo sanitario elettronico o portale INPS.",
  "250kb": "Peso consigliato per foto profilo su LinkedIn o siti professionali italiani.",
  "300kb": "Ottimale per immagini nei post di blog WordPress o schede prodotto dei negozi online.",
  "500kb": "Ideale per foto da allegare in email senza appesantire la casella di posta del destinatario.",
  "1mb": "Comoda per presentazioni PowerPoint, report PDF o documenti Word condivisi via email o Google Drive.",
  "2mb": "Limite massimo per upload su portali PA italiani come INPS, Agenzia delle Entrate e SPID.",
  "3mb": "Adatta per foto in alta qualità destinate a portfolio online o stampa professionale.",
  "5mb": "Per archivi di immagini o backup di scatti fotografici ad alta risoluzione.",
};

const SIZES = getAllTargets()
  .slice()
  .sort((a, b) => a.sizeBytes - b.sizeBytes)
  .map((t) => ({
    slug: t.slug,
    label: t.sizeLabel,
    description: DESCRIZIONI[t.slug] ?? `Comprimi le immagini esattamente a ${t.sizeLabel}.`,
  }));

const EXPLORE = [
  { name: "Ridimensiona per le piattaforme", href: "/resize" },
  { name: "Converti formato", href: "/convert" },
  { name: "Ottimizza per CMS", href: "/optimize-for" },
  { name: "Guide alle dimensioni immagine", href: "/image-size" },
  { name: "Foto tessera", href: "/tools/passport-photo" },
];

export default function ComprimiADimensionePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SammaPix", item: `${APP_URL}/it` },
          { "@type": "ListItem", position: 2, name: "Comprimi a dimensione", item: IT_URL },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Comprimi immagine a dimensione esatta",
        description:
          "Comprimi immagini a una dimensione esatta in KB o MB, gratis e nel browser.",
        url: IT_URL,
        publisher: { "@type": "Organization", name: APP_NAME, url: APP_URL },
        mainEntity: {
          "@type": "ItemList",
          name: "Dimensioni di compressione",
          numberOfItems: SIZES.length,
          itemListElement: SIZES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Comprimi a ${s.label}`,
            url: `${APP_URL}/compress-to/${s.slug}`,
            description: s.description,
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
        <span className="text-[#525252]">Comprimi a dimensione</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Comprimi la tua immagine alla dimensione esatta
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-10">
        Scegli la dimensione target e SammaPix comprime la tua foto esattamente a quel peso,
        direttamente nel browser. Nessun upload, nessun server: i tuoi file restano sempre privati.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SIZES.map(({ slug, label, description }) => (
          <Link
            key={slug}
            href={`/compress-to/${slug}`}
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
