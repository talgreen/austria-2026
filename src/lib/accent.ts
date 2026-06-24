/** Per-area accent colours. Names map to the palette tokens already
 *  defined in src/index.css. accentClasses() is the ONLY place that
 *  turns an accent into Tailwind classes / hexes — components never
 *  hard-code a colour for area theming. */
export type AreaAccent = "terracotta" | "olive" | "lake" | "gold" | "sienna";

interface AccentClasses {
  /** Strong text colour, e.g. headings / eyebrows. */
  text: string;
  /** Left/leading border colour for cards & timeline spine. */
  border: string;
  /** Very soft background tint for bands/chips. */
  bgTint: string;
  /** Focus/selected ring. */
  ring: string;
  /** Small filled dot / pill background. */
  dot: string;
  /** Raw hex for Leaflet pin markers (no Tailwind there). */
  pinHex: string;
}

const MAP: Record<AreaAccent, AccentClasses> = {
  terracotta: {
    text: "text-terracotta-600",
    border: "border-terracotta-500",
    bgTint: "bg-terracotta-500/10",
    ring: "ring-terracotta-500/40",
    dot: "bg-terracotta-500",
    pinHex: "#C0392B"
  },
  olive: {
    text: "text-olive-700",
    border: "border-olive-500",
    bgTint: "bg-olive-500/10",
    ring: "ring-olive-500/40",
    dot: "bg-olive-500",
    pinHex: "#2F5E3F"
  },
  lake: {
    text: "text-lake-600",
    border: "border-lake-500",
    bgTint: "bg-lake-500/10",
    ring: "ring-lake-500/40",
    dot: "bg-lake-500",
    pinHex: "#2E8B9E"
  },
  gold: {
    text: "text-sienna-600",
    border: "border-gold-500",
    bgTint: "bg-gold-500/12",
    ring: "ring-gold-500/40",
    dot: "bg-gold-500",
    pinHex: "#B8862C"
  },
  sienna: {
    text: "text-sienna-600",
    border: "border-sienna-500",
    bgTint: "bg-sienna-500/10",
    ring: "ring-sienna-500/40",
    dot: "bg-sienna-500",
    pinHex: "#8B5A2B"
  }
};

export function accentClasses(a: AreaAccent): AccentClasses {
  return MAP[a];
}
