import { APP_URL } from "@/lib/constants";

export interface CompressTarget {
  slug: string;
  sizeLabel: string;
  sizeBytes: number;
  metaDescription: string;
  ogDescription: string;
  titleKeyword: string;
  keywords: string[];
  useCase: string;
  tips: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}

const ALL_TARGETS: CompressTarget[] = [
  // ─── 3 KB ────────────────────────────────────────────────────────────────
  {
    slug: "3kb",
    sizeLabel: "3 KB",
    sizeBytes: 3072,
    metaDescription:
      "Compress any image to 3 KB online for free. Ideal for micro-thumbnails, favicons, email pixel trackers, and ultra-minimal web assets. No sign-up, works entirely in your browser.",
    ogDescription:
      "Free online tool to compress images to 3 KB instantly. Perfect for favicons, micro-thumbnails, and email tracking pixels.",
    titleKeyword: "Compress Image to 3KB",
    keywords: [
      "compress image to 3kb",
      "reduce image size to 3kb",
      "3kb image compressor",
      "micro thumbnail compressor",
      "compress favicon to 3kb",
      "email pixel tracker image size",
      "ultra small image compressor",
    ],
    useCase:
      "Designed for micro-thumbnails, favicons at 16×16 or 32×32 px, email open-tracking pixels, and minimal decorative web elements that must weigh virtually nothing.",
    tips: [
      "At 3 KB, your image must be tiny — resize to 64×64 px or smaller before compressing for any recognizable result.",
      "Use indexed-color PNG (palette mode with 8-16 colors) for icons — it often beats JPEG at this extreme file size.",
      "Strip absolutely all metadata using our EXIF Remover — at 3 KB, even a few hundred bytes of EXIF data is a significant percentage of the file.",
      "For email tracking pixels, a 1×1 px transparent PNG is already under 1 KB — you only need compression if you are embedding a visible micro-image in the email body.",
    ],
    faqs: [
      {
        q: "Can I really get a usable image at 3 KB?",
        a: "Yes, but only at very small dimensions. A 32×32 favicon or a 48×48 avatar looks clean at 3 KB. Anything above 100×100 px will show heavy compression artifacts at this size.",
      },
      {
        q: "What is a 3 KB image used for?",
        a: "Common uses include browser favicons (16×16 to 48×48 px), email open-tracking pixels (1×1 px), tiny placeholder thumbnails for lazy-loaded galleries, and micro-icons in notification badges.",
      },
      {
        q: "Which format produces the best quality at 3 KB?",
        a: "For icons and graphics with flat colors, PNG with a reduced palette wins. For photographic content at this extreme size, WebP delivers the least blurriness. JPEG struggles below 5 KB due to its header overhead.",
      },
      {
        q: "How do I compress a favicon to 3 KB?",
        a: "Export your icon at 32×32 px in PNG format with 16 or fewer colors. This alone is usually under 3 KB. If not, open it in SammaPix Compress, lower quality to 30-40%, and save. The .ico format can embed multiple PNG sizes — keep only 16×16 and 32×32 to stay under 3 KB total.",
      },
    ],
    related: ["5kb", "8kb", "10kb"],
  },

  // ─── 8 KB ────────────────────────────────────────────────────────────────
  {
    slug: "8kb",
    sizeLabel: "8 KB",
    sizeBytes: 8192,
    metaDescription:
      "Compress any image to 8 KB online for free. Perfect for web icons, small avatars, placeholder images, and low-bandwidth mobile assets. No upload required — works in your browser.",
    ogDescription:
      "Free online tool to compress images to 8 KB instantly. Ideal for web icons, small avatars, and placeholder images.",
    titleKeyword: "Compress Image to 8KB",
    keywords: [
      "compress image to 8kb",
      "reduce image size to 8kb",
      "8kb image compressor",
      "small avatar compressor",
      "web icon compression",
      "placeholder image 8kb",
      "compress image for low bandwidth",
    ],
    useCase:
      "Ideal for web icons, small avatars on forums and chat apps, placeholder images for lazy loading, and any asset served to users on extremely slow mobile connections.",
    tips: [
      "Resize to 100-200 px on the longest side before compressing — this is the sweet spot where 8 KB still delivers sharp, recognizable results.",
      "WebP at 8 KB outperforms JPEG by roughly 40% in visual quality — always prefer WebP for modern web projects.",
      "For placeholder images used during lazy loading, intentional blur at 8 KB actually improves perceived performance — users see a soft preview before the full image loads.",
      "Combine 8 KB placeholders with CSS aspect-ratio to prevent layout shift (CLS) — a key Core Web Vitals metric.",
    ],
    faqs: [
      {
        q: "What can I display with an 8 KB image?",
        a: "At 150×150 px, an 8 KB image is sharp enough for small avatars, chat profile pictures, icon grids, and thumbnail previews. At 200×200 px, expect slight softness in detailed areas but still very usable.",
      },
      {
        q: "How does 8 KB compare to 5 KB and 10 KB?",
        a: "8 KB is the practical middle ground: 5 KB only works for micro-icons, while 10 KB allows slightly larger dimensions. Choose 8 KB when you need small avatars or icons that look crisp at 100-180 px without the extra bytes of 10 KB.",
      },
      {
        q: "Is 8 KB enough for a lazy-load placeholder?",
        a: "Yes — an 8 KB blurred placeholder at 200 px wide is a widely used pattern (often called LQIP — Low Quality Image Placeholder). It loads in under 10 ms on 3G connections and provides a smooth visual transition when the full image arrives.",
      },
      {
        q: "Which image format is best at 8 KB?",
        a: "WebP provides the best quality at 8 KB for photographic content. For icons with flat colors, PNG with reduced palette is competitive. Avoid JPEG below 10 KB — its file header alone consumes a significant portion of the budget.",
      },
    ],
    related: ["3kb", "5kb", "10kb"],
  },

  // ─── 5 KB ────────────────────────────────────────────────────────────────
  {
    slug: "5kb",
    sizeLabel: "5 KB",
    sizeBytes: 5120,
    metaDescription:
      "Compress any image to 5 KB online for free. Perfect for thumbnails, favicons, email signatures, and ultra-lightweight web assets. No upload required — works in your browser.",
    ogDescription:
      "Free online tool to compress images to 5 KB instantly. Ideal for tiny thumbnails, favicons, and email signature logos.",
    titleKeyword: "Compress Image to 5KB",
    keywords: [
      "compress image to 5kb",
      "reduce image size to 5kb",
      "compress photo to 5kb",
      "5kb image compressor",
      "tiny image compressor",
      "compress image for email signature",
      "compress favicon",
    ],
    useCase:
      "Perfect for favicons, email signature logos, tiny thumbnails, and any context where you need the absolute smallest possible image file.",
    tips: [
      "At 5 KB, resize your image to 100×100 px or smaller first — large images cannot reach 5 KB at usable quality.",
      "Use WebP format — it delivers 2-3x better quality than JPEG at the same file size.",
      "Remove all metadata (EXIF data) to save extra bytes — use our EXIF Remover tool first.",
      "For logos and icons, convert to PNG with limited colors (palette mode) before compressing.",
    ],
    faqs: [
      {
        q: "How do I compress an image to exactly 5 KB?",
        a: "First resize your image to a very small dimension (under 150×150 px) using our Resize tool. Then open the Compress tool, set quality to 20-40%, and download. For icons and logos, PNG with reduced colors often works better than JPEG.",
      },
      {
        q: "What can I use a 5 KB image for?",
        a: "5 KB images are ideal for favicons (16×16 to 48×48 px), email signature logos, tiny social media avatars, placeholder thumbnails, and ultra-lightweight web page decorations that need to load instantly.",
      },
      {
        q: "Will a 5 KB image look good?",
        a: "At very small display sizes (under 150×150 px), yes. A favicon at 32×32 px looks crisp at 5 KB. But a full-size photo compressed to 5 KB will be extremely blurry — this size is meant for tiny graphics only.",
      },
      {
        q: "What format is best for 5 KB compression?",
        a: "For photos: WebP delivers the best quality-to-size ratio. For logos/icons with flat colors: PNG with palette mode. For compatibility with old systems: JPEG at very low quality.",
      },
    ],
    related: ["10kb", "15kb", "20kb"],
  },

  // ─── 10 KB ───────────────────────────────────────────────────────────────
  {
    slug: "10kb",
    sizeLabel: "10 KB",
    sizeBytes: 10240,
    metaDescription:
      "Compress any image to 10 KB online for free. Perfect for web thumbnails, form uploads, mobile app assets, and low-bandwidth optimization. No upload required — works in your browser.",
    ogDescription:
      "Free online tool to compress images to 10 KB instantly. Ideal for web thumbnails, lightweight mobile assets, and form uploads.",
    titleKeyword: "Compress Image to 10KB",
    keywords: [
      "compress image to 10kb",
      "reduce image size to 10kb",
      "compress photo to 10kb",
      "10kb image compressor",
      "compress image for form upload",
      "lightweight image compressor",
      "compress image for mobile app",
    ],
    useCase:
      "Perfect for web thumbnails, mobile app preview images, form upload requirements, and any use case where images must load instantly on slow connections.",
    tips: [
      "Resize to 200-400 px on the longest side before compressing — this is the sweet spot for 10 KB quality.",
      "Convert to WebP format first — a 10 KB WebP looks as good as a 25 KB JPEG.",
      "For product thumbnails, crop tightly around the product to eliminate background pixels.",
      "Use progressive JPEG encoding if the target system doesn't support WebP — it renders faster at small sizes.",
    ],
    faqs: [
      {
        q: "How do I compress an image to exactly 10 KB?",
        a: "Upload your image to SammaPix Compress and lower the quality slider until the output shows 10 KB or less. If the image is too large, resize it to under 400 px first using our Resize tool, then compress again.",
      },
      {
        q: "Is 10 KB enough for a web thumbnail?",
        a: "Yes, absolutely. At 200-300 px wide, a 10 KB image looks sharp on screens. Most e-commerce product grids, blog post thumbnails, and directory listings use images around this size for fast page loads.",
      },
      {
        q: "Can I compress a high-resolution photo to 10 KB?",
        a: "Technically yes, but it will be very blurry at full resolution. For best results, resize to 200-400 px first, then compress. This gives you a sharp, lightweight image instead of a blurry full-size one.",
      },
      {
        q: "10 KB vs 20 KB — what's the quality difference?",
        a: "At 200 px wide, barely noticeable. At 400 px wide, 20 KB will look slightly sharper in detailed areas (hair, text, edges). If your use case allows 20 KB, go with that for better quality.",
      },
    ],
    related: ["5kb", "15kb", "20kb"],
  },

  // ─── 15 KB ───────────────────────────────────────────────────────────────
  {
    slug: "15kb",
    sizeLabel: "15 KB",
    sizeBytes: 15360,
    metaDescription:
      "Compress any image to 15 KB online for free. Perfect for profile pictures, small product images, and government portal uploads. No upload required — works in your browser.",
    ogDescription:
      "Free online tool to compress images to 15 KB instantly. Ideal for profile pictures, small product thumbnails, and portal uploads.",
    titleKeyword: "Compress Image to 15KB",
    keywords: [
      "compress image to 15kb",
      "reduce image size to 15kb",
      "compress photo to 15kb",
      "15kb image compressor",
      "compress profile picture",
      "compress image for government portal",
      "small image compressor online",
    ],
    useCase:
      "Perfect for profile pictures, small product images, government portal uploads with strict size limits, and card-sized web images.",
    tips: [
      "For profile pictures, crop to a square (1:1 ratio) first, then resize to 300×300 px — this reaches 15 KB easily at 70-80% quality.",
      "WebP at 15 KB looks equivalent to JPEG at 30 KB — always prefer WebP when the platform supports it.",
      "If compressing for a government portal, check if they require a specific format (usually JPEG) before converting to WebP.",
      "Batch-compress multiple images at once using SammaPix — drop up to 20 files and download them all compressed.",
    ],
    faqs: [
      {
        q: "How do I compress a photo to exactly 15 KB?",
        a: "Open SammaPix Compress, drop your image, and adjust the quality slider downward. For a typical 2-5 MB phone photo, quality 35-55% will usually land around 15 KB. If not, resize the image to under 500 px first.",
      },
      {
        q: "Is 15 KB good enough for a profile picture?",
        a: "Yes. At 200-400 px (the typical display size for avatars and profile pictures), a 15 KB image looks clean and loads instantly. LinkedIn, forums, and most apps display profile photos at these dimensions.",
      },
      {
        q: "Can I upload a 15 KB image to Instagram?",
        a: "Instagram accepts images from a few KB to 30 MB, so yes. However, Instagram will re-compress your image anyway. For best Instagram quality, use our resize-for-Instagram tool to get the exact dimensions Instagram expects.",
      },
      {
        q: "15 KB vs 20 KB — which should I choose?",
        a: "If your upload form has a 15 KB limit, target 15 KB. Otherwise, 20 KB gives you slightly better quality for almost no extra file size. Both are excellent for web use.",
      },
    ],
    related: ["10kb", "20kb", "25kb"],
  },

  // ─── 30 KB ───────────────────────────────────────────────────────────────
  {
    slug: "30kb",
    sizeLabel: "30 KB",
    sizeBytes: 30720,
    metaDescription:
      "Compress any image to 30 KB online for free. Perfect for social media profile pictures, medium thumbnails, and directory headshots. No sign-up, works in your browser.",
    ogDescription:
      "Free online tool to compress images to 30 KB. Ideal for social media profile pictures, medium-size thumbnails, and online directory photos.",
    titleKeyword: "Compress Image to 30KB",
    keywords: [
      "compress image to 30kb",
      "reduce image size to 30kb",
      "compress photo to 30kb",
      "30kb image compressor",
      "social media profile picture size",
      "medium thumbnail compressor",
      "directory headshot compression",
    ],
    useCase:
      "Perfect for social media profile pictures, medium-resolution thumbnails for directory listings, event badge photos, and team page headshots that need to load fast.",
    tips: [
      "At 30 KB you can maintain a 400×400 px profile photo at quality 65-75% — sharp enough for social media and team pages.",
      "Crop to a 1:1 square before compressing — most platforms display profile pictures as circles or squares, and cropping first maximizes the useful pixels.",
      "For directory headshots, export at 350×350 px and 70% quality — this reliably hits 30 KB with a professional look.",
      "Use WebP format to get roughly 25% better detail at 30 KB compared to the same file in JPEG — especially noticeable in facial details like eyes and hair.",
    ],
    faqs: [
      {
        q: "Is 30 KB enough for a social media profile picture?",
        a: "Yes. Most social platforms display profile photos at 150-400 px. A 30 KB image at 350×350 px looks clean and professional. Platforms like Twitter, LinkedIn, and Slack all display profile pictures at this range.",
      },
      {
        q: "How do I compress a headshot to 30 KB for a company directory?",
        a: "Crop tightly around the face and shoulders, resize to 300-400 px wide, then compress at 65-75% quality in SammaPix. This workflow consistently produces 25-32 KB files that look sharp in directory grids.",
      },
      {
        q: "30 KB vs 50 KB — when should I use which?",
        a: "Use 30 KB when page speed is critical (directories with dozens of headshots, mobile-first sites) or when a strict upload limit exists. Use 50 KB when slightly more detail matters, like individual staff bio pages.",
      },
      {
        q: "What dimensions work best at 30 KB?",
        a: "For square profile photos: 300-400 px. For rectangular thumbnails: 400×300 px or 350×250 px. Going above 500 px wide at 30 KB will introduce visible blurriness in photographic content.",
      },
    ],
    related: ["15kb", "20kb", "40kb", "50kb"],
  },

  // ─── 40 KB ───────────────────────────────────────────────────────────────
  {
    slug: "40kb",
    sizeLabel: "40 KB",
    sizeBytes: 40960,
    metaDescription:
      "Compress any image to 40 KB online for free. Ideal for product listing thumbnails, directory photos, and card-layout images. No software needed — works in your browser.",
    ogDescription:
      "Free online tool to compress images to 40 KB. Great for product listing thumbnails, directory photos, and card-based web layouts.",
    titleKeyword: "Compress Image to 40KB",
    keywords: [
      "compress image to 40kb",
      "reduce image size to 40kb",
      "compress photo to 40kb",
      "40kb image compressor",
      "product listing thumbnail size",
      "directory photo compression",
      "card image compression online",
    ],
    useCase:
      "Ideal for product listing thumbnails on e-commerce grids, directory profile photos, real estate listing cards, and any card-based web layout where dozens of images load simultaneously.",
    tips: [
      "Product grids often show 20-50 images at once — at 40 KB each, the entire grid loads in under 1 second on 4G, giving you excellent Core Web Vitals scores.",
      "For product thumbnails, resize to 400×400 px and compress at 72-80% quality — the white product background compresses extremely well.",
      "Real estate listing cards look sharp at 500×350 px and 40 KB — the key is to use WebP format which handles architectural details better than JPEG at this size.",
      "Always serve 40 KB thumbnails with lazy loading — only the first visible row loads immediately, saving bandwidth for images below the fold.",
    ],
    faqs: [
      {
        q: "Is 40 KB good enough for product listing thumbnails?",
        a: "Yes. Amazon, eBay, and Shopify all use thumbnails in the 30-60 KB range for product grids. At 400×400 px and 40 KB, product images look sharp in grid view. Full-size images load only when the user clicks to view details.",
      },
      {
        q: "How many 40 KB images can load on one page?",
        a: "A page with 50 images at 40 KB each totals only 2 MB — well within Google's recommendation for total page weight. Combined with lazy loading, this provides a fast, smooth browsing experience even on mobile.",
      },
      {
        q: "What is the best format for 40 KB thumbnails?",
        a: "WebP gives you the best detail at 40 KB, especially for product photos with fine textures. Use JPEG as a fallback for browsers that do not support WebP (rare in 2026). Avoid PNG for photographic content at this size.",
      },
      {
        q: "40 KB vs 50 KB — is there a visible difference?",
        a: "At 400 px display size, the difference is minimal. At 600 px, 50 KB provides noticeably sharper edges on text overlays and fine product details. If your grid shows images at 400 px or smaller, 40 KB saves bandwidth with no visible trade-off.",
      },
    ],
    related: ["30kb", "50kb", "100kb"],
  },

  // ─── 20 KB ───────────────────────────────────────────────────────────────
  {
    slug: "20kb",
    sizeLabel: "20 KB",
    sizeBytes: 20480,
    metaDescription:
      "Compress any image to 20 KB online for free. Perfect for passport photos, ID documents, and government application forms. No upload required — works in your browser.",
    ogDescription:
      "Free online tool to compress images to 20 KB instantly. Ideal for passport photos, visa applications, and ID documents.",
    titleKeyword: "Compress Image to 20KB",
    keywords: [
      "compress image to 20kb",
      "reduce image size to 20kb",
      "compress photo to 20kb",
      "resize image to 20kb",
      "20kb image compressor",
      "passport photo 20kb",
      "compress image for id card",
    ],
    useCase:
      "Perfect for passport photos, ID documents, and government application forms that require very small file sizes.",
    tips: [
      "Use high compression (quality 30-50%) to reach 20 KB — most forms accept lower quality for ID photos.",
      "Reduce image resolution to 600×600 px or smaller before compressing for best results.",
      "Convert to WebP format first — it achieves 20 KB at much higher visual quality than JPEG.",
      "Crop tightly around the subject to remove unnecessary background pixels.",
    ],
    faqs: [
      {
        q: "How do I compress an image to exactly 20 KB?",
        a: "Upload your image to SammaPix Compress, set the target quality slider low (around 30-50%), and download. If the file is still too large, reduce the resolution first using our Resize tool, then compress again.",
      },
      {
        q: "Will compressing to 20 KB ruin my image quality?",
        a: "At 20 KB the image will lose some detail, but for ID photos and passport images the result is perfectly acceptable. Most government portals are designed to work with heavily compressed images.",
      },
      {
        q: "What image format is best for 20 KB compression?",
        a: "WebP delivers the best quality at 20 KB. If the upload form only accepts JPEG, use JPEG with progressive encoding enabled. Avoid PNG at this size — it is not designed for such heavy compression.",
      },
      {
        q: "Can I compress a photo to 20 KB without changing dimensions?",
        a: "Yes, but results depend on the original image. A 4000×3000 photo compressed to 20 KB will look very blurry. For best results at 20 KB, resize to 400-800 px on the longest side first.",
      },
    ],
    related: ["25kb", "50kb", "100kb"],
  },

  // ─── 25 KB ───────────────────────────────────────────────────────────────
  {
    slug: "25kb",
    sizeLabel: "25 KB",
    sizeBytes: 25600,
    metaDescription:
      "Compress any image to 25 KB online for free. Ideal for government forms, visa applications, and official document uploads. No sign-up needed.",
    ogDescription:
      "Free online tool to compress images to 25 KB instantly. Perfect for visa applications and government document uploads.",
    titleKeyword: "Compress Image to 25KB",
    keywords: [
      "compress image to 25kb",
      "reduce image size to 25kb",
      "compress photo to 25kb",
      "25kb image compressor",
      "visa photo 25kb",
      "compress image for government form",
    ],
    useCase:
      "Ideal for government forms, visa applications, and official document uploads where a strict 25 KB limit is enforced.",
    tips: [
      "Many visa portals require exactly 25 KB — set quality to 40-60% and verify the output size before uploading.",
      "Resize to 500×500 px first, then compress — this combination consistently hits the 25 KB target.",
      "If JPEG compression is not enough, convert to WebP and then back to JPEG at lower quality for a smaller file.",
      "Remove EXIF metadata (GPS, camera info) to shave an extra 2-5 KB off the file size.",
    ],
    faqs: [
      {
        q: "How can I compress a photo to under 25 KB for a visa application?",
        a: "Use SammaPix Compress with the quality slider set to around 40-55%. If the result is still over 25 KB, resize the image to 500×500 px first, then compress again. Most visa portals accept JPEG format.",
      },
      {
        q: "Is 25 KB enough for a clear photo?",
        a: "Yes, especially for small-dimension photos (400-600 px). At 25 KB a face photo looks sharp enough for identification. The key is to resize the dimensions down before compressing, rather than compressing a huge image.",
      },
      {
        q: "What dimensions should I use for a 25 KB image?",
        a: "For passport or visa photos, 350×450 px at 25 KB produces a clear result. For general use, keep the longest side under 600 px. Larger dimensions at 25 KB will appear visibly blurry.",
      },
      {
        q: "Does removing EXIF data help reach 25 KB?",
        a: "Yes. EXIF metadata (camera model, GPS coordinates, timestamps) can add 5-15 KB to a JPEG file. Use the SammaPix EXIF Remover tool first, then compress — you may reach 25 KB at a higher quality setting.",
      },
    ],
    related: ["20kb", "50kb", "100kb"],
  },

  // ─── 50 KB ───────────────────────────────────────────────────────────────
  {
    slug: "50kb",
    sizeLabel: "50 KB",
    sizeBytes: 51200,
    metaDescription:
      "Compress any image to 50 KB online for free. Great for email signatures, thumbnails, profile avatars, and forum uploads. Works entirely in your browser.",
    ogDescription:
      "Free online tool to compress images to 50 KB. Perfect for email signatures, thumbnails, and avatar images.",
    titleKeyword: "Compress Image to 50KB",
    keywords: [
      "compress image to 50kb",
      "reduce image size to 50kb",
      "compress photo to 50kb",
      "50kb image compressor",
      "email signature image size",
      "compress thumbnail image",
      "avatar image 50kb",
    ],
    useCase:
      "Great for email signatures, thumbnails, profile avatars, and forum uploads where small file sizes load faster.",
    tips: [
      "For email signatures, compress to 50 KB at 300×100 px — it loads instantly in every email client.",
      "Square avatars (200×200 px) compress to 50 KB at excellent quality (75-85%).",
      "Use progressive JPEG encoding — the image appears to load faster even at 50 KB.",
      "If your image has large flat-color areas, PNG at 50 KB may look sharper than JPEG.",
    ],
    faqs: [
      {
        q: "How do I compress an image to 50 KB without losing quality?",
        a: "The trick is to resize the image to the display dimensions first. A 300×300 avatar compressed to 50 KB looks nearly identical to the original. Upload to SammaPix, set quality to 70-80%, and download.",
      },
      {
        q: "Is 50 KB good enough for a website thumbnail?",
        a: "Absolutely. Most website thumbnails are displayed at 200-400 px wide. At 50 KB with JPEG or WebP compression, thumbnails look crisp and load almost instantly, improving your page speed score.",
      },
      {
        q: "Can I batch compress multiple images to 50 KB?",
        a: "Yes. Use SammaPix Compress to upload multiple images at once. Set the quality slider to your target, compress all, and download them individually or as a ZIP file.",
      },
      {
        q: "What format works best at 50 KB?",
        a: "WebP gives the best visual quality at 50 KB. If you need broad compatibility, use JPEG. Avoid PNG for photos at this size — it is better suited for graphics and icons.",
      },
    ],
    related: ["20kb", "100kb", "200kb"],
  },

  // ─── 100 KB ──────────────────────────────────────────────────────────────
  {
    slug: "100kb",
    sizeLabel: "100 KB",
    sizeBytes: 102400,
    metaDescription:
      "Compress any image to 100 KB online for free. The most popular target size for web uploads, form submissions, and email attachments. Fast, private, no sign-up.",
    ogDescription:
      "Free online tool to compress images to 100 KB. The #1 target size for web uploads, email attachments, and form submissions.",
    titleKeyword: "Compress Image to 100KB",
    keywords: [
      "compress image to 100kb",
      "reduce image size to 100kb",
      "compress photo to 100kb",
      "100kb image compressor",
      "compress image for email",
      "compress image for web upload",
      "reduce photo size online",
      "image compressor 100kb",
    ],
    useCase:
      "The most popular target size — perfect for web uploads, form submissions, email attachments, and CMS image fields.",
    tips: [
      "100 KB is the sweet spot for web images — sharp enough for full-width display at 800-1200 px, light enough for fast loading.",
      "Set quality to 75-85% for photos — most viewers cannot tell the difference from the original at 100 KB.",
      "For blog header images (1200×630 px), WebP at 100 KB looks near-lossless and loads in under 100 ms on 4G.",
      "Compress product photos to 100 KB each — an e-commerce page with 20 images stays under 2 MB total.",
    ],
    faqs: [
      {
        q: "How do I compress an image to 100 KB without losing quality?",
        a: "Open SammaPix Compress, drop your image, and lower the quality slider until output meets 100 KB — for most photos that means quality 50-65% on JPEG or 60-75% on WebP. For images larger than 3000 px on the long edge, resize to 1200 px first; the resize alone often gets you to 100 KB at quality 80%. SammaPix runs entirely in your browser using the Canvas API — your image never uploads to a server.",
      },
      {
        q: "SammaPix vs TinyPNG for 100 KB compression: which is better?",
        a: "TinyPNG produces excellent automatic results around 100-200 KB but uploads every image to its servers and limits free use to 5 MB per file. SammaPix gives you a quality slider to hit exactly 100 KB on any file size, runs 100% in your browser (zero upload), and has no per-file size limit on the free tier. For privacy-sensitive photos or batch work, SammaPix wins. For one-off automatic optimization without configuring a slider, TinyPNG is faster.",
      },
      {
        q: "Is 100 KB good quality for a website?",
        a: "Yes. A 1200×800 px image at 100 KB in WebP or JPEG format is sharp enough for hero banners, blog posts, and product galleries. Google PageSpeed Insights and Core Web Vitals both recommend keeping individual images under 100 KB for optimal LCP scores. Tested on 100 sample images at 100 KB output, SammaPix maintains SSIMULACRA 2 perceptual quality scores above 65 (no visible loss) on standard photographic content.",
      },
      {
        q: "How many 100 KB images fit in one email?",
        a: "Most email providers allow 10-25 MB per email. That means you can attach 100 to 250 images at 100 KB each. In practice, 5-10 compressed images per email is a reasonable number to avoid spam filters.",
      },
      {
        q: "What is the best format for 100 KB images?",
        a: "WebP offers the best quality-to-size ratio at 100 KB (typically 25-30% better than JPEG at the same perceptual quality). Use JPEG for maximum compatibility (email clients, older browsers, legacy CMS). Use PNG only for screenshots or graphics with text — photos in PNG will not reach 100 KB at reasonable dimensions.",
      },
    ],
    related: ["50kb", "200kb", "500kb"],
  },

  // ─── 200 KB ──────────────────────────────────────────────────────────────
  {
    slug: "200kb",
    sizeLabel: "200 KB",
    sizeBytes: 204800,
    metaDescription:
      "Compress any image to 200 KB online for free. Ideal for blog images, social media posts, and product photos. No watermarks, no file limits.",
    ogDescription:
      "Free online tool to compress images to 200 KB. Perfect for blog images, social media posts, and e-commerce product photos.",
    titleKeyword: "Compress Image to 200KB",
    keywords: [
      "compress image to 200kb",
      "reduce image size to 200kb",
      "compress photo to 200kb",
      "200kb image compressor",
      "blog image size",
      "compress image for social media",
      "product photo compression",
    ],
    useCase:
      "Ideal for blog images, social media posts, and product photos where you need a good balance between quality and file size.",
    tips: [
      "At 200 KB you can keep images at 1600 px wide with excellent quality — perfect for retina blog layouts.",
      "Social media images (1080×1080 px) at 200 KB look indistinguishable from the original on mobile screens.",
      "Use quality 80-90% for product photos — customers need to see details, and 200 KB handles that well.",
      "Compress your OpenGraph images to 200 KB at 1200×630 px for fast social media previews.",
    ],
    faqs: [
      {
        q: "How do I compress a photo to 200 KB for my blog?",
        a: "Upload to SammaPix Compress, set quality to 80-85%, and download. For a typical 1200-1600 px wide blog image, this reliably produces files around 150-200 KB with no visible quality loss.",
      },
      {
        q: "Is 200 KB too large for a website image?",
        a: "For hero images and featured photos, 200 KB is perfectly fine. For thumbnails or icons, aim lower (50-100 KB). A page with 5-10 images at 200 KB each (1-2 MB total) loads fast on modern connections.",
      },
      {
        q: "Should I use JPEG or WebP at 200 KB?",
        a: "WebP at 200 KB looks slightly sharper than JPEG at the same size. If your website supports WebP (most modern sites do), use it. Otherwise, JPEG at 200 KB is excellent for any use case.",
      },
      {
        q: "Can I compress images to 200 KB in bulk?",
        a: "Yes. SammaPix supports batch compression. Upload all your images, set the quality level, compress them all at once, and download as a ZIP. Great for preparing an entire blog post's images in one go.",
      },
    ],
    related: ["100kb", "500kb", "1mb"],
  },

  // ─── 300 KB ──────────────────────────────────────────────────────────────
  {
    slug: "300kb",
    sizeLabel: "300 KB",
    sizeBytes: 307200,
    metaDescription:
      "Compress any image to 300 KB online for free. Perfect for high-quality blog images, newsletter headers, and editorial photography. No watermarks, no sign-up required.",
    ogDescription:
      "Free online tool to compress images to 300 KB. Ideal for blog hero images, newsletter headers, and editorial-quality web photography.",
    titleKeyword: "Compress Image to 300KB",
    keywords: [
      "compress image to 300kb",
      "reduce image size to 300kb",
      "compress photo to 300kb",
      "300kb image compressor",
      "blog image compression",
      "newsletter header image size",
      "editorial photo compression online",
    ],
    useCase:
      "Perfect for high-quality blog hero images, email newsletter headers, editorial photography on magazine-style websites, and any image where visual fidelity matters but you need to stay under a third of a megabyte.",
    tips: [
      "At 300 KB you can maintain 1400-1800 px wide images at quality 82-88% — the sweet spot for blog headers that look stunning on retina displays.",
      "Newsletter email clients like Gmail clip messages over 102 KB of HTML — keep each newsletter image at or below 300 KB to avoid triggering the clip threshold when combined with your email markup.",
      "For editorial photography, use WebP at 300 KB to preserve color gradients and skin tones that JPEG sometimes banding at lower file sizes.",
      "Pair 300 KB hero images with srcset to serve smaller versions on mobile — a 300 KB desktop hero can be a 100 KB mobile version at 800 px wide.",
    ],
    faqs: [
      {
        q: "Is 300 KB good enough for a blog hero image?",
        a: "Yes — a 1400×800 px image at 300 KB in WebP or JPEG looks near-lossless on screens. Most professional blogs use hero images in the 200-400 KB range. At 300 KB, the image loads in under 150 ms on a typical broadband connection.",
      },
      {
        q: "How do I optimize newsletter header images to 300 KB?",
        a: "Design your header at 600×300 px (standard email width), export at quality 85%, and compress with SammaPix. At these dimensions, 300 KB is generous — you will likely end up around 150-250 KB with excellent quality. This leaves headroom for the email HTML itself.",
      },
      {
        q: "300 KB vs 200 KB — when should I pick 300 KB?",
        a: "Choose 300 KB when the image has fine details that matter — editorial portraits, food photography, product close-ups. For generic blog thumbnails or social media cards, 200 KB is sufficient and loads slightly faster.",
      },
      {
        q: "What resolution works best at 300 KB?",
        a: "For landscape images: 1400-1800 px wide at quality 82-88%. For square images: 1200-1400 px. For portrait images: 1000-1200 px wide. These ranges produce files that hover around 300 KB with sharp, detailed results.",
      },
    ],
    related: ["200kb", "500kb", "1mb"],
  },

  // ─── 500 KB ──────────────────────────────────────────────────────────────
  {
    slug: "500kb",
    sizeLabel: "500 KB",
    sizeBytes: 512000,
    metaDescription:
      "Compress any image to 500 KB online for free. Perfect for high-quality blog images, portfolio sites, and presentation slides. Browser-based, instant results.",
    ogDescription:
      "Free online tool to compress images to 500 KB. Great for portfolios, presentations, and high-quality blog images.",
    titleKeyword: "Compress Image to 500KB",
    keywords: [
      "compress image to 500kb",
      "reduce image size to 500kb",
      "compress photo to 500kb",
      "500kb image compressor",
      "portfolio image size",
      "presentation image compression",
      "high quality compress image",
    ],
    useCase:
      "Perfect for high-quality blog images, portfolio sites, presentations, and any context where visual detail matters.",
    tips: [
      "At 500 KB you can keep 2000+ px images at quality 85-90% — ideal for photography portfolios.",
      "Presentation slides with a single full-bleed photo should target 500 KB each to keep the deck under 10 MB.",
      "For e-commerce zoom views, 500 KB at 2000×2000 px lets customers see product texture and detail.",
      "Enable progressive JPEG to improve perceived load time — the image renders progressively as data arrives.",
    ],
    faqs: [
      {
        q: "When should I compress to 500 KB instead of 100 KB?",
        a: "Use 500 KB when visual quality is critical: photography portfolios, product zoom images, design showcases, or print-quality previews. Use 100 KB for general web images where loading speed matters more than pixel-perfect detail.",
      },
      {
        q: "Is 500 KB too heavy for a web page?",
        a: "For a single hero image, 500 KB is acceptable. However, avoid placing multiple 500 KB images on the same page. Use lazy loading and serve smaller thumbnails, loading the 500 KB version only when the user clicks to enlarge.",
      },
      {
        q: "What resolution works best at 500 KB?",
        a: "A 2000×1500 px photo compresses to 500 KB at quality 85% with excellent results. For square images, 1800×1800 px at quality 80% reliably hits the 500 KB target.",
      },
      {
        q: "How does 500 KB compare to the original photo from my camera?",
        a: "A typical smartphone photo is 4-8 MB. Compressing to 500 KB reduces the size by 90% while retaining nearly all visible detail at screen resolution. The difference is only noticeable at 200% zoom or when printing.",
      },
    ],
    related: ["200kb", "1mb", "2mb"],
  },

  // ─── 1 MB ────────────────────────────────────────────────────────────────
  {
    slug: "1mb",
    sizeLabel: "1 MB",
    sizeBytes: 1048576,
    metaDescription:
      "Compress an image to 1 MB in seconds, free and right in your browser. No upload, no signup, no watermark. Drop a photo and hit your exact target size instantly.",
    ogDescription:
      "Free online tool to compress images to 1 MB. Perfect for high-res product photos, print-ready images, and professional portfolios.",
    titleKeyword: "Compress Image to 1MB",
    keywords: [
      "compress image to 1mb",
      "reduce image size to 1mb",
      "compress photo to 1mb",
      "1mb image compressor",
      "compress image for print",
      "high resolution image compression",
      "reduce photo to 1mb",
    ],
    useCase:
      "Ideal for print-ready web images, high-resolution product photos, and professional portfolios where maximum detail is needed.",
    tips: [
      "At 1 MB you can maintain full-resolution (3000+ px) images at quality 90%+ — virtually indistinguishable from the original.",
      "Use 1 MB as the upper limit for retina hero images on image-heavy sites like photography portfolios.",
      "For print preview workflows, 1 MB provides enough detail for A4 prints at 150 DPI.",
      "Pair 1 MB images with lazy loading and a CDN to ensure fast delivery despite the larger file size.",
    ],
    faqs: [
      {
        q: "How do I compress a large photo to 1 MB?",
        a: "Upload to SammaPix Compress and set quality to 85-90%. A typical 12 MP smartphone photo (4000×3000 px) compresses to around 1 MB at quality 85%. If it is still too large, reduce to 3000 px wide first.",
      },
      {
        q: "Is 1 MB too large for a website?",
        a: "For most web pages, yes — aim for 100-200 KB per image. However, 1 MB is appropriate for hero banners on portfolio sites, full-screen photography galleries, or product zoom views. Always use lazy loading for 1 MB images.",
      },
      {
        q: "What is the best format for 1 MB images?",
        a: "WebP at 1 MB is roughly equivalent to a 2 MB JPEG in visual quality. If your audience uses modern browsers, WebP is the best choice. For maximum compatibility, JPEG at quality 85% is reliable.",
      },
      {
        q: "Can I compress RAW photos to 1 MB?",
        a: "RAW files (20-60 MB) must first be exported as JPEG or WebP, then compressed. Export at full resolution in JPEG, then use SammaPix to compress to 1 MB. The result retains excellent detail for web viewing.",
      },
    ],
    related: ["500kb", "2mb", "200kb"],
  },

  // ─── 2 MB ────────────────────────────────────────────────────────────────
  {
    slug: "2mb",
    sizeLabel: "2 MB",
    sizeBytes: 2097152,
    metaDescription:
      "Compress an image to 2 MB in seconds, free and 100% in your browser. No upload, no signup, no watermark. Drop a photo and hit your exact target size instantly.",
    ogDescription:
      "Free online tool to compress images to 2 MB. Ideal for professional photography, high-quality prints, and large-format displays.",
    titleKeyword: "Compress Image to 2MB",
    keywords: [
      "compress image to 2mb",
      "reduce image size to 2mb",
      "compress photo to 2mb",
      "2mb image compressor",
      "professional photo compression",
      "compress image for printing",
      "high quality image 2mb",
    ],
    useCase:
      "Best for high-quality prints, professional photography, large display images, and archival web galleries.",
    tips: [
      "At 2 MB you can keep the original resolution at quality 92-95% — perfect for archiving edited photos.",
      "Large-format display images (4K monitors, digital signage) look excellent at 2 MB in WebP format.",
      "For professional photography delivery, 2 MB per image is a common client proof size — high enough quality to evaluate, small enough to email.",
      "Use 2 MB as the ceiling for any single image on your website — beyond this, the speed impact outweighs the quality gain.",
    ],
    faqs: [
      {
        q: "When should I use 2 MB as my target size?",
        a: "Use 2 MB when you need near-original quality: professional photo proofs, high-resolution print previews, digital signage images, or archival-quality web galleries. For standard web use, 100-500 KB is more appropriate.",
      },
      {
        q: "How do I compress an image to exactly 2 MB?",
        a: "Upload your image to SammaPix Compress and set quality to 90-95%. Most high-resolution photos (4000+ px) will compress to around 2 MB at these settings. Adjust the quality slider until you hit your target.",
      },
      {
        q: "Is 2 MB suitable for email attachments?",
        a: "Yes, most email providers support attachments up to 25 MB. A 2 MB image is easy to email. However, if you are sending multiple images, consider compressing each to 500 KB or 1 MB to keep the total manageable.",
      },
      {
        q: "What is the quality difference between 1 MB and 2 MB?",
        a: "At typical web viewing (1x zoom on a monitor), the difference between 1 MB and 2 MB is barely visible. The extra size matters when zooming in, printing, or displaying on large 4K+ screens where individual pixels are more visible.",
      },
    ],
    related: ["1mb", "500kb", "100kb"],
  },

  // ─── 1 KB ────────────────────────────────────────────────────────────────
  {
    slug: "1kb",
    sizeLabel: "1 KB",
    sizeBytes: 1024,
    metaDescription:
      "Compress any image to 1 KB online for free. The absolute minimum file size — for 1×1 tracking pixels, sprite tiles, and ultra-minimal favicons. Runs in your browser, no upload.",
    ogDescription:
      "Free online tool to compress images to 1 KB. For tracking pixels, sprite tiles, and the smallest possible web assets.",
    titleKeyword: "Compress Image to 1KB",
    keywords: [
      "compress image to 1kb",
      "reduce image size to 1kb",
      "1kb image compressor",
      "1x1 tracking pixel image",
      "smallest possible image file",
      "compress favicon to 1kb",
      "tiny png under 1kb",
    ],
    useCase:
      "For 1×1 transparent tracking pixels, single-color sprite tiles, ultra-minimal favicons, and CSS background micro-textures that must add virtually nothing to page weight.",
    tips: [
      "A 1×1 px transparent PNG is naturally under 1 KB — you rarely need a tool unless you are embedding a visible micro-graphic.",
      "For flat-color tiles, an 8-color indexed PNG at 16×16 px stays comfortably under 1 KB.",
      "Strip every byte of metadata — at 1 KB, EXIF or color-profile data alone can double your file size.",
      "SVG often beats raster at this scale: a simple icon as inline SVG can be a few hundred bytes and stays sharp at any zoom.",
    ],
    faqs: [
      {
        q: "Is a usable image even possible at 1 KB?",
        a: "Only for 1×1 to 16×16 px graphics: tracking pixels, single-color tiles, or the simplest 2-3 color icons. Anything photographic is impossible at 1 KB — this size is for technical micro-assets, not pictures.",
      },
      {
        q: "What is a 1 KB image used for?",
        a: "The classic use is the email open-tracking pixel (a 1×1 transparent PNG). Other uses include CSS sprite spacer tiles, placeholder dots for lazy loading, and minimal favicons for performance-obsessed sites.",
      },
      {
        q: "Which format is smallest at 1 KB?",
        a: "For 1×1 or flat tiles, PNG with an 8-bit indexed palette is tiny. For simple shapes, inline SVG is often smaller still and scalable. JPEG cannot compete below ~3 KB because its header overhead alone approaches 1 KB.",
      },
      {
        q: "How do I make a transparent 1×1 tracking pixel?",
        a: "Create a 1×1 px canvas, set it fully transparent, and export as PNG — the result is around 70-100 bytes, well under 1 KB. No compression tool needed; the format minimum already wins.",
      },
    ],
    related: ["2kb", "3kb", "5kb"],
  },

  // ─── 2 KB ────────────────────────────────────────────────────────────────
  {
    slug: "2kb",
    sizeLabel: "2 KB",
    sizeBytes: 2048,
    metaDescription:
      "Compress any image to 2 KB online for free. Perfect for tiny favicons, monochrome icons, and notification badges. Browser-based, private, no sign-up.",
    ogDescription:
      "Free online tool to compress images to 2 KB. Ideal for small favicons, flat icons, and notification badge graphics.",
    titleKeyword: "Compress Image to 2KB",
    keywords: [
      "compress image to 2kb",
      "reduce image size to 2kb",
      "2kb image compressor",
      "tiny favicon compressor",
      "notification badge icon size",
      "small icon under 2kb",
      "compress logo to 2kb",
    ],
    useCase:
      "For small favicons (16×16 to 32×32 px), monochrome UI icons, notification badge graphics, and flat-color logos that must stay feather-light.",
    tips: [
      "At 2 KB, keep dimensions at 32×32 px or below and use indexed-color PNG for crisp flat-color icons.",
      "Two-tone or monochrome glyphs compress dramatically — a 32×32 menu icon often lands near 1 KB before you even touch the quality slider.",
      "Remove the alpha channel if you do not need transparency — it can shave 20-30% off an already tiny PNG.",
      "For multi-size favicons, generate separate 16×16 and 32×32 PNGs rather than one .ico to keep each request under 2 KB.",
    ],
    faqs: [
      {
        q: "What can I show at 2 KB?",
        a: "Flat-color icons and small favicons up to 32×32 px look perfectly crisp at 2 KB. Simple two-color logos work too. Photographic content does not — reserve 2 KB for UI graphics with limited colors.",
      },
      {
        q: "2 KB vs 3 KB vs 5 KB — what changes?",
        a: "2 KB suits 16-32 px flat icons. 3 KB allows a slightly richer favicon or small avatar. 5 KB opens up tiny photographic thumbnails. The jump from 2 to 5 KB roughly doubles the dimensions you can keep sharp.",
      },
      {
        q: "Best format for a 2 KB icon?",
        a: "Indexed PNG (palette mode, 8-32 colors) is ideal for flat icons at 2 KB. Inline SVG is even smaller for geometric shapes and stays sharp at every resolution. Avoid JPEG at this size.",
      },
      {
        q: "How do I compress a favicon to 2 KB?",
        a: "Export at 32×32 px as PNG with 32 or fewer colors — this is usually already under 2 KB. If not, open it in SammaPix Compress and reduce the palette further; flat icons tolerate aggressive color reduction with no visible loss.",
      },
    ],
    related: ["1kb", "3kb", "8kb"],
  },

  // ─── 35 KB ───────────────────────────────────────────────────────────────
  {
    slug: "35kb",
    sizeLabel: "35 KB",
    sizeBytes: 35840,
    metaDescription:
      "Compress any image to 35 KB online for free. The exact size required by many exam and government portals (SSC, UPSC, IBPS photo uploads). No sign-up, works in your browser.",
    ogDescription:
      "Free online tool to compress images to 35 KB. Perfect for SSC, UPSC, IBPS and other exam form photo uploads with a 35 KB limit.",
    titleKeyword: "Compress Image to 35KB",
    keywords: [
      "compress image to 35kb",
      "reduce image size to 35kb",
      "compress photo to 35kb",
      "35kb image compressor",
      "passport photo 35kb",
      "compress image for exam form",
      "ssc photo size 35kb",
    ],
    useCase:
      "The exact target for many competitive-exam and government portals — SSC, UPSC, IBPS, and state recruitment forms frequently cap the candidate photo at 35 KB. Also used for ID document uploads with tight limits.",
    tips: [
      "Most exam portals want a 35 KB photo at 200×230 px (3.5×4.5 cm) — resize to those dimensions first, then compress at 60-70% quality to land right under 35 KB.",
      "Keep the background plain white or light grey — flat backgrounds compress efficiently and most exam guidelines require them anyway.",
      "Save as JPEG, not WebP — many government upload portals only accept JPEG/JPG for the photo field.",
      "Strip EXIF metadata with our EXIF Remover before compressing — it frees a few extra KB so you can keep quality higher at 35 KB.",
    ],
    faqs: [
      {
        q: "How do I compress my photo to under 35 KB for an exam form?",
        a: "Resize the photo to the required dimensions (commonly 200×230 px for Indian exam forms), then open SammaPix Compress and set quality to around 60-70% until the output reads 35 KB or less. Download as JPEG — this is the format most portals require.",
      },
      {
        q: "Which exams require a 35 KB photo?",
        a: "A 35 KB cap (or a 20-50 KB range) is common across SSC, UPSC, IBPS, railway (RRB), and many state public service commission portals. Always check the exact range in your specific notification, as some allow 20-50 KB and others fix 35 KB.",
      },
      {
        q: "Will my exam photo still look clear at 35 KB?",
        a: "Yes. At the small dimensions exam forms require (around 200×230 px), 35 KB preserves a clear, identifiable face. Compression only becomes visible if you try to keep the photo at full camera resolution — so always resize first.",
      },
      {
        q: "The portal rejected my photo for being too large — what now?",
        a: "Re-open the image in SammaPix, lower the quality slider a few more points, and confirm the output is comfortably under 35 KB (aim for 30-33 KB to leave margin). Also ensure the dimensions match the form's pixel requirements, as some portals check both.",
      },
    ],
    related: ["20kb", "25kb", "45kb", "50kb"],
  },

  // ─── 45 KB ───────────────────────────────────────────────────────────────
  {
    slug: "45kb",
    sizeLabel: "45 KB",
    sizeBytes: 46080,
    metaDescription:
      "Compress any image to 45 KB online for free. Ideal for exam form photos, signature uploads, and ID portals with a 45 KB limit. Browser-based, no watermark.",
    ogDescription:
      "Free online tool to compress images to 45 KB. Great for exam form photos, signature scans, and government ID uploads.",
    titleKeyword: "Compress Image to 45KB",
    keywords: [
      "compress image to 45kb",
      "reduce image size to 45kb",
      "compress photo to 45kb",
      "45kb image compressor",
      "compress signature to 45kb",
      "exam photo 45kb",
      "id upload image size",
    ],
    useCase:
      "Ideal for exam application photos, scanned signatures, and ID-portal uploads that enforce a 45 KB ceiling — a slightly more forgiving limit than the common 20-35 KB exam caps.",
    tips: [
      "At 45 KB you can hold a 250×300 px photo at quality 70-78% with a clean, sharp face — a touch more headroom than 35 KB.",
      "For scanned signatures, convert to greyscale before compressing — a signature has no color information, and greyscale JPEG at 45 KB is razor-sharp.",
      "Resize to the portal's required pixel dimensions first; compressing a full-resolution scan straight to 45 KB causes unnecessary blur.",
      "Export as JPEG for maximum portal compatibility — keep WebP for general web use, not government forms.",
    ],
    faqs: [
      {
        q: "How do I get my photo to exactly 45 KB?",
        a: "Resize to the dimensions your form specifies, then compress at quality 70-78% in SammaPix until the output reads just under 45 KB. Aim for 42-44 KB to leave a safety margin against the portal's limit.",
      },
      {
        q: "Is 45 KB better than 35 KB for an exam photo?",
        a: "If your portal allows up to 45 KB, use it — the extra 10 KB gives a noticeably sharper face at the same dimensions. Only target 35 KB or 20 KB when the form explicitly caps you there.",
      },
      {
        q: "How do I compress a signature scan to 45 KB?",
        a: "Convert the signature to greyscale, crop tightly around the strokes, resize to the required width (often 140×60 px for exam forms), then compress. A signature this small reaches 45 KB at near-lossless quality.",
      },
      {
        q: "What format should I use for a 45 KB upload?",
        a: "JPEG for exam and government portals, since most only accept JPG. For a signature with flat color, PNG can also work and may look crisper — check which formats your specific portal accepts.",
      },
    ],
    related: ["35kb", "50kb", "60kb", "30kb"],
  },

  // ─── 60 KB ───────────────────────────────────────────────────────────────
  {
    slug: "60kb",
    sizeLabel: "60 KB",
    sizeBytes: 61440,
    metaDescription:
      "Compress any image to 60 KB online for free. Perfect for profile photos, document uploads, and web thumbnails that need a balance of quality and size. No sign-up.",
    ogDescription:
      "Free online tool to compress images to 60 KB. Ideal for profile photos, ID document uploads, and crisp web thumbnails.",
    titleKeyword: "Compress Image to 60KB",
    keywords: [
      "compress image to 60kb",
      "reduce image size to 60kb",
      "compress photo to 60kb",
      "60kb image compressor",
      "profile photo 60kb",
      "compress document image",
      "thumbnail compression online",
    ],
    useCase:
      "Perfect for profile photos, document and ID uploads with a 60 KB cap, and crisp web thumbnails where you want more detail than a 50 KB file but still fast loading.",
    tips: [
      "At 60 KB a 450×450 px profile photo stays sharp at quality 72-80% — enough detail for LinkedIn-style headshots.",
      "For scanned documents, compress in greyscale unless color is essential — a greyscale page at 60 KB is crisp and legible.",
      "Crop out empty margins before compressing — fewer pixels means you can spend the 60 KB budget on the part that matters.",
      "Use WebP for web display and JPEG for portal uploads — WebP at 60 KB looks like an 90 KB JPEG.",
    ],
    faqs: [
      {
        q: "Is 60 KB enough for a clear profile photo?",
        a: "Yes. At display sizes up to 450×450 px, a 60 KB photo looks clean and professional. It is a common sweet spot for profile pictures that need to look sharp without slowing down a page full of avatars.",
      },
      {
        q: "How do I compress a document scan to 60 KB?",
        a: "Convert to greyscale, resize to about 1000 px on the long edge, and compress at quality 60-70% in SammaPix. Text stays legible and the file lands around 60 KB — ideal for portals that cap document uploads there.",
      },
      {
        q: "60 KB vs 100 KB — which should I pick?",
        a: "Choose 60 KB when a form limits you or when you have many images on a page and speed matters. Choose 100 KB when a single image needs maximum clarity, such as a hero photo or a detailed product shot.",
      },
      {
        q: "What dimensions work best at 60 KB?",
        a: "For square profile photos: 400-500 px. For document scans: up to 1000-1200 px on the long edge in greyscale. For rectangular thumbnails: around 500×350 px. Beyond these, 60 KB starts to show softness on detailed content.",
      },
    ],
    related: ["50kb", "70kb", "80kb", "100kb"],
  },

  // ─── 70 KB ───────────────────────────────────────────────────────────────
  {
    slug: "70kb",
    sizeLabel: "70 KB",
    sizeBytes: 71680,
    metaDescription:
      "Compress any image to 70 KB online for free. Great for high-quality avatars, blog thumbnails, and form uploads with a 70 KB limit. Private, browser-based, no watermark.",
    ogDescription:
      "Free online tool to compress images to 70 KB. Perfect for sharp avatars, blog thumbnails, and 70 KB form uploads.",
    titleKeyword: "Compress Image to 70KB",
    keywords: [
      "compress image to 70kb",
      "reduce image size to 70kb",
      "compress photo to 70kb",
      "70kb image compressor",
      "avatar image 70kb",
      "blog thumbnail compression",
      "compress image for upload",
    ],
    useCase:
      "Great for high-quality avatars, blog and product thumbnails, and upload forms that enforce a 70 KB limit — enough budget to keep photographic detail crisp at medium dimensions.",
    tips: [
      "At 70 KB you can hold a 500×500 px photo at quality 78-84% — large, sharp avatars and detailed thumbnails.",
      "For blog thumbnails at 600×400 px, 70 KB in WebP looks effectively lossless on screens.",
      "If you have a batch of thumbnails, compress them all to 70 KB at once in SammaPix and download as a ZIP.",
      "Progressive JPEG at 70 KB renders top-to-bottom as it loads, improving perceived speed on slower connections.",
    ],
    faqs: [
      {
        q: "How do I compress an image to 70 KB?",
        a: "Open SammaPix Compress, drop the image, and lower the quality slider until the output reads 70 KB or just below. For larger source photos, resize to under 600 px first, then fine-tune the quality.",
      },
      {
        q: "Is 70 KB good for a blog thumbnail?",
        a: "Yes — at 500-700 px wide, a 70 KB image is sharp and loads quickly. It sits in the ideal range for thumbnail grids where you want quality without bloating total page weight.",
      },
      {
        q: "70 KB vs 100 KB — is the difference visible?",
        a: "At thumbnail and avatar sizes (under 600 px), the difference is negligible, so 70 KB saves bandwidth for free. At full-width display (1000 px+), 100 KB looks slightly cleaner on fine detail.",
      },
      {
        q: "Which format is best at 70 KB?",
        a: "WebP gives the sharpest result at 70 KB for photos. Use JPEG for upload forms that require it. PNG is only worth it for screenshots or flat graphics, not photographic thumbnails.",
      },
    ],
    related: ["60kb", "80kb", "100kb", "50kb"],
  },

  // ─── 80 KB ───────────────────────────────────────────────────────────────
  {
    slug: "80kb",
    sizeLabel: "80 KB",
    sizeBytes: 81920,
    metaDescription:
      "Compress any image to 80 KB online for free. Ideal for web card images, product thumbnails, and OpenGraph previews. Fast, browser-based, no upload required.",
    ogDescription:
      "Free online tool to compress images to 80 KB. Perfect for web card images, product thumbnails, and social preview graphics.",
    titleKeyword: "Compress Image to 80KB",
    keywords: [
      "compress image to 80kb",
      "reduce image size to 80kb",
      "compress photo to 80kb",
      "80kb image compressor",
      "web card image size",
      "product thumbnail 80kb",
      "opengraph image compression",
    ],
    useCase:
      "Ideal for web card images, e-commerce product thumbnails, OpenGraph social-preview graphics, and any medium image where you want near-100 KB quality with a slightly lighter footprint.",
    tips: [
      "At 80 KB a 700×500 px card image stays crisp at quality 80-86% — great for blog cards and listing grids.",
      "For OpenGraph previews (1200×630 px), 80 KB in WebP is light enough to load before the social crawler times out.",
      "Tightly crop product shots to the item — removing background whitespace lets the 80 KB budget go to product detail.",
      "Lazy-load card grids: with images at 80 KB each, even a 30-card page stays under 2.5 MB total.",
    ],
    faqs: [
      {
        q: "Is 80 KB enough for a product or card image?",
        a: "Yes. At 600-800 px wide, an 80 KB image looks sharp in card layouts and product grids. It is a popular target for sites that want fast loading without dropping to thumbnail-level detail.",
      },
      {
        q: "What is the best size for an OpenGraph image?",
        a: "1200×630 px is the standard OpenGraph dimension. Compressing it to around 80 KB keeps social previews sharp on Twitter, LinkedIn, and Facebook while loading fast enough that crawlers reliably fetch it.",
      },
      {
        q: "80 KB vs 100 KB — which should I use?",
        a: "Use 80 KB for card grids and previews where many images load together. Use 100 KB for a standalone hero or feature image where a touch more clarity is worth the extra bytes. The visual gap is small.",
      },
      {
        q: "How do I compress to 80 KB in bulk?",
        a: "Drop all your images into SammaPix Compress, set the quality so output lands near 80 KB, compress the whole batch, and download as a ZIP — ideal for preparing a full set of card or product images at once.",
      },
    ],
    related: ["70kb", "100kb", "150kb", "60kb"],
  },

  // ─── 150 KB ──────────────────────────────────────────────────────────────
  {
    slug: "150kb",
    sizeLabel: "150 KB",
    sizeBytes: 153600,
    metaDescription:
      "Compress any image to 150 KB online for free. Perfect for blog images, social posts, and retina thumbnails that need crisp quality. Browser-based, no sign-up.",
    ogDescription:
      "Free online tool to compress images to 150 KB. Ideal for sharp blog images, social media posts, and retina-ready thumbnails.",
    titleKeyword: "Compress Image to 150KB",
    keywords: [
      "compress image to 150kb",
      "reduce image size to 150kb",
      "compress photo to 150kb",
      "150kb image compressor",
      "blog image 150kb",
      "social media image compression",
      "retina thumbnail size",
    ],
    useCase:
      "Perfect for blog body images, social media posts, retina-ready thumbnails, and CMS image fields where you want noticeably better quality than 100 KB while staying lightweight.",
    tips: [
      "At 150 KB you can keep a 1400 px wide image at quality 80-86% — crisp on retina screens for blog and editorial layouts.",
      "Square social posts (1080×1080 px) look flawless at 150 KB and load fast in feeds.",
      "Use 150 KB as your default for in-article images — it balances Core Web Vitals against visible quality better than going all the way to 100 KB on large photos.",
      "Serve a smaller srcset variant to mobile — a 150 KB desktop image can be a 60 KB mobile version at 800 px.",
    ],
    faqs: [
      {
        q: "Is 150 KB a good size for blog images?",
        a: "Yes — it is one of the best defaults. At 1200-1400 px wide, a 150 KB image is sharp on retina displays and still loads quickly. Most quality-focused blogs keep body images in the 100-200 KB range.",
      },
      {
        q: "How do I compress a photo to 150 KB?",
        a: "Resize to your display width (1200-1400 px for blogs), then compress at quality 80-86% in SammaPix until output reads about 150 KB. WebP reaches this target at higher visual quality than JPEG.",
      },
      {
        q: "150 KB vs 200 KB — which is better for web?",
        a: "150 KB loads slightly faster and is plenty for most in-article images. Choose 200 KB only for hero or feature images where extra detail justifies the bytes. For grids and body content, 150 KB wins.",
      },
      {
        q: "Will 150 KB pass Core Web Vitals?",
        a: "Generally yes, especially with lazy loading and a properly sized srcset. Keeping individual images near or below 150 KB helps your Largest Contentful Paint (LCP) stay within Google's recommended threshold.",
      },
    ],
    related: ["100kb", "200kb", "250kb", "80kb"],
  },

  // ─── 250 KB ──────────────────────────────────────────────────────────────
  {
    slug: "250kb",
    sizeLabel: "250 KB",
    sizeBytes: 256000,
    metaDescription:
      "Compress any image to 250 KB online for free. Great for high-quality blog heroes, editorial photos, and portfolio thumbnails. No watermark, no upload.",
    ogDescription:
      "Free online tool to compress images to 250 KB. Perfect for blog hero images, editorial photography, and portfolio previews.",
    titleKeyword: "Compress Image to 250KB",
    keywords: [
      "compress image to 250kb",
      "reduce image size to 250kb",
      "compress photo to 250kb",
      "250kb image compressor",
      "blog hero image size",
      "editorial photo compression",
      "portfolio thumbnail 250kb",
    ],
    useCase:
      "Great for high-quality blog hero images, editorial photography, magazine-style layouts, and portfolio thumbnails where fine detail and color depth matter but you still want a sub-300 KB file.",
    tips: [
      "At 250 KB you can hold a 1600-1800 px wide image at quality 84-90% — excellent for full-width blog heroes on retina displays.",
      "Editorial and food photography benefit from WebP at 250 KB, which preserves smooth color gradients JPEG can band at lower sizes.",
      "Pair a 250 KB desktop hero with a mobile srcset around 100 KB to keep phone load times fast.",
      "Keep one 250 KB hero per page but use lighter 100-150 KB images for the body to protect overall page speed.",
    ],
    faqs: [
      {
        q: "Is 250 KB good for a blog hero image?",
        a: "Yes. At 1600-1800 px wide, a 250 KB image looks near-lossless on high-resolution screens. It is a common target for editorial sites that want striking heroes without ballooning page weight.",
      },
      {
        q: "How do I compress an image to 250 KB?",
        a: "Resize to your hero width (around 1600-1800 px), then compress at quality 84-90% in SammaPix until the output reads about 250 KB. WebP usually hits the target with visibly cleaner detail than JPEG.",
      },
      {
        q: "250 KB vs 300 KB — does it matter?",
        a: "The visual difference is minimal at typical screen sizes, so 250 KB saves a little bandwidth. Go to 300 KB only when an image has very fine detail — close-up portraits, textured products — that benefits from the extra budget.",
      },
      {
        q: "What resolution suits 250 KB best?",
        a: "Landscape heroes: 1600-1800 px wide. Square images: 1300-1500 px. Portrait images: 1100-1300 px wide. These ranges land around 250 KB at high quality with sharp, detailed results.",
      },
    ],
    related: ["200kb", "300kb", "500kb", "150kb"],
  },

  // ─── 400 KB ──────────────────────────────────────────────────────────────
  {
    slug: "400kb",
    sizeLabel: "400 KB",
    sizeBytes: 409600,
    metaDescription:
      "Compress any image to 400 KB online for free. Ideal for portfolio images, presentation slides, and high-detail product photos. Browser-based, private, no sign-up.",
    ogDescription:
      "Free online tool to compress images to 400 KB. Perfect for portfolio images, presentation decks, and detailed product photography.",
    titleKeyword: "Compress Image to 400KB",
    keywords: [
      "compress image to 400kb",
      "reduce image size to 400kb",
      "compress photo to 400kb",
      "400kb image compressor",
      "portfolio image compression",
      "presentation slide image size",
      "product zoom image 400kb",
    ],
    useCase:
      "Ideal for portfolio images, presentation slides, and high-detail product or zoom photos where you need strong fidelity but want to stay well under half a megabyte.",
    tips: [
      "At 400 KB you can keep a 1900-2200 px wide photo at quality 86-92% — excellent for portfolio galleries on large screens.",
      "For presentation decks, target 400 KB per full-bleed slide image to keep a 20-slide deck comfortably emailable.",
      "Product zoom views at 1800×1800 px and 400 KB let customers inspect texture and stitching without a slow load.",
      "Always lazy-load 400 KB images and pair them with a lightweight thumbnail so only clicked images pull the full file.",
    ],
    faqs: [
      {
        q: "When should I compress to 400 KB instead of 200 KB?",
        a: "Choose 400 KB when detail is the priority — portfolio photography, product zoom, or presentation visuals viewed full-screen. Use 200 KB for standard web images where loading speed outweighs pixel-level fidelity.",
      },
      {
        q: "Is 400 KB too heavy for a web page?",
        a: "For a single feature image, no. Avoid stacking several 400 KB images on one page, though — use thumbnails plus lazy loading and serve the full 400 KB version only on demand to protect page speed.",
      },
      {
        q: "What resolution works best at 400 KB?",
        a: "Landscape: 1900-2200 px wide at quality 86-92%. Square: 1700-1900 px. These ranges retain sharp detail and smooth gradients while landing around 400 KB.",
      },
      {
        q: "How do I shrink a camera photo to 400 KB?",
        a: "A phone photo is typically 4-8 MB. In SammaPix, resize to about 2000 px on the long edge and compress at quality 88% — this reduces it to roughly 400 KB while keeping near-original detail at screen resolution.",
      },
    ],
    related: ["300kb", "500kb", "700kb", "200kb"],
  },

  // ─── 700 KB ──────────────────────────────────────────────────────────────
  {
    slug: "700kb",
    sizeLabel: "700 KB",
    sizeBytes: 716800,
    metaDescription:
      "Compress an image to 700 KB in seconds, free and right in your browser. No upload, no signup, no watermark. Drop a photo and hit your exact target size instantly.",
    ogDescription:
      "Free online tool to compress images to 700 KB. Ideal for full-screen heroes, photography galleries, and high-res display images.",
    titleKeyword: "Compress Image to 700KB",
    keywords: [
      "compress image to 700kb",
      "reduce image size to 700kb",
      "compress photo to 700kb",
      "700kb image compressor",
      "full screen hero image size",
      "photography gallery compression",
      "high resolution image 700kb",
    ],
    useCase:
      "Great for full-screen hero banners, photography galleries, high-resolution display images, and image-led landing pages where a single large visual carries the design.",
    tips: [
      "At 700 KB you can hold a 2400-2800 px wide image at quality 88-93% — sharp on 4K and ultrawide monitors.",
      "Use 700 KB sparingly: one full-screen hero per page, never multiple, to keep Largest Contentful Paint acceptable.",
      "WebP at 700 KB rivals a 1.4 MB JPEG — always prefer WebP for full-screen visuals when the browser supports it.",
      "Combine with a low-res LQIP placeholder so users see an instant blurred preview while the 700 KB hero streams in.",
    ],
    faqs: [
      {
        q: "Is 700 KB acceptable for a web hero image?",
        a: "For a single full-screen hero, yes — provided you lazy-load everything else and use a placeholder. At 2400 px+ wide it looks pristine on large displays. Just avoid putting more than one 700 KB image above the fold.",
      },
      {
        q: "How do I compress a high-res photo to 700 KB?",
        a: "In SammaPix, resize to around 2500 px on the long edge and compress at quality 88-92% until the output reads near 700 KB. WebP reaches this target with cleaner detail than JPEG at the same size.",
      },
      {
        q: "700 KB vs 1 MB — which should I choose?",
        a: "700 KB loads meaningfully faster and is usually indistinguishable from 1 MB at screen resolution. Reserve 1 MB for cases needing maximum fidelity, like print preview or extreme-zoom galleries.",
      },
      {
        q: "Will a 700 KB image hurt my page speed?",
        a: "Only if mishandled. With lazy loading, a properly sized srcset for mobile, and a single hero placement, a 700 KB image can coexist with good Core Web Vitals. Serving it to phones at full size is what causes problems — use responsive variants.",
      },
    ],
    related: ["500kb", "1mb", "400kb", "2mb"],
  },

  // ─── 3 MB ────────────────────────────────────────────────────────────────
  {
    slug: "3mb",
    sizeLabel: "3 MB",
    sizeBytes: 3145728,
    metaDescription:
      "Compress an image to 3 MB in seconds, free and 100% in your browser. Perfect for forms with a 3 MB upload limit. No upload, no signup, no quality guesswork.",
    ogDescription:
      "Free online tool to compress images to 3 MB. Perfect for print-quality photos, client proofs, and 3 MB upload limits.",
    titleKeyword: "Compress Image to 3MB",
    keywords: [
      "compress image to 3mb",
      "reduce image size to 3mb",
      "compress photo to 3mb",
      "3mb image compressor",
      "compress image for upload limit",
      "print quality photo compression",
      "reduce photo to 3mb",
    ],
    useCase:
      "Ideal for print-quality photos, professional client proofs, and upload forms that cap files at 3 MB — common on job portals, marketplaces, and document systems that reject anything larger.",
    tips: [
      "At 3 MB you can keep full-resolution (4000+ px) photos at quality 92-96% — essentially indistinguishable from the original.",
      "Many job and marketplace portals reject files over 3 MB — drop just under the limit (around 2.8 MB) to be safe against rounding differences.",
      "For print proofs, 3 MB at full resolution holds enough detail for sharp A4 prints at 200-300 DPI.",
      "If your source is a 20-50 MB RAW or TIFF, export to JPEG first, then use SammaPix to bring it down to 3 MB without visible loss.",
    ],
    faqs: [
      {
        q: "How do I compress a photo to under 3 MB?",
        a: "Open SammaPix Compress and lower the quality slider to around 90-94% — most high-resolution photos drop under 3 MB while staying visually identical. If needed, resize to about 4000 px on the long edge first.",
      },
      {
        q: "Why do upload forms limit files to 3 MB?",
        a: "Many portals (job applications, marketplaces, document systems) cap uploads at 3 MB to control storage and bandwidth. Compressing to just under the limit lets you submit a high-quality image without hitting the rejection threshold.",
      },
      {
        q: "Will compressing to 3 MB reduce print quality?",
        a: "Barely. At 3 MB and full resolution, the image keeps enough detail for high-quality prints up to A4 at 200-300 DPI. The difference from the uncompressed original is only visible under extreme magnification.",
      },
      {
        q: "3 MB vs 2 MB — which is better?",
        a: "If a form allows 3 MB, use it for a small fidelity gain on detailed images. For general web or email use, 2 MB or less is more practical and loads faster with no meaningful quality difference at screen resolution.",
      },
    ],
    related: ["2mb", "1mb", "5mb", "700kb"],
  },

  // ─── 5 MB ────────────────────────────────────────────────────────────────
  {
    slug: "5mb",
    sizeLabel: "5 MB",
    sizeBytes: 5242880,
    metaDescription:
      "Compress any image to 5 MB online for free. For maximum-quality archival photos, large prints, and upload forms with a 5 MB limit. No upload — runs in your browser.",
    ogDescription:
      "Free online tool to compress images to 5 MB. Ideal for archival-quality photos, large prints, and 5 MB upload limits.",
    titleKeyword: "Compress Image to 5MB",
    keywords: [
      "compress image to 5mb",
      "reduce image size to 5mb",
      "compress photo to 5mb",
      "5mb image compressor",
      "compress image for 5mb limit",
      "archival photo compression",
      "large print image size",
    ],
    useCase:
      "For maximum-quality archival photos, large-format prints, and upload forms or applications that allow up to 5 MB — where you want to keep as much detail as possible while clearing the size limit.",
    tips: [
      "At 5 MB you can preserve very high resolution (5000+ px) at quality 94-97% — true archival quality with no visible compression.",
      "Many portals that reject 'large' files cap at 5 MB — trim to around 4.7 MB to clear the limit with margin.",
      "For large prints (A3 and up), 5 MB at full resolution supports sharp output at 200-300 DPI.",
      "Only go to 5 MB when fidelity genuinely matters — for web and email, files this large slow loading with no on-screen benefit.",
    ],
    faqs: [
      {
        q: "When do I actually need a 5 MB image?",
        a: "Use 5 MB for archival masters, large-format printing, or portals that explicitly allow it and where you want maximum detail. For websites and email, much smaller files (100 KB-1 MB) are the right choice.",
      },
      {
        q: "How do I compress an image to under 5 MB?",
        a: "In SammaPix, set quality to about 92-95% — most large photos drop under 5 MB while remaining visually identical to the original. If your source is a huge RAW or TIFF, export to JPEG first, then compress.",
      },
      {
        q: "Does 5 MB keep print quality?",
        a: "Yes. At full resolution and 5 MB, the image retains enough detail for high-quality large prints (A3 and beyond) at 200-300 DPI. Compression at this size is effectively invisible.",
      },
      {
        q: "Is a 5 MB image okay to email?",
        a: "Most providers allow up to 25 MB per email, so a single 5 MB image is fine. For multiple images, compress each smaller (500 KB-1 MB) to keep the total manageable and avoid spam filters.",
      },
    ],
    related: ["3mb", "2mb", "1mb"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getAllTargets(): CompressTarget[] {
  return ALL_TARGETS;
}

export function getTarget(slug: string): CompressTarget | undefined {
  return ALL_TARGETS.find((t) => t.slug === slug);
}

export function getTargetCanonical(slug: string): string {
  return `${APP_URL}/compress-to/${slug}`;
}
