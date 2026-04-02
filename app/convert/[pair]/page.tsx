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

  "jpg-to-png": {
    from: "JPG",
    to: "PNG",
    fromLabel: "JPG",
    toLabel: "PNG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Converter",
    tagline: "Convert JPG photos to lossless PNG- free, browser-based, no upload required.",
    whyCopy:
      "JPG is perfect for photographs but its lossy compression introduces artefacts around text, sharp edges, and flat-colour areas. Converting JPG to PNG gives you a lossless file that preserves the current quality without further degradation- ideal for screenshots with text, design assets, logos extracted from photos, or any image you plan to edit further in Photoshop or Figma.",
    qualityNote:
      "The output PNG will be a lossless copy of the decoded JPG pixels. Since the JPG was already lossy, you cannot recover lost detail, but converting to PNG ensures no further quality loss occurs during subsequent edits or saves. File size will increase significantly because PNG uses lossless compression.",
    technicalNote:
      "The JPG is decoded by the browser's native image decoder, drawn onto a Canvas element, and exported as PNG via `canvas.toBlob('image/png')`. PNG is lossless, so this process introduces zero additional quality loss. The entire conversion runs client-side in your browser.",
    formatTable: [
      {
        format: "JPG",
        fileSize: "Small-Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, web, email, social media",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Design assets, screenshots, editing source",
      },
      {
        format: "WebP",
        fileSize: "Smallest",
        quality: "High (lossy or lossless)",
        compatibility: "Modern browsers",
        useCase: "Web performance",
      },
      {
        format: "TIFF",
        fileSize: "Very Large",
        quality: "Lossless",
        compatibility: "Professional apps",
        useCase: "Print, archival",
      },
    ],
    faqs: [
      {
        q: "Does converting JPG to PNG improve image quality?",
        a: "No. JPG is lossy- once pixels are discarded during JPG compression, they cannot be recovered. Converting to PNG preserves the current quality and prevents further degradation, but it does not restore lost detail.",
      },
      {
        q: "Why is the PNG file so much larger than the JPG?",
        a: "JPG uses lossy compression that discards data to shrink files. PNG uses lossless compression that keeps every pixel. A 500 KB JPG can become 2-5 MB as PNG. This is the cost of zero quality loss.",
      },
      {
        q: "When should I convert JPG to PNG?",
        a: "Convert to PNG when you need to edit the image in design tools without further quality loss, when you need transparency (add it in your editor after conversion), or when your platform requires PNG format specifically.",
      },
      {
        q: "Can I add transparency after converting JPG to PNG?",
        a: "The converted PNG will have a solid white background (JPG does not support transparency). You can then open the PNG in Photoshop, Figma, or any editor and remove the background to add transparency.",
      },
    ],
    related: ["png-to-jpg", "jpg-to-webp", "png-to-webp"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  "png-to-ico": {
    from: "PNG",
    to: "ICO",
    fromLabel: "PNG",
    toLabel: "ICO",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Converter",
    tagline: "Convert PNG images to ICO favicon format- perfect for websites, free and instant.",
    whyCopy:
      "Every website needs a favicon, and the ICO format remains the most universally supported favicon format across all browsers, including older versions of Internet Explorer. While modern browsers accept PNG favicons, ICO files can contain multiple resolutions (16x16, 32x32, 48x48) in a single file, ensuring your icon looks crisp everywhere- from browser tabs to bookmark bars to desktop shortcuts.",
    qualityNote:
      "ICO files store pixel data at multiple resolutions. The conversion from PNG is lossless at each resolution- SammaPix generates crisp, perfectly scaled icons from your source PNG. For best results, start with a square PNG of at least 256x256 pixels.",
    technicalNote:
      "The PNG is loaded in the browser, resized to standard favicon dimensions (16x16, 32x32, 48x48) using high-quality bicubic interpolation on a Canvas element, and then encoded into the ICO container format. The entire process happens client-side with no server upload.",
    formatTable: [
      {
        format: "PNG",
        fileSize: "Medium",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Modern favicons, web graphics, design assets",
      },
      {
        format: "ICO",
        fileSize: "Small (multi-resolution)",
        quality: "Lossless per resolution",
        compatibility: "Universal (all browsers)",
        useCase: "Website favicons, Windows desktop icons",
      },
      {
        format: "SVG",
        fileSize: "Tiny (vector)",
        quality: "Perfect at any scale",
        compatibility: "Modern browsers only",
        useCase: "Scalable favicons (latest browsers)",
      },
      {
        format: "WEBP",
        fileSize: "Small",
        quality: "High",
        compatibility: "Modern browsers",
        useCase: "Next-gen web images",
      },
    ],
    faqs: [
      {
        q: "What size should my PNG be for a good favicon?",
        a: "Start with a square PNG of at least 256x256 pixels. SammaPix will automatically generate the standard favicon sizes (16x16, 32x32, 48x48) from your source image. The higher the source resolution, the better the downscaled icons will look.",
      },
      {
        q: "Do I still need ICO favicons in 2026?",
        a: "For maximum compatibility, yes. While modern browsers support PNG and even SVG favicons, ICO remains the only format guaranteed to work in all browsers, including legacy ones. Many SEO and testing tools also check specifically for favicon.ico.",
      },
      {
        q: "Can an ICO file contain multiple sizes?",
        a: "Yes- that is the main advantage of ICO over PNG for favicons. A single ICO file can contain 16x16 (browser tab), 32x32 (bookmark bar), and 48x48 (Windows taskbar) versions, and the browser picks the right size automatically.",
      },
      {
        q: "How do I add the ICO favicon to my website?",
        a: "Place the favicon.ico file in your site's root directory. Most browsers will find it automatically. You can also add `<link rel=\"icon\" href=\"/favicon.ico\">` to your HTML head for explicit declaration.",
      },
    ],
    related: ["svg-to-png", "png-to-jpg", "png-to-webp"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  "webp-to-gif": {
    from: "WebP",
    to: "GIF",
    fromLabel: "WebP",
    toLabel: "GIF",
    toolPath: "/tools/webp",
    toolLabel: "Open WebP Converter",
    tagline: "Convert WebP images to GIF for maximum compatibility- free, instant, browser-based.",
    whyCopy:
      "WebP is great for the modern web, but GIF remains the universal format for animations shared on social media, messaging apps, and platforms that do not yet support animated WebP. If you need to share an animation on platforms like older email clients, forums, or Slack channels that do not render WebP, converting to GIF ensures your animation plays everywhere.",
    qualityNote:
      "GIF is limited to 256 colours per frame, so complex photographic content may show visible colour banding after conversion. For simple animations, icons, and graphics with limited colours, the quality difference is minimal. File size will typically increase because GIF compression is less efficient than WebP.",
    technicalNote:
      "The WebP image is decoded by the browser's native decoder, each frame is drawn onto a Canvas element and quantized to a 256-colour palette, then encoded into the GIF89a format. For static WebP images, a single-frame GIF is produced. The entire process runs client-side.",
    formatTable: [
      {
        format: "WebP",
        fileSize: "Small",
        quality: "High (24-bit colour, alpha)",
        compatibility: "Modern browsers",
        useCase: "Web delivery, animated web content",
      },
      {
        format: "GIF",
        fileSize: "Large",
        quality: "Low (256 colours max)",
        compatibility: "Universal",
        useCase: "Animations, memes, social media, messaging",
      },
      {
        format: "APNG",
        fileSize: "Medium-Large",
        quality: "High (lossless, full colour)",
        compatibility: "Most modern browsers",
        useCase: "High-quality animations with transparency",
      },
      {
        format: "MP4",
        fileSize: "Smallest",
        quality: "Excellent",
        compatibility: "Universal",
        useCase: "Long animations, video content",
      },
    ],
    faqs: [
      {
        q: "Will the animation be preserved when converting WebP to GIF?",
        a: "Yes, if the source is an animated WebP, all frames, timings, and loop settings are preserved in the output GIF. The animation plays identically, just in GIF format.",
      },
      {
        q: "Why does the GIF look worse than the WebP?",
        a: "GIF supports only 256 colours per frame, while WebP supports millions. This colour limitation causes visible banding in photographic or gradient-heavy content. For simple graphics and illustrations, the difference is usually minimal.",
      },
      {
        q: "Why is the GIF file larger than the original WebP?",
        a: "WebP uses far more efficient compression than GIF. A 500 KB animated WebP can easily become 1-2 MB as GIF. This is expected because GIF's LZW compression is much less advanced than WebP's VP8 codec.",
      },
      {
        q: "When should I keep WebP instead of converting to GIF?",
        a: "Keep WebP whenever your target platform supports it- the quality is better and the file is smaller. Convert to GIF only when you need universal compatibility, such as sharing on platforms that cannot display WebP.",
      },
    ],
    related: ["gif-to-webp", "webp-to-jpg", "webp-to-png"],
    blogSlugs: [
      { slug: "complete-guide-webp-format", title: "The Complete Guide to the WebP Format" },
    ],
  },

  "raw-to-jpg": {
    from: "RAW",
    to: "JPG",
    fromLabel: "RAW",
    toLabel: "JPG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Converter",
    tagline: "Convert RAW camera files (CR2, NEF, ARW) to JPG- free, browser-based, no upload.",
    whyCopy:
      "RAW files from cameras like Canon (CR2), Nikon (NEF), and Sony (ARW) contain unprocessed sensor data with maximum dynamic range and colour depth. However, RAW files are huge (20-60 MB each), cannot be viewed in most apps, and cannot be shared on social media or email. Converting RAW to JPG makes your photos instantly shareable at a fraction of the file size while preserving excellent visual quality.",
    qualityNote:
      "RAW files contain 12-14 bit colour depth and wide dynamic range that cannot be fully represented in 8-bit JPG. The conversion applies automatic exposure, white balance, and tone curve adjustments to produce a well-balanced JPG. At quality 90-95, the output looks excellent for viewing and sharing purposes.",
    technicalNote:
      "RAW files (CR2, NEF, ARW, DNG, ORF, RW2) are decoded in-browser using a WebAssembly-based RAW decoder. The decoded pixel data is processed with automatic white balance and tone mapping, drawn onto a Canvas element, and exported as JPEG. Your camera files never leave your device.",
    formatTable: [
      {
        format: "RAW (CR2/NEF/ARW)",
        fileSize: "Very Large (20-60 MB)",
        quality: "Maximum (unprocessed sensor data)",
        compatibility: "Camera software only",
        useCase: "Professional photography, post-processing",
      },
      {
        format: "JPG",
        fileSize: "Small-Medium",
        quality: "High (lossy, 8-bit)",
        compatibility: "Universal",
        useCase: "Sharing, web, email, social media, print",
      },
      {
        format: "TIFF",
        fileSize: "Very Large",
        quality: "Lossless (can be 16-bit)",
        compatibility: "Professional apps",
        useCase: "Professional editing, print production",
      },
      {
        format: "DNG",
        fileSize: "Large",
        quality: "Maximum (Adobe universal RAW)",
        compatibility: "Most RAW editors",
        useCase: "Archival, cross-software compatibility",
      },
    ],
    faqs: [
      {
        q: "Which RAW formats are supported?",
        a: "SammaPix supports the most common RAW formats: Canon CR2 and CR3, Nikon NEF, Sony ARW, Adobe DNG, Olympus ORF, Panasonic RW2, and Fujifilm RAF. Drop any of these files and they will be converted to JPG.",
      },
      {
        q: "Does converting RAW to JPG lose quality?",
        a: "RAW files contain far more data than JPG can represent (12-14 bit vs 8-bit, wider dynamic range). The conversion applies tone mapping to fit this data into JPG's range. At quality 90-95, the output looks excellent for all practical purposes, but professional photographers may prefer to develop RAW files in Lightroom for maximum control.",
      },
      {
        q: "Is it safe to delete my RAW files after converting to JPG?",
        a: "We recommend keeping your original RAW files as a master archive. RAW files contain all the sensor data, allowing you to re-develop the image with different settings (exposure, white balance, colour grading) at any time. JPGs are for sharing; RAWs are for archiving.",
      },
      {
        q: "Can I convert RAW files in bulk?",
        a: "Yes. Drop up to 20 RAW files at once on the free plan (500 on Pro) and SammaPix converts them all in parallel in your browser. Download all JPG results as a ZIP archive.",
      },
    ],
    related: ["heic-to-jpg", "tiff-to-jpg", "jpg-to-webp"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
      { slug: "best-image-compression-tools-2026", title: "Best Image Compression Tools 2026" },
    ],
  },

  "tiff-to-png": {
    from: "TIFF",
    to: "PNG",
    fromLabel: "TIFF",
    toLabel: "PNG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Converter",
    tagline: "Convert TIFF to PNG for lossless web-friendly images- free, browser-based, no upload.",
    whyCopy:
      "TIFF is the standard for professional scanning and print production, but TIFF files are enormous and most web platforms reject them. Converting TIFF to PNG gives you a lossless, web-compatible format that preserves every pixel from your original scan or photograph. PNG is supported everywhere- from browsers to design tools to social media- making it the ideal lossless alternative to TIFF for everyday use.",
    qualityNote:
      "Both TIFF and PNG are lossless formats, so the conversion preserves every pixel without any quality loss. The output PNG will be smaller than the TIFF because PNG uses more efficient lossless compression algorithms (Deflate vs LZW). File sizes are still larger than lossy formats like JPG.",
    technicalNote:
      "The TIFF file is decoded by the browser's image decoder, drawn onto a Canvas element, and exported as PNG via `canvas.toBlob('image/png')`. Since both formats are lossless, this is a perfect pixel-for-pixel conversion. The entire process runs client-side with no server upload.",
    formatTable: [
      {
        format: "TIFF",
        fileSize: "Very Large (20-100 MB)",
        quality: "Lossless",
        compatibility: "Professional apps only",
        useCase: "Scanning, print production, archival",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Web, design, editing, screenshots",
      },
      {
        format: "JPG",
        fileSize: "Small-Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, email, social media",
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
        q: "Does converting TIFF to PNG lose quality?",
        a: "No. Both TIFF and PNG are lossless formats. Every pixel from the original TIFF is preserved exactly in the output PNG. This is a perfect, zero-loss conversion.",
      },
      {
        q: "Why is the PNG smaller than the TIFF?",
        a: "PNG uses Deflate compression, which is generally more efficient than TIFF's LZW compression for photographic content. A 30 MB TIFF might become 15-20 MB as PNG. For even smaller files, consider converting to JPG or WebP (with some quality loss).",
      },
      {
        q: "When should I convert TIFF to PNG instead of JPG?",
        a: "Choose PNG when you need to preserve lossless quality- for example, scanned documents with text, medical images, or design assets you plan to edit further. Choose JPG when you need the smallest file size and slight quality loss is acceptable.",
      },
      {
        q: "Can I convert multi-page TIFF files to PNG?",
        a: "Yes. SammaPix converts each page of a multi-page TIFF into a separate PNG file. Download all pages individually or as a ZIP archive.",
      },
    ],
    related: ["tiff-to-jpg", "png-to-webp", "png-to-jpg"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  "bmp-to-png": {
    from: "BMP",
    to: "PNG",
    fromLabel: "BMP",
    toLabel: "PNG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Converter",
    tagline: "Convert BMP bitmaps to PNG- lossless, smaller, and universally compatible.",
    whyCopy:
      "BMP files store uncompressed pixel data, making them unnecessarily large for modern use. Converting BMP to PNG gives you a lossless file that is significantly smaller thanks to PNG's Deflate compression, while preserving every pixel and supporting transparency. PNG is the modern replacement for BMP in virtually every scenario- from web graphics to design assets to document embedding.",
    qualityNote:
      "Both BMP and PNG can store lossless pixel data, so the conversion is zero-loss. The output PNG is a perfect pixel-for-pixel copy of the BMP, but typically 50-80% smaller thanks to PNG's efficient compression. If the BMP contains 24-bit colour, the PNG will be identical in quality.",
    technicalNote:
      "The BMP file is decoded natively by the browser (all browsers support BMP), drawn onto a Canvas element, and exported as PNG via `canvas.toBlob('image/png')`. Since both formats are lossless, no quality is lost. The entire process runs client-side.",
    formatTable: [
      {
        format: "BMP",
        fileSize: "Enormous (uncompressed)",
        quality: "Perfect (no compression)",
        compatibility: "Universal (legacy)",
        useCase: "Legacy Windows apps, raw pixel data",
      },
      {
        format: "PNG",
        fileSize: "Medium-Large (lossless compression)",
        quality: "Perfect (lossless)",
        compatibility: "Universal",
        useCase: "Web, design, editing, screenshots, transparency",
      },
      {
        format: "JPG",
        fileSize: "Small-Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, email, social media",
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
        q: "Does converting BMP to PNG lose quality?",
        a: "No. Both BMP and PNG store lossless pixel data. The conversion is a perfect, zero-loss copy. The PNG will look identical to the BMP at every zoom level.",
      },
      {
        q: "How much smaller is PNG compared to BMP?",
        a: "PNG is typically 50-80% smaller than the equivalent BMP, depending on image content. A 36 MB BMP photograph might become 8-15 MB as PNG. Images with large flat-colour areas compress even better.",
      },
      {
        q: "Should I convert BMP to PNG or JPG?",
        a: "Choose PNG if you need lossless quality, transparency support, or plan to edit the image further. Choose JPG if you want the smallest possible file size and can accept slight quality loss (best for photographs).",
      },
      {
        q: "Why do some old programs still use BMP?",
        a: "BMP is one of the oldest image formats (introduced with Windows 1.0 in 1985) and some legacy applications, embedded systems, and industrial equipment still produce BMP output. Converting to PNG modernises these files for everyday use.",
      },
    ],
    related: ["bmp-to-jpg", "png-to-webp", "png-to-jpg"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  "gif-to-jpg": {
    from: "GIF",
    to: "JPG",
    fromLabel: "GIF",
    toLabel: "JPG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Converter",
    tagline: "Convert GIF images to JPG for smaller files and universal compatibility- free and instant.",
    whyCopy:
      "Static GIF files are often used for simple graphics, but they are limited to 256 colours and use inefficient compression. Converting static GIFs to JPG typically results in smaller files with much better colour reproduction. This is especially useful for GIF screenshots, memes with photographic backgrounds, or any non-animated GIF where the 256-colour palette creates visible banding.",
    qualityNote:
      "JPG supports millions of colours vs GIF's 256, so photographic GIFs actually look better as JPG. For animated GIFs, only the first frame is captured since JPG does not support animation. At quality 85, the output is excellent for all practical purposes.",
    technicalNote:
      "The GIF is decoded by the browser's native decoder (first frame for animated GIFs), drawn onto a Canvas element with a white background fill to handle any transparency, and exported as JPEG via `canvas.toBlob('image/jpeg', quality)`. No server upload required.",
    formatTable: [
      {
        format: "GIF",
        fileSize: "Variable",
        quality: "Low (256 colours max)",
        compatibility: "Universal",
        useCase: "Simple animations, legacy graphics",
      },
      {
        format: "JPG",
        fileSize: "Small-Medium",
        quality: "High (millions of colours, lossy)",
        compatibility: "Universal",
        useCase: "Photos, web images, email, social media",
      },
      {
        format: "PNG",
        fileSize: "Medium-Large",
        quality: "Lossless (millions of colours)",
        compatibility: "Universal",
        useCase: "Graphics with transparency, editing",
      },
      {
        format: "WebP",
        fileSize: "Smallest",
        quality: "High (lossy or lossless, animated)",
        compatibility: "Modern browsers",
        useCase: "Web performance, animated content",
      },
    ],
    faqs: [
      {
        q: "What happens to GIF animation when converting to JPG?",
        a: "JPG does not support animation. SammaPix captures the first frame of an animated GIF and converts it to a static JPG image. If you need to preserve animation, convert to WebP instead.",
      },
      {
        q: "Does converting GIF to JPG improve quality?",
        a: "For photographic content, yes- JPG supports millions of colours while GIF is limited to 256. This means smoother gradients, more accurate skin tones, and no colour banding. For simple line art or text, GIF may actually look sharper.",
      },
      {
        q: "What happens to GIF transparency when converting to JPG?",
        a: "JPG does not support transparency. Transparent areas in the GIF are filled with white in the output JPG. If you need to preserve transparency, convert to PNG or WebP instead.",
      },
      {
        q: "Is GIF to JPG useful for memes and social media?",
        a: "Yes- many meme images are saved as static GIFs with poor colour quality. Converting to JPG typically reduces file size while dramatically improving colour reproduction, making the image look better on social media.",
      },
    ],
    related: ["gif-to-webp", "jpg-to-webp", "png-to-jpg"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  "avif-to-png": {
    from: "AVIF",
    to: "PNG",
    fromLabel: "AVIF",
    toLabel: "PNG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Converter",
    tagline: "Convert AVIF images to lossless PNG- full compatibility, free, no upload.",
    whyCopy:
      "AVIF offers cutting-edge compression but many desktop applications, design tools, and older browsers cannot open AVIF files. Converting AVIF to PNG gives you a lossless, universally-compatible file that works in every image editor, design tool, and operating system. This is the right choice when you need to edit AVIF images in software that does not yet support the format.",
    qualityNote:
      "PNG is lossless, so the output preserves every pixel from the decoded AVIF image without adding further compression artefacts. If the source AVIF was lossy, the PNG faithfully captures that quality level. File size will be significantly larger because PNG uses lossless compression while AVIF uses highly efficient lossy encoding.",
    technicalNote:
      "The AVIF file is decoded by the browser's native image decoder (supported in Chrome 85+, Firefox 93+, Safari 16.1+), drawn onto a Canvas element, and exported as PNG via `canvas.toBlob('image/png')`. Since PNG is lossless, zero additional quality loss occurs. The entire process runs client-side.",
    formatTable: [
      {
        format: "AVIF",
        fileSize: "Smallest (AV1 codec)",
        quality: "Excellent",
        compatibility: "Modern browsers only",
        useCase: "Next-gen web images",
      },
      {
        format: "PNG",
        fileSize: "Large",
        quality: "Lossless",
        compatibility: "Universal",
        useCase: "Editing, design, print, screenshots",
      },
      {
        format: "JPG",
        fileSize: "Small-Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Photos, email, social media",
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
        q: "Does converting AVIF to PNG lose quality?",
        a: "No additional quality is lost. PNG is lossless, so it preserves every pixel from the decoded AVIF image. If the source AVIF was lossy, that quality level is faithfully maintained in the PNG output.",
      },
      {
        q: "Why is the PNG file so much larger than the AVIF?",
        a: "AVIF uses the highly efficient AV1 codec that delivers exceptional compression. PNG uses lossless compression that preserves every pixel but produces much larger files. A 100 KB AVIF can easily become 1-3 MB as PNG.",
      },
      {
        q: "When should I convert AVIF to PNG instead of JPG?",
        a: "Choose PNG when you need lossless quality for editing, need transparency support, or are working with design assets. Choose JPG when you want a smaller file for sharing and can accept slight quality loss from re-encoding.",
      },
      {
        q: "Can I open AVIF in Photoshop?",
        a: "Photoshop CC 2023 (version 24.7) and later support AVIF natively. For older versions, converting to PNG with SammaPix is the fastest way to get your AVIF images into Photoshop.",
      },
    ],
    related: ["avif-to-jpg", "png-to-webp", "webp-to-png"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
      { slug: "best-image-compression-tools-2026", title: "Best Image Compression Tools 2026" },
    ],
  },

  "heic-to-webp": {
    from: "HEIC",
    to: "WebP",
    fromLabel: "HEIC",
    toLabel: "WebP",
    toolPath: "/tools/heic",
    toolLabel: "Open HEIC Converter",
    tagline: "Convert iPhone HEIC photos to WebP- maximum compression with excellent quality, free.",
    whyCopy:
      "HEIC is Apple's efficient photo format, but it is not supported outside the Apple ecosystem. WebP is the ideal web format, offering even better compression than HEIC with universal browser support. Converting HEIC directly to WebP gives you the smallest possible file for web delivery- perfect for uploading photos to your website, blog, or e-commerce store with optimal Core Web Vitals scores.",
    qualityNote:
      "Both HEIC and WebP are modern high-efficiency formats. At quality 80, WebP produces files roughly the same size as HEIC with indistinguishable visual quality. The output is ideal for web use- dramatically smaller than JPG while looking identical.",
    technicalNote:
      "The HEIC file is decoded in-browser via a WebAssembly-based HEIC decoder (libheif), the raw pixel data is drawn onto a Canvas element, and exported as WebP via `canvas.toBlob('image/webp', quality)`. Your photos never leave your device.",
    formatTable: [
      {
        format: "HEIC",
        fileSize: "Small (HEVC codec)",
        quality: "High",
        compatibility: "Apple only",
        useCase: "iPhone/iPad native storage",
      },
      {
        format: "WebP",
        fileSize: "Small (VP8/VP8L codec)",
        quality: "High (lossy or lossless)",
        compatibility: "All modern browsers",
        useCase: "Web delivery, performance optimization",
      },
      {
        format: "JPG",
        fileSize: "Small-Medium",
        quality: "High (lossy)",
        compatibility: "Universal",
        useCase: "Email, print, legacy apps",
      },
      {
        format: "AVIF",
        fileSize: "Smallest (AV1 codec)",
        quality: "Excellent",
        compatibility: "Modern browsers only",
        useCase: "Next-gen web images",
      },
    ],
    faqs: [
      {
        q: "Why convert HEIC to WebP instead of JPG?",
        a: "WebP produces files 25-35% smaller than JPG at the same visual quality. If your photos are destined for a website or web app, WebP is the optimal choice for performance. Choose JPG only when you need maximum compatibility (email, print, legacy software).",
      },
      {
        q: "Does converting HEIC to WebP lose quality?",
        a: "Both HEIC and WebP are efficient lossy formats. At quality 80-85, the WebP output is visually indistinguishable from the HEIC original. SammaPix lets you adjust quality from 1 to 100 for full control.",
      },
      {
        q: "Can I use HEIC-to-WebP converted photos on WordPress?",
        a: "Yes. WordPress has supported WebP since version 5.8. Upload the converted WebP files directly to your media library. Pair with a caching plugin for optimal delivery speed.",
      },
      {
        q: "Can I batch convert my iPhone photos from HEIC to WebP?",
        a: "Yes. Drop up to 20 HEIC files at once on the free plan (500 on Pro) and SammaPix converts them all to WebP in parallel. Download all results as a ZIP archive.",
      },
    ],
    related: ["heic-to-jpg", "heic-to-png", "jpg-to-webp"],
    blogSlugs: [
      { slug: "iphone-heic-to-jpg-guide", title: "The Complete Guide to Converting iPhone HEIC Photos" },
      { slug: "complete-guide-webp-format", title: "The Complete Guide to the WebP Format" },
    ],
  },

  "svg-to-jpg": {
    from: "SVG",
    to: "JPG",
    fromLabel: "SVG",
    toLabel: "JPG",
    toolPath: "/tools/compress",
    toolLabel: "Open Image Converter",
    tagline: "Rasterize SVG vector graphics to JPG- choose your resolution, free and instant.",
    whyCopy:
      "SVG is ideal for scalable web graphics, but many platforms require raster formats. Email clients block SVG for security reasons, social media sites require JPG or PNG uploads, and some CMS platforms cannot handle SVG files. Converting SVG to JPG gives you a compact raster image that works everywhere. JPG is the better choice over PNG when file size matters and the image does not need transparency.",
    qualityNote:
      "SVG to JPG involves rasterization (converting vectors to pixels) followed by JPEG compression. The output quality depends on two factors: the resolution you choose and the JPG quality level. At 1200px wide and quality 90, the result is excellent for most uses. Transparent areas in the SVG are filled with white since JPG does not support transparency.",
    technicalNote:
      "The SVG is loaded into the browser's native SVG renderer, rasterized at the specified resolution onto a Canvas element with a white background fill, and exported as JPEG via `canvas.toBlob('image/jpeg', quality)`. All rendering uses the browser's built-in SVG engine for accurate path and font rendering. No server upload required.",
    formatTable: [
      {
        format: "SVG",
        fileSize: "Tiny (vector, resolution-independent)",
        quality: "Perfect at any scale",
        compatibility: "Browsers only (blocked in email)",
        useCase: "Logos, icons, illustrations, web graphics",
      },
      {
        format: "JPG",
        fileSize: "Small-Medium",
        quality: "High (lossy, fixed resolution)",
        compatibility: "Universal",
        useCase: "Social media, email, print, web images",
      },
      {
        format: "PNG",
        fileSize: "Medium-Large",
        quality: "Lossless (fixed resolution)",
        compatibility: "Universal",
        useCase: "Design assets, transparency-needed images",
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
        q: "What resolution should I use when converting SVG to JPG?",
        a: "For social media posts, 1080-1200px wide is ideal. For email headers, 600px works well. For print at 300 DPI, multiply your target size in inches by 300 (e.g., 3000px for a 10-inch print). SammaPix lets you specify exact dimensions.",
      },
      {
        q: "What happens to SVG transparency when converting to JPG?",
        a: "JPG does not support transparency. SammaPix fills all transparent areas with white before encoding. If you need to preserve transparency, convert to PNG instead.",
      },
      {
        q: "Is SVG to JPG or SVG to PNG better?",
        a: "Choose JPG when file size matters and you do not need transparency (social media uploads, email headers, web photos). Choose PNG when you need transparency, lossless quality, or plan to edit the rasterized image further.",
      },
      {
        q: "Can I convert SVG with embedded fonts to JPG?",
        a: "Yes, if the fonts are embedded in the SVG or available as web fonts. If the SVG references external fonts that are not loaded, the browser substitutes a default font. For best results, use SVGs with embedded or standard web-safe fonts.",
      },
    ],
    related: ["svg-to-png", "jpg-to-webp", "png-to-jpg"],
    blogSlugs: [
      { slug: "compress-images-without-losing-quality", title: "Compress Images Without Losing Quality" },
    ],
  },

  // ─── JPEG XL (JXL) conversions ───────────────────────────────────────────

  "jxl-to-jpg": {
    from: "JXL",
    to: "JPG",
    fromLabel: "JPEG XL",
    toLabel: "JPG",
    toolPath: "/tools/jxl",
    toolLabel: "Open JXL Converter",
    tagline: "Convert JPEG XL files to universally-compatible JPG- free, browser-based, no upload.",
    whyCopy:
      "JPEG XL (JXL) is a next-generation image format that offers 30-60% better compression than JPEG. However, most applications, email clients, and social media platforms cannot open JXL files yet. Converting JXL to JPG ensures your images work everywhere- from WordPress uploads to email attachments.",
    qualityNote:
      "Converting JXL to JPG involves re-encoding. At quality 85-90 the output is visually identical to the JXL source. File size will increase somewhat since JPG compression is less efficient than JXL.",
    technicalNote:
      "SammaPix decodes the JXL file entirely inside your browser using a WebAssembly build of libjxl, then exports the pixel data as JPEG via the Canvas API. Your images never leave your device.",
    formatTable: [
      { format: "JXL", fileSize: "Smallest", quality: "Excellent (lossy or lossless)", compatibility: "Safari 17+, limited", useCase: "Next-gen web delivery, archival" },
      { format: "JPG", fileSize: "Small-Medium", quality: "High (lossy)", compatibility: "Universal", useCase: "Web, email, social media, print" },
      { format: "WebP", fileSize: "Small", quality: "High (lossy or lossless)", compatibility: "Modern browsers", useCase: "Web performance" },
      { format: "PNG", fileSize: "Large", quality: "Lossless", compatibility: "Universal", useCase: "Graphics, logos, screenshots" },
    ],
    faqs: [
      { q: "What is a JXL file?", a: "JXL is the file extension for JPEG XL, a next-generation image format standardized as ISO 18181 in 2022. It offers superior compression, HDR support, and both lossy and lossless modes. Safari 17+ supports it natively, and Chrome is re-adding support." },
      { q: "Does converting JXL to JPG lose quality?", a: "There is a small quality tradeoff since you are re-encoding from one format to another. At quality 85-90 the difference is invisible to the human eye." },
      { q: "Can I open JXL files on Windows?", a: "Windows 11 has native JXL support in File Explorer and Photos app. For older Windows versions, or to share JXL images with others, convert to JPG using SammaPix." },
      { q: "Is the conversion private?", a: "Yes. SammaPix uses WebAssembly to decode JXL entirely in your browser. No image data is sent to any server. You can even disconnect from the internet after the page loads." },
    ],
    related: ["jxl-to-png", "jxl-to-webp", "avif-to-jpg"],
    blogSlugs: [
      { slug: "best-image-format-for-web-2026", title: "Best Image Format for Web in 2026" },
      { slug: "webp-vs-avif-vs-jpeg-comparison", title: "WebP vs AVIF vs JPEG Comparison" },
    ],
  },

  "jxl-to-png": {
    from: "JXL",
    to: "PNG",
    fromLabel: "JPEG XL",
    toLabel: "PNG",
    toolPath: "/tools/jxl",
    toolLabel: "Open JXL Converter",
    tagline: "Convert JPEG XL files to lossless PNG- free, browser-based, no upload.",
    whyCopy:
      "PNG gives you a pixel-perfect lossless copy of your JXL image. This is the right choice when you need to edit the image further in Photoshop or Figma, use it as a design asset, or need transparency support that JXL had in the original file.",
    qualityNote:
      "PNG is lossless: the output preserves every pixel from the JXL image. File size will be significantly larger than the JXL source, but you gain zero quality loss.",
    technicalNote:
      "The JXL file is decoded in-browser via WebAssembly (libjxl), then the raw pixel data is drawn on a Canvas and exported as PNG via canvas.convertToBlob('image/png'). No server involved.",
    formatTable: [
      { format: "JXL", fileSize: "Smallest", quality: "Excellent", compatibility: "Safari 17+, limited", useCase: "Next-gen delivery, archival" },
      { format: "PNG", fileSize: "Large", quality: "Lossless", compatibility: "Universal", useCase: "Editing, logos, graphics, transparency" },
      { format: "JPG", fileSize: "Small-Medium", quality: "High (lossy)", compatibility: "Universal", useCase: "Photos, web, email" },
    ],
    faqs: [
      { q: "Why convert JXL to PNG instead of JPG?", a: "Choose PNG when you need lossless quality, transparency support, or plan to edit the image further. Choose JPG when file size matters more than perfect fidelity." },
      { q: "Does JXL to PNG conversion lose quality?", a: "No. PNG is lossless. The conversion preserves every pixel from the JXL source without any compression artifacts." },
      { q: "Can I convert multiple JXL files at once?", a: "Yes. SammaPix supports batch conversion. Drop up to 20 files at once (free plan) or 200 on Pro." },
    ],
    related: ["jxl-to-jpg", "jxl-to-webp", "avif-to-png"],
    blogSlugs: [
      { slug: "best-image-format-for-web-2026", title: "Best Image Format for Web in 2026" },
    ],
  },

  "jxl-to-webp": {
    from: "JXL",
    to: "WebP",
    fromLabel: "JPEG XL",
    toLabel: "WebP",
    toolPath: "/tools/jxl",
    toolLabel: "Open JXL Converter",
    tagline: "Convert JPEG XL to WebP for broad browser compatibility- free, browser-based.",
    whyCopy:
      "While JXL offers better compression than WebP, WebP has much wider browser support (97%+ globally). Converting JXL to WebP gives you a good balance of compression efficiency and compatibility for web delivery.",
    qualityNote:
      "WebP at quality 80-85 produces files slightly larger than the JXL source but with near-identical visual quality. WebP is universally supported in modern browsers.",
    technicalNote:
      "JXL is decoded via WebAssembly in-browser, drawn to a Canvas, then exported as WebP via canvas.convertToBlob('image/webp', quality). No server involved.",
    formatTable: [
      { format: "JXL", fileSize: "Smallest", quality: "Excellent", compatibility: "Safari 17+, limited", useCase: "Next-gen delivery" },
      { format: "WebP", fileSize: "Small", quality: "High (lossy or lossless)", compatibility: "97%+ browsers", useCase: "Web performance" },
      { format: "JPG", fileSize: "Medium", quality: "High (lossy)", compatibility: "Universal", useCase: "Legacy compatibility" },
    ],
    faqs: [
      { q: "Is WebP or JXL better for websites?", a: "JXL offers better compression, but WebP has 97%+ browser support vs JXL's limited support. For now, WebP is the safer choice for production websites. Use JXL for Safari-specific delivery or when Chrome re-enables support." },
      { q: "How much larger is WebP compared to JXL?", a: "At equivalent visual quality, WebP files are typically 10-30% larger than JXL. Both are significantly smaller than JPEG." },
    ],
    related: ["jxl-to-jpg", "jxl-to-png", "jpg-to-webp"],
    blogSlugs: [
      { slug: "webp-vs-avif-vs-jpeg-comparison", title: "WebP vs AVIF vs JPEG Comparison" },
    ],
  },

  "jpg-to-jxl": {
    from: "JPG",
    to: "JXL",
    fromLabel: "JPG",
    toLabel: "JPEG XL",
    toolPath: "/tools/jxl",
    toolLabel: "Open JXL Converter",
    tagline: "Convert JPG to JPEG XL for 30-60% smaller files- free, browser-based.",
    whyCopy:
      "JPEG XL compresses photographic images 30-60% better than JPEG at equivalent visual quality. Converting your JPG files to JXL saves storage space and bandwidth. As browser support grows (Safari 17+, Chrome returning), JXL is becoming a viable delivery format.",
    qualityNote:
      "At quality 75-85, JXL produces files 30-60% smaller than the source JPG with equivalent or better visual quality. At quality 100, JXL operates in lossless mode.",
    technicalNote:
      "SammaPix loads the JPG in-browser, extracts pixel data via Canvas, then encodes to JXL using a WebAssembly build of libjxl. No server upload required.",
    formatTable: [
      { format: "JPG", fileSize: "Medium", quality: "High (lossy)", compatibility: "Universal", useCase: "Legacy web, email, print" },
      { format: "JXL", fileSize: "Smallest", quality: "Excellent (lossy or lossless)", compatibility: "Safari 17+, growing", useCase: "Next-gen web, archival, HDR" },
      { format: "WebP", fileSize: "Small", quality: "High", compatibility: "97%+ browsers", useCase: "Current web standard" },
    ],
    faqs: [
      { q: "Why convert JPG to JXL?", a: "JXL produces 30-60% smaller files than JPG at the same visual quality. This saves storage, reduces bandwidth costs, and speeds up page load times for visitors using browsers that support JXL." },
      { q: "Can I serve JXL with a JPG fallback?", a: "Yes. Use the <picture> element with <source type=\"image/jxl\"> for JXL and <img> as JPG fallback. Browsers that support JXL will use the smaller file." },
      { q: "Is JXL better than WebP?", a: "For photographic content, JXL typically offers 10-30% better compression than WebP. JXL also supports lossless JPEG recompression, HDR, and wider color gamuts. The main disadvantage is limited browser support (for now)." },
    ],
    related: ["png-to-jxl", "jxl-to-jpg", "jpg-to-webp"],
    blogSlugs: [
      { slug: "best-image-format-for-web-2026", title: "Best Image Format for Web in 2026" },
      { slug: "webp-vs-avif-vs-jpeg-comparison", title: "WebP vs AVIF vs JPEG Comparison" },
    ],
  },

  "png-to-jxl": {
    from: "PNG",
    to: "JXL",
    fromLabel: "PNG",
    toLabel: "JPEG XL",
    toolPath: "/tools/jxl",
    toolLabel: "Open JXL Converter",
    tagline: "Convert PNG to JPEG XL for dramatically smaller lossless files- free, browser-based.",
    whyCopy:
      "JPEG XL lossless compression produces files approximately 35% smaller than PNG while maintaining identical quality. For large PNG files (screenshots, design assets, medical images), converting to JXL can save significant storage space.",
    qualityNote:
      "At quality 100, JXL operates in lossless mode- every pixel is preserved exactly. At lower quality settings, JXL uses lossy compression for even smaller files with minimal visual impact.",
    technicalNote:
      "PNG is drawn to a Canvas, pixel data extracted via getImageData(), then encoded to JXL using the WebAssembly encoder. All processing happens in your browser.",
    formatTable: [
      { format: "PNG", fileSize: "Large", quality: "Lossless", compatibility: "Universal", useCase: "Graphics, logos, screenshots" },
      { format: "JXL", fileSize: "Smaller (35% less)", quality: "Lossless or lossy", compatibility: "Safari 17+, growing", useCase: "Efficient storage, next-gen web" },
      { format: "WebP", fileSize: "Medium", quality: "Lossless or lossy", compatibility: "97%+ browsers", useCase: "Web delivery" },
    ],
    faqs: [
      { q: "Is JXL lossless like PNG?", a: "Yes, JXL supports lossless compression. At quality 100, every pixel is preserved identically. The resulting file is about 35% smaller than the equivalent PNG." },
      { q: "Does JXL support transparency?", a: "Yes. JPEG XL fully supports alpha channels (transparency), unlike JPEG. Converting transparent PNGs to lossless JXL preserves the alpha channel." },
      { q: "Should I convert my PNG assets to JXL?", a: "If your target audience uses Safari 17+ or you can serve JXL with fallbacks, yes. JXL saves ~35% over PNG losslessly. For universal compatibility today, WebP lossless is a safer bet." },
    ],
    related: ["jpg-to-jxl", "jxl-to-png", "png-to-webp"],
    blogSlugs: [
      { slug: "best-image-format-for-web-2026", title: "Best Image Format for Web in 2026" },
    ],
  },

  "webp-to-jxl": {
    from: "WebP",
    to: "JXL",
    fromLabel: "WebP",
    toLabel: "JPEG XL",
    toolPath: "/tools/jxl",
    toolLabel: "Open JXL Converter",
    tagline: "Upgrade WebP images to JPEG XL for even smaller files- free, browser-based.",
    whyCopy:
      "JPEG XL offers 10-30% better compression than WebP for photographic content. If you already have a WebP workflow and want to future-proof your assets, converting to JXL gives you an additional size reduction while maintaining equivalent quality.",
    qualityNote:
      "Since both WebP and JXL are modern compressed formats, the additional size savings from WebP to JXL are typically 10-30% for photographic images. The visual quality remains equivalent.",
    technicalNote:
      "WebP is decoded natively by the browser, drawn to a Canvas, then encoded to JXL via WebAssembly. No server required.",
    formatTable: [
      { format: "WebP", fileSize: "Small", quality: "High", compatibility: "97%+ browsers", useCase: "Current web standard" },
      { format: "JXL", fileSize: "Smallest", quality: "Excellent", compatibility: "Safari 17+, growing", useCase: "Next-gen web delivery" },
      { format: "AVIF", fileSize: "Small", quality: "High", compatibility: "92%+ browsers", useCase: "Alternative next-gen format" },
    ],
    faqs: [
      { q: "Is it worth converting WebP to JXL?", a: "If you serve a high volume of images and your audience includes Safari users, yes. The 10-30% additional savings add up at scale. For smaller sites, the bandwidth savings may not justify the reduced compatibility." },
      { q: "Which is better: JXL or WebP?", a: "JXL offers better compression, HDR support, and lossless JPEG recompression. WebP has wider browser support today. JXL is the long-term winner as browser support grows." },
    ],
    related: ["jpg-to-jxl", "png-to-jxl", "webp-to-jpg"],
    blogSlugs: [
      { slug: "webp-vs-avif-vs-jpeg-comparison", title: "WebP vs AVIF vs JPEG Comparison" },
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
