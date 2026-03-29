// -----------------------------------------------------------------------------
// destinations.ts - Travel photography data layer for SammaPix portfolio
// All image sources use picsum.photos placeholders (seed-based, deterministic).
// Replace src/srcThumb values with real CDN URLs when photos are ready.
// -----------------------------------------------------------------------------

export interface TripPhoto {
  id: string;
  src: string;       // full resolution placeholder: 1200x800
  srcThumb: string;  // thumbnail placeholder: 600x400
  alt: string;       // keyword-rich alt text for SEO & accessibility
  caption: string;   // short poetic caption displayed under the photo
  description: string; // 60-80 word SEO paragraph describing the scene
  location: string;  // precise location name
  date: string;      // ISO date string, within the trip's date range
  width?: number;    // original photo width in pixels
  height?: number;   // original photo height in pixels
}

export interface Trip {
  slug: string;
  destination: string;
  country: string;
  continent: string;
  startDate: string;
  endDate: string;
  coverSrc: string;
  excerpt: string;
  description: string;
  photoCount: number;
  photos: TripPhoto[];
  tags: string[];
}

// -----------------------------------------------------------------------------
// SRI LANKA 2025
// -----------------------------------------------------------------------------
const sriLankaPhotos: TripPhoto[] = [
  {
    id: "sri-01",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/01-gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/01-gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka",
    alt: "Gangaramaya Temple, Colombo, Sri Lanka: Serene Buddha statues line terraces leading to a modern, tiered stupa under a clear sky.",
    caption: "Colombo — Buddhist serenity ascends",
    description:
      "Sunlight bathes the towering white stupa of Gangaramaya Temple in Colombo, Sri Lanka, casting strong shadows below. Countless Buddha statues, in various sizes and serene poses, ascend tiered terraces, creating a powerful spiritual panorama. A striking contemporary architectural form rises against the vivid blue sky, blending traditional reverence with modern design in this vibrant cultural hub. The scene evokes a deep sense of peace and contemplation.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 2692,
    height: 3589,
  },
  {
    id: "sri-02",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/02-gangaramaya-temple-buddha-statues-colombo-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/02-gangaramaya-temple-buddha-statues-colombo-sri-lanka",
    alt: "Bronze Buddha statues in meditation pose on golden draped altar, intricate copper reliefs, Gangaramaya Temple, Colombo, Sri Lanka.",
    caption: "Gangaramaya Temple — tranquil row of enlightened serenity",
    description:
      "Inside a serene Buddhist temple, a long row of bronze Buddha statues sits in meditative stillness on an altar draped in shimmering gold fabric. Soft, ambient light highlights the intricate details of their serene expressions and the ornate copper relief panels adorning the wall behind them. These panels depict significant Buddhist narratives, adding layers of cultural richness. The golden glow creates a peaceful, reverent atmosphere, inviting contemplation within this sacred space in Colombo, Sri Lanka.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-03",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/03-dvarapala-guardian-statue-colombo-sri-lanka-temple",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/03-dvarapala-guardian-statue-colombo-sri-lanka-temple",
    alt: "Fierce Dvarapala guardian statue in Colombo, Sri Lanka. Muscular deity with angry red face, green sash, indoor temple setting.",
    caption: "Colombo — fierce guardian protecting sacred space",
    description:
      "A powerful Dvarapala guardian statue stands sentinel, its muscular form carved with intense detail in Colombo, Sri Lanka. The deity's fierce red face, bulging eyes, and bared teeth convey formidable protection. Emerald green sashes elegantly drape around its robust physique, contrasting with the warm, earthy tones of its skin. Soft indoor lighting highlights the intricate textures and the statue's commanding presence within a serene temple interior, inviting reverence and awe.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-04",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/04-gangaramaya-temple-colombo-sri-lanka-buddha-statues-vibrant",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/04-gangaramaya-temple-colombo-sri-lanka-buddha-statues-vibrant",
    alt: "Vibrant Buddha statues & intricate murals inside Gangaramaya Temple, Colombo, Sri Lanka. Spiritual devotion, colorful art.",
    caption: "Gangaramaya Temple — golden peace, vibrant devotion",
    description:
      "Vibrant golden Buddha statues in a Colombo temple glow with serene grace. Rich orange robes contrast with intricate murals and decorative halos, illuminated by soft lamps. Offerings of fresh flowers lie scattered, creating a palpable sense of spiritual devotion. This tableau showcases Sri Lankan Buddhist art and profound cultural heritage.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 2855,
    height: 3807,
  },
  {
    id: "sri-05",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/05-gangaramaya-temple-buddha-statues-interior-colombo-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/05-gangaramaya-temple-buddha-statues-interior-colombo-sri-lanka",
    alt: "Ornate Buddha statues & vibrant murals inside Gangaramaya Temple, Colombo, Sri Lanka. Intricate Buddhist artwork.",
    caption: "Gangaramaya Temple — vibrant devotion, ancient artistry",
    description:
      "Inside Colombo's revered Gangaramaya Temple, colossal golden Buddha statues command attention amidst a tapestry of vibrant murals. Rich hues of orange, blue, and gold illuminate the intricately painted ceilings and walls. Soft light highlights the serene expressions and detailed carvings, creating a profound sense of peace. This sacred space pulses with devotion, showcasing exquisite Sri Lankan Buddhist artistry and ancient traditions.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-06",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/06-golden-buddha-statue-serene-face-colombo-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/06-golden-buddha-statue-serene-face-colombo-sri-lanka",
    alt: "Close-up of a golden Buddha statue's serene face & orange robe at a temple in Colombo, Sri Lanka, against intricate painted patterns.",
    caption: "Colombo — Golden Buddha's serene gaze, timeless wisdom",
    description:
      "A majestic golden Buddha statue emanates serenity from a Colombo temple. Its face, painted in vibrant yellow with deep blue eyes and soft red lips, holds a timeless, meditative expression. Intricate black curls form the usnisha, while an ornate halo, rich with traditional Sri Lankan patterns in red, white, and gold, frames the head. An orange draped robe completes this powerful portrait of spiritual calm and ancient devotion.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 2738,
    height: 3651,
  },
  {
    id: "sri-07",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/07-colombo-sri-lanka-colorful-temple-statues-deities-art",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/07-colombo-sri-lanka-colorful-temple-statues-deities-art",
    alt: "Vibrant, intricately painted Sri Lankan temple statues depicting deities in gold, green, blue, pink robes, Colombo, Sri Lanka.",
    caption: "Colombo — divine hues of ancient devotion",
    description:
      "Exquisite, vibrantly painted temple statues fill the frame, showcasing the rich cultural heritage of Sri Lanka. Golden-skinned deities wear intricate headwear and garments of deep green, azure blue, and soft pink. Each figure is adorned with delicate jewelry and garland details, captured with remarkable clarity. Soft, inviting light illuminates their serene expressions, evoking a sense of ancient devotion and skilled craftsmanship within a sacred space in Colombo.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-08",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/08-gangaramaya-temple-buddhist-statues-colombo-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/08-gangaramaya-temple-buddhist-statues-colombo-sri-lanka",
    alt: "Colorful Buddhist statues & murals, Gangaramaya Temple, Colombo, Sri Lanka. Ornate golden Buddha, vibrant deities.",
    caption: "Colombo — ancient artistry in vibrant devotion",
    description:
      "Vibrant hues illuminate ancient Buddhist artistry within a temple in Colombo, Sri Lanka. Golden statues of Buddha and revered deities stand adorned with intricate garments and ceremonial jewelry. Richly detailed murals depict serene figures amidst stylized clouds and floral motifs. Sunlight gently filters, highlighting the profound cultural heritage and spiritual devotion embedded in every carefully crafted detail of this sacred space, inviting contemplation.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-09",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/09-golden-buddha-head-colombo-sri-lanka-spiritual-art",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/09-golden-buddha-head-colombo-sri-lanka-spiritual-art",
    alt: "Gleaming golden Buddha head sculpture in Colombo, Sri Lanka. Close-up profile, highly reflective, ornate spiritual art.",
    caption: "Colombo — golden serenity reflects ancient wisdom",
    description:
      "A magnificent, gleaming golden Buddha head commands attention in Colombo, Sri Lanka. Its highly polished surface beautifully captures distorted reflections of an opulent, antique-filled interior. Warm, diffused light dances across the intricate contours, emphasizing the tranquil expression and detailed craftsmanship. This striking close-up evokes a profound sense of spiritual reverence and rich cultural heritage, showcasing the timeless artistry found within the city's vibrant spaces.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-10",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/10-fasting-buddha-wooden-statue-colombo-sri-lanka-art",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/10-fasting-buddha-wooden-statue-colombo-sri-lanka-art",
    alt: "Detailed wooden Fasting Buddha statue in meditation pose, emphasizing asceticism, Colombo, Sri Lanka. Buddhist art.",
    caption: "Colombo — Ascetic Buddha's profound spiritual journey",
    description:
      "A profoundly detailed wooden statue of the Fasting Buddha sits in serene meditation. Carved with exquisite precision, it reveals the emaciated form of Siddhartha Gautama during his ascetic journey to enlightenment. Soft, ambient light accentuates every rib and muscle, conveying deep spiritual struggle and dedication. This powerful Buddhist artwork stands within a tranquil space, offering a glimpse into Sri Lankan devotional artistry in Colombo.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-11",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/11-gangaramaya-temple-buddha-elephant-statues-colombo",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/11-gangaramaya-temple-buddha-elephant-statues-colombo",
    alt: "Bronze Buddha statues in meditation pose before a large textured elephant sculpture, Gangaramaya Temple, Colombo, Sri Lanka. Ornate wooden staircase.",
    caption: "Gangaramaya Temple — ancient spirits in quiet reverence",
    description:
      "Bronze Buddha statues sit gracefully on a shimmering golden cloth, their serene forms radiating peace. Behind them, a majestic elephant sculpture, dark and intricately textured with mottled patterns, stands as a guardian. Polished wooden banisters and staircases create a warm, inviting backdrop, framing this sacred display. The soft, ambient light illuminates the scene, highlighting the rich cultural heritage and contemplative atmosphere of this revered Sri Lankan temple.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-12",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/12-seema-malaka-temple-colombo-sri-lanka-buddha-stupa",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/12-seema-malaka-temple-colombo-sri-lanka-buddha-stupa",
    alt: "Seema Malaka Temple, Gangaramaya, Colombo, Sri Lanka. Serene Buddha statues line steps leading to a modern, metallic stupa under clear blue sky.",
    caption: "Seema Malaka — still Buddhas, modern stupa, serene sky",
    description:
      "Rows of tranquil Buddha statues sit in meditative repose at Seema Malaka Temple, Colombo. The unique, futuristic metallic stupa rises sharply into a brilliant blue sky, reflecting the bright sunlight. This architectural marvel, part of the Gangaramaya complex, blends ancient reverence with contemporary design, creating a profoundly serene and visually striking spiritual sanctuary in the heart of Sri Lanka's vibrant capital.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-13",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/13-gangaramaya-temple-buddha-statues-colombo-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/13-gangaramaya-temple-buddha-statues-colombo-sri-lanka",
    alt: "Rows of serene Buddha statues, golden Buddha head, silver stupa under blue sky at Gangaramaya Temple, Colombo, Sri Lanka.",
    caption: "Gangaramaya Temple — golden reflections, serene gazes",
    description:
      "A striking low-angle perspective captures rows of majestic Buddha statues silhouetted against a brilliant blue sky at Gangaramaya Temple in Colombo, Sri Lanka. In the foreground, a lustrous golden Buddha head reflects warm light, offering a dramatic contrast. Behind, a contemporary silver-tiered stupa gleams under the strong sun. This sacred space blends ancient tradition with modern architectural elements, inviting contemplation and peace in the bustling city.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-14",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/14-galle-face-green-colombo-sri-lanka-skyscrapers-kites-urban",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/14-galle-face-green-colombo-sri-lanka-skyscrapers-kites-urban",
    alt: "Galle Face Green, Colombo, Sri Lanka. Skyscrapers, vendors, kites, and long colorful prayer flags under a clear blue sky.",
    caption: "Galle Face Green — Colombo's urban vibrancy beneath soaring towers",
    description:
      "Sunlight bathes Galle Face Green in Colombo, Sri Lanka, where a vibrant urban scene unfolds. Towering modern skyscrapers of Port City dominate the horizon, reflecting the clear blue sky. Below, local vendors line the grassy expanse, selling colorful kites and toys. Long strings of Buddhist prayer flags stretch across the frame, adding splashes of vivid color. The bustling energy captures Colombo's dynamic blend of tradition and contemporary development, offering a unique coastal city experience.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-15",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/15-maharagama-sri-lanka-elephant-mahout-tropical-bond",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/15-maharagama-sri-lanka-elephant-mahout-tropical-bond",
    alt: "Mahout stands before a majestic Asian elephant in Maharagama, Sri Lanka. Lush tropical foliage and subtle golden sunlight.",
    caption: "Maharagama — guardian and ancient giant",
    description:
      "A powerful Asian elephant stands majestically alongside its mahout in Maharagama, Sri Lanka. Warm golden light filters through verdant tropical foliage, casting a gentle glow on the elephant's rugged skin and the mahout's tanned back. The scene captures a timeless bond between man and animal amidst a lush, semi-urban landscape. Green grasses and ancient trees frame this intimate cultural moment, highlighting the island's unique heritage.",
    location: "Maharagama, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-16",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/16-reclining-buddha-temple-maharagama-sri-lanka-sacred",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/16-reclining-buddha-temple-maharagama-sri-lanka-sacred",
    alt: "Vibrant orange reclining Buddha statue in a Sri Lankan temple, intricate cloud murals, patterned ceiling, Maharagama.",
    caption: "Maharagama — ancient tranquility of a sacred slumber",
    description:
      "A colossal reclining Buddha statue dominates the vibrant interior of a Sri Lankan temple in Maharagama. Its striking orange robes contrast with the serene yellow skin. Surrounding walls feature detailed blue sky murals and smaller contemplative Buddha figures. Light filters from high windows, illuminating the intricate patterned ceiling and classic checkered floor, creating a profoundly spiritual and timeless atmosphere of devotion and peace.",
    location: "Maharagama, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-17",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/17-maharagama-sri-lanka-reclining-buddha-temple-golden-light",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/17-maharagama-sri-lanka-reclining-buddha-temple-golden-light",
    alt: "Reclining Buddha statue, golden light rays, standing monks, vibrant murals, ornate table in a Buddhist temple, Maharagama, Sri Lanka.",
    caption: "Maharagama — Buddha's tranquil repose, bathed in golden light",
    description:
      "Golden light pierces through a temple window in Maharagama, Sri Lanka, illuminating a serene reclining Buddha statue. Surrounding murals depict celestial and historical scenes, adding vibrant context. Attendant figures stand reverently near an ornate table adorned with fresh flower offerings. The ancient space exudes tranquil spirituality, grounded by its classic checkered floor. This scene captures a moment of timeless devotion.",
    location: "Maharagama, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-18",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/18-golden-reclining-buddha-statue-temple-maharagama-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/18-golden-reclining-buddha-statue-temple-maharagama-sri-lanka",
    alt: "Close-up of a golden reclining Buddha statue, serene expression, black hair, blue-painted background, Buddhist temple in Maharagama, Sri Lanka.",
    caption: "Maharagama — serene slumber, ancient wisdom",
    description:
      "A magnificent golden reclining Buddha statue emanates profound tranquility within a Sri Lankan temple in Maharagama. Soft, warm light illuminates the serene face, closed eyes, and gently painted red lips, suggesting deep peace. The intricate details of the decorative headrest and dark, tightly coiled hair contrast with the smooth, glossy golden skin. A painted sky mural forms a calming backdrop, creating a sacred, spiritual atmosphere around this revered Buddhist art.",
    location: "Maharagama, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-19",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/19-maharagama-sri-lanka-buddha-temple-murals-golden-statue",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/19-maharagama-sri-lanka-buddha-temple-murals-golden-statue",
    alt: "Golden seated Buddha statue in ornate Sri Lankan temple hall, Maharagama. Vibrant murals, checkered floor, worshippers. Spiritual interior.",
    caption: "Maharagama — sacred golden Buddha, ancient murals glow",
    description:
      "Warm light filters into a serene Sri Lankan temple in Maharagama, illuminating a magnificent golden seated Buddha statue at its heart. Vibrant frescoes depicting ancient tales adorn the walls, their colors rich and deep. A striking checkered marble floor leads the eye towards the central deity. Worshippers sit in quiet contemplation, adding a profound human element to this spiritual sanctuary. The atmosphere is one of deep peace and cultural heritage.",
    location: "Maharagama, Sri Lanka",
    date: "2025-03-09",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-20",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/20-gampaha-sri-lanka-stone-deity-statue-tropical-foliage",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/20-gampaha-sri-lanka-stone-deity-statue-tropical-foliage",
    alt: "Intricate stone statue of a deity with ornate crown and mudra hands, framed by lush tropical foliage in Gampaha, Sri Lanka.",
    caption: "Gampaha — ancient stone deity, tropical embrace",
    description:
      "Sunlight illuminates a magnificent stone statue, depicting a richly adorned deity with hands in a blessing mudra. Intricate carvings cover the crown, jewelry, and draped garments, showcasing traditional Sri Lankan artistry. The ancient figure stands majestically amidst vibrant, deep green tropical foliage in Gampaha, creating an atmosphere of serene timelessness and spiritual presence.",
    location: "Gampaha, Sri Lanka",
    date: "2025-03-12",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-21",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/21-gampaha-sri-lanka-ancient-temple-stone-carvings-detail",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/21-gampaha-sri-lanka-ancient-temple-stone-carvings-detail",
    alt: "Detailed stone carvings of mythical figures supporting a cornice on an ancient Sri Lankan temple wall in Gampaha, Sri Lanka.",
    caption: "Gampaha — Ancient guardians carved in stone",
    description:
      "Golden sunlight bathes intricate stone carvings on an ancient Sri Lankan temple wall. Rows of weathered figures, perhaps mythical guardians or divine beings, appear to support the heavy stone cornice above. Each relief tells a story, etched in the rich, earthy tones of ages past. This architectural detail captures the timeless artistry and spiritual depth found within Gampaha's cultural heritage. The play of light highlights delicate features and profound expressions.",
    location: "Gampaha, Sri Lanka",
    date: "2025-03-12",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-22",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/22-sri-lanka-kelaniya-temple-elephant-figure-stone-carvings",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/22-sri-lanka-kelaniya-temple-elephant-figure-stone-carvings",
    alt: "Ancient stone carvings of elephants and seated figures on a temple wall in Sri Lanka, likely Kelaniya Raja Maha Vihara, Gampaha.",
    caption: "Kelaniya Vihara — carved stone awakens ancient stories",
    description:
      "Golden sunlight illuminates intricate stone carvings on an ancient Sri Lankan temple wall. A rhythmic procession of stylized elephants forms the lower frieze, their weathered forms hinting at centuries of devotion. Above, a row of serene seated figures, adorned with delicate details, gazes outward. The warm light accentuates the textured stone, revealing the enduring artistry and spiritual heritage of the island's craftsmanship, a timeless story etched in rock.",
    location: "Gampaha, Sri Lanka",
    date: "2025-03-12",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-23",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/23-gampaha-sri-lanka-buddhist-temple-oil-lamps-devotion",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/23-gampaha-sri-lanka-buddhist-temple-oil-lamps-devotion",
    alt: "Devotees light hundreds of traditional clay oil lamps (pahan) at a Buddhist temple in Gampaha, Sri Lanka, a spiritual ritual.",
    caption: "Gampaha — sacred flames of devotion flicker",
    description:
      "A serene moment unfolds as devotees light countless terracotta oil lamps (pahan) in a temple in Gampaha. Hundreds of individual flames cast a warm, flickering glow across tiered metal racks, illuminating the faces of worshippers in white attire. This sacred ritual embodies deep devotion, creating a mesmerizing spiritual atmosphere under a traditional tiled roof. Lush tropical foliage peeks through, adding a natural backdrop to this timeless Sri Lankan tradition.",
    location: "Gampaha, Sri Lanka",
    date: "2025-03-12",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-24",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/24-colombo-sri-lanka-urban-electricity-meters-tangled-wires",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/24-colombo-sri-lanka-urban-electricity-meters-tangled-wires",
    alt: "Dense wall of old electricity meters, circuit breakers, and tangled cables in Colombo, Sri Lanka, reflecting urban power infrastructure.",
    caption: "Colombo — intricate electric web, city's vital pulse",
    description:
      "A labyrinthine wall in Colombo, Sri Lanka, showcases an intricate network of aged electricity meters and circuit breakers. Rows upon rows of utility hardware are woven into a dense tapestry of tangled black cables and yellow conduits. Subtle light illuminates the gritty textures, dust, and faded labels, revealing the raw, vital infrastructure powering an urban core. This scene captures the unseen energy and complexity of a bustling city.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-12",
    width: 2844,
    height: 3792,
  },
  {
    id: "sri-25",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/25-polek-trade-centre-colombo-sri-lanka-electronics-market",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/25-polek-trade-centre-colombo-sri-lanka-electronics-market",
    alt: "Polek Trade Centre, Colombo 11, Sri Lanka. Shoppers browse electronics in a narrow market alley with bright neon signs.",
    caption: "Colombo — market's vibrant digital pulse",
    description:
      "A narrow, bustling alleyway in Colombo, Sri Lanka, glows with the vibrant energy of an electronics market. Overhead fluorescent lights illuminate the scene, reflecting off polished surfaces and the distinctive red floor. Shoppers browse display cases brimming with mobile phones and accessories. Bright neon 'OPEN' signs and Sinhala script add to the sensory tapestry, capturing the dynamic pulse of urban commerce and daily life.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-12",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-26",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/26-colombo-sri-lanka-mobile-market-neon-portrait-man",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/26-colombo-sri-lanka-mobile-market-neon-portrait-man",
    alt: "Young man in knit shirt in bustling Colombo mobile repair market with bright neon signs: OPEN, RAJAN, AJ MOBILE. Sri Lanka.",
    caption: "Colombo — urban pulse of market neon",
    description:
      "A thoughtful young man stands amidst the vibrant energy of a Colombo market. Bright neon signs illuminate the bustling backdrop, advertising \"OPEN,\" \"PHONE REPAIR,\" and \"MOBILE ACCESSORIES.\" A striking blend of modern commerce and local life unfolds, with a blue railing adding a compositional element. This portrait subtly grounds the viewer amidst the electric glow of Sri Lanka's urban heart, capturing a moment of quiet observation.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-12",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-27",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/27-colombo-sri-lanka-pettah-electronics-market-interior",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/27-colombo-sri-lanka-pettah-electronics-market-interior",
    alt: "Bustling interior of Anglo Traders electronics shop in Colombo 11, Sri Lanka. Men among stacked boxes, exposed wires, blue railing.",
    caption: "Colombo — vibrant market, conduits of commerce",
    description:
      "This vibrant interior captures the raw energy of an electronics market in Colombo, Sri Lanka. Fluorescent lights illuminate stacked boxes of appliances and tangled electrical conduits above. Shopkeepers and customers engage amidst the organized chaos. A blue railing overlooks lower levels, adding depth to this bustling scene. The atmosphere is thick with commerce, reflecting the dynamic urban rhythm of Sri Lanka's capital.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-12",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-28",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/28-first-cross-street-pettah-colombo-sri-lanka-market",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/28-first-cross-street-pettah-colombo-sri-lanka-market",
    alt: "First Cross Street, Pettah, Colombo, Sri Lanka: Bustling street scene with crowded pedestrians, vibrant electronics and shoe shop signs, a man smiling on phone.",
    caption: "Colombo — street life buzzes with vibrant signs",
    description:
      "Sunlight bathes First Cross Street in Colombo, Sri Lanka, a vibrant commercial hub teeming with life. Pedestrians navigate the bustling pathway, enveloped by a towering array of colorful shop signs advertising electronics, mobile stores, and shoes. Overhead, a complex web of electrical wires adds to the urban tapestry. The scene pulses with dynamic energy and cultural authenticity under the bright, clear sky, showcasing the lively spirit of this South Asian market.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-12",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-29",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/29-kurunegala-sri-lanka-floating-cafe-lily-pond-mountains",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/29-kurunegala-sri-lanka-floating-cafe-lily-pond-mountains",
    alt: "Kurunegala, Sri Lanka: Rustic floating cafe on serene lily-filled lake, long wooden pier, lush tropical mountains.",
    caption: "Kurunegala — floating café, lily pond tranquility",
    description:
      "Golden sunlight illuminates a rustic floating cafe, nestled amidst a tranquil lake completely blanketed with vibrant green water lilies in Kurunegala, Sri Lanka. A weathered wooden pier extends invitingly to the charming thatched-roof structure, gracefully shaded by a sprawling tree. Lush, forested mountains rise majestically in the background under a bright, cerulean sky. This serene scene captures the peaceful beauty of Sri Lankan rural life, inviting contemplation and calm.",
    location: "Kurunegala, Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-30",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/30-kurunegala-sri-lanka-floating-hut-lotus-pond-cafe",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/30-kurunegala-sri-lanka-floating-hut-lotus-pond-cafe",
    alt: "Floating hut cafe on a lotus pond in Kurunegala, Sri Lanka. Rustic wooden walkway, boat, kayak, green hills, blue sky.",
    caption: "Kurunegala — tranquil floating cafe on lily pads",
    description:
      "Daylight illuminates a charming floating hut on a vibrant lotus pond in Kurunegala, Sri Lanka. A rustic wooden walkway leads to the thatched-roof cafe, offering a tranquil escape. Boats rest beside the platform, reflecting in the water amidst countless green lily pads. Lush, verdant hills rise in the distance under a clear blue sky, framing this idyllic natural scene. It embodies Sri Lanka's serene rural charm, inviting peaceful contemplation.",
    location: "Kurunegala, Sri Lanka",
    date: "2025-03-13",
    width: 4032,
    height: 3024,
  },
  {
    id: "sri-31",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/31-dambulla-cave-temple-sri-lanka-pilgrimage-site-2025",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/31-dambulla-cave-temple-sri-lanka-pilgrimage-site-2025",
    alt: "Pilgrims walk barefoot at Dambulla Cave Temple complex, Sri Lanka. Ornate white arches, rock overhang, ancient tree, paved courtyard.",
    caption: "Dambulla — sacred rock, ancient devotion's embrace",
    description:
      "Sunlight illuminates the Dambulla Cave Temple complex, revealing its pristine white arches nestled against a colossal rock face. Barefoot pilgrims traverse the ancient stone courtyard, shaded by a venerable Bodhi tree. Ornate architecture blends with natural stone, creating a serene, spiritually charged atmosphere. This sacred site buzzes with quiet reverence, a timeless testament to Sri Lanka's rich heritage.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-32",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/32-sri-lanka-toque-macaque-temple-spirit-wildlife",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/32-sri-lanka-toque-macaque-temple-spirit-wildlife",
    alt: "Sri Lankan Toque Macaque monkey, pink face, shaggy hair, sits on temple wall near burning oil lamps, Sri Lanka.",
    caption: "Sri Lanka — Sacred site's serene macaque",
    description:
      "A captivating Sri Lankan Toque Macaque, with its distinctive pink face and shaggy crown, sits thoughtfully on ancient temple stone. Soft light illuminates its golden fur as wisps of smoke rise from offerings in the background. Burning oil lamps cast warm glows, hinting at spiritual rituals. A fallen pink lotus and yellow leaf complete this serene, candid moment at a sacred site in Sri Lanka.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-33",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/33-dambulla-cave-temple-buddhist-pilgrimage-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/33-dambulla-cave-temple-buddhist-pilgrimage-sri-lanka",
    alt: "Dambulla Cave Temple, Sri Lanka: Pilgrims walk barefoot on rocky ground towards ancient white Buddhist shrine built into massive rock face.",
    caption: "Dambulla — ancient devotion under a colossal rock",
    description:
      "Sunlight bathes the colossal rock face of Dambulla, revealing ancient white temple structures nestled beneath its overhang. Pilgrims, some barefoot, traverse the warm, weathered stone, approaching the sacred Buddhist site. The serene atmosphere invites contemplation, as intricate carvings and traditional architecture blend seamlessly with the natural landscape. This UNESCO World Heritage site offers a glimpse into Sri Lanka's rich spiritual heritage.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-34",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/34-dambulla-cave-temple-reclining-buddha-sri-lanka-murals",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/34-dambulla-cave-temple-reclining-buddha-sri-lanka-murals",
    alt: "Dambulla Cave Temple, Sri Lanka: Reclining Buddha, seated Buddha, vibrant ancient murals. Lotus flower offerings in sacred light.",
    caption: "Dambulla — where ancient spirits softly slumber",
    description:
      "Within the sacred Dambulla Cave Temple, an immense reclining Buddha statue exudes serene repose. Beside it, a seated Buddha contemplates the ancient space. Rich, elaborate murals cover every surface, depicting timeless Buddhist narratives and intricate patterns. Soft, ambient light highlights the weathered textures and vibrant artistry. Fresh lotus flower offerings rest reverently, enhancing the spiritual tranquility of this iconic Sri Lankan sanctuary.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-35",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/35-dambulla-cave-temple-buddha-statues-sri-lanka-interior",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/35-dambulla-cave-temple-buddha-statues-sri-lanka-interior",
    alt: "Row of ancient Buddha statues meditating in Dambulla Cave Temple, Sri Lanka. Intricate painted ceiling above. UNESCO World Heritage.",
    caption: "Dambulla — ancient Buddhas in serene golden contemplation",
    description:
      "Ancient Buddha statues sit in serene meditation within the historic Dambulla Cave Temple, Sri Lanka. Golden robes and intricate details adorn each figure, bathed in soft, diffused light. Overhead, vibrant frescoes blanket the cave ceiling, depicting traditional Buddhist narratives and geometric patterns. This UNESCO World Heritage site offers a profound glimpse into centuries of spiritual devotion and artistic mastery.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-36",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/36-dambulla-cave-temple-reclining-buddha-sri-lanka-golden",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/36-dambulla-cave-temple-reclining-buddha-sri-lanka-golden",
    alt: "Reclining Buddha statue, Dambulla Cave Temple, Sri Lanka. Serene golden figure with red lips, intricate ceiling murals.",
    caption: "Dambulla — Golden Buddha's peaceful slumber",
    description:
      "A colossal reclining Buddha dominates the sacred space within Dambulla Cave Temple, Sri Lanka. Its serene face, with gentle eyes and striking red lips, reflects centuries of devotion. Golden hues illuminate the ancient wood, contrasting with the vibrant, intricate ceiling murals depicting Buddhist lore. The dim, spiritual ambiance of the rock-hewn chamber evokes deep reverence, capturing the timeless beauty of this UNESCO World Heritage site.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-37",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/37-pidurangala-rock-panoramic-jungle-view-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/37-pidurangala-rock-panoramic-jungle-view-sri-lanka",
    alt: "Panoramic view from Pidurangala Rock, Sri Lanka, showing dense jungle, winding village road, communication tower, and distant mountains under a cloudy sky.",
    caption: "Pidurangala — emerald canopy, winding road, distant peaks",
    description:
      "A breathtaking panoramic vista unfolds from Pidurangala Rock, Sri Lanka. Below, an emerald tapestry of dense jungle stretches to the horizon, dotted with glimpses of a winding village road and traditional red-roofed buildings. A prominent communication tower rises from the greenery. In the distance, mystical blue mountain ranges recede under an atmospheric, cloudy sky. The scene evokes the serene, ancient heart of Sri Lanka's cultural richness, captured under soft, natural light.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-38",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/38-golden-temple-dambulla-entrance-buddhist-museum-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/38-golden-temple-dambulla-entrance-buddhist-museum-sri-lanka",
    alt: "Golden Temple Dambulla, Sri Lanka: colossal golden demon face entrance, open mouth to Buddhist Museum, terracotta steps.",
    caption: "Dambulla — golden guardian's dramatic welcome",
    description:
      "A vibrant, intricate golden face sculpture with wide eyes and an open mouth forms the striking entrance to the Buddhist Museum at Dambulla's Golden Temple in Sri Lanka. Terracotta steps lead up to this iconic cultural landmark, where two figures descend. The rich gold hues contrast with the red-pink interior of the mouth and subtle lavender accents. This imposing, mythical guardian welcomes visitors to a revered site, bathed in soft, diffused light.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-39",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/39-sri-lanka-flooded-forest-wetland-bare-trees-reflections",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/39-sri-lanka-flooded-forest-wetland-bare-trees-reflections",
    alt: "Flooded forest in Sri Lanka with bare tree branches reflected in murky water. Wetland ecosystem, dappled light.",
    caption: "Sri Lanka Wetlands — ancient trees, watery reflections",
    description:
      "Sunlight filters through the skeletal canopy of a flooded forest in Sri Lanka, illuminating gnarled tree trunks rising from the serene water. Verdant water plants float on the surface, mirroring the intricate patterns of bare branches above. The scene evokes a tranquil, ancient wetland ecosystem, where nature's resilience is beautifully reflected. Dappled light creates a captivating interplay of shadow and shimmer across the murky depths.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-40",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/40-sigiriya-rock-fortress-panoramic-golden-hour-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/40-sigiriya-rock-fortress-panoramic-golden-hour-sri-lanka",
    alt: "Panoramic view of Sigiriya Rock Fortress at golden hour, lush jungle canopy, hazy mountains in Dambulla, Sri Lanka.",
    caption: "Sigiriya — ancient grandeur bathed in golden light",
    description:
      "The iconic Sigiriya Rock Fortress stands majestically amidst a verdant jungle canopy. Golden hour light bathes the ancient rock, highlighting its rugged textures and the surrounding tropical forest. Distant mountains blend into a soft, hazy horizon under a serene blue sky. This panoramic view, captured from a higher elevation, showcases the historical grandeur and natural beauty of Sri Lanka's cultural triangle, evoking a timeless sense of wonder and profound tranquility.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-41",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/41-sigiriya-rock-fortress-monkeys-sunset-sri-lanka-jungle",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/41-sigiriya-rock-fortress-monkeys-sunset-sri-lanka-jungle",
    alt: "Golden light illuminates Sigiriya Rock Fortress over lush jungle, with toque macaques in foreground. Sri Lanka sunset.",
    caption: "Sigiriya — golden hour with watchful macaques",
    description:
      "Golden hour light bathes the iconic Sigiriya Rock Fortress, a UNESCO World Heritage site in Sri Lanka, in a warm glow. Lush green jungle blankets the landscape surrounding the ancient citadel. In the foreground, a family of toque macaques observes the panoramic vista from a rocky outcrop. This striking view captures Sri Lanka's rich history and vibrant wildlife amidst breathtaking natural beauty.",
    location: "Sri Lanka",
    date: "2025-03-13",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-42",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/42-sri-lanka-anuradhapura-ancient-trees-roots-pond-nature",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/42-sri-lanka-anuradhapura-ancient-trees-roots-pond-nature",
    alt: "Massive ancient trees with exposed roots beside a tranquil pond in Sri Lanka, lush tropical foliage, egret visible.",
    caption: "Anuradhapura — ancient roots embrace tranquil waters",
    description:
      "Giant banyan or fig trees dominate the foreground, their massive, gnarled roots anchoring them to the reddish earth. Behind, a tranquil pond reflects the soft light filtering through dense canopies. Lush tropical foliage frames the serene water, where a lone white egret subtly adds life. This timeless Sri Lankan landscape evokes peace and the enduring power of nature, perhaps near an ancient heritage site.",
    location: "Sri Lanka",
    date: "2025-03-14",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-43",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/43-sigiriya-water-gardens-ruins-sri-lanka-morning-view",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/43-sigiriya-water-gardens-ruins-sri-lanka-morning-view",
    alt: "Sigiriya, Sri Lanka: Ancient palace ruins, terraced water gardens, lush jungle, distant mountains under a blue sky.",
    caption: "Sigiriya — ancient reflections, verdant jungle expanse",
    description:
      "Golden morning light bathes the ancient terraced water gardens of Sigiriya, Sri Lanka. Intricate brickwork paths wind around tranquil reservoirs, reflecting the serene blue sky. Below, a dense, emerald jungle canopy stretches towards distant, mist-shrouded mountain ranges, hinting at untold stories. The panoramic vista captures the magnificent scale of this UNESCO World Heritage site, showcasing its natural beauty and timeless architectural splendor.",
    location: "Sri Lanka",
    date: "2025-03-14",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-44",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/44-matale-sri-lanka-mountain-landscape-golden-light",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/44-matale-sri-lanka-mountain-landscape-golden-light",
    alt: "Vast green mountain landscape near Matale, Sri Lanka. Rolling hills bathed in golden sunlight under a dramatic blue sky with clouds.",
    caption: "Matale — sun-drenched emerald hills, vast tranquil vista",
    description:
      "A breathtaking panorama unfolds across the Matale highlands in Sri Lanka. Rolling emerald hills and lush forested slopes stretch towards distant mountains, veiled in a soft blue haze. Golden sunlight selectively illuminates patches of vibrant green, creating dynamic contrasts. Fluffy white clouds drift across a serene blue sky, enhancing the expansive, tranquil atmosphere of this tropical mountain vista.",
    location: "Matale, Sri Lanka",
    date: "2025-03-14",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-45",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/45-kandy-sri-lanka-travel-welcome-chauffeur-sign-arrival",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/45-kandy-sri-lanka-travel-welcome-chauffeur-sign-arrival",
    alt: "Welcome to Sri Lanka sign in car windshield, Kandy, reflecting tropical foliage. Driver's ID, tourism info.",
    caption: "Kandy — arrival's gentle embrace, Sri Lankan welcome",
    description:
      "A personalized welcome sign, 'SASHIN YATHRA - Crexlon Travels,' awaits within a car windshield in Kandy, Sri Lanka. Tropical foliage reflects subtly on the glass, blending the journey's start with nature's beauty. An authorized tourist chauffeur's ID confirms professional service, hinting at seamless exploration. The scene captures the anticipation of discovery, a serene prelude to Sri Lankan adventures.",
    location: "Kandy, Sri Lanka",
    date: "2025-03-15",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-46",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/46-kandy-sri-lanka-temple-sacred-tooth-relic-daylight",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/46-kandy-sri-lanka-temple-sacred-tooth-relic-daylight",
    alt: "Ancient Temple of the Sacred Tooth Relic, Kandy, Sri Lanka. Intricate white walls, sacred moat reflecting sky, red tiled roof, Buddhist flags.",
    caption: "Kandy — Sacred Tooth Temple's serene white beauty",
    description:
      "The Temple of the Sacred Tooth Relic in Kandy, Sri Lanka, gleams under a bright blue sky. Ornate white walls and the sacred moat reflect ancient architecture, bathed in warm sunlight. Buddhist flags add vibrant color against the serene backdrop of lush green hills. This revered spiritual site radiates a timeless, tranquil atmosphere, inviting contemplation.",
    location: "Kandy, Sri Lanka",
    date: "2025-03-15",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-47",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/47-kandy-sri-lanka-traditional-drummer-temple-ceremony",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/47-kandy-sri-lanka-traditional-drummer-temple-ceremony",
    alt: "Kandy, Sri Lanka: Traditional Sri Lankan drummer in white head wrap, red sarong, playing drum at a Buddhist temple ceremony.",
    caption: "Kandy — sacred rhythm echoes through time",
    description:
      "A traditional Sri Lankan drummer stands poised against an ancient stone pillar in Kandy. He wears a striking white head wrap and a vibrant red and white sarong, holding a drum ready for a performance. Warm, diffused light illuminates his features as he prepares to create sacred rhythms. The blurred temple background, adorned with colorful prayer flags, hints at a profound cultural and spiritual setting, capturing devotion and tradition.",
    location: "Kandy, Sri Lanka",
    date: "2025-03-15",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-48",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/48-kandy-sri-lanka-elderly-man-portrait-local-cafe-life",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/48-kandy-sri-lanka-elderly-man-portrait-local-cafe-life",
    alt: "Elderly Sri Lankan man with deeply weathered face and grey hair, wearing a striped shirt, Kandy cafe interior. Authentic portrait.",
    caption: "Kandy — a face of time-worn wisdom",
    description:
      "An intimate portrait captures an elderly Sri Lankan man in a Kandy cafe. His deeply etched face, framed by wisps of white hair, conveys a lifetime of stories and quiet dignity. Soft, warm light illuminates his features and the subtle stripes of his casual shirt. In the background, local life unfolds, offering an authentic glimpse into the vibrant culture of Kandy, Sri Lanka. This candid moment invites contemplation.",
    location: "Kandy, Sri Lanka",
    date: "2025-03-15",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-49",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/49-nuwara-eliya-sri-lanka-tea-factory-wilting-leaves-worker",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/49-nuwara-eliya-sri-lanka-tea-factory-wilting-leaves-worker",
    alt: "Green tea leaves drying in industrial trays at a tea factory in Nuwara Eliya, Sri Lanka. Worker visible in background.",
    caption: "Nuwara Eliya — where Ceylon tea magic begins",
    description:
      "Inside a traditional tea factory in Nuwara Eliya, Sri Lanka, rows of freshly picked green tea leaves undergo wilting. Diffused light from large windows illuminates the vast space, highlighting the verdant piles. A worker in a yellow shirt quietly tends to the processing, a testament to Ceylon tea's rich heritage. The air hums with anticipation, promising the perfect brew.",
    location: "Nuwara Eliya, Sri Lanka",
    date: "2025-03-15",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-50",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/50-nuwara-eliya-tea-plantation-drone-sunset-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/50-nuwara-eliya-tea-plantation-drone-sunset-sri-lanka",
    alt: "Nuwara Eliya tea country sunset: man flying drone over lush green plantations, child watching, golden hour light, Sri Lanka.",
    caption: "Nuwara Eliya — drone flies over golden tea fields",
    description:
      "Golden light bathes the rolling tea plantations of Nuwara Eliya, Sri Lanka, as a man skillfully pilots a drone overhead. A local child stands observing the technology against the backdrop of vibrant green terraced fields. Dramatic clouds fill the sky, hinting at the day's end, creating an atmosphere of modern exploration meeting timeless natural beauty in this iconic hill country.",
    location: "Nuwara Eliya, Sri Lanka",
    date: "2025-03-15",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-51",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/51-nuwara-eliya-sri-lanka-curious-child-portrait-golden-light",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/51-nuwara-eliya-sri-lanka-curious-child-portrait-golden-light",
    alt: "Nuwara Eliya, Sri Lanka: Curious barefoot child in vibrant attire stands on sunlit rock amidst green foliage, golden hour portrait.",
    caption: "Nuwara Eliya — quiet curiosity in golden hill light",
    description:
      "A captivating portrait from Nuwara Eliya, Sri Lanka, captures a barefoot child bathed in warm golden hour light. Their curious gaze and dark curls are gently illuminated, creating a profound connection. Dressed in vibrant patterned clothing, the child stands gracefully on a sun-drenched rock, framed by lush green foliage. This image evokes the simple beauty and authentic spirit of the region's people, amidst the gentle glow of late afternoon.",
    location: "Nuwara Eliya, Sri Lanka",
    date: "2025-03-15",
    width: 2882,
    height: 3842,
  },
  {
    id: "sri-52",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/52-sri-lanka-train-travel-conductor-passenger-interaction",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/52-sri-lanka-train-travel-conductor-passenger-interaction",
    alt: "Sri Lankan train conductor with red glasses assists passenger writing on document. Authentic journey, green foliage visible through window.",
    caption: "Sri Lanka Train — A shared journey, a helpful hand",
    description:
      "This intimate portrait captures a candid moment aboard a Sri Lankan train. A local conductor, distinctive in uniform and red-framed glasses, intently assists a traveler with a document. Soft natural light illuminates their shared focus on the paperwork. Through the window, blurred emerald-green and gold foliage rushes by, hinting at the scenic journey. It embodies authentic connection on the rails.",
    location: "Sri Lanka",
    date: "2025-03-16",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-53",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/53-sri-lanka-train-journey-girl-window-portrait-red-blue",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/53-sri-lanka-train-journey-girl-window-portrait-red-blue",
    alt: "Young girl in red top peers from a grimy blue Sri Lankan train window, reflections visible. iPhone 13 Pro.",
    caption: "Sri Lanka — a quiet gaze from the blue train",
    description:
      "A young girl in a vivid red top captures a moment of quiet reflection, peering through the grimy window of a blue Sri Lankan train. The window's surface reflects subtle light, framing her expressive gaze. This intimate portrait embodies the spirit of local travel, depicting childhood wonder amidst the journey. The blue and red hues of the train carriage provide a striking cultural backdrop, inviting observers into her introspective world.",
    location: "Sri Lanka",
    date: "2025-03-16",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-54",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/54-sri-lanka-ella-train-journey-jungle-hill-country",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/54-sri-lanka-ella-train-journey-jungle-hill-country",
    alt: "Iconic blue-red Sri Lankan train winding through lush hill country jungle, man in open doorway, Ella railway journey.",
    caption: "Ella Railway — verdant jungle journey through Sri Lanka",
    description:
      "An iconic blue and red train gracefully curves through the dense, vibrant jungle of Sri Lanka's Hill Country. Overcast skies cast a soft, diffused light, enhancing the emerald hues of the lush vegetation that hugs the railway tracks. A lone figure stands in the open doorway, immersed in the adventurous journey. This evocative scene captures the essence of the world-famous Kandy to Ella train ride, a truly unforgettable Sri Lankan experience.",
    location: "Sri Lanka",
    date: "2025-03-16",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-55",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/55-badulla-sri-lanka-smiling-train-conductor-rainy-day",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/55-badulla-sri-lanka-smiling-train-conductor-rainy-day",
    alt: "Smiling Sri Lankan train conductor in uniform gives thumbs up from blue train door in Badulla, Sri Lanka, as rain falls.",
    caption: "Badulla — Sri Lankan railway spirit shines brightly",
    description:
      "A beaming Sri Lankan train conductor, in crisp brown uniform and cap, offers a warm thumbs-up from a vibrant blue and red carriage doorway. Rain streaks the scene, creating a glistening atmosphere around Badulla. His genuine smile and confident gesture embody the welcoming spirit of travel on the country's iconic railways. This candid moment captures the enduring charm and human connection found on journeys through Sri Lanka's picturesque landscapes.",
    location: "Badulla, Sri Lanka",
    date: "2025-03-16",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-56",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/56-badulla-sri-lanka-person-walking-train-tracks-lush-green",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/56-badulla-sri-lanka-person-walking-train-tracks-lush-green",
    alt: "Person walking on overgrown train tracks in Badulla, Sri Lanka. Lush green tropical hills, dense foliage, daily life scene.",
    caption: "Badulla — Solitary journey through Sri Lanka's emerald hills",
    description:
      "A lone figure traverses the railway tracks near Badulla, Sri Lanka, carrying a light load. Lush tropical foliage blankets the steep hillsides, creating an emerald panorama under bright daylight. The overgrown tracks symbolize an enduring connection through the vibrant landscape. This evocative scene captures the tranquil rhythm of daily life amidst Sri Lanka’s breathtaking hill country, a testament to enduring journeys.",
    location: "Badulla, Sri Lanka",
    date: "2025-03-16",
    width: 2336,
    height: 3114,
  },
  {
    id: "sri-57",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/57-buduruwagala-standing-buddha-rock-carving-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/57-buduruwagala-standing-buddha-rock-carving-sri-lanka",
    alt: "Colossal ancient standing Buddha rock carving at Buduruwagala, Sri Lanka. Tourist photographs monumental statue in serene landscape.",
    caption: "Buduruwagala — colossal Buddha's timeless gaze",
    description:
      "A colossal standing Buddha statue, intricately carved from the natural rock face, dominates the landscape at Buduruwagala, Sri Lanka. Its ancient form, weathered by time, reveals subtle textures and natural coloration. A lone visitor captures the monumental scale, emphasizing the profound spiritual connection and enduring artistry of this sacred Buddhist site. The serene atmosphere invites contemplation amidst the dense jungle surroundings.",
    location: "Sri Lanka",
    date: "2025-03-17",
    width: 2891,
    height: 3854,
  },
  {
    id: "sri-58",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/58-yala-national-park-safari-jeeps-convoy-golden-hour-sri-lanka",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/58-yala-national-park-safari-jeeps-convoy-golden-hour-sri-lanka",
    alt: "Safari jeeps in convoy on a road at golden hour, vibrant orange sky. Sri Lanka national park entrance, Yala or Udawalawe.",
    caption: "Sri Lanka — golden hour safari's quiet anticipation",
    description:
      "A convoy of rugged safari jeeps stretches along a quiet road in Sri Lanka, bathed in the rich, golden light of dawn or dusk. The vibrant orange sky reflects on the dusty vehicles, their silhouettes hinting at the adventure ahead. Lush, wild foliage lines the route, promising glimpses of incredible wildlife. This evocative scene captures the raw beauty and anticipation of an authentic Sri Lankan safari experience.",
    location: "Sri Lanka",
    date: "2025-03-18",
    width: 2915,
    height: 3886,
  },
  {
    id: "sri-59",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/59-sri-lanka-hikkaduwa-mahindra-driver-road-trip-2025",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/59-sri-lanka-hikkaduwa-mahindra-driver-road-trip-2025",
    alt: "Driver's hands on Mahindra steering wheel with orange fluffy dash cover, blurred tropical greenery outside, Hikkaduwa, Sri Lanka",
    caption: "Hikkaduwa — island journey on verdant roads",
    description:
      "The intimate perspective of a driver's hands gripping a Mahindra steering wheel encapsulates a Sri Lankan road trip. Soft light highlights the textured skin and the vibrant orange faux-fur dash cover. Blurred emerald foliage outside suggests a tropical setting, inviting exploration. This authentic moment captures the essence of travel through Sri Lanka's lush landscapes, perhaps near Hikkaduwa, promising untold adventures on the open road.",
    location: "Sri Lanka",
    date: "2025-03-18",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-60",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/60-matara-sri-lanka-coastline-palm-trees-indian-ocean-view",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/60-matara-sri-lanka-coastline-palm-trees-indian-ocean-view",
    alt: "Matara, Sri Lanka tropical coastline: tall coconut palm trees silhouette against shimmering Indian Ocean. Tourists on a red dirt path.",
    caption: "Matara — Sparkling ocean, swaying palms, tropical bliss",
    description:
      "Golden light illuminates the vibrant coastline of Matara, Sri Lanka. Tall coconut palm trees create dramatic silhouettes against the brilliant blue sky and sparkling Indian Ocean. A winding red earth path leads toward groups of people admiring the breathtaking tropical panorama. Lush green foliage thrives under the warm sun, capturing the serene and idyllic atmosphere of this southern Sri Lankan paradise.",
    location: "Matara, Sri Lanka",
    date: "2025-03-18",
    width: 2882,
    height: 3842,
  },
  {
    id: "sri-61",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/61-coconut-tree-hill-mirissa-sri-lanka-tropical-bay-view",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/61-coconut-tree-hill-mirissa-sri-lanka-tropical-bay-view",
    alt: "Coconut Tree Hill, Mirissa, Sri Lanka. Lush palm trees overlook a turquoise bay and sandy beach under a blue sky.",
    caption: "Mirissa — swaying palms, tranquil turquoise sea",
    description:
      "Morning sunlight bathes Coconut Tree Hill in Mirissa, Sri Lanka. Towering palms cast long shadows across the vibrant red earth path. Below, a serene turquoise bay shimmers, dotted with small boats and kissed by gentle waves. Lush tropical foliage frames the distant sandy beach and coastal hotels. Visitors gather, captivated by this iconic panoramic ocean vista.",
    location: "Matara, Sri Lanka",
    date: "2025-03-18",
    width: 2621,
    height: 3495,
  },
  {
    id: "sri-62",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/62-sri-lanka-matara-man-sacred-ash-beach-portrait",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/62-sri-lanka-matara-man-sacred-ash-beach-portrait",
    alt: "Young Sri Lankan man with sacred white ash on face, intense gaze. Matara beach, palm trees, turquoise ocean backdrop.",
    caption: "Matara Coast — ancient spirit in sun-kissed eyes",
    description:
      "A striking portrait captures a young Sri Lankan man in Matara, his face adorned with sacred white ash. His wet hair and sun-kissed skin glow under the bright tropical light. With arms crossed, his gaze is direct and profound, conveying a sense of deep cultural connection and resilience. Behind him, blurry palm trees frame the serene turquoise ocean, blending spiritual tradition with the vibrant coastal landscape of southern Sri Lanka.",
    location: "Matara, Sri Lanka",
    date: "2025-03-18",
    width: 2547,
    height: 3396,
  },
  {
    id: "sri-63",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/63-matara-fishing-harbor-boats-nets-sri-lanka-tropical",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/63-matara-fishing-harbor-boats-nets-sri-lanka-tropical",
    alt: "Matara fishing harbor, Sri Lanka: colorful boats, coiled ropes, fishing nets, and rusty bollards on a vibrant pier.",
    caption: "Matara — vibrant harbor's working pulse",
    description:
      "Sunlight bathes Matara fishing harbor in Sri Lanka, revealing a vibrant tableau of daily life. Piles of coiled ropes, intricate nets, and buoyant floats line the concrete pier, hinting at the ocean's bounty. Teal waters gently lap against rusted bollards, while brightly painted fishing boats rest ashore and afloat. Lush tropical foliage frames the bustling scene, capturing the raw, authentic charm of this coastal community.",
    location: "Matara, Sri Lanka",
    date: "2025-03-19",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-64",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/64-sri-lanka-expressive-man-portrait-travel-iphone",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/64-sri-lanka-expressive-man-portrait-travel-iphone",
    alt: "Expressive portrait of a man with furrowed brow, pursed lips, and short stubble, captured in natural light in Sri Lanka.",
    caption: "Sri Lanka — a moment of thoughtful curiosity",
    description:
      "A compelling close-up portrait reveals a man's expressive face in Sri Lanka. His furrowed brow and slightly pursed lips convey a moment of contemplation or mild curiosity. Soft, natural light illuminates the subtle textures of his skin and dark stubble, highlighting his features. The shallow depth of field beautifully isolates the subject against a gently blurred, dark background, evoking the intimate atmosphere of a candid travel encounter in the vibrant country.",
    location: "Sri Lanka",
    date: "2025-03-19",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-65",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/65-sri-lanka-beach-dusk-woman-palm-trees-tropical",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/65-sri-lanka-beach-dusk-woman-palm-trees-tropical",
    alt: "Young woman on a Sri Lankan beach at dusk, looking out. Palm trees, thatched beach huts, soft overcast light create a serene scene.",
    caption: "Sri Lanka Coast — tranquil tropical evening",
    description:
      "A young woman stands reflectively on a tranquil Sri Lankan beach as dusk settles. Her wet hair suggests a recent swim, harmonizing with the soft, diffused light of the overcast sky. Towering palm trees frame the scene, their fronds silhouetted against the muted sky. In the background, quaint thatched beach huts and seating areas hint at a serene coastal retreat, embodying the peaceful allure of tropical Sri Lanka.",
    location: "Sri Lanka",
    date: "2025-03-19",
    width: 2848,
    height: 3798,
  },
  {
    id: "sri-66",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/66-negombo-sri-lanka-fisherman-holding-dried-fish-portrait",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/66-negombo-sri-lanka-fisherman-holding-dried-fish-portrait",
    alt: "Smiling Sri Lankan fisherman in Negombo holding a large, sun-dried fish, with ocean background. Traditional seafood preparation.",
    caption: "Negombo — fisherman's pride, ocean's bounty",
    description:
      "A weathered Sri Lankan fisherman in Negombo smiles proudly, holding a large, sun-dried fish. Brilliant tropical light illuminates his face and the textured fish, a testament to traditional methods. The azure ocean provides a serene backdrop, hinting at the day's fresh catch. This portrait captures the essence of coastal life and sustainable seafood practices in Sri Lanka.",
    location: "Negombo, Sri Lanka",
    date: "2025-03-21",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-67",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/67-negombo-sri-lanka-fish-drying-beach-traditional-seafood",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/67-negombo-sri-lanka-fish-drying-beach-traditional-seafood",
    alt: "Sun-dried fish spread across sandy Negombo beach, Sri Lanka. Fishermen work under tarps; a traditional coastal industry.",
    caption: "Negombo — sun-kissed bounty of the sea",
    description:
      "Vast rows of fish glisten under the intense Sri Lankan sun on Negombo's sandy shores. Traditional methods prevail as countless catches are meticulously laid out to dry, transforming the beach into a mosaic of silver scales and golden sand. Fishermen oversee the process, their figures silhouetted against the bright, clear sky. This vital coastal industry thrives under the tropical light, a testament to enduring local traditions.",
    location: "Negombo, Sri Lanka",
    date: "2025-03-21",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-68",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/68-negombo-sri-lanka-fish-drying-yard-coastal-life-sun",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/68-negombo-sri-lanka-fish-drying-yard-coastal-life-sun",
    alt: "Negombo, Sri Lanka fish drying yard. Workers spread small fish under makeshift shelters, blue barrels foreground. Bright sunlight.",
    caption: "Negombo — Sun-baked rhythm of coastal life",
    description:
      "Negombo's vibrant fish drying yards hum with activity under the intense Sri Lankan sun. Countless small fish, glistening like silver, are meticulously spread across expansive tarps and sandy ground. Local workers tend to the catch, seeking respite under patterned makeshift canopies. Weathered blue barrels punctuate the foreground, casting sharp shadows on the sun-baked earth. This scene captures the timeless, industrious spirit of a coastal community.",
    location: "Negombo, Sri Lanka",
    date: "2025-03-21",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-69",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/69-negombo-sri-lanka-fishing-nets-boat-coastal-life",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/69-negombo-sri-lanka-fishing-nets-boat-coastal-life",
    alt: "Negombo, Sri Lanka: Two coastal workers sort orange fishing nets in a green boat by the ocean under bright sun with flying birds.",
    caption: "Negombo — Ocean breeze, woven nets, daily toil",
    description:
      "This vibrant scene captures daily life in Negombo, Sri Lanka. Two coastal workers meticulously sort sun-drenched orange fishing nets from a bright green boat. The vast turquoise ocean stretches under a brilliant blue sky, dotted with soaring birds. In the foreground, weathered blue barrels and dark tarps hint at the authentic, hardworking spirit of this renowned fishing community, bathed in crisp daylight.",
    location: "Negombo, Sri Lanka",
    date: "2025-03-21",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-70",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/70-sri-lanka-street-vendor-roadside-stall-daily-life-sunlight",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/70-sri-lanka-street-vendor-roadside-stall-daily-life-sunlight",
    alt: "Sri Lankan woman street vendor at a roadside stall, preparing drinks under an umbrella. Red table, plastic cups, dappled sunlight.",
    caption: "Sri Lanka — Everyday moments under tropical sun",
    description:
      "A Sri Lankan street vendor stands by her vibrant red stall, preparing for customers. Dappled sunlight filters through an overhead umbrella, casting intricate shadows on her white t-shirt and maroon skirt. Glasses and containers are neatly arranged on the table, reflecting the bright light. This candid moment captures the essence of daily life and local commerce in tropical Sri Lanka, showcasing an authentic roadside scene.",
    location: "Sri Lanka",
    date: "2025-03-24",
    width: 3024,
    height: 4032,
  },
  {
    id: "sri-71",
    src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/71-colombo-sri-lanka-beach-cafe-thatched-roof-men-phones",
    srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/71-colombo-sri-lanka-beach-cafe-thatched-roof-men-phones",
    alt: "Two men under a rustic thatched roof beach cafe in Colombo, Sri Lanka, illuminated by a warm sun flare, both looking at phones.",
    caption: "Colombo — sandy cafe whispers, sun-kissed digital ease",
    description:
      "Golden sunbeams pierce the rustic thatched roof of a beachside cafe in Colombo, Sri Lanka. Two men sit at simple tables directly on the sand, embodying a blend of tropical relaxation and modern connectivity. One is barefoot, both are engrossed in their mobile phones. The warm light highlights the intricate patterns of the woven roof and the textured sandy floor, creating a serene, everyday scene.",
    location: "Colombo, Sri Lanka",
    date: "2025-03-25",
    width: 2257,
    height: 3009,
  },
];

// -----------------------------------------------------------------------------
// ASSEMBLED TRIPS
// -----------------------------------------------------------------------------
export const trips: Trip[] = [
  {
    slug: "sri-lanka",
    destination: "Sri Lanka",
    country: "Sri Lanka",
    continent: "Asia",
    startDate: "2025-03-09",
    endDate: "2025-03-25",
    coverSrc: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/40-sigiriya-rock-fortress-panoramic-golden-hour-sri-lanka",
    excerpt:
      "A 16-day journey through ancient temples, lush highlands, and coastal towns.",
    description:
      "From the golden Buddhas of Colombo's Gangaramaya Temple to the misty tea plantations of the hill country, Sri Lanka is a photographer's paradise. This collection captures the sacred, the wild, and the everyday — all through the lens of a first visit.",
    photoCount: sriLankaPhotos.length,
    photos: sriLankaPhotos,
    tags: ["temples", "wildlife", "culture", "landscape", "street"],
  },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}

export function getAllTrips(): Trip[] {
  return trips;
}
