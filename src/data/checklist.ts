import type { ChecklistItem } from "./types";

/** Things to lock in BEFORE the trip — bookings, tickets and paperwork.
 *  `urgent` ones are the August-peak sell-outs and the no-go-without items. */
export const bookingChecklist: ChecklistItem[] = [
  {
    id: "book-salzburg-stay",
    text: "Book the Salzburg apartment (9–11 Aug)",
    detail: "The one gap in the lodging plan — lock a self-catering place walkable to the old town.",
    urgent: true
  },
  {
    id: "book-vienna-arrival-hotel",
    text: "Book the Vienna arrival-night hotel (8 Aug)",
    detail: "A hotel with breakfast near the centre, easy for a late landing and an early car pickup.",
    urgent: true
  },
  {
    id: "rental-car-seats",
    text: "Confirm the rental car + 2 child seats + 1 infant seat",
    detail: "Pickup in Vienna. Make sure the right car seats for two kids and a baby are on the booking, and that the Vignette is sorted (see below).",
    urgent: true
  },
  {
    id: "vignette",
    text: "Buy the digital motorway Vignette (10-day)",
    detail: "Tie it to the rental's plate before the first Autobahn out of Vienna — or confirm the rental already has one.",
    link: "https://www.asfinag.at/en/",
    urgent: true
  },
  {
    id: "book-schoenbrunn",
    text: "Book Schönbrunn Palace timed entry (25 Aug)",
    detail: "Timed slots sell out in August; the 08:30 first slot beats the crowds and heat.",
    link: "https://www.schoenbrunn.at/en/",
    urgent: true
  },
  {
    id: "book-zoom",
    text: "Book ZOOM Children's Museum slots (25 Aug)",
    detail: "ZOOM Ocean (baby soft-play) sells out fast in the August holidays — book up to 10 days ahead.",
    link: "https://www.kindermuseum.at/en"
  },
  {
    id: "book-salzwelten",
    text: "Book the Salzwelten salt mine tour (22 Aug)",
    detail: "Fixed-group timed tours; reserve online for August.",
    link: "https://www.salzwelten.at/en/salzburg"
  },
  {
    id: "book-steam-train",
    text: "Reserve Zillertal steam-train seats (13 Aug, a Thursday)",
    detail: "Runs Tue–Thu only; heritage-coach seats are limited at peak August. Jenbach dep 10:44.",
    link: "https://www.zillertalbahn.at/"
  },
  {
    id: "book-hohenwerfen",
    text: "Pre-buy Hohenwerfen Castle tickets (22 Aug)",
    detail: "Aim the visit at a birds-of-prey show (11:15 or 14:15).",
    link: "https://www.salzburg-burgen.at/en/hohenwerfen-castle/"
  },
  {
    id: "travel-docs",
    text: "Passports, EHIC/travel insurance, IDP for the driver",
    detail: "Photograph all documents and the rental contract; keep digital + paper copies."
  }
];

/** What to pack — tuned to an August family road trip with two young kids
 *  and a baby, swinging between hot valleys and cold 3,000 m summits. */
export const packingChecklist: ChecklistItem[] = [
  {
    id: "baby-carrier",
    text: "Baby carrier AND a stroller",
    detail: "You need both: the carrier for the ice cave, salt mine, gorge and waterfall (stairs/no pram); the stroller for the lakes, Vienna and Wildpark Ferleiten."
  },
  {
    id: "warm-layers",
    text: "Warm layers + rain shells for everyone",
    detail: "It's near-freezing on the Kitzsteinhorn glacier and cold on every high cable car, even in an August heatwave. One warm layer + a packable rain jacket per person, every day."
  },
  {
    id: "sun-protection",
    text: "Sun hats, high-SPF sunscreen, sunglasses",
    detail: "Alpine sun is fierce at altitude and around the lakes; bring shade (a clip-on sunshade or pop-up tent) for the baby."
  },
  {
    id: "swimwear",
    text: "Swimwear, towels & water shoes",
    detail: "For the heated lidos (Kirchberg, Zell am See, Mondsee) and hotel pools. Water shoes help on stony lake shores."
  },
  {
    id: "closed-shoes",
    text: "Closed walking shoes + grippy soles",
    detail: "For the gorge walkways, the cave stairs and the waterfall trail. Sandals won't cut it on the wet rock."
  },
  {
    id: "cash",
    text: "€100–150 in cash (small notes & coins)",
    detail: "Parking machines, mountain huts and the odd cash-only spot (Anif climbing park). Cards work most places."
  },
  {
    id: "eu-adapter",
    text: "EU power adapters (Type C/F) + chargers",
    detail: "Austria uses the standard European two-pin sockets."
  },
  {
    id: "meds-firstaid",
    text: "Kids' meds + a small first-aid kit",
    detail: "Children's paracetamol/ibuprofen, plasters, motion-sickness remedy for the winding alpine roads, any prescriptions."
  },
  {
    id: "snacks-water",
    text: "Refillable water bottles & car snacks",
    detail: "Tap water is excellent everywhere. Keep snacks and bottles topped up for the longer drives between bases."
  },
  {
    id: "day-pack",
    text: "A comfortable day pack",
    detail: "For layers, water, snacks and nappies on the cable-car and trail days."
  }
];
