import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "foto-dni-pasaporte-tamano";
const URL = `${APP_URL}/es/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Foto para DNI y pasaporte: tamano y reglas (2026)",
  description:
    "Medidas exactas de la foto para el DNI espanol (32 x 26 mm) y el pasaporte (35 x 45 mm), requisitos de fondo, motivos de rechazo y como hacerla gratis en el navegador sin subir tus documentos.",
  alternates: {
    canonical: URL,
    languages: {
      es: `https://www.sammapix.com/es/blog/${SLUG}`,
      "x-default": `https://www.sammapix.com/es/blog/${SLUG}`,
    },
  },
  keywords: [
    "foto dni tamano",
    "medidas foto dni",
    "foto pasaporte tamano",
    "foto carnet en linea",
    "foto dni fondo",
    "hacer foto dni gratis",
  ],
  openGraph: {
    title: "Foto para DNI y pasaporte: tamano y reglas (2026)",
    description:
      "Medidas exactas, requisitos de fondo y paso a paso para hacer tu foto de DNI o pasaporte gratis en el navegador. Sin subir documentos de identidad a ningun servidor.",
    url: URL,
    type: "article",
    locale: "es_ES",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foto para DNI y pasaporte: tamano y reglas (2026)",
    description:
      "DNI espanol: 32 x 26 mm. Pasaporte: 35 x 45 mm. Requisitos, motivos de rechazo y como hacerla gratis en el navegador sin subir tus datos.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Foto para DNI y pasaporte: tamano y reglas (2026)",
  description:
    "Guia completa sobre las medidas de la foto para el DNI espanol (32 x 26 mm) y el pasaporte (35 x 45 mm): requisitos oficiales de fondo, expresion y encuadre, motivos de rechazo mas frecuentes y un paso a paso para preparar la foto gratis en el navegador sin subir documentos a ningun servidor.",
  url: URL,
  datePublished: "2026-08-09",
  dateModified: "2026-08-09",
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
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/es/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Foto para DNI y pasaporte: tamano y reglas",
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
      name: "Que tamano tiene la foto del DNI espanol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La foto para el DNI espanol mide 32 x 26 mm (alto x ancho). Este formato es propio del documento nacional de identidad espanol y difiere del formato internacional estandar que se usa para el pasaporte. La imagen debe mostrar el rostro de frente sobre fondo uniforme claro, preferiblemente blanco o gris muy claro.",
      },
    },
    {
      "@type": "Question",
      name: "Que tamano tiene la foto del pasaporte?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La foto para el pasaporte espanol mide 35 x 45 mm (ancho x alto), siguiendo el estandar internacional ICAO. Este formato tambien se acepta en la mayoria de tramites consulares y visados internacionales. La diferencia con la foto del DNI es importante: no uses la misma imagen sin ajustar las medidas.",
      },
    },
    {
      "@type": "Question",
      name: "Puedo hacer la foto del DNI en casa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Si, es posible hacerla en casa siempre que cumpla todos los requisitos: fondo uniforme claro, buena iluminacion, rostro de frente, sin gafas de sol, sin sombreros ni complementos que oculten el rostro, expresion neutra con la boca cerrada, y ojos bien abiertos. Una foto hecha con un movil moderno ante una pared blanca puede superar la calidad de muchas fotos de cabina si se aplican bien las normas.",
      },
    },
    {
      "@type": "Question",
      name: "Es gratis preparar la foto con SammaPix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Si. La herramienta Passport Photo de SammaPix es gratuita para el uso basico. Permite ajustar el encuadre, limpiar el fondo y preparar la foto con las medidas correctas directamente en el navegador, sin necesidad de crear una cuenta. Las funciones avanzadas de exportacion en lote estan disponibles en el plan Pro.",
      },
    },
    {
      "@type": "Question",
      name: "Se suben mis fotos a algun servidor al usar la herramienta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SammaPix procesa las imagenes completamente en el navegador, en tu dispositivo. Ningun archivo se transmite a servidores externos durante el procesado. Esto es especialmente relevante cuando se trata de documentos de identidad, que contienen datos personales sensibles. Tus fotos nunca salen de tu navegador.",
      },
    },
    {
      "@type": "Question",
      name: "Que fondo debe tener la foto del DNI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El fondo debe ser uniforme y claro, preferiblemente blanco o gris muy claro. No se admiten fondos de colores llamativos, estampados, con sombras marcadas o con otros elementos visibles. La herramienta Passport Photo de SammaPix puede limpiar y uniformizar el fondo de tu foto directamente en el navegador.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Como preparar la foto del DNI o pasaporte gratis en el navegador",
  description:
    "Pasos para obtener una foto de DNI o pasaporte con las medidas correctas y fondo adecuado usando las herramientas gratuitas de SammaPix, sin subir archivos a ningun servidor.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Tomar la foto base",
      text: "Fotografiate frente a una pared clara con buena iluminacion natural. Mantén el rostro de frente, expresion neutra, boca cerrada y ojos bien abiertos. Usa una camara o el movil en modo retrato.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Ajustar el encuadre y el fondo",
      text: "Abre la herramienta Passport Photo de SammaPix en sammapix.com/tools/passport-photo. Sube la foto, selecciona el pais (Espana) y el tipo de documento (DNI o pasaporte). La herramienta aplicara automaticamente las medidas correctas y puede limpiar el fondo.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Ajustar las dimensiones en pixeles si es necesario",
      text: "Si necesitas un tamano especifico en pixeles para un formulario digital, usa la herramienta ResizePack de SammaPix para definir las dimensiones exactas sin perder calidad.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Reducir el peso del archivo si hay limite de subida",
      text: "Para formularios online que exigen un archivo de menos de 200 KB o 500 KB, usa la herramienta Compress de SammaPix para reducir el peso sin degradar la imagen de forma visible.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Descargar e imprimir o adjuntar",
      text: "Descarga la imagen preparada. Si la necesitas impresa, lleva el archivo a una copisteria o imprimela en casa en papel fotografico. Si la necesitas en formato digital, adjuntala directamente al formulario oficial.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <BlogArticleLayout
        locale="es"
        title="Foto para DNI y pasaporte: tamano y reglas (2026)"
        slug={SLUG}
        description="La foto del DNI espanol mide 32 x 26 mm. La del pasaporte mide 35 x 45 mm. Son dos formatos distintos con requisitos distintos, y confundirlos es uno de los motivos de rechazo mas comunes en las oficinas de expedicion. Esta guia cubre las medidas exactas, los requisitos de fondo y expresion, los errores que provocan rechazo, y como preparar la foto correctamente gratis en el navegador sin subir tus documentos a ningun servidor."
        date="2026-08-09"
        dateFormatted="9 de agosto de 2026"
        tags={["Tools", "Workflow", "Privacy"]}
        readingTime={8}
        headings={[
          { id: "diferencia-dni-pasaporte", title: "DNI y pasaporte: dos formatos distintos" },
          { id: "medidas-dni", title: "Medidas de la foto del DNI espanol" },
          { id: "medidas-pasaporte", title: "Medidas de la foto del pasaporte" },
          { id: "requisitos-fondo", title: "Requisitos de fondo, iluminacion y encuadre" },
          { id: "motivos-rechazo", title: "Motivos de rechazo mas frecuentes" },
          { id: "como-hacerla-gratis", title: "Como hacer la foto gratis en el navegador" },
          { id: "paso-a-paso", title: "Paso a paso con SammaPix" },
          { id: "faq", title: "Preguntas frecuentes" },
        ]}
        summary={[
          "La foto del DNI espanol mide 32 x 26 mm (alto x ancho), un formato propio que difiere del estandar internacional.",
          "La foto del pasaporte espanol mide 35 x 45 mm (ancho x alto), siguiendo el estandar ICAO usado en la mayoria de paises.",
          "El fondo debe ser uniforme y claro (blanco o gris muy claro), sin sombras, estampados ni elementos extraños.",
          "Rostro de frente, expresion neutra, boca cerrada, sin gafas de sol, sin sombreros ni complementos que oculten el rostro.",
          "La herramienta Passport Photo de SammaPix ajusta el encuadre y limpia el fondo directamente en el navegador, sin subir archivos.",
          "Ningun archivo sale de tu dispositivo durante el procesado: privacidad total para tus documentos de identidad.",
        ]}
        heroImage={
          <figure>
            <Link href="/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Foto de Luca Sammarco, fundador de SammaPix, trabajando con herramientas de edicion de imagen en el navegador"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Preparar una foto de DNI o pasaporte no requiere ir a una cabina fotografica. Con las
              herramientas correctas basta con el movil y el navegador. Foto del{" "}
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
              Prepara tu foto de DNI o pasaporte gratis
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              La herramienta Passport Photo de SammaPix ajusta las medidas, limpia el fondo y
              prepara la imagen lista para imprimir o adjuntar. Todo en el navegador, sin subir
              documentos a ningun servidor y sin registro obligatorio.
            </p>
            <Link
              href="/tools/passport-photo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Preparar foto gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* DNI Y PASAPORTE: DOS FORMATOS DISTINTOS                             */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="diferencia-dni-pasaporte"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          DNI y pasaporte: dos formatos distintos que se confunden con frecuencia
        </h2>
        <p>
          Uno de los errores mas comunes al preparar documentacion oficial es asumir que la foto del
          DNI y la foto del pasaporte son intercambiables. No lo son. El DNI espanol utiliza un
          formato propio que no coincide con el estandar internacional, y presentar la foto
          equivocada es un motivo de rechazo directo en las oficinas de la Policia Nacional y en los
          consulados.
        </p>
        <p>
          Si lo que necesitas es pasar a la accion de inmediato:{" "}
          <Link href="/tools/passport-photo" className="underline">
            la herramienta Passport Photo de SammaPix
          </Link>{" "}
          te permite seleccionar el tipo de documento y el pais, y aplica automaticamente las medidas
          correctas. El proceso ocurre completamente en tu navegador, sin subir ninguna imagen a
          servidores externos. Tus documentos de identidad no salen de tu dispositivo.
        </p>
        <p className="text-xs text-gray-500 dark:text-[#A3A3A3] border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-4">
          Nota: esta guia ofrece informacion de caracter general basada en los requisitos publicados
          por las autoridades competentes. Los requisitos oficiales pueden actualizarse. Verifica
          siempre en la web de la Policia Nacional o del Ministerio de Asuntos Exteriores antes de
          presentar tu solicitud.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* MEDIDAS DNI                                                          */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="medidas-dni"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Medidas de la foto del DNI espanol
        </h2>
        <p>
          La foto para el <strong>DNI espanol</strong> tiene unas dimensiones de{" "}
          <strong>32 mm de alto por 26 mm de ancho</strong>. Este formato es especifico del
          documento nacional de identidad espanol y no coincide con el estandar ICAO que se emplea
          en los pasaportes. La razon historica es que el DNI espanol tiene un tamano de tarjeta
          mas compacto, lo que condiciona el espacio disponible para la fotografia.
        </p>
        <p>
          En la practica, si vas a imprimir la foto en papel fotografico, necesitas que el laboratorio
          o la copisteria aplique exactamente esas dimensiones. Si presentas la foto de forma digital
          en un formulario online (por ejemplo, para la renovacion con cita previa o para algunos
          tramites consulares), el archivo debe tener las proporciones correctas y respetar el limite
          de peso que indique el formulario.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Tamano en pixeles equivalente
        </h3>
        <p>
          Para uso digital, las medidas fisicas se convierten en pixeles segun la resolucion de
          impresion deseada. A 300 ppp (la resolucion estandar para impresion de calidad), 32 x 26
          mm equivalen aproximadamente a{" "}
          <strong>378 x 307 pixeles</strong>. Algunos formularios electronicos especifican
          directamente el tamano en pixeles, por lo que conviene revisar las instrucciones del
          portal donde vayas a presentar la solicitud.
        </p>
        <p>
          Si necesitas ajustar las dimensiones de la imagen a un valor concreto en pixeles, la
          herramienta{" "}
          <Link href="/tools/resizepack" className="underline">
            ResizePack de SammaPix
          </Link>{" "}
          te permite definir ancho y alto exactos sin perder calidad. Funciona en el navegador y no
          requiere registro.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* MEDIDAS PASAPORTE                                                    */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="medidas-pasaporte"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Medidas de la foto del pasaporte
        </h2>
        <p>
          La foto para el <strong>pasaporte espanol</strong> sigue el estandar internacional ICAO
          (Organizacion de Aviacion Civil Internacional): <strong>35 mm de ancho por 45 mm de alto</strong>.
          Es un formato vertical mas grande que el del DNI, con proporciones distintas. Este mismo
          formato se exige en la mayoria de paises europeos y en los tramites de visado de Estados
          Unidos, Canada, Reino Unido, Australia y muchos otros destinos, lo que lo convierte en el
          formato de facto para la documentacion de viaje internacional.
        </p>
        <p>
          Una diferencia practica importante: en la foto del pasaporte el rostro debe ocupar entre
          el 70 y el 80 por ciento del alto total de la imagen, lo que significa que hay poco margen
          en la parte superior (por encima de la cabeza) y en la parte inferior (por debajo de la
          barbilla). El encuadre es mas ajustado que en otras fotos de carnet.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Tamano en pixeles equivalente para el pasaporte
        </h3>
        <p>
          A 300 ppp, 35 x 45 mm equivalen a aproximadamente <strong>413 x 531 pixeles</strong>. Al
          igual que con el DNI, algunos portales de solicitud online especifican el tamano en pixeles
          directamente. La herramienta{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passport Photo de SammaPix
          </Link>{" "}
          aplica automaticamente las proporciones correctas al seleccionar el tipo de documento,
          eliminando el riesgo de error en los calculos manuales.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Tabla comparativa DNI frente a pasaporte
        </h3>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Documento
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Medidas fisicas
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Pixeles aprox. (300 ppp)
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Estandar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">
                  DNI espanol
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  32 mm alto x 26 mm ancho
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  378 x 307 px
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Propio (espanol)
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">
                  Pasaporte espanol
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  35 mm ancho x 45 mm alto
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  413 x 531 px
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  ICAO (internacional)
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">
                  Visado EE.UU. (DS-160)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  51 mm x 51 mm (cuadrada)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  600 x 600 px (minimo)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  ICAO (variante EE.UU.)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* REQUISITOS DE FONDO, ILUMINACION Y ENCUADRE                         */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="requisitos-fondo"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Requisitos de fondo, iluminacion y encuadre
        </h2>
        <p>
          Las medidas son solo una parte de los requisitos. Los criterios visuales sobre el fondo,
          la iluminacion y el encuadre son igualmente importantes y son la causa de rechazo mas
          frecuente cuando la foto se hace en casa sin prestar atencion a los detalles.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          El fondo: uniforme y claro
        </h3>
        <p>
          Tanto para el DNI como para el pasaporte, el fondo debe ser{" "}
          <strong>uniforme y de color claro</strong>: blanco o gris muy claro son las opciones
          aceptadas. No se admiten fondos de color, estampados, con texturas visibles ni con
          sombras pronunciadas. Una pared blanca bien iluminada es la solucion mas sencilla.
        </p>
        <p>
          Si la foto que tienes tiene el fondo incorrecto, no necesitas repetir la sesion. La
          herramienta{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passport Photo de SammaPix
          </Link>{" "}
          puede limpiar y uniformizar el fondo directamente en el navegador, sustituyendolo por
          blanco o por el color que requiera el documento de destino.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          La iluminacion: uniforme y sin sombras en la cara
        </h3>
        <p>
          La cara debe estar iluminada de forma uniforme, sin sombras en las mejillas, la nariz o
          la frente. Evita fuentes de luz directa que generen reflejos en la piel o en las gafas.
          La luz natural difusa (cerca de una ventana sin sol directo) suele dar los mejores
          resultados para una foto de carnet en casa. Si usas luz artificial, coloca dos fuentes a
          ambos lados del rostro para eliminar las sombras laterales.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          El encuadre: rostro centrado y bien proporcionado
        </h3>
        <p>
          El rostro debe estar <strong>centrado horizontalmente</strong> y mirando directamente a la
          camara, con los hombros ligeramente visibles en la parte inferior. La cabeza no debe estar
          inclinada hacia ningun lado. En el pasaporte, el rostro debe ocupar entre el 70 y el 80
          por ciento del alto de la imagen: si la cabeza queda muy pequena o hay demasiado espacio
          vacio alrededor, la foto sera rechazada.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          La expresion y los elementos del rostro
        </h3>
        <p>
          La expresion debe ser <strong>neutra</strong>: ni sonrisa amplia ni ceño fruncido. La boca
          debe estar cerrada. Los ojos deben estar bien abiertos y mirando directamente al objetivo.
          No se permiten gafas de sol ni lentes de colores. Las gafas de graduacion pueden ser
          aceptadas en algunos tramites (especialmente para el DNI) siempre que no generen reflejos
          ni oculten los ojos, aunque la recomendacion general es quitarselas para evitar problemas.
          Los sombreros y tocados estan prohibidos salvo por motivos religiosos documentados.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* MOTIVOS DE RECHAZO                                                   */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="motivos-rechazo"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Motivos de rechazo mas frecuentes
        </h2>
        <p>
          Las oficinas de expedicion del DNI y los consulados tienen criterios claros, y cuando la
          foto no los cumple el rechazo es inmediato. Estos son los motivos que aparecen con mas
          frecuencia:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>Medidas incorrectas:</strong> usar la foto del pasaporte para el DNI o viceversa
            es el error mas comun. Las proporciones son distintas y se detectan de inmediato.
          </li>
          <li>
            <strong>Fondo incorrecto:</strong> fondo de color, con estampado, con sombras marcadas
            o con otros elementos visibles detrás de la persona.
          </li>
          <li>
            <strong>Foto antigua:</strong> la imagen debe ser reciente y reflejar el aspecto actual
            del solicitante. No hay un periodo maximo definido por ley, pero la orientacion general
            es que no tenga mas de seis meses.
          </li>
          <li>
            <strong>Gafas de sol o lentes de colores:</strong> estan expresamente prohibidas. Las
            gafas de graduacion pueden causar problemas por reflejos incluso cuando estan
            permitidas.
          </li>
          <li>
            <strong>Rostro parcialmente oculto:</strong> flequillo que cubre un ojo, sombrero,
            bufanda o cualquier elemento que impida ver el rostro completo.
          </li>
          <li>
            <strong>Expresion no neutra:</strong> sonrisa con los dientes visibles, boca abierta o
            expresion exagerada.
          </li>
          <li>
            <strong>Ojos cerrados o semicerrados:</strong> en el proceso de lectura biometrica, los
            ojos cerrados imposibilitan la identificacion.
          </li>
          <li>
            <strong>Baja calidad o imagen borrosa:</strong> una foto de baja resolucion, pixelada
            o fuera de foco no supera el control de calidad automatico de muchos sistemas.
          </li>
          <li>
            <strong>Archivo demasiado pesado o demasiado ligero:</strong> los formularios digitales
            suelen tener un limite de peso (habitualmente entre 200 KB y 2 MB). Una imagen
            excesivamente comprimida tambien puede ser rechazada por perdida de calidad.
          </li>
        </ul>
        <p className="mt-3">
          Si necesitas reducir el peso de la foto sin perder calidad visible, la herramienta{" "}
          <Link href="/tools/compress" className="underline">
            Compress de SammaPix
          </Link>{" "}
          te permite ajustar el nivel de compresion directamente en el navegador y ver el resultado
          antes de descargar el archivo.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* COMO HACERLA GRATIS EN EL NAVEGADOR                                 */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="como-hacerla-gratis"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Como hacer la foto del DNI o pasaporte gratis en el navegador
        </h2>
        <p>
          El proceso de preparar una foto de carnet en casa ha mejorado enormemente con las
          herramientas disponibles en el navegador. Ya no es necesario ir a una cabina fotografica
          ni instalar software especializado. Con un movil moderno o una camara digital y las
          herramientas adecuadas, el resultado puede superar en calidad a una foto de cabina.
        </p>
        <p>
          La ventaja principal de usar una herramienta de navegador como{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passport Photo de SammaPix
          </Link>{" "}
          frente a servicios online convencionales es la <strong>privacidad</strong>. Cuando subes
          la foto de tu DNI o tu pasaporte a un servicio web tradicional, esa imagen viaja a un
          servidor externo y puede ser almacenada o procesada por terceros. Con SammaPix, el
          procesado ocurre completamente en tu dispositivo: ningun archivo sale de tu navegador.
          Para documentos de identidad, esto no es un detalle menor.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Que necesitas antes de empezar
        </h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            Un movil con camara decente (la mayoria de smartphones de los ultimos cinco anos son
            suficientes) o una camara digital.
          </li>
          <li>
            Un fondo claro: una pared blanca o gris claro bien iluminada. Si no tienes una pared
            adecuada, la herramienta puede limpiar el fondo despues.
          </li>
          <li>
            Buena iluminacion: luz natural difusa o dos lamparas situadas a ambos lados del rostro.
            Evita la luz directa de flash frontal, que aplana las facciones y genera sombras duras
            en la pared.
          </li>
          <li>
            Un tripode o alguien que te haga la foto. Las selfies generan distorsion optica por la
            proximidad de la camara y no suelen superar los controles de calidad.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* PASO A PASO CON SAMMAPIX                                            */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="paso-a-paso"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Paso a paso con SammaPix
        </h2>
        <p>
          A continuacion, el proceso completo para obtener una foto de DNI o pasaporte lista para
          presentar, usando las herramientas gratuitas de SammaPix. Todo ocurre en el navegador, sin
          registro obligatorio para el uso basico y sin subir imagenes a ningun servidor externo.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Paso 1: hacer la foto base
        </h3>
        <p>
          Fotografiate frente a una pared clara con buena iluminacion. Mantén el rostro de frente,
          expresion neutra (boca cerrada, ojos bien abiertos), sin gafas de sol y sin sombreros ni
          bufandas. Usa la camara trasera del movil (no el modo selfie) con alguien que te haga la
          foto desde una distancia de entre 1 y 1,5 metros. Si tienes tripode y temporizador, aun
          mejor.
        </p>
        <p>
          Asegurate de que la imagen sea nitida y de que no haya motion blur. Haz varias tomas y
          quédate con la que tenga mejor iluminacion en el rostro.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Paso 2: ajustar encuadre y fondo con Passport Photo
        </h3>
        <p>
          Abre{" "}
          <Link href="/tools/passport-photo" className="underline">
            sammapix.com/tools/passport-photo
          </Link>{" "}
          en tu navegador. Sube la foto (arrastra el archivo o toca para seleccionarlo desde la
          galeria). Selecciona el pais (Espana) y el tipo de documento (DNI o Pasaporte). La
          herramienta detectara automaticamente el rostro, aplicara el encuadre correcto y podra
          limpiar el fondo para dejarlo uniforme.
        </p>
        <p>
          Revisa la vista previa antes de descargar. Comprueba que el rostro este centrado, que los
          ojos esten a la altura correcta y que el fondo sea limpio y uniforme.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Paso 3: ajustar las dimensiones en pixeles si el formulario lo requiere
        </h3>
        <p>
          Si el portal donde vas a presentar la solicitud exige un tamano especifico en pixeles (por
          ejemplo, 413 x 531 px para el pasaporte a 300 ppp), abre{" "}
          <Link href="/tools/resizepack" className="underline">
            sammapix.com/tools/resizepack
          </Link>{" "}
          y define las dimensiones exactas. La herramienta redimensiona la imagen sin deteriorar la
          calidad de forma visible.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Paso 4: reducir el peso si hay limite de subida
        </h3>
        <p>
          Muchos formularios oficiales limitan el peso del archivo a 200 KB, 500 KB o 1 MB. Si tu
          imagen supera ese limite, abre{" "}
          <Link href="/tools/compress" className="underline">
            sammapix.com/tools/compress
          </Link>
          , sube la foto y ajusta el nivel de compresion hasta obtener el peso deseado. La
          herramienta muestra la vista previa del resultado y el peso resultante antes de que
          descargues el archivo, para que puedas decidir el equilibrio calidad/peso adecuado.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Paso 5: descargar e imprimir o adjuntar
        </h3>
        <p>
          Si necesitas la foto en formato fisico, descarga el archivo en JPG o PNG y llevalo a una
          copisteria o imprimelo en casa en papel fotografico. Indica al tecnico las medidas exactas
          (32 x 26 mm para el DNI, 35 x 45 mm para el pasaporte) para que las aplique correctamente.
        </p>
        <p>
          Si la necesitas en formato digital para adjuntarla a un formulario online, descarga el
          archivo directamente y adjuntalo segun las instrucciones del portal. No es necesario
          ningun paso adicional.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* NOTA SOBRE VERIFICACION OFICIAL                                     */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Donde verificar los requisitos oficiales
        </h2>
        <p>
          Los requisitos de la foto pueden variar segun el tramite concreto, el consulado o el pais
          de destino para visados. Antes de presentar cualquier solicitud, conviene verificar los
          requisitos actualizados en las fuentes oficiales:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <a
              href="https://www.policia.es/dni/requisitos_foto.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Policia Nacional: requisitos de la foto del DNI
            </a>
          </li>
          <li>
            <a
              href="https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Pasaporte.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Ministerio de Asuntos Exteriores: renovacion del pasaporte espanol
            </a>
          </li>
        </ul>
        <p className="mt-3">
          Para tramites de visado en destinos concretos (EE.UU., Canada, Reino Unido, Schengen, etc.),
          consulta siempre el portal de visados del consulado o embajada correspondiente, ya que los
          requisitos de formato pueden diferir de los del pasaporte espanol.
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
          Que tamano tiene la foto del DNI espanol?
        </h3>
        <p>
          La foto del DNI espanol mide <strong>32 mm de alto por 26 mm de ancho</strong>. Este
          formato es propio del documento nacional de identidad espanol y no coincide con el
          estandar ICAO del pasaporte. A 300 ppp equivale a aproximadamente 378 x 307 pixeles.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Que tamano tiene la foto del pasaporte espanol?
        </h3>
        <p>
          La foto del pasaporte espanol mide <strong>35 mm de ancho por 45 mm de alto</strong>,
          siguiendo el estandar internacional ICAO. Este mismo formato se acepta en la mayoria de
          tramites consulares y solicitudes de visado internacionales. A 300 ppp equivale a
          aproximadamente 413 x 531 pixeles.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Puedo hacer la foto del DNI en casa?
        </h3>
        <p>
          Si, siempre que cumpla todos los requisitos: fondo uniforme claro, buena iluminacion sin
          sombras en el rostro, expresion neutra, boca cerrada, ojos bien abiertos, sin gafas de
          sol ni sombreros. Una foto hecha con un smartphone moderno frente a una pared blanca puede
          superar la calidad de muchas fotos de cabina si se aplican correctamente las indicaciones.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Es gratis hacer la foto del DNI con SammaPix?
        </h3>
        <p>
          Si. La herramienta{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passport Photo de SammaPix
          </Link>{" "}
          es gratuita para el uso basico. Permite ajustar el encuadre, limpiar el fondo y preparar
          la imagen con las medidas correctas directamente en el navegador, sin necesidad de crear
          una cuenta.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Se suben mis fotos a algun servidor al usar la herramienta?
        </h3>
        <p>
          No. SammaPix procesa todas las imagenes completamente en tu navegador, en tu dispositivo.
          Ningun archivo se transmite a servidores externos durante el procesado. Para documentos de
          identidad que contienen datos personales sensibles, esta arquitectura de privacidad es
          especialmente relevante: tus fotos nunca salen de tu navegador.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Que fondo debe tener la foto del DNI?
        </h3>
        <p>
          El fondo debe ser <strong>uniforme y claro</strong>, preferiblemente blanco o gris muy
          claro. No se admiten fondos de colores vivos, estampados, con texturas visibles, con
          sombras pronunciadas ni con otros elementos detrás de la persona. Si tu foto tiene un
          fondo incorrecto, la herramienta Passport Photo puede limpiarlo y uniformizarlo
          directamente en el navegador.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* GUIAS RELACIONADAS                                                  */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">
          Guias relacionadas
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/tools/passport-photo" className="underline">
              Herramienta Passport Photo de SammaPix
            </Link>
          </li>
          <li>
            <Link href="/tools/resizepack" className="underline">
              Redimensionar imagen: ajustar ancho y alto en pixeles
            </Link>
          </li>
          <li>
            <Link href="/tools/compress" className="underline">
              Comprimir imagen: reducir el peso del archivo
            </Link>
          </li>
          <li>
            <Link href="/tools/croproatio" className="underline">
              Recortar imagen con proporcion personalizada
            </Link>
          </li>
          <li>
            <Link href="/es/blog/ley-ia-etiquetar-contenido-ia" className="underline">
              Ley de IA: hay que etiquetar el contenido generado por IA?
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
