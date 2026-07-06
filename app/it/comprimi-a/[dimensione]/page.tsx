import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Download, Zap, Shield } from "lucide-react";
import { getAllTargets, getTarget } from "@/lib/compress-targets";
import { APP_URL } from "@/lib/constants";
import CompressTargetToolEmbed from "@/components/tools/CompressTargetToolEmbed";

export function generateStaticParams() {
  return getAllTargets().map((t) => ({ dimensione: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dimensione: string }>;
}): Promise<Metadata> {
  const { dimensione: slug } = await params;
  const target = getTarget(slug);
  if (!target) return {};

  const size = target.sizeLabel;
  const enUrl = `${APP_URL}/compress-to/${slug}`;
  const itUrl = `${APP_URL}/it/comprimi-a/${slug}`;
  const title = `Comprimi Immagine a ${size} Online Gratis`;
  const description = `Comprimi le tue foto esattamente a ${size} direttamente nel browser, senza upload e senza registrazione. Gratis, veloce e privato su qualsiasi dispositivo.`;

  return {
    title,
    description,
    alternates: {
      canonical: itUrl,
      languages: { en: enUrl, it: itUrl, "x-default": enUrl },
    },
    openGraph: {
      title: `${title} | SammaPix`,
      description,
      url: itUrl,
      siteName: "SammaPix",
      locale: "it_IT",
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `Comprimi immagine a ${size}` }],
    },
  };
}

export default async function ComprimiADimensioneLeafPage({
  params,
}: {
  params: Promise<{ dimensione: string }>;
}) {
  const { dimensione: slug } = await params;
  const target = getTarget(slug);
  if (!target) notFound();

  const size = target.sizeLabel;
  const itUrl = `${APP_URL}/it/comprimi-a/${slug}`;
  const related = (target.related ?? [])
    .map((r) => getTarget(r))
    .filter(Boolean) as NonNullable<ReturnType<typeof getTarget>>[];

  const faqs = [
    {
      q: `Come comprimo un'immagine a ${size}?`,
      a: `Trascina la foto nello strumento qui sopra e regola la qualità finché il file scende a ${size} o meno. Tutto avviene nel browser, senza caricare nulla su alcun server.`,
    },
    {
      q: "Le mie foto vengono caricate su un server?",
      a: "No. La compressione avviene interamente nel tuo browser, sul tuo dispositivo. Le immagini non lasciano mai il computer o lo smartphone.",
    },
    {
      q: "È gratis e senza registrazione?",
      a: "Sì, è completamente gratuito e non serve creare un account. Puoi comprimere quante immagini vuoi, senza filigrane.",
    },
    {
      q: "Quali formati posso comprimere?",
      a: "Puoi comprimere JPG, PNG, WebP e GIF. Il formato originale viene mantenuto nel file risultante.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SammaPix", item: `${APP_URL}/it` },
          { "@type": "ListItem", position: 2, name: "Comprimi a dimensione", item: `${APP_URL}/it/comprimi-a-dimensione` },
          { "@type": "ListItem", position: 3, name: `A ${size}`, item: itUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const steps = [
    `Apri lo strumento e trascina la tua immagine nell'area di caricamento. Sono supportati JPG, PNG, WebP e GIF.`,
    `Regola il cursore della qualità finché il peso del file arriva a ${size} o meno. Qualità più bassa, file più leggero.`,
    `Scarica subito l'immagine compressa. Tutto avviene nel browser: le tue foto non lasciano mai il dispositivo.`,
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#191919]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 pt-6">
        <div className="max-w-3xl mx-auto">
          <ol className="flex items-center gap-1.5 text-xs text-[#A3A3A3]">
            <li><Link href="/it" className="hover:text-[#525252] transition-colors">SammaPix</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/it/comprimi-a-dimensione" className="hover:text-[#525252] transition-colors">Comprimi a dimensione</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-[#525252]">A {size}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-10 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Comprimi immagine a {size}, gratis e nel browser
          </h1>
          <p className="text-sm text-[#737373] leading-relaxed mb-6 max-w-xl">
            Riduci il peso delle tue foto esattamente a {size} senza caricarle su nessun server.
            Tutto avviene nel tuo browser: gratis, veloce e privato.
          </p>
          <a
            href="#tool"
            className="inline-flex items-center gap-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors"
          >
            Comprimi a {size} ora <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* Tool */}
      <section id="tool" className="border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <CompressTargetToolEmbed targetKB={Math.round(target.sizeBytes / 1024)} />
      </section>

      {/* Come funziona */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Come comprimere a {size}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((text, i) => (
              <div key={i} className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mb-4">
                  <span className="text-xs font-semibold text-[#525252]">{i + 1}</span>
                </div>
                <p className="text-sm text-[#737373] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">Domande frequenti</h2>
          <div className="space-y-0">
            {faqs.map((f, i) => (
              <div key={i} className="py-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0">
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{f.q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Correlate */}
      {related.length > 0 && (
        <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">Comprimi ad altre dimensioni</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/it/comprimi-a/${r.slug}`}
                  className="group p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#404040] transition-colors"
                >
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">Comprimi a {r.sizeLabel}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Perché SammaPix */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">Perché SammaPix</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "100% privato", desc: "La compressione avviene nel tuo browser. Le immagini non lasciano mai il dispositivo, niente viene caricato su alcun server." },
              { icon: Zap, title: "Risultato immediato", desc: "Nessuna attesa per l'elaborazione sul server. Comprimi le foto in un istante usando l'hardware del tuo dispositivo." },
              { icon: Download, title: "Gratis, senza limiti", desc: "Comprimi quante immagini vuoi. Nessuna filigrana, nessuna registrazione, nessun limite giornaliero." },
            ].map((item) => (
              <div key={item.title} className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <item.icon className="h-4 w-4 text-[#525252] mb-3" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{item.title}</p>
                <p className="text-sm text-[#737373] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
