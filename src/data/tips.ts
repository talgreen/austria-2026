import type { Tip } from "./types";

/**
 * Trip-wide practical tips for Austria. Some are situational and get
 * routed to the specific day they matter via src/lib/tipsForDay.ts;
 * all of them also show in the home-page Tips section.
 */
export const tips: Tip[] = [
  {
    id: "vignette",
    title: "Buy a motorway Vignette before you drive",
    body:
      "Austria's motorways (Autobahn/Schnellstraße) require a Vignette toll sticker — drive without one and the fine is steep. For a rental, check whether one is already on the windscreen; if not, buy a digital 10-day Vignette online (asfinag.at) tied to the licence plate before you hit the first motorway out of Vienna. It is separate from the special toll roads below.",
    severity: "critical"
  },
  {
    id: "special-toll-roads",
    title: "Some scenic roads cost extra (Großglockner, Achensee)",
    body:
      "A handful of spectacular routes are NOT covered by the Vignette and charge their own toll — most notably the Großglockner High Alpine Road near Wildpark Ferleiten. Budget cash/card for these separately and check whether your day's drive uses one.",
    severity: "warning"
  },
  {
    id: "sunday-closures",
    title: "Shops close on Sundays — stock up Saturday",
    body:
      "Austrian supermarkets and most shops shut on Sundays and public holidays (15 August, Assumption, is a holiday and falls mid-trip). Restaurants and attractions stay open, but for groceries, nappies and picnic food, buy ahead on Saturday. In Vienna the BILLA Corso on Neuer Markt is a rare Sunday-open lifesaver.",
    severity: "warning"
  },
  {
    id: "alpine-weather",
    title: "Mountain weather flips fast — pack layers",
    body:
      "Even in August the high cable-car stations (Kitzsteinhorn at ~3,000 m, the Schmitten, the glacier platforms) are cold and windy, and afternoon thunderstorms build over the peaks. Pack a warm layer and a rain shell for everyone every day, do exposed summits in the morning, and check the day's mountain forecast before committing to a cable car.",
    severity: "warning"
  },
  {
    id: "stroller-vs-carrier",
    title: "Some highlights are carrier-only (no stroller)",
    body:
      "The big 'wow' stops on stairs and narrow walkways do NOT take a stroller: the Eisriesenwelt ice cave (~700 steps), the Salzwelten salt mine, the Sigmund-Thun gorge and the Krimml Waterfalls trail. Bring the baby carrier on those days and leave the pram in the car. Plenty of other days (Wildpark Ferleiten, Swarovski, the lakes, Vienna) are fully stroller-friendly.",
    severity: "info"
  },
  {
    id: "cash-still-king",
    title: "Carry some cash for the small alpine spots",
    body:
      "Cards work almost everywhere, but smaller mountain huts, parking machines, the odd climbing park (Anif is cash-only) and village bakeries still prefer or require cash. Keep €100–150 in small notes and coins for parking and snacks.",
    severity: "info"
  },
  {
    id: "tipping",
    title: "Tipping: round up ~5–10%, hand it directly",
    body:
      "In restaurants and cafés you tip by rounding up the bill — roughly 5–10% — and you hand it to the server (or say the total you want to pay) rather than leaving coins on the table. A coffee gets the change rounded up; a full dinner about 10%.",
    severity: "info"
  },
  {
    id: "lake-water-cold",
    title: "Alpine lakes are beautiful — and cold",
    body:
      "The turquoise lakes (Achensee, Zell am See, the Gosausee) look tropical but the water is bracing. For actual swimming with little ones, the heated lidos — Kirchberg's heated pool, the Zell am See Strandbad, Mondsee's Alpenseebad — are the comfortable bet. Bring water shoes for stony shores.",
    severity: "info"
  },
  {
    id: "book-ahead-august",
    title: "Book the timed-entry sights before you go",
    body:
      "August is peak season. Schönbrunn Palace, the ZOOM children's museum, the Salzwelten salt mine and the Eisriesenwelt ice cave all run on timed slots that sell out — book these online in advance. For the Zillertal steam train, reserve heritage-coach seats ahead too.",
    severity: "warning"
  },
  {
    id: "car-seats-driving",
    title: "Kids' car seats & alpine driving",
    body:
      "Austria requires height/age-appropriate child seats — confirm the rental provides the right seats for two kids plus an infant when you book. Alpine roads are well-built but winding; plan drive times generously with stops, and keep the dashcam-worthy passes (Gerlos, Glockner) for daytime.",
    severity: "info"
  }
];
