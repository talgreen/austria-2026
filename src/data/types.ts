export type Region = "north" | "south" | "transit";

export type Category =
  | "attraction"
  | "stay"
  | "restaurant"
  | "supermarket"
  | "gas"
  | "airport"
  | "hospital"
  // Wineries from data/wineries.ts get projected onto the map as POIs
  // under this category (off by default in the filter UI).
  | "winery";

export type AttractionTag =
  | "water"
  | "extreme"
  | "nature"
  | "culture"
  | "family"
  | "food"
  | "view"
  | "cave"
  | "village";

export interface ImageCredit {
  /** Display name of the photographer / source. */
  author: string;
  /** Short license id, e.g. "CC BY-SA 4.0", "CC BY 2.0", "Public Domain". */
  license: string;
  /** URL to the original source page (e.g. Wikimedia Commons). */
  source?: string;
  /** URL to the license terms. */
  licenseUrl?: string;
}

/** Casual three-tier rating for how demanding an attraction is for a
 *  family of mixed ages. We try to keep most of the trip "easy" and
 *  flag anything with a real climb, scramble, or specific gear. */
export type Difficulty = "easy" | "moderate" | "challenging";

/**
 * One hand-curated piece of trivia about an attraction's story,
 * legend, signature feature, or unmissable historical detail.
 *
 * The offline fallback quiz turns these straight into multiple-choice
 * questions ("In Hallstatt, what did miners dig out of the mountain
 * for thousands of years?" → "Salt"), and the AI
 * persona surfaces them in the day digest so Gemini also sees them
 * as priority question fodder when the network IS available — so the
 * AI and the fallback both ask substantive, story-driven questions
 * instead of generic "which town are we in?" facts.
 *
 * Keep facts:
 *   - genuinely answerable from the attraction's description (the
 *     kid should be able to recall it from listening), or from one
 *     extra sentence we deliberately add to the description,
 *   - kid-friendly (8–14): no scary detail, no booze, no politics,
 *   - 4 options total at runtime, so author 3+ wrong-but-plausible
 *     `distractors`.
 */
export interface AttractionQuizFact {
  /** Complete question text, ready to read aloud — e.g. "In
   *  Hallstatt, what did miners dig out of the mountain for
   *  thousands of years?". */
  question: string;
  /** The single correct answer. The fallback randomizes which slot
   *  it lands in at runtime so the kid can't just tap the same
   *  letter every time. */
  correctAnswer: string;
  /** Plausible-but-clearly-wrong alternatives. Need at least 3 so
   *  the fallback can build a 4-option question; the AI persona
   *  uses the whole list as in-context "wrong-answer style" hints. */
  distractors: string[];
}

export interface POI {
  id: string;
  name: string;
  category: Category;
  region: Region;
  description: string;
  shortDescription?: string;
  image?: string;
  imageCredit?: ImageCredit;
  website?: string;
  address?: string;
  coords: [number, number];
  tags?: AttractionTag[];
  openingNote?: string;
  bookingNote?: string;
  /** How demanding the visit is — Easy / Moderate / Challenging. */
  difficulty?: Difficulty;
  /** Practical "insider" notes for the place — parking, what to wear,
   *  opening tricks, kid age limits. Short bullets, not paragraphs. */
  tips?: string[];
  /** Hand-curated trivia about the attraction's story, history, or
   *  signature legend. Used by the offline quiz fallback to ask
   *  substantive story-driven questions, AND surfaced inside the AI
   *  persona's day digest as "trivia you can ask about" hints so
   *  Gemini also reaches for these angles. Omit when the attraction
   *  is a purely practical stop with no story worth the effort. */
  quizFacts?: AttractionQuizFact[];
}

export interface Stay extends POI {
  category: "stay";
  checkIn: string;
  checkOut: string;
  nights: number;
  bookingLink?: string;
  highlights: string[];
  warnings?: string[];
  /** Optional extra photos shown in the stay-card carousel.
   *  When present, the card crossfades through `[image, ...gallery]`. */
  gallery?: string[];
}

export interface Service extends POI {
  category: "restaurant" | "supermarket" | "gas";
  hours?: string;
  base: "north" | "south";
}

export interface DayActivity {
  time?: string;
  title: string;
  description: string;
  attractionId?: string;
  tag?: AttractionTag;
  /** Optional official link for a place that is NOT a full attraction
   *  entry (e.g. a town/tourism page). Attractions link via attractionId
   *  → attractions.ts `website`. Prefer an English-language URL. */
  link?: string;
  /** Drive time from this stop to the NEXT activity, rendered as a small
   *  inline connector on the chapter detail page. Only set when there's a
   *  meaningful drive between stops — skip for sub-5-minute hops or when
   *  the next activity is at the same place. Examples: "45 min", "1 h 15".
   *  `note` is a short hint like "via A1" or "winding mountain road". */
   rideToNext?: { duration: string; note?: string; departAt?: string };
  /** When true, render this activity with an "Optional" badge and slightly
   *  muted styling — signal to the family that the day's plan still works
   *  if they skip this one. When undefined, the chapter page applies a
   *  rule-of-thumb: on a day with more than 2 attractionId-bearing
   *  activities, the 3rd-and-later ones are treated as optional (you can
   *  realistically only fit ~2 multi-hour stops in a day with drives).
   *  Set explicitly to `false` to opt a specific activity OUT of the
   *  auto-rule (e.g. a day's must-do headline stop is always part of the plan). */
  optional?: boolean;
  /** Marks this activity as an *alternative* (a swap-in) rather than part
   *  of the day's main plan, and says which slot it can replace:
   *    - "morning" / "afternoon" / "evening" — it stands in for that
   *      specific slot's headline activity ("do this instead of the
   *      morning stop").
   *    - "day" — a general whole-day plan-B (the "alternatives bank") when
   *      there's no clear single slot it swaps into (e.g. a rainy-day
   *      backup that could fill any part of the day).
   *  The chapter detail page renders a distinct "Alternative · <slot>"
   *  badge for these instead of the normal time chip, so the family can
   *  tell at a glance it's an option, not a scheduled stop. An activity
   *  with `alternativeFor` set is implicitly optional. */
  alternativeFor?: "morning" | "afternoon" | "evening" | "day";
}

/** A single item on the per-day pack list. `item` is the description that
 *  gets translated; `for` (optional) is the attraction id this item is
 *  there for, so the UI can show a "for Canyon Park" chip and let the
 *  reader jump to that activity. Items without `for` are general-purpose
 *  (think: hat, water, cash) and apply to the whole day. */
export interface GearItem {
  item: string;
  for?: string;
}

/** A small phrase-of-the-day flashcard, picked to fit the day's mood
 *  (water words on water days, "auf Wiedersehen" on departure day, etc.).
 *  German and the spoken pronunciation are universal; meaning + the
 *  example translation get translated per language. */
export interface GermanWord {
  /** The German word or short phrase, e.g. "Wasser". */
  word: string;
  /** Pronunciation in plain phonetics, e.g. "VAH-ser". Universal. */
  pronounce: string;
  /** Plain-language meaning in the active language ("Water" / "מים"). */
  meaning: string;
  /** Optional example sentence in German — "Das Wasser ist kalt!". */
  example?: string;
  /** Translation of the example in the active language. */
  exampleMeaning?: string;
}

/** Categories for the "drink of the day" closing flourish — drives the
 *  card's icon and accent color. `other` is the catch-all for anything
 *  exotic (Almdudler, Sturm, Schnaps, etc.). */
export type DrinkType =
  | "wine"
  | "cocktail"
  | "beer"
  | "aperitif"
  | "digestif"
  | "coffee"
  | "other";

/** An adults-only "what to pour tonight" suggestion that closes each
 *  chapter — picked to match the day's mood and to lean into local
 *  Austrian / alpine grapes & rituals where possible. */
export interface DayDrink {
  /** The drink's name — "Hugo Spritz", "Grüner Veltliner". The
   *  German / proper-noun part stays universal across languages. */
  name: string;
  /** German-friendly category — drives icon + chip color. */
  type: DrinkType;
  /** One or two sentences on why this drink fits this specific day. */
  pairing: string;
  /** Optional serving / glassware note ("tall glass with ice and an orange
   *  slice", "served chilled, never with ice"). */
  servingNote?: string;
}

export interface Day {
  dayNumber: number;
  date: string;
  weekday: string;
  /** Recommended time to leave the base/hotel in the morning (e.g. "08:30", "09:00"). */
  departureTime?: string;
  /** The first drive of the day from the base to the first activity. */
  rideToFirst?: { duration: string; note?: string };
  region: Region;
  title: string;
  subtitle?: string;
  base?: string;
  activities: DayActivity[];
  driveNotes?: string;
  /** Lead photo for the chapter when no activity in the day has an image. */
  leadImage?: string;
  leadImageCredit?: ImageCredit;
  /** Suggested clothing & gear for this day's mix of activities.
   *  Items can optionally reference the specific attraction they're for. */
  gear?: GearItem[];
  /** Day-specific advice (timing, money, mood) that doesn't belong to
   *  a single attraction — the things you'd whisper at breakfast. */
  dayTips?: string[];
  /** Up to six German words or phrases for the day — shown in a carousel
   *  with audio for each clip. */
  germanWords?: GermanWord[];
  /** Curated list of `Service.id` values (restaurants only) that make
   *  sense to eat at on this day — typically the lunch spot mentioned
   *  in an activity, plus a dinner option near base. Looked up via
   *  `getService` and rendered in the chapter detail page. */
  restaurants?: string[];
  /** Adults-only "what to pour tonight" suggestion — closes the chapter
   *  with a small drink card after the tips. */
  drinkOfTheDay?: DayDrink;
}

/* ---------- Food & Wine ---------- */

export type DishCategory =
  | "pasta"
  | "starter"
  | "main"
  | "dessert"
  | "drink"
  | "snack";

export interface Dish {
  id: string;
  /** English name of the dish. */
  name: string;
  /** The original German/Austrian name (rendered in italics on the card). */
  germanName?: string;
  /** "north" = more an eastern / Vienna thing,
   *  "south" = more an alpine / Salzburg–Tyrol thing,
   *  "austria" = found everywhere we travel. */
  region: "north" | "south" | "austria";
  category: DishCategory;
  description: string;
  /** Short hint at where to try it — "Gasthaus Auer in Zell am See". */
  tryIt?: string;
  /** Optional CC photo of the dish, served from /public/images/. */
  image?: string;
  imageCredit?: ImageCredit;
}

export interface Winery {
  id: string;
  name: string;
  region: "north" | "south";
  /** The DOC / DOCG denomination, e.g. "Carmignano DOCG". */
  appellation: string;
  description: string;
  website?: string;
  address?: string;
  coords?: [number, number];
  /** "Book ahead — small family operation" etc. */
  bookingNote?: string;
  /** Optional CC photo — vineyard, cellar, the village it sits in. */
  image?: string;
  imageCredit?: ImageCredit;
}

/* ---------- Per-day quiz (Quizzo, the kid-friendly recap host) ---------- */

/** A single multiple-choice question generated by Gemini for the
 *  per-day kid quiz. The model is asked to return JSON conforming to
 *  this shape; `generateQuiz` validates and falls back if it doesn't.
 *  Both `question` and the option strings are in the active UI
 *  language; reactions are short host-style snippets ("Bravissimo!",
 *  "Ouf, almost!") shown / spoken when the kid answers. */
export interface QuizQuestion {
  /** The question text, ready to read aloud (no markdown). */
  question: string;
  /** 4 plausible answer strings; the kid taps one. Order is
   *  shuffled by the host before render so `correctIndex` doesn't
   *  always sit in the same slot. */
  options: string[];
  /** Index into `options` for the correct answer (0–3). */
  correctIndex: number;
  /** One short line Quizzo says when the kid picks correctly. */
  reactionCorrect: string;
  /** One short line Quizzo says when the kid picks wrong (still
   *  warm — kids don't like being scolded). */
  reactionWrong: string;
}

/** A quiz set (one batch in `live` mode, or the full 10-question
 *  offline pack in `offline` mode) for one day in one UI language. */
export interface Quiz {
  /** Which day-chapter this quiz covers. */
  day: number;
  /** UI language the questions are written in. */
  lang: "en" | "he";
  /** Variable length:
   *  - `live` mode: 5 questions per batch (the orchestrator chains
   *    batches into an endless stream).
   *  - `offline` mode: 10 questions, fixed pack stored once per
   *    device. */
  questions: QuizQuestion[];
  /** When this quiz was generated (epoch ms). */
  generatedAt: number;
}

/** Two play modes the kid can toggle between at the bottom of the
 *  Quiz card. Persisted per device.
 *
 *  - `offline` — 10 questions per day, generated once and cached
 *    forever in `localStorage`. After the first generation the day
 *    plays without a network connection — perfect for the car ride
 *    home if the cell signal drops in the hills. Fixed end + score.
 *  - `live` — endless stream. Questions are generated in batches of
 *    5; the orchestrator prefetches the next batch while the kid is
 *    answering the last two of the current one. Round ends when the
 *    kid taps "End round". Burns API quota with every batch — use
 *    when the kid wants to keep going and there's wifi handy. */
export type QuizMode = "offline" | "live";

/* ---------- Kids fun pack (חבילת הכיף — riddles, jokes & road games) ---------- */

/** Two tiers only — the audience is 3–7. `easy` targets the youngest
 *  (3–4, no reading required, parent reads aloud); `medium` gives the
 *  older kid (6–7) something to chew on. */
export type KidsDifficulty = "easy" | "medium";

/** A Hebrew riddle with a tap-to-reveal answer. Content is Hebrew-only
 *  by design — riddles are wordplay and don't translate; the family is
 *  Hebrew-speaking. Rendered inside an explicit `dir="rtl"` container
 *  so it reads correctly even when the UI language is English. */
export interface KidsRiddle {
  /** The riddle text, read-aloud ready (no markdown). */
  q: string;
  /** The answer, revealed on tap. */
  a: string;
  difficulty: KidsDifficulty;
  /** Optional emoji shown with the *answer* — a visual payoff that
   *  helps pre-readers confirm they guessed right. Never shown with
   *  the question (it would give it away). */
  emoji?: string;
}

/** A kid-friendly Hebrew joke, "למה… כי…" style. Same tap-to-reveal
 *  interaction as riddles: setup visible, punchline hidden. */
export interface KidsJoke {
  setup: string;
  punchline: string;
  difficulty: KidsDifficulty;
}

/** A Hebrew tongue twister (שובר שיניים). Always fully visible —
 *  the challenge is saying it three times fast, not guessing. */
export interface KidsTongueTwister {
  text: string;
  difficulty: KidsDifficulty;
}

/** A spotting/counting mini-mission for the car window, themed to the
 *  actual day's route (lake days count sailboats, transit days count
 *  tunnels, Vienna days spot Fiaker horses…). */
export interface KidsChallenge {
  /** Short punchy name — "צייד הטרקטורים". */
  title: string;
  /** The mission itself — "מי מוצא 5 טרקטורים ראשון?" */
  description: string;
}

/** A day-independent, no-equipment car game, reusable across the whole
 *  trip. Lives in a shared library; day packs point at 1–2 suggested
 *  games via `KidsDayPack.gameIds`. */
export interface KidsRoadGame {
  id: string;
  /** Game name — "עשרים שאלות". */
  name: string;
  /** One-line pitch shown on the collapsed card. */
  tagline: string;
  /** 3–5 short numbered steps in simple Hebrew, read-aloud ready. */
  howToPlay: string[];
  /** Youngest age that can genuinely play — rendered as a "3+" chip. */
  minAge?: number;
  difficulty: KidsDifficulty;
}

/** One day's worth of road fun, keyed by `Day.dayNumber` (external to
 *  the `Day` type, exactly like the quiz). Authored so nothing repeats
 *  across the 18 days. */
export interface KidsDayPack {
  dayNumber: number;
  /** Optional Hebrew theme line tying the pack to the day ("יום אגמים!"). */
  theme?: string;
  /** ~3 per day, mostly easy with one medium for the older kid. */
  riddles: KidsRiddle[];
  /** ~3 per day. */
  jokes: KidsJoke[];
  /** 1–2 per day. */
  tongueTwisters: KidsTongueTwister[];
  /** Exactly one, themed to the day's actual route. */
  challenge: KidsChallenge;
  /** 1–2 suggested road-game ids for today's drives (long-drive days
   *  get the meatier games). Looked up in `roadGames`. */
  gameIds?: string[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  detail?: string;
  link?: string;
  urgent?: boolean;
}

export interface Tip {
  id: string;
  title: string;
  body: string;
  severity: "info" | "warning" | "critical";
  icon?: string;
}

export interface EmergencyContact {
  label: string;
  value: string;
  detail?: string;
  link?: string;
  type: "phone" | "address" | "website";
}

export interface EmergencyGroup {
  title: string;
  items: EmergencyContact[];
}
