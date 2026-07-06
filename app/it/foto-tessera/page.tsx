import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";

const EN_URL = `${APP_URL}/passport-photo`;
const IT_URL = `${APP_URL}/it/foto-tessera`;

export const metadata: Metadata = {
  title: "Foto Tessera Online Gratis",
  description:
    "Crea la tua foto tessera per carta d'identità, passaporto e patente direttamente nel browser. Formato 35x45 mm, sfondo bianco, senza caricare nulla su alcun server.",
  keywords: [
    "foto tessera online",
    "foto tessera online gratis",
    "foto tessera carta d'identità",
    "foto tessera passaporto",
    "foto formato tessera 35x45",
    "creare foto tessera online",
    "foto documento online",
  ],
  alternates: {
    canonical: IT_URL,
    languages: { en: EN_URL, it: IT_URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "Foto Tessera Online Gratis | SammaPix",
    description:
      "Crea la foto tessera per carta d'identità, passaporto e patente nel browser. Formato 35x45 mm, senza upload.",
    type: "website",
    url: IT_URL,
    siteName: APP_NAME,
    locale: "it_IT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Foto tessera online gratis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foto Tessera Online Gratis | SammaPix",
    description:
      "Crea la foto tessera per i documenti italiani nel browser. Formato 35x45 mm, senza upload.",
  },
};

const USI = [
  { title: "Carta d'identità e CIE", body: "Prepara la foto nel formato 35x45 mm con sfondo bianco per la carta d'identità cartacea o elettronica." },
  { title: "Passaporto", body: "Crea la foto tessera nelle proporzioni corrette per la domanda o il rinnovo del passaporto." },
  { title: "Patente di guida", body: "Ottieni una foto pronta per la pratica della patente, nel formato tessera standard." },
  { title: "Concorsi e moduli PA", body: "Genera la foto identificativa da allegare a bandi, concorsi pubblici e portali della Pubblica Amministrazione." },
];

const FAQS = [
  { question: "Che formato deve avere la foto tessera in Italia?", answer: "Il formato standard è 35x45 mm con sfondo chiaro e uniforme, di solito bianco. SammaPix imposta automaticamente queste proporzioni, così non devi ritagliare a mano." },
  { question: "Le mie foto vengono caricate su un server?", answer: "No. La foto viene elaborata direttamente nel tuo browser, sul tuo dispositivo. Nessuna immagine viene trasmessa a server esterni: la tua privacy è protetta." },
  { question: "È davvero gratis?", answer: "Sì, creare la foto tessera è gratuito e non serve registrarsi. Apri lo strumento e prepara la tua foto in pochi istanti." },
  { question: "Posso rimuovere lo sfondo?", answer: "Sì, lo strumento include la rimozione automatica dello sfondo con l'AI, così ottieni lo sfondo bianco richiesto per i documenti." },
];

export default function FotoTesseraPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SammaPix", item: `${APP_URL}/it` },
          { "@type": "ListItem", position: 2, name: "Foto tessera", item: IT_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-10">
        <Link href="/it" className="hover:text-[#525252] transition-colors">
          {APP_NAME}
        </Link>
        <span>/</span>
        <span className="text-[#525252]">Foto tessera</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Crea la tua foto tessera online, gratis
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-6">
        Prepara la foto tessera per carta d'identità, passaporto, patente e documenti nel formato
        35x45 mm con sfondo bianco, direttamente nel tuo browser. Nessun upload, nessun server: la
        foto resta sul tuo dispositivo.
      </p>

      <Link
        href="/passport-photo/italy"
        className="inline-flex items-center gap-2 rounded-md bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium px-5 py-2.5 hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors mb-12"
      >
        Crea la foto tessera <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {USI.map((u) => (
          <div key={u.title} className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#191919]">
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">{u.title}</p>
            <p className="text-xs text-[#737373] leading-relaxed">{u.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-xs text-[#A3A3A3] uppercase tracking-widest mb-6">Domande frequenti</h2>
        <div className="space-y-6">
          {FAQS.map((f) => (
            <div key={f.question}>
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">{f.question}</h3>
              <p className="mt-1.5 text-sm text-[#737373] leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Esplora altro</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Comprimi a dimensione", href: "/it/comprimi-a-dimensione" },
            { name: "Ridimensiona immagini", href: "/it/ridimensionare-immagini" },
            { name: "Comprimi immagini", href: "/it/tools/comprimere-immagini" },
          ].map((l) => (
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
