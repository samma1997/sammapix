import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Shield, Zap, Layers, CheckCircle2 } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Data model
// ---------------------------------------------------------------------------

interface ConversionFaq {
  q: string;
  a: string;
}

interface FormatRow {
  format: string;
  fileSize: string;
  quality: string;
  compatibility: string;
  useCase: string;
}

interface ConversionData {
  from: string;
  to: string;
  fromLabel: string;
  toLabel: string;
  toolPath: string;
  toolLabel: string;
  /** One-line tagline shown under the H1 */
  tagline: string;
  /** "Why convert X to Y?" body copy- 2–3 sentences */
  whyCopy: string;
  /** Short note about quality loss (or lack thereof) */
  qualityNote: string;
  /** How the conversion actually works technically (used in FAQ) */
  technicalNote: string;
  formatTable: FormatRow[];
  faqs: ConversionFaq[];
  /** Slugs of other convert pairs to link to as "related" */
  related: string[];
  /** Blog slugs that are relevant */
  blogSlugs: { slug: string; title: string }[];
}

// ---------------------------------------------------------------------------
// CONVERSIONS map
// ---------------------------------------------------------------------------

const CONVERSIONS: Record<string, ConversionData> = {
  "heic-to-jpg": {
    from: "HEIC",
    to: "JPG",
    fromLabel: "HEIC",
    toLabel: "JPG",
    toolPath: "/tools/heic",
    toolLabel: "Open HEIC Converter",
    tagline: "Convert iPhone HEIC photos to universally-compatible JPG- free, instant, no upload.",
    whyCopy:
      "HEIC is Apple's default photo format since iOS 11. It offers excellent compression but most Windows PCs, websites, and apps cannot open it natively. Converting HEIC to JPG makes your photos work everywhere- from email attachments to social media uploads- without any software installs on the recipient's side.",
    qualityNote:
      "Converting HEIC to JPG involves recompression. At quality 80–90 the visual difference is invisible to the human eye, and the resulting file is typically 40–60 % smaller than the original HEIC.",
    technicalNote:
      "SammaPix decodes the HEIC file entirely inside your browser using a WebAssembly-based HEIC decoder (libheif), then re-encodes it as JPEG using the Canvas API. Your photos never leave your device.",
    formatTable: [
      {
        format: "HEIC",
        fileSize: "Small",
        quality: "High (HEVC codec)",
        compatibility: "Apple only",
        useCase: "iPhone/iPad native storage",
      },
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Web, email, social media, print",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Graphics, logos, screenshots",
      },
      {
        format: "WebP",
        fileSize: "Smallest",
        quality: "High (lossy or lossless)",
        compatibility: "Modern browsers",
        useCase: "Web performance",
      },
    ],
    faqs: [
      {
        q: "Does converting HEIC to JPG lose quality?",
        a: "There is a small quality tradeoff because HEIC uses HEVC compression while JPG uses JPEG compression. At quality 85 the difference is invisible in photos. SammaPix defaults to quality 85 and lets you raise it to 100 for maximum fidelity.",
      },
      {
        q: "Is it safe to convert my iPhone photos online?",
        a: "With SammaPix, yes- conversion happens 100 % inside your browser. No image data is sent to any server. You can even disconnect from the internet after the page loads and the tool still works.",
      },
      {
        q: "Can I convert multiple HEIC files at once?",
        a: "Yes. SammaPix supports batch conversion. Drop up to 20 files at once (free plan) and download all results as a ZIP.",
      },
      {
        q: "Why does my iPhone shoot in HEIC instead of JPG?",
        a: "Apple switched to HEIC in iOS 11 because it stores the same image quality at roughly half the file size of JPG, saving storage on your device. The trade-off is compatibility with non-Apple software.",
      },
    ],
    related: ["heic-to-png", "jpg-to-webp", "png-to-webp"],
    blogSlugs: [
      { slug: "iphone-heic-to-jpg-guide", title: "The Complete Guide to Converting iPhone HEIC Photos" },
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  "heic-to-png": {
    from: "HEIC",
    to: "PNG",
    fromLabel: "HEIC",
    toLabel: "PNG",
    toolPath: "/tools/heic",
    toolLabel: "Open HEIC Converter",
    tagline: "Convert iPhone HEIC photos to lossless PNG- free, browser-based, no server upload.",
    whyCopy:
      "While JPG is the most common conversion target, PNG gives you a pixel-perfect lossless copy of your HEIC photo. This is the right choice when you need to edit the image further in Photoshop or Figma, use it as a design asset, or need to preserve exact colour data without any generation loss.",
    qualityNote:
      "PNG is lossless: the output contains every pixel from the original HEIC image without compression artefacts. The file size will be larger than JPG but you gain zero quality loss- ideal for source files you will edit later.",
    technicalNote:
      "The HEIC file is decoded in-browser via a WebAssembly HEIC decoder, then the raw pixel data is written to a Canvas element and exported as PNG via `canvas.toBlob('image/png')`. No server involved.",
    formatTable: [
      {
        format: "HEIC",
        fileSize: "Small",
        quality: "High (HEVC codec)",
        compatibility: "Apple only",
        useCase: "iPhone/iPad native storage",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Editing source files, logos, screenshots",
      },
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Web, email, social media",
      },
      {
        format: "WebP",
        fileSize: "Smallest",
        quality: "High (lossy or lossless)",
        compatibility: "Modern browsers",
        useCase: "Web performance",
      },
    ],
    faqs: [
      {
        q: "Does converting HEIC to PNG lose quality?",
        a: "No. PNG is a lossless format. Every pixel from your HEIC photo is preserved exactly. This is the main reason to choose PNG over JPG when quality is critical.",
      },
      {
        q: "Why is my HEIC to PNG output so much larger than the original?",
        a: "HEIC uses the highly efficient HEVC codec. PNG stores pixels without lossy compression. A 2 MB HEIC file can become 8–20 MB as PNG- this is normal and expected.",
      },
      {
        q: "When should I convert HEIC to PNG instead of JPG?",
        a: "Choose PNG when you plan to edit the image further (design work, compositing), need a lossless master copy, or are dealing with images that contain text or sharp edges where JPG artefacts would be visible.",
      },
      {
        q: "Can I convert HEIC to PNG in bulk?",
        a: "Yes. SammaPix supports batch conversion- drop all your HEIC files at once and download the PNG results as a ZIP archive.",
      },
    ],
    related: ["heic-to-jpg", "png-to-webp", "png-to-jpg"],
    blogSlugs: [
      { slug: "iphone-heic-to-jpg-guide", title: "The Complete Guide to Converting iPhone HEIC Photos" },
    ],
  },

  "png-to-webp": {
    from: "PNG",
    to: "WebP",
    fromLabel: "PNG",
    toLabel: "WebP",
    toolPath: "/tools/webp",
    toolLabel: "Open WebP Converter",
    tagline: "Shrink PNG files by up to 80 %- convert to WebP free, browser-based, no upload.",
    whyCopy:
      "WebP replaces PNG with dramatically smaller files at the same visual quality. For websites and web apps, serving WebP instead of PNG means faster page loads, lower bandwidth costs, and better Core Web Vitals scores. All major browsers have supported WebP since 2020, making the switch risk-free for most projects.",
    qualityNote:
      "WebP lossless mode produces files 26 % smaller than PNG on average. WebP lossy mode at quality 80 produces files that look identical to PNG but are up to 80 % smaller. SammaPix lets you choose the quality level.",
    technicalNote:
      "Conversion uses the browser's native Canvas API: the PNG is drawn onto a canvas element and exported via `canvas.toBlob('image/webp', quality)`. No server required- it all runs in your browser's JavaScript engine.",
    formatTable: [
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Logos, graphics, screenshots, editing source",
      },
      {
        format: "WebP",
        fileSize: "Smallest",
        quality: "High (lossy or lossless)",
        compatibility: "All modern browsers",
        useCase: "Web images, performance optimization",
      },
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, email, social media",
      },
      {
        format: "AVIF",
        fileSize: "Smallest",
        quality: "Excellent",
        compatibility: "Modern browsers only",
        useCase: "Next-gen web images",
      },
    ],
    faqs: [
      {
        q: "Does converting PNG to WebP lose quality?",
        a: "It depends on your settings. WebP supports both lossy and lossless modes. In lossless mode the output is pixel-perfect but only 26 % smaller. In lossy mode at quality 80–90 the visual difference from the original PNG is negligible while file size drops 60–80 %.",
      },
      {
        q: "Is WebP supported in all browsers?",
        a: "WebP is supported in Chrome, Firefox, Safari (since 2020), Edge, and all major mobile browsers. If you need to support Internet Explorer 11 (which is now end-of-life), use JPG instead.",
      },
      {
        q: "Should I convert my PNG logo to WebP?",
        a: "If your logo contains transparency (alpha channel), WebP handles transparency just like PNG- so yes, converting is safe. Just use WebP lossless mode to preserve crisp edges.",
      },
      {
        q: "Can Next.js and WordPress serve WebP automatically?",
        a: "Next.js Image component converts and serves WebP automatically. WordPress with a plugin like Imagify or ShortPixel can do the same. Converting your originals to WebP first gives you maximum control.",
      },
    ],
    related: ["jpg-to-webp", "jpeg-to-webp", "png-to-jpg"],
    blogSlugs: [
      { slug: "complete-guide-webp-format", title: "The Complete Guide to the WebP Format" },
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
      { slug: "best-image-compression-tools-2026", title: "Best Image Compression Tools 2026" },
    ],
  },

  "jpg-to-webp": {
    from: "JPG",
    to: "WebP",
    fromLabel: "JPG",
    toLabel: "WebP",
    toolPath: "/tools/webp",
    toolLabel: "Open WebP Converter",
    tagline: "Convert JPG to WebP and cut file size by 25–35 %- free, instant, no upload.",
    whyCopy:
      "JPG is a great format but WebP goes further. Google's WebP codec delivers 25–35 % smaller files than JPG at equivalent visual quality. For e-commerce sites, blogs, and portfolios with large photo galleries, switching to WebP directly improves Largest Contentful Paint (LCP)- the Core Web Vitals metric tied to search rankings.",
    qualityNote:
      "At quality 75–80, WebP matches JPG quality at 25–35 % smaller file size. The difference is especially noticeable on photos with smooth gradients and detailed textures.",
    technicalNote:
      "Your JPG is decoded into raw pixels, drawn onto an HTML Canvas element, then re-encoded as WebP using the browser's native `canvas.toBlob('image/webp', quality)` API. The entire process runs locally in your tab.",
    formatTable: [
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, web images, email",
      },
      {
        format: "WebP",
        fileSize: "Smallest",
        quality: "High (lossy or lossless)",
        compatibility: "All modern browsers",
        useCase: "Web performance, Core Web Vitals",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Graphics, editing source files",
      },
      {
        format: "AVIF",
        fileSize: "Smallest",
        quality: "Excellent",
        compatibility: "Modern browsers only",
        useCase: "Next-gen web images",
      },
    ],
    faqs: [
      {
        q: "Does converting JPG to WebP lose quality?",
        a: "Converting from one lossy format to another always involves a small quality loss because the image is re-encoded. At quality 80 the artefacts are invisible in normal photos. For maximum fidelity set quality to 90–95.",
      },
      {
        q: "How much smaller will my WebP file be?",
        a: "On average, WebP files are 25–35 % smaller than equivalent JPG files. The exact saving depends on image content- photos with fine detail and smooth skies benefit most.",
      },
      {
        q: "Will Google rank my page higher if I use WebP?",
        a: "WebP does not directly affect ranking, but smaller images improve page speed, which is a confirmed Google ranking signal. PageSpeed Insights explicitly recommends serving images in next-gen formats like WebP.",
      },
      {
        q: "Can I batch convert hundreds of JPGs to WebP?",
        a: "Yes. SammaPix processes all your files in the browser in parallel. Drop up to 20 JPGs at once on the free plan (500 on Pro) and download all WebP files as a ZIP.",
      },
    ],
    related: ["jpeg-to-webp", "png-to-webp", "webp-to-jpg"],
    blogSlugs: [
      { slug: "complete-guide-webp-format", title: "The Complete Guide to the WebP Format" },
      { slug: "image-sizes-social-media-2026", title: "Image Sizes for Social Media 2026" },
    ],
  },

  "jpeg-to-webp": {
    from: "JPEG",
    to: "WebP",
    fromLabel: "JPEG",
    toLabel: "WebP",
    toolPath: "/tools/webp",
    toolLabel: "Open WebP Converter",
    tagline: "Convert JPEG to WebP and cut file size by 25–35 %- free, browser-based, no upload.",
    whyCopy:
      "JPEG and JPG are the same format - JPEG is the original name, JPG became common on Windows where extensions were limited to 3 characters. Both convert to WebP identically. WebP delivers 25–35 % better compression than JPEG at equivalent quality, making it the recommended format for all web images as of 2024.",
    qualityNote:
      "At quality 80, WebP matches JPEG quality at 25–35 % smaller file size. SammaPix lets you dial quality from 1 to 100 so you can find the exact balance for your use case.",
    technicalNote:
      "JPEG and JPG are byte-identical formats. SammaPix decodes the file via an Image element, paints it to Canvas, then calls `canvas.toBlob('image/webp', quality)`. The entire pipeline runs in-browser with no server upload.",
    formatTable: [
      {
        format: "JPEG / JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, web images, email, print",
      },
      {
        format: "WebP",
        fileSize: "Smallest",
        quality: "High (lossy or lossless)",
        compatibility: "All modern browsers",
        useCase: "Web performance, LCP optimization",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Graphics, logos, design assets",
      },
      {
        format: "AVIF",
        fileSize: "Smallest",
        quality: "Excellent",
        compatibility: "Modern browsers only",
        useCase: "Next-gen web images",
      },
    ],
    faqs: [
      {
        q: "What is the difference between JPEG and JPG?",
        a: "There is no difference. JPEG and JPG refer to the exact same format. JPG came from Windows's old 3-character extension limit. Both file types are handled identically by every image tool.",
      },
      {
        q: "Does converting JPEG to WebP lose quality?",
        a: "Converting from JPEG to WebP re-encodes the image, which can introduce a small quality loss. At quality 80–90 the difference is invisible in real photos. Set quality to 95 if you want to minimise generation loss.",
      },
      {
        q: "Is WebP better than JPEG for email?",
        a: "No- email clients like Outlook and older Gmail versions do not render WebP. Keep JPEG for email attachments. Use WebP for images served on the web through a browser.",
      },
      {
        q: "How do I serve WebP on my website while keeping JPEG as a fallback?",
        a: "Use the HTML `<picture>` element: provide a WebP `<source>` first and a JPEG `<img>` fallback. Next.js Image component handles this automatically.",
      },
    ],
    related: ["jpg-to-webp", "png-to-webp", "webp-to-jpg"],
    blogSlugs: [
      { slug: "complete-guide-webp-format", title: "The Complete Guide to the WebP Format" },
      { slug: "best-image-compression-tools-2026", title: "Best Image Compression Tools 2026" },
    ],
  },

  "webp-to-jpg": {
    from: "WebP",
    to: "JPG",
    fromLabel: "WebP",
    toLabel: "JPG",
    toolPath: "/tools/compress",
    toolLabel: "Open Compress & Convert Tool",
    tagline: "Convert WebP back to JPG for universal compatibility- free, browser-based, no upload.",
    whyCopy:
      "WebP is ideal for web delivery, but some apps, email clients, and older software cannot open WebP files. Converting WebP to JPG restores maximum compatibility. Common scenarios include sharing photos with family via email, uploading to legacy CMS platforms, or exporting assets for print workflows that require JPEG.",
    qualityNote:
      "Converting WebP to JPG involves re-encoding from one lossy format to another. At quality 85 the output looks identical to the source. If the original WebP was created from a JPG, the round-trip loss is minimal at high quality settings.",
    technicalNote:
      "SammaPix converts WebP to JPG entirely in the browser using the Canvas API: the WebP is drawn onto a canvas and exported via `canvas.toBlob('image/jpeg', quality)`. No server upload is needed- this is why the tool is listed under Compress & Convert rather than a dedicated server-side converter.",
    formatTable: [
      {
        format: "WebP",
        fileSize: "Smallest",
        quality: "High (lossy or lossless)",
        compatibility: "Modern browsers only",
        useCase: "Web delivery, performance",
      },
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Email, print, legacy apps, social media",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Lossless editing, logos, graphics",
      },
      {
        format: "HEIC",
        fileSize: "Small",
        quality: "High (HEVC)",
        compatibility: "Apple only",
        useCase: "iPhone/iPad photos",
      },
    ],
    faqs: [
      {
        q: "Why does WebP to JPG use the browser canvas instead of a server?",
        a: "Modern browsers can decode WebP natively. SammaPix uses the browser's built-in image rendering to draw the WebP onto a Canvas element and re-encode it as JPEG. This means your image never leaves your device- maximum privacy.",
      },
      {
        q: "Does converting WebP to JPG lose quality?",
        a: "Yes, slightly- both formats are lossy. At quality 85–90 the difference is invisible. If the source WebP was high quality to begin with, the output JPG will look excellent.",
      },
      {
        q: "Can I open WebP files in Photoshop?",
        a: "Photoshop CC 2023 and later support WebP natively. Older versions require the WebP plugin or you can use SammaPix to convert to JPG first.",
      },
      {
        q: "Can I convert WebP files in bulk?",
        a: "Yes. Drop up to 20 WebP files at once on the free plan (500 on Pro) and SammaPix converts them all in parallel in your browser. Download all results as a ZIP.",
      },
    ],
    related: ["jpg-to-webp", "jpeg-to-webp", "png-to-webp"],
    blogSlugs: [
      { slug: "complete-guide-webp-format", title: "The Complete Guide to the WebP Format" },
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  "png-to-jpg": {
    from: "PNG",
    to: "JPG",
    fromLabel: "PNG",
    toLabel: "JPG",
    toolPath: "/tools/compress",
    toolLabel: "Open Compress & Convert Tool",
    tagline: "Convert PNG to JPG and reduce file size by 60–80 %- free, browser-based, no upload.",
    whyCopy:
      "PNG files are lossless and often 3–5 times larger than the equivalent JPG. For photographs, blog images, and any image without transparency, JPG delivers excellent quality at a fraction of the file size. Converting PNG to JPG is one of the easiest wins for website performance- smaller images mean faster load times and better Google PageSpeed scores.",
    qualityNote:
      "A typical photo PNG of 4 MB often compresses to a 800 KB – 1 MB JPG at quality 85 with no visible difference. Images with transparency will have their transparent areas filled with white (the JPG format does not support alpha channels).",
    technicalNote:
      "PNG is drawn onto a Canvas element with a white background fill (to handle any transparency), then exported as JPEG using `canvas.toBlob('image/jpeg', quality)`. The entire process happens inside your browser.",
    formatTable: [
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Logos, graphics, screenshots, editing source",
      },
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, web images, email, social media",
      },
      {
        format: "WebP",
        fileSize: "Smallest",
        quality: "High (lossy or lossless)",
        compatibility: "Modern browsers",
        useCase: "Web performance, Core Web Vitals",
      },
      {
        format: "AVIF",
        fileSize: "Smallest",
        quality: "Excellent",
        compatibility: "Modern browsers only",
        useCase: "Next-gen web images",
      },
    ],
    faqs: [
      {
        q: "Does converting PNG to JPG lose quality?",
        a: "Yes - JPG is a lossy format. At quality 85 the difference is invisible in photographs. However, for images with sharp edges, text, or flat colours (like logos), you may see compression artefacts. In those cases, keep the PNG.",
      },
      {
        q: "What happens to transparent areas when converting PNG to JPG?",
        a: "JPG does not support transparency. SammaPix fills transparent areas with white before encoding. If you need to preserve transparency, convert to WebP instead.",
      },
      {
        q: "Should I convert my website's PNG photos to JPG?",
        a: "Yes, for photographs. JPG is much smaller for photographic content with no visible quality loss. For logos and icons with transparency or flat colours, keep PNG or convert to WebP.",
      },
      {
        q: "Is it better to convert PNG to JPG or PNG to WebP?",
        a: "For maximum compatibility (email, older software) choose JPG. For web delivery where you want the smallest possible file size, choose WebP- it will be 25–35 % smaller than the JPG at the same quality.",
      },
    ],
    related: ["png-to-webp", "jpg-to-webp", "webp-to-jpg"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
      { slug: "best-image-compression-tools-2026", title: "Best Image Compression Tools 2026" },
    ],
  },

  "gif-to-webp": {
    from: "GIF",
    to: "WebP",
    fromLabel: "GIF",
    toLabel: "WebP",
    toolPath: "/tools/webp",
    toolLabel: "Open WebP Converter",
    tagline: "Convert animated GIFs to WebP — up to 50% smaller files with same animation quality.",
    whyCopy:
      "GIF is the legacy animation format of the web, but it is severely limited: only 256 colours per frame, no alpha transparency blending, and bloated file sizes. Animated WebP supports 24-bit colour with full alpha, delivers files up to 50 % smaller than equivalent GIFs, and is supported by every major browser since 2020. Switching from GIF to WebP means faster page loads, smoother animations, and lower bandwidth costs.",
    qualityNote:
      "WebP supports animation. Most modern browsers display animated WebP natively. The output quality is equal to or better than the original GIF because WebP can use millions of colours instead of GIF's 256-colour palette.",
    technicalNote:
      "Each frame of the GIF is decoded in the browser, drawn onto a Canvas element, and re-encoded as a WebP frame using the browser's native encoding engine. For static GIFs, the process is a simple single-frame conversion. The entire pipeline runs client-side with no server upload.",
    formatTable: [
      {
        format: "GIF",
        fileSize: "Large",
        quality: "Low (256 colours max)",
        compatibility: "Universal",
        useCase: "Simple animations, memes, legacy web",
      },
      {
        format: "WebP",
        fileSize: "Small",
        quality: "High (24-bit + alpha, lossy or lossless)",
        compatibility: "All modern browsers",
        useCase: "Animated web content, stickers, performance",
      },
      {
        format: "MP4",
        fileSize: "Smallest",
        quality: "Excellent (video codec)",
        compatibility: "Universal",
        useCase: "Long animations, video content",
      },
      {
        format: "APNG",
        fileSize: "Large",
        quality: "High (lossless)",
        compatibility: "Most browsers",
        useCase: "Lossless animations with transparency",
      },
    ],
    faqs: [
      {
        q: "Does converting GIF to WebP preserve the animation?",
        a: "Yes. WebP supports animated frames just like GIF. All frames, timings, and loop settings are preserved during conversion. The result is a fully animated WebP file that plays in any modern browser.",
      },
      {
        q: "How much smaller is an animated WebP compared to a GIF?",
        a: "On average, animated WebP files are 40–50 % smaller than equivalent GIFs. The savings come from WebP's superior compression algorithm and its ability to use 24-bit colour instead of GIF's 256-colour palette, which eliminates dithering overhead.",
      },
      {
        q: "Can I use animated WebP on social media?",
        a: "Most social platforms now support WebP images, but animated WebP support varies. Twitter, Discord, and Telegram support animated WebP. Facebook and Instagram may convert it to video. For maximum compatibility on social, GIF is still the safest choice.",
      },
      {
        q: "Will my animated WebP work in email?",
        a: "Most email clients do not support animated WebP. For email, stick with GIF or use a static image with a link to the animated version. WebP animations are best suited for web pages and messaging apps.",
      },
    ],
    related: ["png-to-webp", "jpg-to-webp"],
    blogSlugs: [
      { slug: "complete-guide-webp-format", title: "The Complete Guide to the WebP Format" },
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  "webp-to-png": {
    from: "WebP",
    to: "PNG",
    fromLabel: "WebP",
    toLabel: "PNG",
    toolPath: "/tools/webp",
    toolLabel: "Open WebP Converter",
    tagline: "Convert WebP images to PNG for maximum compatibility — lossless, instant, free.",
    whyCopy:
      "WebP is great for web delivery, but PNG remains the universal choice when you need to edit images in Photoshop, Illustrator, or Figma, send assets to a print shop, or upload to platforms that do not yet accept WebP. Converting WebP to PNG gives you a lossless file that works everywhere — from design tools to legacy CMS platforms.",
    qualityNote:
      "PNG is lossless, so the output preserves every pixel from the decoded WebP image. If the original WebP was lossy, the PNG will faithfully reproduce that quality level without adding further degradation. File size will be larger than the WebP source.",
    technicalNote:
      "The WebP file is decoded natively by the browser, drawn onto a Canvas element, and exported as PNG via `canvas.toBlob('image/png')`. Since PNG is lossless, this process introduces zero additional quality loss. The entire conversion happens client-side.",
    formatTable: [
      {
        format: "WebP",
        fileSize: "Small",
        quality: "High (lossy or lossless)",
        compatibility: "Modern browsers",
        useCase: "Web delivery, performance optimization",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Editing, design, print, legacy apps",
      },
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, email, social media",
      },
      {
        format: "TIFF",
        fileSize: "Very Large",
        quality: "Lossless",
        compatibility: "Professional apps",
        useCase: "Print, archival, scanning",
      },
    ],
    faqs: [
      {
        q: "Does converting WebP to PNG lose quality?",
        a: "No. PNG is a lossless format, so no additional quality is lost during conversion. The output faithfully represents every pixel from the decoded WebP image. If the source WebP was lossy, that quality level is preserved as-is.",
      },
      {
        q: "Why is the PNG file so much larger than the WebP?",
        a: "PNG uses lossless compression, which preserves every pixel but results in larger files. WebP uses more advanced compression algorithms. A 200 KB WebP can easily become 1–3 MB as PNG — this is expected and normal.",
      },
      {
        q: "When should I convert WebP to PNG instead of JPG?",
        a: "Choose PNG when you need transparency support, plan to edit the image further in design tools, or need a lossless master copy. Choose JPG when you just need a smaller, universally compatible photo file.",
      },
      {
        q: "Can I batch convert WebP to PNG?",
        a: "Yes. SammaPix supports batch conversion — drop up to 20 WebP files at once on the free plan (500 on Pro) and download all PNG results as a ZIP archive.",
      },
    ],
    related: ["webp-to-jpg", "png-to-webp"],
    blogSlugs: [
      { slug: "complete-guide-webp-format", title: "The Complete Guide to the WebP Format" },
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  "avif-to-jpg": {
    from: "AVIF",
    to: "JPG",
    fromLabel: "AVIF",
    toLabel: "JPG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Compressor",
    tagline: "Convert AVIF images to widely-compatible JPG format — instant, browser-based, free.",
    whyCopy:
      "AVIF is the newest image format on the web, offering exceptional compression. However, many desktop applications, email clients, and older browsers still cannot open AVIF files. Photoshop only added AVIF support in version 24.7, and most print workflows do not recognise it at all. Converting AVIF to JPG gives you a file that works literally everywhere — from Windows Paint to professional print RIPs.",
    qualityNote:
      "Converting AVIF to JPG is a lossy-to-lossy conversion. At quality 85–90, the output JPG is visually indistinguishable from the source AVIF. The file size will be larger because JPG's compression is less efficient than AVIF's AV1-based codec.",
    technicalNote:
      "The AVIF file is decoded by the browser's native image decoder (supported in Chrome 85+, Firefox 93+, Safari 16.1+), drawn onto a Canvas element, and exported as JPEG via `canvas.toBlob('image/jpeg', quality)`. No server-side processing is required.",
    formatTable: [
      {
        format: "AVIF",
        fileSize: "Smallest",
        quality: "Excellent (AV1 codec)",
        compatibility: "Modern browsers only",
        useCase: "Next-gen web images, cutting-edge sites",
      },
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, email, print, social media",
      },
      {
        format: "WebP",
        fileSize: "Small",
        quality: "High (lossy or lossless)",
        compatibility: "Modern browsers",
        useCase: "Web performance, Core Web Vitals",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Graphics, editing, lossless archival",
      },
    ],
    faqs: [
      {
        q: "Why can't I open AVIF files on my computer?",
        a: "AVIF is relatively new (standardised in 2019) and many applications have not yet added support. Windows 10/11 requires the AV1 Video Extension from the Microsoft Store. macOS added support in Ventura. Converting to JPG is the quickest way to make the file universally accessible.",
      },
      {
        q: "Does converting AVIF to JPG lose quality?",
        a: "Both AVIF and JPG are lossy formats, so re-encoding introduces a small quality loss. At quality 85–90 the difference is invisible in photographs. For critical work, increase quality to 95.",
      },
      {
        q: "Is AVIF better than JPG for websites?",
        a: "Yes — AVIF files are typically 50 % smaller than equivalent JPGs at the same visual quality. However, if you need to share images outside the browser (email, documents, legacy software), JPG is the safer choice due to its universal support.",
      },
      {
        q: "Can I convert AVIF to JPG in bulk?",
        a: "Yes. SammaPix processes all files in your browser in parallel. Drop up to 20 AVIF files at once on the free plan (500 on Pro) and download all JPG results as a ZIP.",
      },
    ],
    related: ["heic-to-jpg", "webp-to-jpg"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
      { slug: "best-image-compression-tools-2026", title: "Best Image Compression Tools 2026" },
    ],
  },

  "tiff-to-jpg": {
    from: "TIFF",
    to: "JPG",
    fromLabel: "TIFF",
    toLabel: "JPG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Compressor",
    tagline: "Convert large TIFF files to compact JPG — perfect for sharing scanned documents and photos.",
    whyCopy:
      "TIFF is the gold standard for scanning, professional photography, and print production — but TIFF files are enormous (often 20–100 MB per image) and most web platforms, email clients, and social media sites reject them. Converting TIFF to JPG shrinks file size by 90 %+ while preserving excellent visual quality, making it easy to share scanned documents, archive photos, or upload to any platform.",
    qualityNote:
      "TIFF is lossless while JPG is lossy, so there is a theoretical quality reduction. In practice, at quality 85–90, the output JPG is visually indistinguishable from the TIFF original for photographs and scanned documents. For images with text or sharp edges, consider quality 92–95.",
    technicalNote:
      "The TIFF file is decoded by the browser's native image decoder, rendered onto a Canvas element with a white background fill, and exported as JPEG via `canvas.toBlob('image/jpeg', quality)`. Multi-page TIFFs are converted frame-by-frame. No upload to any server is required.",
    formatTable: [
      {
        format: "TIFF",
        fileSize: "Very Large (20–100 MB)",
        quality: "Lossless",
        compatibility: "Professional apps only",
        useCase: "Scanning, print production, archival",
      },
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Web, email, social media, sharing",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Editing, screenshots, graphics",
      },
      {
        format: "PDF",
        fileSize: "Medium",
        quality: "Variable",
        compatibility: "Universal",
        useCase: "Documents, multi-page scans",
      },
    ],
    faqs: [
      {
        q: "How much smaller is a JPG compared to a TIFF?",
        a: "A typical 30 MB TIFF scan converts to a 1–3 MB JPG at quality 85 — a reduction of over 90 %. The exact ratio depends on image content, but photographs and scanned documents compress extremely well to JPG.",
      },
      {
        q: "Does converting TIFF to JPG lose quality?",
        a: "Yes, because JPG is lossy. However, at quality 85–90 the visual difference is invisible for photographs and scanned documents. For archival purposes, keep your original TIFF and use the JPG for sharing and web use.",
      },
      {
        q: "Can I convert multi-page TIFF files?",
        a: "SammaPix converts each page of a multi-page TIFF into a separate JPG file. You can then download all pages individually or as a ZIP archive.",
      },
      {
        q: "Why do scanners save as TIFF instead of JPG?",
        a: "Scanners default to TIFF because it is lossless — no quality is lost during the scan. This is important for archival and OCR. Once you have the lossless master, you can convert to JPG for everyday sharing and web use.",
      },
    ],
    related: ["heic-to-jpg", "png-to-jpg"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
      { slug: "best-image-compression-tools-2026", title: "Best Image Compression Tools 2026" },
    ],
  },

  "svg-to-png": {
    from: "SVG",
    to: "PNG",
    fromLabel: "SVG",
    toLabel: "PNG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Compressor",
    tagline: "Rasterize SVG vector graphics to PNG — choose your resolution, free and instant.",
    whyCopy:
      "SVG is perfect for scalable graphics on the web, but many platforms do not accept it. Email clients (Gmail, Outlook) strip SVG attachments for security reasons. Social media sites (Facebook, Instagram, LinkedIn) require raster images for uploads. Design handoff tools may need PNG previews. Converting SVG to PNG gives you a universally accepted raster image at the resolution you choose.",
    qualityNote:
      "SVG to PNG is a rasterization process, not a lossy compression. The output PNG captures every detail of the SVG at the chosen resolution. Since PNG is lossless, there are no compression artefacts. The quality depends entirely on the resolution you select — higher resolution means more detail.",
    technicalNote:
      "The SVG is loaded into the browser, rendered at the specified resolution onto a Canvas element (or via the native SVG renderer), and exported as PNG using `canvas.toBlob('image/png')`. All rendering uses the browser's built-in SVG engine, ensuring accurate font and path rendering. No server upload required.",
    formatTable: [
      {
        format: "SVG",
        fileSize: "Tiny (vector, resolution-independent)",
        quality: "Perfect at any scale",
        compatibility: "Browsers only (blocked in email)",
        useCase: "Logos, icons, illustrations, web graphics",
      },
      {
        format: "PNG",
        fileSize: "Medium–Large (depends on resolution)",
        quality: "Lossless (fixed resolution)",
        compatibility: "Universal",
        useCase: "Social media, email, design previews, print",
      },
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, web images",
      },
      {
        format: "WebP",
        fileSize: "Small",
        quality: "High (lossy or lossless)",
        compatibility: "Modern browsers",
        useCase: "Web performance",
      },
    ],
    faqs: [
      {
        q: "What resolution should I use when converting SVG to PNG?",
        a: "For social media, 1080px or 1200px wide is ideal. For email headers, 600px works well. For print, use at least 300 DPI at the target size (e.g., 3000px for a 10-inch print). SammaPix lets you specify the exact output dimensions.",
      },
      {
        q: "Does converting SVG to PNG lose quality?",
        a: "No — as long as you choose a sufficient resolution. SVG is vector (infinitely scalable), while PNG is raster (fixed pixels). The PNG will look perfect at the resolution you choose, but it cannot be scaled up further without becoming blurry.",
      },
      {
        q: "Why do email clients block SVG?",
        a: "SVG files can contain embedded JavaScript, which poses a security risk. Email clients like Gmail and Outlook strip SVG attachments and inline SVGs to prevent potential XSS attacks. Converting to PNG solves this problem.",
      },
      {
        q: "Can I convert SVG with custom fonts to PNG?",
        a: "Yes, if the fonts are embedded in the SVG or available in the browser. If the SVG references external fonts that are not loaded, the browser will substitute a default font. For best results, use SVGs with embedded or web-safe fonts.",
      },
    ],
    related: ["png-to-webp", "png-to-jpg"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  "bmp-to-jpg": {
    from: "BMP",
    to: "JPG",
    fromLabel: "BMP",
    toLabel: "JPG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Compressor",
    tagline: "Convert uncompressed BMP files to optimized JPG — reduce file size by 90%+.",
    whyCopy:
      "BMP (Bitmap) is one of the oldest image formats — it stores pixel data with zero compression, resulting in massive file sizes. A single 12-megapixel photo as BMP is over 36 MB. BMP has no place on the modern web or in email. Converting BMP to JPG reduces file size by 90–95 % while maintaining excellent visual quality, making your images practical to share, upload, and store.",
    qualityNote:
      "BMP is uncompressed and JPG is lossy, but at quality 85–90 the visual difference is invisible for photographs. Since BMP stores raw pixel data, the conversion to JPG at high quality produces an excellent result with no visible artefacts. The file size reduction is dramatic.",
    technicalNote:
      "The BMP file is decoded natively by the browser (all browsers support BMP), drawn onto a Canvas element, and exported as JPEG via `canvas.toBlob('image/jpeg', quality)`. Since BMP is uncompressed, the input quality is perfect — making this an ideal conversion with no generation loss from a previous compression step.",
    formatTable: [
      {
        format: "BMP",
        fileSize: "Enormous (uncompressed)",
        quality: "Perfect (no compression)",
        compatibility: "Universal (legacy)",
        useCase: "Legacy Windows apps, raw pixel data",
      },
      {
        format: "JPG",
        fileSize: "Small–Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, web, email, social media",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Graphics, screenshots, editing",
      },
      {
        format: "WebP",
        fileSize: "Smallest",
        quality: "High (lossy or lossless)",
        compatibility: "Modern browsers",
        useCase: "Web performance",
      },
    ],
    faqs: [
      {
        q: "Why are BMP files so large?",
        a: "BMP stores every pixel's colour data without any compression. A 4000x3000 image at 24-bit colour requires 36 MB of raw data. Modern formats like JPG and WebP use compression algorithms that reduce this by 90 % or more with minimal visual quality loss.",
      },
      {
        q: "Does converting BMP to JPG lose quality?",
        a: "Technically yes, because JPG is lossy. However, since BMP is uncompressed, the source quality is perfect — meaning the first JPG compression at quality 85–90 produces an excellent result with no visible artefacts in photographs.",
      },
      {
        q: "Is BMP still used anywhere?",
        a: "BMP is still used in some legacy Windows applications, embedded systems, and industrial imaging equipment. For everyday use (web, email, social media), BMP has been completely replaced by JPG, PNG, and WebP.",
      },
      {
        q: "Should I convert BMP to JPG or PNG?",
        a: "For photographs, choose JPG — it produces much smaller files. For images with text, sharp edges, or transparency needs, choose PNG. For web delivery, WebP is the best option for both types.",
      },
    ],
    related: ["tiff-to-jpg", "png-to-jpg"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
      { slug: "best-image-compression-tools-2026", title: "Best Image Compression Tools 2026" },
    ],
  },
};

// ---------------------------------------------------------------------------
// generateStaticParams
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return Object.keys(CONVERSIONS).map((pair) => ({ pair }));
}

// ---------------------------------------------------------------------------
// generateMetadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const data = CONVERSIONS[pair];
  if (!data) return {};

  const title = `Convert ${data.fromLabel} to ${data.toLabel} Free Online - No Upload | ${APP_NAME}`;
  const description = `${data.tagline} ${data.whyCopy.slice(0, 120)}...`;
  const keywords = [
    `${data.from.toLowerCase()} to ${data.to.toLowerCase()}`,
    `convert ${data.from.toLowerCase()} to ${data.to.toLowerCase()}`,
    `${data.from.toLowerCase()} to ${data.to.toLowerCase()} converter`,
    `${data.from.toLowerCase()} to ${data.to.toLowerCase()} free`,
    `${data.from.toLowerCase()} to ${data.to.toLowerCase()} online`,
    `convert ${data.from.toLowerCase()} to ${data.to.toLowerCase()} free`,
    `convert ${data.from.toLowerCase()} to ${data.to.toLowerCase()} without losing quality`,
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${APP_URL}/convert/${pair}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${APP_URL}/convert/${pair}`,
      siteName: APP_NAME,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `Convert ${data.fromLabel} to ${data.toLabel}- ${APP_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD helpers
// ---------------------------------------------------------------------------

function buildJsonLd(pair: string, data: ConversionData) {
  const url = `${APP_URL}/convert/${pair}`;
  const title = `Convert ${data.fromLabel} to ${data.toLabel} Free Online - No Upload | ${APP_NAME}`;

  const softwareApp = {
    "@type": "SoftwareApplication",
    name: `${APP_NAME} ${data.fromLabel} to ${data.toLabel} Converter`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: data.tagline,
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: APP_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Convert",
        item: `${APP_URL}/convert`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [softwareApp, faqPage, breadcrumb],
  });
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ConvertPairPage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const data = CONVERSIONS[pair];

  if (!data) notFound();

  const jsonLd = buildJsonLd(pair, data);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-10">
          <Link href="/" className="hover:text-[#525252] transition-colors">
            {APP_NAME}
          </Link>
          <span>/</span>
          <Link href="/convert" className="hover:text-[#525252] transition-colors">
            Convert
          </Link>
          <span>/</span>
          <span className="text-[#525252]">
            {data.fromLabel} to {data.toLabel}
          </span>
        </nav>

        {/* H1 */}
        <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3 leading-snug">
          Convert {data.fromLabel} to {data.toLabel} Free Online - No Upload
        </h1>
        <p className="text-sm text-[#737373] leading-relaxed mb-8">
          {data.tagline}
        </p>

        {/* Primary CTA */}
        <Link
          href={data.toolPath}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors mb-14"
        >
          {data.toolLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>

        {/* Why convert section */}
        <section aria-labelledby="why-heading">
          <h2
            id="why-heading"
            className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
          >
            Why convert {data.fromLabel} to {data.toLabel}?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            {data.whyCopy}
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            {data.qualityNote}
          </p>
        </section>

        {/* Comparison table */}
        <section aria-labelledby="formats-heading">
          <h2
            id="formats-heading"
            className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
          >
            Format comparison
          </h2>
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-x-auto mb-4">
            <table className="w-full text-xs text-left min-w-[560px]">
              <thead>
                <tr className="bg-[#FAFAFA] dark:bg-[#1F1F1F] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <th className="px-4 py-3 font-medium text-[#525252] dark:text-[#A3A3A3]">Format</th>
                  <th className="px-4 py-3 font-medium text-[#525252] dark:text-[#A3A3A3]">File Size</th>
                  <th className="px-4 py-3 font-medium text-[#525252] dark:text-[#A3A3A3]">Quality</th>
                  <th className="px-4 py-3 font-medium text-[#525252] dark:text-[#A3A3A3]">Compatibility</th>
                  <th className="px-4 py-3 font-medium text-[#525252] dark:text-[#A3A3A3]">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {data.formatTable.map((row, i) => (
                  <tr
                    key={row.format}
                    className={
                      i % 2 === 0
                        ? "bg-white dark:bg-[#191919]"
                        : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                    }
                  >
                    <td className="px-4 py-3 font-medium text-[#171717] dark:text-[#E5E5E5] whitespace-nowrap">
                      {row.format}
                    </td>
                    <td className="px-4 py-3 text-[#737373]">{row.fileSize}</td>
                    <td className="px-4 py-3 text-[#737373]">{row.quality}</td>
                    <td className="px-4 py-3 text-[#737373]">{row.compatibility}</td>
                    <td className="px-4 py-3 text-[#737373]">{row.useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to convert- 3-step guide */}
        <section aria-labelledby="howto-heading">
          <h2
            id="howto-heading"
            className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
          >
            How to convert {data.fromLabel} to {data.toLabel}
          </h2>
          <ol className="space-y-4 mb-6">
            {[
              {
                step: "1",
                title: `Open the ${data.fromLabel} to ${data.toLabel} converter`,
                body: `Click the button above or go directly to ${data.toolPath.replace("/tools/", "/tools/")}. No signup required- the tool is free and works instantly in your browser.`,
              },
              {
                step: "2",
                title: "Drop your files",
                body: `Drag and drop your ${data.fromLabel} files onto the upload area, or click to browse. You can convert up to 20 files at once on the free plan (500 on Pro).`,
              },
              {
                step: "3",
                title: `Download your ${data.toLabel} files`,
                body: `Click Download on each file or use Download All as ZIP to save everything at once. All processing happens in your browser- nothing is uploaded to a server.`,
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5F5F5] dark:bg-[#262626] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#737373] leading-relaxed">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link
            href={data.toolPath}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors"
          >
            {data.toolLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </section>

        {/* Why SammaPix */}
        <section aria-labelledby="why-sammapix-heading">
          <h2
            id="why-sammapix-heading"
            className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
          >
            Why SammaPix?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: Shield,
                title: "Complete privacy",
                body: "Your files never leave your device. All conversion happens inside your browser using the Canvas API and WebAssembly.",
              },
              {
                icon: Zap,
                title: "Instant results",
                body: "No upload, no queue, no waiting for a server. Conversion starts the moment you drop your files.",
              },
              {
                icon: Layers,
                title: "True batch processing",
                body: "Convert up to 20 files at once on free (500 on Pro) and download them all as a ZIP. No signup required.",
              },
              {
                icon: CheckCircle2,
                title: "Always free",
                body: "Core conversion tools are free forever. No watermarks, no file size caps on common formats, no account required.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#191919]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-[#525252] dark:text-[#A3A3A3]" strokeWidth={1.5} />
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">{title}</p>
                </div>
                <p className="text-xs text-[#737373] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
          >
            Frequently asked questions
          </h2>
          <div className="space-y-0 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A] overflow-hidden">
            {data.faqs.map((faq) => (
              <div key={faq.q} className="px-5 py-4 bg-white dark:bg-[#191919]">
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {faq.q}
                </p>
                <p className="text-sm text-[#737373] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related blog articles */}
        {data.blogSlugs.length > 0 && (
          <section aria-labelledby="blog-heading">
            <h2
              id="blog-heading"
              className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
            >
              Related articles
            </h2>
            <ul className="space-y-2">
              {data.blogSlugs.map(({ slug, title }) => (
                <li key={slug}>
                  <Link
                    href={`/blog/${slug}`}
                    className="text-sm text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] underline underline-offset-2 transition-colors"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sitemap internal links for SEO */}
        <section aria-labelledby="tools-heading" className="mt-10">
          <h2 id="tools-heading" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            More conversion tools
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/convert" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              All conversions
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress images
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/webp" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Convert to WebP
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </section>

        {/* Related conversions */}
        <section aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
          >
            Other conversions
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.related.map((relatedPair) => {
              const rel = CONVERSIONS[relatedPair];
              if (!rel) return null;
              return (
                <Link
                  key={relatedPair}
                  href={`/convert/${relatedPair}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F5F5] dark:bg-[#262626] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-xs font-medium text-[#525252] dark:text-[#A3A3A3] hover:bg-[#EBEBEB] dark:hover:bg-[#2F2F2F] transition-colors"
                >
                  {rel.fromLabel} to {rel.toLabel}
                  <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-14 pt-8 border-t border-[#E5E5E5] dark:border-[#2A2A2A] text-center">
          <p className="text-sm text-[#737373] mb-4">
            Ready to convert? It takes less than 10 seconds.
          </p>
          <Link
            href={data.toolPath}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors"
          >
            {data.toolLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

      </div>
    </>
  );
}
