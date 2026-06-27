import type { Day } from "./types";

/**
 * Austria 2026 — 18 day-chapters, 9–26 August. A road loop from Vienna
 * out to Salzburg, across Tyrol's Zillertal, into the Pinzgau lakes and
 * back to Vienna. Region uses the two-zone model ("north" = Vienna,
 * "south" = the Alps, "transit" = a big moving day). `italianWords`
 * carries the German word-of-the-day (the field name is a leftover from
 * the shell; the content is German). Activity `attractionId`s link to
 * attractions.ts so the map and hero photos stay in sync.
 */
export const itinerary: Day[] = [
  {
    dayNumber: 1,
    date: "2026-08-09",
    weekday: "Sunday",
    departureTime: "09:30",
    region: "transit",
    base: "Salzburg",
    title: "Drive west to Salzburg",
    subtitle: "Lunch by a Salzkammergut lake, then the fortress over the old town",
    leadImage: "./images/hohensalzburg-fortress.jpg",
    rideToFirst: { duration: "3 h 25", note: "Vienna → Salzburg via the A1" },
    activities: [
      {
        time: "Morning",
        title: "Pick up the car, drive the A1 toward Salzburg",
        description: "Roughly 3.5 hours west. Break the drive at Mondsee — it sits right off the A1 with its own exit, a flat lakeside promenade and a beach for a leg-stretch lunch.",
        attractionId: "mondsee",
        tag: "water",
        rideToNext: { duration: "30 min", note: "Mondsee → Salzburg", departAt: "14:00" }
      },
      {
        time: "Afternoon",
        title: "Arrive in Salzburg, ride up to Hohensalzburg Fortress",
        description: "Settle into the apartment, then take the funicular up to the fortress for the big view over the city and river before dinner.",
        attractionId: "hohensalzburg-fortress",
        tag: "view"
      }
    ],
    driveNotes: "Vienna → Salzburg ≈ 3 h 25 via the A1 (Vignette required). Mondsee is the natural lunch break.",
    restaurants: ["salzburg-sternbraeu"],
    drinkOfTheDay: {
      name: "Stiegl",
      type: "beer",
      pairing: "Salzburg's own lager, crisp and cold after a long driving day — order a small one with the schnitzel and let the kids loose in Sternbräu's playroom.",
      servingNote: "A 'Radler' (half beer, half lemonade) is the lighter option."
    },
    gear: [
      { item: "Swimwear & a towel for a quick Mondsee paddle", for: "mondsee" },
      { item: "Picnic / lunch supplies (Sunday — shops shut)" },
      { item: "Sun hats & sunscreen for the fortress courtyards" }
    ],
    dayTips: [
      "It's Sunday — shops are closed; rely on what you packed plus lakeside restaurants",
      "Stock the apartment Monday morning for the days ahead",
      "Buy the fortress all-inclusive ticket online to skip the funicular queue"
    ],
    italianWords: [
      { word: "der See", pronounce: "dair ZAY", meaning: "the lake", example: "Der See ist so blau!", exampleMeaning: "The lake is so blue!" },
      { word: "die Burg", pronounce: "dee BOORG", meaning: "the castle / fortress", example: "Die Burg ist hoch oben.", exampleMeaning: "The fortress is high up." },
      { word: "Eis", pronounce: "ICE", meaning: "ice cream", example: "Ein Eis, bitte!", exampleMeaning: "An ice cream, please!" }
    ]
  },
  {
    dayNumber: 2,
    date: "2026-08-10",
    weekday: "Monday",
    region: "south",
    base: "Salzburg",
    title: "A theme-park morning & the old town",
    subtitle: "Fantasiana (or a lake/ropes park), then Getreidegasse and Mirabell",
    leadImage: "./images/mirabell-palace-gardens.jpg",
    activities: [
      {
        time: "Morning",
        title: "Fantasiana Adventure Park",
        description: "Austria's biggest theme park, 40 minutes north — gentle, fairytale-themed rides that actually suit toddlers and pre-schoolers. Go at opening before the heat.",
        attractionId: "fantasiana-erlebnispark",
        tag: "family",
        rideToNext: { duration: "40 min", note: "Straßwalchen → Salzburg old town" }
      },
      {
        time: "Afternoon",
        title: "Getreidegasse & Mirabell Gardens",
        description: "Stroll the iron-sign shopping lane (ice cream stop mandatory), then cross the river to the free baroque gardens — flat, pram-friendly, with a dwarf garden and a hedge maze.",
        attractionId: "mirabell-palace-gardens",
        tag: "culture"
      },
      {
        time: "Alternative",
        title: "Kletterpark Anif or Mondsee (if you'd rather)",
        description: "Swap the theme park for the Anif forest ropes-and-swim park (20 min) or a slower Mondsee lake day, depending on the kids' mood.",
        attractionId: "kletterpark-waldbad-anif",
        tag: "extreme",
        optional: true
      }
    ],
    restaurants: ["salzburg-sternbraeu"],
    drinkOfTheDay: {
      name: "Hugo Spritz",
      type: "aperitif",
      pairing: "Elderflower, prosecco, mint and soda — light and floral, the perfect early-evening sip on an old-town terrace while the kids finish their gelato.",
      servingNote: "Tall glass over ice with a sprig of mint and a lime wheel."
    },
    gear: [
      { item: "Stroller — both the park and the gardens are pram-friendly" },
      { item: "Sun protection & water for the open theme park" },
      { item: "Light cash for parking machines" }
    ],
    dayTips: [
      "Fantasiana's last admission is 16:00 — go in the morning",
      "Park outside the old-town core and walk in to Getreidegasse",
      "The Mirabell gardens are free — a good budget afternoon"
    ],
    italianWords: [
      { word: "die Gasse", pronounce: "dee GAH-seh", meaning: "the lane / alley", example: "Eine schöne Gasse.", exampleMeaning: "A pretty lane." },
      { word: "der Garten", pronounce: "dair GAR-ten", meaning: "the garden", example: "Der Garten ist gratis.", exampleMeaning: "The garden is free." },
      { word: "schön", pronounce: "shurn", meaning: "beautiful / nice", example: "Wie schön!", exampleMeaning: "How lovely!" }
    ]
  },
  {
    dayNumber: 3,
    date: "2026-08-11",
    weekday: "Tuesday",
    departureTime: "09:30",
    region: "south",
    base: "Zillertal, Tyrol",
    title: "Over to the Zillertal",
    subtitle: "A mountain playground on the way, then settle into the valley",
    leadImage: "./images/ellmis-zauberwelt-hartkaiser.jpg",
    rideToFirst: { duration: "2 h", note: "Salzburg → Ellmau" },
    activities: [
      {
        time: "Morning",
        title: "Ellmi's Magic World on the Hartkaiser",
        description: "Break the drive in Ellmau: ride the gondola up to a dragon-themed kids' playground at 1,555 m with the Wilder Kaiser as a backdrop. The play world starts right at the mountain station.",
        attractionId: "ellmis-zauberwelt-hartkaiser",
        tag: "family",
        rideToNext: { duration: "1 h 15", note: "Ellmau → the Zillertal" }
      },
      {
        time: "Afternoon",
        title: "Arrive in the Zillertal, settle & stock up",
        description: "Unpack into the apartment for the longest stop of the first week. Hit the MPREIS in Mayrhofen for the days ahead and let the kids decompress."
      }
    ],
    driveNotes: "Salzburg → Zillertal ≈ 2 h, with the Ellmau cable car as the mid-point break.",
    restaurants: ["zillertal-mamma-mia", "zillertal-mpreis-mayrhofen"],
    drinkOfTheDay: {
      name: "Zillertaler Radler",
      type: "beer",
      pairing: "A shandy on the apartment balcony as you unpack — half local lager, half lemonade, low and refreshing after a travel day.",
      servingNote: "Served long and cold."
    },
    gear: [
      { item: "Carrier for the Hartkaiser panorama paths", for: "ellmis-zauberwelt-hartkaiser" },
      { item: "A warm layer for the mountain top" },
      { item: "Reusable bags for the big Mayrhofen shop" }
    ],
    dayTips: [
      "Four nights here — unpack properly and find a rhythm",
      "MPREIS Mayrhofen is the main re-stock; it shuts Sundays",
      "Tomorrow's steam train runs Tue–Thu — plan around Thursday"
    ],
    italianWords: [
      { word: "der Berg", pronounce: "dair BAIRG", meaning: "the mountain", example: "Auf den Berg, hinauf!", exampleMeaning: "Up the mountain we go!" },
      { word: "die Seilbahn", pronounce: "dee ZILE-bahn", meaning: "the cable car", example: "Wir fahren mit der Seilbahn.", exampleMeaning: "We're taking the cable car." },
      { word: "der Drache", pronounce: "dair DRAH-kheh", meaning: "the dragon", example: "Wo ist der Drache?", exampleMeaning: "Where is the dragon?" }
    ]
  },
  {
    dayNumber: 4,
    date: "2026-08-12",
    weekday: "Wednesday",
    region: "south",
    base: "Zillertal, Tyrol",
    title: "Crystal worlds & a Kitzbühel lake",
    subtitle: "Swarovski Kristallwelten, then a heated lake near Kitzbühel",
    leadImage: "./images/swarovski-kristallwelten.jpg",
    activities: [
      {
        time: "Morning",
        title: "Swarovski Kristallwelten",
        description: "A glittering crystal art world with a giant garden playground — the Chambers of Wonder indoors, the four-storey Play Tower and maze outside. Fully stroller-friendly. A must.",
        attractionId: "swarovski-kristallwelten",
        tag: "culture",
        rideToNext: { duration: "50 min", note: "Wattens → Kirchberg / Kitzbühel" }
      },
      {
        time: "Afternoon",
        title: "Kirchberg lake & a Kitzbühel stroll",
        description: "Cool off at the Kirchberg bathing lake (heated pool ~26°C, shallow kids' zone), then a gentle wander through pastel Kitzbühel for an ice cream.",
        attractionId: "badesee-kirchberg-tirol",
        tag: "water"
      },
      {
        time: "Alternative",
        title: "Fichtenschloss on the Rosenalm (backup)",
        description: "A mountain-top wooden adventure castle reached by the Rosenalm cable car, with a buggy-friendly loop to a little lake — a great rainy-or-restless plan B.",
        attractionId: "fichtenschloss-rosenalm",
        tag: "family",
        optional: true
      }
    ],
    restaurants: ["zillertal-mamma-mia"],
    drinkOfTheDay: {
      name: "Almdudler",
      type: "other",
      pairing: "Tonight the whole family drinks like locals — Austria's golden herbal lemonade, fizzy and a little floral. Kids and grown-ups alike; the most Austrian soft drink there is.",
      servingNote: "Ice cold, with a slice of lemon."
    },
    gear: [
      { item: "Swimwear, towels & water shoes for the lake", for: "badesee-kirchberg-tirol" },
      { item: "Stroller — Swarovski is fully pram-friendly", for: "swarovski-kristallwelten" },
      { item: "Sun hats for the open lawns" }
    ],
    dayTips: [
      "Do Swarovski's indoor Chambers at 09:00, then the outdoor play areas from 10:00",
      "The Kirchberg pool is heated — warmer than any alpine lake",
      "Free parking at Swarovski"
    ],
    italianWords: [
      { word: "der Kristall", pronounce: "dair kris-TAHL", meaning: "the crystal", example: "So viele Kristalle!", exampleMeaning: "So many crystals!" },
      { word: "das Wasser", pronounce: "dass VAH-ser", meaning: "the water", example: "Das Wasser ist warm.", exampleMeaning: "The water is warm." },
      { word: "baden", pronounce: "BAH-den", meaning: "to swim / bathe", example: "Gehen wir baden!", exampleMeaning: "Let's go for a swim!" }
    ]
  },
  {
    dayNumber: 5,
    date: "2026-08-13",
    weekday: "Thursday",
    region: "south",
    base: "Zillertal, Tyrol",
    title: "All aboard the steam train",
    subtitle: "The 100-year-old Zillertal steam train to Mayrhofen and back",
    leadImage: "./images/zillertalbahn-steam-train.jpg",
    activities: [
      {
        time: "10:44",
        title: "Zillertal nostalgia steam train from Jenbach",
        description: "Board the coal-fired heritage train at Jenbach (dep 10:44) for the gentle narrow-gauge run up the valley — open windows, the smell of steam, pure storybook magic for the kids.",
        attractionId: "zillertalbahn-steam-train",
        tag: "family"
      },
      {
        time: "Lunch",
        title: "Lunch in Mayrhofen",
        description: "Arrive Mayrhofen 12:16, grab a relaxed lunch in town, then catch the 13:35 steam service back to Jenbach (arr 15:04) — or the regular half-hourly train if nap timing slips.",
        link: "https://www.mayrhofen.at/en/"
      },
      {
        time: "Afternoon",
        title: "Easy afternoon back at base",
        description: "A loose afternoon by the apartment or a short valley stroll — a deliberately gentle day in the middle of the week."
      }
    ],
    driveNotes: "Drive to Jenbach station for the 10:44 departure; the train does the rest.",
    restaurants: ["zillertal-mamma-mia"],
    drinkOfTheDay: {
      name: "Apfelsaft gespritzt",
      type: "other",
      pairing: "After a hot day on the rails, the family classic — cloudy apple juice topped with soda. Long, cold and unhurried, for everyone.",
      servingNote: "Tall glass, plenty of ice."
    },
    gear: [
      { item: "Carrier — vintage carriages have narrow steps", for: "zillertalbahn-steam-train" },
      { item: "A light layer for cool valley mornings" },
      { item: "Wet wipes (it's a real coal train — a little soot is part of the charm)" }
    ],
    dayTips: [
      "The steam train only runs Tue–Thu — today (Thursday) is the day",
      "Reserve heritage-coach seats ahead for August",
      "Sit a row back from the open windows with the baby"
    ],
    italianWords: [
      { word: "der Zug", pronounce: "dair TSOOK", meaning: "the train", example: "Der Zug fährt um 10:44.", exampleMeaning: "The train leaves at 10:44." },
      { word: "der Dampf", pronounce: "dair DAHMPF", meaning: "the steam", example: "So viel Dampf!", exampleMeaning: "So much steam!" },
      { word: "schnell", pronounce: "shnell", meaning: "fast", example: "Nicht so schnell!", exampleMeaning: "Not so fast!" }
    ]
  },
  {
    dayNumber: 6,
    date: "2026-08-14",
    weekday: "Friday",
    region: "south",
    base: "Zillertal, Tyrol",
    title: "Cheese farm & the Achensee",
    subtitle: "A show-dairy in the morning, a turquoise lake cruise in the afternoon",
    leadImage: "./images/achensee-schifffahrt.jpg",
    activities: [
      {
        time: "Morning",
        title: "Erlebnissennerei Zillertal (show-dairy)",
        description: "Watch real cheese being made through the glass, then meet the cows and goats outside. Cheese-making runs in the morning, so go soon after 09:00. Under-7s free.",
        attractionId: "erlebnissennerei-zillertal",
        tag: "food",
        rideToNext: { duration: "40 min", note: "Mayrhofen → Pertisau am Achensee" }
      },
      {
        time: "Afternoon",
        title: "Karwendel cable car + Achensee cruise",
        description: "At Pertisau, ride the Karwendel-Bergbahn to a stroller-friendly viewpoint over the lake, then take a short, calm boat hop across the impossibly turquoise Achensee. A must.",
        attractionId: "achensee-schifffahrt",
        tag: "water"
      }
    ],
    driveNotes: "Mayrhofen → Pertisau ≈ 40 min. The cable car and the boat are both in Pertisau — one easy base for the afternoon.",
    restaurants: ["zillertal-mamma-mia"],
    drinkOfTheDay: {
      name: "Grüner Veltliner G'spritzter",
      type: "wine",
      pairing: "A white-wine spritzer to toast the last Zillertal night — light and summery after a day of cheese and lake air.",
      servingNote: "Half wine, half soda, served very cold."
    },
    gear: [
      { item: "A warm layer for the Karwendel summit and the breezy boat", for: "achensee-schifffahrt" },
      { item: "Carrier for boarding the boat (fold the stroller)" },
      { item: "Appetite for cheese tasting" }
    ],
    dayTips: [
      "Cheese-making is a morning thing — arrive early at the dairy",
      "The short Pertisau→Seespitz hop is the right length for young kids",
      "Pack up tonight — tomorrow you move bases"
    ],
    italianWords: [
      { word: "der Käse", pronounce: "dair KAY-zeh", meaning: "the cheese", example: "Frischer Käse!", exampleMeaning: "Fresh cheese!" },
      { word: "die Kuh", pronounce: "dee KOO", meaning: "the cow", example: "Schau, eine Kuh!", exampleMeaning: "Look, a cow!" },
      { word: "das Boot", pronounce: "dass BOAT", meaning: "the boat", example: "Wir fahren mit dem Boot.", exampleMeaning: "We're going by boat." }
    ]
  },
  {
    dayNumber: 7,
    date: "2026-08-15",
    weekday: "Saturday",
    departureTime: "09:30",
    region: "transit",
    base: "Zell am See / Pinzgau",
    title: "Waterfalls on the way to the Pinzgau",
    subtitle: "Pack up, stop at Europe's tallest waterfall, settle at Habachklause",
    leadImage: "./images/krimml-waterfalls.jpg",
    rideToFirst: { duration: "1 h", note: "Zillertal → Krimml (over the Gerlos Pass)" },
    activities: [
      {
        time: "Morning",
        title: "Krimml Waterfalls",
        description: "On the drive over the Gerlos Pass, stop at Europe's tallest waterfall. The lowest viewpoint is a 10–15 minute walk and already the full roar-and-mist 'wow' — turn back there with the baby; the upper trail is steep.",
        attractionId: "krimml-waterfalls",
        tag: "water",
        rideToNext: { duration: "1 h", note: "Krimml → Bramberg / Habachklause" }
      },
      {
        time: "Afternoon",
        title: "Arrive at Habachklause, relax",
        description: "Settle into the family farm-resort for five nights of half-board. Meet the farm animals, find the pool, and take a slow 2–3 hours to land."
      }
    ],
    driveNotes: "Zillertal → Pinzgau ≈ 1 h 30 over the scenic Gerlos road (a special toll road — have a card ready), with Krimml as the natural break.",
    restaurants: ["kaprun-dorfkrug"],
    drinkOfTheDay: {
      name: "Stiegl Weisse",
      type: "beer",
      pairing: "A cloudy wheat beer on the resort terrace as the kids meet the farm animals — soft, refreshing, and a quiet 'halfway there' toast.",
      servingNote: "Served in a tall wheat-beer glass."
    },
    gear: [
      { item: "Carrier — the waterfall trail is too steep for a stroller", for: "krimml-waterfalls" },
      { item: "A light rain layer for the waterfall spray" },
      { item: "Grippy shoes for the kids on the wet path" }
    ],
    dayTips: [
      "The Gerlos Pass road has its own toll — keep a card handy",
      "Krimml's lowest viewpoint is the realistic turnaround with little ones",
      "Five nights at Habachklause — the comfortable heart of the trip"
    ],
    italianWords: [
      { word: "der Wasserfall", pronounce: "dair VAH-ser-fahl", meaning: "the waterfall", example: "Der höchste Wasserfall!", exampleMeaning: "The tallest waterfall!" },
      { word: "hoch", pronounce: "hohkh", meaning: "high / tall", example: "So hoch!", exampleMeaning: "So high!" },
      { word: "der Bauernhof", pronounce: "dair BOW-ern-hofe", meaning: "the farm", example: "Tiere am Bauernhof.", exampleMeaning: "Animals on the farm." }
    ]
  },
  {
    dayNumber: 8,
    date: "2026-08-16",
    weekday: "Sunday",
    region: "south",
    base: "Zell am See / Pinzgau",
    title: "A slow farm-resort day",
    subtitle: "Recharge at Habachklause — pool, animals, no agenda",
    leadImage: "./images/stay-habachklause.jpg",
    activities: [
      {
        time: "All day",
        title: "Down day at the resort",
        description: "A deliberate do-nothing day after a week of moving. Pool, farm animals, a short stroll, and let the kids (and the parents) properly rest before the big Kaprun days."
      },
      {
        time: "Optional",
        title: "Short stroll or a Zell am See lakefront wander",
        description: "If everyone's restless, a gentle hour on the Zell am See promenade (about 25 minutes away) is an easy, flat add-on.",
        attractionId: "zell-am-see-strandbad-promenade",
        tag: "water",
        optional: true
      }
    ],
    restaurants: ["kaprun-dorfkrug"],
    drinkOfTheDay: {
      name: "Wiener Melange",
      type: "coffee",
      pairing: "A slow milky coffee on a rest day — no rush, no plan. Pair it with a shared slice of Kaiserschmarrn or strudel.",
      servingNote: "Espresso with steamed milk and foam, a glass of water on the side."
    },
    gear: [
      { item: "Swimwear for the resort pool" },
      { item: "A book and zero ambition" }
    ],
    dayTips: [
      "It's Sunday — perfect for a no-driving resort day (shops shut anyway)",
      "Half-board means dinner's handled; just show up",
      "Tomorrow ramps back up with the family mountain"
    ],
    italianWords: [
      { word: "die Pause", pronounce: "dee POW-zeh", meaning: "a break / rest", example: "Wir machen Pause.", exampleMeaning: "We're taking a break." },
      { word: "müde", pronounce: "MUE-deh", meaning: "tired", example: "Ich bin müde.", exampleMeaning: "I'm tired." },
      { word: "der Kaffee", pronounce: "dair KAH-feh", meaning: "the coffee", example: "Einen Kaffee, bitte.", exampleMeaning: "A coffee, please." }
    ]
  },
  {
    dayNumber: 9,
    date: "2026-08-17",
    weekday: "Monday",
    region: "south",
    base: "Zell am See / Pinzgau",
    title: "The family mountain",
    subtitle: "Schmittenhöhe — gondola, dragon trail and big lake views",
    leadImage: "./images/schmittenhoehe.jpg",
    activities: [
      {
        time: "Morning",
        title: "Schmittenhöhe & Schmidolin's trail",
        description: "Take the gondola up Zell am See's family mountain to Schmidolin the dragon's adventure trail and playground, with a wide-open summit promenade over the lake and the Hohe Tauern.",
        attractionId: "schmittenhoehe",
        tag: "view"
      },
      {
        time: "Afternoon",
        title: "Back to the resort",
        description: "An easy afternoon at Habachklause — pool and farm animals — after a morning on the mountain."
      }
    ],
    restaurants: ["kaprun-dorfkrug"],
    drinkOfTheDay: {
      name: "Aperol Spritz",
      type: "aperitif",
      pairing: "A bittersweet orange spritz on the terrace as the kids burn off the last energy — low and fizzy, the classic mountain sundowner.",
      servingNote: "Tall glass over ice, orange wheel."
    },
    gear: [
      { item: "Carrier for the Feuertaufe adventure trail", for: "schmittenhoehe" },
      { item: "A warm layer for the summit" },
      { item: "Sun protection — it's exposed up top" }
    ],
    dayTips: [
      "Take the cityXpress gondola from the in-town base",
      "Skip the over-6s 'Rocket Bike' with little ones",
      "The trail is a mountain circuit, not stroller terrain — carry the baby"
    ],
    italianWords: [
      { word: "der Gipfel", pronounce: "dair GIP-fel", meaning: "the summit / peak", example: "Wir sind am Gipfel!", exampleMeaning: "We're at the summit!" },
      { word: "die Aussicht", pronounce: "dee OWS-zikht", meaning: "the view", example: "Was für eine Aussicht!", exampleMeaning: "What a view!" },
      { word: "spielen", pronounce: "SHPEE-len", meaning: "to play", example: "Die Kinder spielen.", exampleMeaning: "The children are playing." }
    ]
  },
  {
    dayNumber: 10,
    date: "2026-08-18",
    weekday: "Tuesday",
    region: "south",
    base: "Zell am See / Pinzgau",
    title: "Wild animals of the Alps",
    subtitle: "Wildpark Ferleiten at the foot of the Großglockner road",
    leadImage: "./images/wildpark-ferleiten.jpg",
    activities: [
      {
        time: "Morning",
        title: "Wildpark Ferleiten",
        description: "An open-air alpine wildlife park — bears, wolves, lynx, ibex and marmots along flat, fully pram-friendly walkways, with a big adventure playground next door. Don't miss it.",
        attractionId: "wildpark-ferleiten",
        tag: "nature"
      },
      {
        time: "Afternoon",
        title: "Resort time (or a peek up the Glockner road)",
        description: "Head back for pool time, or — if everyone's up for it — drive a little way up the spectacular Großglockner High Alpine Road for the views (it's a toll road)."
      }
    ],
    restaurants: ["kaprun-dorfkrug"],
    drinkOfTheDay: {
      name: "Gösser",
      type: "beer",
      pairing: "A classic Styrian lager after a day of bears and marmots — crisp, easy, and well-earned on the resort terrace.",
      servingNote: "Cold, in a tall glass."
    },
    gear: [
      { item: "Stroller — Ferleiten is fully pram-accessible", for: "wildpark-ferleiten" },
      { item: "A picnic or snacks (on-site restaurant too)" },
      { item: "Layers if you drive up the Glockner road" }
    ],
    dayTips: [
      "The wildlife park is one of the most stroller-friendly stops of the trip",
      "Free parking; on-site restaurant at ~1,150 m",
      "The Großglockner road toll is separate from the Vignette"
    ],
    italianWords: [
      { word: "der Bär", pronounce: "dair BAIR", meaning: "the bear", example: "Schau, ein Bär!", exampleMeaning: "Look, a bear!" },
      { word: "der Wolf", pronounce: "dair VOLF", meaning: "the wolf", example: "Der Wolf schläft.", exampleMeaning: "The wolf is sleeping." },
      { word: "das Tier", pronounce: "dass TEER", meaning: "the animal", example: "So viele Tiere!", exampleMeaning: "So many animals!" }
    ]
  },
  {
    dayNumber: 11,
    date: "2026-08-19",
    weekday: "Wednesday",
    region: "south",
    base: "Zell am See / Pinzgau",
    title: "Kaprun — coaster, gorge & lake",
    subtitle: "An alpine coaster or a wooden-walkway gorge, then the Zell am See lakefront",
    leadImage: "./images/sigmund-thun-klamm.jpg",
    activities: [
      {
        time: "Morning",
        title: "Maisi Flitzer coaster or the Sigmund-Thun gorge",
        description: "In Kaprun, pick your morning: the Maisi Flitzer alpine coaster (older kids ride solo from age 8), or the dramatic Sigmund-Thun gorge — wooden walkways climbing to the Klammsee lake and a playground. The gorge is stairs only, so carry the baby.",
        attractionId: "sigmund-thun-klamm",
        tag: "nature",
        rideToNext: { duration: "45 min", note: "Kaprun → Zell am See lakefront" }
      },
      {
        time: "Afternoon",
        title: "Zell am See lakefront",
        description: "Cool off at the lido and the flat lakeside promenade — swimming, pedal boats, ice cream and a great playground. Fully stroller-friendly.",
        attractionId: "zell-am-see-strandbad-promenade",
        tag: "water"
      },
      {
        time: "Big-kid option",
        title: "Kitzsteinhorn glacier (Top of Salzburg)",
        description: "If the weather's clear and you want the dramatic version, the Kitzsteinhorn cable cars climb to a 3,029 m glacier platform with a summer snow-play arena — cold even in August, keep it short with the baby.",
        attractionId: "kitzsteinhorn",
        tag: "view",
        optional: true
      }
    ],
    driveNotes: "Everything's around Kaprun and Zell am See, ~40–45 min from the resort.",
    restaurants: ["kaprun-dorfkrug"],
    drinkOfTheDay: {
      name: "Almdudler Radler",
      type: "other",
      pairing: "Half Almdudler, half beer for the grown-ups (straight Almdudler for the kids) — a herbal-lemonade twist on the shandy after a big day in Kaprun.",
      servingNote: "Long and cold; kids get theirs without the beer."
    },
    gear: [
      { item: "Carrier for the gorge stairs", for: "sigmund-thun-klamm" },
      { item: "Swimwear & towels for the lake", for: "zell-am-see-strandbad-promenade" },
      { item: "Warm layers IF you do the glacier", for: "kitzsteinhorn" }
    ],
    dayTips: [
      "The gorge is stairs and narrow planks — no stroller; carry the baby",
      "Maisi Flitzer: solo from age 8/1.25 m, no under-3s at all",
      "Picnic at the Klammsee playground at the top of the gorge"
    ],
    italianWords: [
      { word: "die Klamm", pronounce: "dee KLAHM", meaning: "the gorge / ravine", example: "Durch die Klamm.", exampleMeaning: "Through the gorge." },
      { word: "kalt", pronounce: "kahlt", meaning: "cold", example: "Das Wasser ist kalt!", exampleMeaning: "The water is cold!" },
      { word: "der Schnee", pronounce: "dair SHNAY", meaning: "the snow", example: "Schnee im August!", exampleMeaning: "Snow in August!" }
    ]
  },
  {
    dayNumber: 12,
    date: "2026-08-20",
    weekday: "Thursday",
    departureTime: "10:00",
    region: "south",
    base: "Werfenweng",
    title: "Move to Werfenweng (with friends)",
    subtitle: "Short hop to Gut Wenghof; an easy settling-in day",
    leadImage: "./images/stay-gutwenghof.jpg",
    rideToFirst: { duration: "1 h 25", note: "Habachklause → Werfenweng" },
    activities: [
      {
        time: "Morning",
        title: "Drive to Gut Wenghof, meet the friends",
        description: "An easy 1.5-hour hop to the all-inclusive family resort in Werfenweng, where you're meeting friends. Settle in, find the kids' club and the pools."
      },
      {
        time: "Afternoon",
        title: "Resort afternoon",
        description: "Let the kids loose at the resort and the grown-ups exhale. The big Werfen sights wait for the next two days."
      },
      {
        time: "Optional",
        title: "Gosausee day (if you'd rather drive)",
        description: "The mirror-like Gosausee, reflecting the Dachstein glacier, is about an hour away — a flat, scenic lakeshore loop if anyone's keen to move.",
        attractionId: "vorderer-gosausee",
        tag: "water",
        optional: true
      }
    ],
    driveNotes: "Habachklause → Werfenweng ≈ 1 h 25.",
    restaurants: ["bischofshofen-papa-roy"],
    drinkOfTheDay: {
      name: "Hugo Spritz",
      type: "aperitif",
      pairing: "A relaxed reunion drink with friends on arrival — elderflower, prosecco and mint, light enough to keep the evening easy.",
      servingNote: "Over ice with mint and lime."
    },
    gear: [
      { item: "Swimwear for the resort pools" },
      { item: "The kids' club essentials (named water bottles, sun hats)" }
    ],
    dayTips: [
      "All-inclusive resort — meals and activities are handled",
      "Coordinate the next two days' outings with the friends",
      "It's a short drive day; keep it light"
    ],
    italianWords: [
      { word: "die Freunde", pronounce: "dee FROYN-deh", meaning: "the friends", example: "Unsere Freunde sind da!", exampleMeaning: "Our friends are here!" },
      { word: "zusammen", pronounce: "tsoo-ZAH-men", meaning: "together", example: "Alle zusammen!", exampleMeaning: "All together!" },
      { word: "der Spielplatz", pronounce: "dair SHPEEL-plahts", meaning: "the playground", example: "Zum Spielplatz!", exampleMeaning: "To the playground!" }
    ]
  },
  {
    dayNumber: 13,
    date: "2026-08-21",
    weekday: "Friday",
    region: "south",
    base: "Werfenweng",
    title: "A coaster & a lakeside village",
    subtitle: "Lucky Flitzer near base, with Hallstatt as the day-trip option",
    leadImage: "./images/hallstatt.jpg",
    activities: [
      {
        time: "Morning",
        title: "Lucky Flitzer alpine coaster, Flachau",
        description: "Austria's only floodlit, all-weather coaster — a 1,100 m two-seat run with a free bouncy-castle adventure park, about 20 minutes away. A parent rides with the little ones (no under-3s).",
        attractionId: "lucky-flitzer-flachau",
        tag: "extreme"
      },
      {
        time: "Afternoon",
        title: "Resort time",
        description: "Back to Gut Wenghof for pools and the kids' club with the friends."
      },
      {
        time: "Big option",
        title: "Hallstatt day trip",
        description: "Swap the coaster for the postcard lakeside village of Hallstatt (about 1h15) — pastel houses, swans and ice cream. Go early; it's mobbed midday in August.",
        attractionId: "hallstatt",
        tag: "village",
        optional: true
      }
    ],
    restaurants: ["bischofshofen-papa-roy"],
    drinkOfTheDay: {
      name: "Sturm or Traubensaft",
      type: "other",
      pairing: "If a stand has early grape juice (Traubensaft) the kids will love it; the grown-up version, lightly fizzy young 'Sturm', is a fun late-summer Austrian curiosity.",
      servingNote: "Served cool; the kids' Traubensaft is non-alcoholic."
    },
    gear: [
      { item: "Closed shoes for the coaster", for: "lucky-flitzer-flachau" },
      { item: "Stroller or carrier for Hallstatt's cobbles", for: "hallstatt" },
      { item: "Sun protection" }
    ],
    dayTips: [
      "Lucky Flitzer is a private hotel operation in central Flachau — navigate to the Lacknerhof",
      "If you do Hallstatt, go before 10:00 or after 16:00",
      "No under-3s on the coaster — one parent stays with the baby at the play park"
    ],
    italianWords: [
      { word: "das Dorf", pronounce: "dass DORF", meaning: "the village", example: "Ein schönes Dorf.", exampleMeaning: "A pretty village." },
      { word: "schnell fahren", pronounce: "shnell FAH-ren", meaning: "to go fast", example: "Wir fahren schnell!", exampleMeaning: "We're going fast!" },
      { word: "der Schwan", pronounce: "dair SHVAHN", meaning: "the swan", example: "Schwäne am See.", exampleMeaning: "Swans on the lake." }
    ]
  },
  {
    dayNumber: 14,
    date: "2026-08-22",
    weekday: "Saturday",
    region: "south",
    base: "Werfenweng",
    title: "Castle falcons & underground worlds",
    subtitle: "Hohenwerfen's birds of prey, then a salt mine or the ice cave",
    leadImage: "./images/burg-hohenwerfen.jpg",
    activities: [
      {
        time: "Morning",
        title: "Hohenwerfen Castle & the birds-of-prey show",
        description: "A storybook clifftop fortress just 15 minutes away, with eagles, falcons and vultures sweeping low over the courtyard. Time it for the 11:15 flight show. A panorama lift helps with the stroller.",
        attractionId: "burg-hohenwerfen",
        tag: "culture"
      },
      {
        time: "Afternoon",
        title: "Salzwelten salt mine (gentler) or Eisriesenwelt ice cave (epic)",
        description: "Choose your underground adventure: the Salzwelten salt mine with its miners' slides and underground lake (~40 min, the easier option), or the world's largest ice cave at Werfen (steep, cold, ~700 stairs — for stronger walkers). Both are carrier-only.",
        attractionId: "salzwelten-salzburg",
        tag: "cave"
      },
      {
        time: "Alternative",
        title: "Eisriesenwelt ice cave",
        description: "The world's largest ice cave, high above Werfen by cable car — spectacular but strenuous and freezing. Best for the kids who can handle stairs and cold.",
        attractionId: "eisriesenwelt-werfen",
        tag: "cave",
        optional: true
      }
    ],
    driveNotes: "Hohenwerfen ≈ 15 min; the salt mine ≈ 40 min; the ice cave ≈ 20 min — all easy from Werfenweng.",
    restaurants: ["bischofshofen-papa-roy"],
    drinkOfTheDay: {
      name: "Stiegl Radler",
      type: "beer",
      pairing: "A light shandy after a day of falcons and salt mines — refreshing and low, perfect before the resort dinner with friends.",
      servingNote: "Half lager, half lemonade, ice cold."
    },
    gear: [
      { item: "Carrier — both the salt mine and ice cave are no-stroller", for: "salzwelten-salzburg" },
      { item: "A warm layer for underground (~10°C mine, ~0°C cave)" },
      { item: "Closed shoes for the cave stairs", for: "eisriesenwelt-werfen" }
    ],
    dayTips: [
      "Aim for the 11:15 birds-of-prey show at Hohenwerfen",
      "With young kids the salt mine is the gentler underground pick over the ice cave",
      "Book the salt-mine tour slot ahead for August"
    ],
    italianWords: [
      { word: "der Adler", pronounce: "dair AH-dler", meaning: "the eagle", example: "Der Adler fliegt!", exampleMeaning: "The eagle is flying!" },
      { word: "das Salz", pronounce: "dass ZAHLTS", meaning: "the salt", example: "Das Salz aus dem Berg.", exampleMeaning: "The salt from the mountain." },
      { word: "das Eis", pronounce: "dass ICE", meaning: "the ice (also: ice cream)", example: "Eis im Berg!", exampleMeaning: "Ice inside the mountain!" }
    ]
  },
  {
    dayNumber: 15,
    date: "2026-08-23",
    weekday: "Sunday",
    departureTime: "10:00",
    region: "transit",
    base: "Vienna",
    title: "Across the country to Vienna",
    subtitle: "A relaxed morning, then the long drive east to the capital",
    leadImage: "./images/wiener-riesenrad.jpg",
    rideToFirst: { duration: "4 h 30", note: "Werfenweng → Vienna via the A1" },
    activities: [
      {
        time: "Morning",
        title: "Slow start, goodbye to the friends",
        description: "A final resort breakfast and a relaxed pack-up before the big drive east."
      },
      {
        time: "Afternoon",
        title: "Drive to Vienna, settle into the apartment",
        description: "About 4.5 hours on the A1 with a couple of stops. Arrive in the late afternoon, settle into the Vienna apartment, and grab an easy first dinner — maybe the Prater's huge family beer garden.",
        link: "https://www.wien.info/en"
      }
    ],
    driveNotes: "Werfenweng → Vienna ≈ 4 h 30 via the A1. Break it with a lunch/leg-stretch stop.",
    restaurants: ["vienna-luftburg-kolarik"],
    drinkOfTheDay: {
      name: "Wiener Lager",
      type: "beer",
      pairing: "First night in the capital — a cold Viennese lager in the Prater beer garden while the kids storm the indoor bouncy-castle world at Luftburg.",
      servingNote: "Served in the garden, in the evening cool."
    },
    gear: [
      { item: "Car snacks & entertainment for the long drive" },
      { item: "Refillable water bottles" },
      { item: "Patience — it's the longest drive of the trip" }
    ],
    dayTips: [
      "Long driving day — plan two stops and aim to arrive before evening",
      "Luftburg in the Prater is the easiest first-night dinner with kids",
      "The Vienna apartment is your base for the final three nights"
    ],
    italianWords: [
      { word: "die Stadt", pronounce: "dee SHTAHT", meaning: "the city", example: "Die große Stadt!", exampleMeaning: "The big city!" },
      { word: "weit", pronounce: "vite", meaning: "far", example: "Noch weit?", exampleMeaning: "Still far?" },
      { word: "fast da", pronounce: "fahst DAH", meaning: "almost there", example: "Wir sind fast da!", exampleMeaning: "We're almost there!" }
    ]
  },
  {
    dayNumber: 16,
    date: "2026-08-24",
    weekday: "Monday",
    region: "north",
    base: "Vienna",
    title: "Parks & the giant wheel",
    subtitle: "Stadtpark playgrounds by day, the Riesenrad by evening",
    leadImage: "./images/wiener-riesenrad.jpg",
    activities: [
      {
        time: "Morning",
        title: "Stadtpark",
        description: "Ease into Vienna in its leafiest park — flat, stroller-smooth paths, the golden Strauss statue and a proper toddler playground with a sandbox and water play.",
        attractionId: "stadtpark",
        tag: "nature"
      },
      {
        time: "Evening",
        title: "Wiener Riesenrad & the Prater",
        description: "Ride the 1897 giant Ferris wheel — slow, glass-walled, walk-in cabins you can roll a stroller straight into — then let the kids loose on the free Wurstelprater funfair rides at the gate.",
        attractionId: "wiener-riesenrad",
        tag: "view"
      },
      {
        time: "Option",
        title: "Kletterhalle Wien (rainy-day plan)",
        description: "If the weather turns, Austria's biggest climbing hall has a dedicated kids' zone out in Donaustadt.",
        attractionId: "kletterhalle-wien",
        tag: "extreme",
        optional: true
      }
    ],
    restaurants: ["vienna-luftburg-kolarik", "vienna-billa-corso"],
    drinkOfTheDay: {
      name: "Hugo Spritz",
      type: "aperitif",
      pairing: "A floral spritz as the wheel lights up at dusk — elderflower and prosecco, the city evening's easy companion.",
      servingNote: "Over ice with mint and a lime wheel."
    },
    gear: [
      { item: "Stroller — Vienna is flat and pram-friendly" },
      { item: "Sun hats for the morning park" },
      { item: "A light layer for the evening wheel" }
    ],
    dayTips: [
      "The Riesenrad cabins are walk-in and step-free — stroller goes straight in",
      "Go to the wheel at opening or early evening to dodge queues",
      "Stadtpark playgrounds are on the 3rd-district side across the river"
    ],
    italianWords: [
      { word: "das Riesenrad", pronounce: "dass REE-zen-raht", meaning: "the Ferris wheel", example: "Hoch im Riesenrad!", exampleMeaning: "High up in the Ferris wheel!" },
      { word: "der Park", pronounce: "dair PARK", meaning: "the park", example: "Im Park spielen.", exampleMeaning: "Playing in the park." },
      { word: "der Abend", pronounce: "dair AH-bent", meaning: "the evening", example: "Am Abend.", exampleMeaning: "In the evening." }
    ]
  },
  {
    dayNumber: 17,
    date: "2026-08-25",
    weekday: "Tuesday",
    region: "north",
    base: "Vienna",
    title: "Museums, butterflies & a palace",
    subtitle: "ZOOM and the old town, then Schönbrunn's palace, maze and zoo",
    leadImage: "./images/schoenbrunn-palace.jpg",
    activities: [
      {
        time: "Morning",
        title: "ZOOM Children's Museum & the old town",
        description: "Hands-on play at ZOOM in the MuseumsQuartier (soft-play 'Ocean' for the baby, studios for the big kids), then a wander into the Innere Stadt past the butterfly house and St. Stephen's.",
        attractionId: "zoom-kindermuseum",
        tag: "culture",
        rideToNext: { duration: "20 min", note: "MuseumsQuartier → Schönbrunn" }
      },
      {
        time: "Afternoon",
        title: "Schönbrunn — palace, maze & zoo",
        description: "The honey-yellow imperial summer palace and its free gardens, the hedge maze with its Labyrinthikon playground, and the world's oldest zoo — all on the same grounds. Book the palace slot ahead.",
        attractionId: "schoenbrunn-palace",
        tag: "culture"
      },
      {
        time: "Stops nearby",
        title: "Butterfly House & Stephansplatz",
        description: "Squeeze in the tiny tropical Schmetterlinghaus in the Burggarten and the great Gothic square of Stephansplatz on your old-town loop.",
        attractionId: "schmetterlinghaus",
        tag: "nature",
        optional: true
      }
    ],
    driveNotes: "Use the U-Bahn rather than the car in the city — Schönbrunn is on the U4.",
    restaurants: ["vienna-luftburg-kolarik"],
    drinkOfTheDay: {
      name: "Wiener Melange & Sachertorte",
      type: "coffee",
      pairing: "The proper Vienna ritual on the last full day — a milky Melange and a slice of Sachertorte (or strudel for the kids) in a coffee house. Sit and linger.",
      servingNote: "Espresso, steamed milk and foam, water on the side."
    },
    gear: [
      { item: "Carrier for ZOOM Ocean (shoes-off, no stroller)", for: "zoom-kindermuseum" },
      { item: "Carrier for the Schönbrunn staterooms", for: "schoenbrunn-palace" },
      { item: "Pre-booked timed tickets on your phone" }
    ],
    dayTips: [
      "Book Schönbrunn's first slot and ZOOM's slots in advance — both sell out",
      "Tiergarten Schönbrunn (the zoo) is on the same grounds — easy to combine",
      "The Schmetterlinghaus is a quick, magical 20–40 min stop in the Burggarten"
    ],
    italianWords: [
      { word: "das Schloss", pronounce: "dass SHLOSS", meaning: "the palace / castle", example: "Das gelbe Schloss.", exampleMeaning: "The yellow palace." },
      { word: "der Schmetterling", pronounce: "dair SHMET-er-ling", meaning: "the butterfly", example: "Ein Schmetterling!", exampleMeaning: "A butterfly!" },
      { word: "das Labyrinth", pronounce: "dass lah-bee-RINT", meaning: "the maze", example: "Verloren im Labyrinth!", exampleMeaning: "Lost in the maze!" }
    ]
  },
  {
    dayNumber: 18,
    date: "2026-08-26",
    weekday: "Wednesday",
    departureTime: "07:30",
    region: "transit",
    base: "Vienna → home",
    title: "Fly home",
    subtitle: "An early start, then the 10:10 flight from VIE",
    leadImage: "./images/innere-stadt-stephansplatz.jpg",
    activities: [
      {
        time: "Morning",
        title: "Pack up, return the car, head to the airport",
        description: "An easy last morning — pack, drop the rental, and make your way to Vienna Airport in good time with kids in tow.",
        rideToNext: { duration: "30 min", note: "Vienna → VIE airport" }
      },
      {
        time: "10:10",
        title: "Flight home",
        description: "Wheels up at 10:10. Servus, Österreich — until next time."
      }
    ],
    driveNotes: "Allow plenty of time at the airport with three little ones; return the rental with a full tank if required.",
    drinkOfTheDay: {
      name: "Almdudler (one for the road)",
      type: "other",
      pairing: "A last airport Almdudler so the kids leave on the trip's signature taste — and a quiet 'we did it' for the grown-ups.",
      servingNote: "Cold, from the airport kiosk."
    },
    gear: [
      { item: "Passports & boarding passes within easy reach" },
      { item: "Snacks and entertainment for the flight" },
      { item: "A bag for the inevitable last-minute souvenirs" }
    ],
    dayTips: [
      "Leave extra time — Vienna Airport's drop-off ramp may be under works",
      "Strollers can go to the gate, then get gate-checked",
      "Fill the rental's tank if the contract requires full-to-full"
    ],
    italianWords: [
      { word: "Auf Wiedersehen", pronounce: "owf VEE-der-zane", meaning: "Goodbye (formal)", example: "Auf Wiedersehen, Österreich!", exampleMeaning: "Goodbye, Austria!" },
      { word: "Pfiat di", pronounce: "FEE-at dee", meaning: "Bye (warm Austrian dialect)", example: "Pfiat di, bis bald!", exampleMeaning: "Bye, see you soon!" },
      { word: "der Flug", pronounce: "dair FLOOK", meaning: "the flight", example: "Unser Flug nach Hause.", exampleMeaning: "Our flight home." }
    ]
  }
];
