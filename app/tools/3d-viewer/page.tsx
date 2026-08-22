import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import ThreeDViewerClient from "@/components/tools/ThreeDViewerClient";
import ThreeDViewerHeroDemo from "@/components/tools/ThreeDViewerHeroDemo";
import RelatedTools from "@/components/tools/RelatedTools";
import MetaViewContent from "@/components/tracking/MetaViewContent";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const TOOL_URL = `${APP_URL}/tools/3d-viewer`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "3D Model Viewer and Converter. Free, No Upload",
  description:
    "View STL, OBJ, GLB, GLTF and PLY files in your browser. Interactive WebGL viewer with orbit controls, mesh stats, and export to STL, OBJ, GLB, PLY. 100% client-side, nothing is ever uploaded.",
  keywords: [
    "stl viewer online",
    "view stl",
    "stl to glb",
    "stl to obj",
    "obj to stl",
    "glb viewer",
    "3d model converter",
    "ply viewer",
    "gltf viewer online",
    "obj viewer online",
    "3d file viewer browser",
    "stl file viewer free",
    "convert stl to obj",
    "3d model viewer no upload",
    "webgl 3d viewer",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "3D Model Viewer and Converter. Free, No Upload",
    description:
      "Drop an STL, OBJ, GLB, GLTF or PLY file. View it in WebGL, inspect triangle count and bounding box, then export to any supported format. 100% in your browser, nothing uploaded.",
    url: TOOL_URL,
    type: "website",
    siteName: "SammaPix",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix — free browser tools, no upload" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Model Viewer and Converter. Free, No Upload",
    description:
      "View and convert STL, OBJ, GLB, GLTF, PLY files in your browser. Mesh stats, orbit controls, export to any format. Nothing is ever uploaded.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "3D Model Viewer and Converter",
  description:
    "Interactive WebGL-powered 3D model viewer and converter that runs entirely in the browser. Load STL, OBJ, GLB, GLTF and PLY files, inspect mesh statistics (triangle count, bounding box, volume, surface area), rotate and zoom with orbit controls, take screenshots, and export to STL, OBJ, GLB or PLY. No server upload, no account required.",
  url: TOOL_URL,
  applicationCategory: "DesignApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript and WebGL",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
  },
  creator: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
  },
  featureList: [
    "View STL (binary and ASCII), OBJ, GLB, GLTF and PLY files in WebGL",
    "Interactive orbit controls: rotate, zoom, pan",
    "Neutral studio lighting with grid ground plane",
    "Mesh statistics: triangle count, bounding box (mm/inch), approximate volume, surface area",
    "Export to STL, OBJ, GLB and PLY",
    "Screenshot to PNG (canvas capture)",
    "100% client-side: your 3D files never leave your browser",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are my 3D files uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This tool is 100% client-side. Your 3D files are loaded directly in your browser using JavaScript (Three.js). Nothing is ever sent to any server, and no data leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "What 3D file formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can open STL (both binary and ASCII), OBJ, GLB, GLTF and PLY files. For export you can convert to STL, OBJ, GLB and PLY using the built-in exporters. 3MF is not currently supported.",
      },
    },
    {
      "@type": "Question",
      name: "Is the 3D viewer free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free. No account required, no file size limit imposed by the server (your browser memory is the only limit), no watermark on screenshots or exported files.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert STL to OBJ or GLB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drop your STL file onto the viewer. Once it loads, click the OBJ or GLB button in the export row below the canvas. The converted file downloads immediately to your device. No upload, no waiting.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are the volume and surface area calculations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Volume is computed via the divergence theorem applied to each triangle (signed volume summation), which gives an exact result for closed watertight meshes. Surface area is the sum of all triangle areas. For open meshes or meshes with holes, the volume figure may differ from the true enclosed volume. Units can be toggled between millimeters and inches.",
      },
    },
    {
      "@type": "Question",
      name: "How do I take a screenshot of my 3D model?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After loading a model, click the Screenshot button in the toolbar above the canvas. The tool uses the WebGL canvas toBlob API to capture the current view and download it as a PNG file. Rotate the model to the angle you want before clicking.",
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
    { "@type": "ListItem", position: 3, name: "3D Model Viewer", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to view and convert a 3D model online for free",
  description:
    "Open STL, OBJ, GLB, GLTF or PLY files in your browser, inspect the mesh, and export to a different format. No upload, no account needed.",
  totalTime: "PT60S",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Load your 3D file",
      text: "Drop an STL, OBJ, GLB, GLTF or PLY file onto the drop zone, or click to open a file picker. The file is read locally in your browser using Three.js. Nothing is uploaded.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Inspect and navigate the model",
      text: "Drag to rotate, scroll to zoom, right-drag to pan. The stats panel on the right shows the triangle count, bounding box dimensions (mm or inch), approximate volume and surface area. Toggle the unit between mm and inch with the button in the panel header.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Export or screenshot",
      text: "Click STL, OBJ, GLB or PLY in the export row to download the model in that format. Click Screenshot to capture the current canvas view as a PNG. All processing happens locally — no server involved.",
    },
  ],
};

// ── Inline hero icon ──────────────────────────────────────────────────────────

function Icon3dViewerSmall() {
  const accent = "#6366F1";
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M24 4 L44 16 L44 32 L24 44 L4 32 L4 16 Z" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.1" strokeLinejoin="round"/>
      <path d="M24 4 L24 44 M4 16 L44 16 M4 32 L44 32 M24 4 L4 16 M24 4 L44 16 M24 44 L4 32 M24 44 L44 32" stroke={accent} strokeWidth="1.25" strokeOpacity="0.4" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ThreeDViewerPage() {
  return (
    <main>
      <MetaViewContent contentName="3D Model Viewer" contentId="3d-viewer" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ============================================================ */}
      {/*  HERO — Split layout                                          */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* ── LEFT ── */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
                aria-hidden="true"
              >
                <Icon3dViewerSmall />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                3D Model Viewer and Converter. Free, No Upload
              </h1>
            </div>

            <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Open STL, OBJ, GLB, GLTF and PLY files directly in your browser. Rotate, zoom, inspect mesh
              stats (triangles, bounding box, volume), then export to any supported format. Powered by{" "}
              <span className="font-medium text-[#525252] dark:text-[#A3A3A3]">Three.js WebGL</span>.
              No server, no upload, no account.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% in your browser
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Nothing uploaded
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Free forever
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                STL to OBJ, GLB, PLY
              </span>
            </div>
          </div>

          {/* ── RIGHT: Live Three.js demo ── */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <ThreeDViewerHeroDemo />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOL                                                         */}
      {/* ============================================================ */}
      <div className="pt-3">
        <ThreeDViewerClient />
      </div>

      {/* ── Related tools ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="3d-viewer" />
      </div>

      {/* ============================================================ */}
      {/*  SEO content                                                  */}
      {/* ============================================================ */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              View 3D models without installing software
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              This tool uses{" "}
              <span className="font-medium">Three.js</span> loaded directly in your browser tab. When you
              drop a file, it is read locally via the{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">File API</code>{" "}
              and parsed by the matching Three.js loader (STLLoader, OBJLoader, GLTFLoader, PLYLoader).
              No bytes are ever sent to a remote server.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              The WebGL renderer provides real-time orbit controls (rotate, zoom, pan), studio lighting,
              and a ground grid. Mesh statistics are computed directly from the vertex buffer without any
              server-side processing.
            </p>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Common use cases
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Preview STL before 3D printing",
                  desc: "Inspect a slicer export to check for obvious geometry issues, verify dimensions in mm or inch, and confirm the model is watertight before sending it to print.",
                },
                {
                  title: "Convert STL to OBJ or GLB",
                  desc: "Drop an STL file and click OBJ or GLB to export a converted version instantly. Useful when a tool or game engine requires a specific format.",
                },
                {
                  title: "Quick sanity-check for GLTF assets",
                  desc: "Open a GLB or GLTF exported from Blender to verify mesh appearance, orientation and scale without launching the full DCC suite.",
                },
                {
                  title: "Measure approximate model dimensions",
                  desc: "The bounding box panel shows X, Y, Z extents in millimeters or inches, plus approximate volume and surface area — handy for design review without a CAD application.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{title}</p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Related tools
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/svg-to-png", label: "SVG to PNG", desc: "Rasterize SVG vectors to PNG at any resolution" },
                { href: "/tools/image-to-base64", label: "Image to Base64", desc: "Encode any image as a Base64 Data URI" },
                { href: "/tools/json-formatter", label: "JSON Formatter", desc: "Beautify and validate JSON, error line shown" },
              ].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1]/60 transition-colors"
                >
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">{t.label}</p>
                  <p className="text-[11px] text-[#737373]">{t.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
              {faqSchema.mainEntity.map((q) => (
                <details key={q.name} className="group py-4">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] transition-colors [&::-webkit-details-marker]:hidden">
                    {q.name}
                    <span className="flex-shrink-0 text-[#A3A3A3] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed pr-8">
                    {q.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
