import type { Stay } from "./types";

/**
 * Where we sleep, in trip order. Region uses the two-zone model
 * ("north" = Vienna, "south" = the alpine loop). The two booked hotels
 * (Habachklause, Gut Wenghof) have verified addresses/coords; the
 * apartment/airbnb stays are pinned to their town centre until the exact
 * address is known.
 */
export const stays: Stay[] = [
  {
    id: "stay-vienna-arrival",
    name: "Vienna — arrival night",
    category: "stay",
    region: "north",
    shortDescription: "One night near central Vienna to land, sleep and reset",
    description:
      "A single night in Vienna after the evening landing — a hotel with breakfast near the centre, just to sleep off the flight before the morning drive west to Salzburg. (Exact hotel to be booked.)",
    address: "Vienna, Austria",
    coords: [48.2082, 16.3738],
    checkIn: "2026-08-08",
    checkOut: "2026-08-09",
    nights: 1,
    highlights: [
      "Land VIE 18:40, taxi/transfer straight to the hotel",
      "Breakfast included, then pick up the rental car for the drive to Salzburg",
      "Keep it simple — the real Vienna days come at the end of the trip"
    ],
    warnings: ["Exact hotel not booked yet — pick one with breakfast and easy car access."],
    image: "./images/stay-vienna-arrival.jpg"
  },
  {
    id: "stay-salzburg",
    name: "Salzburg apartment",
    category: "stay",
    region: "south",
    shortDescription: "Two nights in Salzburg — old town, fortress and day trips",
    description:
      "Two nights based in Salzburg for the fortress, the old town and easy day trips into the Salzkammergut lakes. A self-catering apartment makes mornings with the kids and the baby far easier.",
    address: "Salzburg, Austria",
    coords: [47.8095, 13.055],
    checkIn: "2026-08-09",
    checkOut: "2026-08-11",
    nights: 2,
    highlights: [
      "Walkable to the old town, Getreidegasse and Mirabell gardens",
      "Day trips to Fantasiana, Mondsee and Hellbrunn within ~40 min",
      "Stock the kitchen on arrival — shops shut on Sunday"
    ],
    warnings: ["Apartment still to be booked."],
    image: "./images/stay-salzburg.jpg"
  },
  {
    id: "stay-tyrol",
    name: "Zillertal apartment",
    category: "stay",
    region: "south",
    shortDescription: "Four nights in the Zillertal — Tyrol's classic family valley",
    description:
      "Four nights in the Zillertal, the broad green Tyrolean valley that puts Swarovski Kristallwelten, the nostalgia steam train, Achensee and a dozen family mountains within reach. A roomy apartment for the longest single stay of the first week.",
    address: "Zillertal, Tyrol, Austria",
    coords: [47.23, 11.88],
    checkIn: "2026-08-11",
    checkOut: "2026-08-15",
    nights: 4,
    bookingLink: "https://www.airbnb.com/rooms/1475560650829302761",
    website: "https://www.airbnb.com/rooms/1475560650829302761",
    highlights: [
      "Central Zillertal base — Swarovski ~30 min, Mayrhofen & the steam train close by",
      "Day trips to Achensee, Kitzbühel and the Zillertal Arena cable cars",
      "Four nights = unpack properly and find a rhythm"
    ],
    image: "./images/stay-tyrol.jpg"
  },
  {
    id: "stay-habachklause",
    name: "Hotel Habachklause",
    category: "stay",
    region: "south",
    shortDescription: "Five nights at a family farm-resort hotel in the Pinzgau",
    description:
      "A family-run Bauernhof resort hotel in Bramberg am Wildkogel, deep in the Pinzgau — the base for the Zell am See / Kaprun week, with the Großglockner road, the Sigmund-Thun gorge, the Kitzsteinhorn glacier and Wildpark Ferleiten all within an easy drive. Five nights, half-board, with farm animals on site for the kids.",
    address: "Habach 17, 5733 Bramberg am Wildkogel, Austria",
    coords: [47.24654, 12.32104],
    website: "https://www.habachklause.com/en/",
    bookingLink: "https://www.habachklause.com/en/",
    checkIn: "2026-08-15",
    checkOut: "2026-08-20",
    nights: 5,
    highlights: [
      "Family farm-resort — animals, pool and play areas on site",
      "Central for Zell am See, Kaprun, the Glockner road and Krimml",
      "Five nights of half-board: the comfortable heart of the trip"
    ],
    image: "./images/stay-habachklause.jpg"
  },
  {
    id: "stay-gutwenghof",
    name: "Gut Wenghof — Family Resort",
    category: "stay",
    region: "south",
    shortDescription: "Three nights at an all-inclusive family resort in Werfenweng, with friends",
    description:
      "An all-inclusive family resort in Werfenweng, shared with friends — kids' clubs, pools and animals on site, and a great launchpad for Hohenwerfen Castle, the Werfen ice cave, the Salzburg salt mine and a day trip to Hallstatt. Three relaxed nights to wind the trip down before Vienna.",
    address: "Weng 17, 5453 Werfenweng, Austria",
    coords: [47.46165, 13.25605],
    website: "https://gutwenghof.at/en/",
    bookingLink: "https://gutwenghof.at/en/",
    checkIn: "2026-08-20",
    checkOut: "2026-08-23",
    nights: 3,
    highlights: [
      "All-inclusive family resort — easy days with friends and kids' programmes",
      "Hohenwerfen Castle ~15 min; salt mine, ice cave and Hallstatt within reach",
      "A gentle wind-down before the drive to Vienna"
    ],
    image: "./images/stay-gutwenghof.jpg"
  },
  {
    id: "stay-vienna",
    name: "Vienna apartment",
    category: "stay",
    region: "north",
    shortDescription: "Three nights in Vienna to close the trip — palaces, the Prater and the Ferris wheel",
    description:
      "Three nights in a Vienna apartment for the city finale: the Prater and the giant Ferris wheel, Schönbrunn palace and zoo, the ZOOM children's museum and the old town. A central, self-catering base makes the last stretch with little ones easy.",
    address: "Vienna, Austria",
    coords: [48.2082, 16.3738],
    bookingLink: "https://www.airbnb.com/trips/v1/reservation-details/ro/RESERVATION2_CHECKIN/HMXN38SWYN",
    checkIn: "2026-08-23",
    checkOut: "2026-08-26",
    nights: 3,
    highlights: [
      "Central apartment for the Prater, Schönbrunn and the old town",
      "Stroller-friendly city — flat squares, U-Bahn lifts, big parks",
      "Fly home 26 Aug at 13:20, so the last morning is a calm pack-and-go"
    ],
    image: "./images/stay-vienna.jpg"
  }
];
