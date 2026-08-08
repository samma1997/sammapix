import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "anadir-etiqueta-made-with-ai";
const URL = `${APP_URL}/es/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Añadir una etiqueta Made with AI a imágenes (gratis)",
  description:
    "Guía paso a paso para añadir la etiqueta Made with AI a tus imágenes con la herramienta gratuita de SammaPix: en el navegador, sin subir archivos, texto personalizable.",
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
    "añadir etiqueta made with ai",
    "etiquetar fotos generadas con ia",
    "añadir marca de agua ia gratis",
    "disclosure ia imagenes como hacer",
    "etiqueta ia fotos online",
  ],
  openGraph: {
    title: "Añadir una etiqueta Made with AI a imágenes (gratis)",
    description:
      "Desde el 2 de agosto de 2026 el Reglamento IA impone divulgar las imágenes generadas con IA. Aquí tienes cómo añadir la etiqueta Made with AI, gratis y en el navegador.",
    url: URL,
    type: "article",
    locale: "es_ES",
    publishedTime: "2026-08-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Añadir una etiqueta Made with AI a imágenes (gratis)",
    description:
      "Reglamento IA en vigor: añade la etiqueta Made with AI a tus imágenes en pocos segundos, gratis y sin subir nada.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Añadir una etiqueta Made with AI a imágenes (gratis)",
  description:
    "Guía práctica para creadores, marketers y empresas que deben declarar el contenido generado con inteligencia artificial. Paso a paso con la herramienta gratuita SammaPix AI Label, en el navegador, sin subir archivos.",
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
      name: "Añadir una etiqueta Made with AI a imágenes",
      item: URL,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo añadir la etiqueta Made with AI a imágenes",
  description:
    "Procedimiento paso a paso para añadir la divulgación de IA a una o varias imágenes generadas con inteligencia artificial, usando la herramienta gratuita SammaPix AI Label en el navegador.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix AI Label",
      url: `${APP_URL}/tools/ai-label`,
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Abre la herramienta AI Label",
      text: "Ve a sammapix.com/tools/ai-label. No hace falta crear una cuenta ni instalar nada.",
      url: `${APP_URL}/tools/ai-label`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Carga las imágenes",
      text: "Arrastra una o varias imágenes al área de carga o haz clic para seleccionarlas. Los archivos permanecen en tu navegador: no se suben a ningún servidor.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Elige el texto de la etiqueta",
      text: "Selecciona uno de los presets (Made with AI, AI-generated, AI-assisted) o escribe un texto personalizado adecuado para tu marca.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Configura la posición, el estilo y el tamaño",
      text: "Elige entre las 5 posiciones disponibles (esquinas y centro), el estilo visual (solid, subtle, outline) y el tamaño del texto. La vista previa se actualiza en tiempo real.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Descarga el resultado",
      text: "Haz clic en Descargar para obtener la imagen individual (gratis, sin registro) o usa el modo por lotes para descargar todas las imágenes de una vez.",
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
      name: "La herramienta AI Label de SammaPix es gratuita?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Puedes añadir la etiqueta a una sola imagen de forma gratuita, sin registrarte y sin subir nada a servidores externos. El modo por lotes (varias imágenes a la vez) está disponible para los usuarios Pro.",
      },
    },
    {
      "@type": "Question",
      name: "Mis imágenes se suben a un servidor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. La herramienta funciona íntegramente en tu navegador. Los archivos nunca salen de tu dispositivo: ningún servidor recibe ni ve tus imágenes.",
      },
    },
    {
      "@type": "Question",
      name: "La etiqueta visible es suficiente para cumplir con el Reglamento IA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El Reglamento IA (Art. 50) exige que el contenido sintético esté marcado de forma legible por máquinas y reconocible para los usuarios. Una etiqueta visual es un paso importante y responde a la obligación de divulgación hacia el público, pero las plataformas más grandes también deben adoptar marcas de agua técnicas incorporadas en los metadatos. Para creadores y empresas que se comunican en línea, la etiqueta visible ya representa una práctica de transparencia concreta. Esta información es de carácter general y no constituye asesoramiento jurídico.",
      },
    },
    {
      "@type": "Question",
      name: "Puedo etiquetar varias fotos en modo por lotes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Arrastra varias imágenes al área de la herramienta y usa la función por lotes para aplicar la misma configuración a todas en una sola operación. Muy útil para campañas publicitarias o lanzamientos de producto.",
      },
    },
    {
      "@type": "Question",
      name: "Qué formatos de imagen admite la herramienta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La herramienta admite JPEG, PNG y WebP. Funciona desde cualquier navegador moderno en escritorio o móvil, sin instalar nada.",
      },
    },
    {
      "@type": "Question",
      name: "Puedo personalizar el texto de la etiqueta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Además de los presets estándar (Made with AI, AI-generated, AI-assisted) puedes escribir cualquier texto en el campo personalizado: por ejemplo, el nombre de tu marca seguido de una nota sobre IA, o la fórmula exigida por tu cliente.",
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
        locale="es"
        title="Añadir una etiqueta Made with AI a imágenes (gratis)"
        slug={SLUG}
        description="Desde el 2 de agosto de 2026 el Reglamento IA europeo obliga a declarar el contenido generado con inteligencia artificial. Si usas Midjourney, DALL·E, Stable Diffusion o cualquier otro generador para tus imágenes, necesitas saber cómo añadir la etiqueta correcta antes de publicarlas. Esta guía muestra el método más rápido: gratis, en el navegador, sin subir nada."
        date="2026-08-08"
        dateFormatted="8 de agosto de 2026"
        tags={["Tools", "Creative", "Workflow"]}
        readingTime={8}
        headings={[
          { id: "respuesta-rapida", title: "La respuesta rápida" },
          { id: "por-que-ahora", title: "Por qué lo necesitas ahora" },
          { id: "paso-a-paso", title: "Paso a paso con AI Label" },
          { id: "buenas-practicas", title: "Buenas prácticas" },
          { id: "alternativas", title: "Alternativas y por qué el navegador gana" },
          { id: "faq", title: "Preguntas frecuentes" },
        ]}
        summary={[
          "El Reglamento IA (Art. 50) en vigor desde el 2 de agosto de 2026 obliga a declarar las imágenes generadas con IA.",
          "Añadir una etiqueta visual es el modo más rápido y práctico de cumplir con la obligación de transparencia hacia el público.",
          "La herramienta gratuita SammaPix AI Label procesa las imágenes en el navegador: los archivos nunca salen del dispositivo.",
          "Puedes elegir el texto (preset o personalizado), la posición, el estilo y el tamaño con vista previa en tiempo real.",
          "El modo por lotes permite etiquetar conjuntos completos de imágenes en un solo paso.",
          "Conserva siempre los originales sin etiquetar en una carpeta separada.",
        ]}
        heroImage={
          <figure>
            <Link href="/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Foto tomada por Luca Sammarco, fotógrafo y fundador de SammaPix"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Declarar el contenido de IA es una decisión de transparencia antes incluso que una
              obligación normativa. Foto del{" "}
              <Link href="/portfolio" className="underline">
                portfolio
              </Link>
              .
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Añade la etiqueta de IA a tus fotos ahora
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Arrastra las imágenes, elige el texto y descarga. Todo en el navegador, sin subidas,
              sin registro. Gratis para una sola imagen.
            </p>
            <Link
              href="/tools/ai-label"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Abrir AI Label, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* SECCIÓN 1: RESPUESTA RÁPIDA                                         */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="respuesta-rapida"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          La respuesta rápida
        </h2>
        <p>
          Si tienes poco tiempo: ve a{" "}
          <Link href="/tools/ai-label" className="underline">
            SammaPix AI Label
          </Link>
          , arrastra las imágenes generadas con IA, elige el texto (por ejemplo &laquo;Made with
          AI&raquo; o &laquo;AI-generated&raquo;), ajusta la posición y descarga. La operación
          completa lleva menos de dos minutos por imagen, o mucho menos en modo por lotes. La
          herramienta funciona en el navegador: los archivos nunca salen del dispositivo.
        </p>
        <p>
          Si quieres entender por qué la divulgación se ha vuelto necesaria, qué obligaciones
          afectan a creadores y empresas y qué dice exactamente la normativa de la UE, lee antes
          nuestro artículo de referencia:{" "}
          <Link href="/es/blog/ley-ia-etiquetar-contenido-ia" className="underline">
            Ley de IA: ¿hay que etiquetar el contenido IA?
          </Link>
          . Aquí nos centramos en el cómo.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SECCIÓN 2: POR QUÉ AHORA                                            */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="por-que-ahora"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Por qué lo necesitas ahora
        </h2>
        <p>
          El Reglamento IA europeo (Reglamento UE 2024/1689) entró en aplicación gradual desde
          2024 y el 2 de agosto de 2026 puso plenamente en vigor las disposiciones del artículo 50,
          las que afectan a la transparencia del contenido sintético. En resumen: quien produce o
          distribuye imágenes, vídeos o audios generados con inteligencia artificial debe declararlo
          de forma reconocible para quien los ve.
        </p>
        <p>
          Para un creador que publica en Instagram, una empresa que usa imágenes de IA en campañas
          publicitarias o una agencia que proporciona contenido visual a sus clientes, la divulgación
          ya no es una elección estilística sino una práctica exigida. Ignorarla expone a riesgos
          reputacionales y, en los casos más graves, a consecuencias regulatorias.
        </p>
        <p>
          La buena noticia es que añadir una etiqueta visible es sencillo y no requiere herramientas
          complejas. Se necesita una herramienta que funcione bien, que respete tu privacidad y que
          no convierta cada imagen en un trámite burocrático. Eso es lo que hemos construido con{" "}
          <Link href="/tools/ai-label" className="underline">
            AI Label
          </Link>
          .
        </p>

        {/* Tabla de contextos */}
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1F1F1F]">
                <th className="text-left px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] font-semibold text-gray-700 dark:text-[#E5E5E5]">
                  Quién eres
                </th>
                <th className="text-left px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] font-semibold text-gray-700 dark:text-[#E5E5E5]">
                  Caso de uso típico
                </th>
                <th className="text-left px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] font-semibold text-gray-700 dark:text-[#E5E5E5]">
                  Etiqueta recomendada
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Creador en redes sociales
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Posts con fondos o personajes generados
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  AI-generated (estilo subtle)
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-[#1A1A1A]">
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Marketer o agencia
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Visuales para campañas de anuncios o email
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Made with AI (estilo outline o solid)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Empresa de e-commerce
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Fotos de producto con fondos de IA
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  AI-assisted (texto personalizado)
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-[#1A1A1A]">
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Artista digital
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Obras de arte con componente de IA
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Texto personalizado (estilo subtle u outline)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECCIÓN 3: PASO A PASO                                              */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="paso-a-paso"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Paso a paso con AI Label
        </h2>
        <p>
          El proceso está pensado para ser rápido. Aquí tienes los cinco pasos explicados en
          detalle.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Paso 1: abre la herramienta
        </h3>
        <p>
          Ve a{" "}
          <Link href="/tools/ai-label" className="underline">
            sammapix.com/tools/ai-label
          </Link>
          . No hace falta crear una cuenta, no hay nada que descargar y no se pide ningún dato de
          pago. La página carga y estás listo para empezar.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Paso 2: arrastra las imágenes
        </h3>
        <p>
          Arrastra uno o varios archivos al área indicada, o haz clic para abrir el selector de
          archivos. La herramienta acepta JPEG, PNG y WebP. Los archivos se procesan directamente
          en el navegador: ningún dato transita hacia servidores externos, lo que es especialmente
          relevante si trabajas con imágenes reservadas o con contenido de clientes.
        </p>
        <p>
          En cuanto se carga el archivo, aparece una vista previa de la imagen con la etiqueta
          superpuesta. A partir de ese momento cualquier cambio que hagas se refleja en la vista
          previa en tiempo real.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Paso 3: elige el texto
        </h3>
        <p>
          Tienes tres presets listos para usar:
        </p>
        <ul className="list-disc pl-5 space-y-1 my-3">
          <li>
            <strong>Made with AI</strong>: el más internacional, reconocible también para quien no
            habla español. Adecuado para campañas distribuidas en varios países.
          </li>
          <li>
            <strong>AI-generated</strong>: explícito, indica que el contenido ha sido producido
            íntegramente por un sistema de inteligencia artificial.
          </li>
          <li>
            <strong>AI-assisted</strong>: útil cuando la imagen procede de una fotografía real que
            ha sido retocada o mejorada con herramientas de IA.
          </li>
        </ul>
        <p>
          Si ninguno de los tres se adapta, puedes escribir cualquier texto personalizado. Algunas
          empresas prefieren una fórmula como &laquo;Imagen generada con IA&raquo; o incluir el
          nombre de la herramienta usada. La elección es tuya.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Paso 4: configura la posición, el estilo y el tamaño
        </h3>
        <p>
          Estas tres opciones determinan cómo aparece la etiqueta sobre la imagen. La posición
          tiene cinco variantes: esquina inferior derecha, esquina inferior izquierda, esquina
          superior derecha, esquina superior izquierda y centro. El estilo visual se divide en tres:
        </p>
        <ul className="list-disc pl-5 space-y-1 my-3">
          <li>
            <strong>Solid</strong>: fondo opaco con texto de alto contraste. Máxima visibilidad,
            ideal para contenidos publicitarios donde la divulgación debe ser inmediatamente
            legible.
          </li>
          <li>
            <strong>Subtle</strong>: fondo semitransparente, menos invasivo. Funciona bien en
            contenidos editoriales u obras artísticas donde no quieres que la etiqueta domine la
            imagen.
          </li>
          <li>
            <strong>Outline</strong>: solo borde y texto sin fondo sólido. Adecuado para imágenes
            con fondo claro o uniforme donde un contorno es suficiente para garantizar la
            legibilidad.
          </li>
        </ul>
        <p>
          El tamaño se ajusta con un control deslizante: puedes agrandar o reducir el texto hasta
          encontrar el equilibrio entre visibilidad y discreción. Cada cambio actualiza la vista
          previa sin necesidad de recargar la página.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Paso 5: descarga
        </h3>
        <p>
          Haz clic en &laquo;Descargar&raquo; para obtener la imagen con la etiqueta incorporada.
          El archivo queda en el mismo formato que el original y no pierde calidad: la etiqueta se
          dibuja sobre los píxeles existentes sin recomprimir la imagen completa.
        </p>
        <p>
          Si has cargado varias imágenes y quieres aplicar la misma configuración a todas, usa el
          modo por lotes: procesa todo el conjunto en un solo paso y descarga todo con un clic. Muy
          útil para campañas publicitarias donde tienes que etiquetar diez, veinte o cien visuales
          de forma coherente.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SECCIÓN 4: BUENAS PRÁCTICAS                                         */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="buenas-practicas"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Buenas prácticas para el etiquetado de IA
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Dónde colocar la etiqueta
        </h3>
        <p>
          La regla principal es que la etiqueta debe ser legible sin que el destinatario tenga que
          buscarla. La esquina inferior derecha es la posición más extendida porque sigue la
          convención ya establecida para las marcas de agua fotográficas: quien mira la imagen sabe
          dónde buscar. Para los banners publicitarios verticales (formato stories o reels) la
          esquina superior izquierda puede ser más visible porque no se superpone a los botones de
          acción que suelen estar abajo.
        </p>
        <p>
          Para las obras artísticas la elección puede ser más discreta. Lo importante, también en
          este caso, es que la etiqueta esté presente y sea legible, no escondida con un texto del
          color del fondo o reducida a un tamaño ilegible.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Etiqueta toda la campaña de una vez
        </h3>
        <p>
          Si estás preparando un conjunto de visuales para una campaña, etiquétalos todos de una
          vez antes de entregarlos o subirlos a las plataformas. Hacerlo imagen por imagen aumenta
          el riesgo de olvidar alguna. Con el modo por lotes de{" "}
          <Link href="/tools/ai-label" className="underline">
            AI Label
          </Link>{" "}
          puedes aplicar la misma configuración a todo el conjunto en pocos segundos.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Conserva siempre los originales
        </h3>
        <p>
          Guarda una copia de los archivos originales sin etiquetar en una carpeta separada.
          Podrías necesitarlos para crear variantes con textos distintos, para redimensionarlos en
          otros formatos o simplemente como archivo. Una vez que la etiqueta está incorporada en los
          píxeles, eliminarla sin degradar la calidad no es posible.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Coherencia dentro de la marca
        </h3>
        <p>
          Elige una sola fórmula y un estilo que se vuelva reconocible para tu público. Cambiar el
          texto cada vez (ahora &laquo;Made with AI&raquo;, ahora &laquo;IA&raquo;, ahora
          &laquo;Generado con inteligencia artificial&raquo;) crea confusión y reduce la eficacia
          de la divulgación. Define un estándar interno, guárdalo como plantilla favorita y aplícalo
          siempre.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SECCIÓN 5: ALTERNATIVAS                                             */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="alternativas"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Alternativas y por qué el navegador gana en privacidad
        </h2>
        <p>
          Existen varias formas de añadir una etiqueta a una imagen. Veamos las principales y por
          qué el procesamiento en el navegador sigue siendo la opción más sensata para quien valora
          la confidencialidad.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Editores gráficos (Photoshop, Canva, Affinity)
        </h3>
        <p>
          Funcionan perfectamente pero requieren pasos manuales para cada imagen: abrir el archivo,
          crear una capa de texto, posicionarla, exportar. Para una o dos imágenes es aceptable,
          para una campaña de veinte visuales se convierte en un trabajo repetitivo que lleva
          fácilmente a errores de coherencia. Canva además requiere subir el archivo a sus propios
          servidores.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Scripts locales (ImageMagick, ffmpeg)
        </h3>
        <p>
          La solución más potente para quien sabe usar la línea de comandos. ImageMagick permite
          procesar carpetas enteras con un solo comando. La desventaja es la curva de aprendizaje:
          no apta para quien no está familiarizado con la terminal, y requiere configuración cada
          vez que se cambia la fuente o la posición.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Herramientas online con subida al servidor
        </h3>
        <p>
          Muchas herramientas de marca de agua en línea reciben los archivos en sus propios
          servidores para procesarlos. El resultado es visualmente similar, pero has perdido el
          control: no sabes dónde se guardan los archivos, durante cuánto tiempo ni quién puede
          acceder a ellos. Para imágenes que todavía no se han publicado, como las vistas previas
          de una campaña o el contenido de un cliente, esta pérdida de control es significativa.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          La ventaja del navegador
        </h3>
        <p>
          Cuando una herramienta funciona en el navegador, el procesamiento ocurre en la CPU de tu
          ordenador. Los archivos no transitan por redes externas. Para{" "}
          <Link href="/tools/ai-label" className="underline">
            SammaPix AI Label
          </Link>{" "}
          esto significa que puedes etiquetar imágenes reservadas, vistas previas de campaña o
          contenido de clientes sin preocuparte de dónde acaban. Es el mismo principio que
          aplicamos a todas las herramientas de SammaPix: el archivo permanece en tu dispositivo,
          el servidor nunca lo ve.
        </p>

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
          La herramienta AI Label de SammaPix es gratuita?
        </h3>
        <p>
          Sí. Puedes añadir la etiqueta a una sola imagen de forma gratuita, sin crear una cuenta
          y sin introducir datos de pago. El modo por lotes, que permite procesar varias imágenes
          al mismo tiempo, está disponible para los usuarios Pro.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Mis imágenes se suben a un servidor?
        </h3>
        <p>
          No. La herramienta funciona íntegramente en tu navegador. Los archivos nunca salen del
          dispositivo y ningún servidor recibe ni ve tus imágenes. Esto vale tanto para la imagen
          individual como para el modo por lotes.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          La etiqueta visible es suficiente para la norma de la UE?
        </h3>
        <p>
          El Reglamento IA (Art. 50) exige que el contenido sintético esté marcado de forma
          reconocible para los usuarios. Una etiqueta visual responde a la obligación de
          transparencia hacia el público y es el paso más concreto e inmediato que creadores y
          empresas pueden dar. Las plataformas con amplia difusión también están obligadas a adoptar
          marcas de agua técnicas incorporadas en los metadatos (estándares como C2PA). Para quien
          produce y distribuye contenido en línea, la etiqueta visual ya es una práctica de
          divulgación sustancial. Esta información es de carácter general y no constituye
          asesoramiento jurídico: para evaluaciones específicas, consulta a un profesional.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Puedo etiquetar varias fotos en modo por lotes?
        </h3>
        <p>
          Sí. Arrastra varias imágenes al área de la herramienta y usa la función por lotes para
          aplicar la misma configuración a todas en una sola operación. Es la forma más eficiente
          de gestionar campañas publicitarias, lanzamientos de producto o archivos de contenido
          de IA.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Qué formatos de imagen admite la herramienta?
        </h3>
        <p>
          La herramienta admite JPEG, PNG y WebP. Funciona desde cualquier navegador moderno
          (Chrome, Firefox, Safari, Edge) tanto en escritorio como en móvil, sin instalar
          extensiones ni aplicaciones.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Puedo personalizar el texto de la etiqueta?
        </h3>
        <p>
          Sí. Además de los tres presets estándar puedes escribir cualquier texto en el campo
          personalizado. Algunas empresas prefieren incluir el nombre del generador de IA utilizado
          o una fórmula específica exigida por el cliente. El texto personalizado se combina con
          todas las opciones de estilo y posición.
        </p>

        <p className="text-xs text-gray-500 dark:text-[#A3A3A3] border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-6">
          Nota: este artículo ofrece información de carácter general y no constituye asesoramiento
          jurídico. Para evaluaciones específicas sobre tu situación, consulta a un profesional
          cualificado.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* GUÍAS RELACIONADAS                                                  */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">
          Guías relacionadas
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/es/blog/ley-ia-etiquetar-contenido-ia" className="underline">
              Ley de IA: ¿hay que etiquetar el contenido IA? (guía completa)
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-add-made-with-ai-label" className="underline">
              How to add a Made with AI label to images (English)
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
          <li>
            <Link href="/tools/stampit" className="underline">
              Añadir marca de agua personalizada (StampIt)
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
