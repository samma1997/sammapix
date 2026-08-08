import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "ley-ia-etiquetar-contenido-ia";
const URL = `${APP_URL}/es/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Ley de IA: hay que etiquetar el contenido IA? 2026",
  description:
    "Desde el 2 de agosto de 2026 el Art. 50 del Reglamento IA de la UE exige transparencia sobre el contenido generado por IA. Quién debe etiquetar, excepciones y cómo cumplir gratis.",
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
    "ley ia etiquetar contenido ia",
    "ai act etiquetado contenido",
    "articulo 50 reglamento ia ue",
    "made with ai obligacion europa",
    "etiquetar imagenes ia ley",
    "declarar contenido generado ia",
  ],
  openGraph: {
    title: "Ley de IA: hay que etiquetar el contenido IA? 2026",
    description:
      "Desde el 2 de agosto de 2026 el Reglamento IA de la UE exige transparencia sobre el contenido IA. Quién debe etiquetar, excepciones y cómo cumplir en minutos.",
    url: URL,
    type: "article",
    locale: "es_ES",
    publishedTime: "2026-08-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ley de IA: hay que etiquetar el contenido IA? 2026",
    description:
      "Desde el 2 de agosto de 2026 el Art. 50 del Reglamento IA exige etiquetas visibles sobre el contenido IA. Quién está obligado y cómo cumplir gratis.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Ley de IA: hay que etiquetar el contenido IA? 2026",
  description:
    "Guía práctica sobre el Art. 50 del Reglamento IA de la UE: quién debe etiquetar el contenido generado por inteligencia artificial, cuáles son las excepciones, los plazos y cómo añadir una etiqueta visible gratis en el navegador.",
  url: URL,
  datePublished: "2026-08-08",
  dateModified: "2026-08-08",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/about",
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
    { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Ley de IA: hay que etiquetar el contenido IA?",
      item: URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: [
    {
      "@type": "Question",
      name: "Tengo que etiquetar las imágenes generadas con IA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En muchos casos sí, si eres tú quien las publica (deployer). El Art. 50 del Reglamento IA exige que las imágenes, vídeos y audios sintéticos o significativamente manipulados vayan acompañados de una indicación perceptible por una persona. Esta obligación se aplica desde el 2 de agosto de 2026. Se exceptúan los contenidos usados en contextos claramente artísticos, creativos o satíricos, para los que la divulgación puede ser más discreta.",
      },
    },
    {
      "@type": "Question",
      name: "Basta con la marca de agua invisible o también hace falta una etiqueta visible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Se necesitan ambas cosas, pero cumplen funciones distintas. La marcación invisible (como SynthID de Google DeepMind) es una obligación del proveedor que genera el contenido: debe incorporar una señal legible por máquinas. La etiqueta visible o perceptible por una persona es, en cambio, una obligación del deployer, es decir, de quien publica ese contenido. La marcación invisible por sí sola no satisface la obligación de divulgación hacia el público.",
      },
    },
    {
      "@type": "Question",
      name: "Y si el contenido es artístico o satírico?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para las obras claramente artísticas, creativas y satíricas la obligación no desaparece, pero se atenúa. La normativa prevé que la divulgación no comprometa el disfrute de la obra: una etiqueta discreta en una esquina de la imagen o una nota al pie son suficientes. No es necesario interrumpir el contenido con un aviso a pantalla completa.",
      },
    },
    {
      "@type": "Question",
      name: "La obligación vale también si no soy una empresa sino un creador o un influencer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Las normas de transparencia del Art. 50 se aplican a los deployers, es decir, a cualquiera que use un sistema de IA para producir y publicar contenido en un contexto profesional o comercial. Creadores, influencers y agencias entran en esta categoría. Los particulares que usan la IA para uso estrictamente personal y no distribuyen el contenido públicamente no están sujetos a la obligación.",
      },
    },
    {
      "@type": "Question",
      name: "Se aplica también si estoy fuera de la UE pero publico para Europa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. El Reglamento IA tiene alcance extraterritorial similar al RGPD: se aplica cada vez que el sistema de IA se comercializa en el mercado de la Unión Europea o sus resultados llegan a usuarios en la UE, independientemente de dónde tenga sede el proveedor o el deployer.",
      },
    },
    {
      "@type": "Question",
      name: "Cómo añado una etiqueta Made with AI gratis y en pocos segundos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usa la herramienta AI Label de SammaPix: carga la imagen, elige la posición y el estilo de la etiqueta y descarga el archivo etiquetado. Todo ocurre en el navegador, sin subir nada a servidores externos y sin necesidad de registro. La herramienta es gratuita.",
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
        locale="es"
        title="Ley de IA: hay que etiquetar el contenido IA? 2026"
        slug={SLUG}
        description="Desde el 2 de agosto de 2026 las normas de transparencia del Reglamento IA de la UE están en pleno vigor. Si usas inteligencia artificial para crear imágenes, vídeos o audios que publicas, es posible que tengas la obligación de etiquetarlos para que las personas lo sepan. Esta guía explica quién debe hacer qué, cuáles son las excepciones reales y cómo cumplir en pocos minutos, de forma gratuita."
        date="2026-08-08"
        dateFormatted="8 de agosto de 2026"
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "respuesta-rapida", title: "La respuesta rápida" },
          { id: "que-dice-art-50", title: "Qué dice el Art. 50 del Reglamento IA" },
          { id: "a-quien-afecta", title: "A quién afecta en la práctica" },
          { id: "excepciones", title: "Las excepciones previstas por la ley" },
          { id: "plazos", title: "Plazos y fechas clave" },
          { id: "sanciones", title: "Sanciones por incumplimiento" },
          { id: "como-cumplir", title: "Cómo cumplir con las imágenes" },
          { id: "faq", title: "Preguntas frecuentes" },
        ]}
        summary={[
          "Desde el 2 de agosto de 2026 el Art. 50 del Reglamento IA de la UE impone obligaciones de transparencia sobre el contenido generado o manipulado por IA.",
          "Quien genera el contenido (proveedor) debe incorporar una marcación invisible legible por máquinas.",
          "Quien publica el contenido (deployer) debe además añadir una divulgación perceptible por una persona, como una etiqueta visible.",
          "La obligación afecta a marketers, agencias, creadores, e-commerce y a cualquiera que publique contenido IA en un contexto profesional.",
          "Existen excepciones para usos artísticos, creativos y satíricos, pero la divulgación no desaparece: se atenúa.",
          "Puedes añadir una etiqueta Made with AI gratis y en el navegador con la herramienta AI Label de SammaPix.",
        ]}
        heroImage={
          <figure>
            <Link href="/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Foto de Luca Sammarco, fundador de SammaPix, trabajando con contenidos visuales"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Crear contenidos con IA es rápido. Saber etiquetarlos correctamente es la parte
              que muchos pasan por alto. Foto del{" "}
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
              Añade la etiqueta &ldquo;Made with AI&rdquo; en pocos segundos
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Carga la imagen en la herramienta AI Label de SammaPix, elige la posición y el estilo
              de la etiqueta y descarga el archivo etiquetado. Todo en el navegador, sin subir nada
              a servidores externos y sin registro. Gratis.
            </p>
            <Link
              href="/tools/ai-label"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Etiqueta la imagen, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* RESPUESTA RÁPIDA                                                    */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="respuesta-rapida"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          La respuesta rápida
        </h2>
        <p>
          Sí, en muchos casos debes etiquetar el contenido generado por inteligencia artificial
          antes de publicarlo. Desde el <strong>2 de agosto de 2026</strong> las disposiciones de
          transparencia del{" "}
          <strong>Art. 50 del Reglamento IA de la Unión Europea</strong> están plenamente en vigor.
          Si eres una agencia, un creador, una marca o cualquier persona que usa herramientas de IA
          para producir imágenes, vídeos o audios destinados a su publicación, estas obligaciones
          te afectan.
        </p>
        <p>
          Si quieres pasar directamente a la acción:{" "}
          <Link href="/tools/ai-label" className="underline">
            la herramienta AI Label de SammaPix
          </Link>{" "}
          añade una etiqueta visible a tus imágenes directamente en el navegador, de forma gratuita
          y sin subir nada a ningún servidor. Vuelve a esta guía para entender exactamente por qué
          es necesario y cuándo se aplican las excepciones.
        </p>
        <p className="text-xs text-gray-500 dark:text-[#A3A3A3] border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-4">
          Nota: este artículo ofrece información de carácter general y no constituye asesoramiento
          jurídico. Para evaluaciones específicas sobre tu situación, consulta a un profesional
          cualificado.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* QUÉ DICE EL ART. 50                                                 */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="que-dice-art-50"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Qué dice el Art. 50 del Reglamento IA
        </h2>
        <p>
          El Reglamento IA (Reglamento UE 2024/1689) dedica su artículo 50 a la{" "}
          <strong>transparencia de determinados sistemas de IA</strong>. El mecanismo funciona en
          dos niveles distintos, con obligaciones diferentes según el papel que desempeñas en la
          cadena de producción y distribución del contenido.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          El nivel del proveedor: la marcación invisible
        </h3>
        <p>
          Quien construye y comercializa un sistema de IA generativa (el proveedor) está obligado a
          garantizar que los contenidos producidos por el sistema lleven una{" "}
          <strong>marcación legible por máquinas</strong>, incorporada de forma que sobreviva a
          operaciones habituales como el redimensionado o la compresión. Tecnologías como SynthID
          de Google DeepMind entran en esta categoría: añaden una señal esteganográfica invisible
          al ojo humano, pero detectable por sistemas automáticos. Esta obligación recae sobre los
          proveedores de herramientas como Midjourney, DALL·E, Stable Diffusion y similares.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          El nivel del deployer: la divulgación perceptible
        </h3>
        <p>
          Quien usa esos sistemas para producir contenido y luego lo publica (el deployer) tiene
          una obligación adicional e independiente: asegurarse de que el contenido lleve una{" "}
          <strong>divulgación perceptible por una persona</strong>. No basta con la marcación
          invisible que el proveedor ya ha incorporado. Una persona que vea esa imagen o ese vídeo
          debe poder entender que se trata de contenido sintético o significativamente manipulado.
          La forma concreta de esta divulgación no está rígidamente prescrita por la norma: el
          reglamento habla de indicación &ldquo;de forma adecuada y perceptible&rdquo;. En la
          práctica, una etiqueta visible como &ldquo;Made with AI&rdquo; o &ldquo;Generado con
          IA&rdquo; colocada sobre la imagen o en el pie de foto satisface el requisito.
        </p>
        <p>
          Las dos cosas no son intercambiables. Si publicas una imagen que ya lleva la marcación
          invisible del proveedor, todavía no has cumplido tu obligación como deployer. Debes
          igualmente añadir algo que una persona pueda leer o percibir sin herramientas especiales.
        </p>
        <p>
          La norma se aplica en particular a imágenes, vídeos y audios que han sido{" "}
          <strong>íntegramente generados por IA</strong> o bien{" "}
          <strong>manipulados</strong> de forma que alteren significativamente el contenido real,
          lo que en sentido amplio se denomina <em>deepfake</em>. Se incluyen también los
          contenidos que retratan a personas reales en situaciones, lugares o acciones que nunca
          ocurrieron.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* A QUIÉN AFECTA                                                      */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="a-quien-afecta"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          A quién afecta en la práctica
        </h2>
        <p>
          La pregunta que se hacen muchos es: ¿me afecta de verdad? La respuesta depende de qué
          publicas y en qué contexto. A continuación, las categorías más habituales con ejemplos
          concretos.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Marketers y agencias
        </h3>
        <p>
          Si produces imágenes con Midjourney o Adobe Firefly para una campaña publicitaria y las
          usas en redes sociales, display o material impreso, eres un deployer. Las imágenes deben
          llevar una divulgación visible. Esto vale tanto para las publicaciones orgánicas como para
          los anuncios de pago, donde algunas plataformas ya exigen la declaración en el momento
          de la subida.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Creadores e influencers
        </h3>
        <p>
          Un creador que genera fondos, ilustraciones o escenas completas con herramientas de IA y
          las publica como contenido de su canal entra en esta categoría. No es necesario tener una
          empresa formal: el criterio es el contexto profesional o semiprofesional de la publicación.
          Quien usa la IA para crear historias, publicaciones o vídeos que promueven productos o
          servicios, incluso a través de colaboraciones con marcas, está sujeto a la obligación.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          E-commerce con imágenes de producto generadas por IA
        </h3>
        <p>
          Una tienda online que usa herramientas de IA para generar fotos de producto (fondos
          sintéticos, modelos generados, escenas de estilo de vida creadas de cero) está publicando
          imágenes sintéticas a todos los efectos. También en este caso se exige la divulgación. El
          punto no es que la imagen sea &ldquo;falsa&rdquo; en un sentido engañoso, sino que ha
          sido generada por un sistema de IA.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Editores y blogs con ilustraciones de IA
        </h3>
        <p>
          Un sitio de noticias, una revista digital o un blog que usa ilustraciones generadas por
          IA como imágenes de portada o de apoyo a los artículos debe indicarlo de forma
          perceptible. Un pie de foto como &ldquo;Ilustración generada con inteligencia
          artificial&rdquo; o una etiqueta sobre la propia imagen satisface el requisito.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Empresas con chatbots y asistentes de voz
        </h3>
        <p>
          El Art. 50 cubre también los sistemas conversacionales. Si tienes un chatbot en tu web,
          el usuario debe saber que está interactuando con un sistema automatizado y no con una
          persona, a menos que sea evidente por el contexto. Esta obligación es distinta de la que
          afecta a las imágenes, pero merece recordarla porque atañe a muchas empresas que adoptan
          asistentes de IA.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* EXCEPCIONES                                                         */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="excepciones"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Las excepciones previstas por la ley
        </h2>
        <p>
          El reglamento no ignora el contexto. Hay situaciones en las que las obligaciones se
          atenúan o no se aplican en su forma plena.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Contenidos con revisión humana y responsabilidad editorial
        </h3>
        <p>
          Si un texto o contenido generado por IA ha sido revisado de forma sustancial por un ser
          humano, que asume plena responsabilidad editorial, la situación cambia. La obligación de
          divulgación se reduce cuando la contribución de la IA es una herramienta de apoyo, no la
          fuente principal del contenido final. En la práctica: si usas la IA como borrador y luego
          reescribes y revisas en profundidad, el resultado es tu trabajo editorial, no el producto
          del sistema. La línea divisoria es subjetiva, lo que hace que este terreno siga pendiente
          de clarificación mediante directrices de aplicación.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Fuerzas del orden y seguridad nacional
        </h3>
        <p>
          Los sistemas usados por las fuerzas del orden o por razones de seguridad nacional
          disponen de exenciones específicas que escapan al ámbito comercial y creativo de esta
          guía.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Obras artísticas, creativas, satíricas y de ficción
        </h3>
        <p>
          Esta es la excepción que más interesa a los creadores. Para las obras claramente
          artísticas, creativas, satíricas o de ficción, la normativa prevé que la divulgación sea
          exigida pero no deba comprometer el disfrute de la obra. Eso significa que no tienes que
          interrumpir un cortometraje con un aviso a pantalla completa, ni cubrir una ilustración
          artística con una etiqueta invasiva. Una nota discreta en la esquina de la imagen, en el
          pie de foto o en los créditos de la obra es suficiente. La obligación no desaparece: se
          adapta.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Uso personal no distribuido
        </h3>
        <p>
          Quien usa herramientas de IA para generar imágenes de uso estrictamente personal y no las
          distribuye públicamente no está sujeto a las obligaciones del deployer. Si generas fondos
          de pantalla o ilustraciones que nunca salen de tu dispositivo, no estás en el ámbito de
          aplicación de la norma.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* PLAZOS                                                              */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="plazos"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Plazos y fechas clave
        </h2>
        <p>
          El Reglamento IA entró en vigor el 2 de agosto de 2024. Sus disposiciones se aplican de
          forma progresiva, con fechas distintas para categorías diferentes de obligaciones.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>2 de agosto de 2026:</strong> entran en vigor las normas de transparencia del
            Art. 50, incluida la obligación de divulgación perceptible para los deployers de
            contenido sintético.
          </li>
          <li>
            <strong>2 de diciembre de 2026:</strong> plazo último para la conformidad con las
            normas sobre marcación invisible para los sistemas de IA ya presentes en el mercado
            antes del 2 de agosto de 2026 (Art. 50, apartado 2). Los sistemas nuevos lanzados
            después de esa fecha están sujetos a la obligación desde el primer momento.
          </li>
        </ul>
        <p className="mt-3">
          En la práctica, si hoy usas Midjourney o cualquier herramienta de IA para generar
          imágenes que publicas, la obligación de etiquetarlas de forma visible ya está activa. No
          existe un periodo de gracia adicional para la parte que afecta a la divulgación
          perceptible.
        </p>
        <p>
          Para las fuentes oficiales, consulta el texto del Reglamento IA en el sitio web de{" "}
          <a
            href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Estrategia Digital de la Comisión Europea
          </a>{" "}
          y la{" "}
          <a
            href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            versión íntegra del reglamento en EUR-Lex
          </a>
          , que incluye el Art. 50 con todos los detalles técnicos.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SANCIONES                                                           */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="sanciones"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Sanciones por incumplimiento
        </h2>
        <p>
          El Reglamento IA prevé una estructura sancionadora escalonada, proporcional a la gravedad
          de la infracción. Las sanciones más elevadas se refieren a los sistemas de IA prohibidos
          o de alto riesgo, pero las infracciones de las normas de transparencia, incluido el
          Art. 50, entran en todo caso dentro del régimen sancionador del reglamento y pueden ser
          considerables.
        </p>
        <p>
          La aplicación corresponde a las autoridades nacionales competentes designadas por cada
          Estado miembro. En el momento de redactar este artículo, el marco institucional de
          supervisión en varios países de la UE todavía está en proceso de definición. Esto no
          significa que las normas no sean válidas: significa que el sistema se consolidará con el
          tiempo, como ocurrió con el RGPD.
        </p>
        <p>
          El riesgo más inmediato a corto plazo no es necesariamente una sanción económica, sino la
          pérdida de confianza del público y las consecuencias reputacionales derivadas de publicar
          contenido de IA sin declarar, en un momento en que la sensibilidad sobre el tema es
          elevada. Cumplir ahora tiene un coste casi nulo. No hacerlo tiene un coste reputacional
          potencialmente significativo.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* CÓMO CUMPLIR                                                        */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="como-cumplir"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Cómo cumplir con las imágenes: añadir la etiqueta visible
        </h2>
        <p>
          Para las imágenes, el camino más práctico e inmediato es añadir una etiqueta visible como
          &ldquo;Made with AI&rdquo; o &ldquo;Generado con IA&rdquo;. No existe una fórmula
          obligatoria: lo importante es que sea perceptible por una persona que observe el
          contenido. Puedes colocarla en la esquina inferior derecha, como sucede con las marcas de
          agua fotográficas, o en el pie de foto de la imagen en redes sociales y blogs.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Usar la herramienta AI Label de SammaPix
        </h3>
        <p>
          El modo más rápido de añadir la etiqueta es usar{" "}
          <Link href="/tools/ai-label" className="underline">
            la herramienta AI Label de SammaPix
          </Link>
          . Funciona íntegramente en el navegador: no tienes que instalar nada, no tienes que crear
          una cuenta para el uso básico y tu imagen no se sube a ningún servidor. El proceso en
          tres pasos:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-3">
          <li>
            Carga la imagen generada por IA en la herramienta (arrastra el archivo o haz clic para
            seleccionarlo).
          </li>
          <li>
            Elige la posición, el estilo y el texto de la etiqueta. Puedes usar el texto
            predefinido &ldquo;Made with AI&rdquo; o personalizarlo.
          </li>
          <li>
            Descarga la imagen etiquetada, lista para su publicación.
          </li>
        </ol>
        <p className="mt-3">
          Para los contenidos en los que también quieres añadir un sello o un logotipo
          identificativo de tu marca junto a la etiqueta de IA, puedes combinarlo con{" "}
          <Link href="/tools/stampit" className="underline">
            StampIt
          </Link>
          , que añade sellos y marcas de agua personalizadas a las imágenes, también en el
          navegador.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Para redes sociales: usar las funciones nativas de las plataformas
        </h3>
        <p>
          Instagram, LinkedIn y YouTube ya han introducido opciones nativas para declarar el
          contenido de IA en el momento de la subida. Usar estas funciones es una señal positiva,
          pero con atención: algunas plataformas muestran la declaración solo en determinados
          contextos o solo a usuarios conectados. Añadir una etiqueta visible sobre la propia
          imagen sigue siendo la solución más robusta e independiente de la plataforma.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Para blogs y sitios editoriales
        </h3>
        <p>
          Si publicas ilustraciones de IA en un sitio o blog, la vía más sencilla es un pie de
          foto explícito bajo la imagen. Algo como &ldquo;Imagen generada con inteligencia
          artificial&rdquo; es suficiente. Si prefieres una solución más visual, la etiqueta sobre
          la propia imagen es preferible porque funciona también cuando la imagen se comparte fuera
          del contexto original, donde el pie de foto podría no acompañarla.
        </p>
        <p>
          Para comprobar que tus imágenes no contienen metadatos sensibles antes de publicarlas,
          también puedes usar la{" "}
          <Link href="/tools/exif" className="underline">
            herramienta EXIF de SammaPix
          </Link>
          , que muestra y elimina los metadatos directamente en el navegador.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* TABLA RESUMEN                                                       */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Resumen de obligaciones
        </h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Tipo de contenido
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Obligación de divulgación
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Forma requerida
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Imagen de IA en campaña publicitaria
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Sí, plena
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Etiqueta visible y perceptible
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Vídeo de IA en canal social (marca o creador)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Sí, plena
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Etiqueta visible o declaración en descripción
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Ilustración de IA en blog o artículo editorial
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Sí
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Etiqueta sobre la imagen o pie de foto explícito
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Obra artística o satírica con IA
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Sí, atenuada
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Etiqueta discreta o nota en los créditos
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Contenido revisado editorialmente por un humano
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Incierta (depende del grado de revisión)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  A evaluar caso por caso
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Uso personal no distribuido
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  No
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Ningún requisito
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
          Preguntas frecuentes
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Tengo que etiquetar las imágenes generadas con IA?
        </h3>
        <p>
          En muchos casos sí, si eres tú quien las publica. El Art. 50 del Reglamento IA exige que
          las imágenes, los vídeos y los audios sintéticos o significativamente manipulados vayan
          acompañados de una indicación perceptible por una persona. Esta obligación se aplica desde
          el 2 de agosto de 2026. Se exceptúan los contenidos usados en contextos claramente
          artísticos, creativos o satíricos, para los que la divulgación puede ser más discreta.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Basta con la marca de agua invisible o también hace falta una etiqueta visible?
        </h3>
        <p>
          Se necesitan ambas cosas, pero cumplen funciones distintas. La marcación invisible (como
          SynthID de Google DeepMind) es una obligación del proveedor que genera el contenido: debe
          incorporar una señal legible por máquinas. La etiqueta visible es, en cambio, una
          obligación del deployer, es decir, de quien publica ese contenido. La marcación invisible
          por sí sola no satisface la obligación de divulgación hacia el público.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Y si el contenido es artístico o satírico?
        </h3>
        <p>
          Para las obras creativas, artísticas y satíricas la obligación no desaparece, pero se
          atenúa. La normativa prevé que la divulgación no comprometa el disfrute de la obra: una
          etiqueta discreta en una esquina de la imagen o una nota en el pie de foto son
          suficientes. No es necesario interrumpir el contenido con un aviso invasivo.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          La obligación vale también si no soy una empresa sino un creador o un influencer?
        </h3>
        <p>
          Sí. Las normas de transparencia del Art. 50 se aplican a los deployers, es decir, a
          cualquiera que use un sistema de IA para producir y publicar contenido en un contexto
          profesional o comercial. Creadores, influencers y agencias entran en esta categoría.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Se aplica también si estoy fuera de la UE pero publico para Europa?
        </h3>
        <p>
          Sí. El Reglamento IA tiene alcance extraterritorial similar al RGPD: se aplica cada vez
          que el sistema de IA se comercializa en el mercado de la Unión Europea o sus resultados
          llegan a usuarios en la UE, independientemente de dónde tenga sede el proveedor o el
          deployer.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Cómo añado una etiqueta &ldquo;Made with AI&rdquo; gratis y en pocos segundos?
        </h3>
        <p>
          Usa la herramienta{" "}
          <Link href="/tools/ai-label" className="underline">
            AI Label de SammaPix
          </Link>
          : carga la imagen, elige la posición y el estilo de la etiqueta y descarga el archivo
          etiquetado. Todo ocurre en el navegador, sin subir nada a servidores externos y sin
          registro. La herramienta es gratuita. Si además quieres añadir un sello o una marca de
          agua personalizada,{" "}
          <Link href="/tools/stampit" className="underline">
            StampIt
          </Link>{" "}
          es lo que necesitas.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* GUÍAS RELACIONADAS                                                  */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">
          Guías relacionadas
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/es/blog/anadir-etiqueta-made-with-ai" className="underline">
              Cómo añadir la etiqueta Made with AI a imágenes (gratis)
            </Link>
          </li>
          <li>
            <Link href="/blog/eu-ai-act-label-ai-content" className="underline">
              EU AI Act: do you need to label AI content? (English)
            </Link>
          </li>
          <li>
            <Link href="/tools/ai-label" className="underline">
              Herramienta AI Label de SammaPix
            </Link>
          </li>
          <li>
            <Link href="/tools/exif" className="underline">
              Eliminar metadatos EXIF de imágenes
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
