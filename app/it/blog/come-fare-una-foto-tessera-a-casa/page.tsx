import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "come-fare-una-foto-tessera-a-casa";
const URL = `${APP_URL}/it/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Come fare una foto tessera a casa col telefono, gratis (2026)",
  description:
    "Come fare una fototessera a casa con iPhone o Android, gratis. Le dimensioni giuste per carta d’identità, passaporto e patente, con sfondo bianco, senza andare dal fotografo.",
  alternates: {
    canonical: URL,
    languages: { it: URL, "x-default": `${APP_URL}/passport-photo` },
  },
  keywords: [
    "come fare una foto tessera",
    "fototessera fai da te",
    "foto tessera con telefono",
    "foto tessera dimensioni",
    "foto tessera sfondo bianco",
    "fototessera con iphone",
    "dimensioni foto tessera passaporto",
    "foto tessera online gratis",
  ],
  openGraph: {
    title: "Come fare una foto tessera a casa col telefono, gratis (2026)",
    description:
      "Fototessera fai da te con il telefono, dimensioni giuste per documenti e sfondo bianco. Gratis, senza fotografo.",
    url: URL,
    type: "article",
    locale: "it_IT",
    publishedTime: "2026-07-06",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Come fare una foto tessera a casa col telefono, gratis (2026)",
    description:
      "Fototessera fai da te con il telefono, dimensioni giuste per documenti e sfondo bianco. Gratis.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "it",
  headline: "Come fare una foto tessera a casa col telefono, gratis (2026)",
  description:
    "Guida per fare una fototessera a casa con lo smartphone, con le dimensioni giuste per carta d’identità, passaporto e patente e lo sfondo bianco richiesto.",
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
    { "@type": "ListItem", position: 3, name: "Come fare una foto tessera a casa", item: URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "it",
  mainEntity: [
    {
      "@type": "Question",
      name: "Che dimensioni deve avere una foto tessera in Italia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Italia la foto tessera per documenti è 35 per 45 millimetri, cioè 3,5 per 4,5 centimetri. Vale per carta d’identità, carta d’identità elettronica, passaporto e patente. Il viso deve occupare circa il 70 o 80 per cento dell’altezza, di fronte, con espressione neutra e sfondo chiaro uniforme.",
      },
    },
    {
      "@type": "Question",
      name: "Come fare una foto tessera con il telefono a casa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mettiti davanti a una parete bianca con una buona luce naturale, guarda dritto nell’obiettivo con espressione neutra e fai scattare la foto a qualcuno, meglio non un selfie. Poi apri SammaPix dal telefono, carichi la foto e lo strumento la ritaglia nelle proporzioni giuste per la fototessera. Tutto gratis e nel browser.",
      },
    },
    {
      "@type": "Question",
      name: "La foto tessera deve avere lo sfondo bianco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, per i documenti italiani lo sfondo deve essere chiaro e uniforme, bianco o grigio molto chiaro, senza ombre né oggetti dietro. Il modo più semplice è mettersi davanti a una parete bianca ben illuminata.",
      },
    },
    {
      "@type": "Question",
      name: "Posso stampare la foto tessera fatta a casa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Una volta pronta puoi stamparla a casa su carta fotografica o portarla a stampare, oppure usarla in digitale dove è ammessa. L’importante è rispettare le dimensioni 35 per 45 millimetri e le regole su posa e sfondo.",
      },
    },
  ],
};

export default function ComeFareUnaFotoTesseraPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogArticleLayout
        locale="it"
        title="Come fare una foto tessera a casa col telefono, gratis (2026)"
        slug={SLUG}
        description="Ti serve una fototessera per la carta d’identità, il passaporto o la patente e non hai voglia di andare dal fotografo. Puoi farla a casa con il telefono in pochi minuti, gratis. Questa guida spiega le dimensioni giuste, la posa e lo sfondo, e come ritagliarla nel browser."
        date="2026-07-06"
        dateFormatted="6 luglio 2026"
        tags={["Workflow", "Tools"]}
        readingTime={7}
        headings={[
          { id: "dimensioni", title: "Le dimensioni giuste per i documenti italiani" },
          { id: "regole", title: "Posa, espressione e sfondo: le regole" },
          { id: "come-scattare", title: "Come scattare la foto col telefono" },
          { id: "ritagliare", title: "Ritagliare la foto nelle proporzioni giuste" },
          { id: "stampare", title: "Stampare o usare la fototessera in digitale" },
          { id: "faq", title: "Domande frequenti" },
        ]}
        summary={[
          "In Italia la foto tessera è 35 per 45 millimetri, valida per carta d’identità, passaporto e patente.",
          "Servono sfondo chiaro uniforme, viso di fronte a circa il 70 o 80 per cento dell’altezza, espressione neutra.",
          "La scatti con il telefono davanti a una parete bianca ben illuminata, meglio non in selfie.",
          "Su SammaPix carichi la foto e la ritagli nelle proporzioni corrette, gratis e nel browser.",
          "Poi puoi stamparla a casa o usarla in digitale dove è ammessa.",
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
              Una fototessera a norma la fai a casa in pochi minuti. Foto dal{" "}
              <Link href="/it/portfolio" className="underline">portfolio</Link>.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Crea la tua foto tessera, gratis e senza caricare nulla
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Carica la foto in SammaPix e ottieni una fototessera nelle
              dimensioni giuste per i documenti. Tutto nel browser, la foto non
              lascia il dispositivo. Senza registrazione.
            </p>
            <Link
              href="/it/foto-tessera"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Crea una foto tessera, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="dimensioni" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Le dimensioni giuste per i documenti italiani
        </h2>
        <p>
          In Italia la foto tessera per i documenti ha una misura precisa: 35 per
          45 millimetri, cioè 3,5 per 4,5 centimetri. È la stessa per la carta
          d’identità, la carta d’identità elettronica, il passaporto e la
          patente. Se rispetti questa dimensione e le regole su posa e sfondo, la
          foto è valida per tutti questi documenti.
        </p>
        <p>
          Il viso deve occupare circa il 70 o 80 per cento dell’altezza della
          foto, inquadrato di fronte, dalla sommità della testa fino alle spalle.
          Non troppo lontano, non troppo vicino.
        </p>

        <h2 id="regole" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Posa, espressione e sfondo: le regole
        </h2>
        <ul className="list-disc pl-5 space-y-1 my-4">
          <li><strong>Sfondo:</strong> chiaro e uniforme, bianco o grigio molto chiaro, senza ombre né oggetti dietro.</li>
          <li><strong>Viso:</strong> di fronte, guardando l’obiettivo, testa dritta e centrata.</li>
          <li><strong>Espressione:</strong> neutra, bocca chiusa, occhi ben visibili e aperti.</li>
          <li><strong>Niente cappelli né occhiali scuri.</strong> Gli occhiali da vista sono ammessi solo se non riflettono e non coprono gli occhi.</li>
          <li><strong>Luce:</strong> uniforme sul viso, senza ombre forti da un lato.</li>
        </ul>

        <h2 id="come-scattare" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Come scattare la foto col telefono
        </h2>
        <p>
          Non serve una macchina fotografica, va benissimo il telefono. Mettiti
          davanti a una parete bianca, con una buona luce naturale che ti arriva
          di fronte, ad esempio vicino a una finestra. Meglio farti scattare la
          foto da qualcuno invece di fare un selfie, così il braccio non
          deforma le proporzioni e resti dritto. Guarda nell’obiettivo, spalle
          dritte, espressione neutra. Fai due o tre scatti così scegli il
          migliore.
        </p>

        <h2 id="ritagliare" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Ritagliare la foto nelle proporzioni giuste
        </h2>
        <p>
          La foto scattata col telefono non ha già le proporzioni di una
          fototessera, va ritagliata a 35 per 45 millimetri. Invece di farlo a
          mano rischiando di sbagliare, usa lo strumento apposta: apri la pagina{" "}
          <Link href="/it/foto-tessera" className="underline">foto tessera</Link>,
          carichi la foto e ottieni il ritaglio nelle dimensioni corrette. Tutto
          nel browser, gratis e senza caricare la foto su nessun server. Se la
          foto è troppo pesante da caricare, puoi prima{" "}
          <Link href="/it/tools/comprimere-immagini" className="underline">comprimerla</Link>{" "}
          o{" "}
          <Link href="/it/ridimensionare-immagini" className="underline">ridimensionarla</Link>.
        </p>

        <h2 id="stampare" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Stampare o usare la fototessera in digitale
        </h2>
        <p>
          Una volta pronta hai due strade. Puoi stamparla, a casa su carta
          fotografica oppure in una copisteria, tenendo la misura 35 per 45
          millimetri. Oppure puoi usarla in formato digitale, dove è ammessa, ad
          esempio per alcune pratiche online. In entrambi i casi l’importante è
          aver rispettato dimensioni, posa e sfondo.
        </p>

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Domande frequenti
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Che dimensioni deve avere una foto tessera?</h3>
        <p>
          In Italia 35 per 45 millimetri, valida per carta d’identità,
          passaporto e patente. Il viso deve occupare circa il 70 o 80 per cento
          dell’altezza.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">La foto tessera deve avere lo sfondo bianco?</h3>
        <p>
          Sì, sfondo chiaro e uniforme, bianco o grigio molto chiaro, senza ombre
          né oggetti dietro. La cosa più semplice è una parete bianca ben
          illuminata.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Posso fare la fototessera con l’iPhone?</h3>
        <p>
          Sì. Scatti la foto col telefono davanti a una parete bianca, poi la
          carichi su SammaPix dal browser e la ritagli nelle dimensioni giuste,
          gratis.
        </p>
      </BlogArticleLayout>
    </>
  );
}
