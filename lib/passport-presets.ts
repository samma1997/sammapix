/**
 * Passport photo presets — country data for programmatic pages.
 * This file is server-safe (no "use client" directive).
 * The client-side processing logic lives in passport-photo.ts.
 */

export interface PassportPreset {
  country: string;
  label: string;
  widthPx: number;
  heightPx: number;
  description: string;
  /** ISO 3166-1 alpha-2 code for flag display */
  flag: string;
}

export const PASSPORT_PRESETS: PassportPreset[] = [
  // ─── Americas ─────────────────────────────────────────────────────
  { country: "us", label: "US Passport (2×2″)", widthPx: 600, heightPx: 600, description: "United States passport and visa", flag: "🇺🇸" },
  { country: "canada", label: "Canada (50×70 mm)", widthPx: 591, heightPx: 827, description: "Canadian passport", flag: "🇨🇦" },
  { country: "mexico", label: "Mexico (35×45 mm)", widthPx: 413, heightPx: 531, description: "Mexican passport", flag: "🇲🇽" },
  { country: "brazil", label: "Brazil (50×70 mm)", widthPx: 591, heightPx: 827, description: "Brazilian passport", flag: "🇧🇷" },
  { country: "argentina", label: "Argentina (40×40 mm)", widthPx: 472, heightPx: 472, description: "Argentine passport", flag: "🇦🇷" },
  { country: "colombia", label: "Colombia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Colombian passport", flag: "🇨🇴" },
  { country: "chile", label: "Chile (35×45 mm)", widthPx: 413, heightPx: 531, description: "Chilean passport", flag: "🇨🇱" },
  { country: "peru", label: "Peru (35×45 mm)", widthPx: 413, heightPx: 531, description: "Peruvian passport", flag: "🇵🇪" },

  // ─── Europe ───────────────────────────────────────────────────────
  { country: "eu", label: "EU / Schengen (35×45 mm)", widthPx: 413, heightPx: 531, description: "European Union passport and ID", flag: "🇪🇺" },
  { country: "uk", label: "UK Passport (35×45 mm)", widthPx: 420, heightPx: 540, description: "United Kingdom passport", flag: "🇬🇧" },
  { country: "germany", label: "Germany (35×45 mm)", widthPx: 413, heightPx: 531, description: "German passport and ID card", flag: "🇩🇪" },
  { country: "france", label: "France (35×45 mm)", widthPx: 413, heightPx: 531, description: "French passport and ID", flag: "🇫🇷" },
  { country: "italy", label: "Italy (35×45 mm)", widthPx: 413, heightPx: 531, description: "Italian passport and ID", flag: "🇮🇹" },
  { country: "spain", label: "Spain (35×45 mm)", widthPx: 413, heightPx: 531, description: "Spanish passport and ID", flag: "🇪🇸" },
  { country: "netherlands", label: "Netherlands (35×45 mm)", widthPx: 413, heightPx: 531, description: "Dutch passport and ID", flag: "🇳🇱" },
  { country: "belgium", label: "Belgium (35×45 mm)", widthPx: 413, heightPx: 531, description: "Belgian passport", flag: "🇧🇪" },
  { country: "portugal", label: "Portugal (35×45 mm)", widthPx: 413, heightPx: 531, description: "Portuguese passport", flag: "🇵🇹" },
  { country: "sweden", label: "Sweden (35×45 mm)", widthPx: 413, heightPx: 531, description: "Swedish passport", flag: "🇸🇪" },
  { country: "norway", label: "Norway (35×45 mm)", widthPx: 413, heightPx: 531, description: "Norwegian passport", flag: "🇳🇴" },
  { country: "switzerland", label: "Switzerland (35×45 mm)", widthPx: 413, heightPx: 531, description: "Swiss passport and ID", flag: "🇨🇭" },
  { country: "austria", label: "Austria (35×45 mm)", widthPx: 413, heightPx: 531, description: "Austrian passport", flag: "🇦🇹" },
  { country: "poland", label: "Poland (35×45 mm)", widthPx: 413, heightPx: 531, description: "Polish passport and ID", flag: "🇵🇱" },
  { country: "ireland", label: "Ireland (35×45 mm)", widthPx: 413, heightPx: 531, description: "Irish passport", flag: "🇮🇪" },
  { country: "greece", label: "Greece (35×45 mm)", widthPx: 413, heightPx: 531, description: "Greek passport", flag: "🇬🇷" },
  { country: "czech-republic", label: "Czech Republic (35×45 mm)", widthPx: 413, heightPx: 531, description: "Czech passport", flag: "🇨🇿" },
  { country: "romania", label: "Romania (35×45 mm)", widthPx: 413, heightPx: 531, description: "Romanian passport", flag: "🇷🇴" },
  { country: "hungary", label: "Hungary (35×45 mm)", widthPx: 413, heightPx: 531, description: "Hungarian passport", flag: "🇭🇺" },
  { country: "denmark", label: "Denmark (35×45 mm)", widthPx: 413, heightPx: 531, description: "Danish passport", flag: "🇩🇰" },
  { country: "finland", label: "Finland (36×47 mm)", widthPx: 425, heightPx: 555, description: "Finnish passport", flag: "🇫🇮" },
  { country: "russia", label: "Russia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Russian passport", flag: "🇷🇺" },
  { country: "ukraine", label: "Ukraine (35×45 mm)", widthPx: 413, heightPx: 531, description: "Ukrainian passport", flag: "🇺🇦" },
  { country: "turkey", label: "Turkey (50×60 mm)", widthPx: 591, heightPx: 709, description: "Turkish passport", flag: "🇹🇷" },

  // ─── Asia ─────────────────────────────────────────────────────────
  { country: "india", label: "India (35×45 mm)", widthPx: 413, heightPx: 531, description: "Indian passport and visa", flag: "🇮🇳" },
  { country: "china", label: "China Visa (33×48 mm)", widthPx: 390, heightPx: 567, description: "Chinese visa application", flag: "🇨🇳" },
  { country: "japan", label: "Japan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Japanese passport", flag: "🇯🇵" },
  { country: "south-korea", label: "South Korea (35×45 mm)", widthPx: 413, heightPx: 531, description: "Korean passport", flag: "🇰🇷" },
  { country: "indonesia", label: "Indonesia (30×40 mm)", widthPx: 354, heightPx: 472, description: "Indonesian passport", flag: "🇮🇩" },
  { country: "thailand", label: "Thailand (35×45 mm)", widthPx: 413, heightPx: 531, description: "Thai passport", flag: "🇹🇭" },
  { country: "vietnam", label: "Vietnam (40×60 mm)", widthPx: 472, heightPx: 709, description: "Vietnamese passport", flag: "🇻🇳" },
  { country: "philippines", label: "Philippines (35×45 mm)", widthPx: 413, heightPx: 531, description: "Philippine passport", flag: "🇵🇭" },
  { country: "malaysia", label: "Malaysia (35×50 mm)", widthPx: 413, heightPx: 591, description: "Malaysian passport", flag: "🇲🇾" },
  { country: "singapore", label: "Singapore (35×45 mm)", widthPx: 413, heightPx: 531, description: "Singaporean passport", flag: "🇸🇬" },
  { country: "pakistan", label: "Pakistan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Pakistani passport", flag: "🇵🇰" },
  { country: "bangladesh", label: "Bangladesh (35×45 mm)", widthPx: 413, heightPx: 531, description: "Bangladeshi passport", flag: "🇧🇩" },
  { country: "sri-lanka", label: "Sri Lanka (35×45 mm)", widthPx: 413, heightPx: 531, description: "Sri Lankan passport", flag: "🇱🇰" },
  { country: "nepal", label: "Nepal (35×45 mm)", widthPx: 413, heightPx: 531, description: "Nepalese passport", flag: "🇳🇵" },
  { country: "taiwan", label: "Taiwan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Taiwan passport", flag: "🇹🇼" },
  { country: "hong-kong", label: "Hong Kong (40×50 mm)", widthPx: 472, heightPx: 591, description: "Hong Kong passport and ID", flag: "🇭🇰" },

  // ─── Middle East ──────────────────────────────────────────────────
  { country: "uae", label: "UAE (43×55 mm)", widthPx: 508, heightPx: 649, description: "UAE passport and Emirates ID", flag: "🇦🇪" },
  { country: "saudi-arabia", label: "Saudi Arabia (40×60 mm)", widthPx: 472, heightPx: 709, description: "Saudi passport and visa", flag: "🇸🇦" },
  { country: "israel", label: "Israel (35×45 mm)", widthPx: 413, heightPx: 531, description: "Israeli passport", flag: "🇮🇱" },
  { country: "iran", label: "Iran (30×40 mm)", widthPx: 354, heightPx: 472, description: "Iranian passport", flag: "🇮🇷" },

  // ─── Africa ───────────────────────────────────────────────────────
  { country: "south-africa", label: "South Africa (35×45 mm)", widthPx: 413, heightPx: 531, description: "South African passport", flag: "🇿🇦" },
  { country: "nigeria", label: "Nigeria (35×45 mm)", widthPx: 413, heightPx: 531, description: "Nigerian passport", flag: "🇳🇬" },
  { country: "egypt", label: "Egypt (40×60 mm)", widthPx: 472, heightPx: 709, description: "Egyptian passport", flag: "🇪🇬" },
  { country: "kenya", label: "Kenya (35×45 mm)", widthPx: 413, heightPx: 531, description: "Kenyan passport", flag: "🇰🇪" },
  { country: "morocco", label: "Morocco (35×45 mm)", widthPx: 413, heightPx: 531, description: "Moroccan passport", flag: "🇲🇦" },
  { country: "ethiopia", label: "Ethiopia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Ethiopian passport", flag: "🇪🇹" },

  // ─── Oceania ──────────────────────────────────────────────────────
  { country: "australia", label: "Australia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Australian passport", flag: "🇦🇺" },
  { country: "new-zealand", label: "New Zealand (35×45 mm)", widthPx: 413, heightPx: 531, description: "New Zealand passport", flag: "🇳🇿" },
];

export function getAllPassportPresets(): PassportPreset[] {
  return PASSPORT_PRESETS;
}

export function getPassportPresetByCountry(country: string): PassportPreset | undefined {
  return PASSPORT_PRESETS.find((p) => p.country === country);
}
