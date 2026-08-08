import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "eu-ai-act-ki-inhalte-kennzeichnen";
const URL = `${APP_URL}/de/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "EU AI Act: KI-Inhalte kennzeichnen? Guide 2026",
  description:
    "Seit 2. August 2026 gilt Art. 50 des EU AI Act: Anbieter brauchen maschinenlesbare Markierungen, Deployer eine sichtbare Offenlegung. Wer muss was kennzeichnen, welche Ausnahmen gibt es und wie geht das gratis?",
  alternates: {
    canonical: URL,
    languages: {
      en: "https://www.sammapix.com/blog/eu-ai-act-label-ai-content",
      it: "https://www.sammapix.com/it/blog/etichetta-contenuti-ai-obbligo-ue",
      de: "https://www.sammapix.com/de/blog/eu-ai-act-ki-inhalte-kennzeichnen",
      fr: "https://www.sammapix.com/fr/blog/ai-act-etiqueter-contenu-ia",
      es: "https://www.sammapix.com/es/blog/ley-ia-etiquetar-contenido-ia",
      "x-default": "https://www.sammapix.com/blog/eu-ai-act-label-ai-content",
    },
  },
  keywords: [
    "EU AI Act KI-Inhalte kennzeichnen",
    "Artikel 50 AI Act Deutschland",
    "KI-generierte Bilder Kennzeichnungspflicht",
    "Made with AI Label Pflicht",
    "Deepfake Offenlegungspflicht EU",
    "KI Transparenzpflicht 2026",
  ],
  openGraph: {
    title: "EU AI Act: KI-Inhalte kennzeichnen? Guide 2026",
    description:
      "Seit 2. August 2026 sind die Transparenzregeln des EU AI Act in Kraft. Wer KI-generierte Bilder, Videos oder Audio veröffentlicht, muss sie kenntlich machen. Der vollständige Guide.",
    url: URL,
    type: "article",
    locale: "de_DE",
    publishedTime: "2026-08-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EU AI Act: KI-Inhalte kennzeichnen? Guide 2026",
    description:
      "Art. 50 des EU AI Act verlangt seit 2. August 2026 sichtbare Kennzeichnungen für KI-Inhalte. Wer ist betroffen, welche Ausnahmen gelten und wie setzt man das gratis um?",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "de",
  headline: "EU AI Act: KI-Inhalte kennzeichnen? Guide 2026",
  description:
    "Vollständiger Guide zu Art. 50 des EU AI Act: Wer muss KI-generierte Bilder, Videos und Audioinhalte kennzeichnen, welche Ausnahmen existieren, welche Fristen gelten und wie setzt man die Kennzeichnungspflicht kostenlos im Browser um.",
  url: URL,
  datePublished: "2026-08-08",
  dateModified: "2026-08-08",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/de/ueber-uns",
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
    { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}/de` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/de/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "EU AI Act: KI-Inhalte kennzeichnen?",
      item: URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "de",
  mainEntity: [
    {
      "@type": "Question",
      name: "Muss ich KI-generierte Bilder kennzeichnen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In vielen Fällen ja, wenn du derjenige bist, der sie veröffentlicht (Deployer). Art. 50 des EU AI Act verlangt, dass synthetische oder erheblich manipulierte Bilder, Videos und Audioinhalte mit einer für Menschen wahrnehmbaren Offenlegung versehen werden. Diese Pflicht gilt seit dem 2. August 2026. Ausgenommen sind Inhalte in eindeutig künstlerischen, kreativen oder satirischen Kontexten, bei denen eine abgeschwächte Kennzeichnung genügt.",
      },
    },
    {
      "@type": "Question",
      name: "Reicht ein unsichtbares Wasserzeichen oder brauche ich auch eine sichtbare Kennzeichnung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beides ist nötig, aber für unterschiedliche Akteure. Die maschinenlesbare Markierung (etwa SynthID von Google DeepMind) ist eine Pflicht des Anbieters (Providers): Er muss ein eingebettetes Signal liefern, das automatisierte Systeme erkennen können. Die für Menschen sichtbare Kennzeichnung ist hingegen eine Pflicht des Deployers, also desjenigen, der den Inhalt veröffentlicht. Eine unsichtbare Markierung allein erfüllt die menschliche Offenlegungspflicht nicht.",
      },
    },
    {
      "@type": "Question",
      name: "Was gilt für künstlerische oder satirische Inhalte?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für eindeutig künstlerische, kreative oder satirische Werke entfällt die Kennzeichnungspflicht nicht vollständig, sie wird aber abgemildert. Die Vorschrift sieht vor, dass die Offenlegung das Erleben des Werks nicht beeinträchtigen soll. Ein dezenter Hinweis in einer Ecke des Bildes oder eine Notiz in der Bildunterschrift reicht aus. Ein vollflächiger Warnhinweis ist nicht erforderlich.",
      },
    },
    {
      "@type": "Question",
      name: "Gilt die Kennzeichnungspflicht auch für Creator und Influencer, die kein Unternehmen haben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die Transparenzregeln des Art. 50 gelten für alle Deployer, also für jeden, der ein KI-System zur Inhaltserstellung und Veröffentlichung in einem professionellen oder kommerziellen Kontext nutzt. Creator, Influencer und Agenturen fallen in diese Kategorie. Privatpersonen, die KI ausschließlich für den persönlichen Gebrauch nutzen und Inhalte nicht öffentlich verbreiten, sind nicht betroffen.",
      },
    },
    {
      "@type": "Question",
      name: "Gilt der EU AI Act auch für Unternehmen außerhalb der EU?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Der EU AI Act hat eine extraterritoriale Reichweite vergleichbar mit der DSGVO. Er gilt immer dann, wenn ein KI-System auf dem EU-Markt bereitgestellt wird oder seine Ausgaben Nutzer innerhalb der EU erreichen, unabhängig vom Sitz des Anbieters oder Deployers.",
      },
    },
    {
      "@type": "Question",
      name: "Wie füge ich kostenlos ein 'Made with AI'-Label zu meinen Bildern hinzu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nutze das AI-Label-Tool von SammaPix: Bild hochladen, Position und Stil des Labels wählen, beschriftetes Bild herunterladen. Alles läuft im Browser, ohne Upload auf externe Server und ohne Registrierung. Das Tool ist kostenlos.",
      },
    },
    {
      "@type": "Question",
      name: "Was passiert bei Verstößen gegen die Kennzeichnungspflicht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der EU AI Act sieht ein abgestuftes Sanktionssystem vor. Verstöße gegen die Transparenzpflichten, einschließlich Art. 50, fallen in den Anwendungsbereich dieses Systems. Zuständig sind die nationalen Marktüberwachungsbehörden der jeweiligen EU-Mitgliedstaaten. Neben möglichen Bußgeldern besteht das Risiko erheblicher Reputationsschäden durch nicht deklarierte KI-Inhalte.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BlogArticleLayout
        locale="de"
        title="EU AI Act: KI-Inhalte kennzeichnen? Guide 2026"
        slug={SLUG}
        description="Seit dem 2. August 2026 sind die Transparenzregeln des Art. 50 des EU AI Act in vollem Umfang anwendbar. Wer KI-generierte oder erheblich manipulierte Bilder, Videos oder Audioinhalte veröffentlicht, ist zur Kennzeichnung verpflichtet. Dieser Guide erklärt, wer genau betroffen ist, welche Ausnahmen wirklich gelten, welche Fristen zu beachten sind und wie man die Pflicht kostenlos und in wenigen Sekunden erfüllt."
        date="2026-08-08"
        dateFormatted="8. August 2026"
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "schnellantwort", title: "Die Schnellantwort" },
          { id: "was-sagt-art-50", title: "Was Art. 50 des EU AI Act sagt" },
          { id: "wen-es-betrifft", title: "Wen die Pflicht konkret betrifft" },
          { id: "ausnahmen", title: "Die gesetzlichen Ausnahmen" },
          { id: "fristen", title: "Fristen und wichtige Daten" },
          { id: "sanktionen", title: "Sanktionen bei Nichteinhaltung" },
          { id: "so-kennzeichnen", title: "So kennzeichnet man Bilder richtig" },
          { id: "uebersicht", title: "Übersicht der Kennzeichnungspflichten" },
          { id: "faq", title: "Häufige Fragen" },
        ]}
        summary={[
          "Seit 2. August 2026 verlangt Art. 50 des EU AI Act Transparenz bei KI-generierten oder erheblich manipulierten Inhalten.",
          "Anbieter (Provider) müssen eine maschinenlesbare Markierung in den Inhalt einbetten.",
          "Wer Inhalte veröffentlicht (Deployer), muss zusätzlich eine für Menschen wahrnehmbare Offenlegung sicherstellen.",
          "Betroffen sind Marketer, Agenturen, Creator, E-Commerce-Betreiber, Verlage und Unternehmen jeder Größe.",
          "Für künstlerische, kreative und satirische Werke gilt eine abgemilderte, aber nicht entfallende Pflicht.",
          "Mit dem kostenlosen KI-Label-Tool von SammaPix lässt sich eine sichtbare Kennzeichnung direkt im Browser hinzufügen.",
        ]}
        heroImage={
          <figure>
            <Link href="/de/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Foto von Luca Sammarco, Gründer von SammaPix, bei der Arbeit mit visuellen Inhalten"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              KI-Bilder zu erstellen ist schnell. Sie korrekt zu kennzeichnen ist der Teil, den viele
              übersehen. Foto aus dem{" "}
              <Link href="/de/portfolio" className="underline">
                Portfolio
              </Link>
              .
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              &bdquo;Made with AI&ldquo;-Label in Sekunden hinzufügen
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Bild in das AI-Label-Tool von SammaPix laden, Position und Stil wählen, beschriftetes
              Bild herunterladen. Alles im Browser, ohne Upload auf externe Server, ohne
              Registrierung. Kostenlos.
            </p>
            <Link
              href="/tools/ai-label"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Bild jetzt kennzeichnen, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* SCHNELLANTWORT                                                       */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="schnellantwort"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Die Schnellantwort
        </h2>
        <p>
          Ja, in vielen Fällen bist du verpflichtet, KI-generierte Inhalte zu kennzeichnen, bevor
          du sie veröffentlichst. Seit dem <strong>2. August 2026</strong> sind die
          Transparenzbestimmungen des{" "}
          <strong>Art. 50 der EU-Verordnung über Künstliche Intelligenz</strong> (EU AI Act) in
          vollem Umfang anwendbar. Wenn du als Agentur, Creator, Marke oder Unternehmen
          KI-Werkzeuge einsetzt, um Bilder, Videos oder Audioinhalte für die Veröffentlichung zu
          erstellen, bist du von diesen Pflichten betroffen.
        </p>
        <p>
          Wer sofort handeln möchte:{" "}
          <Link href="/tools/ai-label" className="underline">
            das AI-Label-Tool von SammaPix
          </Link>{" "}
          fügt eine sichtbare Kennzeichnung direkt im Browser zu Bildern hinzu, kostenlos und ohne
          Dateiupload auf externe Server. Lies weiter, um zu verstehen, warum das notwendig ist und
          wann die Ausnahmen tatsächlich greifen.
        </p>
        <p className="text-xs text-gray-500 dark:text-[#A3A3A3] border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-4">
          Hinweis: Dieser Artikel dient der allgemeinen Information und stellt keine Rechtsberatung
          dar. Für eine Bewertung deiner konkreten Situation wende dich an eine qualifizierte
          Fachkraft.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* WAS SAGT ART. 50                                                    */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="was-sagt-art-50"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Was Art. 50 des EU AI Act sagt
        </h2>
        <p>
          Der EU AI Act (Verordnung (EU) 2024/1689) widmet seinen Artikel 50 der{" "}
          <strong>Transparenz bei bestimmten KI-Systemen</strong>. Der Mechanismus funktioniert auf
          zwei unterschiedlichen Ebenen mit verschiedenen Pflichten, je nachdem welche Rolle du in
          der Produktions- und Verbreitungskette des Inhalts einnimmst.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Die Anbieterebene: maschinenlesbare Markierung
        </h3>
        <p>
          Wer ein generatives KI-System entwickelt und vermarktet (der Provider), ist verpflichtet
          sicherzustellen, dass vom System erzeugte Inhalte eine{" "}
          <strong>maschinenlesbare Markierung</strong> tragen, die so eingebettet ist, dass sie
          gängige Verarbeitungsschritte wie Größenanpassung oder Komprimierung übersteht.
          Technologien wie SynthID von Google DeepMind fallen in diese Kategorie: Sie fügen ein
          steganografisches Signal hinzu, das für das menschliche Auge unsichtbar ist, aber von
          automatisierten Systemen erkannt werden kann. Diese Pflicht liegt bei Anbietern von
          Werkzeugen wie Midjourney, DALL-E, Stable Diffusion und vergleichbaren Systemen.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Die Deployer-Ebene: wahrnehmbare Offenlegung
        </h3>
        <p>
          Wer diese Systeme nutzt, um Inhalte zu erstellen und sie anschließend veröffentlicht (der
          Deployer), hat eine zusätzliche und separate Pflicht: sicherzustellen, dass der Inhalt
          eine <strong>für Menschen wahrnehmbare Offenlegung</strong> trägt. Die unsichtbare
          Markierung des Providers allein reicht nicht. Eine Person, die das Bild oder Video sieht,
          muss erkennen können, dass es sich um einen synthetischen oder erheblich manipulierten
          Inhalt handelt. Die konkrete Form dieser Offenlegung ist in der Norm nicht starr
          vorgegeben: Die Verordnung spricht von einer Kennzeichnung &bdquo;in angemessener und
          wahrnehmbarer Weise&ldquo;. In der Praxis erfüllt ein sichtbares Label wie &bdquo;Made
          with AI&ldquo; oder &bdquo;Mit KI erstellt&ldquo; auf dem Bild oder in der Bildunterschrift
          diese Anforderung.
        </p>
        <p>
          Beide Ebenen sind nicht austauschbar. Wenn du ein Bild veröffentlichst, das bereits die
          unsichtbare Markierung des Providers enthält, hast du deine Deployer-Pflicht damit noch
          nicht erfüllt. Du musst zusätzlich etwas bereitstellen, das eine Person ohne spezielle
          Werkzeuge lesen oder wahrnehmen kann.
        </p>
        <p>
          Die Norm gilt insbesondere für Bilder, Videos und Audioinhalte, die entweder{" "}
          <strong>vollständig von KI generiert</strong> wurden oder in einem Maß{" "}
          <strong>manipuliert</strong> wurden, das den realen Inhalt erheblich verändert, was
          umgangssprachlich oft als Deepfake bezeichnet wird. Dazu gehören auch Inhalte, die echte
          Personen in Situationen, an Orten oder bei Handlungen zeigen, die tatsächlich nie
          stattgefunden haben.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* WEN ES BETRIFFT                                                      */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="wen-es-betrifft"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Wen die Pflicht konkret betrifft
        </h2>
        <p>
          Die häufigste Frage lautet: Gilt das wirklich für mich? Die Antwort hängt davon ab, was
          du veröffentlichst und in welchem Kontext. Hier die relevantesten Kategorien mit konkreten
          Beispielen.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Marketing und Agenturen
        </h3>
        <p>
          Wer mit Midjourney oder Adobe Firefly Bilder für eine Werbekampagne produziert und diese
          auf Social Media, im Display-Bereich oder auf Printmaterialien verwendet, ist Deployer.
          Die Bilder müssen eine sichtbare Offenlegung tragen. Das gilt sowohl für organische Posts
          als auch für bezahlte Anzeigen, bei denen einige Plattformen bereits beim Upload nach
          einer entsprechenden Deklaration fragen.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Creator und Influencer
        </h3>
        <p>
          Ein Creator, der Hintergründe, Illustrationen oder ganze Szenen mit KI-Werkzeugen
          erstellt und als Kanal-Inhalt veröffentlicht, fällt in diese Kategorie. Ein formales
          Unternehmen ist dafür nicht nötig: Das Kriterium ist der professionelle oder
          halbprofessionelle Kontext der Veröffentlichung. Wer KI nutzt, um Storys, Posts oder
          Videos zu erstellen, die Produkte oder Dienstleistungen bewerben, auch im Rahmen von
          Markenkooperationen, unterliegt der Kennzeichnungspflicht.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          E-Commerce mit KI-Produktbildern
        </h3>
        <p>
          Ein Onlineshop, der KI-Werkzeuge einsetzt, um Produktfotos zu erstellen (synthetische
          Hintergründe, generierte Modelle, von Grund auf erstellte Lifestyle-Szenen), veröffentlicht
          im Rechtssinne synthetische Bilder. Auch hier ist die Offenlegung vorgeschrieben. Der
          Punkt ist nicht, dass das Bild im täuschenden Sinn &bdquo;falsch&ldquo; ist, sondern dass
          es von einem KI-System generiert wurde.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Verlage und Blogs mit KI-Illustrationen
        </h3>
        <p>
          Eine Nachrichtenwebsite, ein digitales Magazin oder ein Blog, das KI-generierte
          Illustrationen als Aufmacher- oder Begleitbilder zu Artikeln verwendet, muss das
          wahrnehmbar kenntlich machen. Eine Bildunterschrift wie &bdquo;Illustration erstellt mit
          Künstlicher Intelligenz&ldquo; oder ein Label auf dem Bild selbst erfüllt die Anforderung.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Unternehmen mit Chatbots und Sprachassistenten
        </h3>
        <p>
          Art. 50 deckt auch Konversationssysteme ab. Wenn ein Unternehmen einen Chatbot auf seiner
          Website betreibt, muss der Nutzer wissen, dass er mit einem automatisierten System
          interagiert und nicht mit einem Menschen, sofern das nicht aus dem Kontext offensichtlich
          ist. Diese Pflicht ist von der Bildkennzeichnung getrennt, aber für viele Unternehmen
          gleichermaßen relevant.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Social-Media-Manager
        </h3>
        <p>
          Wer im Auftrag eines Unternehmens oder einer Marke Social-Media-Kanäle verwaltet und
          dabei KI-generierte Bilder oder Videos einsetzt, trägt als Deployer die Kennzeichnungspflicht.
          Diese Pflicht lässt sich nicht einfach auf das Unternehmen oder den Kunden abwälzen, wenn
          man selbst denjenigen veröffentlicht, ohne eine Offenlegung beizufügen.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* AUSNAHMEN                                                            */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="ausnahmen"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Die gesetzlichen Ausnahmen
        </h2>
        <p>
          Die Verordnung ist nicht kontextblind. Es gibt Situationen, in denen die Pflichten
          abgemildert werden oder nicht in vollem Umfang gelten.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Inhalte mit menschlicher Überarbeitung und redaktioneller Verantwortung
        </h3>
        <p>
          Wenn ein KI-generierter Text oder Inhalt von einem Menschen substanziell überarbeitet wurde
          und dieser die volle redaktionelle Verantwortung übernimmt, ändert sich die Situation. Die
          Offenlegungspflicht vermindert sich, wenn der KI-Beitrag ein Hilfswerkzeug ist und nicht
          die Hauptquelle des endgültigen Inhalts. Wer die KI als Entwurf nutzt und danach tiefgreifend
          umschreibt und überarbeitet, schafft ein redaktionelles Werk und kein Systemprodukt. Die
          Grenze ist subjektiv, weshalb dieser Bereich noch auf konkretisierende Leitlinien wartet.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Strafverfolgung und nationale Sicherheit
        </h3>
        <p>
          Systeme, die von Strafverfolgungsbehörden oder aus Gründen der nationalen Sicherheit
          eingesetzt werden, genießen spezifische Ausnahmen, die außerhalb des kommerziellen und
          kreativen Kontexts dieses Guides liegen.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Künstlerische, kreative, satirische und fiktive Werke
        </h3>
        <p>
          Das ist die Ausnahme, die Creator am meisten interessiert. Für eindeutig künstlerische,
          kreative, satirische oder fiktive Werke sieht die Norm vor, dass die Offenlegung zwar
          gefordert wird, aber das Erleben des Werks nicht beeinträchtigen darf. Das bedeutet: Du
          musst einen Kurzfilm nicht mit einem Vollbild-Warnhinweis unterbrechen, noch musst du
          eine künstlerische Illustration mit einem aufdringlichen Label überdecken. Ein dezenter
          Hinweis in einer Ecke des Bildes, in der Bildunterschrift oder im Abspann des Werks ist
          ausreichend. Die Pflicht entfällt nicht, sie passt sich an.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Persönliche, nicht vertriebene Nutzung
        </h3>
        <p>
          Wer KI-Werkzeuge nutzt, um Bilder ausschließlich für den persönlichen Gebrauch zu
          erstellen und sie nicht öffentlich verbreitet, unterliegt nicht den Deployer-Pflichten.
          Wer Hintergründe für den eigenen Desktop oder Illustrationen erstellt, die das eigene
          Gerät nie verlassen, befindet sich außerhalb des Anwendungsbereichs der Norm.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* FRISTEN                                                              */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="fristen"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Fristen und wichtige Daten
        </h2>
        <p>
          Der EU AI Act ist am 2. August 2024 in Kraft getreten. Seine Bestimmungen gelten
          stufenweise, mit unterschiedlichen Daten für verschiedene Kategorien von Pflichten.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>2. August 2026:</strong> Die Transparenzregeln des Art. 50 werden anwendbar.
            Das umfasst die für Menschen wahrnehmbare Offenlegungspflicht für Deployer synthetischer
            Inhalte. Ab diesem Datum gilt die Kennzeichnungspflicht vollständig.
          </li>
          <li>
            <strong>2. Dezember 2026:</strong> Frist für die Konformität mit den Vorschriften zur
            maschinenlesbaren Markierung (Art. 50 Abs. 2) für KI-Systeme, die bereits vor dem
            2. August 2026 auf dem Markt waren. Neu eingeführte Systeme unterliegen der Pflicht
            vom ersten Tag an.
          </li>
        </ul>
        <p className="mt-3">
          In der Praxis heißt das: Wenn du heute Midjourney oder ein anderes KI-Werkzeug verwendest,
          um Bilder zu generieren, die du veröffentlichst, ist die Pflicht zur sichtbaren Kennzeichnung
          bereits aktiv. Es gibt keine weitere Schonfrist für den Teil, der die wahrnehmbare
          Offenlegung betrifft.
        </p>
        <p>
          Die offiziellen Quellen findest du auf der Website der Europäischen Kommission zur{" "}
          <a
            href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Digitalen Strategie und zum Rechtsrahmen für KI
          </a>{" "}
          sowie im{" "}
          <a
            href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Volltext der Verordnung auf EUR-Lex
          </a>
          , der Art. 50 mit allen technischen Details enthält.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SANKTIONEN                                                           */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="sanktionen"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Sanktionen bei Nichteinhaltung
        </h2>
        <p>
          Der EU AI Act sieht eine gestufte Sanktionsstruktur vor, die proportional zur Schwere des
          Verstoßes ist. Die höchsten Sanktionen betreffen verbotene oder hochriskante KI-Systeme,
          aber Verstöße gegen die Transparenzpflichten, darunter Art. 50, fallen ebenfalls in den
          Anwendungsbereich des Sanktionssystems der Verordnung.
        </p>
        <p>
          Die Vollstreckung liegt bei den nationalen zuständigen Behörden, die jeder Mitgliedstaat
          benennen muss. Das institutionelle Aufsichtsrahmen befindet sich in einigen Ländern noch
          im Aufbau. Das bedeutet nicht, dass die Regeln nicht gelten: Es bedeutet, dass sich das
          System mit der Zeit festigen wird, so wie es beim DSGVO der Fall war.
        </p>
        <p>
          Das kurzfristig größte Risiko ist nicht unbedingt ein Bußgeld, sondern der
          Vertrauensverlust beim Publikum und die Reputationsfolgen aus nicht deklarierten
          KI-Inhalten in einem Moment, in dem die öffentliche Sensibilität für das Thema hoch ist.
          Jetzt konform zu werden kostet fast nichts. Es nicht zu tun kann einen erheblichen
          Reputationsschaden bedeuten.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SO KENNZEICHNET MAN BILDER                                          */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="so-kennzeichnen"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          So kennzeichnet man KI-Bilder richtig
        </h2>
        <p>
          Für Bilder ist der praktischste und direkteste Weg, ein sichtbares Label wie &bdquo;Made
          with AI&ldquo; oder &bdquo;Mit KI erstellt&ldquo; hinzuzufügen. Eine verbindliche Formel
          gibt es nicht: Entscheidend ist, dass die Kennzeichnung für eine Person wahrnehmbar ist,
          die den Inhalt betrachtet. Du kannst das Label in der unteren rechten Ecke platzieren,
          wie bei Wasserzeichen üblich, oder in der Bildunterschrift auf Social Media und Blogs.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Das AI-Label-Tool von SammaPix verwenden
        </h3>
        <p>
          Der schnellste Weg, das Label hinzuzufügen, ist das{" "}
          <Link href="/tools/ai-label" className="underline">
            AI-Label-Tool von SammaPix
          </Link>
          . Es läuft vollständig im Browser: Du musst nichts installieren, für den Grundbetrieb
          kein Konto erstellen, und dein Bild wird auf keinen externen Server hochgeladen. Der
          Ablauf in drei Schritten:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-3">
          <li>
            Das KI-generierte Bild in das Tool laden (Datei hineinziehen oder per Klick auswählen).
          </li>
          <li>
            Position, Stil und Text des Labels wählen. Du kannst den vordefinierten Text &bdquo;Made
            with AI&ldquo; verwenden oder ihn anpassen.
          </li>
          <li>Das beschriftete Bild herunterladen, bereit zur Veröffentlichung.</li>
        </ol>
        <p className="mt-3">
          Wenn du neben dem KI-Label auch einen Markenaufdruck oder ein Logo auf dem Bild
          platzieren möchtest, kannst du das kombinieren mit{" "}
          <Link href="/tools/stampit" className="underline">
            StampIt
          </Link>
          , das benutzerdefinierte Stempel und Wasserzeichen zu Bildern hinzufügt, ebenfalls
          direkt im Browser.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Native Plattformfunktionen auf Social Media
        </h3>
        <p>
          Instagram, LinkedIn und YouTube haben bereits eigene Optionen eingeführt, um KI-Inhalte
          beim Upload zu deklarieren. Diese Funktionen zu nutzen ist ein positives Signal, aber
          Vorsicht: Manche Plattformen zeigen die Deklaration nur in bestimmten Kontexten oder nur
          eingeloggten Nutzern an. Ein sichtbares Label direkt auf dem Bild bleibt die robusteste
          und plattformunabhängige Lösung.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Für Blogs und redaktionelle Websites
        </h3>
        <p>
          Wenn du KI-Illustrationen auf einer Website oder einem Blog veröffentlichst, ist eine
          explizite Bildunterschrift der einfachste Weg. Etwas wie &bdquo;Illustration erstellt mit
          Künstlicher Intelligenz&ldquo; reicht aus. Wenn du eine visuellere Lösung bevorzugst,
          ist das Label direkt auf dem Bild vorzuziehen, weil es auch dann funktioniert, wenn das
          Bild außerhalb seines ursprünglichen Kontexts geteilt wird, ohne die Bildunterschrift.
        </p>
        <p>
          Wenn du außerdem prüfen möchtest, ob deine Bilder vor der Veröffentlichung sensible
          Metadaten enthalten, kannst du das{" "}
          <Link href="/tools/exif" className="underline">
            EXIF-Tool von SammaPix
          </Link>{" "}
          verwenden, das Metadaten direkt im Browser anzeigt und entfernt.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* ÜBERSICHT                                                            */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="uebersicht"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Übersicht der Kennzeichnungspflichten
        </h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Art des Inhalts
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Offenlegungspflicht
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Geforderte Form
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  KI-Bild in einer Werbekampagne
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Ja, vollständig
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Sichtbares, wahrnehmbares Label
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  KI-Video auf einem Social-Media-Kanal (Marke oder Creator)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Ja, vollständig
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Sichtbares Label oder Erklärung in der Beschreibung
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  KI-Illustration in einem Blogartikel oder redaktionellen Beitrag
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Ja
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Label auf dem Bild oder explizite Bildunterschrift
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Künstlerisches oder satirisches Werk mit KI-Anteil
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Ja, abgemildert
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Dezentes Label oder Vermerk im Abspann
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Inhalt mit substanzieller menschlicher redaktioneller Überarbeitung
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Unsicher (abhängig vom Grad der Überarbeitung)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Im Einzelfall zu prüfen
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Persönliche Nutzung ohne öffentliche Verbreitung
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Nein
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Keine Anforderung
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FAQ                                                                  */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="faq"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Häufige Fragen
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Muss ich KI-generierte Bilder kennzeichnen?
        </h3>
        <p>
          In vielen Fällen ja, wenn du derjenige bist, der sie veröffentlicht. Art. 50 des EU AI
          Act verlangt, dass synthetische oder erheblich manipulierte Bilder, Videos und
          Audioinhalte mit einer für Menschen wahrnehmbaren Offenlegung versehen werden. Diese
          Pflicht gilt seit dem 2. August 2026. Für eindeutig künstlerische, kreative oder
          satirische Inhalte genügt eine abgeschwächte Kennzeichnung.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Reicht ein unsichtbares Wasserzeichen oder brauche ich auch eine sichtbare Kennzeichnung?
        </h3>
        <p>
          Beides ist nötig, aber für unterschiedliche Akteure. Die maschinenlesbare Markierung
          (etwa SynthID von Google DeepMind) ist eine Pflicht des Providers. Die für Menschen
          sichtbare Kennzeichnung ist eine Pflicht des Deployers. Eine unsichtbare Markierung allein
          erfüllt die menschliche Offenlegungspflicht nicht.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Was gilt für künstlerische oder satirische Inhalte?
        </h3>
        <p>
          Für eindeutig künstlerische, kreative oder satirische Werke entfällt die Pflicht nicht,
          sie wird aber abgemildert. Die Offenlegung soll das Erleben des Werks nicht
          beeinträchtigen: Ein dezenter Hinweis in einer Ecke des Bildes oder in der
          Bildunterschrift reicht aus. Ein vollflächiger Warnhinweis ist nicht erforderlich.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Gilt die Kennzeichnungspflicht auch für Creator und Influencer ohne Unternehmen?
        </h3>
        <p>
          Ja. Die Transparenzregeln des Art. 50 gelten für alle Deployer, also für jeden, der ein
          KI-System zur Inhaltserstellung und Veröffentlichung in einem professionellen oder
          kommerziellen Kontext nutzt. Creator, Influencer und Agenturen fallen in diese Kategorie.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Gilt der EU AI Act auch für Unternehmen außerhalb der EU, die in Europa veröffentlichen?
        </h3>
        <p>
          Ja. Der EU AI Act hat eine extraterritoriale Reichweite vergleichbar mit der DSGVO. Er
          gilt immer dann, wenn ein KI-System auf dem EU-Markt bereitgestellt wird oder seine
          Ausgaben Nutzer innerhalb der EU erreichen, unabhängig vom Sitz des Anbieters oder
          Deployers.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Was passiert bei Verstößen gegen die Kennzeichnungspflicht?
        </h3>
        <p>
          Der EU AI Act sieht ein abgestuftes Sanktionssystem vor. Verstöße gegen die
          Transparenzpflichten fallen in den Anwendungsbereich dieses Systems. Zuständig sind die
          nationalen Marktüberwachungsbehörden. Neben möglichen Bußgeldern besteht das Risiko
          erheblicher Reputationsschäden.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Wie füge ich kostenlos ein &bdquo;Made with AI&ldquo;-Label zu meinen Bildern hinzu?
        </h3>
        <p>
          Nutze das{" "}
          <Link href="/tools/ai-label" className="underline">
            AI-Label-Tool von SammaPix
          </Link>
          : Bild hochladen, Position und Stil des Labels wählen, beschriftetes Bild herunterladen.
          Alles im Browser, ohne Upload auf externe Server, ohne Registrierung, kostenlos. Für
          einen zusätzlichen Markenaufdruck oder ein Wasserzeichen steht{" "}
          <Link href="/tools/stampit" className="underline">
            StampIt
          </Link>{" "}
          zur Verfügung.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* VERWANDTE ARTIKEL                                                    */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">
          Verwandte Artikel
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link
              href="/de/blog/made-with-ai-label-hinzufuegen"
              className="underline"
            >
              Made-with-AI-Label zu Bildern hinzufügen (kostenlose Schritt-für-Schritt-Anleitung)
            </Link>
          </li>
          <li>
            <Link href="/tools/ai-label" className="underline">
              AI-Label-Tool direkt öffnen
            </Link>
          </li>
          <li>
            <Link href="/tools/stampit" className="underline">
              StampIt: Wasserzeichen und Stempel hinzufügen
            </Link>
          </li>
          <li>
            <Link href="/tools/exif" className="underline">
              EXIF-Daten aus Fotos entfernen
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
