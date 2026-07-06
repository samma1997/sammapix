import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Minimize2, Maximize2, FileImage, Scissors, Sparkles, ScanSearch, Stamp, Eraser } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";

const EN_URL = `${APP_URL}`;
const IT_URL = `${APP_URL}/it`;

export const metadata: Metadata = {
  title: "Strumenti foto gratis online — SammaPix",
  description:
    "Comprimi, ridimensiona, converti HEIC e WebP, ritaglia, rimuovi lo sfondo e rinomina le foto con AI. Gratis, nel browser, senza registrazione né upload.",
  keywords: [
    "strumenti foto gratis",
    "comprimere immagini online",
    "ridimensionare foto online",
    "convertire HEIC WebP PNG online",
    "editor foto online senza registrazione",
    "rimuovere sfondo foto gratis",
    "ritaglia foto online gratis",
    "trovare duplicati foto",
    "rinominare foto con AI",
  ],
  alternates: {
    canonical: IT_URL,
    languages: { en: EN_URL, it: IT_URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "Strumenti foto gratis online — SammaPix",
    description:
      "Comprimi, ridimensiona, converti, ritaglia e rimuovi lo sfondo. Gratis, nel browser, senza upload.",
    type: "website",
    url: IT_URL,
    siteName: APP_NAME,
    locale: "it_IT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix, strumenti foto gratis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strumenti foto gratis online — SammaPix",
    description:
      "Comprimi, ridimensiona, converti, ritaglia e rimuovi lo sfondo. Gratis, nel browser, senza upload.",
  },
};

const TOOLS = [
  { Icon: Minimize2, name: "Comprimi immagini", href: "/it/tools/comprimere-immagini" },
  { Icon: FileImage, name: "Comprimi a dimensione", href: "/it/comprimi-a-dimensione" },
  { Icon: Maximize2, name: "Ridimensiona immagini", href: "/it/ridimensionare-immagini" },
  { Icon: FileImage, name: "Converti formato", href: "/it/convertire-immagini" },
  { Icon: Eraser, name: "Rimuovi sfondo", href: "/tools/remove-bg" },
  { Icon: ScanSearch, name: "Trova duplicati", href: "/tools/twinhunt" },
  { Icon: Sparkles, name: "Rinomina con AI", href: "/tools/ai-rename" },
  { Icon: Scissors, name: "Ritaglia e proporzioni", href: "/tools/croproatio" },
  { Icon: Stamp, name: "Filigrana", href: "/tools/stampit" },
];

const HOW = [
  { title: "Carica le foto", body: "Trascina le immagini nella pagina oppure selezionale dal tuo dispositivo: il browser le carica in un istante senza inviarle da nessuna parte." },
  { title: "Scegli lo strumento", body: "Seleziona l'operazione che vuoi eseguire, regola le opzioni se necessario e avvia l'elaborazione con un clic." },
  { title: "Scarica il risultato", body: "Le foto elaborate vengono salvate direttamente sul tuo dispositivo, pronte all'uso e senza filigrane." },
];

const FAQS = [
  { question: "SammaPix è davvero gratis?", answer: "Sì, tutti gli strumenti sono gratuiti e non ci sono limiti nascosti. Non serve inserire una carta di credito né creare un account. Puoi usarli subito, quante volte vuoi." },
  { question: "Le mie foto vengono caricate su un server?", answer: "No. Tutte le elaborazioni avvengono direttamente nel tuo browser grazie alle tecnologie moderne del web. Le immagini non lasciano mai il tuo dispositivo e non vengono trasmesse a nessun server esterno." },
  { question: "Serve registrarsi o creare un account?", answer: "No, non è necessario registrarsi né fornire un indirizzo email. Apri la pagina dello strumento che ti interessa e inizia subito a lavorare con le tue foto, senza passaggi intermedi." },
  { question: "Funziona su smartphone e tablet?", answer: "Sì, SammaPix funziona su qualsiasi dispositivo con un browser moderno, inclusi iPhone, Android, iPad e tablet. Non c'è nessuna app da installare, basta aprire il sito." },
];

export default function HomeItPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5]">
          Tutti gli strumenti foto che ti servono. Gratis, nel browser, senza registrazione.
        </h1>
        <p className="mt-4 text-base text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Comprimi, ridimensiona, converti HEIC e WebP, ritaglia, rimuovi lo sfondo, trova i duplicati
          e rinomina le foto con l'AI. Le tue immagini non escono mai dal browser.
        </p>
        <Link
          href="/it/tools/comprimere-immagini"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium px-6 py-3 hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
        >
          Prova subito, è gratis <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </section>

      {/* Tools */}
      <section className="py-14 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
            Gli strumenti per gestire le tue foto
          </h2>
          <p className="text-sm text-[#737373] mb-8">
            Ogni strumento funziona direttamente nel browser, senza installare nulla e senza creare un account.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TOOLS.map(({ Icon, name, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#191919] hover:bg-[#FAFAFA] dark:hover:bg-[#1F1F1F] transition-colors"
              >
                <Icon className="h-5 w-5 text-[#737373] shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">{name}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#A3A3A3] ml-auto group-hover:text-[#525252] transition-colors" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-8">Come funziona</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {HOW.map((s, i) => (
              <div key={s.title}>
                <div className="text-xs font-semibold text-[#A3A3A3] mb-2">0{i + 1}</div>
                <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">{s.title}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-14 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            Le tue foto restano tue, sempre
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed">
            Ogni elaborazione avviene nel tuo browser, senza caricare nulla su server esterni. Nessuno
            vede le tue immagini, nemmeno noi.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
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
      </section>
    </>
  );
}
