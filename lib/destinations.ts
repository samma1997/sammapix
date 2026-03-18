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
  { id: "sri-01", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/01-gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/01-gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka", alt: "Tiered Buddha statues at Seema Malaka, Gangaramaya Temple, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 2692, height: 3589 },
  { id: "sri-02", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/02-gangaramaya-temple-buddha-statues-colombo-sri-lanka", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/02-gangaramaya-temple-buddha-statues-colombo-sri-lanka", alt: "Bronze and golden Buddha statues inside Gangaramaya Temple, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-03", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/03-colombo-sri-lanka-fierce-dvarapala-guardian-statue", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/03-colombo-sri-lanka-fierce-dvarapala-guardian-statue", alt: "Fierce Sri Lankan Dvarapala guardian statue in Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-04", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/04-gangaramaya-temple-buddha-shrine-colombo-sri-lanka", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/04-gangaramaya-temple-buddha-shrine-colombo-sri-lanka", alt: "Golden Buddha statue in Gangaramaya Temple shrine, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 2855, height: 3807 },
  { id: "sri-05", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/05-gangaramaya-temple-colombo-sri-lanka-buddha-interior-art", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/05-gangaramaya-temple-colombo-sri-lanka-buddha-interior-art", alt: "Gangaramaya Temple interior with golden Buddha statues and murals, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-06", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/06-golden-buddha-statue-colombo-sri-lanka-temple-art", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/06-golden-buddha-statue-colombo-sri-lanka-temple-art", alt: "Close-up golden Buddha statue, Sri Lankan temple art, Colombo", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 2738, height: 3651 },
  { id: "sri-07", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/07-gangarama-temple-colombo-sri-lanka-colorful-deities", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/07-gangarama-temple-colombo-sri-lanka-colorful-deities", alt: "Vibrant painted deity statues inside Gangarama Temple, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-08", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/08-gangaramaya-temple-buddhist-statues-murals-colombo-sri-lanka", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/08-gangaramaya-temple-buddhist-statues-murals-colombo-sri-lanka", alt: "Buddhist statues and murals inside Gangaramaya Temple, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-09", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/09-golden-buddha-head-statue-colombo-sri-lanka-portrait", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/09-golden-buddha-head-statue-colombo-sri-lanka-portrait", alt: "Golden Buddha head statue reflecting warm light, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-10", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/10-ascetic-buddha-wooden-statue-colombo-sri-lanka-temple", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/10-ascetic-buddha-wooden-statue-colombo-sri-lanka-temple", alt: "Wooden emaciated ascetic Buddha statue, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-11", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/11-gangaramaya-temple-colombo-buddha-elephant-sri-lanka", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/11-gangaramaya-temple-colombo-buddha-elephant-sri-lanka", alt: "Bronze Buddha statues and ceremonial elephant at Gangaramaya Temple, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-12", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/12-seema-malaka-buddha-statues-modern-stupa-colombo-sri-lanka", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/12-seema-malaka-buddha-statues-modern-stupa-colombo-sri-lanka", alt: "Seema Malaka Temple Buddha statues and modern stupa, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-13", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/13-seema-malaka-temple-buddha-statues-colombo-sri-lanka", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/13-seema-malaka-temple-buddha-statues-colombo-sri-lanka", alt: "Rows of Buddha statues and silver stupa at Seema Malaka Temple, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-14", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/14-colombo-galle-face-green-skyscrapers-kites-sri-lanka-urban", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/14-colombo-galle-face-green-skyscrapers-kites-sri-lanka-urban", alt: "Galle Face Green with skyscrapers and kites, Colombo, Sri Lanka", caption: "", description: "", location: "Colombo, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
  { id: "sri-15", src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/15-sri-lankan-elephant-mahout-maharagama-golden-light", srcThumb: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_600/v1/sammapix/portfolio/sri-lanka/15-sri-lankan-elephant-mahout-maharagama-golden-light", alt: "Mahout with Sri Lankan elephant in golden light, Maharagama, Sri Lanka", caption: "", description: "", location: "Maharagama, Sri Lanka", date: "2025-03-09", width: 3024, height: 4032 },
];

// -----------------------------------------------------------------------------
// BALI 2024
// -----------------------------------------------------------------------------
const baliPhotos: TripPhoto[] = [
  {
    id: "ba-01",
    src: "https://picsum.photos/seed/bali1/1200/800",
    srcThumb: "https://picsum.photos/seed/bali1/600/400",
    alt: "Tegallalang Rice Terraces with farmers working at sunrise, Bali, Indonesia",
    caption: "Tegallalang- the terraces wake up",
    description:
      "Tegallalang's UNESCO-listed subak irrigation terraces step down the hillside north of Ubud in a cascade of vivid green. At sunrise, the stepped paddies catch the low-angle light at different heights, creating a natural gradient from gold to deep shadow. A lone farmer wades through the flooded lower paddies, their reflection rippling across water that acts as a mirror to the sky. This is Bali at its most archetypal and most breathtaking.",
    location: "Tegallalang Rice Terraces, Ubud, Bali",
    date: "2024-09-12",
  },
  {
    id: "ba-02",
    src: "https://picsum.photos/seed/bali2/1200/800",
    srcThumb: "https://picsum.photos/seed/bali2/600/400",
    alt: "Uluwatu Temple cliff edge at golden sunset, Bali, Indonesia",
    caption: "Uluwatu- temple at the edge of the world",
    description:
      "Perched on a 70-metre sea cliff at the southern tip of the Bukit Peninsula, Pura Luhur Uluwatu is one of Bali's six spiritual pillars. At golden hour, the ancient temple complex glows against a sky layered in amber and rose, with the Indian Ocean churning far below. Kecak performers encircle a fire at the cliff's edge as the last light extinguishes- a spectacle of sound, flame, and ancient ritual against the burning horizon.",
    location: "Uluwatu Temple, Bukit Peninsula, Bali",
    date: "2024-09-14",
  },
  {
    id: "ba-03",
    src: "https://picsum.photos/seed/bali3/1200/800",
    srcThumb: "https://picsum.photos/seed/bali3/600/400",
    alt: "Tirta Empul sacred spring temple with pilgrims bathing, Bali, Indonesia",
    caption: "Tirta Empul- ritual in the sacred spring",
    description:
      "At Tirta Empul, streams of crystal-clear holy water feed the purification pools where Balinese Hindus come to cleanse body and spirit. Pilgrims in white-and-gold sarongs move between the stone spouts, submerging under each jet in a precise sequence of prayer. Morning light filters through the surrounding jungle canopy, dappling the surface of the pools with coins of gold and shadow. The air is thick with incense and the sound of flowing water.",
    location: "Tirta Empul Temple, Tampaksiring, Bali",
    date: "2024-09-13",
  },
  {
    id: "ba-04",
    src: "https://picsum.photos/seed/bali4/1200/800",
    srcThumb: "https://picsum.photos/seed/bali4/600/400",
    alt: "Monkey Forest ancient temple hidden in jungle, Ubud, Bali, Indonesia",
    caption: "Ubud- shadows in the sacred forest",
    description:
      "The Sacred Monkey Forest Sanctuary of Ubud is a temple complex embedded deep within a dense banyan jungle. Ancient moss-covered statues emerge from the undergrowth, flanked by the roots of centuries-old trees that have grown around and through the stone structures. Long-tailed macaques move through the filtered light overhead while the jungle floor remains in perpetual shade. Here, nature and Balinese spirituality have become genuinely inseparable.",
    location: "Sacred Monkey Forest, Ubud, Bali",
    date: "2024-09-11",
  },
  {
    id: "ba-05",
    src: "https://picsum.photos/seed/bali5/1200/800",
    srcThumb: "https://picsum.photos/seed/bali5/600/400",
    alt: "Mount Batur volcano crater with caldera lake at dawn, Bali, Indonesia",
    caption: "Batur- above the clouds at 4 AM",
    description:
      "The summit of Mount Batur at 1,717 metres is reached before dawn, guided only by headlamps and the silhouettes of other trekkers. As the sky transitions from black to deep purple to pink, the vast caldera lake 700 metres below emerges from the darkness. The active volcano's warm fumaroles keep summiteers warm while the world below is still lost in pre-dawn cloud. Few sights in Bali match this volcanic panorama at first light.",
    location: "Mount Batur, Kintamani, Bali",
    date: "2024-09-16",
  },
  {
    id: "ba-06",
    src: "https://picsum.photos/seed/bali6/1200/800",
    srcThumb: "https://picsum.photos/seed/bali6/600/400",
    alt: "Traditional Balinese Legong dance performer in golden costume, Ubud, Bali",
    caption: "Ubud- the dance of a thousand gestures",
    description:
      "A Legong dancer waits in the wings at the Ubud Royal Palace, her golden headdress catching the torchlight. Every element of the costume- the painted face, the layered batik fabric, the hand-carved gilded ornaments- is a piece of living heritage. When the gamelan orchestra strikes its opening notes and she steps onto the stone stage, centuries of Balinese court culture are compressed into the precision of a single outstretched finger.",
    location: "Ubud Royal Palace, Ubud, Bali",
    date: "2024-09-15",
  },
  {
    id: "ba-07",
    src: "https://picsum.photos/seed/bali7/1200/800",
    srcThumb: "https://picsum.photos/seed/bali7/600/400",
    alt: "Seminyak Beach surfer and palm tree silhouette at sunset, Bali, Indonesia",
    caption: "Seminyak- the last surfer at sunset",
    description:
      "As the beach clubs fill with evening crowds, a lone surfer paddles out into the Seminyak surf, their silhouette a perfect counterpoint to the burning sky above. The Bali sun sets directly into the Indian Ocean here, dropping fast and dramatically from a livid orange disc into the horizon. For a brief three minutes the whole beach turns copper- an evening ritual that draws locals and visitors alike to stand together facing west in silent appreciation.",
    location: "Seminyak Beach, Seminyak, Bali",
    date: "2024-09-20",
  },
  {
    id: "ba-08",
    src: "https://picsum.photos/seed/bali8/1200/800",
    srcThumb: "https://picsum.photos/seed/bali8/600/400",
    alt: "Lempuyang Temple Gateway of Heaven with Mount Agung reflection, Bali",
    caption: "Lempuyang- the gate and the god",
    description:
      "The Pura Lempuyang split gate- the Gates of Heaven- frames a perfect symmetrical view of Mount Agung, Bali's most sacred volcano. At the base of the gate, a still-water mirror creates the famous reflected image that appears to float the volcano inside the arch. The 1,775 steps leading up to the innermost temple begin just behind; the reflection at the entrance is a fitting introduction to a place the Balinese consider one of their most spiritually charged landscapes.",
    location: "Pura Lempuyang, Karangasem, Bali",
    date: "2024-09-18",
  },
];

// -----------------------------------------------------------------------------
// THAILAND 2024
// -----------------------------------------------------------------------------
const thailandPhotos: TripPhoto[] = [
  {
    id: "th-01",
    src: "https://picsum.photos/seed/thailand1/1200/800",
    srcThumb: "https://picsum.photos/seed/thailand1/600/400",
    alt: "Chatuchak Weekend Market street food vendor at night, Bangkok, Thailand",
    caption: "Bangkok- the market never sleeps",
    description:
      "Bangkok's street food culture is most vivid after dark, when the heat of the day eases and vendors set up their woks and charcoal grills along every soi. Smoke rises from a pad thai stall, the orange flames beneath the wok creating a theatrical glow against the dark of the narrow alley. The vendor works fast, methodical movements built over decades, tossing noodles with the casual authority of someone who has cooked this dish ten thousand times.",
    location: "Yaowarat Road, Chinatown, Bangkok, Thailand",
    date: "2024-02-17",
  },
  {
    id: "th-02",
    src: "https://picsum.photos/seed/thailand2/1200/800",
    srcThumb: "https://picsum.photos/seed/thailand2/600/400",
    alt: "Wat Arun Temple of Dawn at sunrise reflected in Chao Phraya River, Bangkok",
    caption: "Bangkok- the temple of dawn",
    description:
      "Wat Arun, the Temple of Dawn, lives up to its name at first light. The central prang rises 67 metres above the west bank of the Chao Phraya, its surface encrusted with fragments of Chinese porcelain that catch the morning sun and scatter light in every direction. From the opposite bank, the temple's full reflection ripples across the river's surface. Long-tail boats begin their morning runs, leaving V-shaped wakes that distort the golden mirror below.",
    location: "Wat Arun, Bangkok, Thailand",
    date: "2024-02-18",
  },
  {
    id: "th-03",
    src: "https://picsum.photos/seed/thailand3/1200/800",
    srcThumb: "https://picsum.photos/seed/thailand3/600/400",
    alt: "Monk walking through Doi Suthep temple grounds at dawn, Chiang Mai, Thailand",
    caption: "Chiang Mai- orange robes at dawn",
    description:
      "A single monk walks the stone cloister of Doi Suthep at dawn, saffron robes catching the first pale light as it filters through the carved gilt panels of the surrounding sanctuary. The temple, perched at 1,073 metres above Chiang Mai, is reached via a 309-step naga staircase lined with serpent balustrades. In the stillness before tourists arrive, the complex belongs entirely to the monks who have tended it since the 14th century.",
    location: "Wat Phrathat Doi Suthep, Chiang Mai, Thailand",
    date: "2024-02-20",
  },
  {
    id: "th-04",
    src: "https://picsum.photos/seed/thailand4/1200/800",
    srcThumb: "https://picsum.photos/seed/thailand4/600/400",
    alt: "Pai Canyon red rock formations at golden hour, northern Thailand",
    caption: "Pai- walking the red ridge",
    description:
      "The Pai Canyon, known locally as Kong Lan, is a series of narrow red sandstone ridges with sheer drops on either side- the kind of trail that demands full attention and rewards it with breathtaking views of the Pai Valley. At golden hour, the ochre and terracotta cliffs turn deep rust-red against a sky that shifts from blue to amber. Far below, the patchwork of paddy fields and forest stretches to a ring of blue hills on every horizon.",
    location: "Pai Canyon (Kong Lan), Pai, Mae Hong Son, Thailand",
    date: "2024-02-23",
  },
  {
    id: "th-05",
    src: "https://picsum.photos/seed/thailand5/1200/800",
    srcThumb: "https://picsum.photos/seed/thailand5/600/400",
    alt: "Ayutthaya ancient Buddha head entwined in tree roots, Thailand",
    caption: "Ayutthaya- the face in the roots",
    description:
      "One of the most iconic images in Southeast Asian photography: a stone Buddha head resting within the gnarled roots of a Bodhi tree at Wat Mahathat in Ayutthaya. The roots have grown around the sandstone face over centuries, gradually absorbing it into the living wood. How the head came to rest there remains debated- conquest, decay, or deliberate placement. What is certain is the profound stillness of the expression, unchanged across 600 years of history.",
    location: "Wat Mahathat, Ayutthaya, Thailand",
    date: "2024-02-25",
  },
  {
    id: "th-06",
    src: "https://picsum.photos/seed/thailand6/1200/800",
    srcThumb: "https://picsum.photos/seed/thailand6/600/400",
    alt: "Chiang Mai night market lanterns and street food stalls at dusk, Thailand",
    caption: "Chiang Mai- a thousand lanterns rising",
    description:
      "The Saturday Walking Street along Wualai Road fills every week with handcraft stalls, street musicians, and the scent of grilled skewers and mango sticky rice. As dusk falls, paper lanterns are released from both sides of the street, lifting slowly into the warm air and drifting south on the evening breeze. Each lantern carries a wish skyward. The combined effect of hundreds rising together against a darkening indigo sky is quietly spectacular.",
    location: "Wualai Walking Street, Chiang Mai, Thailand",
    date: "2024-02-21",
  },
  {
    id: "th-07",
    src: "https://picsum.photos/seed/thailand7/1200/800",
    srcThumb: "https://picsum.photos/seed/thailand7/600/400",
    alt: "Long-tail boat on Chao Phraya River with Bangkok skyline, Thailand",
    caption: "Bangkok- the river between two worlds",
    description:
      "A long-tail boat accelerates down the Chao Phraya, its powerful engine driving a rooster-tail of white water behind the stern. On the left bank, gilded temple spires and traditional wooden houses reflect the old city; on the right, glass towers catch the midday sun. The river is where Bangkok's centuries collide- the waterway is still the fastest way to cross the city, just as it has been since the first settlements along its banks.",
    location: "Chao Phraya River, Bangkok, Thailand",
    date: "2024-02-19",
  },
  {
    id: "th-08",
    src: "https://picsum.photos/seed/thailand8/1200/800",
    srcThumb: "https://picsum.photos/seed/thailand8/600/400",
    alt: "Elephant in misty jungle sanctuary at dawn, Chiang Rai, Thailand",
    caption: "Chiang Rai- giants in the morning mist",
    description:
      "At an ethical elephant sanctuary in the hills above Chiang Rai, a large bull elephant moves between the trees in the early morning mist, the forest floor softened by the residual fog of the previous night's rain. The scale of the animal is only appreciated in context- the surrounding teak and bamboo, despite their own considerable height, seem modest beside him. The sanctuary operates on strict no-ride, no-perform principles: here elephants simply live.",
    location: "Elephant Sanctuary, Chiang Rai, Thailand",
    date: "2024-02-27",
  },
];

// -----------------------------------------------------------------------------
// JAPAN 2023
// -----------------------------------------------------------------------------
const japanPhotos: TripPhoto[] = [
  {
    id: "jp-01",
    src: "https://picsum.photos/seed/japan1/1200/800",
    srcThumb: "https://picsum.photos/seed/japan1/600/400",
    alt: "Cherry blossoms in full bloom at Maruyama Park, Kyoto, Japan",
    caption: "Kyoto- sakura at its peak",
    description:
      "Maruyama Park in Kyoto reaches its yearly crescendo during peak sakura season, when the famous weeping cherry tree at its centre- illuminated by lanterns through the night- is surrounded by a snowstorm of pale pink petals. Hanami picnic groups spread under every tree, sharing sake and rice balls as a warm April breeze sends petals drifting. The entire park is a study in impermanence: sakura lasts ten days at most, and the Japanese have built a philosophy around that brevity.",
    location: "Maruyama Park, Gion, Kyoto, Japan",
    date: "2023-04-05",
  },
  {
    id: "jp-02",
    src: "https://picsum.photos/seed/japan2/1200/800",
    srcThumb: "https://picsum.photos/seed/japan2/600/400",
    alt: "Fushimi Inari thousands of torii gates winding up forested mountain, Kyoto",
    caption: "Kyoto- ten thousand gates",
    description:
      "Fushimi Inari Taisha's famous senbon torii- thousands of vermillion torii gates- wind up Mount Inari in an unbroken tunnel of orange-red pillars that seems to compress perspective into infinity. In the early morning, before the tour groups arrive, the path is almost empty: just the sound of your own footsteps on stone, the occasional bell from a sub-shrine, and the latticed orange light filtering through the gates. The full ascent to the summit takes two hours and gains over 230 metres.",
    location: "Fushimi Inari Taisha, Fushimi, Kyoto, Japan",
    date: "2023-04-04",
  },
  {
    id: "jp-03",
    src: "https://picsum.photos/seed/japan3/1200/800",
    srcThumb: "https://picsum.photos/seed/japan3/600/400",
    alt: "Shibuya Crossing aerial view at night with crowds and neon lights, Tokyo",
    caption: "Tokyo- the world's most famous crossing",
    description:
      "From the Mag's Park rooftop above Shibuya Station, the famous scramble crossing looks like a living organism. On the red light, the pedestrian cycle releases thousands of people simultaneously from all eight corners, crossing in every direction without colliding. The choreography is instinctive and self-organising. At night, lit by the neon of surrounding buildings, the crossing becomes an abstract painting of light trails, umbrellas, and the soft geometry of human movement.",
    location: "Shibuya Crossing, Shibuya, Tokyo, Japan",
    date: "2023-03-27",
  },
  {
    id: "jp-04",
    src: "https://picsum.photos/seed/japan4/1200/800",
    srcThumb: "https://picsum.photos/seed/japan4/600/400",
    alt: "Mount Fuji reflection in Kawaguchiko Lake at sunrise, Yamanashi, Japan",
    caption: "Kawaguchiko - Fuji in the mirror",
    description:
      "In still pre-dawn conditions at Lake Kawaguchiko, Mount Fuji's perfect volcanic cone reflects without distortion in the flat surface of the water. The summit still holds winter snow in late March, making the reflection almost monochrome- white cone, dark skirt of forest, pale sky. Fishermen launch their boats in the predawn dark, careful not to break the surface before the light is right. This mirror image- the real and the reflected- is one of Japan's most iconic and most earned photographs.",
    location: "Lake Kawaguchiko, Yamanashi, Japan",
    date: "2023-03-30",
  },
  {
    id: "jp-05",
    src: "https://picsum.photos/seed/japan5/1200/800",
    srcThumb: "https://picsum.photos/seed/japan5/600/400",
    alt: "Deer in Nara Park among cherry blossoms and tourists, Nara, Japan",
    caption: "Nara- the deer and the sakura",
    description:
      "In Nara's ancient park, nearly 1,300 sika deer roam freely among the visitors, considered messengers of the gods and protected by law since 768 AD. During cherry blossom season, the combination of wild deer, pink clouds of petals, and ancient wooden architecture creates an almost surreal pastoral tableau. A deer presses its head against a visitor's backpack in search of the deer crackers sold at every entrance- unbothered, unhurried, entirely at home.",
    location: "Nara Park, Nara, Japan",
    date: "2023-04-08",
  },
  {
    id: "jp-06",
    src: "https://picsum.photos/seed/japan6/1200/800",
    srcThumb: "https://picsum.photos/seed/japan6/600/400",
    alt: "Dotonbori canal at night with glowing signs and reflections, Osaka, Japan",
    caption: "Osaka- the neon canal",
    description:
      "Dotonbori at night is Osaka's most concentrated explosion of commercial energy: the canal reflects a cacophony of neon signs, LED billboards, and the famous mechanical crab above the Kani Doraku restaurant. The Glico running man looks down from the south bank, as he has since 1935 in various iterations. Food stalls line the canal walkway serving takoyaki and kushikatsu while crowds drift between bars and restaurants in a spectacle of urban appetite that is uniquely, exhilaratingly Osakane.",
    location: "Dotonbori, Namba, Osaka, Japan",
    date: "2023-04-10",
  },
  {
    id: "jp-07",
    src: "https://picsum.photos/seed/japan7/1200/800",
    srcThumb: "https://picsum.photos/seed/japan7/600/400",
    alt: "Peace Memorial Park atomic dome ruins at dusk, Hiroshima, Japan",
    caption: "Hiroshima- the dome that survived",
    description:
      "The Hiroshima Peace Memorial- the Genbaku Dome- stands as the only structure that survived near the hypocentre of the atomic blast of 6 August 1945. At dusk, the skeletal ironwork dome is reflected in the Motoyasu River, its ruined silhouette framed by the flowering cherry trees of Peace Memorial Park. The juxtaposition of destruction preserved in perpetuity and the regenerative cycle of the sakura makes this the most emotionally weighted landscape photograph of this journey.",
    location: "Hiroshima Peace Memorial Park, Hiroshima, Japan",
    date: "2023-04-13",
  },
  {
    id: "jp-08",
    src: "https://picsum.photos/seed/japan8/1200/800",
    srcThumb: "https://picsum.photos/seed/japan8/600/400",
    alt: "Arashiyama bamboo grove path with soft light, Kyoto, Japan",
    caption: "Arashiyama- cathedral of bamboo",
    description:
      "The bamboo grove of Arashiyama channels visitors down a narrow path flanked on both sides by towering moso bamboo stalks that rise 20 metres overhead and close the canopy completely. The light inside is diffused and green-tinted, the sound is extraordinary- bamboo in the wind produces a unique hollow clacking and rustling that is unlike any other forest sound. Arriving at 6 AM means experiencing the grove in near-solitude, the way it deserves to be encountered.",
    location: "Arashiyama Bamboo Grove, Arashiyama, Kyoto, Japan",
    date: "2023-04-06",
  },
];

// -----------------------------------------------------------------------------
// CHINA 2023
// -----------------------------------------------------------------------------
const chinaPhotos: TripPhoto[] = [
  {
    id: "cn-01",
    src: "https://picsum.photos/seed/china1/1200/800",
    srcThumb: "https://picsum.photos/seed/china1/600/400",
    alt: "Great Wall of China stretching over mountain ridges at sunrise, Mutianyu",
    caption: "Mutianyu- the wall before the world wakes",
    description:
      "The Great Wall at Mutianyu, one of the best-preserved sections, unrolls over the mountain ridges north of Beijing like a stone spine. At sunrise, the wall catches the first light while the valleys remain in shadow, creating a dramatic separation between the illuminated stone and the dark forest below. The watchtowers are spaced at 300-metre intervals; standing in one and looking in either direction, the wall curves away to the horizon and the sheer scale of the construction becomes overwhelming.",
    location: "Mutianyu Great Wall, Huairou, Beijing, China",
    date: "2023-10-03",
  },
  {
    id: "cn-02",
    src: "https://picsum.photos/seed/china2/1200/800",
    srcThumb: "https://picsum.photos/seed/china2/600/400",
    alt: "Avatar Mountains of Zhangjiajie floating sandstone pillars in cloud, Hunan, China",
    caption: "Zhangjiajie- the mountains that float",
    description:
      "The quartz sandstone pillar formations of Zhangjiajie National Forest Park were the inspiration for the floating Hallelujah Mountains in Avatar. In reality, they are even more extraordinary than any CGI rendering: thousands of columns up to 300 metres tall, densely forested to their summits, draped in cloud that catches and releases them intermittently throughout the day. The Bailong Elevator, the world's highest outdoor lift, ascends one of the cliff faces in a glass pod- vertigo is not optional.",
    location: "Zhangjiajie National Forest Park, Hunan, China",
    date: "2023-10-08",
  },
  {
    id: "cn-03",
    src: "https://picsum.photos/seed/china3/1200/800",
    srcThumb: "https://picsum.photos/seed/china3/600/400",
    alt: "Li River karst mountains at dawn with fisherman and cormorants, Guilin, China",
    caption: "Guilin- the fisherman's dawn",
    description:
      "On the Li River near Xingping, traditional fishermen still use trained cormorants to catch fish, a method practiced in China for over 1,300 years. At dawn, a fisherman poles his bamboo raft past the 20,000 yuan note landscape- the iconic karst mountain panorama printed on China's currency. The mist of the preceding night has not fully lifted; the jagged limestone peaks appear as dark ink washes against an opal sky, each successive ridge a lighter shade of grey.",
    location: "Li River, Xingping, Guilin, Guangxi, China",
    date: "2023-10-11",
  },
  {
    id: "cn-04",
    src: "https://picsum.photos/seed/china4/1200/800",
    srcThumb: "https://picsum.photos/seed/china4/600/400",
    alt: "Terracotta Warriors pit with rows of ancient soldiers, Xi'an, China",
    caption: "Xi'an- an army of eight thousand",
    description:
      "The Terracotta Army of the First Emperor of China numbers over 8,000 soldiers, 670 horses, and 130 chariots- each figure unique in facial features, hairstyle, and rank insignia. In Pit 1, the largest of the three excavated pits, the scale becomes genuinely staggering: row after row of warriors standing at parade rest, many still partially buried, stretching the length of a football field in every direction. All were buried to protect the emperor in the afterlife 2,200 years ago.",
    location: "Museum of the Terracotta Warriors, Xi'an, Shaanxi, China",
    date: "2023-10-15",
  },
  {
    id: "cn-05",
    src: "https://picsum.photos/seed/china5/1200/800",
    srcThumb: "https://picsum.photos/seed/china5/600/400",
    alt: "The Bund waterfront skyline at night with Lujiazui towers, Shanghai, China",
    caption: "Shanghai- the Bund at midnight",
    description:
      "From the Bund's promenade on the west bank of the Huangpu River, the Lujiazui skyline across the water is one of the most dramatic urban panoramas on earth. The Oriental Pearl Tower, the Shanghai Tower (the world's second tallest building), and dozens of illuminated skyscrapers reflect in the river between the passing bulk carriers and tour boats. The Bund's colonial buildings at your back and this wall of 21st-century ambition ahead: the entirety of Shanghai's story told in a single frame.",
    location: "The Bund, Huangpu, Shanghai, China",
    date: "2023-10-06",
  },
  {
    id: "cn-06",
    src: "https://picsum.photos/seed/china6/1200/800",
    srcThumb: "https://picsum.photos/seed/china6/600/400",
    alt: "Forbidden City aerial view of gold rooftops at autumn sunset, Beijing, China",
    caption: "Beijing- the golden rooftops",
    description:
      "From Jingshan Hill directly north of the Forbidden City, the imperial complex unfolds in its entirety: 72 hectares of yellow-glazed roof tiles that glow orange-gold in the autumn afternoon light. The strict north-south symmetry of the layout, with the Hall of Supreme Harmony centred perfectly on the axis, demonstrates the cosmological precision with which the palace was planned. In autumn, the surrounding parkland turns the same amber as the tiles- a monochromatic harmony of gold across the entire panorama.",
    location: "Jingshan Park overlooking the Forbidden City, Beijing, China",
    date: "2023-10-02",
  },
  {
    id: "cn-07",
    src: "https://picsum.photos/seed/china7/1200/800",
    srcThumb: "https://picsum.photos/seed/china7/600/400",
    alt: "Yellow Mountain Huangshan pine tree on granite peak above sea of clouds, China",
    caption: "Huangshan- the pine above the clouds",
    description:
      "The iconic Welcoming Pine of Huangshan- over 1,000 years old, clinging to a granite outcrop above a sea of clouds- is China's most famous single tree. The Yellow Mountains are renowned for their 'four wonders': oddly shaped pine trees, strange rocks, seas of clouds, and hot springs. In autumn, when cloud inversions are most frequent, the upper peaks become islands in a white ocean, with only the crooked silhouettes of ancient pines breaking through the surface.",
    location: "Huangshan (Yellow Mountain), Anhui, China",
    date: "2023-10-13",
  },
  {
    id: "cn-08",
    src: "https://picsum.photos/seed/china8/1200/800",
    srcThumb: "https://picsum.photos/seed/china8/600/400",
    alt: "Shanghai Yu Garden pavilion and koi pond reflection in autumn, China",
    caption: "Shanghai - Yu Garden in still water",
    description:
      "Tucked behind the commercial chaos of the Old Town bazaar, the 16th-century Yu Garden is an oasis of classical Ming-dynasty garden design. The zigzag bridges, designed to confuse evil spirits who can only travel in straight lines, cross koi ponds whose surface mirrors the ornate pavilions above. In early autumn, persimmon trees are heavy with bright orange fruit and the air carries incense from the adjacent City God Temple. The garden is at its most photogenic in the two hours before it opens to the public.",
    location: "Yu Garden, Huangpu District, Shanghai, China",
    date: "2023-10-07",
  },
];

// -----------------------------------------------------------------------------
// ASSEMBLED TRIPS
// -----------------------------------------------------------------------------
export const trips: Trip[] = [
  {
    slug: "sri-lanka-2025",
    destination: "Sri Lanka",
    country: "Sri Lanka",
    continent: "Asia",
    startDate: "2025-03-06",
    endDate: "2025-03-20",
    coverSrc: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/01-gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka",
    excerpt:
      "An island of extraordinary contrasts- jungle-covered ruins, emerald tea hills, and powder-white beaches, all within a few hours' drive of each other.",
    description:
      "Sri Lanka is one of Asia's finest destinations for travel photography. The island's compact geography- just 430 km from tip to tip- packs in an astonishing diversity of landscapes: the ancient rock fortress of Sigiriya rising above the Cultural Triangle jungle, the cool mist-wrapped tea plantations of Nuwara Eliya, the colonial harbour of Galle with its Dutch-built fort walls, and the golden beaches of the south coast. The tropical light is intense and directional; the hour after sunrise and the hour before sunset reward photographers who keep early hours. Cultural subjects are equally rich: temple ceremonies, train journeys through the hill country on vintage British rolling stock, and fishing communities that still follow traditions unchanged for centuries. This March 2025 trip explored all five major regions in fifteen days.",
    photoCount: sriLankaPhotos.length,
    photos: sriLankaPhotos,
    tags: ["temples", "nature", "beaches", "culture", "trains"],
  },
  {
    slug: "bali-2024",
    destination: "Bali",
    country: "Indonesia",
    continent: "Asia",
    startDate: "2024-09-10",
    endDate: "2024-09-24",
    coverSrc: "https://picsum.photos/seed/bali-cover/1200/800",
    excerpt:
      "Between rice terraces and sea cliffs, Bali offers a density of visual and spiritual experiences that few islands on earth can match.",
    description:
      "Bali's photographic appeal lies in its layering of the sacred and the spectacular. The island's Hindu-Balinese culture produces an endless calendar of ceremony, offering, and ritual that fills every day with visual possibility. The Tegallalang rice terraces north of Ubud, carved over centuries by the subak communal irrigation system, are the island's most famous landscape subject- and one that justifies its reputation, particularly at the earliest light. Beyond the obvious, Bali rewards patient exploration: the cliffside temples of the Bukit Peninsula, the black-sand beaches of the north coast, the volcanic caldera at Batur, and the immaculately maintained palace gardens of the central highlands. September is dry season, bringing sharp light and clear horizons.",
    photoCount: baliPhotos.length,
    photos: baliPhotos,
    tags: ["temples", "rice-terraces", "spirituality", "sunsets", "culture"],
  },
  {
    slug: "thailand-2024",
    destination: "Thailand",
    country: "Thailand",
    continent: "Asia",
    startDate: "2024-02-15",
    endDate: "2024-02-28",
    coverSrc: "https://picsum.photos/seed/thailand-cover/1200/800",
    excerpt:
      "From Bangkok's frenetic streets to the misty valleys of northern Thailand, a journey through one of Southeast Asia's most photogenic countries.",
    description:
      "Thailand offers a spectrum of photographic environments that is difficult to match elsewhere in Southeast Asia. Bangkok is a city built for street photography: the interplay of ancient temple architecture and hypermodern commerce, the colour and chaos of its markets, and the cinematic quality of its river at dusk. In the north, Chiang Mai and its surrounding mountains offer an entirely different palette- cool morning mist, saffron-robed monks collecting alms at dawn, hill tribe villages set among forest ridges, and the slow pace of the Ping River valley. The historical parks of Ayutthaya and Sukhothai add layers of classical Thai civilisation. February falls in the cool dry season- ideal conditions for comfortable trekking and the clear atmospheric visibility that makes landscape photography most rewarding.",
    photoCount: thailandPhotos.length,
    photos: thailandPhotos,
    tags: ["street-photography", "temples", "night-markets", "culture", "nature"],
  },
  {
    slug: "japan-2023",
    destination: "Japan",
    country: "Japan",
    continent: "Asia",
    startDate: "2023-03-25",
    endDate: "2023-04-15",
    coverSrc: "https://picsum.photos/seed/japan-cover/1200/800",
    excerpt:
      "Three weeks chasing the cherry blossom front northward through Osaka, Kyoto, Nara, Hiroshima, and Tokyo - Japan at its most transcendent.",
    description:
      "The sakura season transforms Japan into one of the world's great photography destinations for roughly three weeks each spring. The blooming front moves northward from the warmer south, which means that following it across the country extends the season and enables encounters with the blossoms in dramatically different settings: below the vermillion torii of Fushimi Inari, reflected in the Motoyasu River beside Hiroshima's atomic dome, carpeting the grounds of Nara Park where deer graze beneath the petals, crowding the lantern-lit weeping cherry of Maruyama Park. Between blossom locations, Japan offers a nearly inexhaustible photographic curriculum: the abstract geometry of urban Tokyo, the ancient streetscapes of Gion, the precision craftsmanship visible in every food market and temple garden, and the extraordinary contrast between tradition and technological modernity that defines the country's visual identity.",
    photoCount: japanPhotos.length,
    photos: japanPhotos,
    tags: ["cherry-blossom", "temples", "street-photography", "tradition", "modern"],
  },
  {
    slug: "china-2023",
    destination: "China",
    country: "China",
    continent: "Asia",
    startDate: "2023-10-01",
    endDate: "2023-10-18",
    coverSrc: "https://picsum.photos/seed/china-cover/1200/800",
    excerpt:
      "Eighteen days across China's most spectacular landscapes- from the Great Wall and Forbidden City to the karst mountains of Guilin and the Avatar pillars of Zhangjiajie.",
    description:
      "China's scale makes comprehensive photography impossible- but the rewards of strategic selection are immense. The Golden Week holiday at the start of October coincides with the best autumn light and the early mist that makes the Li River and Yellow Mountain landscapes most atmospheric. Beijing concentrates millennia of imperial ambition into its palace complexes, walls, and parks; Shanghai represents China's breakneck modernisation in its most concentrated and photogenic form. The natural landscapes- the sandstone columns of Zhangjiajie, the limestone karst of Guilin, the granite peaks of Huangshan- offer a visual vocabulary unlike anywhere else on earth. The human subjects are equally compelling: Terracotta Warriors guard their emperor after 22 centuries, cormorant fishermen work the Li River by lamplight, and the Great Wall follows the mountain ridges to the horizon in both directions without end.",
    photoCount: chinaPhotos.length,
    photos: chinaPhotos,
    tags: ["great-wall", "nature", "architecture", "culture", "karst-mountains"],
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
