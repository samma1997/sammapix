import { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-metadata";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";
import dynamic from "next/dynamic";

const ExtractJarClient = dynamic(() => import("@/components/tools/ExtractJarClient"));

// Metadata

export const metadata: Metadata = {
  title: "JAR File Extractor. Open JAR Online, No Upload",
  description:
    "Open and extract .jar and .war Java archives directly in your browser. View contents, download files individually, or save all as ZIP. Files never leave your device.",
  keywords: [
    "jar file extractor",
    "open jar file online",
    "extract jar online",
    "jar to zip",
    "open war file online",
    "java archive extractor",
    "jar file opener browser",
    "extract jar without software",
    "open jar mac",
    "jar contents viewer",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/extract-jar`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/extract-jar`,
    title: "JAR File Extractor. Open JAR Online, No Upload",
    description:
      "Open and extract .jar and .war Java archives directly in your browser. View contents, download files individually, or save all as ZIP. Files never leave your device.",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "JAR File Extractor. Open JAR Online, No Upload",
    description:
      "Open and extract .jar and .war Java archives directly in your browser. View contents, download files individually, or save all as ZIP. Files never leave your device.",
  },
};

// JSON-LD schemas

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JAR File Extractor · SammaPix",
  description:
    "Free browser-based JAR and WAR extractor. Open Java archives, view contents, download files individually, and convert to ZIP. 100% in-browser, files never uploaded.",
  url: `${APP_URL}/tools/extract-jar`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: { "@type": "Person", name: "Luca Sammarco" },
  creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
  featureList: [
    "Open JAR and WAR archives without installing Java or WinZip",
    "View file list with names and sizes",
    "Download individual files from the archive",
    "Convert entire JAR or WAR archive to ZIP in-browser",
    "100% client-side, files never uploaded",
    "Works on Windows, Mac, Linux, and mobile",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are my files uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Everything happens 100% in your browser using WebAssembly. Your .jar files never leave your device and are never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Extracting .jar and .war files up to 200 MB is completely free. No signup required.",
      },
    },
    {
      "@type": "Question",
      name: "Why can a browser open a .jar file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A .jar (Java Archive) is a ZIP file with a different extension. It uses the same ZIP compression format, which means any tool that can open ZIP archives can also open JAR files. This tool uses libarchive compiled to WebAssembly to handle JAR and WAR files entirely in-browser.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between JAR and WAR files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both are ZIP-based Java archives. A JAR (Java Archive) packages Java classes and resources for libraries or standalone apps. A WAR (Web Application Archive) packages a web application for deployment on a Java server like Tomcat. Both can be opened and extracted with this tool.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract .class files from a JAR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can view and download any file inside a JAR, including compiled .class files, resources, META-INF/MANIFEST.MF, and configuration files. Note that .class files are compiled bytecode, not human-readable source code.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free plan supports JAR and WAR files up to 200 MB. For larger archives, a one-time 24-hour Day Pass ($2.99) removes this limit instantly.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "JAR File Extractor", item: `${APP_URL}/tools/extract-jar` },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to open a .jar file online",
  description: "Open and extract .jar or .war files in your browser without installing Java or any software.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Drop your JAR or WAR file",
      text: "Drag and drop a .jar or .war file onto the page, or click to select it from your computer.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "View and download files",
      text: "The file list appears instantly. Click any file to download it individually, including class files and resources.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download as ZIP (optional)",
      text: "Click Download all as ZIP to export every file at once in a universally compatible archive.",
    },
  ],
};

// Page

export default function ExtractJarPage() {
  const tool = TOOLS["extract-jar"];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <main className="min-h-screen bg-white dark:bg-[#191919]">
        {/* Hero */}
        <section className="px-4 sm:px-6 pt-10 pb-4 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            JAR File Extractor. Open JAR Online, Free
          </h1>
          <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-2">
            Extract and view .jar and .war Java archives directly in your browser. Download
            individual files or export as ZIP.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">
              Files never leave your device.
            </strong>
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
            Java archives (.jar, .war) · Free up to 200 MB · No Java install needed
          </p>
        </section>

        {/* Tool */}
        <ExtractJarClient />

        {/* Description + internal links */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How it works
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            A .jar file is a ZIP archive with a different extension. This tool uses{" "}
            <strong className="text-[#525252] dark:text-[#A3A3A3]">libarchive compiled to WebAssembly</strong>{" "}
            to open the archive entirely in your browser. No Java runtime, no server, no software to install.
            Your files are processed locally and never uploaded anywhere.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            Need to open a .apk Android app instead? Try the{" "}
            <Link href="/tools/apk-extractor" className="text-[#6366F1] hover:underline">
              APK Extractor
            </Link>
            . For iOS .ipa packages, use the{" "}
            <Link href="/tools/ipa-extractor" className="text-[#6366F1] hover:underline">
              IPA Extractor
            </Link>
            . To open a standard .7z or .rar archive, see{" "}
            <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">
              Open 7z Online
            </Link>{" "}
            or{" "}
            <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">
              Open RAR Online
            </Link>
            . A full guide on extracting JAR files is at{" "}
            <Link href="/blog/how-to-open-jar-files-online" className="text-[#6366F1] hover:underline">
              How to Open JAR Files Online
            </Link>
            .
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What is inside a JAR file?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            A JAR file typically contains: compiled .class bytecode files (one per Java class),
            a META-INF/MANIFEST.MF file with metadata like the main class entry point, configuration
            files (.properties, .xml, .json), embedded resources (images, fonts, templates), and
            sometimes other nested JAR files. WAR files add a WEB-INF/ directory with the web
            deployment descriptor (web.xml) and a lib/ folder with dependency JARs.
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            JAR vs WAR vs EAR: what is the difference?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            All three are ZIP-based Java archives. A JAR (Java Archive) is the base format for
            libraries and standalone applications. A WAR (Web Application Archive) bundles a web
            app (servlets, JSPs, static assets) for deployment on a servlet container like Apache
            Tomcat. An EAR (Enterprise Archive) bundles multiple JARs and WARs for full Java EE
            enterprise deployments. This tool opens all three, since they all share the ZIP format.
          </p>

          {/* FAQ */}
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4">
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">{q.name}</p>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {tool && <RelatedTools toolId="extract-jar" />}
      </main>
    </>
  );
}
