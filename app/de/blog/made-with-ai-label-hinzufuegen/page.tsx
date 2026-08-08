import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "made-with-ai-label-hinzufuegen";
const URL = `${APP_URL}/de/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Made-with-AI-Label zu Bildern hinzufügen (gratis)",
  description:
    "Schritt für Schritt: So fügst du ein 'Made with AI'-Label kostenlos zu Bildern hinzu. Direkt im Browser, kein Upload, kein Konto nötig. EU AI Act konform in unter einer Minute.",
  alternates: {
    canonical: URL,
    languages: {
      en: "https://www.sammapix.com/blog/how-to-add-made-with-ai-label",
      it: "https://www.sammapix.com/it/blog/come-aggiungere-etichetta-ai-foto",
      de: "https://www.sammapix.com/de/blog/made-with-ai-label-hinzufuegen",
      fr: "https://www.sammapix.com/fr/blog/ajouter-label-made-with-ai",
      es: "https://www.sammapix.com/es/blog/anadir-etiqueta-made-with-ai",
      "x-default": "https://www.sammapix.com/blog/how-to-add-made-with-ai-label",
    },
  },
  keywords: [
    "Made with AI Label hinzufügen",
    "KI-Label Bild kostenlos",
    "KI-Kennzeichnung Foto Browser",
    "AI-Wasserzeichen Bild gratis",
    "EU AI Act Bild kennzeichnen Anleitung",
    "KI-generierte Bilder kennzeichnen Tool",
  ],
  openGraph: {
    title: "Made-with-AI-Label zu Bildern hinzufügen (gratis)",
    description:
      "Kostenlose Schritt-für-Schritt-Anleitung: Made-with-AI-Label direkt im Browser zu Bildern hinzufügen. Kein Upload, kein Konto, EU AI Act konform.",
    url: URL,
    type: "article",
    locale: "de_DE",
    publishedTime: "2026-08-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Made-with-AI-Label zu Bildern hinzufügen (gratis)",
    description:
      "So fügst du ein 'Made with AI'-Label kostenlos und im Browser zu Bildern hinzu. EU AI Act konform in unter einer Minute.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "de",
  headline: "Made-with-AI-Label zu Bildern hinzufügen (gratis)",
  description:
    "Vollständige Schritt-für-Schritt-Anleitung, um ein 'Made with AI'-Label kostenlos und direkt im Browser zu Bildern hinzuzufügen. Mit dem AI-Label-Tool von SammaPix ist man in unter einer Minute EU AI Act konform.",
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
      name: "Made-with-AI-Label zu Bildern hinzufügen",
      item: URL,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "de",
  name: "Made-with-AI-Label zu einem Bild hinzufügen",
  description:
    "Schritt-für-Schritt-Anleitung zum kostenlosen Hinzufügen eines 'Made with AI'-Labels zu einem Bild direkt im Browser mit dem AI-Label-Tool von SammaPix.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "AI-Label-Tool von SammaPix",
      url: `${APP_URL}/tools/ai-label`,
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "AI-Label-Tool öffnen",
      text: "Gehe auf sammapix.com/tools/ai-label. Das Tool läuft vollständig im Browser, kein Download erforderlich.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Bild laden",
      text: "Ziehe dein KI-generiertes Bild in den Upload-Bereich oder klicke, um es auszuwählen. Das Bild wird lokal in deinem Browser verarbeitet und nicht auf externe Server hochgeladen.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Label konfigurieren",
      text: "Wähle Text ('Made with AI' oder eigener Text), Position (unten rechts, unten links usw.), Stil und Schriftgröße. Eine Vorschau wird in Echtzeit aktualisiert.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Beschriftetes Bild herunterladen",
      text: "Klicke auf 'Herunterladen'. Das fertige Bild mit dem eingebetteten Label wird direkt in deinen Downloads gespeichert, bereit zur Veröffentlichung.",
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
      name: "Wird mein Bild beim AI-Label-Tool hochgeladen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Das AI-Label-Tool von SammaPix verarbeitet alles lokal in deinem Browser. Dein Bild verlässt deinen Computer nicht und wird auf keinen Server hochgeladen. Das ist sowohl datenschutzfreundlich als auch schnell.",
      },
    },
    {
      "@type": "Question",
      name: "Welchen Text soll das Label tragen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Es gibt keine gesetzlich vorgeschriebene Formulierung. 'Made with AI', 'KI-generiert', 'Mit Künstlicher Intelligenz erstellt' oder ähnliche Texte sind alle geeignet. Entscheidend ist, dass die Kennzeichnung für eine durchschnittliche Person wahrnehmbar ist. Der Vorschlagswert im Tool ist 'Made with AI', den du jederzeit anpassen kannst.",
      },
    },
    {
      "@type": "Question",
      name: "Wo sollte das Label auf dem Bild platziert werden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Am gebräuchlichsten ist die untere rechte Ecke, dort wo auch klassische Wasserzeichen sitzen. Die untere linke Ecke ist ebenfalls weit verbreitet. Für künstlerische Werke kann auch ein dezentes Label in einer beliebigen Ecke gewählt werden. Wichtig ist, dass es sichtbar ist und nicht vom Hauptmotiv verdeckt wird.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich mehrere Bilder auf einmal beschriften?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, mit einem kostenlosen Konto bei SammaPix kannst du Bilder im Stapel verarbeiten. Der Einzelbetrieb ist komplett kostenlos und ohne Registrierung nutzbar.",
      },
    },
    {
      "@type": "Question",
      name: "Reicht das Label auf dem Bild oder muss ich noch etwas anderes tun?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das sichtbare Label erfüllt die Deployer-Pflicht aus Art. 50 des EU AI Act. Die Pflicht zur maschinenlesbaren Markierung liegt beim Anbieter des KI-Systems (z. B. Midjourney), nicht bei dir als Nutzer. Zusätzlich kannst du auf Social-Media-Plattformen die nativen KI-Deklarationsfunktionen nutzen, was als gute Praxis gilt.",
      },
    },
    {
      "@type": "Question",
      name: "Muss ich für jedes KI-generierte Bild ein Label hinzufügen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, für jeden Inhalt, den du in einem professionellen oder kommerziellen Kontext veröffentlichst und der vollständig KI-generiert oder erheblich KI-manipuliert ist. Ausnahmen gelten für rein persönliche, nicht öffentlich vertriebene Nutzung sowie für bestimmte künstlerische Werke, bei denen eine abgeschwächte Form der Offenlegung ausreicht.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BlogArticleLayout
        locale="de"
        title="Made-with-AI-Label zu Bildern hinzufügen (gratis)"
        slug={SLUG}
        description="Seit dem 2. August 2026 schreibt der EU AI Act vor, dass KI-generierte Bilder für Menschen kenntlich gemacht werden müssen. In dieser Anleitung zeigen wir Schritt für Schritt, wie du ein 'Made with AI'-Label kostenlos, direkt im Browser und ohne Dateiupload zu deinen Bildern hinzufügst. Bereit in unter einer Minute."
        date="2026-08-08"
        dateFormatted="8. August 2026"
        tags={["Tools", "Workflow"]}
        readingTime={7}
        headings={[
          { id: "warum-kennzeichnen", title: "Warum KI-Bilder kennzeichnen?" },
          { id: "schritt-fuer-schritt", title: "Schritt für Schritt: Label hinzufügen" },
          { id: "label-text-position", title: "Text, Position und Stil wählen" },
          { id: "stapelverarbeitung", title: "Mehrere Bilder auf einmal beschriften" },
          { id: "alternativen", title: "Alternativen und ergänzende Werkzeuge" },
          { id: "best-practices", title: "Best Practices für die Kennzeichnung" },
          { id: "faq", title: "Häufige Fragen" },
        ]}
        summary={[
          "Seit 2. August 2026 verlangt Art. 50 des EU AI Act eine für Menschen wahrnehmbare Kennzeichnung von KI-generierten Bildern.",
          "Das AI-Label-Tool von SammaPix ermöglicht das Hinzufügen eines Labels direkt im Browser: kein Upload, kein Konto für den Einzelbetrieb nötig.",
          "Wähle Text, Position, Stil und Schriftgröße frei. Der Standardtext 'Made with AI' ist jederzeit anpassbar.",
          "Für Stapelverarbeitung mehrerer Bilder steht ein kostenloses Konto zur Verfügung.",
          "Das sichtbare Label erfüllt die Deployer-Pflicht. Die maschinenlesbare Markierung ist Aufgabe des KI-Anbieters.",
          "Native Plattformfunktionen auf Social Media sind eine sinnvolle Ergänzung, ersetzen aber kein eingebettetes Label.",
        ]}
        heroImage={
          <figure>
            <Link href="/de/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Foto von Luca Sammarco, Gründer von SammaPix, bei der Arbeit mit digitalen Bildwerkzeugen"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Ein einfaches Label macht den Unterschied zwischen Compliance und Verstoß. Foto aus dem{" "}
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
              KI-Label jetzt kostenlos hinzufügen
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Bild hochladen, Label konfigurieren, herunterladen. Alles im Browser, ohne Upload auf
              externe Server, ohne Registrierung. Das AI-Label-Tool von SammaPix ist kostenlos.
            </p>
            <Link
              href="/tools/ai-label"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              AI-Label-Tool öffnen, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* WARUM KENNZEICHNEN                                                   */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="warum-kennzeichnen"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Warum müssen KI-Bilder gekennzeichnet werden?
        </h2>
        <p>
          Seit dem <strong>2. August 2026</strong> sind die Transparenzpflichten des{" "}
          <strong>Art. 50 des EU AI Act</strong> (Verordnung (EU) 2024/1689) in vollem Umfang
          anwendbar. Die Verordnung verpflichtet diejenigen, die KI-generierte oder erheblich
          manipulierte Bilder, Videos oder Audioinhalte veröffentlichen (sogenannte Deployer), dazu,
          diese Inhalte in einer für Menschen wahrnehmbaren Weise kenntlich zu machen.
        </p>
        <p>
          Das ist kein bürokratischer Formalakt. Es geht darum, dass Menschen, die einen Inhalt
          sehen, die Möglichkeit haben zu erkennen, dass er synthetischen Ursprungs ist. Angesichts
          der Verbreitung hochqualitativer KI-generierter Bilder ist das eine berechtigte
          gesellschaftliche Erwartung und mittlerweile auch eine rechtliche Pflicht.
        </p>
        <p>
          Wer mehr über den rechtlichen Hintergrund, die genaue Abgrenzung von Provider- und
          Deployer-Pflichten sowie die geltenden Ausnahmen erfahren möchte, findet alle Details im
          Artikel{" "}
          <Link href="/de/blog/eu-ai-act-ki-inhalte-kennzeichnen" className="underline">
            EU AI Act: KI-Inhalte kennzeichnen? Guide 2026
          </Link>
          .
        </p>
        <p className="text-xs text-gray-500 dark:text-[#A3A3A3] border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-4">
          Hinweis: Dieser Artikel dient der allgemeinen Information und stellt keine Rechtsberatung
          dar. Für eine Bewertung deiner konkreten Situation wende dich an eine qualifizierte
          Fachkraft.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SCHRITT FÜR SCHRITT                                                  */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="schritt-fuer-schritt"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Schritt für Schritt: Made-with-AI-Label hinzufügen
        </h2>
        <p>
          Das{" "}
          <Link href="/tools/ai-label" className="underline">
            AI-Label-Tool von SammaPix
          </Link>{" "}
          ist der schnellste Weg, ein sichtbares KI-Label zu einem Bild hinzuzufügen. Es läuft
          vollständig im Browser, installiert nichts auf deinem Gerät und lädt dein Bild nicht auf
          externe Server hoch. Hier ist der vollständige Ablauf.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Schritt 1: Tool öffnen
        </h3>
        <p>
          Gehe direkt auf{" "}
          <Link href="/tools/ai-label" className="underline">
            sammapix.com/tools/ai-label
          </Link>
          . Du siehst sofort den Upload-Bereich, keine Anmeldung erforderlich. Das Tool ist
          vollständig im Browser implementiert: Alle Bildoperationen führt dein eigener Computer
          durch, nichts verlässt dein Gerät.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Schritt 2: Bild laden
        </h3>
        <p>
          Ziehe dein KI-generiertes Bild in den Upload-Bereich oder klicke darauf, um es aus dem
          Datei-Explorer auszuwählen. Unterstützt werden die gängigen Bildformate: JPG, PNG, WebP
          und weitere. Das Bild wird unmittelbar nach dem Laden als Vorschau angezeigt.
        </p>
        <p>
          Du musst nicht darauf warten, dass das Bild irgendwo hochgeladen wird, weil genau das
          nicht passiert. Die Verarbeitung ist deshalb sofort und ohne Wartezeit.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Schritt 3: Label konfigurieren
        </h3>
        <p>
          Sobald das Bild geladen ist, erscheinen die Konfigurationsoptionen. Du kannst wählen:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>Text:</strong> Der voreingestellte Wert ist &bdquo;Made with AI&ldquo;. Du
            kannst ihn durch jeden beliebigen Text ersetzen, zum Beispiel &bdquo;KI-generiert&ldquo;,
            &bdquo;Mit Künstlicher Intelligenz erstellt&ldquo; oder den Namen deines Unternehmens
            mit KI-Zusatz.
          </li>
          <li>
            <strong>Position:</strong> Unten rechts, unten links, oben rechts, oben links oder
            Mitte. Am gebräuchlichsten ist unten rechts, da dort klassischerweise auch
            Urheberrechtshinweise platziert werden.
          </li>
          <li>
            <strong>Stil:</strong> Verschiedene visuelle Erscheinungsbilder stehen zur Auswahl,
            von einem halbtransparenten Hintergrundbalken bis zu einem dezenten Text ohne
            Hintergrund.
          </li>
          <li>
            <strong>Schriftgröße:</strong> Wähle eine Größe, die zum Bildformat passt. Bei kleinen
            Bildern empfiehlt sich eine größere Schrift, damit das Label bei verkleinerter Anzeige
            lesbar bleibt.
          </li>
        </ul>
        <p className="mt-3">
          Die Vorschau wird in Echtzeit aktualisiert, sodass du sofort siehst, wie das fertige
          Bild aussehen wird, bevor du es herunterlädst.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Schritt 4: Beschriftetes Bild herunterladen
        </h3>
        <p>
          Wenn du mit dem Ergebnis zufrieden bist, klicke auf die Download-Schaltfläche. Das
          beschriftete Bild wird direkt in deinen Downloads-Ordner gespeichert. Es ist sofort
          bereit zur Veröffentlichung auf Social Media, in deinem Blog, in Werbekampagnen oder
          wo auch immer du es einsetzen möchtest.
        </p>
        <p>
          Der gesamte Prozess dauert in der Praxis unter einer Minute, oft deutlich kürzer.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* TEXT, POSITION UND STIL                                             */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="label-text-position"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Text, Position und Stil: Was funktioniert wirklich?
        </h2>
        <p>
          Es gibt keine gesetzlich vorgeschriebene Formulierung für das Label. Der EU AI Act
          verlangt eine &bdquo;in angemessener und wahrnehmbarer Weise&ldquo; angebrachte
          Kennzeichnung. Was das konkret bedeutet, hängt vom Kontext ab. Hier sind die bewährtesten
          Ansätze.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Empfohlene Textvarianten
        </h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            <strong>&bdquo;Made with AI&ldquo;</strong>: international verständlich, kurz,
            wird zunehmend zum Standard auf englischsprachigen Plattformen.
          </li>
          <li>
            <strong>&bdquo;KI-generiert&ldquo;</strong>: deutschsprachig, klar und kompakt.
          </li>
          <li>
            <strong>&bdquo;Mit KI erstellt&ldquo;</strong>: etwas ausführlicher, leichter
            verständlich für ein breites Publikum.
          </li>
          <li>
            <strong>&bdquo;Erstellt mit Künstlicher Intelligenz&ldquo;</strong>: vollständige
            Formulierung, geeignet für formellere Kontexte wie Nachrichtenmagazine oder
            Unternehmenskommunikation.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Position nach Plattform und Verwendungszweck
        </h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            <strong>Social Media (Instagram, LinkedIn, X):</strong> Unten rechts oder unten links.
            Nicht zu groß wählen, da viele Plattformen Bilder zuschneiden.
          </li>
          <li>
            <strong>Blogbilder und Artikelillustrationen:</strong> Unten rechts ist die gängigste
            Wahl. Ein halbtransparenter Hintergrundbalken macht das Label auch auf hellen Bildern
            gut lesbar.
          </li>
          <li>
            <strong>Werbebanner und Kampagnenmotive:</strong> Unten rechts, in einer Größe, die
            klar sichtbar ist, aber das Hauptmotiv nicht dominiert.
          </li>
          <li>
            <strong>Künstlerische Werke:</strong> Eine dezente Eckenplatzierung reicht aus. Das
            Label muss erkennbar sein, soll aber die künstlerische Wirkung nicht zerstören.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Wann ist ein Label nicht ausreichend?
        </h3>
        <p>
          Ein Label, das so klein oder so ähnlich gefärbt wie der Hintergrund ist, dass es
          praktisch unsichtbar ist, erfüllt die gesetzliche Anforderung nicht. Die Kennzeichnung
          muss &bdquo;wahrnehmbar&ldquo; sein, was bedeutet, dass eine durchschnittliche Person sie
          ohne besondere Anstrengung erkennen kann. Das Tool bietet Vorschauoptionen, die dir
          helfen zu beurteilen, ob das Label bei deiner Bildgröße und deinem Hintergrund wirklich
          lesbar ist.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* STAPELVERARBEITUNG                                                   */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="stapelverarbeitung"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Mehrere Bilder auf einmal beschriften
        </h2>
        <p>
          Wenn du regelmäßig viele KI-Bilder veröffentlichst, zum Beispiel als Agentur, Creator
          mit hohem Output oder E-Commerce-Betreiber mit großem Produktkatalog, ist die
          Einzelverarbeitung zeitaufwendig. Das{" "}
          <Link href="/tools/ai-label" className="underline">
            AI-Label-Tool
          </Link>{" "}
          bietet Stapelverarbeitung für mehrere Bilder gleichzeitig.
        </p>
        <p>
          Die Stapelfunktion ist mit einem kostenlosen Konto bei SammaPix verfügbar. Registrierung,
          Anmeldung, mehrere Bilder auf einmal hochladen, einheitliche Label-Einstellungen für alle
          Dateien wählen, Stapel herunterladen. Der Prozess ist derselbe wie beim Einzelbild, nur
          skaliert.
        </p>
        <p>
          Für sehr große Bildmengen oder automatisierte Arbeitsabläufe ist es sinnvoll, die
          Kennzeichnung direkt in den Produktionsprozess zu integrieren, bevor Bilder in das
          Content-Management-System oder auf Plattformen hochgeladen werden.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* ALTERNATIVEN UND ERGÄNZENDE WERKZEUGE                               */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="alternativen"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Alternativen und ergänzende Werkzeuge
        </h2>
        <p>
          Das AI-Label-Tool ist für die meisten Anwendungsfälle die schnellste Option. Für
          spezifische Bedürfnisse gibt es ergänzende Ansätze.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Wasserzeichen und Markenaufdrucke kombinieren
        </h3>
        <p>
          Wenn du neben dem KI-Label auch ein Markenlogo oder einen individuellen Stempel auf
          deinen Bildern platzieren möchtest, ist das{" "}
          <Link href="/tools/stampit" className="underline">
            StampIt-Tool von SammaPix
          </Link>{" "}
          die passende Ergänzung. Es fügt Wasserzeichen und benutzerdefinierte Stempel zu Bildern
          hinzu, ebenfalls vollständig im Browser und ohne Upload.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Native Plattformfunktionen nutzen
        </h3>
        <p>
          Instagram, LinkedIn und YouTube bieten mittlerweile eigene Optionen, um beim Upload
          anzugeben, dass ein Bild oder Video KI-generiert ist. Diese Funktionen sind eine sinnvolle
          Ergänzung zu einem eingebetteten Label, können es aber nicht vollständig ersetzen. Der
          Grund: Plattformseitige Deklarationen sind manchmal nur für eingeloggte Nutzer sichtbar
          oder verschwinden, wenn das Bild außerhalb der Plattform geteilt wird. Ein Label direkt
          auf dem Bild bleibt hingegen in jedem Kontext erhalten.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Bildunterschriften als textliche Offenlegung
        </h3>
        <p>
          Für Blogartikel und redaktionelle Seiten ist eine Bildunterschrift wie &bdquo;Illustration
          erstellt mit Künstlicher Intelligenz&ldquo; eine valide Alternative zum Label auf dem
          Bild selbst. Sie bietet weniger Schutz bei der Weitergabe außerhalb des ursprünglichen
          Kontexts, ist aber für viele statische Webseiten eine praktische Lösung.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Metadaten prüfen vor der Veröffentlichung
        </h3>
        <p>
          Unabhängig von der Kennzeichnung ist es eine gute Praxis, die Metadaten deiner Bilder
          vor der Veröffentlichung zu prüfen. Das{" "}
          <Link href="/tools/exif" className="underline">
            EXIF-Tool von SammaPix
          </Link>{" "}
          zeigt alle eingebetteten Metadaten an und ermöglicht deren Entfernung direkt im Browser,
          ohne Upload. Das ist besonders relevant für Fotos, die Standortdaten oder andere
          persönliche Informationen enthalten können.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* BEST PRACTICES                                                       */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="best-practices"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Best Practices für die KI-Kennzeichnung
        </h2>
        <p>
          Aus der Praxis mit hunderten KI-Bildworkflows haben sich einige Grundsätze herauskristallisiert,
          die die Kennzeichnung effektiv und nachhaltig machen.
        </p>

        <ul className="list-disc pl-5 space-y-3 mt-3">
          <li>
            <strong>Label einbetten, nicht nur in der Bildunterschrift:</strong> Ein Label, das
            direkt in die Bilddatei eingebettet ist, bleibt auch dann erhalten, wenn das Bild
            außerhalb seines ursprünglichen Kontexts geteilt, heruntergeladen oder eingebettet
            wird.
          </li>
          <li>
            <strong>Konsistente Kennzeichnung im gesamten Kanal:</strong> Verwende für alle
            KI-generierten Bilder auf einem Kanal dieselbe Labelvorlage. Das schafft Wiedererkennung
            und macht den Workflow skalierbarer.
          </li>
          <li>
            <strong>Kennzeichnung vor dem Upload, nicht nachträglich:</strong> Beschrifte Bilder
            bevor du sie auf Plattformen hochlädst. Nachträgliche Änderungen an bereits
            veröffentlichten Inhalten sind aufwendiger und erreichen oft nicht alle bereits
            geteilten Versionen.
          </li>
          <li>
            <strong>Lesbarkeit auf kleinen Bildschirmen testen:</strong> Viele Bilder werden
            primär auf Mobilgeräten betrachtet. Stelle sicher, dass das Label auch bei reduzierten
            Bildschirmabmessungen noch erkennbar ist.
          </li>
          <li>
            <strong>Label-Größe an das Bildformat anpassen:</strong> Ein kleines Label auf einem
            großen Hochformatbild wirkt verloren. Ein zu großes Label auf einem kleinen Thumbnail
            überdeckt das Motiv. Die Echtzeit-Vorschau im Tool hilft dir, das richtige Verhältnis
            zu finden.
          </li>
          <li>
            <strong>Native Plattformdeklaration zusätzlich aktivieren:</strong> Auf Plattformen,
            die eigene KI-Offenlegungsoptionen anbieten, diese zusätzlich zum eingebetteten Label
            aktivieren. Das ist keine rechtliche Notwendigkeit, aber ein Signal guter Praxis
            gegenüber der Plattform und dem Publikum.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* TABELLE: ÜBERBLICK TOOL                                             */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Überblick: AI-Label-Tool von SammaPix
        </h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Eigenschaft
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Kosten (Einzelbild)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Kostenlos, kein Konto nötig</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">Kosten (Stapel)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Kostenloses Konto ausreichend</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Bildupload auf Server</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Nein, alles lokal im Browser</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">Unterstützte Formate</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">JPG, PNG, WebP und weitere</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Labeltext anpassbar</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Ja, frei wählbar</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">Positionsauswahl</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Ecken und Mitte frei wählbar</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Echtzeit-Vorschau</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Ja</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">Installation erforderlich</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Nein, funktioniert im Browser</td>
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
          Wird mein Bild beim AI-Label-Tool hochgeladen?
        </h3>
        <p>
          Nein. Das{" "}
          <Link href="/tools/ai-label" className="underline">
            AI-Label-Tool
          </Link>{" "}
          von SammaPix verarbeitet alles lokal in deinem Browser. Dein Bild verlässt deinen
          Computer nicht und wird auf keinen Server hochgeladen. Das ist sowohl datenschutzfreundlich
          als auch schnell, da keine Netzwerkübertragung stattfindet.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Welchen Text soll das Label tragen?
        </h3>
        <p>
          Es gibt keine gesetzlich vorgeschriebene Formulierung. &bdquo;Made with AI&ldquo;,
          &bdquo;KI-generiert&ldquo; oder &bdquo;Mit Künstlicher Intelligenz erstellt&ldquo; sind
          alle geeignet. Entscheidend ist, dass die Kennzeichnung für eine durchschnittliche Person
          wahrnehmbar ist. Der Standardwert im Tool ist &bdquo;Made with AI&ldquo;, den du jederzeit
          anpassen kannst.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Wo sollte das Label auf dem Bild platziert werden?
        </h3>
        <p>
          Am gebräuchlichsten ist die untere rechte Ecke. Die untere linke Ecke ist ebenfalls
          verbreitet. Für künstlerische Werke kann ein dezentes Label in einer beliebigen Ecke
          gewählt werden. Wichtig ist, dass es sichtbar ist und nicht vom Hauptmotiv verdeckt wird.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Kann ich mehrere Bilder auf einmal beschriften?
        </h3>
        <p>
          Ja, mit einem kostenlosen Konto bei SammaPix ist Stapelverarbeitung möglich. Die
          Einzelbildfunktion ist komplett kostenlos und ohne Registrierung nutzbar.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Reicht das Label auf dem Bild oder muss ich noch etwas anderes tun?
        </h3>
        <p>
          Das sichtbare Label erfüllt die Deployer-Pflicht aus Art. 50 des EU AI Act. Die Pflicht
          zur maschinenlesbaren Markierung liegt beim Anbieter des KI-Systems, nicht bei dir als
          Nutzer. Auf Social-Media-Plattformen kannst du zusätzlich die nativen KI-Deklarationsfunktionen
          nutzen, was als gute Praxis gilt, aber über die gesetzliche Mindestanforderung hinausgeht.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Muss ich für jedes KI-generierte Bild ein Label hinzufügen?
        </h3>
        <p>
          Ja, für jeden Inhalt, den du in einem professionellen oder kommerziellen Kontext
          veröffentlichst und der vollständig KI-generiert oder erheblich KI-manipuliert ist.
          Ausnahmen gelten für rein persönliche, nicht öffentlich vertriebene Nutzung sowie für
          bestimmte künstlerische Werke, bei denen eine abgeschwächte Form der Offenlegung
          ausreicht. Details zu den Ausnahmen findest du im vollständigen Guide zum{" "}
          <Link href="/de/blog/eu-ai-act-ki-inhalte-kennzeichnen" className="underline">
            EU AI Act und der KI-Kennzeichnungspflicht
          </Link>
          .
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* VERWANDTE ARTIKEL                                                    */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">
          Verwandte Artikel und Tools
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/de/blog/eu-ai-act-ki-inhalte-kennzeichnen" className="underline">
              EU AI Act: KI-Inhalte kennzeichnen? Der vollständige Guide 2026
            </Link>
          </li>
          <li>
            <Link href="/tools/ai-label" className="underline">
              AI-Label-Tool direkt öffnen
            </Link>
          </li>
          <li>
            <Link href="/tools/stampit" className="underline">
              StampIt: Wasserzeichen und Stempel zu Bildern hinzufügen
            </Link>
          </li>
          <li>
            <Link href="/tools/exif" className="underline">
              EXIF-Daten aus Fotos anzeigen und entfernen
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
