import type { Dish } from "./types";

/** Austrian food & drink worth chasing on this trip. Region tags the
 *  two-zone model: "north" leans Viennese/coffee-house, "south" leans
 *  alpine/Tyrolean, "austria" = found everywhere we'll be. Kid-friendly
 *  picks are flagged in the text. */
export const dishes: Dish[] = [
  // ============== Mains ==============
  {
    id: "wiener-schnitzel",
    name: "Wiener Schnitzel",
    germanName: "Wiener Schnitzel",
    region: "north",
    category: "main",
    description:
      "The national dish: a thin veal cutlet pounded flat, breaded and fried to a crisp golden cloud, served with a lemon wedge and potato salad or parsley potatoes. Kids almost always love it (ask for the pork 'Schnitzel vom Schwein' version, which is cheaper and just as good). Vienna is the spiritual home.",
    tryIt: "Sternbräu in Salzburg, or any Viennese Gasthaus",
    image: "./images/dish-wiener-schnitzel.jpg"
  },
  {
    id: "kaesespaetzle",
    name: "Käsespätzle / Kasspatzln",
    germanName: "Kasspatzln",
    region: "south",
    category: "main",
    description:
      "Soft egg-noodle dumplings tossed with mountain cheese and crowned with sweet fried onions — the Tyrolean answer to mac-and-cheese, and a reliable hit with small kids after a cable-car day. Rich, gooey alpine comfort food.",
    tryIt: "Any Zillertal or Pinzgau mountain hut",
    image: "./images/dish-kaesespaetzle.jpg"
  },
  {
    id: "tafelspitz",
    name: "Tafelspitz",
    germanName: "Tafelspitz",
    region: "north",
    category: "main",
    description:
      "Tender beef simmered in broth and served with apple-horseradish and chive sauce — Emperor Franz Joseph's favourite and a Viennese institution. A gentler, less-fried alternative to schnitzel for a sit-down dinner.",
    tryIt: "A traditional Viennese Beisl",
    image: "./images/dish-tafelspitz.jpg"
  },
  {
    id: "kasnocken",
    name: "Pinzgauer Kasnocken",
    germanName: "Kasnocken",
    region: "south",
    category: "main",
    description:
      "The Pinzgau's own cheese-dumpling dish — soft Nocken baked with pungent local cheese and onions, usually served in a little iron pan. The signature plate of the Zell am See / Kaprun week.",
    tryIt: "Dorfkrug Kaprun or a mountain hut near Zell am See",
    image: "./images/dish-kasnocken.jpg"
  },

  // ============== Sweets ==============
  {
    id: "kaiserschmarrn",
    name: "Kaiserschmarrn",
    germanName: "Kaiserschmarrn",
    region: "austria",
    category: "dessert",
    description:
      "A fluffy shredded pancake dusted with icing sugar and served with plum or apple sauce — half dessert, half lunch, and a guaranteed kid-pleaser on a mountain terrace. 'The Emperor's mess'. Order one to share; the portions are huge.",
    tryIt: "Any alpine hut — best with a lake or mountain view",
    image: "./images/dish-kaiserschmarrn.jpg"
  },
  {
    id: "apfelstrudel",
    name: "Apfelstrudel",
    germanName: "Apfelstrudel",
    region: "austria",
    category: "dessert",
    description:
      "Wafer-thin pastry rolled around spiced apples, raisins and breadcrumbs, served warm with vanilla sauce or cream. The cornerstone of the Austrian coffee house and an easy treat to share between the kids.",
    tryIt: "A Vienna Kaffeehaus, with a Melange",
    image: "./images/dish-apfelstrudel.jpg"
  },
  {
    id: "sachertorte",
    name: "Sachertorte",
    germanName: "Original Sacher-Torte",
    region: "north",
    category: "dessert",
    description:
      "Vienna's famous dense chocolate cake with a thin layer of apricot jam under a dark chocolate glaze, served with unsweetened whipped cream. A grown-up treat and a fun 'we were really in Vienna' moment.",
    tryIt: "Café Sacher / Demel in Vienna",
    image: "./images/dish-sachertorte.jpg"
  },
  {
    id: "salzburger-nockerl",
    name: "Salzburger Nockerl",
    germanName: "Salzburger Nockerl",
    region: "south",
    category: "dessert",
    description:
      "A giant, cloud-like baked soufflé shaped into three peaks said to mirror Salzburg's hills, dusted with icing sugar. Sweet, airy and theatrical — order one for the table on the Salzburg days.",
    tryIt: "A traditional Salzburg restaurant",
    image: "./images/dish-salzburger-nockerl.jpg"
  },

  // ============== Snacks ==============
  {
    id: "brezel",
    name: "Brezel & bakery breakfast",
    germanName: "Brezel / Semmel",
    region: "austria",
    category: "snack",
    description:
      "Austrian bakeries (Bäckerei) are everywhere and brilliant — soft pretzels, crusty Semmel rolls, poppy-seed pastries. The easiest, cheapest, kid-friendly breakfast and picnic fuel for the road. Open early, but closed Sundays.",
    tryIt: "Any village Bäckerei, first thing",
    image: "./images/dish-brezel.jpg"
  },
  {
    id: "eis",
    name: "Eis (ice cream)",
    germanName: "Eis",
    region: "austria",
    category: "snack",
    description:
      "Every town square and lakefront has a gelateria-style Eissalon, and an ice cream is the universal currency of a good family day. A scoop on the Getreidegasse, the Zell am See promenade or a Vienna square is non-negotiable.",
    tryIt: "Lakefronts and old-town squares everywhere",
    image: "./images/dish-eis.jpg"
  },

  // ============== Drinks ==============
  {
    id: "almdudler",
    name: "Almdudler",
    germanName: "Almdudler",
    region: "austria",
    category: "drink",
    description:
      "Austria's beloved herbal lemonade — fizzy, golden, a little like elderflower-meets-ginger-ale, and totally kid-friendly. The unofficial national soft drink: order it everywhere and let the kids feel local.",
    tryIt: "Every restaurant and hut",
    image: "./images/drink-almdudler.jpg"
  },
  {
    id: "apfelsaft-gespritzt",
    name: "Apfelsaft gespritzt",
    germanName: "Apfelsaft g'spritzt",
    region: "austria",
    category: "drink",
    description:
      "Cloudy apple juice cut with sparkling water — the default refreshing kids' (and grown-ups') drink on a hot terrace. 'Gespritzt' just means topped with soda; ask for it 'gespritzt' to make a juice last longer in the heat.",
    tryIt: "Any terrace on a hot day",
    image: "./images/drink-apfelsaft.jpg"
  },
  {
    id: "gruener-veltliner",
    name: "Grüner Veltliner",
    germanName: "Grüner Veltliner",
    region: "north",
    category: "drink",
    description:
      "Austria's signature crisp white wine — peppery, citrusy and easy-drinking, the perfect grown-up glass with a schnitzel dinner. Adults only. A spritzer ('G'spritzter') is the lighter, lower-alcohol version locals drink in summer.",
    tryIt: "A Viennese Heuriger or any Gasthaus",
    image: "./images/drink-gruener-veltliner.jpg"
  },
  {
    id: "stiegl-bier",
    name: "Stiegl & alpine beer",
    germanName: "Stiegl / Gösser",
    region: "south",
    category: "drink",
    description:
      "Salzburg's own Stiegl (and Styria's Gösser) are the everyday Austrian lagers — crisp and refreshing after a mountain day. A 'Radler' (beer cut with lemonade) is the lighter, sessionable summer option. Adults only.",
    tryIt: "A beer garden or mountain hut terrace",
    image: "./images/drink-stiegl.jpg"
  },
  {
    id: "wiener-melange",
    name: "Wiener Melange",
    germanName: "Melange",
    region: "north",
    category: "drink",
    description:
      "Vienna's signature coffee — espresso softened with steamed milk and a cap of foam, served with a glass of water and ideally a slice of strudel. The coffee-house ritual is half the point: sit, linger, let the kids share a cake.",
    tryIt: "A Vienna Kaffeehaus, unhurried",
    image: "./images/drink-melange.jpg"
  }
];

export const dishesByRegion = (r: "north" | "south" | "austria") =>
  r === "austria" ? dishes : dishes.filter(d => d.region === r || d.region === "austria");
