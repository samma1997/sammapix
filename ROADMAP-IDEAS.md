# SammaPix — Tool Roadmap & Competitive Ideas

## Competitor Analysis (March 2026)

### What competitors offer that we don't:
- **TinyPNG**: API for developers, WordPress plugin, Photoshop plugin
- **Squoosh**: Advanced codec controls (AVIF, JPEG XL, MozJPEG), side-by-side preview
- **iLoveIMG**: PDF to image, image to PDF, meme generator, HTML to image
- **Remove.bg**: AI background removal (their only tool, but dominates SEO)
- **Canva**: Smart resize for social media (preset sizes per platform)

### Tool Ideas — Next Phase

#### High Value (low effort)
1. **Social Media Resizer** — preset sizes for Instagram, Facebook, Twitter, LinkedIn, YouTube
2. **Image to PDF** — combine multiple images into a single PDF
3. **PDF to Image** — extract pages as JPG/PNG
4. **Favicon Generator** — upload image → get .ico + all sizes (16, 32, 48, 180, 192, 512)
5. **OG Image Generator** — template-based OG image creator (1200x630)

#### High Value (medium effort)
6. **Background Remover** — AI-powered (use remove.bg API or replicate.com model)
7. **Image Upscaler** — AI upscaling (use Real-ESRGAN via replicate.com)
8. **AVIF Converter** — next-gen format, even smaller than WebP
9. **Side-by-side Preview** — before/after comparison slider (like Squoosh)
10. **Color Palette Extractor** — extract dominant colors from image

#### Pro Features
11. **API Access** — REST API for developers (rate-limited by plan)
12. **WordPress Plugin** — one-click optimize from WP media library
13. **Bulk ZIP Upload** — upload a ZIP, process all images inside
14. **Custom Presets** — save quality/size/format settings as presets

### Technology Watch — Stay Updated

#### Image Formats
- **JPEG XL** — browser support expanding (Chrome shipped, Safari pending)
- **AVIF** — already well-supported, we should add conversion
- **WebP 2** — in development by Google

#### AI Models
- **Gemini 2.5 Pro** — check if Flash pricing changed, consider Pro for better results
- **Claude Vision** — alternative for image analysis
- **Replicate** — easy access to open-source models (ESRGAN, RMBG, etc.)

#### Browser APIs
- **WebGPU** — faster client-side image processing
- **OPFS** — Origin Private File System for better large file handling
- **Compression Streams API** — native browser compression

### SEO Opportunities
- `/tools/social-media-resizer` — "resize image for instagram" 74K searches/mo
- `/tools/favicon-generator` — "favicon generator" 40K searches/mo
- `/tools/pdf-to-image` — "pdf to image" 201K searches/mo
- `/tools/background-remover` — "remove background" 1.8M searches/mo
- `/tools/image-upscaler` — "upscale image" 90K searches/mo
