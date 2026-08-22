import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to View and Convert STL Files Online (Free, No Upload) [2026]",
  description:
    "View STL, OBJ, GLB and PLY files in your browser with a WebGL viewer. Convert STL to OBJ or GLB for Blender and the web. No upload, no software install. Works with proprietary CAD files. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/how-to-view-and-convert-stl-files-online`,
  },
  keywords: [
    "view stl file online",
    "open stl file browser",
    "stl to obj converter",
    "stl to glb online",
    "glb viewer online free",
    "obj viewer online",
    "3d model viewer browser",
    "convert stl online no upload",
    "ply viewer online",
    "gltf viewer online",
    "stl file viewer free",
    "3d model converter free",
    "view 3d file no software",
  ],
  openGraph: {
    title: "How to View and Convert STL Files Online (Free, No Upload) [2026]",
    description:
      "View STL, OBJ, GLB and PLY files in your browser. Convert STL to OBJ or GLB for Blender. No upload, no software. Works with proprietary CAD files. Free.",
    url: `${APP_URL}/blog/how-to-view-and-convert-stl-files-online`,
    type: "article",
    publishedTime: "2026-08-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to View and Convert STL Files Online Free (No Upload) [2026]",
    description:
      "Open STL, OBJ, GLB, GLTF, PLY files in your browser. Convert STL to OBJ or GLB. No upload, no software. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-22";
const POST_DATE_FORMATTED = "August 22, 2026";
const POST_URL = `${APP_URL}/blog/how-to-view-and-convert-stl-files-online`;
const POST_TITLE =
  "How to View and Convert STL Files Online (Free, No Upload) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Practical guide to viewing and converting STL, OBJ, GLB and PLY files in a browser using WebGL. Covers what each format is for, when to convert STL to OBJ vs GLB for Blender, why no-upload matters for proprietary CAD geometry, and how 3MF differs. Step-by-step walkthrough with the SammaPix 3D Viewer.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
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
    logo: {
      "@type": "ImageObject",
      url: "https://sammapix.com/og-image.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": POST_URL,
  },
  keywords: [
    "view stl file online",
    "stl to obj converter",
    "stl to glb online",
    "3d model viewer browser",
    "convert stl no upload",
  ],
};

// ── Breadcrumb schema ─────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: POST_TITLE, item: POST_URL },
  ],
};

// ── HowTo schema ──────────────────────────────────────────────────────────────

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to view and convert an STL file online without uploading",
  description:
    "Open an STL, OBJ, GLB, GLTF or PLY file in a browser WebGL viewer, inspect the mesh, and export to a different 3D format. No upload, no software install required.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix 3D Viewer (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the 3D Viewer",
      text: "Go to sammapix.com/tools/3d-viewer in any modern browser with WebGL support. No account, no download, no plugin required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your STL or 3D file",
      text: "Drag an STL, OBJ, GLB, GLTF, or PLY file onto the drop zone or click to open a file picker. The file is read locally by Three.js. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Inspect the model",
      text: "Drag to rotate, scroll to zoom, right-drag to pan. The stats panel shows triangle count, bounding box dimensions in mm or inch, approximate volume, and surface area.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Export to a different format",
      text: "Click STL, OBJ, GLB, or PLY in the export row below the canvas to download a converted version. The conversion happens locally via Three.js exporters. No upload required.",
    },
  ],
};

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an STL file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "STL (Standard Tessellation Language, sometimes called Standard Triangle Language) is the most widely used format for 3D printing and CAD export. It describes a 3D surface as a mesh of triangles, storing the normal vector and three vertices for each triangle. STL files come in two variants: binary (compact, smaller file size) and ASCII (human-readable text). STL does not store color, texture, material, or scene hierarchy. It is purely geometry. Slicers like PrusaSlicer, Cura, and Bambu Studio all read STL natively.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between OBJ, GLB, and PLY?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OBJ is a plain-text geometry format from Wavefront that supports polygon meshes and can reference a separate .mtl file for materials. It is widely supported across CAD, game engines, and DCC tools but does not support animations or scene graphs. GLB is the binary container format for glTF (GL Transmission Format), designed for efficient delivery of 3D models on the web and in real-time engines. It can store geometry, materials, textures, animations, and a scene hierarchy in a single file. PLY (Polygon File Format) originated from point cloud data in computer vision and 3D scanning. It stores vertices and faces and can carry per-vertex color and custom properties, making it common in research and photogrammetry workflows.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to open proprietary CAD files in an online viewer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the tool. Many online 3D viewers upload your file to a server for parsing. For proprietary 3D geometry, aerospace parts, product design files, or medical device models, this is a serious IP risk. The SammaPix 3D Viewer runs entirely in your browser using Three.js and the File API. Your 3D file is never transmitted anywhere. You can verify this by opening browser DevTools, going to the Network tab, loading a file, and observing that no outgoing request contains your file data.",
      },
    },
    {
      "@type": "Question",
      name: "Should I convert STL to OBJ or GLB for Blender?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both OBJ and GLB are supported natively in Blender 3.x and later. OBJ is the safer choice for pure geometry without materials since it is a well-established text format and easier to inspect or edit in a text editor if something goes wrong. GLB is better when you want to carry PBR materials and textures through the conversion, or when your target is a web-based renderer or game engine. For basic mesh work in Blender (modeling, sculpting, decimation, remeshing), OBJ is usually simpler. For game assets or web 3D, GLB is the modern standard.",
      },
    },
    {
      "@type": "Question",
      name: "What is 3MF and can I open it in a browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "3MF (3D Manufacturing Format) is an XML-based format developed by the 3MF Consortium (Microsoft, Autodesk, HP, and others) as a successor to STL for 3D printing. Unlike STL, 3MF can store color, material, print settings, and support structures in a single file. Browser support for 3MF is limited because the format is complex and the Three.js ecosystem does not include a production-ready 3MF loader. For 3MF, desktop tools like PrusaSlicer, Windows 3D Viewer, or Microsoft 3D Builder are the most reliable options. You can convert 3MF to STL first in one of those tools and then open the STL in any browser viewer.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my STL have a different size in the browser than in my slicer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "STL files do not store physical units. The numbers in the vertex coordinates are dimensionless. A slicer assumes millimeters by convention. A browser-based viewer also assumes millimeters. If your STL was designed in inches and exported without scaling, a measurement of 1.0 that you intended to mean 1 inch will read as 1 mm in the viewer. The fix is to scale in your CAD tool before export (multiply by 25.4 to convert inches to mm) or to use an STL unit-aware tool at export time. Many slicers detect this mismatch and prompt you to scale on import.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HowToViewConvertSTLPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-view-and-convert-stl-files-online"
        description="STL, OBJ, GLB, PLY. Four formats that look similar from the outside but serve very different purposes. This guide covers what each one is for, how to open any of them in a browser without installing software, how to convert STL to OBJ or GLB for Blender or web use, and why keeping your CAD files off third-party servers matters."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "what-is-stl", title: "What is an STL file and who uses it" },
          { id: "formats-compared", title: "STL vs OBJ vs GLB vs PLY: what each format is for" },
          { id: "viewing-stl-browser", title: "How to view an STL file in a browser (step by step)" },
          { id: "converting-stl", title: "Converting STL to OBJ or GLB for Blender and the web" },
          { id: "no-upload-why", title: "Why no-upload matters for proprietary CAD files" },
          { id: "3mf-note", title: "What about 3MF?" },
          { id: "mesh-stats", title: "Reading mesh statistics: triangles, bounding box, volume" },
          { id: "batch-convert", title: "Batch converting multiple 3D files at once" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "STL is the standard for 3D printing geometry: triangles only, no color, no materials. OBJ supports polygon meshes and basic materials. GLB (glTF binary) packs geometry, PBR materials, textures, and animations into one file for web and game engines. PLY carries per-vertex color and is common in photogrammetry and scanning.",
          "Any modern browser with WebGL can open and render STL, OBJ, GLB, GLTF, and PLY files locally using Three.js. No server upload required. The file stays on your device.",
          "To convert STL to OBJ for Blender: use a browser-based exporter. The conversion is purely a format rewrite. No geometric data is lost. For web targets, prefer GLB for PBR materials and smaller file size.",
          "STL files do not store units. Both slicers and browser viewers assume millimeters. Files designed in inches must be scaled (multiply by 25.4) before export if you want correct mm measurements.",
          "3MF is a richer print format (color, materials, print settings) but browser viewers do not support it reliably. Convert 3MF to STL in PrusaSlicer or Windows 3D Viewer first.",
          "For proprietary CAD geometry, aerospace parts, or product design files: upload-based viewers transmit your IP to a third party server. A browser-based viewer keeps the file local.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="3D printer producing a complex geometric part, representing STL file workflow from CAD to physical object."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              STL is the bridge between CAD software and 3D printers. Every slicer in the world reads it. This guide shows you how to inspect and convert STL files without installing any software.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              View and convert STL files free, no upload required
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop an STL, OBJ, GLB, GLTF or PLY file. Inspect the mesh with orbit controls. Check bounding box, triangle count, approximate volume. Export to STL, OBJ, GLB, or PLY. Runs entirely in your browser via Three.js.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/3d-viewer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open 3D Viewer, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/svg-to-png"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                SVG to PNG <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is STL ────────────────────────────────────────── */}

        <h2 id="what-is-stl" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is an STL file and who uses it
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          STL stands for Standard Tessellation Language, sometimes called Standard Triangle Language. It was created by 3D Systems in 1987 as an output format for stereolithography printers, and it has been the lingua franca of 3D printing ever since. Every slicer program (PrusaSlicer, Cura, Bambu Studio, ChiTuBox) and almost every CAD application (Fusion 360, SolidWorks, FreeCAD, Blender, OpenSCAD) can export STL.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The format represents a 3D surface as a collection of triangles. Each triangle stores a normal vector (pointing outward from the surface) and three vertex coordinates. That is all. STL knows nothing about:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Color or texture maps</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Material properties (roughness, metalness, emission)</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Scene hierarchy or multiple objects</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Animations or rigging</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Units (it stores raw numbers; millimeters is assumed by convention)</li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          STL files exist in two variants. Binary STL is the compact form: a fixed-size header, a triangle count, and a packed binary record for each triangle. It is smaller and faster to parse. ASCII STL is human-readable text that starts with the keyword <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">solid</code> and spells out every normal and vertex as floating-point numbers. For anything beyond a few hundred triangles, ASCII STL becomes impractically large and slow to load. Most exporters default to binary.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The dominant use cases for STL are 3D printing (slicers consume STL), CNC machining exports from CAD tools, and legacy file exchange between engineers. Outside of those contexts, STL has largely been superseded by richer formats for visualization, game development, and web use.
        </p>

        {/* ── Section 2: Formats compared ───────────────────────────────────── */}

        <h2 id="formats-compared" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          STL vs OBJ vs GLB vs PLY: what each format is for
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The four formats supported by the SammaPix 3D Viewer serve different needs. Choosing the wrong format for a pipeline wastes conversion steps and sometimes loses data.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Geometry</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Materials/Color</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Animation</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">STL</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Triangles only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">None</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">3D printing, slicers, CAD exchange</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">OBJ</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Polygons (n-gons)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Basic (MTL file)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">DCC apps, Blender, Maya, wide compatibility</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">GLB/glTF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Triangles + scene</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Full PBR + textures</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Web 3D, game engines, AR/VR, Three.js</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">PLY</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Polygons + point clouds</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Per-vertex color</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Photogrammetry, 3D scanning, research</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">STL.</strong> Use STL when your destination is a 3D printer or a slicer. It is the most universally supported format in that pipeline. Do not use STL when you need color, materials, or animations.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">OBJ.</strong> OBJ is the safest choice for moving geometry between applications that do not share a native format. Almost every 3D application (Blender, Maya, 3ds Max, Cinema 4D, Houdini, Rhino) can import and export OBJ. The geometry is stored as plain text, which makes it easy to inspect and debug. A companion <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">.mtl</code> file can carry diffuse color and basic texture references, though support varies across importers.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">GLB / glTF.</strong> glTF was designed specifically for real-time rendering. The binary container (GLB) packs everything into a single file: geometry buffers, PBR material parameters, textures, skeleton bones, and animation clips. Three.js, Babylon.js, React Three Fiber, Unity, Unreal, and WebXR all support GLB natively. If your target is the web or a game engine, GLB is the modern standard. It loads significantly faster than OBJ because it is already in a GPU-friendly binary layout.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">PLY.</strong> PLY originated in the Stanford Computer Graphics Laboratory as a flexible format for 3D scan data. It supports per-vertex custom properties (color, confidence, intensity), which makes it the standard output format for photogrammetry tools (Meshroom, RealityCapture, COLMAP) and structured-light scanners. It is less common in production pipelines than the other three formats.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Open any 3D file in your browser, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drop an STL, OBJ, GLB, GLTF or PLY file. Orbit controls, mesh stats, export to any format. Runs entirely via Three.js locally.
          </p>
          <Link
            href="/tools/3d-viewer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open 3D Viewer, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 3: Viewing STL in browser ─────────────────────────────── */}

        <h2 id="viewing-stl-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to view an STL file in a browser (step by step)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Viewing a 3D file in a browser requires a WebGL-capable renderer. Three.js is the most widely used JavaScript 3D library and handles all the heavy lifting: parsing the file, building a vertex buffer, uploading it to the GPU, and running a render loop with orbit controls.
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the 3D Viewer.</strong> Go to{" "}
            <Link href="/tools/3d-viewer" className="text-[#6366F1] hover:underline">
              sammapix.com/tools/3d-viewer
            </Link>{" "}
            in any modern browser (Chrome, Firefox, Safari, Edge). No sign-up, no extension needed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your file.</strong> Drag an STL, OBJ, GLB, GLTF, or PLY file onto the drop zone. Alternatively, click the zone to open a file picker. The file is read by the browser File API and handed directly to the Three.js loader. No bytes leave your device.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Navigate the model.</strong> Drag with the left mouse button to rotate around the model (orbit). Scroll to zoom. Drag with the right mouse button or two fingers to pan. The camera uses damping so rotation feels smooth.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Check the stats panel.</strong> The right panel shows triangle count, vertex count, bounding box dimensions in mm or inch, approximate volume (for closed meshes), and surface area. Toggle between mm and inch with the button in the panel header.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Take a screenshot.</strong> Click the Screenshot button in the toolbar above the canvas. The tool captures the current WebGL canvas as a PNG via <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">canvas.toBlob()</code> and downloads it. Rotate to the angle you want before clicking.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The viewer uses Three.js loaders matched to the file extension: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">STLLoader</code> for STL, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">OBJLoader</code> for OBJ, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">GLTFLoader</code> for GLB and GLTF, and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">PLYLoader</code> for PLY. Each loader is dynamically imported only when needed, so the initial page load stays lightweight.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For large files, loading may take a few seconds on mobile devices since the parser runs on the main thread. The renderer targets 60 fps and includes studio lighting (ambient, key, fill, and rim lights) plus a grid ground plane for orientation reference.
        </p>

        {/* ── Section 4: Converting STL ──────────────────────────────────────── */}

        <h2 id="converting-stl" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Converting STL to OBJ or GLB for Blender and the web
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once your file is loaded in the 3D Viewer, the Export row appears below the canvas. Click any format button (STL, OBJ, GLB, PLY) to download a converted version immediately. The conversion happens locally using Three.js exporters.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">STL to OBJ: when to choose this</h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Convert STL to OBJ when your target application is Blender, Maya, Cinema 4D, or another DCC tool that handles OBJ well. The conversion is a straight format rewrite: the triangle list is serialized as <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">v</code> (vertex), <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">vn</code> (vertex normal), and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">f</code> (face) statements in the OBJ text format. No geometric information is lost. Because STL has no color or material data, the resulting OBJ also has no material file. You will need to assign materials manually in Blender after import.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`# Blender import path for converted OBJ
File > Import > Wavefront (.obj)
Then: Materials tab > New > set Principled BSDF`}
        </pre>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">STL to GLB: when to choose this</h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Convert STL to GLB when your target is a web-based renderer, a game engine, or an AR/VR platform. GLB is the format Three.js, Babylon.js, React Three Fiber, Unity (via the glTF importer), Unreal (via the Interchange plugin), and model-viewer all expect as their native input. The resulting GLB will contain the geometry with a default Principled BSDF-equivalent material using the standard gray color applied by the viewer. You can edit the material in Blender after import by opening <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">File {">"} Import {">"} glTF 2.0 (.glb/.gltf)</code>.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          GLB is significantly more efficient than OBJ for web delivery. Vertex data is stored as binary typed arrays (Float32Array) rather than ASCII text, so a GLB is typically 30 to 60% smaller than an equivalent OBJ for the same mesh. The GPU uploads the buffer directly without a parsing step.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">A note on triangle count after conversion</h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When converting STL to OBJ or GLB via Three.js, the triangle count is preserved exactly. There is no decimation or remeshing. If your STL has 200,000 triangles, your OBJ or GLB will also have 200,000 triangles. For 3D printing, this is correct behavior. For real-time rendering, you may want to decimate the mesh in Blender (Modifier {">"} Decimate) to reduce the polygon count before using it in a game engine or on the web.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Convert STL to OBJ or GLB, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drop your STL. Click the export format. Download the converted file. Runs locally via Three.js exporters. No server, no account.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/3d-viewer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open 3D Viewer, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 5: No-upload matters ──────────────────────────────────── */}

        <h2 id="no-upload-why" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why no-upload matters for proprietary CAD files
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most online 3D viewers work by uploading your file to a remote server for parsing and rendering. The server returns either a rendered image or a streaming WebGL session. This is technically convenient but has serious implications when the file contains proprietary geometry.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Consider what an STL file from a CAD tool actually contains: the exact three-dimensional shape of a part. That shape may represent:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Aerospace components.</strong> The geometry of a structural bracket, fitting, or housing can reveal manufacturing methods and tolerances that are covered by export control regulations (ITAR in the US, EAR, or equivalent).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Medical device designs.</strong> The geometry of an implant or instrument may be a patented design that should not be transmitted to third-party servers.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Consumer product internals.</strong> The enclosure shape, mounting boss positions, and connector cutouts of an unreleased product are competitive intelligence.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Client deliverables under NDA.</strong> If you are a contract engineer working under NDA, uploading your client's geometry to any third-party service may breach the agreement.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix 3D Viewer processes everything using the browser's File API and Three.js running locally. The file is read into an ArrayBuffer in memory. It is parsed in the browser JavaScript context. The resulting geometry is uploaded to the GPU via WebGL. No network request carries your geometry data to any server at any point. You can verify this in Chrome DevTools: open the Network tab, load a 3D file, and filter for requests. You will see the Three.js library modules loading (which are static assets), but no outgoing request containing your file content.
        </p>

        {/* ── Section 6: 3MF note ───────────────────────────────────────────── */}

        <h2 id="3mf-note" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What about 3MF?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          3MF (3D Manufacturing Format) was developed by the 3MF Consortium (Microsoft, Autodesk, HP, Stratasys, and others) as a modern replacement for STL in the 3D printing pipeline. Unlike STL, 3MF can store:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Color and material per triangle or per vertex</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Print settings (layer height, infill, supports) embedded in the file</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Multiple objects in a single file with positions and orientations</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Metadata (author, creation date, description)</li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The 3MF Consortium has published the format specification openly, but production-quality browser support is limited because the Three.js ecosystem does not include a maintained 3MF loader. The format is an XML-based ZIP archive, which makes it straightforward to parse in principle, but edge cases (multi-material meshes, print settings extensions) add complexity.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you need to view or convert a 3MF file in a browser today, the practical approach is: open the 3MF in PrusaSlicer, Bambu Studio, or Windows 3D Viewer, export it as STL, and then open the STL in a browser viewer. PrusaSlicer supports all the major 3MF extensions and exports clean, valid STL files.
        </p>

        {/* ── Section 7: Mesh stats ─────────────────────────────────────────── */}

        <h2 id="mesh-stats" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Reading mesh statistics: triangles, bounding box, volume
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The stats panel on the right side of the viewer shows seven values computed directly from the vertex buffer without any server-side processing.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Triangle count.</strong> The number of triangles in the mesh. This is the primary complexity metric. For 3D printing, triangle count affects slicer parse time but does not directly affect print quality. For real-time rendering, triangle count directly affects GPU draw call cost. A typical game asset is 1,000 to 50,000 triangles. A high-detail 3D scan or CAD export can be millions.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Bounding box (X, Y, Z).</strong> The axis-aligned bounding box dimensions in mm or inch. These are the raw values from the vertex coordinates. As noted above, STL files do not store units. The viewer assumes millimeters. If your file was designed in inches, multiply each dimension by 25.4 to get the correct mm value.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Volume (approx.).</strong> Volume is computed using the divergence theorem applied to each triangle (signed volume summation). This gives an exact result for closed watertight meshes. For open meshes (meshes with holes or boundary edges), the result is an approximation and may not correspond to the enclosed physical volume. The value is in mm cube or in cube depending on the selected unit.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Surface area.</strong> The sum of all triangle areas in the mesh, in mm squared or in squared. Useful for material cost estimation (how much resin, how much powder) and for comparing two meshes with similar visual appearance.
        </p>

        {/* ── Section 8: Batch convert ──────────────────────────────────────── */}

        <h2 id="batch-convert" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Batch converting multiple 3D files at once
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The viewer includes a Batch Convert mode (accessible via the tab at the top of the tool) that lets you convert multiple STL, OBJ, GLB, GLTF, or PLY files to a single target format and download them as a ZIP archive. Single-file view and conversion is free. The batch ZIP mode requires a Day Pass ($2.99, valid for 24 hours on all SammaPix tools) or a Pro plan.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The batch workflow is fully client-side. Each file is loaded, parsed, and converted by Three.js locally. The resulting blobs are packed into a ZIP using JSZip, also running locally. Nothing is uploaded at any point in the batch flow.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Practical use case: a designer receives a set of 12 STL parts from a manufacturer and needs to import them all into Unity. Rather than converting each file individually, they drop all 12 into the batch panel, select GLB as the target format, and download a ZIP with 12 GLB files ready to drag into the Unity project folder.
        </p>

        {/* ── Tool CTA #3 ────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">3D file tools for designers and engineers</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            View STL files in WebGL, convert to OBJ or GLB, batch convert multiple files to ZIP. All browser-based. No upload. No software install.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/3d-viewer" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              3D Viewer <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/svg-to-png" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              SVG to PNG <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/image-to-base64" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Image to Base64 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/3d-viewer" className="text-[#6366F1] hover:underline">3D Model Viewer</Link>
            </strong>: view and convert STL, OBJ, GLB, GLTF, PLY in your browser. Orbit controls, mesh stats, export to any format. No upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SVG to PNG</Link>
            </strong>: rasterize SVG vector files to PNG at any resolution. Useful for exporting 2D design elements from the same pipeline as 3D assets. See the{" "}
            <Link href="/blog/svg-to-png-complete-guide-developers" className="text-[#6366F1] hover:underline">SVG to PNG developer guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link>
            </strong>: encode texture images as Base64 Data URIs for embedding in glTF JSON files or HTML without a separate file request.
          </li>
        </ul>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            FAQ
          </h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                {item.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </section>

      </BlogArticleLayout>

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
    </>
  );
}
