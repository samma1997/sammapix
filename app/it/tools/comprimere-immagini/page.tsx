import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Minimize2, Layers, Zap } from "lucide-react";
import CompressClient from "@/components/tools/CompressClient";
import CompressHeroDemo from "@/components/tools/CompressHeroDemo";
import { APP_URL } from "@/lib/constants";

const EN_URL = `${APP_URL}/tools/compress`;
const IT_URL = `${APP_URL}/it/tools/comprimere-immagini`;

export const metadata: Metadata = {
  title: "Comprimi Immagini Online Gratis",
  description:
    "Riduci il peso di JPG, PNG e WebP direttamente nel browser, senza caricare le foto su alcun server. Gratis, senza limiti di file e con privacy totale.",
  keywords: [
    "comprimere immagini online",
    "ridurre dimensione foto",
    "comprimere jpg online gratis",
    "comprimere foto senza perdere qualità",
    "ridurre peso immagini",
    "comprimere png online",
    "comprimere webp gratis",
    "ridurre dimensione immagine",
    "compressione immagini browser",
    "comprimere foto online gratis",
  ],
  alternates: {
    canonical: IT_URL,
    languages: {
      en: EN_URL,
      it: IT_URL,
      "x-default": EN_URL,
    },
  },
  openGraph: {
    title: "Comprimi Immagini Online Gratis | SammaPix",
    description:
      "Riduci il peso di JPG, PNG e WebP direttamente nel browser, senza caricare le foto su alcun server. Gratis, senza limiti di file e con privacy totale.",
    url: IT_URL,
    siteName: "SammaPix",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix, comprimi immagini online gratis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comprimi Immagini Online Gratis | SammaPix",
    description:
      "Riduci il peso di JPG, PNG e WebP nel browser, senza upload. Gratis e con privacy totale.",
  },
};

const features = [
  {
    Icon: Shield,
    title: "Le foto non lasciano mai il tuo dispositivo",
    body: "La compressione avviene interamente nel browser tramite Canvas API. Nessun file viene trasmesso a server esterni: la tua privacy è protetta dall'inizio alla fine.",
  },
  {
    Icon: Minimize2,
    title: "Fino al 90% in meno di peso, qualità visibilmente invariata",
    body: "L'algoritmo riduce il peso del file in modo significativo senza che la differenza si noti a occhio nudo. Perfetto per siti web, email e social media.",
  },
  {
    Icon: Layers,
    title: "JPG, PNG e WebP in un solo strumento",
    body: "Puoi comprimere i tre formati più diffusi senza cambiare strumento o convertire i file. Il formato originale viene mantenuto nel risultato finale.",
  },
  {
    Icon: Zap,
    title: "Gratis, senza limiti di file e senza registrazione",
    body: "Non c'è un numero massimo di immagini da elaborare nella versione gratuita. Puoi usare lo strumento ogni volta che ne hai bisogno, senza creare un account.",
  },
];

const faqs = [
  {
    question: "Come funziona la compressione delle immagini nel browser?",
    answer:
      "SammaPix usa la Canvas API del browser per elaborare le immagini localmente sul tuo dispositivo. Il processo avviene interamente in locale, senza trasmettere nulla a server esterni. Carichi l'immagine, il browser la elabora e scarichi il file compresso in pochi secondi.",
  },
  {
    question: "Le mie foto vengono caricate su qualche server?",
    answer:
      "No. A differenza di strumenti come TinyPNG o iLoveIMG, SammaPix non trasmette le tue immagini a nessun server. Tutto avviene nel browser, sul tuo computer o smartphone. È la scelta ideale per chi lavora con foto personali, documenti riservati o immagini aziendali.",
  },
  {
    question: "Qual è la differenza tra SammaPix e TinyPNG?",
    answer:
      "TinyPNG carica le tue immagini sui propri server per comprimerle e poi te le restituisce scaricabili. SammaPix elabora tutto nel browser senza mai spostare i file. Il vantaggio concreto è la privacy: le foto rimangono sul tuo dispositivo per tutta la durata del processo.",
  },
  {
    question: "Posso comprimere più immagini insieme?",
    answer:
      "Sì. Puoi aggiungere più file in una sola sessione e comprimerli tutti senza dover ripetere il processo per ogni singola immagine. Non c'è un numero massimo di file nella versione gratuita.",
  },
  {
    question: "Si nota la differenza di qualità dopo la compressione?",
    answer:
      "La riduzione di qualità è progettata per essere impercettibile a occhio nudo nella grande maggioranza dei casi. Il peso del file cala in modo significativo mentre l'immagine rimane visibilmente identica all'originale. Puoi confrontare i due file prima di scaricare il risultato.",
  },
];

export default function ComprimereImmaginiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SammaPix", item: `${APP_URL}/it` },
          { "@type": "ListItem", position: 2, name: "Comprimi immagini", item: IT_URL },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-2">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 dark:text-[#737373] mb-4">
          <Link href="/it" className="hover:text-gray-600 dark:hover:text-[#A3A3A3]">
            SammaPix
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-gray-600 dark:text-[#A3A3A3]">Comprimi immagini</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-[#E5E5E5]">
              Comprimi le immagini online, gratis e senza caricarle su nessun server
            </h1>
            <p className="mt-3 text-base text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              JPG, PNG e WebP vengono compressi direttamente nel tuo browser. Le foto non lasciano
              mai il dispositivo e la qualità rimane visibilmente intatta.
            </p>
            <p className="mt-3 text-sm text-gray-500 dark:text-[#737373] leading-relaxed">
              Ridurre il peso delle immagini non dovrebbe costare nulla né mettere a rischio la tua
              privacy. Con SammaPix puoi comprimere JPG, PNG e WebP fino al 90% in meno, tutto nel
              browser, senza registrazione e senza caricare nulla su server esterni.
            </p>
          </div>
          <div className="hidden lg:block">
            <CompressHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool (widget condiviso, invariato) */}
      <CompressClient />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex gap-3">
              <f.Icon className="h-5 w-5 text-gray-400 dark:text-[#737373] shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5]">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">
            Domande frequenti
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5]">{f.question}</h3>
                <p className="mt-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
