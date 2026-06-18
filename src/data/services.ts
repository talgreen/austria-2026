import type { Service } from "./types";

/**
 * One supermarket + one family-friendly restaurant near each base.
 * region/base use the two-zone model ("north" = Vienna & Salzburg city
 * group, "south" = the alpine bases). Coordinates and addresses verified
 * 2026; reconfirm Sunday/seasonal hours the week of travel (Austrian
 * shops mostly close on Sundays).
 */
export const services: Service[] = [
  // ==================== Salzburg ====================
  {
    id: "salzburg-spar-getreidegasse",
    name: "Spar (Getreidegasse)",
    category: "supermarket",
    region: "north",
    base: "north",
    shortDescription: "Small Spar on the main old-town shopping street, by Mozart's birthplace.",
    description:
      "A handy small-format Spar right on Getreidegasse for picking up breakfast, fruit and picnic bits in the old town. Like almost all Austrian shops it closes on Sundays, so stock up on Saturday.",
    address: "Getreidegasse 9, 5020 Salzburg",
    coords: [47.8000305, 13.0435038],
    website: "https://www.spar.at/",
    hours: "Mon–Fri 08:00–20:00, Sat 08:00–18:00; closed Sun"
  },
  {
    id: "salzburg-sternbraeu",
    name: "Sternbräu",
    category: "restaurant",
    region: "north",
    base: "north",
    shortDescription: "Historic Austrian beer hall (since 1542) with a dedicated kids' playroom.",
    description:
      "A big, cheerful old-town beer hall serving schnitzel, dumplings and Austrian classics across several courtyards — and crucially, a dedicated indoor kids' playroom that buys the parents a calm meal. An easy, reliable family dinner in the centre of Salzburg.",
    address: "Griesgasse 23, 5020 Salzburg",
    coords: [47.8004856, 13.0411534],
    website: "https://www.sternbrau.at/",
    hours: "Sun–Thu 11:30–23:00, Fri–Sat 11:30–24:00"
  },

  // ==================== Zillertal, Tyrol ====================
  {
    id: "zillertal-mpreis-mayrhofen",
    name: "MPREIS Mayrhofen",
    category: "supermarket",
    region: "south",
    base: "south",
    shortDescription: "Tyrol's MPREIS with an in-store Baguette café, butcher and parking.",
    description:
      "A full-size Tyrolean MPREIS in Mayrhofen with an in-store Baguette café, butcher counter, ATM and easy parking — the practical re-stock for the Zillertal days.",
    address: "Tuxer Straße 799, 6290 Mayrhofen",
    coords: [47.159619, 11.84941],
    website: "https://www.mpreis.at/",
    hours: "Mon–Sat 07:30–19:00; closed Sun"
  },
  {
    id: "zillertal-mamma-mia",
    name: "Pizzeria Mamma Mia",
    category: "restaurant",
    region: "south",
    base: "south",
    shortDescription: "Central Mayrhofen family pizzeria — wood-fired pizza & pasta, free parking.",
    description:
      "A central, family-friendly pizzeria in Mayrhofen doing reliable wood-fired pizza and pasta — the easy crowd-pleaser after a mountain day, with free parking.",
    address: "Einfahrt Mitte 432, 6290 Mayrhofen",
    coords: [47.1674191, 11.8611047],
    website: "https://www.pizza-mayrhofen.com/",
    hours: "Tue–Sun 11:00–14:00 & 16:30–22:30; closed Mon"
  },

  // ==================== Zell am See / Kaprun ====================
  {
    id: "zellamsee-spar",
    name: "SPAR Zell am See",
    category: "supermarket",
    region: "south",
    base: "south",
    shortDescription: "Full-size year-round SPAR in the Schüttdorf area of Zell am See.",
    description:
      "A full-size SPAR near Zell am See with long hours and (seasonally) even a Sunday afternoon window — the main re-stock for the Pinzgau week at Habachklause.",
    address: "Brucker Bundesstraße 4, 5700 Zell am See",
    coords: [47.3227874, 12.7962447],
    website: "https://www.spar.at/",
    hours: "Mon–Fri 06:50–19:00, Sat 06:50–18:00, Sun/hol 14:00–18:00 (seasonal)"
  },
  {
    id: "kaprun-dorfkrug",
    name: "Dorfkrug Kaprun",
    category: "restaurant",
    region: "south",
    base: "south",
    shortDescription: "Family-run Kaprun restaurant — schnitzel, steaks and stone-oven pizza.",
    description:
      "A warm, family-run restaurant in the middle of Kaprun serving Austrian classics, steaks and stone-oven pizza — a dependable dinner after a day on the Kitzsteinhorn or in the Sigmund-Thun gorge.",
    address: "Achenstraße 2, 5710 Kaprun",
    coords: [47.2682141, 12.753125],
    website: "https://www.dorfkrug-kaprun.at/en",
    hours: "Tue–Sun 11:00–23:00; closed Mon"
  },

  // ==================== Werfenweng / Bischofshofen ====================
  {
    id: "bischofshofen-spar",
    name: "SPAR Bischofshofen",
    category: "supermarket",
    region: "south",
    base: "south",
    shortDescription: "Full-size SPAR in central Bischofshofen, near Werfenweng.",
    description:
      "A full-size SPAR in Bischofshofen, the nearest big town to Werfenweng — handy for any supplies the all-inclusive resort doesn't cover.",
    address: "Südtirolerstraße 79a, 5500 Bischofshofen",
    coords: [47.4300003, 13.2132662],
    website: "https://www.spar.at/",
    hours: "Mon–Fri 07:00–18:30, Sat 07:00–18:00; closed Sun"
  },
  {
    id: "bischofshofen-papa-roy",
    name: "Papa Roy",
    category: "restaurant",
    region: "south",
    base: "south",
    shortDescription: "Family pizzeria, restaurant & café near Werfenweng.",
    description:
      "A friendly family pizzeria-restaurant-café near Werfenweng with pizza, pasta and Austrian fare — a good break on a day out from Gut Wenghof.",
    address: "Salzburger Straße 78, 5500 Bischofshofen",
    coords: [47.4233547, 13.2156327],
    website: "https://www.paparoy.at/",
    hours: "Thu–Mon 11:00–22:00; closed Tue–Wed"
  },

  // ==================== Vienna ====================
  {
    id: "vienna-billa-corso",
    name: "BILLA Corso (Neuer Markt)",
    category: "supermarket",
    region: "north",
    base: "north",
    shortDescription: "Upscale 3-level BILLA flagship in the 1st district — rare Sunday opening.",
    description:
      "An upscale, three-level BILLA Corso flagship right in the 1st district with a deli and hot food — and, unusually for Austria, it opens on Sundays, which makes it the lifesaver for the Vienna days.",
    address: "Neuer Markt 17, 1010 Wien",
    coords: [48.2068904, 16.3709632],
    website: "https://www.billa.at/",
    hours: "Mon–Sat 08:00–20:00, Sun/hol 10:00–20:00"
  },
  {
    id: "vienna-luftburg-kolarik",
    name: "Luftburg – Kolarik im Prater",
    category: "restaurant",
    region: "north",
    base: "north",
    shortDescription: "Family beer-garden in the Prater with a 1,000 m² indoor bouncy-castle play world.",
    description:
      "A huge family beer-garden in the Prater — organic Austrian food for the grown-ups and a 1,000 m² indoor bouncy-castle play world for the kids, a few steps from the giant Ferris wheel. Possibly the most kid-proof dinner in Vienna.",
    address: "Waldsteingartenstraße 128, 1020 Wien",
    coords: [48.2131202, 16.4034768],
    website: "https://kolarik.at/en/luftburg/",
    hours: "Mon–Thu 16:00–23:00, Fri–Sun 11:00–23:00 (seasonal)"
  }
];

export function getService(id: string): Service | undefined {
  return services.find(s => s.id === id);
}
