import type { Day, DayDrink, GermanWord } from "../types";

interface DayHEActivity {
  time?: string;
  title?: string;
  description?: string;
  /** Translatable bits of the inter-activity drive connector. The duration
   *  text ("45 min" → "45 דק׳") and the helper note both get overridden
   *  per-language. */
  rideToNext?: { duration?: string; note?: string; departAt?: string };
}

/** Translatable parts of the per-day end-of-day drink card. The drink's
 *  proper name (e.g. "Hugo Spritz", "Grüner Veltliner") stays
 *  universal; only the prose gets translated. */
type DrinkOfTheDayHE = Partial<Pick<DayDrink, "pairing" | "servingNote">>;

/** Translatable fields of the per-day German word card. The German
 *  `word` and `example` stay as-is; only the meaning + the example's
 *  translation get localized. We also let HE override `pronounce` so
 *  Hebrew speakers can read a Hebrew-letter transliteration. */
type WordOfTheDayHE = Partial<
  Pick<GermanWord, "pronounce" | "meaning" | "exampleMeaning">
>;

export interface DayHE
  extends Partial<
    Pick<Day, "title" | "subtitle" | "base" | "driveNotes" | "dayTips" | "departureTime" | "rideToFirst">
  > {
  /** Translated activities, in the same order as the English data. */
  activities?: DayHEActivity[];
  /** Translated gear descriptions, positionally aligned with the English
   *  `gear` array. We only translate the human-readable `item` text — the
   *  optional `for: <attraction-id>` reference is universal and stays on
   *  the EN GearItem. The merge in `localizeDay` overlays these strings
   *  onto the EN objects by index. */
  gear?: string[];
  /** Translated parts of each German word card (same order as EN). */
  germanWords?: WordOfTheDayHE[];
  /** Translated parts of the end-of-day drink card. */
  drinkOfTheDay?: DrinkOfTheDayHE;
}

export const itineraryHE: Record<number, DayHE> = {
  1: {
    title: "נחיתה בוינה",
    subtitle: "נוחתים ב־VIE ב־18:40, מעבר למלון, מתאוששים מהטיסה",
    base: "וינה"
  },
  2: {
    title: "נסיעה מערבה לזלצבורג",
    subtitle: "ארוחת צהריים ליד אגם בסלצקאמרגוט, ואז המצודה מעל העיר העתיקה",
    base: "זלצבורג"
  },
  3: {
    title: "בוקר בפארק שעשועים והעיר העתיקה",
    subtitle: "פנטסיאנה (או אגם/פארק חבלים), ואז גטריידהגאסה ומירבל",
    base: "זלצבורג"
  },
  4: {
    title: "מעבר לצילרטל",
    subtitle: "גן משחקים הררי בדרך, ואז מתמקמים בעמק",
    base: "צילרטל, טירול"
  },
  5: {
    title: "עולמות קריסטל ואגם ליד קיצביהל",
    subtitle: "עולמות הקריסטל של סברובסקי, ואז אגם מחומם ליד קיצביהל",
    base: "צילרטל, טירול"
  },
  6: {
    title: "כולם עולים לרכבת הקיטור",
    subtitle: "רכבת הקיטור בת ה־100 של צילרטל למאיירהופן ובחזרה",
    base: "צילרטל, טירול"
  },
  7: {
    title: "מחלבה ואגם אכנזה",
    subtitle: "מחלבת ראווה בבוקר, שייט באגם טורקיז אחר הצהריים",
    base: "צילרטל, טירול"
  },
  8: {
    title: "מפלים בדרך לפינצגאו",
    subtitle: "אורזים, עוצרים במפל הגבוה באירופה, מתמקמים בהבכקלאוזה",
    base: "צל אם זה / פינצגאו"
  },
  9: {
    title: "יום נינוח במלון־החווה",
    subtitle: "נטענים מחדש בהבכקלאוזה — בריכה, חיות, בלי לוח זמנים",
    base: "צל אם זה / פינצגאו"
  },
  10: {
    title: "הר המשפחות",
    subtitle: "שמיטנהה — רכבל, מסלול דרקון ונופי אגם גדולים",
    base: "צל אם זה / פינצגאו"
  },
  11: {
    title: "חיות הבר של האלפים",
    subtitle: "פארק חיות הבר פרלייטן למרגלות כביש הגלוקנר",
    base: "צל אם זה / פינצגאו"
  },
  12: {
    title: "קאפרון — מגלשה, נקיק ואגם",
    subtitle: "מגלשת הרים או נקיק עם שבילי עץ, ואז טיילת האגם של צל אם זה",
    base: "צל אם זה / פינצגאו"
  },
  13: {
    title: "מעבר לוורפנוונג (עם חברים)",
    subtitle: "קפיצה קצרה לגוט וונגהוף; יום התמקמות רגוע",
    base: "וורפנוונג"
  },
  14: {
    title: "מגלשת הרים וכפר אגם",
    subtitle: "לאקי פליצר ליד הבסיס, עם האלשטאט כאופציה לטיול יום",
    base: "וורפנוונג"
  },
  15: {
    title: "בזים בטירה ועולמות תת־קרקעיים",
    subtitle: "עופות הדורסים של הוהנוורפן, ואז מכרה מלח או מערת קרח",
    base: "וורפנוונג"
  },
  16: {
    title: "חוצים את המדינה לוינה",
    subtitle: "בוקר רגוע, ואז הנסיעה הארוכה מזרחה לבירה",
    base: "וינה"
  },
  17: {
    title: "פארקים והגלגל הענק",
    subtitle: "גני שעשועים בשטאטפארק ביום, הגלגל הענק בערב",
    base: "וינה"
  },
  18: {
    title: "מוזיאונים, פרפרים וארמון",
    subtitle: "זום והעיר העתיקה, ואז ארמון שנברון, המבוך וגן החיות",
    base: "וינה"
  },
  19: {
    title: "טסים הביתה",
    subtitle: "בוקר אחרון רגוע, ואז טיסת 13:20 מ־VIE",
    base: "וינה → הביתה"
  }
};
