import type { POI } from "./types";

/**
 * Every attraction on the Austria 2026 plan. Region is the trip's
 * two-zone model: "north" = Vienna & the east, "south" = the Alps
 * (Salzburg, Tyrol, the Pinzgau/Salzkammergut loop). Coordinates,
 * addresses and opening notes were verified from official sites /
 * Wikipedia in 2026; re-confirm exact hours the week of travel.
 * Image paths are relative (./images/...) so they resolve under the
 * GitHub Pages base path; fetch them with scripts/fetch-images.mjs.
 */
export const attractions: POI[] = [
  /* ---------- Salzburg & Salzkammergut (south) ---------- */
  {
    id: "hohensalzburg-fortress",
    name: "Hohensalzburg Fortress",
    category: "attraction",
    region: "south",
    description:
      "Perched on the Festungsberg above the old town, Hohensalzburg is one of the largest fully preserved medieval fortresses in Europe, its white ramparts visible from almost everywhere in Salzburg. Kids love the short, steep funicular up, the cannon-lined courtyards and the wide views over rooftops and river. The interior museums and marionette exhibit reward a slower wander once little legs need a rest.",
    shortDescription: "Clifftop medieval fortress reached by a fun funicular, with sweeping views over Salzburg.",
    coords: [47.795, 13.0472],
    address: "Mönchsberg 34, 5020 Salzburg, Austria",
    website: "https://www.festung-hohensalzburg.at/en",
    tags: ["culture", "view", "family"],
    openingNote: "Open year-round; summer fortress grounds ~08:30–20:00, FestungsBahn funicular ~08:30–21:30 in Aug.",
    bookingNote: "Buy timed tickets online in August to skip the funicular-station queue; the all-inclusive ticket covers the funicular plus museums.",
    tips: [
      "The funicular is the easy option with a stroller/carrier; the walking path up is steep and cobbled.",
      "Go early or late in August to dodge midday crowds and heat in the courtyards.",
      "A baby carrier is handier than a stroller on the narrow internal stairs."
    ],
    image: "./images/hohensalzburg-fortress.jpg",
    imageCredit: { author: "C.Stadler/Bwag", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Salzburg_-_Festung_Hohensalzburg.JPG" },
    quizFacts: [
      {
        question: "How do most visitors ride up to Hohensalzburg Fortress?",
        correctAnswer: "A funicular railway",
        distractors: ["A hot-air balloon", "A cable car over the river", "A long staircase only"]
      }
    ]
  },
  {
    id: "getreidegasse",
    name: "Getreidegasse",
    category: "attraction",
    region: "south",
    description:
      "Getreidegasse is the narrow, pedestrian-only spine of Salzburg's old town, famous for the overhanging wrought-iron guild signs that hang above shop after shop. It's part bustling shopping street, part open-air history lesson — Mozart was born at No. 9, now a bright-yellow museum. With no traffic and plenty of bakeries and ice-cream stops, it's an easy, low-pressure stroll with young kids.",
    shortDescription: "Salzburg's iconic pedestrian lane lined with ornate iron guild signs and Mozart's birthplace.",
    coords: [47.8, 13.0439],
    address: "Getreidegasse, 5020 Salzburg, Austria",
    website: "https://www.salzburg.info/en/sights/top10/getreidegasse",
    tags: ["culture", "food", "family"],
    openingNote: "Public street, always open and free; shops generally Mon–Sat ~09:00–18:00, most closed Sundays.",
    tips: [
      "Fully pedestrianized and stroller-friendly, though cobblestones are a bumpy ride and it gets crowded midday in August.",
      "Duck into the covered 'Durchhäuser' passages through to the river — fun for kids and a shortcut out of the crush.",
      "Earlier morning is calmer with a stroller, before the tour groups arrive."
    ],
    image: "./images/getreidegasse.jpg",
    imageCredit: { author: "Snotty", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Getreidegasse_am_Nachmittag,_Salzburg.jpg" }
  },
  {
    id: "mirabell-palace-gardens",
    name: "Mirabell Palace & Gardens",
    category: "attraction",
    region: "south",
    description:
      "Mirabell's baroque gardens are a free, open expanse of geometric flowerbeds, fountains and mythological statues laid out toward a picture-perfect view of the fortress on the hill. Fans of The Sound of Music will recognise the Pegasus fountain and the 'Do-Re-Mi' steps. For kids there's room to roam, a hedge maze and the playful Dwarf Garden full of stone figures.",
    shortDescription: "Free baroque palace gardens with fountains, flowerbeds and a fortress view (and Sound of Music spots).",
    coords: [47.8056, 13.0419],
    address: "Mirabellplatz 4, 5020 Salzburg, Austria",
    website: "https://www.salzburg.info/en/sights/top10/mirabell-palace-gardens",
    tags: ["nature", "culture", "family", "view"],
    openingNote: "Gardens open daily, free, ~06:00 to dusk; palace interior Mon–Sat, sometimes closed for concerts/weddings.",
    tips: [
      "Gardens are flat, paved and very stroller-friendly — one of the easiest stops in Salzburg with an infant.",
      "Seek out the Dwarf Garden and the hedge maze on the northwest side.",
      "Right across the river from the old town — a short flat walk, good to pair with Getreidegasse."
    ],
    image: "./images/mirabell-palace-gardens.jpg",
    imageCredit: { author: "Cezarika1", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Palatul_Mirabell1.jpg" }
  },
  {
    id: "fantasiana-erlebnispark",
    name: "Fantasiana Adventure Park, Straßwalchen",
    category: "attraction",
    region: "south",
    description:
      "Austria's largest theme park sits on fairytale-themed grounds about 40 minutes north of Salzburg, with more than 50 attractions across eight worlds. The scale is gentle rather than thrilling — carousels, a fairytale forest, water rides and a petting-zoo feel — which makes it genuinely workable for toddlers and pre-schoolers, not just big kids. Plenty of shade and lawns mean an infant in a carrier can come along for the day.",
    shortDescription: "Austria's largest theme park — gentle, fairytale-themed rides ideal for young kids.",
    coords: [47.9854, 13.2742],
    address: "Märchenweg 1, 5204 Straßwalchen, Austria",
    website: "https://www.erlebnispark.at/",
    tags: ["family", "nature"],
    openingNote: "2026 season 28 Mar–1 Nov, daily 10:00–18:00 (last admission 16:00).",
    bookingNote: "No advance booking needed; buying online can skip the queue on busy summer days.",
    tips: [
      "Arrive near opening — August afternoons get hot and busy; mornings are calmest for little ones.",
      "Large free parking; the park is flat and stroller-friendly throughout.",
      "Last admission is 16:00, so don't plan a late-afternoon arrival."
    ],
    image: "./images/fantasiana-erlebnispark.jpg",
    imageCredit: { author: "Franz Fuchs", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Erlebnispark_Stra%C3%9Fwalchen,_Eingang.JPG" }
  },
  {
    id: "kletterpark-waldbad-anif",
    name: "Waldbad Anif Climbing Park",
    category: "attraction",
    region: "south",
    description:
      "A forest high-ropes park wrapped around the Waldbad Anif natural swim lake, 20 minutes south of Salzburg, with eight courses graded from easy to genuinely airy plus zip-lines and a Flying Fox. There's a dedicated MiniKletterpark for the smallest climbers, and the climbing ticket includes a swim in the lake afterwards — a useful reset for tired kids on a hot August day.",
    shortDescription: "Forest high-ropes park over a swim lake, with a mini-course for little ones.",
    coords: [47.7329, 13.0811],
    address: "Waldbadstraße, 5081 Anif bei Salzburg, Austria",
    website: "https://www.kletterpark-salzburg.at/",
    tags: ["extreme", "nature", "water", "family"],
    openingNote: "Reopens 11 Apr 2026; summer (incl. August) daily — confirm exact hours on the official site.",
    bookingNote: "Fill in the online waiver before arrival to save time. On-site payment is cash only.",
    tips: [
      "Minimum 100 cm to climb the main courses (one adult per child up to age 10); under that, use the MiniKletterpark.",
      "Forest terrain — fine for carrying an infant, not smooth for a stroller around the courses.",
      "Climbing price includes the Waldbad lake swim — bring swimsuits and towels."
    ],
    image: "./images/kletterpark-waldbad-anif.jpg",
    imageCredit: { author: "MatthiasKabel", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Wasserschloss_Anif_02.jpg" }
  },
  {
    id: "mondsee",
    name: "Mondsee",
    category: "attraction",
    region: "south",
    description:
      "A relaxed market town on the warm, swimmable Mondsee in the Salzkammergut, right off the A1 about 30 minutes east of Salzburg — which makes it the ideal leg-stretch and lunch stop on the drive in from Vienna. The pretty pedestrian centre is anchored by the yellow Basilica of St. Michael (the Sound of Music wedding church), and the lakefront Alpenseebad has shallow, gently shelving water and a play area for small children.",
    shortDescription: "Warm Salzkammergut lake town with the Sound of Music church, a flat promenade and a family beach.",
    coords: [47.8567, 13.3517],
    address: "5310 Mondsee, Upper Austria, Austria",
    website: "https://mondsee.salzkammergut.at/en/",
    tags: ["water", "village", "culture", "food", "nature", "family"],
    openingNote: "Town open year-round; August is peak season with warm lake swimming and full lakeside dining.",
    tips: [
      "Use the lakefront car park near the Seepromenade — short, flat, stroller-friendly walk to the water.",
      "Alpenseebad Mondsee has shallow water and a playground — good for toddlers; go mid-morning on busy August days.",
      "Lakeside restaurants serve fresh local fish — worth timing lunch by the water."
    ],
    image: "./images/mondsee.jpg",
    imageCredit: { author: "D. Höss (Birka)", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Mondsee_cut.jpg" }
  },
  {
    id: "hellbrunn-palace",
    name: "Hellbrunn Palace & Trick Fountains",
    category: "attraction",
    region: "south",
    description:
      "A 400-year-old baroque pleasure palace built by a prince-archbishop with a mischievous streak: the famous Wasserspiele are hidden water jets that erupt from stone seats, garden paths and grottoes to gleefully soak unsuspecting guests. Kids find it hilarious to get sprayed, and the shady gardens and the original Sound of Music glass pavilion round out a half-day. Dress for getting wet on a warm August afternoon.",
    shortDescription: "Baroque palace with playful hidden fountains that squirt visitors — kids love it.",
    coords: [47.7622, 13.0608],
    address: "Fürstenweg 37, 5020 Salzburg, Austria",
    website: "https://www.hellbrunn.at/en",
    tags: ["water", "culture", "family", "nature"],
    openingNote: "Trick fountains seasonal: daily 28 Mar–1 Nov 2026; August hours ~09:30–19:00 (last admission 18:00).",
    tips: [
      "Expect to get wet — bring a change of clothes for the kids; the soakings are part of the fun.",
      "The fountain route has steps and grotto thresholds, so a carrier beats a stroller for the guided portion.",
      "Go earlier in August to dodge heat and crowds; the gardens are free to wander any time."
    ],
    image: "./images/hellbrunn-palace.jpg",
    imageCredit: { author: "Nicholas Even", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Hellbrunn2.JPG" }
  },
  {
    id: "salzburg-zoo-hellbrunn",
    name: "Salzburg Zoo (Hellbrunn)",
    category: "attraction",
    region: "south",
    description:
      "Set against a dramatic natural rock face beside Hellbrunn Palace, this zoo leans into open, naturalistic enclosures — white rhinos, brown bears, alpine ibex and free-flying vultures riding the cliff thermals. The compact, walkable layout and a good playground make it an easy outing for small legs, and it pairs naturally with the palace next door for a full family day.",
    shortDescription: "Family zoo below a cliff face, next door to Hellbrunn Palace.",
    coords: [47.7569, 13.0642],
    address: "Hellbrunner Straße 60, 5081 Anif, Austria",
    website: "https://www.salzburg-zoo.at/en",
    tags: ["nature", "family", "view"],
    openingNote: "August daily 09:00–18:00 (last admission 17:00); Fri & Sat in Aug open until 23:00.",
    tips: [
      "Combine with Hellbrunn Palace next door — they share the same area.",
      "Mostly stroller-friendly on the lower loop, but some paths climb; the carrier helps on steeper viewpoint sections.",
      "The Fri/Sat late-evening August opening is a cooler, quieter window with young kids."
    ],
    image: "./images/salzburg-zoo-hellbrunn.jpg",
    imageCredit: { author: "Manfred Werner (Tsui)", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Zoo_Salzburg_2014_Eingang.jpg" }
  },

  /* ---------- Tyrol / Zillertal / Achensee (south) ---------- */
  {
    id: "swarovski-kristallwelten",
    name: "Swarovski Kristallwelten (Crystal Worlds)",
    category: "attraction",
    region: "south",
    description:
      "A surreal crystal wonderland born from a giant grass-covered head spouting water, leading into the Chambers of Wonder — dim, glittering rooms that hypnotise kids and adults alike. Outside, a sprawling garden hides a four-storey Play Tower, a maze and a carousel built for small legs. Fully stroller-friendly throughout, indoors and out, making it one of Tyrol's easiest big-ticket days with little ones.",
    shortDescription: "Glittering crystal art world with a giant outdoor playground, all stroller-accessible.",
    coords: [47.294, 11.6008],
    address: "Kristallweltenstraße 1, 6112 Wattens, Austria",
    website: "https://kristallwelten.swarovski.com/en",
    tags: ["culture", "family"],
    openingNote: "Daily 09:00–19:00 (last entry 18:00); outdoor Play Tower & Carousel 10:00–18:00.",
    bookingNote: "Booking not required, but buying online ahead avoids the queue on a peak August day.",
    tips: [
      "Free on-site parking near the entrance — no parking fee to budget.",
      "Strollers go everywhere, indoors and out; no need to leave the pram behind.",
      "Arrive ~09:00 for the indoor Chambers, then move outdoors once the play areas open at 10:00."
    ],
    image: "./images/swarovski-kristallwelten.jpg",
    imageCredit: { author: "Marek Śliwecki", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Wattens_-_Swarovski_Kristallwelten.jpg" },
    quizFacts: [
      {
        question: "What giant feature spouts water at the entrance of Swarovski Crystal Worlds?",
        correctAnswer: "A giant green head (the Giant)",
        distractors: ["A giant crystal dragon", "A waterfall of diamonds", "A glass mountain"]
      }
    ]
  },
  {
    id: "ellmis-zauberwelt-hartkaiser",
    name: "Ellmi's Magic World on the Hartkaiser",
    category: "attraction",
    region: "south",
    description:
      "Ride the Hartkaiserbahn gondola up from Ellmau and step out at 1,555 m into a children's mountain playground themed around the dragon Ellmi, with interactive treasure-hunt stations and the jagged Wilder Kaiser as a backdrop. The play world starts right at the mountain station, so little ones don't face a long walk to the fun — a genuinely stroller-realistic alpine option, with a carrier as backup for the panorama paths.",
    shortDescription: "A dragon-themed kids' playground at the top of the Hartkaiser cable car.",
    coords: [47.4919, 12.2717],
    address: "Weissachgraben 5, 6352 Ellmau, Austria",
    website: "https://www.ellmau-going.at/en/",
    tags: ["family", "view", "nature"],
    openingNote: "Summer from 9 May 2026; Hartkaiserbahn ~08:00–16:30, play world free once you're up top.",
    tips: [
      "Free parking at the valley station, incl. a covered garage — easy for loading an infant and stroller.",
      "The gondola takes a stroller and the play area begins at the mountain station; pack a carrier for the panorama paths.",
      "Go up in the morning for cooler temperatures and emptier play stations."
    ],
    image: "./images/ellmis-zauberwelt-hartkaiser.jpg",
    imageCredit: { author: "Ironbernietyrol", license: "CC BY-SA 3.0 DE", source: "https://commons.wikimedia.org/wiki/File:Hartkaiser-ellmau.JPG" }
  },
  {
    id: "kitzbuehel-town",
    name: "Kitzbühel Old Town",
    category: "attraction",
    region: "south",
    description:
      "Kitzbühel's medieval core is a postcard of pastel-painted merchant houses lining the car-free Vorderstadt and Hinterstadt lanes, threaded with cafés, ice-cream stops and window-shopping. It's an easy, low-commitment family stroll between bigger mountain days — the cobblestones are charming but bumpy, so a carrier rides smoother for the infant than the stroller.",
    shortDescription: "A pastel, largely car-free medieval old town made for a gentle family stroll.",
    coords: [47.4464, 12.3919],
    address: "Vorderstadt/Hinterstadt, 6370 Kitzbühel, Austria",
    website: "https://www.kitzbuehel.com",
    tags: ["village", "culture", "family", "food"],
    openingNote: "Open public street area, always accessible, no admission; shops/cafés ~09:00–18:00.",
    tips: [
      "Park in the edge-of-centre garages and walk in — the core is largely vehicle-restricted.",
      "Cobblestones make for a bumpy push; consider a carrier for the infant.",
      "Go mid-morning for gentler crowds and heat; central squares have stroller-friendly cafés."
    ],
    image: "./images/kitzbuehel-town.jpg",
    imageCredit: { author: "Wolfgang Glock", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Kitzbuehel03.JPG" }
  },
  {
    id: "badesee-kirchberg-tirol",
    name: "Kirchberg Bathing & Leisure Lake",
    category: "attraction",
    region: "south",
    description:
      "A relaxed family swimming spot just outside Kirchberg, pairing a natural bathing lake with a heated outdoor pool kept around 26°C — warm enough for little ones who chill fast in alpine water. A big flat lawn, a shallow non-swimmer zone and a dedicated children's area make it an easy half-day in the sun near Kitzbühel.",
    shortDescription: "A family bathing lake with a heated pool, shallow kids' zone and big lawn near Kitzbühel.",
    coords: [47.4462, 12.3222],
    address: "Seestraße 50, 6365 Kirchberg in Tirol, Austria",
    website: "https://www.kirchberg.tirol.gv.at/Badeanlage_Kirchberg",
    tags: ["water", "family"],
    openingNote: "Roughly mid-May to mid-September; daily 09:00–~20:00 in July & August, weather permitting.",
    bookingNote: "No booking — pay at the entrance.",
    tips: [
      "Free on-site parking and a flat, pram-friendly lawn make stroller-plus-bags easy.",
      "The heated outdoor pool (~26°C) suits little ones better than the cold lake.",
      "It's an open meadow — bring shade for the infant; dogs are not permitted."
    ],
    image: "./images/badesee-kirchberg-tirol.jpg",
    imageCredit: { author: "Dguendel", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Kirchberg_in_Tirol,_der_Badesee.jpg" }
  },
  {
    id: "fichtenschloss-rosenalm",
    name: "Fichtenschloss Adventure Park, Rosenalm",
    category: "attraction",
    region: "south",
    description:
      "Ride the Rosenalmbahn up from Zell am Ziller to a giant timber 'spruce castle' at 1,744 m, with climbing towers, slides, sand-and-water play and an 18 m lookout tower over the Zillertal. A buggy-friendly circular path links the castle to the little Fichtensee lake, so you can push the infant while the older ones run wild. Free to play once you've paid for the cable car.",
    shortDescription: "A mountain-top wooden adventure castle and lake, reached by the Rosenalm cable car.",
    coords: [47.2478, 11.941],
    address: "Rohr 23, 6280 Rohrberg, Austria (via the Rosenalmbahn in Zell am Ziller)",
    website: "https://www.zillertalarena.com",
    tags: ["family", "nature", "view", "water"],
    openingNote: "Rosenalmbahn Aug daily 09:00–17:45 (last uphill 17:15); playground free during cable-car hours.",
    tips: [
      "The Fichtenschloss-to-Fichtensee loop is buggy/stroller-friendly — good for pushing the infant.",
      "The cable car carries strollers; go in the morning before midday heat and the 17:15 last ascent.",
      "Exposed alpine terrain at ~1,744 m — bring sun protection and a layer."
    ],
    image: "./images/fichtenschloss-rosenalm.jpg",
    imageCredit: { author: "Eiswind", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Rosenalmbahn_Talstation.jpg" }
  },
  {
    id: "zillertalbahn-steam-train",
    name: "Zillertalbahn Nostalgia Steam Train",
    category: "attraction",
    region: "south",
    description:
      "A coal-fired heritage train, roughly a century old, that chuffs along the narrow-gauge Zillertal line between Jenbach and Mayrhofen at a gentle pace. The open-window vintage carriages and the real smell of steam make it pure storybook magic for small children. It runs only Tuesday to Thursday, so plan the day around its timetable — and bring a carrier, since the vintage coaches have narrow doors and high steps.",
    shortDescription: "A ~100-year-old steam train running the Zillertal valley on select summer days.",
    coords: [47.3886, 11.7781],
    address: "Bahnhof Jenbach, Bahnhofstraße 4, 6200 Jenbach, Austria",
    website: "https://www.zillertalbahn.at/",
    tags: ["family", "culture", "village"],
    openingNote: "Runs 2 Jun–24 Sep 2026, Tue/Wed/Thu only. Jenbach dep 10:44 → Mayrhofen 12:16; return Mayrhofen 13:35 → Jenbach 15:04.",
    bookingNote: "Heritage-coach seats are limited at peak August — reserve/buy ahead (dampfzug@zillertalbahn.at).",
    tips: [
      "Take the 10:44 from Jenbach, lunch in Mayrhofen, return on the 13:35 steam run.",
      "Fold the stroller and use a carrier inside: vintage carriages have narrow aisles and high steps.",
      "Sit a row back from open windows with the infant (soot/sparks) and pack a light layer for cool mornings."
    ],
    image: "./images/zillertalbahn-steam-train.jpg",
    imageCredit: { author: "Friedrich Böhringer", license: "CC BY-SA 3.0 AT", source: "https://commons.wikimedia.org/wiki/File:Schlepptenderdampflok_No4,_JD%C5%BD_83-076,_club760_Zillertalbahn_3.JPG" },
    quizFacts: [
      {
        question: "What kind of engine pulls the old Zillertal nostalgia train?",
        correctAnswer: "A coal-fired steam locomotive",
        distractors: ["An electric engine", "A diesel engine", "Horses"]
      }
    ]
  },
  {
    id: "erlebnissennerei-zillertal",
    name: "Erlebnissennerei Zillertal (Experience Dairy)",
    category: "attraction",
    region: "south",
    description:
      "A working show-dairy near Mayrhofen where kids press their noses to the glass to watch real cheese being made, then meet the cows, goats and other farm animals outside. The on-site Sennereiküche serves child-friendly dishes built on the farm's own fresh dairy, so a visit easily becomes exhibition, animals and lunch in one stop. Mostly flat, stroller-friendly ground and under-7s go free.",
    shortDescription: "A show-dairy with live cheese-making, farm animals and a family restaurant near Mayrhofen.",
    coords: [47.179, 11.8714],
    address: "Hollenzen 116, 6290 Mayrhofen, Austria",
    website: "https://www.erlebnissennerei-zillertal.at/",
    tags: ["food", "family"],
    openingNote: "Open daily year-round; exhibition 09:00–16:00, restaurant 09:00–17:00.",
    tips: [
      "Go soon after 09:00 — cheese-making runs in the morning, so kids see the real process through the glass.",
      "Under-7s are free and the outdoor animal area is largely flat and stroller-friendly.",
      "Pair it with the on-site restaurant for fresh-dairy kids' dishes."
    ],
    image: "./images/erlebnissennerei-zillertal.jpg",
    imageCredit: { author: "Erlebnissennerei Zillertal", license: "Official press image", source: "https://www.erlebnissennerei-zillertal.at/" }
  },
  {
    id: "karwendel-bergbahn-pertisau",
    name: "Karwendel-Bergbahn, Pertisau",
    category: "attraction",
    region: "south",
    description:
      "A gondola lifts you from Pertisau on the Achensee shore up to roughly 1,500 m on the edge of the Karwendel Alpine Park, where a panorama platform opens over the turquoise lake far below. A short summit loop of about 35 minutes is signposted as stroller-suitable — a rare thing on an Austrian peak. Pair it with the lake boat for an easy, low-driving day in Pertisau.",
    shortDescription: "A cable car to a stroller-friendly summit viewpoint over Lake Achensee.",
    coords: [47.4371, 11.6968],
    address: "Naturparkstraße 31, 6213 Pertisau am Achensee, Austria",
    website: "https://www.karwendel-bergbahn.at",
    tags: ["view", "nature", "family"],
    openingNote: "Summer 1 May–1 Nov 2026, daily 08:30–17:00, departures every 15 minutes.",
    tips: [
      "The ~35-minute summit circular is officially stroller-suitable — and gondola cabins take prams.",
      "Go early (from 08:30) to beat midday crowds and heat.",
      "Summit is ~1,491 m — pack a layer even in August."
    ],
    image: "./images/karwendel-bergbahn-pertisau.jpg",
    imageCredit: { author: "Strubbl", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Blick_auf_die_erste_St%C3%BCtze_und_die_Talstation_der_Karwendel-Bergbahn_in_Pertisau_2023-10-19.jpg" }
  },
  {
    id: "achensee-schifffahrt",
    name: "Achensee Lake Cruise",
    category: "attraction",
    region: "south",
    description:
      "Austria's largest lake of the Alps is best seen from the water, and the Achensee fleet runs calm, scenic hops between Pertisau, Maurach/Seespitz and quieter shoreline landings. The short Pertisau-to-Seespitz crossing is just the right length for restless young kids, gliding across water so turquoise it barely looks real. Fold the stroller for boarding and pair it with the Karwendel cable car for a single low-driving day.",
    shortDescription: "Scenic boat cruises across the turquoise Achensee, with short family-friendly hops.",
    coords: [47.4385, 11.706],
    address: "Seepromenade 36, 6213 Pertisau, Austria",
    website: "https://achenseeschifffahrt.at",
    tags: ["water", "view", "nature", "family"],
    openingNote: "Full summer timetable operates through August; check the official schedule for exact sailing times.",
    bookingNote: "No booking for scheduled line trips (buy at the dock); reservations only for charters.",
    tips: [
      "The Pertisau-to-Seespitz/Maurach hop is a short, calm crossing — ideal length for young kids.",
      "Fold the stroller for boarding to be safe.",
      "Combine with the Karwendel-Bergbahn (both in Pertisau) for one easy day."
    ],
    image: "./images/achensee-schifffahrt.jpg",
    imageCredit: { author: "Friedrich Böhringer", license: "CC BY-SA 2.5", source: "https://commons.wikimedia.org/wiki/File:Achensee_Pertisau.JPG" }
  },
  {
    id: "krimml-waterfalls",
    name: "Krimml Waterfalls",
    category: "attraction",
    region: "south",
    description:
      "Europe's tallest waterfall thunders down 380 m in three roaring tiers, throwing cooling mist over the switchbacking Wasserfallweg trail. The lowest viewpoint, a 10–15 minute walk from parking, already delivers the full 'wow' — perfect as a transit stop on the drive from Tyrol to the Pinzgau lakes without committing to the steep climb higher up. The trail is too steep for a stroller, so carry the infant.",
    shortDescription: "Europe's tallest waterfall — a thundering three-tier cascade reached by a steep mist-soaked trail.",
    coords: [47.1981, 12.1714],
    address: "Krimmler Wasserfälle, 5743 Krimml, Austria",
    website: "https://www.wasserfaelle-krimml.at",
    tags: ["water", "nature", "view"],
    openingNote: "Open mid-April to end of October, all day; ticket office staffed to ~16:30.",
    bookingNote: "No booking — pay at the entrance.",
    tips: [
      "The Wasserfallweg is a steep, switchbacking gravel path — NOT stroller-suitable; use a baby carrier.",
      "The lowest falls viewpoint is a ~10–15 min walk from parking and is the realistic turnaround with toddlers.",
      "Expect spray near viewpoints; bring a light rain layer and grippy shoes for the kids."
    ],
    image: "./images/krimml-waterfalls.jpg",
    imageCredit: { author: "Adrian Pingstone", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Austrian.waterfall.at.krimml.arp.jpg" },
    quizFacts: [
      {
        question: "What makes the Krimml Waterfalls famous in Europe?",
        correctAnswer: "They are the tallest waterfall in Europe",
        distractors: ["They are the widest in the world", "They never freeze", "They flow uphill"]
      }
    ]
  },

  /* ---------- Pinzgau / Zell am See / Werfen / Salzkammergut (south) ---------- */
  {
    id: "schmittenhoehe",
    name: "Schmittenhöhe",
    category: "attraction",
    region: "south",
    description:
      "The family mountain above Zell am See, reached by gondola from the lake town in minutes. Up top, Schmidolin the dragon presides over an adventure trail and playground — fire bridge, dragon slide and climbing stations — while the broad summit promenade serves up wide-open views over the lake and the Hohe Tauern peaks. A gentle, well-built day out for young kids, with the infant best carried once you leave the cable car.",
    shortDescription: "Family gondola mountain above Zell am See with a dragon-themed kids' adventure trail.",
    coords: [47.3292, 12.7378],
    address: "Schmittenstraße 7, 5700 Zell am See, Austria",
    website: "https://www.schmitten.at/en/",
    tags: ["nature", "family", "view"],
    openingNote: "Summer 18 May–1 Nov 2026; in August cable cars run daily ~09:00–17:00.",
    tips: [
      "Take the cityXpress gondola from the in-town base; a folded stroller rides up fine, switch to a carrier for the adventure trail.",
      "Schmidolins Feuertaufe trail + playground are free with a cable-car ticket, pitched at toddler-to-age-10.",
      "Skip the 'Rocket Bike' with little ones — it's strictly ages 6–17."
    ],
    image: "./images/schmittenhoehe.jpg",
    imageCredit: { author: "BestZeller", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Schmitten.jpg" }
  },
  {
    id: "wildpark-ferleiten",
    name: "Wildpark Ferleiten",
    category: "attraction",
    region: "south",
    description:
      "An open-air wildlife and adventure park tucked at the foot of the Großglockner High Alpine Road, home to 200-plus animals across some 40 alpine species — bears, wolves, lynx, ibex, marmots and owls. Flat, pram-friendly walkways loop past the enclosures, and an adjacent adventure park packs in 40-plus play rides for older kids. One of the most genuinely stroller-friendly stops in the region.",
    shortDescription: "Pram-friendly alpine wildlife park with a big adventure playground, at the foot of the Glockner road.",
    coords: [47.1688, 12.814],
    address: "Ferleiten 2, 5672 Fusch an der Glocknerstraße, Austria",
    website: "https://www.wildpark-ferleiten.at",
    tags: ["nature", "family"],
    openingNote: "Daily early May–early Nov; in August daily 09:00–19:30.",
    tips: [
      "Fully stroller- and wheelchair-accessible — walkways suit prams, and toilets are accessible too.",
      "Free parking and an on-site restaurant at ~1,150 m; you can pair it with a drive up the Großglockner road.",
      "The adventure park's 40+ rides suit the older kids while the infant stays in the stroller."
    ],
    image: "./images/wildpark-ferleiten.jpg",
    imageCredit: { author: "Giorno2", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Wild-_und_Erlebnispark_Ferleiten_3.jpg" },
    quizFacts: [
      {
        question: "Which of these alpine animals can you see at Wildpark Ferleiten?",
        correctAnswer: "Bears, wolves and ibex",
        distractors: ["Lions and giraffes", "Penguins and seals", "Kangaroos"]
      }
    ]
  },
  {
    id: "maisi-flitzer",
    name: "Maisi Flitzer Alpine Coaster",
    category: "attraction",
    region: "south",
    description:
      "Kaprun's all-weather alpine coaster runs right from the Maiskogel valley station, twisting down the slope on a fixed rail in a two-seater toboggan you brake yourself. It's a quick adrenaline hit the older kids will want to ride again and again, with an adult riding alongside the smallest ones. Above it, the Maiskogelbahn cable car opens up a gentler family park with slides, bouncy castles and a mountain restaurant.",
    shortDescription: "All-weather two-seater alpine coaster from the Maiskogel valley station in Kaprun.",
    coords: [47.2738, 12.7568],
    address: "Kitzsteinhornplatz 1a, 5710 Kaprun, Austria",
    website: "https://www.kitzsteinhorn.at/en/summer/maisiflitzer-summer",
    tags: ["family", "extreme", "view"],
    openingNote: "Daily, weather permitting, ~09:30–18:30 in summer; Maiskogelbahn 09:00–16:30.",
    bookingNote: "No advance booking needed; pay at the valley station, weather-dependent.",
    tips: [
      "Ride alone from age 8 and 1.25 m; children 3–7 ride seated with an adult.",
      "Infants under 3 cannot ride at all — one adult stays with the baby while the others take a run.",
      "Take the Maiskogelbahn up to the family park (slides, bouncy castles) for an infant-friendlier alternative."
    ],
    image: "./images/maisi-flitzer.jpg",
    imageCredit: { author: "Adrian Pingstone", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Kaprun.austria.overall.arp.jpg" }
  },
  {
    id: "kitzsteinhorn",
    name: "Kitzsteinhorn — Gipfelwelt 3000",
    category: "attraction",
    region: "south",
    description:
      "A trio of cable cars lifts you from Kaprun to the Top of Salzburg, a glacier panorama platform at 3,029 m that cantilevers out over permanent snow. The barrier-free Gipfelwelt 3000 packs in a 360 m gallery tunnel, the country's highest cinema and — in July and August — an ICE ARENA snow-play area for the kids. A high-altitude, year-round adventure: spectacular, cold even in August, and best kept short and warm with an infant in a carrier.",
    shortDescription: "Glacier cable car to a 3,029 m panorama world above Kaprun, with a summer snow-play arena.",
    coords: [47.1881, 12.6875],
    address: "Kitzsteinhornplatz 1a, 5710 Kaprun, Austria",
    website: "https://www.kitzsteinhorn.at/en",
    tags: ["nature", "view", "extreme", "family"],
    openingNote: "Open year-round; summer cable-car sightseeing ~09:00–16:45 weather permitting; ICE ARENA snow-play in Jul & Aug.",
    tips: [
      "At ~3,000 m it's cold and windy even in August — bring warm layers, keep an infant's visit short, watch the baby for irritability.",
      "Bring a carrier, not a stroller: snow and ice on the plateau make a stroller impractical.",
      "Allow time for the gallery tunnel and Cinema 3000 if weather closes the platforms."
    ],
    image: "./images/kitzsteinhorn.jpg",
    imageCredit: { author: "Spiderfox", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Kitzsteinhorn3.jpg" }
  },
  {
    id: "sigmund-thun-klamm",
    name: "Sigmund-Thun-Klamm Gorge",
    category: "attraction",
    region: "south",
    description:
      "A dramatic ravine just outside Kaprun where the Kapruner Ache thunders below a network of wooden boardwalks and staircases bolted to the rock. The roughly 320-metre walk climbs gently through spray and shade to the calm Klammsee reservoir at the top, where a lakeside playground and an easy loop reward small legs. Spectacular, but built entirely on stairs and narrow planks — plan for a baby carrier, not wheels.",
    shortDescription: "A wooden-walkway gorge near Kaprun leading up to the Klammsee lake and playground.",
    coords: [47.2581, 12.7372],
    address: "Kesselfallstraße 20, 5710 Kaprun, Austria",
    website: "https://www.klamm-kaprun.at/",
    tags: ["nature", "water", "family", "view"],
    openingNote: "Daily early May–early Nov; 1 Jul–31 Aug 09:00–19:00.",
    bookingNote: "No booking — buy tickets at the entrance.",
    tips: [
      "STROLLER WILL NOT WORK — the route is all stairs and narrow wooden walkways. Carry the infant.",
      "Let the kids decompress at the Klammsee playground by the Klammstüberl restaurant at the top.",
      "Loop the flat lakeshore path back for an easy finish."
    ],
    image: "./images/sigmund-thun-klamm.jpg",
    imageCredit: { author: "Zairon", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Kaprun_Sigmund-Thun-Klamm_09.JPG" }
  },
  {
    id: "zell-am-see-strandbad-promenade",
    name: "Zell am See Lakefront",
    category: "attraction",
    region: "south",
    description:
      "The sunny heart of Zell am See, where the town meets the turquoise lake along a flat, paved promenade made for strolling, ice cream and pedal-boat dreams. The in-town Strandbad lido offers gentle swimming and grassy lawns, while a well-equipped lakeside playground keeps toddlers busy with slides, swings and a sandpit. The promenade is pram-smooth, so the whole crew — infant included — can roll along the water's edge.",
    shortDescription: "Zell am See's lakeside lido, promenade, pedal boats and playground in the town centre.",
    coords: [47.3264, 12.8],
    address: "Strandbad Zell am See, Esplanade 16, 5700 Zell am See, Austria",
    website: "https://www.freizeitzentrum.at",
    tags: ["water", "family", "village", "view"],
    openingNote: "Strandbad lido 4 Jul–30 Aug 2026 daily 09:00–19:00 (weather-dependent); promenade & playground free year-round.",
    tips: [
      "The Esplanade/Elisabeth-Promenade is flat and paved — fully stroller-friendly along the whole lakefront.",
      "Pedal, electric and rowing boats rent from Scheicher Boote right on the Esplanade.",
      "The Strandbad playground (slide tower, sandpit, swings) has shaded benches for feeds."
    ],
    image: "./images/zell-am-see-strandbad-promenade.jpg",
    imageCredit: { author: "Steffs88", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Seepromenade_Zell_am_See_(AUT).JPG" }
  },
  {
    id: "lucky-flitzer-flachau",
    name: "Lucky Flitzer Alpine Coaster",
    category: "attraction",
    region: "south",
    description:
      "Flachau's family-run alpine coaster sends two-seat sleds racing 1,100 metres down a banked steel track — and as Austria's only floodlit, all-weather coaster, it runs rain or shine and late into the evening. Run privately by the Hotel Lacknerhof in the middle of Flachau, it pairs the ride with a free adventure park of bouncy castles and trampolines. A guaranteed hit with adventurous kids, with a parent riding shotgun on every sled.",
    shortDescription: "A 1,100 m two-seat alpine coaster in central Flachau, run by the Hotel Lacknerhof.",
    coords: [47.3559, 13.3853],
    address: "Unterberggasse 172, 5542 Flachau, Austria",
    website: "https://www.lucky-flitzer.at",
    tags: ["extreme", "family", "view"],
    openingNote: "Daily in August ~10:00–19:00 (floodlit, later in season); closes only during thunderstorms.",
    bookingNote: "No advance booking — pay on site.",
    tips: [
      "Infants CANNOT ride (no under-3s) — one parent waits out each run with the baby at the free adventure park.",
      "Kids 3–7 must share a sled with an adult; solo riding from age 8 and 125 cm.",
      "It's a private hotel operation in central Flachau — navigate to the Lacknerhof, not the big ski lifts."
    ],
    image: "./images/lucky-flitzer-flachau.jpg",
    imageCredit: { author: "Richard Symonds", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Flachau_mountain_03.jpg" }
  },
  {
    id: "burg-hohenwerfen",
    name: "Hohenwerfen Castle",
    category: "attraction",
    region: "south",
    description:
      "A storybook medieval fortress perched on a rock above Werfen, ringed by the Tennengebirge peaks and best known for its dramatic birds-of-prey flight show on the open Lindenwiese courtyard. Eagles, falcons and vultures sweep low over delighted children while the Salzach valley falls away below. A panorama lift spares little legs the steep climb, though the medieval interior keeps the infant firmly in a carrier.",
    shortDescription: "Clifftop medieval fortress above Werfen with a daily birds-of-prey flight show.",
    coords: [47.4819, 13.1878],
    address: "Burgstraße 2, 5450 Werfen, Austria",
    website: "https://www.salzburg-burgen.at/en/hohenwerfen-castle/",
    tags: ["culture", "family", "view"],
    openingNote: "Jul 20–Aug 21 daily 09:00–18:00; birds-of-prey show at 11:15, 14:15 & 16:30 (from Aug 22: 11:15 & 15:15).",
    bookingNote: "Buying admission online ahead helps skip the queue on peak August days.",
    tips: [
      "Use the panorama lift (small surcharge) to get up the hill with a stroller; the ramp is otherwise a 10–15 min walk.",
      "The interior tour has stairs — leave the stroller in the courtyard and carry the infant.",
      "Time your visit around a flight show (e.g. 11:15 or 14:15) — the open courtyard is the highlight for young kids."
    ],
    image: "./images/burg-hohenwerfen.jpg",
    imageCredit: { author: "Arne Müseler / www.arne-mueseler.com", license: "CC BY-SA 3.0 DE", source: "https://commons.wikimedia.org/wiki/File:Hohenwerfen_castle.jpg" },
    quizFacts: [
      {
        question: "What kind of show is Hohenwerfen Castle famous for?",
        correctAnswer: "A birds-of-prey flight show with eagles and falcons",
        distractors: ["A fireworks show", "A knights' jousting tournament", "A dolphin show"]
      }
    ]
  },
  {
    id: "salzwelten-salzburg",
    name: "Salzwelten Salzburg Salt Mine",
    category: "attraction",
    region: "south",
    description:
      "Austria's oldest show salt mine, burrowed into the Dürrnberg plateau above Hallein and mined since Celtic times. Visitors don miners' overalls, ride a little mine train deep into the mountain, whoosh down two long wooden miners' slides and glide across an underground salt lake by boat. A genuine crowd-pleaser for kids — but it's a working mine interior, so strollers do NOT work down there.",
    shortDescription: "Celtic-era show salt mine with miners' slides and an underground salt lake.",
    coords: [47.667, 13.0903],
    address: "Ramsaustraße 3, 5422 Bad Dürrnberg, Hallein, Austria",
    website: "https://www.salzwelten.at/en/salzburg",
    tags: ["culture", "family", "cave"],
    openingNote: "Open daily in August (season 28 Mar–1 Nov), 09:00–17:00; last tour times apply.",
    bookingNote: "Book the timed tour online in advance for August; tours run in fixed groups and sell out.",
    tips: [
      "Strollers are NOT allowed inside — wear your infant in a carrier; the tour has a train, two slides and stairs.",
      "It's ~10°C underground year-round; bring a layer for each child even in August.",
      "Allow roughly 1.5–2 hours; park at the mine's own lot on Ramsaustraße."
    ],
    image: "./images/salzwelten-salzburg.jpg",
    imageCredit: { author: "User:Lokomotiv", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:D%C3%BCrrnberg_(Salzwelten).jpg" }
  },
  {
    id: "eisriesenwelt-werfen",
    name: "Eisriesenwelt Ice Cave",
    category: "attraction",
    region: "south",
    description:
      "The largest ice cave in the world, carved into the Tennengebirge high above Werfen, where torch-lit guided tours wind past towering frozen waterfalls and glittering ice formations. Reaching it is an adventure in itself: a steep shuttle road, a dramatic cable car and a final uphill walk to the entrance. A strenuous, freezing, stair-heavy outing — wonderful for older kids but demanding for the very young.",
    shortDescription: "The world's largest ice cave, reached by cable car high above Werfen.",
    coords: [47.5029, 13.1903],
    address: "Eishöhlenstraße 30, 5450 Werfen, Austria",
    website: "https://www.eisriesenwelt.at/en/",
    tags: ["cave", "nature", "view", "extreme"],
    openingNote: "Daily 1 May–1 Nov 2026; in August ticket desk ~08:30–15:00, cave tours ~09:30–15:45.",
    bookingNote: "Buy timed-slot tickets online in advance for August; the cable car and tours bottleneck.",
    tips: [
      "Strollers do NOT work — there's a long uphill walk plus ~700 cave stairs; a carrier is essential and it's below freezing inside.",
      "Dress everyone warmly with closed shoes even in August; no photography is permitted.",
      "Allow ~3–4 hours including the drive up; best for kids who can walk, handle stairs and tolerate cold."
    ],
    image: "./images/eisriesenwelt-werfen.jpg",
    imageCredit: { author: "MatthiasKabel", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Eisriesenwelt_Werfen_Austria_02.jpg" },
    quizFacts: [
      {
        question: "What is special about the Eisriesenwelt cave near Werfen?",
        correctAnswer: "It is the largest ice cave in the world",
        distractors: ["It is full of gold", "It is the deepest lake in Austria", "Dinosaurs lived there"]
      }
    ]
  },
  {
    id: "hallstatt",
    name: "Hallstatt",
    category: "attraction",
    region: "south",
    description:
      "A storybook lakeside village wedged between steep wooded mountains and the mirror-still Hallstättersee, famous for its pastel houses, swans and the world's oldest salt mine on the heights above. The compact, largely car-free centre is made for slow wandering, lake-gazing and ice cream. Lovely with kids, though the lanes are cobbled and sometimes steep, so a sturdy stroller or carrier helps.",
    shortDescription: "Postcard-perfect, car-free lakeside village in the Salzkammergut.",
    coords: [47.562, 13.649],
    address: "4830 Hallstatt, Upper Austria, Austria",
    website: "https://www.hallstatt.net/",
    tags: ["village", "water", "view", "culture", "family"],
    openingNote: "Open village year-round; in August it's extremely busy — arrive before ~10:00 or after ~16:00.",
    tips: [
      "Cars can't enter the centre by day — park at P1 (~20-min walk) or summer-only P2 (~15-min walk).",
      "Cobbled, occasionally steep lanes — a robust stroller works on the flat lakefront, a carrier is easier on the slopes.",
      "An early start makes the village far more pleasant with small kids."
    ],
    image: "./images/hallstatt.jpg",
    imageCredit: { author: "C.Stadler/Bwag", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Hallstatt_-_Zentrum_.JPG" }
  },
  {
    id: "vorderer-gosausee",
    name: "Vorderer Gosausee & Gosaukammbahn",
    category: "attraction",
    region: "south",
    description:
      "A jewel-green alpine lake that perfectly mirrors the Dachstein glacier and the jagged Gosaukamm ridge — arguably the most photogenic lake view in the Salzkammergut. A flat, mostly stroller-friendly lakeshore path loops around the water, and the Gosaukammbahn cable car at the valley station lifts you to the Zwieselalm for sweeping high-mountain panoramas. An easy, scenic family day with picnic spots and a lakeside inn.",
    shortDescription: "Emerald alpine lake mirroring the Dachstein, with a cable car at the shore.",
    coords: [47.5277, 13.5081],
    address: "Gosauseestraße, 4824 Gosau, Austria",
    website: "https://www.dachstein.at/en/summer/cable-cars/gosaukammbahn",
    tags: ["water", "nature", "view", "family"],
    openingNote: "Lake open year-round; Gosaukammbahn daily in Aug 2026 ~08:15–18:00.",
    tips: [
      "The lakeshore loop (~3.5 km, flat) is the most stroller-friendly part; turn back any time.",
      "Parking is at the valley station right by the lake — arrive early on sunny August days.",
      "The cable car is optional: the classic Dachstein-mirror view is right from the near shore. Bring a picnic."
    ],
    image: "./images/vorderer-gosausee.jpg",
    imageCredit: { author: "Tigerente", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Gosauseen20100912.jpg" }
  },
  {
    id: "karkogel-abtenau",
    name: "Karkogel Summer Toboggan, Abtenau",
    category: "attraction",
    region: "south",
    description:
      "A family mountain above Abtenau where a gondola whisks you up and a 1,980-metre summer toboggan run sends you sweeping back down through alpine meadows — you control your own speed, so it suits cautious kids and thrill-seekers alike. The valley station has free parking and the Karkogel is geared toward families with easy walks and views over the Lammertal. A great half-day of low-stress outdoor fun.",
    shortDescription: "Gondola plus a ~2 km summer toboggan run on a family mountain above Abtenau.",
    coords: [47.5573, 13.3511],
    address: "Au 99, 5441 Abtenau, Austria",
    website: "https://karkogel.abtenau-info.at/en/",
    tags: ["family", "view", "nature", "extreme"],
    openingNote: "Summer May–Oct (toboggan typically ~4 days/week, ~09:00–17:00, weather permitting) — verify Aug 2026 days with the operator.",
    tips: [
      "Younger kids ride the toboggan on an adult's lap; you brake yourself, so it's manageable for nervous children.",
      "Free parking at the valley station; no operation in rain — check the daily status before going.",
      "Bring a carrier rather than a stroller for the meadow walks at the top."
    ],
    image: "./images/karkogel-abtenau.jpg",
    imageCredit: { author: "paciana", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Karkogel_-_panoramio.jpg" }
  },

  /* ---------- Vienna (north) ---------- */
  {
    id: "stadtpark",
    name: "Stadtpark",
    category: "attraction",
    region: "north",
    description:
      "Spread across the Wienfluss in the green heart of Vienna, the Stadtpark is the city's leafiest open-air living room — shaded promenades, flowerbeds and the unmissable gilded statue of waltz king Johann Strauss mid-violin. Wide, flat gravel paths make it an easy roll for a stroller, while the toddler playground, sandbox and water-play area on the 3rd-district side give little ones room to run after a morning of sightseeing.",
    shortDescription: "Vienna's free city park with the golden Strauss statue, stroller-friendly paths and a toddler playground.",
    coords: [48.2047, 16.3806],
    address: "Parkring 1, 1010 Wien (1st/3rd districts)",
    website: "https://www.wien.gv.at/english/environment/parks/stadtpark.html",
    tags: ["nature", "family"],
    openingNote: "Free, gateless public park — open 24/7, year-round.",
    tips: [
      "Playgrounds (incl. a toddler Kleinkinderspielplatz) are on the 3rd-district side across the Wienfluss.",
      "Arrive via U4 'Stadtpark' right at the park edge; go mid-morning for shade in August.",
      "Wide flat paths roll easily for a stroller; supervise kids near the Wienfluss railings."
    ],
    image: "./images/stadtpark.jpg",
    imageCredit: { author: "Wienwiki / Admin1", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Strauss_Denkmal_01_Stadtpark_Wien_1010.JPG" }
  },
  {
    id: "wiener-riesenrad",
    name: "Wiener Riesenrad (Giant Ferris Wheel)",
    category: "attraction",
    region: "north",
    description:
      "Turning slowly above the treetops of the Prater since 1897, the Wiener Riesenrad is Vienna's most beloved landmark — a giant red wheel whose roomy, glass-walled cabins feel less like a fairground ride and more like a gentle drawing room gliding into the sky. Each gondola is a walk-in room with step-free doors, so you roll the stroller straight in and let the little ones press their noses to the glass as the city unfurls below. Magical at sunset.",
    shortDescription: "Vienna's iconic 1897 Ferris wheel with slow, stroller-friendly walk-in cabins and sweeping views.",
    coords: [48.2167, 16.3959],
    address: "Riesenradplatz 1, 1020 Wien (Leopoldstadt)",
    website: "https://wienerriesenrad.com/en/",
    tags: ["view", "family"],
    openingNote: "Daily 09:00–23:45 in summer.",
    bookingNote: "Not required, but buy online for August peak to skip the ticket window.",
    tips: [
      "Strollers roll straight into the large walk-in cabins — step-free doors, slow continuous rotation.",
      "August is peak — arrive at 09:00 opening or early evening to avoid queues.",
      "Pair it with the free Wurstelprater funfair at the gate (toddler rides, carousel, Liliputbahn miniature railway)."
    ],
    image: "./images/wiener-riesenrad.jpg",
    imageCredit: { author: "Thomas Ledl", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Wien_Riesenrad.jpg" },
    quizFacts: [
      {
        question: "How old is the Wiener Riesenrad, Vienna's giant Ferris wheel?",
        correctAnswer: "Over 125 years old (built in 1897)",
        distractors: ["Built last year", "About 50 years old", "It is 1,000 years old"]
      }
    ]
  },
  {
    id: "schoenbrunn-palace",
    name: "Schönbrunn Palace",
    category: "attraction",
    region: "north",
    description:
      "Maria Theresa's golden summer residence, Schönbrunn is Vienna at its most storybook: 1,441 baroque rooms wrapped in honey-yellow façades and fronted by formal gardens that roll up to the hilltop Gloriette. Families settle in easily — the free, stroller-friendly gardens, fountains and on-site Children's Museum keep little ones happy, while the palace interior rewards a calm early-morning visit (pack a baby carrier, since strollers stay at the cloakroom).",
    shortDescription: "Maria Theresa's grand baroque summer palace, with free stroller-friendly gardens and a children's museum.",
    coords: [48.1845, 16.3119],
    address: "Schönbrunner Schloßstraße 47, 1130 Wien (Hietzing)",
    website: "https://www.schoenbrunn.at/en/",
    tags: ["culture", "family", "view"],
    openingNote: "Palace interior 08:30–18:00 (1 Jul–31 Aug), timed-slot entry; gardens free 06:30–20:00.",
    bookingNote: "Strongly recommended — all entry is by timed slot; book online ahead.",
    tips: [
      "Strollers aren't allowed in the staterooms — bring a carrier and leave the stroller at the cloakroom; gardens are fully stroller-friendly and free.",
      "Book the first timed slot (08:30) to beat crowds and heat; spend the cooler late afternoon in the shaded gardens.",
      "Pair with the on-site Kindermuseum and the adjacent zoo for a full same-grounds day."
    ],
    image: "./images/schoenbrunn-palace.jpg",
    imageCredit: { author: "Thomas Wolf, www.foto-tw.de", license: "CC BY-SA 3.0 DE", source: "https://commons.wikimedia.org/wiki/File:Schloss_Sch%C3%B6nbrunn_Wien_2014_(Zuschnitt_2).jpg" }
  },
  {
    id: "schoenbrunn-maze-labyrinth",
    name: "Schönbrunn Maze & Labyrinth",
    category: "attraction",
    region: "north",
    description:
      "Tucked into the lower gardens of Schönbrunn near the Neptune Fountain, the Irrgarten is a storybook tangle of tall yew hedges crowned by a viewing platform where you can spy on everyone else getting happily lost below. Right beside it, the Labyrinthikon playground turns the puzzle into pure play — climbing poles, a giant kaleidoscope and touch-trail labyrinths that delight kids long before they can read a map.",
    shortDescription: "A leafy hedge maze plus the hands-on Labyrinthikon playground in Schönbrunn's gardens.",
    coords: [48.1825, 16.3093],
    address: "Schönbrunner Schloßstraße 47, 1130 Wien (Hietzing)",
    website: "https://www.schoenbrunn.at/en/about-schoenbrunn/gardens/tour-through-the-park/maze/",
    tags: ["nature", "family"],
    openingNote: "1 Jul–31 Aug daily 09:30–18:30 (under-14s must be accompanied).",
    bookingNote: "Separate paid timed-entry ticket — book online; sold as a combined Children's Museum + Maze ticket.",
    tips: [
      "Gravel paths are slow for a stroller — use a carrier; the viewing platform is reached by steps.",
      "Head for the Labyrinthikon playground (touch labyrinths, giant kaleidoscope, climbing pole) — best for young kids.",
      "Hedges give patchy shade — go early or late, and pair with the air-conditioned Children's Museum for a midday cooldown."
    ],
    image: "./images/schoenbrunn-maze-labyrinth.jpg",
    imageCredit: { author: "Falk2", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:L03_054_Irrgarten.jpg" }
  },
  {
    id: "tiergarten-schoenbrunn",
    name: "Tiergarten Schönbrunn (Schönbrunn Zoo)",
    category: "attraction",
    region: "north",
    description:
      "Founded in 1752 in the gardens of Schönbrunn Palace, Tiergarten Schönbrunn is the oldest zoo in the world — and one of the best, home to giant pandas, koalas and more than 500 species across a leafy baroque setting. Paths are paved and stroller-friendly (if pleasantly hilly), and indoor houses like the steamy Rainforest and the Aquarium-Terrarium double as cool nap refuges on a hot August day.",
    shortDescription: "The world's oldest zoo, in Schönbrunn's gardens — stroller-friendly, 500+ species, under-6s free.",
    coords: [48.1822, 16.3025],
    address: "Maxingstraße 13b, 1130 Wien (Hietzing)",
    website: "https://www.zoovienna.at/en/",
    tags: ["nature", "family"],
    openingNote: "Daily 09:00–18:30 (Apr–Sep summer hours); some animal houses close earlier.",
    bookingNote: "Online tickets recommended to skip the gate queue in peak August.",
    tips: [
      "Arrive at 09:00 — cooler, quieter and more active animals.",
      "Paths are paved but hilly — plan a loop; stroller rental is available on site.",
      "Use the indoor houses as heat/nap refuges and catch the feeding talks; under-6s enter free."
    ],
    image: "./images/tiergarten-schoenbrunn.jpg",
    imageCredit: { author: "Nemo bis", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:2017_Vienna_zoo_01.jpg" },
    quizFacts: [
      {
        question: "What makes Tiergarten Schönbrunn in Vienna special?",
        correctAnswer: "It is the oldest zoo in the world",
        distractors: ["It only has dinosaurs", "It is the biggest zoo on Earth", "It floats on water"]
      }
    ]
  },
  {
    id: "zoom-kindermuseum",
    name: "ZOOM Children's Museum",
    category: "attraction",
    region: "north",
    description:
      "Inside the buzzing MuseumsQuartier, ZOOM is a children's museum built entirely around touching, playing and making — not looking. The star for the youngest is ZOOM Ocean, a shoes-off soft-play world (ages 8 months to 6, a parent joins in) of water, light and squishy nooks, while bigger kids dive into hands-on exhibitions, an art studio and a film-and-animation lab. Everything runs on timed sessions, so it's calm once you're in — book ahead in the August holidays.",
    shortDescription: "Vienna's hands-on children's museum, with soft-play 'Ocean' for babies and studios for big kids.",
    coords: [48.2021, 16.3596],
    address: "Museumsplatz 1, 1070 Wien (MuseumsQuartier, Hof 2)",
    website: "https://www.kindermuseum.at/en",
    tags: ["culture", "family"],
    openingNote: "Tue–Fri 08:30–16:00, Sat/Sun/holidays 09:45–17:15, closed Mondays; open in August.",
    bookingNote: "Required — all areas are timed slots; book online up to 10 days ahead. ZOOM Ocean sells out fast.",
    tips: [
      "Infant goes in ZOOM Ocean (ages 8 months–6, a parent joins); if your baby is under 8 months, email to confirm.",
      "Stagger slots — older kids in the Exhibition/Studio, baby plus a parent in Ocean.",
      "Ocean is shoes-off soft-play (no stroller); plan a carrier and ask about pram storage."
    ],
    image: "./images/zoom-kindermuseum.jpg",
    imageCredit: { author: "Max Wittmann", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Zoom_Kindermuseum_MQ_Wien.jpg" }
  },
  {
    id: "museum-of-illusions-vienna",
    name: "Museum of Illusions Vienna",
    category: "attraction",
    region: "north",
    description:
      "Hidden inside the baroque Palais Esterházy a minute from the Hofburg, the Museum of Illusions turns physics into a giggle — tilted rooms that scramble your balance, a vortex tunnel, a head-on-a-platter table and holograms that refuse to behave. Kids from about five up love hunting down the next trick and starring in the photo ops, and at roughly an hour it's an easy, weatherproof break from palaces and churches.",
    shortDescription: "Hands-on optical illusions inside a baroque palace — about an hour of family fun.",
    coords: [48.2097, 16.3671],
    address: "Wallnerstraße 4, 1010 Wien (Innere Stadt)",
    website: "https://museumderillusionen.at/en/",
    tags: ["culture", "family"],
    openingNote: "August (school holidays) daily ~10:00–19:00.",
    bookingNote: "Recommended, not required — book a timeslot online to avoid waits.",
    tips: [
      "Entry is barrier-free so a stroller gets in, but tight illusion rooms favour a carrier.",
      "Recommended age is 5+; under-5s are free.",
      "Allow 60–90 minutes; one minute from U3 Herrengasse."
    ],
    image: "./images/museum-of-illusions-vienna.jpg",
    imageCredit: { author: "Erich Schmid", license: "CC BY-SA 3.0", source: "https://en.wikipedia.org/wiki/Palais_Esterh%C3%A1zy_(Wallnerstra%C3%9Fe)" }
  },
  {
    id: "schmetterlinghaus",
    name: "Schmetterlinghaus (Butterfly House)",
    category: "attraction",
    region: "north",
    description:
      "Behind the curving glass of a Jugendstil palm house in the imperial Burggarten, the Schmetterlinghaus is a pocket of the tropics in the middle of Vienna — some 400 free-flying butterflies drifting between waterfalls, orchids and warm misted air. It's a short, magical stop where a butterfly might just land on a calm, brightly-dressed child. Be ready for real tropical heat and humidity inside.",
    shortDescription: "A glass palm house in the Burggarten where ~400 tropical butterflies fly free.",
    coords: [48.205, 16.367],
    address: "Burggarten, Hofburg, 1010 Wien (Innere Stadt)",
    website: "https://www.schmetterlinghaus.at/en-gb",
    tags: ["nature", "family"],
    openingNote: "Summer (Apr–Oct) daily 10:00–17:45.",
    bookingNote: "Walk-up; buy tickets at the door.",
    tips: [
      "Tropical heat and humidity on top of an August day — light layers for the infant, keep it short if baby fusses.",
      "It's a quick single-hall visit (~20–40 min) — a great stop between the Hofburg and Albertina.",
      "Mind the double-door airlocks so toddlers don't dash out."
    ],
    image: "./images/schmetterlinghaus.jpg",
    imageCredit: { author: "Hubertl", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:AT-13768_Palmenhaus_Burggarten_05.JPG" }
  },
  {
    id: "innere-stadt-stephansplatz",
    name: "Innere Stadt / Stephansplatz",
    category: "attraction",
    region: "north",
    description:
      "At the beating heart of Vienna's old town, Stephansplatz spreads out beneath the soaring Gothic spire of St. Stephen's Cathedral — a car-free, stroller-smooth square where street performers, fiacre horses and the hum of the city come together. Wander the flat pedestrian lanes of the Graben and Kärntner Straße straight from the square, duck into the cathedral's free front nave, and let the kids crane their necks at the candy-striped roof high above.",
    shortDescription: "Vienna's grand old-town square beneath the Gothic spire of St. Stephen's Cathedral — flat and car-free.",
    coords: [48.2084, 16.3725],
    address: "Stephansplatz, 1010 Wien (Innere Stadt)",
    website: "https://www.stephanskirche.at/",
    tags: ["culture", "view", "family"],
    openingNote: "Square open always (free); cathedral sightseeing Mon–Sat 09:00–11:30 & 13:00–16:30, Sun 13:00–16:30.",
    tips: [
      "The square and the Graben/Kärntner Straße pedestrian zones are flat and stroller-friendly.",
      "Towers aren't stroller-accessible; the North Tower has a lift for a view with the baby.",
      "Go at 09:00 or late afternoon to dodge crowds; use the lift-marked U1/U3 Stephansplatz exits."
    ],
    image: "./images/innere-stadt-stephansplatz.jpg",
    imageCredit: { author: "C.Stadler/Bwag", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Wien_-_Stephansdom_(1).JPG" }
  },
  {
    id: "kletterhalle-wien",
    name: "Kletterhalle Wien (Indoor Climbing Hall)",
    category: "attraction",
    region: "north",
    description:
      "Out in leafy Donaustadt, Austria's largest climbing hall sends 16 metres of colourful rope routes soaring over a dedicated children's climbing zone and an outdoor kids' boulder block built for small hands and big imaginations. Run by the Naturfreunde, it's set up for whole families — book a parent-and-kids taster, let the older ones scramble the low walls while the baby watches from the matted floor, then refuel at the on-site café.",
    shortDescription: "Austria's biggest climbing hall, with a dedicated kids' climbing zone and outdoor boulder block.",
    coords: [48.223, 16.466],
    address: "Erzherzog-Karl-Straße 108, 1220 Wien (Donaustadt)",
    website: "https://www.kletterhallewien.at/",
    tags: ["extreme", "family"],
    openingNote: "Daily 09:00–23:00.",
    bookingNote: "Drop-in entry needs no booking; family courses must be booked ahead.",
    tips: [
      "Head for the indoor kids' climbing zone and the outdoor boulder block — low and padded; an infant in a carrier is fine as a spectator.",
      "Book a family course in advance if nobody is belay-certified — staff teach parents, equipment included.",
      "On-site café and free parking make it stroller-practical; a car or taxi is easier than transit with three kids."
    ],
    image: "./images/kletterhalle-wien.jpg",
    imageCredit: { author: "Kletterhalle Wien", license: "Official press image", source: "https://www.kletterhallewien.at/" }
  }
];

export const getAttraction = (id: string) => attractions.find(a => a.id === id);
