import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "come-ridimensionare-una-foto";
const URL = `${APP_URL}/it/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Come ridimensionare una foto senza deformarla (2026)",
  description:
    "Come ridimensionare una foto nel browser, gratis e senza upload. Le misure giuste per Instagram, WhatsApp, Facebook e fototessera, in pixel o in centimetri, da iPhone, Android o Mac.",
  alternates: {
    canonical: URL,
    languages: { it: URL, "x-default": `${APP_URL}/resize` },
  },
  keywords: [
    "ridimensionare foto",
    "ridimensionare immagine",
    "come ridimensionare una foto",
    "ridimensionare foto per instagram",
    "ridimensionare foto per whatsapp",
    "ridimensionare foto in pixel",
    "ridimensionare foto in cm",
    "ridurre dimensione foto online",
  ],
  openGraph: {
    title: "Come ridimensionare una foto senza deformarla (2026)",
    description:
      "Le misure giuste per Instagram, WhatsApp e fototessera, in pixel o cm. Nel browser, gratis e senza upload.",
    url: URL,
    type: "article",
    locale: "it_IT",
    publishedTime: "2026-07-06",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Come ridimensionare una foto senza deformarla (2026)",
    description:
      "Le misure giuste per Instagram, WhatsApp e fototessera, in pixel o cm. Gratis, nel browser, senza upload.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "it",
  headline: "Come ridimensionare una foto senza deformarla (2026)",
  description:
    "Guida pratica per ridimensionare una foto direttamente nel browser, gratis e senza upload. Le misure giuste per social, profili e fototessera, in pixel o in centimetri.",
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
    { "@type": "ListItem", position: 3, name: "Come ridimensionare una foto", item: URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "it",
  mainEntity: [
    {
      "@type": "Question",
      name: "Come ridimensionare una foto senza perdere qualità?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Riduci le dimensioni mantenendo le proporzioni bloccate, così la foto non si deforma, e non ingrandire mai una foto oltre la sua misura originale perché diventa sfocata. Su SammaPix imposti larghezza e altezza in pixel o in centimetri e la foto resta nitida. Tutto avviene nel browser, gratis e senza caricare nulla.",
      },
    },
    {
      "@type": "Question",
      name: "Che dimensioni deve avere una foto per Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Per un post quadrato 1080 per 1080 pixel, per un post verticale 1080 per 1350, per le storie 1080 per 1920. Impostando queste misure la foto riempie lo schermo senza essere tagliata o compressa da Instagram.",
      },
    },
    {
      "@type": "Question",
      name: "Come ridimensionare una foto per la foto profilo di WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La foto profilo di WhatsApp è quadrata, quindi conviene ridimensionare la foto a un formato quadrato, ad esempio 640 per 640 pixel. Così non viene tagliata male quando la imposti.",
      },
    },
    {
      "@type": "Question",
      name: "Come ridimensionare una foto in centimetri?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I centimetri servono per la stampa. Su SammaPix puoi impostare la misura in centimetri e scegliere i DPI, di solito 300 per una stampa nitida. Utile ad esempio per una fototessera o per stampare una foto a una dimensione precisa.",
      },
    },
    {
      "@type": "Question",
      name: "Ridimensionare una foto la fa perdere qualità?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rimpicciolire una foto non causa problemi visibili, resta nitida. Il problema nasce solo se provi a ingrandirla oltre la misura originale, perché i pixel vengono inventati e la foto appare sfocata. Parti sempre da una foto più grande di quella che ti serve.",
      },
    },
  ],
};

export default function ComeRidimensionareUnaFotoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogArticleLayout
        locale="it"
        title="Come ridimensionare una foto senza deformarla (2026)"
        slug={SLUG}
        description="Ti serve una foto della misura giusta per un post, per la foto profilo o per una stampa. Ridimensionarla è semplice, ma bastano due errori per ritrovarsela deformata o sfocata. Questa guida spiega come farlo bene nel browser, gratis e senza caricare nulla."
        date="2026-07-06"
        dateFormatted="6 luglio 2026"
        tags={["Workflow", "Tools"]}
        readingTime={8}
        headings={[
          { id: "cosa-vuol-dire", title: "Cosa vuol dire ridimensionare una foto" },
          { id: "nel-browser", title: "Come ridimensionare una foto nel browser" },
          { id: "per-i-social", title: "Le misure giuste per Instagram, WhatsApp e Facebook" },
          { id: "per-fototessera", title: "Ridimensionare una foto per la fototessera" },
          { id: "pixel-o-cm", title: "In pixel o in centimetri" },
          { id: "per-dispositivo", title: "Da iPhone, Android o Mac" },
          { id: "senza-deformare", title: "Ridimensionare senza deformare né sfocare" },
          { id: "faq", title: "Domande frequenti" },
        ]}
        summary={[
          "Ridimensionare vuol dire cambiare le dimensioni in pixel di una foto: si usa per adattarla a un social, a una foto profilo o a una stampa.",
          "Rimpicciolire non rovina la foto. Ingrandirla oltre la misura originale sì, perché diventa sfocata.",
          "Per Instagram usa 1080 pixel di lato, per la foto profilo di WhatsApp un quadrato, per la stampa lavora in centimetri a 300 DPI.",
          "Tieni sempre bloccate le proporzioni per non deformare la foto.",
          "Su SammaPix ridimensioni nel browser, gratis e senza upload, quindi le foto non lasciano il dispositivo.",
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
              La stessa foto serve in misure diverse per social, profili e stampa. Foto dal{" "}
              <Link href="/it/portfolio" className="underline">portfolio</Link>.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Ridimensiona le tue foto, gratis e senza caricare nulla
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Imposta larghezza e altezza in pixel o centimetri, tieni le
              proporzioni bloccate e scarica la foto della misura giusta. Tutto
              nel browser, le foto non lasciano il dispositivo. Senza
              registrazione.
            </p>
            <Link
              href="/it/ridimensionare-immagini"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Ridimensiona una foto, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="cosa-vuol-dire" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Cosa vuol dire ridimensionare una foto
        </h2>
        <p>
          Ridimensionare una foto vuol dire cambiare le sue dimensioni in pixel,
          cioè quanto è larga e quanto è alta. Serve in tanti casi diversi:
          adattare una foto alle misure di un social, prepararla come foto
          profilo, o portarla alla dimensione giusta per una stampa. È una cosa
          semplice, ma ci sono due trappole: deformare la foto se cambi le
          proporzioni, e sfocarla se la ingrandisci troppo. Vediamo come evitarle.
        </p>

        <h2 id="nel-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Come ridimensionare una foto nel browser
        </h2>
        <p>
          Il modo più semplice è farlo direttamente nel browser, senza installare
          niente. Su{" "}
          <Link href="/it/ridimensionare-immagini" className="underline">SammaPix Ridimensiona</Link>{" "}
          il procedimento è questo:
        </p>
        <ol className="list-decimal pl-5 space-y-1 my-4">
          <li>Apri lo strumento, da computer o da telefono.</li>
          <li>Trascina la foto o selezionala dalla galleria.</li>
          <li>Imposta la larghezza e l’altezza che ti servono, in pixel o in centimetri.</li>
          <li>Tieni bloccate le proporzioni e scarica la foto ridimensionata.</li>
        </ol>
        <p>
          Come per gli altri strumenti, tutto avviene sul tuo dispositivo. La
          foto non viene caricata su nessun server, la elabora il browser. È
          veloce e privato.
        </p>

        <h2 id="per-i-social" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Le misure giuste per Instagram, WhatsApp e Facebook
        </h2>
        <p>
          Ogni piattaforma ha le sue misure ideali. Se parti da quelle giuste, la
          foto riempie lo schermo senza essere tagliata male o compressa.
        </p>
        <ul className="list-disc pl-5 space-y-1 my-4">
          <li><strong>Instagram post quadrato:</strong> 1080 per 1080 pixel.</li>
          <li><strong>Instagram post verticale:</strong> 1080 per 1350 pixel.</li>
          <li><strong>Instagram e WhatsApp storie:</strong> 1080 per 1920 pixel.</li>
          <li><strong>Foto profilo WhatsApp:</strong> un quadrato, ad esempio 640 per 640 pixel.</li>
          <li><strong>Copertina Facebook:</strong> 820 per 312 pixel.</li>
        </ul>
        <p>
          Dopo aver ridimensionato, se la foto ti serve anche leggera puoi
          passarla allo strumento per{" "}
          <Link href="/it/tools/comprimere-immagini" className="underline">comprimere le immagini</Link>.
        </p>

        <h2 id="per-fototessera" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Ridimensionare una foto per la fototessera
        </h2>
        <p>
          La fototessera in Italia ha una misura precisa, 35 per 45 millimetri. Se
          ti serve una foto tessera fatta in casa, conviene partire da uno
          strumento pensato apposta, che ti dà già le proporzioni e lo sfondo
          giusti. Lo trovi nella pagina{" "}
          <Link href="/it/foto-tessera" className="underline">foto tessera</Link>.
        </p>

        <h2 id="pixel-o-cm" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          In pixel o in centimetri
        </h2>
        <p>
          <strong>I pixel</strong> servono per tutto ciò che si vede su uno
          schermo: social, profili, siti web. Qui ragioni in pixel e basta.
        </p>
        <p>
          <strong>I centimetri</strong> servono per la stampa. Quando lavori in
          centimetri conta anche il DPI, cioè quanti punti per pollice: per una
          stampa nitida punta a 300 DPI. Una foto pensata per lo schermo può
          sembrare grande in pixel ma piccola in centimetri una volta stampata,
          per questo è utile poter passare da una misura all’altra.
        </p>

        <h2 id="per-dispositivo" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Da iPhone, Android o Mac
        </h2>
        <p>
          Non serve nessuna app, funziona tutto dal browser. Da{" "}
          <strong>iPhone</strong> apri Safari, da <strong>Android</strong> apri
          Chrome, selezioni la foto dalla galleria e imposti la misura. Da{" "}
          <strong>Mac</strong> o da computer puoi trascinare più foto insieme,
          comodo quando devi portare tante immagini alla stessa dimensione, ad
          esempio per un sito o un catalogo.
        </p>

        <h2 id="senza-deformare" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Ridimensionare senza deformare né sfocare
        </h2>
        <p>
          Due regole semplici evitano gli errori più comuni.
        </p>
        <p>
          <strong>Tieni bloccate le proporzioni.</strong> Se cambi solo la
          larghezza o solo l’altezza, la foto si schiaccia e le persone appaiono
          più magre o più larghe. Bloccando le proporzioni, cambiando una misura
          l’altra si adatta da sola e la foto resta naturale.
        </p>
        <p>
          <strong>Non ingrandire oltre l’originale.</strong> Rimpicciolire una
          foto va sempre bene. Ingrandirla oltre la sua misura di partenza no,
          perché il programma deve inventare pixel che non esistono e il
          risultato è sfocato. Parti sempre da una foto più grande di quella che
          ti serve.
        </p>

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Domande frequenti
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Come ridimensionare una foto senza perdere qualità?</h3>
        <p>
          Tieni le proporzioni bloccate così non si deforma, e non ingrandirla
          oltre la misura originale. Su SammaPix imposti larghezza e altezza in
          pixel o centimetri e la foto resta nitida, tutto nel browser e senza
          upload.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Che dimensioni deve avere una foto per Instagram?</h3>
        <p>
          1080 per 1080 pixel per un post quadrato, 1080 per 1350 per un post
          verticale, 1080 per 1920 per le storie.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Ridimensionare una foto la fa perdere qualità?</h3>
        <p>
          Rimpicciolirla no, resta nitida. Il problema nasce solo se la ingrandisci
          oltre la misura originale, perché diventa sfocata. Parti sempre da una
          foto più grande di quella che ti serve.
        </p>
      </BlogArticleLayout>
    </>
  );
}
