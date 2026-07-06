// Photo books offered "at cost" from a trip page. Data-driven so new books
// (future trips) are just a new entry here. The request is a simple WhatsApp
// message to Luca — no form, no checkout: he prints one and sends it.

export interface PhotoBook {
  /** Must match a trip slug in lib/destinations.ts (e.g. "bali-2026") */
  slug: string;
  title: string; // cover title, e.g. "BALI"
  year: string; // "2026"
  author: string;
  /** Kicker above the title, e.g. "The book" */
  kicker: string;
  /** Short paragraphs describing the book + the shooting style */
  paragraphs: string[];
  /** The "at cost, just message me" line */
  costLine: string;
  images: {
    front: string;
    back: string;
    spreads: string[];
  };
  /** Small spec chips */
  specs: string[];
  /** WhatsApp number in international format, digits only (no + or spaces) */
  whatsappNumber: string;
  /** Pre-filled WhatsApp message */
  whatsappMessage: string;
}

// Numero WhatsApp di Luca (formato internazionale, solo cifre)
const WHATSAPP_NUMBER = "393880514174";

const BOOKS: Record<string, PhotoBook> = {
  "bali-2026": {
    slug: "bali-2026",
    title: "BALI",
    year: "2026",
    author: "Luca Sammarco",
    kicker: "The book",
    paragraphs: [
      "My first photo book. A month and a half in Bali, from 13 May to 24 June 2026, most of it shot in movement from the back of a scooter threading through the streets.",
      "Vendors, riders, warungs and golden hour corners far from the postcard. Raw, hand held, honest street photography. The trip where I started shooting for real.",
    ],
    costLine:
      "I'm not selling it for profit. You cover only the printing and shipping. Just message me and I'll send you a copy.",
    images: {
      front: "/photobook/bali-2026/front.jpg",
      back: "/photobook/bali-2026/back.jpg",
      spreads: [
        "/photobook/bali-2026/spread-1.jpg",
        "/photobook/bali-2026/spread-2.jpg",
      ],
    },
    specs: ["Street series", "Shot on Sony A7C II", "At printing cost"],
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage: "Hi Luca! I'd love to request the BALI 2026 photo book 📖",
  },
};

export function getPhotoBook(slug: string): PhotoBook | null {
  return BOOKS[slug] ?? null;
}
