import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "come-convertire-webp-in-jpg";
const URL = `${APP_URL}/it/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Come convertire WebP in JPG, gratis e senza programmi (2026)",
  description:
    "Hai scaricato un’immagine WebP e non si apre? Ecco come convertire WebP in JPG nel browser, gratis e senza caricare nulla, da Windows, Mac, iPhone o Android.",
  alternates: {
    canonical: URL,
    languages: { it: URL, "x-default": `${APP_URL}/convert` },
  },
  keywords: [
    "convertire webp in jpg",
    "webp in jpg",
    "aprire file webp",
    "convertire webp in jpg gratis",
    "cos’è webp",
    "salvare webp in jpg",
    "convertire webp in jpg online",
    "webp in jpg gratis",
  ],
  openGraph: {
    title: "Come convertire WebP in JPG, gratis e senza programmi (2026)",
    description:
      "L’immagine WebP non si apre? Convertila in JPG nel browser, gratis e senza upload.",
    url: URL,
    type: "article",
    locale: "it_IT",
    publishedTime: "2026-07-06",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Come convertire WebP in JPG, gratis e senza programmi (2026)",
    description:
      "L’immagine WebP non si apre? Convertila in JPG nel browser, gratis e senza upload.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "it",
  headline: "Come convertire WebP in JPG, gratis e senza programmi (2026)",
  description:
    "Guida pratica per convertire le immagini WebP in JPG direttamente nel browser, gratis e senza upload. Funziona da Windows, Mac, iPhone e Android.",
  url: URL,
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/it/chi-siamo",
    image: "https://www.sammapix.com/luca-sammarco.jpg",
    sameAs: ["https://lucasammarco.com", "https://github.com/samma1997"],
  },
  publisher: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}/it` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/it/blog` },
    { "@type": "ListItem", position: 3, name: "Come convertire WebP in JPG", item: URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "it",
  mainEntity: [
    {
      "@type": "Question",
      name: "Cos’è il formato WebP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP è un formato immagine creato da Google che pesa circa il 30 per cento in meno di un JPG a parità di qualità. I siti web lo usano per caricare più in fretta. Il problema è che quando salvi un’immagine WebP dal browser, molti programmi e stampanti non la aprono, quindi spesso conviene convertirla in JPG.",
      },
    },
    {
      "@type": "Question",
      name: "Come convertire WebP in JPG gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apri il browser, vai su SammaPix, trascina il file WebP e scarica il JPG. La conversione avviene nel browser, gratis, senza installare programmi e senza caricare l’immagine su un server.",
      },
    },
    {
      "@type": "Question",
      name: "Perché non riesco ad aprire un file WebP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Molti programmi di visualizzazione e di fotoritocco, soprattutto quelli più vecchi, non riconoscono il WebP. La soluzione più semplice non è cercare un programma nuovo, ma convertire l’immagine in JPG, che si apre ovunque.",
      },
    },
    {
      "@type": "Question",
      name: "Convertire WebP in JPG fa perdere qualità?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A qualità alta la differenza è impercettibile. In cambio ottieni un file che si apre e si stampa dappertutto, cosa che di solito conta molto più di una piccola differenza di dimensione.",
      },
    },
  ],
};

export default function ComeConvertireWebpInJpgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogArticleLayout
        locale="it"
        title="Come convertire WebP in JPG, gratis e senza programmi (2026)"
        slug={SLUG}
        description="Salvi un’immagine da un sito, è in formato WebP, e sul computer non si apre o non si può caricare dove ti serve. Capita spessissimo. Questa guida spiega cos’è il WebP e come trasformarlo in JPG nel browser, gratis e senza caricare nulla."
        date="2026-07-06"
        dateFormatted="6 luglio 2026"
        tags={["Workflow", "Tools"]}
        readingTime={6}
        headings={[
          { id: "cos-e-webp", title: "Cos’è il formato WebP e perché lo trovi ovunque" },
          { id: "perche-non-si-apre", title: "Perché un file WebP a volte non si apre" },
          { id: "convertire-nel-browser", title: "Come convertire WebP in JPG nel browser" },
          { id: "per-dispositivo", title: "Da Windows, Mac, iPhone o Android" },
          { id: "quando-tenere-webp", title: "Quando invece conviene tenere il WebP" },
          { id: "faq", title: "Domande frequenti" },
        ]}
        summary={[
          "WebP è un formato di Google che pesa meno del JPG: i siti lo usano per caricare più in fretta.",
          "Quando lo salvi però molti programmi e stampanti non lo aprono, ecco perché spesso serve convertirlo in JPG.",
          "Su SammaPix converti nel browser, gratis e senza upload, quindi l’immagine non lascia il dispositivo.",
          "A qualità alta la conversione non fa perdere nulla di visibile, guadagni solo compatibilità.",
          "Se invece l’immagine ti serve per il tuo sito, tenere il WebP è meglio perché è più leggero.",
        ]}
        heroImage={
          <figure>
            <Link href="/it/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Foto scattata da Luca Sammarco, fondatore di SammaPix"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Il WebP è ottimo per il web, ma per usare l’immagine ovunque serve il JPG. Foto dal{" "}
              <Link href="/it/portfolio" className="underline">portfolio</Link>.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Converti i tuoi WebP in JPG, gratis e senza caricare nulla
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Trascina il file WebP in SammaPix e scarica il JPG in un attimo.
              Tutto nel browser, l’immagine non lascia il dispositivo. Senza
              registrazione.
            </p>
            <Link
              href="/it/convertire-immagini"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Converti WebP in JPG, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="cos-e-webp" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Cos’è il formato WebP e perché lo trovi ovunque
        </h2>
        <p>
          WebP è un formato immagine creato da Google. Il suo pregio è il peso: a
          parità di qualità un WebP occupa circa il 30 per cento in meno di un
          JPG. Per questo quasi tutti i siti web moderni salvano le immagini in
          WebP, così le pagine si caricano più in fretta. Il risultato è che,
          quando salvi un’immagine da internet, molto spesso te la ritrovi in
          formato WebP anche senza averlo scelto.
        </p>

        <h2 id="perche-non-si-apre" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Perché un file WebP a volte non si apre
        </h2>
        <p>
          Il WebP è nato per il web, non per l’uso di tutti i giorni. Tanti
          programmi di visualizzazione, molti software di fotoritocco più datati,
          alcuni servizi dove devi caricare una foto e le stampanti non lo
          riconoscono. Ti ritrovi con un file che c’è ma non si apre, oppure che
          il sito rifiuta perché accetta solo JPG. La soluzione non è cercare un
          programma nuovo, è convertire l’immagine in JPG, il formato che apre e
          accetta tutto.
        </p>

        <h2 id="convertire-nel-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Come convertire WebP in JPG nel browser
        </h2>
        <p>
          Il modo più rapido è convertire l’immagine direttamente nel browser,
          senza installare niente. Su{" "}
          <Link href="/it/convertire-immagini" className="underline">SammaPix Converti</Link>{" "}
          bastano pochi passaggi:
        </p>
        <ol className="list-decimal pl-5 space-y-1 my-4">
          <li>Apri lo strumento di conversione, da computer o da telefono.</li>
          <li>Trascina il file WebP o selezionalo.</li>
          <li>Scegli JPG come formato di destinazione.</li>
          <li>Scarica l’immagine convertita.</li>
        </ol>
        <p>
          Come per gli altri strumenti, la conversione avviene sul tuo
          dispositivo, l’immagine non viene caricata su nessun server. È veloce e
          privato. Se dopo la conversione il JPG ti serve anche più leggero,
          puoi passarlo allo strumento per{" "}
          <Link href="/it/tools/comprimere-immagini" className="underline">comprimere le immagini</Link>.
        </p>

        <h2 id="per-dispositivo" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Da Windows, Mac, iPhone o Android
        </h2>
        <p>
          Funziona tutto dal browser, senza app né programmi. Da{" "}
          <strong>Windows</strong> è la via più comoda per aprire i WebP che
          Windows fatica a gestire. Da <strong>Mac</strong> trascini il file nel
          browser e ottieni il JPG. Da <strong>iPhone</strong> apri Safari, da{" "}
          <strong>Android</strong> apri Chrome, selezioni l’immagine e la
          converti. Puoi anche convertire più WebP insieme, comodo quando ne hai
          scaricati tanti.
        </p>

        <h2 id="quando-tenere-webp" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Quando invece conviene tenere il WebP
        </h2>
        <p>
          Non sempre convertire è la scelta giusta. Se l’immagine ti serve per il
          tuo sito web o blog, il WebP è meglio del JPG, perché pesa meno e rende
          le pagine più veloci. In quel caso il percorso è l’opposto: parti da un
          JPG o un PNG e lo converti in WebP. Anche questo lo fai dallo{" "}
          <Link href="/it/convertire-immagini" className="underline">strumento di conversione</Link>,
          scegliendo WebP come destinazione.
        </p>

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Domande frequenti
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Come convertire WebP in JPG gratis?</h3>
        <p>
          Apri il browser, vai su SammaPix, trascina il file WebP e scarica il
          JPG. Tutto nel browser, senza programmi e senza upload.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Perché non riesco ad aprire un file WebP?</h3>
        <p>
          Perché molti programmi, soprattutto i più vecchi, non riconoscono il
          WebP. Convertendolo in JPG lo apri ovunque.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Convertire WebP in JPG fa perdere qualità?</h3>
        <p>
          A qualità alta la differenza è impercettibile, e in cambio ottieni un
          file compatibile con tutto.
        </p>
      </BlogArticleLayout>
    </>
  );
}
