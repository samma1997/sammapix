import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "ai-act-etiqueter-contenu-ia";
const URL = `${APP_URL}/fr/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "AI Act: faut-il étiqueter le contenu IA? Guide 2026",
  description:
    "Depuis le 2 août 2026, l'Art. 50 de l'AI Act européen impose des obligations de transparence sur les contenus générés par l'IA. Qui doit étiqueter quoi, les exemptions et comment se conformer gratuitement.",
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
    "AI Act étiquetage contenu IA",
    "obligation étiqueter contenu ia europe",
    "article 50 ai act",
    "made with ai obligation ue",
    "étiqueter images ia loi",
    "transparence ia règlement européen",
  ],
  openGraph: {
    title: "AI Act: faut-il étiqueter le contenu IA? Guide 2026",
    description:
      "Depuis le 2 août 2026, l'AI Act européen impose la transparence sur les contenus IA. Qui est concerné, les exemptions et comment se conformer en quelques minutes.",
    url: URL,
    type: "article",
    locale: "fr_FR",
    publishedTime: "2026-08-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Act: faut-il étiqueter le contenu IA? Guide 2026",
    description:
      "Depuis le 2 août 2026, l'Art. 50 de l'AI Act impose des labels visibles sur les contenus générés par l'IA. Découvrez qui est obligé et comment se conformer gratuitement.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "AI Act: faut-il étiqueter le contenu IA? Guide 2026",
  description:
    "Guide pratique sur l'Art. 50 de l'AI Act européen: qui doit étiqueter les contenus générés par l'intelligence artificielle, quelles sont les exemptions, les délais et comment ajouter un label visible gratuitement dans le navigateur.",
  url: URL,
  datePublished: "2026-08-08",
  dateModified: "2026-08-08",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/fr/chi-siamo",
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
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${APP_URL}/fr` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/fr/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "AI Act: faut-il étiqueter le contenu IA?",
      item: URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: [
    {
      "@type": "Question",
      name: "Dois-je étiqueter les images générées par l'IA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dans la plupart des cas, oui, si vous êtes celui qui les publie (deployer). L'Art. 50 de l'AI Act impose que les images, vidéos et contenus audio synthétiques ou significativement manipulés soient accompagnés d'une divulgation perceptible par une personne. Cette obligation s'applique depuis le 2 août 2026. Les contenus utilisés dans des contextes clairement artistiques, créatifs ou satiriques bénéficient d'une divulgation allégée.",
      },
    },
    {
      "@type": "Question",
      name: "Un filigrane invisible suffit-il ou faut-il aussi un label visible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les deux sont nécessaires, mais ils remplissent des fonctions distinctes. Le marquage invisible (comme SynthID de Google DeepMind) est une obligation du fournisseur qui génère le contenu: il doit incorporer un signal lisible par les machines. Le label visible est en revanche une obligation du deployer, c'est-à-dire de celui qui publie ce contenu. Le seul marquage invisible ne satisfait pas l'obligation de divulgation humaine.",
      },
    },
    {
      "@type": "Question",
      name: "L'obligation s'applique-t-elle aux créateurs et influenceurs, pas seulement aux entreprises?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Les règles de transparence de l'Art. 50 s'appliquent aux deployers, c'est-à-dire à toute personne qui utilise un système d'IA pour produire et publier des contenus dans un contexte professionnel ou commercial. Les créateurs, influenceurs et agences entrent dans cette catégorie. Les particuliers qui utilisent l'IA à des fins strictement personnelles et ne distribuent pas les contenus publiquement ne sont pas soumis à l'obligation.",
      },
    },
    {
      "@type": "Question",
      name: "Et si le contenu est artistique ou satirique?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour les œuvres clairement artistiques, créatives et satiriques, la réglementation prévoit que la divulgation ne doit pas compromettre la jouissance de l'œuvre. Un label discret dans un coin de l'image ou une note dans la légende sont suffisants. L'obligation ne disparaît pas: elle s'adapte.",
      },
    },
    {
      "@type": "Question",
      name: "L'obligation vaut-elle si je suis hors de l'UE mais publie en Europe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. L'AI Act a une portée extraterritoriale analogue au RGPD: il s'applique chaque fois que le système d'IA est mis sur le marché de l'Union européenne ou que ses résultats atteignent des utilisateurs dans l'UE, indépendamment du lieu où se trouve le fournisseur ou le deployer.",
      },
    },
    {
      "@type": "Question",
      name: "Comment ajouter un label 'Made with AI' gratuitement et en quelques secondes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Utilisez l'outil AI Label de SammaPix: chargez l'image, choisissez la position et le style du label, téléchargez le fichier étiqueté. Tout se passe dans le navigateur, sans téléversement vers des serveurs externes et sans inscription. L'outil est gratuit.",
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
        locale="fr"
        title="AI Act: faut-il étiqueter le contenu IA? Guide 2026"
        slug={SLUG}
        description="Depuis le 2 août 2026, les règles de transparence de l'AI Act européen sont pleinement en vigueur. Si vous utilisez l'intelligence artificielle pour créer des images, des vidéos ou des contenus audio que vous publiez ensuite, vous avez probablement l'obligation de les étiqueter de façon perceptible. Ce guide explique qui doit faire quoi, quelles sont les vraies exemptions et comment se conformer en quelques minutes, gratuitement."
        date="2026-08-08"
        dateFormatted="8 août 2026"
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "reponse-rapide", title: "La réponse rapide" },
          { id: "que-dit-art-50", title: "Ce que dit l'Art. 50 de l'AI Act" },
          { id: "qui-est-concerne", title: "Qui est concerné en pratique" },
          { id: "exemptions", title: "Les exemptions prévues par la loi" },
          { id: "calendrier", title: "Calendrier et dates à retenir" },
          { id: "sanctions", title: "Sanctions en cas de non-conformité" },
          { id: "comment-se-conformer", title: "Comment se conformer pour les images" },
          { id: "tableau-recapitulatif", title: "Tableau récapitulatif" },
          { id: "faq", title: "Questions fréquentes" },
        ]}
        summary={[
          "Depuis le 2 août 2026, l'Art. 50 de l'AI Act européen impose des obligations de transparence sur les contenus générés ou manipulés par l'IA.",
          "Celui qui génère le contenu (fournisseur) doit incorporer un marquage invisible lisible par les machines.",
          "Celui qui publie le contenu (deployer) doit également ajouter une divulgation perceptible par une personne, comme un label visible.",
          "L'obligation concerne les marketeurs, les agences, les créateurs, les e-commerces et quiconque publie des contenus IA dans un contexte professionnel.",
          "Des exemptions existent pour les usages artistiques, créatifs et satiriques, mais la divulgation ne disparaît pas: elle s'allège.",
          "Vous pouvez ajouter un label 'Made with AI' gratuitement et dans le navigateur avec l'outil AI Label de SammaPix.",
        ]}
        heroImage={
          <figure>
            <Link href="/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Photo de Luca Sammarco, fondateur de SammaPix, travaillant sur des contenus visuels"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Créer des contenus avec l&apos;IA est rapide. Savoir les étiqueter correctement est la
              partie que beaucoup négligent. Photo du{" "}
              <Link href="/portfolio" className="underline">
                portfolio
              </Link>
              .
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Ajoutez le label &ldquo;Made with AI&rdquo; en quelques secondes
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Chargez l&apos;image dans l&apos;outil AI Label de SammaPix, choisissez la position et
              le style du label, et téléchargez le fichier étiqueté. Tout dans le navigateur, sans
              téléversement vers des serveurs externes et sans inscription. Gratuit.
            </p>
            <Link
              href="/tools/ai-label"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Étiqueter l&apos;image, gratuitement
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* RÉPONSE RAPIDE                                                      */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="reponse-rapide"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          La réponse rapide
        </h2>
        <p>
          Oui, dans la plupart des cas vous devez étiqueter les contenus générés par l&apos;intelligence
          artificielle avant de les publier. Depuis le <strong>2 août 2026</strong>, les dispositions
          de transparence de l&apos;<strong>Art. 50 de l&apos;AI Act de l&apos;Union européenne</strong>{" "}
          sont pleinement opérationnelles. Si vous êtes une agence, un créateur, une marque ou toute
          autre entité qui utilise des outils d&apos;IA pour produire des images, des vidéos ou des
          contenus audio destinés à la publication, vous êtes soumis à ces obligations.
        </p>
        <p>
          Si vous souhaitez passer immédiatement à l&apos;action:{" "}
          <Link href="/tools/ai-label" className="underline">
            l&apos;outil AI Label de SammaPix
          </Link>{" "}
          ajoute un label visible à vos images directement dans le navigateur, gratuitement et sans
          téléverser quoi que ce soit sur un serveur extérieur. Revenez lire ce guide pour comprendre
          exactement pourquoi c&apos;est nécessaire et dans quels cas les exemptions s&apos;appliquent.
        </p>
        <p className="text-xs text-gray-500 dark:text-[#A3A3A3] border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-4">
          Note: cet article fournit des informations de caractère général et ne constitue pas un
          conseil juridique. Pour une évaluation de votre situation spécifique, consultez un
          professionnel qualifié.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* CE QUE DIT L'ART. 50                                               */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="que-dit-art-50"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Ce que dit l&apos;Art. 50 de l&apos;AI Act
        </h2>
        <p>
          L&apos;AI Act (Règlement UE 2024/1689) consacre l&apos;article 50 à la{" "}
          <strong>transparence pour certains systèmes d&apos;IA</strong>. Le mécanisme fonctionne sur
          deux niveaux distincts, avec des obligations différentes selon le rôle que vous occupez dans
          la chaîne de production et de diffusion du contenu.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Le niveau du fournisseur: le marquage invisible lisible par les machines
        </h3>
        <p>
          Celui qui conçoit et commercialise un système d&apos;IA générative (le fournisseur) est tenu
          de garantir que les contenus produits par le système portent un{" "}
          <strong>marquage lisible par les machines</strong>, incorporé de manière à résister aux
          traitements ordinaires comme le redimensionnement ou la compression. Des technologies
          telles que SynthID de Google DeepMind entrent dans cette catégorie: elles ajoutent un
          signal stéganographique invisible à l&apos;œil humain, mais détectable par des systèmes
          automatiques. Cette obligation incombe aux fournisseurs d&apos;outils comme Midjourney,
          DALL·E, Stable Diffusion et leurs équivalents.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Le niveau du deployer: la divulgation perceptible par une personne
        </h3>
        <p>
          Celui qui utilise ces systèmes pour produire des contenus et les publie ensuite (le
          deployer) a une obligation supplémentaire et distincte: s&apos;assurer que le contenu porte
          une <strong>divulgation perceptible par une personne</strong>. Le marquage invisible déjà
          incorporé par le fournisseur ne suffit pas. Une personne qui voit cette image ou cette vidéo
          doit pouvoir comprendre qu&apos;il s&apos;agit d&apos;un contenu synthétique ou
          significativement manipulé. La forme concrète de cette divulgation n&apos;est pas
          rigidement prescrite par le texte: le règlement parle d&apos;indication &ldquo;de manière
          appropriée et perceptible&rdquo;. En pratique, un label visible tel que &ldquo;Made with
          AI&rdquo; ou &ldquo;Généré par IA&rdquo; positionné sur l&apos;image ou dans la légende
          satisfait à cette exigence.
        </p>
        <p>
          Les deux niveaux ne sont pas interchangeables. Si vous publiez une image qui porte déjà le
          marquage invisible du fournisseur, vous n&apos;avez pas encore rempli votre obligation en
          tant que deployer. Vous devez tout de même ajouter quelque chose qu&apos;une personne peut
          lire ou percevoir sans outils spéciaux.
        </p>
        <p>
          La norme s&apos;applique en particulier aux images, vidéos et contenus audio qui ont été{" "}
          <strong>entièrement générés par l&apos;IA</strong> ou <strong>manipulés</strong> de façon à
          altérer significativement le contenu réel, ce que l&apos;on appelle les{" "}
          <em>deep fakes</em> au sens large. Sont également inclus les contenus qui représentent des
          personnes réelles dans des situations, des lieux ou des actions qui n&apos;ont jamais eu
          lieu.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* QUI EST CONCERNÉ                                                    */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="qui-est-concerne"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Qui est concerné en pratique
        </h2>
        <p>
          La question que beaucoup se posent est la suivante: est-ce que cela me concerne vraiment?
          La réponse dépend de ce que vous publiez et dans quel contexte. Voici les catégories les
          plus courantes avec des exemples concrets.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Marketeurs et agences de communication
        </h3>
        <p>
          Si vous produisez des images avec Midjourney ou Adobe Firefly pour une campagne
          publicitaire et les utilisez sur les réseaux sociaux, en affichage digital ou sur des
          supports imprimés, vous êtes un deployer. Les images doivent porter une divulgation
          visible. Cela vaut aussi bien pour les publications organiques que pour les annonces
          payantes, où certaines plateformes demandent déjà cette déclaration au moment du
          téléversement.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Créateurs de contenu et influenceurs
        </h3>
        <p>
          Un créateur qui génère des arrière-plans, des illustrations ou des scènes entières avec des
          outils d&apos;IA et les publie comme contenu de son canal entre dans la catégorie des
          deployers. Il n&apos;est pas nécessaire d&apos;avoir une structure formelle: le critère est
          le contexte professionnel ou semi-professionnel de la publication. Celui qui utilise l&apos;IA
          pour créer des stories, des posts ou des vidéos qui font la promotion de produits ou de
          services, y compris via des partenariats avec des marques, est soumis à l&apos;obligation.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          E-commerçants utilisant des images produit générées par l&apos;IA
        </h3>
        <p>
          Une boutique en ligne qui utilise des outils d&apos;IA pour générer des photos de produits
          (arrière-plans synthétiques, mannequins générés, mises en scène créées de toutes pièces)
          publie des images synthétiques à part entière. Là aussi, la divulgation est requise. Le
          point n&apos;est pas que l&apos;image soit &ldquo;fausse&rdquo; au sens trompeur, mais
          qu&apos;elle soit produite par un système d&apos;IA.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Éditeurs et blogs utilisant des illustrations IA
        </h3>
        <p>
          Un site d&apos;actualités, un magazine numérique ou un blog qui utilise des illustrations
          générées par l&apos;IA comme images de couverture ou d&apos;illustration d&apos;articles
          doit l&apos;indiquer de manière perceptible. Une légende telle que &ldquo;Illustration
          générée par intelligence artificielle&rdquo; ou un label sur l&apos;image elle-même
          satisfait à l&apos;exigence.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Entreprises disposant de chatbots et d&apos;assistants vocaux
        </h3>
        <p>
          L&apos;Art. 50 couvre également les systèmes conversationnels. Si vous disposez d&apos;un
          chatbot sur votre site, l&apos;utilisateur doit savoir qu&apos;il interagit avec un système
          automatisé et non avec une personne, sauf si cela est évident dans le contexte. Cette
          obligation est distincte de celle portant sur les images, mais elle concerne de nombreuses
          entreprises qui déploient des assistants IA.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* EXEMPTIONS                                                          */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="exemptions"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Les exemptions prévues par la loi
        </h2>
        <p>
          Le règlement n&apos;est pas aveugle au contexte. Il existe des situations où les obligations
          s&apos;allègent ou ne s&apos;appliquent pas dans leur forme pleine.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Contenus soumis à révision humaine et responsabilité éditoriale
        </h3>
        <p>
          Si un texte ou un contenu généré par l&apos;IA a été substantiellement révisé par un être
          humain qui en assume la pleine responsabilité éditoriale, la situation change. L&apos;obligation
          de divulgation se réduit lorsque la contribution de l&apos;IA est un outil d&apos;assistance,
          non la source principale du contenu final. En pratique: si vous utilisez l&apos;IA comme
          brouillon et que vous réécrivez et révisez ensuite en profondeur, le résultat est votre
          travail éditorial, non le produit du système. La ligne de démarcation est subjective, ce
          qui en fait un territoire encore à clarifier par des lignes directrices d&apos;application.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Forces de l&apos;ordre et sécurité nationale
        </h3>
        <p>
          Les systèmes utilisés par les forces de l&apos;ordre ou pour des raisons de sécurité
          nationale bénéficient de dérogations spécifiques qui dépassent le cadre commercial et
          créatif de ce guide.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Œuvres artistiques, créatives, satiriques et de fiction
        </h3>
        <p>
          C&apos;est l&apos;exemption qui intéresse le plus les créateurs. Pour les œuvres clairement
          artistiques, créatives, satiriques ou de fiction, la réglementation prévoit que la
          divulgation est requise mais ne doit pas compromettre la jouissance de l&apos;œuvre. Cela
          signifie que vous n&apos;avez pas à interrompre un court métrage avec un avertissement en
          plein écran, ni à couvrir une illustration artistique d&apos;un label envahissant. Une note
          discrète dans un coin de l&apos;image, dans la légende ou dans les crédits de l&apos;œuvre
          est suffisante. L&apos;obligation ne disparaît pas: elle s&apos;adapte.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Usage personnel non distribué
        </h3>
        <p>
          Celui qui utilise des outils d&apos;IA pour générer des images à usage strictement
          personnel et ne les distribue pas publiquement n&apos;est pas soumis aux obligations du
          deployer. Si vous générez des fonds d&apos;écran ou des illustrations qui ne quittent jamais
          votre appareil, vous n&apos;entrez pas dans le champ d&apos;application de la norme.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* CALENDRIER                                                          */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="calendrier"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Calendrier et dates à retenir
        </h2>
        <p>
          L&apos;AI Act est entré en vigueur le 2 août 2024. Ses dispositions s&apos;appliquent de
          manière progressive, avec des dates différentes selon les catégories d&apos;obligations.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>2 août 2026:</strong> entrée en vigueur des règles de transparence de
            l&apos;Art. 50, y compris l&apos;obligation de divulgation perceptible pour les deployers
            de contenus synthétiques. Cette date est désormais passée. L&apos;obligation est active.
          </li>
          <li>
            <strong>2 décembre 2026:</strong> délai limite pour la conformité aux règles de marquage
            invisible pour les systèmes d&apos;IA déjà sur le marché avant le 2 août 2026 (Art. 50,
            alinéa 2). Les nouveaux systèmes lancés après cette date sont soumis à l&apos;obligation
            d&apos;emblée.
          </li>
        </ul>
        <p className="mt-3">
          En pratique, si vous utilisez aujourd&apos;hui Midjourney ou tout autre outil d&apos;IA
          pour générer des images que vous publiez, l&apos;obligation de les étiqueter de façon
          visible est déjà active. Il n&apos;existe pas de période de grâce supplémentaire pour la
          partie concernant la divulgation perceptible.
        </p>
        <p>
          Pour les sources officielles, consultez le texte de l&apos;AI Act sur le site{" "}
          <a
            href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Digital Strategy de la Commission européenne
          </a>{" "}
          et la{" "}
          <a
            href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            version intégrale du règlement sur EUR-Lex
          </a>
          , qui inclut l&apos;Art. 50 avec tous les détails techniques.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SANCTIONS                                                           */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="sanctions"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Sanctions en cas de non-conformité
        </h2>
        <p>
          L&apos;AI Act prévoit une structure de sanctions par paliers, proportionnelle à la gravité
          de l&apos;infraction. Les sanctions les plus élevées concernent les systèmes d&apos;IA
          interdits ou à haut risque, mais les violations des règles de transparence, dont l&apos;Art.
          50, entrent néanmoins dans le champ d&apos;application du régime de sanctions du règlement.
        </p>
        <p>
          L&apos;application de la loi relève des autorités nationales compétentes désignées par
          chaque État membre. En France, comme dans d&apos;autres pays, le cadre institutionnel de
          supervision est encore en cours de consolidation. Cela ne signifie pas que les normes ne
          s&apos;appliquent pas: cela signifie que le système se renforcera dans le temps, comme cela
          s&apos;est produit avec le RGPD.
        </p>
        <p>
          Le risque le plus immédiat n&apos;est pas nécessairement une amende, mais la perte de
          confiance du public et les conséquences réputationnelles liées à la publication de contenus
          IA non déclarés à un moment où la sensibilité sur ce sujet est élevée. Se conformer
          maintenant a un coût quasi nul. Ne pas le faire a un coût réputationnel potentiellement
          significatif.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* COMMENT SE CONFORMER                                                */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="comment-se-conformer"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Comment se conformer pour les images: ajouter le label visible
        </h2>
        <p>
          Pour les images, la voie la plus pratique et la plus immédiate est d&apos;ajouter un label
          visible tel que &ldquo;Made with AI&rdquo; ou &ldquo;Généré par IA&rdquo;. Il n&apos;existe
          pas de formule obligatoire: l&apos;essentiel est qu&apos;elle soit perceptible par une
          personne qui regarde le contenu. Vous pouvez la positionner dans le coin inférieur droit,
          comme c&apos;est le cas pour les filigranes, ou dans la légende de l&apos;image sur les
          réseaux sociaux et les blogs.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Utiliser l&apos;outil AI Label de SammaPix
        </h3>
        <p>
          La façon la plus rapide d&apos;ajouter le label est d&apos;utiliser{" "}
          <Link href="/tools/ai-label" className="underline">
            l&apos;outil AI Label de SammaPix
          </Link>
          . Il fonctionne entièrement dans le navigateur: vous n&apos;avez rien à installer, pas
          besoin de créer un compte pour l&apos;usage de base, et votre image n&apos;est téléversée
          sur aucun serveur. Le processus en trois étapes:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-3">
          <li>
            Chargez l&apos;image générée par l&apos;IA dans l&apos;outil (glissez le fichier ou
            cliquez pour le sélectionner).
          </li>
          <li>
            Choisissez la position, le style et le texte du label. Vous pouvez utiliser le texte
            prédéfini &ldquo;Made with AI&rdquo; ou le personnaliser selon vos besoins.
          </li>
          <li>
            Téléchargez l&apos;image étiquetée, prête à être publiée.
          </li>
        </ol>
        <p className="mt-3">
          Pour les contenus où vous souhaitez également apposer un tampon ou un logo de marque en
          complément du label IA, vous pouvez combiner cela avec{" "}
          <Link href="/tools/stampit" className="underline">
            StampIt
          </Link>
          , qui ajoute des tampons et des filigranes personnalisés aux images, toujours dans le
          navigateur.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Sur les réseaux sociaux: utiliser les fonctions natives des plateformes
        </h3>
        <p>
          Instagram, LinkedIn et YouTube ont déjà introduit des options natives pour déclarer les
          contenus IA au moment du téléversement. Utiliser ces fonctions est un signal positif, mais
          attention: certaines plateformes affichent la déclaration uniquement dans certains contextes
          ou uniquement aux utilisateurs connectés. Ajouter un label visible sur l&apos;image
          elle-même reste la solution la plus robuste et indépendante de la plateforme.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Pour les blogs et les sites éditoriaux
        </h3>
        <p>
          Si vous publiez des illustrations IA sur un site ou un blog, la voie la plus simple est une
          légende explicite sous l&apos;image. Une mention telle que &ldquo;Image générée par
          intelligence artificielle&rdquo; est suffisante. Si vous préférez une solution plus visuelle,
          le label sur l&apos;image elle-même est préférable car il fonctionne également lorsque
          l&apos;image est partagée hors de son contexte d&apos;origine, où la légende pourrait ne
          pas l&apos;accompagner.
        </p>
        <p>
          Pour vérifier que vos images ne contiennent pas de métadonnées sensibles avant de les
          publier, vous pouvez également utiliser l&apos;{" "}
          <Link href="/tools/exif" className="underline">
            outil EXIF de SammaPix
          </Link>
          , qui affiche et supprime les métadonnées directement dans le navigateur.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* TABLEAU RÉCAPITULATIF                                               */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="tableau-recapitulatif"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Tableau récapitulatif des obligations
        </h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Type de contenu
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Obligation de divulgation
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Forme requise
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Image IA dans une campagne publicitaire
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Oui, pleine
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Label visible perceptible
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Vidéo IA sur un canal social (marque ou créateur)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Oui, pleine
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Label visible ou déclaration dans la description
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Illustration IA sur un blog ou article éditorial
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Oui
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Label sur l&apos;image ou légende explicite
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Œuvre artistique ou satirique créée avec l&apos;IA
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Oui, allégée
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Label discret ou note dans les crédits
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Contenu révisé éditorialement par un humain
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Incertain (dépend du degré de révision)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  À évaluer au cas par cas
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Usage personnel non distribué
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Non
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Aucune exigence
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FAQ                                                                 */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="faq"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Questions fréquentes
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Dois-je étiqueter les images générées par l&apos;IA?
        </h3>
        <p>
          Dans la plupart des cas, oui, si vous êtes celui qui les publie. L&apos;Art. 50 de l&apos;AI
          Act impose que les images, vidéos et contenus audio synthétiques ou significativement
          manipulés soient accompagnés d&apos;une divulgation perceptible par une personne. Cette
          obligation s&apos;applique depuis le 2 août 2026. Les contenus utilisés dans des contextes
          clairement artistiques, créatifs ou satiriques bénéficient d&apos;une divulgation allégée.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Un filigrane invisible suffit-il ou faut-il aussi un label visible?
        </h3>
        <p>
          Les deux sont nécessaires, mais ils remplissent des fonctions distinctes. Le marquage
          invisible (comme SynthID de Google DeepMind) est une obligation du fournisseur qui génère
          le contenu. Le label visible est en revanche une obligation du deployer, c&apos;est-à-dire
          de celui qui publie ce contenu. Le seul marquage invisible ne satisfait pas l&apos;obligation
          de divulgation humaine.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Et si le contenu est artistique ou satirique?
        </h3>
        <p>
          Pour les œuvres créatives, artistiques et satiriques, l&apos;obligation ne disparaît pas,
          mais elle s&apos;allège. La réglementation prévoit que la divulgation ne doit pas
          compromettre la jouissance de l&apos;œuvre: un label discret dans un coin de l&apos;image
          ou une note dans la légende sont suffisants. Il n&apos;est pas nécessaire d&apos;interrompre
          le contenu avec un avertissement envahissant.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          L&apos;obligation s&apos;applique-t-elle aux créateurs et influenceurs, pas seulement aux
          entreprises?
        </h3>
        <p>
          Oui. Les règles de transparence de l&apos;Art. 50 s&apos;appliquent aux deployers,
          c&apos;est-à-dire à toute personne qui utilise un système d&apos;IA pour produire et
          publier des contenus dans un contexte professionnel ou commercial. Les créateurs, influenceurs
          et agences entrent dans cette catégorie.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          L&apos;obligation vaut-elle si je suis hors de l&apos;UE mais publie en Europe?
        </h3>
        <p>
          Oui. L&apos;AI Act a une portée extraterritoriale analogue au RGPD: il s&apos;applique
          chaque fois que le système d&apos;IA est mis sur le marché de l&apos;Union européenne ou
          que ses résultats atteignent des utilisateurs dans l&apos;UE, indépendamment du lieu où se
          trouve le fournisseur ou le deployer.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Comment ajouter un label &ldquo;Made with AI&rdquo; gratuitement et en quelques secondes?
        </h3>
        <p>
          Utilisez l&apos;outil{" "}
          <Link href="/tools/ai-label" className="underline">
            AI Label de SammaPix
          </Link>
          : chargez l&apos;image, choisissez la position et le style du label, téléchargez le fichier
          étiqueté. Tout se passe dans le navigateur, sans téléversement vers des serveurs externes
          et sans inscription. L&apos;outil est gratuit. Si vous souhaitez également apposer un
          tampon ou un filigrane personnalisé,{" "}
          <Link href="/tools/stampit" className="underline">
            StampIt
          </Link>{" "}
          est fait pour vous.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* GUIDES ASSOCIÉS                                                     */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">
          Guides associés
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/fr/blog/ajouter-label-made-with-ai" className="underline">
              Comment ajouter un label Made with AI aux images (gratuit)
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-remove-metadata-from-photos" className="underline">
              How to remove metadata from photos (EXIF)
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-compress-images-without-losing-quality" className="underline">
              How to compress images without losing quality
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
