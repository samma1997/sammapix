import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Image Optimization Glossary: 30+ Terms Explained | SammaPix",
  description:
    "Complete glossary of image optimization terms: lossy compression, EXIF data, WebP, AVIF, DPI, aspect ratio, and more. Plain-English definitions with examples.",
  alternates: { canonical: `${APP_URL}/glossary` },
  keywords: [
    "image optimization glossary",
    "what is lossy compression",
    "what is EXIF data",
    "image format definitions",
    "webp definition",
    "what is DPI in images",
    "what is bit depth",
    "image compression terms",
    "photography glossary",
    "what is AVIF format",
  ],
  openGraph: {
    title: "Image Optimization Glossary: 30+ Terms Explained | SammaPix",
    description:
      "Plain-English definitions for every image optimization term you will ever encounter: lossy, lossless, EXIF, WebP, AVIF, DPI, color space, and 25 more.",
    url: `${APP_URL}/glossary`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Image Optimization Glossary - SammaPix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Optimization Glossary: 30+ Terms Explained",
    description:
      "Plain-English definitions for every image term you will encounter: lossy, WebP, EXIF, DPI, AVIF, color space, and more.",
    creator: "@lucasammarco",
  },
};

// ─── Schema data ──────────────────────────────────────────────────────────────

const GLOSSARY_TERMS = [
  {
    id: "alpha-channel",
    term: "Alpha Channel",
    letter: "A",
    definition:
      "The alpha channel is a fourth data channel in an image that controls per-pixel transparency, alongside the three color channels (Red, Green, Blue). A pixel with an alpha value of 0 is fully transparent; a value of 255 (or 100%) is fully opaque. Formats that support alpha channels include PNG, WebP, and AVIF - JPEG does not.",
    links: [],
  },
  {
    id: "aspect-ratio",
    term: "Aspect Ratio",
    letter: "A",
    definition:
      "Aspect ratio is the proportional relationship between an image's width and height, expressed as two numbers separated by a colon- for example, 16:9 or 4:3. Maintaining the correct aspect ratio when resizing prevents distortion and ensures images display correctly across platforms. Social media platforms and video formats each have their own required ratios.",
    links: [{ label: "Crop & Ratio tool", href: "/tools/croproatio" }],
  },
  {
    id: "avif",
    term: "AVIF",
    letter: "A",
    definition:
      "AVIF (AV1 Image File Format) is a modern image format derived from the AV1 video codec. It offers superior compression compared to both JPEG and WebP- typically 50% smaller file sizes at equivalent visual quality- and supports HDR, wide color gamut, and transparency. Browser support is strong as of 2026, though encoding can be slower than WebP.",
    links: [{ label: "Convert to WebP or AVIF", href: "/tools/webp" }],
  },
  {
    id: "batch-processing",
    term: "Batch Processing",
    letter: "B",
    definition:
      "Batch processing applies the same operation- compression, format conversion, renaming, resizing- to a group of images simultaneously rather than one at a time. It is essential for photographers managing post-shoot workflows where hundreds of files need to be processed consistently. SammaPix performs all batch operations directly in the browser, so no files are uploaded to a server.",
    links: [{ label: "Batch compress images", href: "/tools/compress" }],
  },
  {
    id: "bit-depth",
    term: "Bit Depth",
    letter: "B",
    definition:
      "Bit depth (also called color depth) defines how many bits are used to represent the color of a single pixel, which determines the total number of possible colors. An 8-bit image can display 256 values per channel (16.7 million colors total); a 16-bit image can display 65,536 values per channel. Higher bit depth results in smoother gradients and more editing headroom in RAW files.",
    links: [],
  },
  {
    id: "chroma-subsampling",
    term: "Chroma Subsampling",
    letter: "C",
    definition:
      "Chroma subsampling is a compression technique that reduces color information while preserving luminance (brightness) detail, exploiting the human eye's lower sensitivity to color resolution. Common ratios are 4:4:4 (no subsampling), 4:2:2 (half horizontal color resolution), and 4:2:0 (quarter color resolution, used in most JPEGs). It is a major contributor to JPEG's file size reduction with minimal visible quality loss.",
    links: [],
  },
  {
    id: "color-space",
    term: "Color Space",
    letter: "C",
    definition:
      "A color space defines the range of colors (gamut) and the mathematical model used to represent them. sRGB is the standard for web and screen display; Adobe RGB and Display P3 cover wider gamuts used in print and professional editing; ProPhoto RGB is the widest, used internally in photo editors. Publishing images in the wrong color space can cause washed-out or oversaturated colors on screen.",
    links: [],
  },
  {
    id: "compression-ratio",
    term: "Compression Ratio",
    letter: "C",
    definition:
      "Compression ratio is the ratio of the original file size to the compressed file size. A compression ratio of 10:1 means a 10 MB original becomes 1 MB after compression. Higher ratios mean smaller files but typically more quality loss (for lossy formats) or longer encoding time (for lossless formats). The goal of image optimization is to achieve the highest compression ratio that remains imperceptible to the viewer.",
    links: [{ label: "Compress your images", href: "/tools/compress" }],
  },
  {
    id: "crop-ratio",
    term: "Crop Ratio",
    letter: "C",
    definition:
      "A crop ratio describes the aspect ratio applied when cropping an image- the proportion of width to height retained after cutting. Common crop ratios include 1:1 (square, for Instagram), 16:9 (widescreen, for YouTube), and 4:3 (standard photo). Cropping to a preset ratio ensures consistency across a gallery or content series without manual calculation.",
    links: [{ label: "Crop & Ratio tool", href: "/tools/croproatio" }],
  },
  {
    id: "dpi-ppi",
    term: "DPI / PPI",
    letter: "D",
    definition:
      "DPI (dots per inch) describes print output resolution- how many ink dots a printer places per inch. PPI (pixels per inch) describes screen resolution- how many pixels exist within one inch of a display. For web images, PPI is largely irrelevant because browsers render images based on pixel dimensions, not PPI. A 72 PPI web image and a 300 PPI print image are identical on screen if they share the same pixel dimensions.",
    links: [],
  },
  {
    id: "exif-data",
    term: "EXIF Data",
    letter: "E",
    definition:
      "EXIF (Exchangeable Image File Format) data is metadata embedded in image files by cameras and smartphones. It records technical details like shutter speed, aperture, ISO, lens focal length, camera model, and- critically for privacy - GPS coordinates of where the photo was taken. Sharing images with GPS EXIF data intact can reveal your home address or travel patterns to anyone who views the file.",
    links: [
      { label: "Remove EXIF data", href: "/tools/exif" },
      { label: "Remove GPS from photos", href: "/blog/remove-gps-from-photos" },
    ],
  },
  {
    id: "file-size",
    term: "File Size",
    letter: "F",
    definition:
      "File size is the amount of storage space an image file occupies, measured in bytes, kilobytes (KB), or megabytes (MB). For web use, smaller file sizes directly reduce page load times and bandwidth consumption. The relationship between image dimensions and file size is not linear- doubling the pixel dimensions quadruples the number of pixels and roughly quadruples the file size before compression.",
    links: [{ label: "Reduce file size", href: "/tools/compress" }],
  },
  {
    id: "gif",
    term: "GIF",
    letter: "G",
    definition:
      "GIF (Graphics Interchange Format) is a bitmap format from 1987 that supports simple frame-by-frame animation and a palette limited to 256 colors. Despite its age, GIF remains popular for short looping animations on the web and in messaging apps. For static images, PNG is strictly superior; for video-like animations, modern alternatives like WebP animation or MP4 video offer far smaller file sizes.",
    links: [],
  },
  {
    id: "gps-metadata",
    term: "GPS Metadata",
    letter: "G",
    definition:
      "GPS metadata is a subset of EXIF data that records the precise latitude and longitude coordinates where a photograph was captured. Most modern smartphones embed this information automatically. While useful for organizing travel photos, GPS metadata poses a significant privacy risk when sharing images publicly- anyone can extract the coordinates and locate your home, office, or exact shooting location.",
    links: [
      { label: "Remove GPS metadata", href: "/tools/exif" },
      { label: "Sort by Location tool", href: "/tools/geosort" },
    ],
  },
  {
    id: "haversine-formula",
    term: "Haversine Formula",
    letter: "H",
    definition:
      "The Haversine formula is a mathematical equation used to calculate the great-circle distance between two points on a sphere given their latitude and longitude coordinates. In image processing, it powers GPS-based photo sorting and clustering tools that group photographs by geographic proximity- for example, identifying all photos taken within a specific country or within a 10 km radius of a landmark.",
    links: [{ label: "Sort photos by country", href: "/tools/geosort" }],
  },
  {
    id: "heic-heif",
    term: "HEIC / HEIF",
    letter: "H",
    definition:
      "HEIC (High Efficiency Image Container) is Apple's implementation of the HEIF (High Efficiency Image Format) standard. iPhones have used HEIC as the default capture format since iOS 11. HEIC images are typically half the size of equivalent JPEGs with the same visual quality. The format supports 16-bit color and Live Photos, but compatibility is limited outside Apple ecosystems- most web platforms and Android devices require conversion to JPEG or WebP.",
    links: [
      { label: "Convert HEIC to JPG", href: "/tools/heic" },
      { label: "iPhone HEIC to JPG guide", href: "/blog/iphone-heic-to-jpg-guide" },
    ],
  },
  {
    id: "icc-profile",
    term: "ICC Profile",
    letter: "I",
    definition:
      "An ICC (International Color Consortium) profile is a standardized file embedded in an image that defines its color space- the gamut and tonal range it was captured or edited in. When you open an image in a color-managed application, the ICC profile tells the app how to interpret the raw color values. Stripping ICC profiles during compression can cause color shifts, particularly in images edited in Adobe RGB or Display P3.",
    links: [],
  },
  {
    id: "jpeg-jpg",
    term: "JPEG / JPG",
    letter: "J",
    definition:
      "JPEG (Joint Photographic Experts Group) is the most widely used image format in the world, introduced in 1992. It uses lossy DCT (Discrete Cosine Transform) compression that achieves excellent file size reductions for photographs by discarding imperceptible detail. Quality settings typically range from 0–100; values between 75–85 offer the best balance of visual fidelity and file size for web publishing.",
    links: [
      { label: "Compress JPEG images", href: "/tools/compress" },
      { label: "Convert JPEG to WebP", href: "/tools/webp" },
    ],
  },
  {
    id: "lossless-compression",
    term: "Lossless Compression",
    letter: "L",
    definition:
      "Lossless compression reduces file size without discarding any image data- the decompressed image is bit-for-bit identical to the original. Formats like PNG and WebP lossless use algorithms (Deflate, LZ77) that find and encode redundant patterns. Lossless compression is preferred for graphics with flat colors, text, logos, and screenshots where any quality degradation is visible, but results in larger files than lossy compression for photographs.",
    links: [{ label: "Compress images losslessly", href: "/tools/compress" }],
  },
  {
    id: "lossy-compression",
    term: "Lossy Compression",
    letter: "L",
    definition:
      "Lossy compression permanently discards image data that is considered imperceptible to the human eye, achieving much higher compression ratios than lossless methods. JPEG, WebP (lossy), and AVIF all use lossy compression. Each subsequent save of a lossy image compounds the quality loss- a process sometimes called 'generation loss.' The key metric is finding the minimum quality setting where degradation is invisible to viewers.",
    links: [
      { label: "Compress images", href: "/tools/compress" },
      { label: "Compress images without losing quality", href: "/blog/compress-images-without-losing-quality" },
    ],
  },
  {
    id: "metadata",
    term: "Metadata",
    letter: "M",
    definition:
      "Image metadata is structured data embedded inside an image file that describes the image itself rather than its visual content. It encompasses several standards: EXIF (camera settings and GPS), IPTC (editorial data like captions and copyright), and XMP (an Adobe-developed extensible format). Metadata is invisible when viewing an image but can be read by any metadata-aware application or browser.",
    links: [
      { label: "Remove image metadata", href: "/tools/exif" },
      { label: "What is EXIF data", href: "/blog/remove-exif-protect-privacy" },
    ],
  },
  {
    id: "perceptual-hashing",
    term: "Perceptual Hashing",
    letter: "P",
    definition:
      "Perceptual hashing (pHash) generates a compact fingerprint of an image based on its visual content rather than its raw bytes. Unlike cryptographic hashes (MD5, SHA1) that change entirely with any pixel difference, perceptual hashes of visually similar images produce similar or identical values. This makes them ideal for duplicate photo detection- two versions of the same image at different sizes or quality levels will share nearly identical pHash values.",
    links: [{ label: "Find duplicate photos", href: "/tools/twinhunt" }],
  },
  {
    id: "pixel",
    term: "Pixel",
    letter: "P",
    definition:
      "A pixel (picture element) is the smallest addressable unit of a raster image, representing a single color value. In an RGB image, each pixel stores three channel values (0–255 for 8-bit). A 3000 x 2000 pixel image contains exactly 6 million pixels- 6 megapixels. Pixel count does not directly determine file size, which also depends on the format, compression level, and content complexity of the image.",
    links: [],
  },
  {
    id: "png",
    term: "PNG",
    letter: "P",
    definition:
      "PNG (Portable Network Graphics) is a lossless raster format introduced in 1996 as a patent-free alternative to GIF. It supports full RGB color, alpha channel transparency, and both 8-bit and 16-bit color depth. PNG is optimal for screenshots, logos, illustrations, and any image where sharpness or transparency is required. For photographs, PNG files are typically 5–10x larger than equivalent JPEGs, making WebP or AVIF a better choice.",
    links: [{ label: "Convert PNG to WebP", href: "/tools/webp" }],
  },
  {
    id: "progressive-jpeg",
    term: "Progressive JPEG",
    letter: "P",
    definition:
      "A progressive JPEG loads in multiple passes, showing a low-resolution version of the entire image first, then progressively refining it with each subsequent scan until full quality is reached. This contrasts with baseline JPEGs that load from top to bottom in a single pass. Progressive JPEGs are often slightly smaller than baseline equivalents and deliver a better perceived loading experience, which matters for Core Web Vitals (LCP).",
    links: [{ label: "Compress JPEG images", href: "/tools/compress" }],
  },
  {
    id: "quality-factor",
    term: "Quality Factor",
    letter: "Q",
    definition:
      "The quality factor (typically a scale of 0–100) controls the compression aggressiveness applied to lossy formats like JPEG and WebP. A quality of 100 preserves the most detail with the largest file; a quality of 0 creates the smallest file with heavy artifacting. For web use, quality 75–85 for JPEG and 75–80 for WebP typically achieves the optimal tradeoff- invisible quality loss with significant file size reduction.",
    links: [{ label: "Set quality when compressing", href: "/tools/compress" }],
  },
  {
    id: "raw",
    term: "RAW",
    letter: "R",
    definition:
      "A RAW file is unprocessed sensor data captured directly by a digital camera with minimal in-camera processing applied. Unlike JPEG, which is processed and compressed in-camera, RAW preserves all captured data: full bit depth, pre-white-balance color data, and no lossy compression. Common RAW formats include CR3 (Canon), ARW (Sony), NEF (Nikon), and DNG (universal). RAW files require dedicated editing software and are not suitable for web publishing without conversion.",
    links: [],
  },
  {
    id: "resolution",
    term: "Resolution",
    letter: "R",
    definition:
      "Image resolution describes the level of detail in an image, typically expressed as total pixel dimensions (e.g., 3000 x 2000 pixels) or megapixels (6 MP). Higher resolution means more pixels and greater detail, but also larger file sizes. For web use, resolution requirements depend on display size- a full-width desktop hero image needs around 1920 px wide; a thumbnail might only need 400 px. Serving images at exactly the required resolution (not larger) is a core web optimization technique.",
    links: [{ label: "Resize images", href: "/tools/resizepack" }],
  },
  {
    id: "resize",
    term: "Resize",
    letter: "R",
    definition:
      "Resizing an image changes its pixel dimensions- either upscaling (increasing size) or downscaling (reducing size). Downscaling always reduces file size and is lossless in information terms for the output use case. Upscaling beyond the original resolution introduces interpolation artifacts because pixel data must be invented. For web performance, serving images at the exact display dimensions rather than relying on CSS to scale them down is a significant optimization.",
    links: [{ label: "Resize for social media", href: "/tools/resizepack" }],
  },
  {
    id: "srgb",
    term: "sRGB",
    letter: "S",
    definition:
      "sRGB (standard Red Green Blue) is the standard color space defined by HP and Microsoft in 1996 for monitors, web browsers, and consumer cameras. It covers approximately 35% of visible human color. All web browsers assume images without an embedded ICC profile are sRGB. Photographers who edit in Adobe RGB or Display P3 must convert to sRGB before publishing to the web to avoid washed-out color on standard displays.",
    links: [],
  },
  {
    id: "svg",
    term: "SVG",
    letter: "S",
    definition:
      "SVG (Scalable Vector Graphics) is an XML-based vector format that describes images using mathematical paths, shapes, and text rather than pixels. SVGs scale perfectly to any size without loss of quality, making them ideal for logos, icons, and illustrations. Unlike raster formats (JPEG, PNG, WebP), SVG file size is determined by the complexity of the paths, not the display dimensions. SVG files can be embedded directly in HTML and styled with CSS.",
    links: [],
  },
  {
    id: "thumbnail",
    term: "Thumbnail",
    letter: "T",
    definition:
      "A thumbnail is a small preview version of a larger image, typically used in galleries, search results, product listings, and social media cards. Thumbnails are generated by downscaling the original to a fixed or maximum dimension- common sizes include 150x150, 300x300, or 400x300 pixels. Serving thumbnails instead of scaled-down full images is a core web performance optimization that can reduce page weight by 80–95% for image-heavy pages.",
    links: [{ label: "Resize to thumbnail", href: "/tools/resizepack" }],
  },
  {
    id: "transparency",
    term: "Transparency",
    letter: "T",
    definition:
      "Transparency in image formats allows pixels to be fully or partially see-through, so the background or content behind the image shows through. It is implemented via the alpha channel. JPEG does not support transparency; PNG, WebP, AVIF, and GIF (binary transparency only) all do. Transparency is essential for logos, cutout product photos, overlays, and any image placed on a non-white background.",
    links: [{ label: "Convert PNG to WebP with transparency", href: "/tools/webp" }],
  },
  {
    id: "watermark",
    term: "Watermark",
    letter: "W",
    definition:
      "A watermark is a visible or invisible mark overlaid on an image to indicate ownership, copyright, or branding. Visible watermarks are typically text or logos embedded semi-transparently over the image content to deter unauthorized use. Invisible (steganographic) watermarks embed data imperceptibly in pixel values for forensic identification. Batch watermarking- applying a consistent mark to hundreds of images at once- is essential for photographers distributing work online.",
    links: [{ label: "Batch watermark photos", href: "/tools/stampit" }],
  },
  {
    id: "webp",
    term: "WebP",
    letter: "W",
    definition:
      "WebP is a modern image format developed by Google, released in 2010 and widely supported since 2022. It supports both lossy and lossless compression, transparency (alpha channel), and animation. Lossy WebP files are 25–35% smaller than equivalent JPEGs; lossless WebP is 26% smaller than equivalent PNGs. WebP is now the recommended default format for web images and is supported by all major browsers.",
    links: [
      { label: "Convert to WebP", href: "/tools/webp" },
      { label: "Complete guide to WebP", href: "/blog/complete-guide-webp-format" },
    ],
  },
];

// Group terms by letter
const LETTERS_WITH_TERMS = Array.from(
  new Set(GLOSSARY_TERMS.map((t) => t.letter))
).sort();

// All letters that appear in the nav
const NAV_LETTERS = LETTERS_WITH_TERMS;

// ─── Schema ───────────────────────────────────────────────────────────────────

const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Image Optimization Glossary",
  description:
    "A comprehensive reference of image optimization terms including compression formats, metadata standards, and technical concepts used in digital photography and web development.",
  url: `${APP_URL}/glossary`,
  inDefinedTermSet: GLOSSARY_TERMS.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition.replace(/\s+/g, " ").trim(),
    url: `${APP_URL}/glossary#${t.id}`,
    inDefinedTermSet: `${APP_URL}/glossary`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "SammaPix",
      item: APP_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Glossary",
      item: `${APP_URL}/glossary`,
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function GlossaryPage() {
  const termsByLetter = LETTERS_WITH_TERMS.reduce<
    Record<string, typeof GLOSSARY_TERMS>
  >((acc, letter) => {
    acc[letter] = GLOSSARY_TERMS.filter((t) => t.letter === letter);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermSetSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

        {/* ── Header ── */}
        <header className="mb-12">
          <p className="text-xs text-gray-400 dark:text-[#525252] uppercase tracking-widest mb-3">
            Reference
          </p>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] leading-snug mb-4">
            Image Optimization Glossary
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed mb-6">
            Plain-English definitions for every image format, compression concept,
            and metadata term you will encounter while working with digital photos
            and web images. {GLOSSARY_TERMS.length} terms, arranged alphabetically.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 dark:text-[#525252] mb-8">
            <span>{GLOSSARY_TERMS.length} terms defined</span>
            <span>·</span>
            <span>Formats, compression, metadata, color</span>
            <span>·</span>
            <span>Updated March 2026</span>
          </div>

          {/* ── Alphabet jump nav ── */}
          <nav
            aria-label="Alphabet navigation"
            className="flex flex-wrap gap-1.5 p-3 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-gray-100 dark:border-[#2A2A2A] rounded-md"
          >
            {NAV_LETTERS.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="inline-flex items-center justify-center w-7 h-7 text-xs font-medium text-gray-500 dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] hover:bg-white dark:hover:bg-[#2A2A2A] rounded transition-colors"
              >
                {letter}
              </a>
            ))}
          </nav>

          <div className="mt-8 h-px bg-gray-100 dark:bg-[#2A2A2A]" />
        </header>

        {/* ── Terms ── */}
        <div className="space-y-12">
          {LETTERS_WITH_TERMS.map((letter) => (
            <section key={letter} id={`letter-${letter}`}>

              {/* Letter heading */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono font-semibold text-gray-300 dark:text-[#404040] select-none w-4">
                  {letter}
                </span>
                <div className="flex-1 h-px bg-gray-100 dark:bg-[#2A2A2A]" />
              </div>

              {/* Terms in this letter group */}
              <div className="space-y-8">
                {termsByLetter[letter].map((entry) => (
                  <article
                    key={entry.id}
                    id={entry.id}
                    className="scroll-mt-6"
                  >
                    <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
                      {entry.term}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed mb-3">
                      {entry.definition}
                    </p>
                    {entry.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {entry.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-[#525252] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors border border-gray-200 dark:border-[#2A2A2A] px-2.5 py-1 rounded hover:border-gray-400 dark:hover:border-[#525252]"
                          >
                            {link.label}
                            <span className="text-gray-300 dark:text-[#404040]">
                              →
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ── Back to top ── */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <a
            href="#"
            className="text-xs text-gray-400 dark:text-[#525252] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
          >
            Back to top
          </a>
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-gray-100 dark:border-[#2A2A2A] rounded-md">
          <p className="text-xs text-gray-400 dark:text-[#525252] uppercase tracking-widest mb-2">
            Put the theory to work
          </p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
            Every term in this glossary maps to something you can do right now.
            Compress, convert, strip EXIF data, or find duplicates- all free,
            all in the browser, no upload required.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] px-4 py-2 rounded hover:bg-[#262626] dark:hover:bg-white transition-colors"
            >
              Compress images
            </Link>
            <Link
              href="/tools/webp"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] border border-gray-200 dark:border-[#2A2A2A] px-4 py-2 rounded hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              Convert to WebP
            </Link>
            <Link
              href="/tools/exif"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] border border-gray-200 dark:border-[#2A2A2A] px-4 py-2 rounded hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              Remove EXIF
            </Link>
          </div>
        </div>

        {/* ── Related reading ── */}
        <section className="mt-10">
          <h2 className="text-xs font-semibold text-gray-400 dark:text-[#525252] uppercase tracking-widest mb-4">
            Related reading
          </h2>
          <div className="space-y-2">
            {[
              {
                label: "The complete guide to WebP format",
                href: "/blog/complete-guide-webp-format",
              },
              {
                label: "How to compress images without losing quality",
                href: "/blog/compress-images-without-losing-quality",
              },
              {
                label: "How to remove EXIF data and protect your privacy",
                href: "/blog/remove-exif-protect-privacy",
              },
              {
                label: "Best image format for the web in 2026",
                href: "/blog/best-image-format-for-web-2026",
              },
              {
                label: "How to convert iPhone HEIC photos to JPG",
                href: "/blog/iphone-heic-to-jpg-guide",
              },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="flex items-center justify-between group py-2.5 border-b border-gray-100 dark:border-[#2A2A2A] last:border-0"
              >
                <span className="text-sm text-gray-500 dark:text-[#737373] group-hover:text-[#171717] dark:group-hover:text-[#E5E5E5] transition-colors">
                  {post.label}
                </span>
                <span className="text-gray-300 dark:text-[#404040] group-hover:text-gray-500 dark:group-hover:text-[#737373] transition-colors text-sm ml-4 flex-shrink-0">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
