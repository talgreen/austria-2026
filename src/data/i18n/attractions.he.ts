import type { POI } from "../types";

/** Hebrew overrides for each attraction keyed by id. Plain English data
 *  in attractions.ts stays untouched; we merge these on top at render time. */
export const attractionsHE: Record<
  string,
  Partial<Pick<POI, "name" | "shortDescription" | "description" | "address" | "openingNote" | "bookingNote" | "tips" | "quizFacts">>
> = {
  // ---------- זלצבורג והסלצקאמרגוט ----------
  "hohensalzburg-fortress": {
    name: "מצודת הוהנזלצבורג",
    shortDescription: "מצודת ימי ביניים על צוק, מגיעים אליה ברכבל משעשע, עם נוף נרחב על פני זלצבורג"
  },
  "getreidegasse": {
    name: "רחוב גטריידהגאסה",
    shortDescription: "הסמטה המפורסמת של העיר העתיקה בזלצבורג, עם שלטי ברזל מעוטרים ובית הולדתו של מוצרט"
  },
  "mirabell-palace-gardens": {
    name: "ארמון וגני מירבל",
    shortDescription: "גני ארמון בארוקיים חינמיים עם מזרקות, ערוגות פרחים ונוף למצודה (וגם פינות מ׳צלילי המוזיקה׳)"
  },
  "fantasiana-erlebnispark": {
    name: "פארק השעשועים פנטסיאנה, שטראסוואלכן",
    shortDescription: "פארק השעשועים הגדול באוסטריה — מתקנים עדינים בנושא אגדות, מושלמים לילדים קטנים"
  },
  "kletterpark-waldbad-anif": {
    name: "פארק הטיפוס ולדבאד אניף",
    shortDescription: "פארק חבלים ביער מעל אגם רחצה, עם מסלול מיני לקטנטנים"
  },
  "mondsee": {
    name: "מונדזה",
    shortDescription: "עיירת אגם חמימה בסלצקאמרגוט עם כנסיית ׳צלילי המוזיקה׳, טיילת שטוחה וחוף משפחתי"
  },
  "hellbrunn-palace": {
    name: "ארמון הלברון ומזרקות ההפתעה",
    shortDescription: "ארמון בארוקי עם מזרקות נסתרות שמתיזות על המבקרים — הילדים מתים על זה"
  },
  "salzburg-zoo-hellbrunn": {
    name: "גן החיות של זלצבורג (הלברון)",
    shortDescription: "גן חיות משפחתי למרגלות מצוק, ממש ליד ארמון הלברון"
  },

  // ---------- טירול / צילרטל / אכנזה ----------
  "swarovski-kristallwelten": {
    name: "עולמות הקריסטל של סברובסקי",
    shortDescription: "עולם אמנות נוצץ של קריסטלים עם גן משחקים ענק בחוץ, הכל נגיש לעגלה"
  },
  "ellmis-zauberwelt-hartkaiser": {
    name: "עולם הקסם של אלמי על ההרטקייזר",
    shortDescription: "גן משחקים הררי לילדים בנושא דרקונים, בקצה הרכבל של ההרטקייזר"
  },
  "kitzbuehel-town": {
    name: "העיר העתיקה של קיצביהל",
    shortDescription: "עיר עתיקה פסטלית, ברובה ללא תנועה, שנעשתה לטיול משפחתי נינוח"
  },
  "badesee-kirchberg-tirol": {
    name: "אגם הרחצה והפנאי של קירכברג",
    shortDescription: "אגם רחצה משפחתי עם בריכה מחוממת, פינת ילדים רדודה ומדשאה גדולה ליד קיצביהל"
  },
  "fichtenschloss-rosenalm": {
    name: "פארק ההרפתקאות פיכטנשלוס, רוזנאלם",
    shortDescription: "טירת עץ הררית להרפתקאות ואגם, מגיעים אליה ברכבל רוזנאלם"
  },
  "zillertalbahn-steam-train": {
    name: "רכבת הקיטור הנוסטלגית של צילרטל",
    shortDescription: "רכבת קיטור בת כ־100 שנה שחוצה את עמק צילרטל בימי קיץ נבחרים"
  },
  "erlebnissennerei-zillertal": {
    name: "מחלבת החוויה של צילרטל",
    shortDescription: "מחלבת ראווה עם ייצור גבינה חי, חיות משק ומסעדה משפחתית ליד מאיירהופן"
  },
  "karwendel-bergbahn-pertisau": {
    name: "רכבל קארוונדל, פרטיזאו",
    shortDescription: "רכבל לתצפית פסגה ידידותית לעגלה מעל אגם אכנזה"
  },
  "achensee-schifffahrt": {
    name: "שייט באגם אכנזה",
    shortDescription: "שייט ציורי על פני אכנזה הטורקיזי, עם מקטעים קצרים וידידותיים למשפחה"
  },
  "krimml-waterfalls": {
    name: "מפלי קרימל",
    shortDescription: "המפל הגבוה באירופה — מפל שלוש קומות רועם שמגיעים אליו בשביל תלול אפוף רסס"
  },

  // ---------- פינצגאו / צל אם זה / וורפן / סלצקאמרגוט ----------
  "schmittenhoehe": {
    name: "שמיטנהה",
    shortDescription: "הר רכבל משפחתי מעל צל אם זה עם מסלול הרפתקאות לילדים בנושא דרקון"
  },
  "wildpark-ferleiten": {
    name: "פארק חיות הבר פרלייטן",
    shortDescription: "פארק חיות בר אלפיני ידידותי לעגלה עם גן שעשועים גדול, למרגלות כביש הגלוקנר"
  },
  "maisi-flitzer": {
    name: "מגלשת ההרים מאיזי פליצר",
    shortDescription: "מגלשת הרים דו־מושבית לכל מזג אוויר מתחנת העמק של המאיסקוגל בקאפרון"
  },
  "kitzsteinhorn": {
    name: "קיצשטיינהורן — גיפלוולט 3000",
    shortDescription: "רכבל קרחון לעולם תצפית בגובה 3,029 מ׳ מעל קאפרון, עם זירת משחקי שלג קיצית"
  },
  "sigmund-thun-klamm": {
    name: "נקיק זיגמונד־תון",
    shortDescription: "נקיק עם שבילי עץ ליד קאפרון שמוביל אל אגם הקלאמזה וגן שעשועים"
  },
  "zell-am-see-strandbad-promenade": {
    name: "טיילת האגם של צל אם זה",
    shortDescription: "חוף הרחצה, הטיילת, סירות הדוושה וגן השעשועים של צל אם זה במרכז העיר"
  },
  "lucky-flitzer-flachau": {
    name: "מגלשת ההרים לאקי פליצר",
    shortDescription: "מגלשת הרים דו־מושבית באורך 1,100 מ׳ במרכז פלאכאו, בהפעלת מלון לאקנרהוף"
  },
  "burg-hohenwerfen": {
    name: "טירת הוהנוורפן",
    shortDescription: "טירת ימי ביניים על צוק מעל וורפן עם מופע עפיפת עופות דורסים יומי"
  },
  "salzwelten-salzburg": {
    name: "מכרה המלח זלצוולטן זלצבורג",
    shortDescription: "מכרה מלח ראווה מתקופת הקלטים עם מגלשות כורים ואגם מלח תת־קרקעי"
  },
  "eisriesenwelt-werfen": {
    name: "מערת הקרח אייסריזנוולט",
    shortDescription: "מערת הקרח הגדולה בעולם, מגיעים אליה ברכבל גבוה מעל וורפן"
  },
  "hallstatt": {
    name: "האלשטאט",
    shortDescription: "כפר אגם מושלם כמו מגלויה, ללא תנועת רכב, בלב הסלצקאמרגוט"
  },
  "vorderer-gosausee": {
    name: "אגם גוזאו הקדמי ורכבל גוזאוקאם",
    shortDescription: "אגם אלפיני אזמרגדי שמשקף את הדכשטיין, עם רכבל ממש בקו המים"
  },
  "karkogel-abtenau": {
    name: "מגלשת הקיץ קארקוגל, אבטנאו",
    shortDescription: "רכבל ועוד מגלשת קיץ באורך כ־2 ק״מ על הר משפחתי מעל אבטנאו"
  },

  // ---------- וינה ----------
  "stadtpark": {
    name: "שטאטפארק",
    shortDescription: "הפארק העירוני החינמי של וינה עם פסל שטראוס המוזהב, שבילים ידידותיים לעגלה וגן שעשועים לפעוטות"
  },
  "wiener-riesenrad": {
    name: "הגלגל הענק של וינה",
    shortDescription: "הגלגל הענק האייקוני של וינה משנת 1897, עם תאים מרווחים שנכנסים אליהם עם עגלה ונוף נרחב"
  },
  "schoenbrunn-palace": {
    name: "ארמון שנברון",
    shortDescription: "ארמון הקיץ הבארוקי המפואר של מריה תרזה, עם גנים חינמיים ידידותיים לעגלה ומוזיאון ילדים"
  },
  "schoenbrunn-maze-labyrinth": {
    name: "המבוך והלבירינת של שנברון",
    shortDescription: "מבוך גדרות חי ועוד גן השעשועים החווייתי לבירינתיקון בגני שנברון"
  },
  "tiergarten-schoenbrunn": {
    name: "גן החיות של שנברון",
    shortDescription: "גן החיות העתיק בעולם, בגני שנברון — ידידותי לעגלה, מעל 500 מינים, כניסה חינם עד גיל 6"
  },
  "zoom-kindermuseum": {
    name: "מוזיאון הילדים זום",
    shortDescription: "מוזיאון הילדים החווייתי של וינה, עם פינת משחק רכה ׳אושן׳ לתינוקות וסטודיו לילדים הגדולים"
  },
  "museum-of-illusions-vienna": {
    name: "מוזיאון האשליות וינה",
    shortDescription: "אשליות אופטיות חווייתיות בתוך ארמון בארוקי — כשעה של כיף משפחתי"
  },
  "schmetterlinghaus": {
    name: "בית הפרפרים (שמטרלינגהאוס)",
    shortDescription: "בית זכוכית בגן הבורג שבו כ־400 פרפרים טרופיים מעופפים חופשי"
  },
  "innere-stadt-stephansplatz": {
    name: "העיר הפנימית / כיכר שטפן",
    shortDescription: "הכיכר המרכזית בעיר העתיקה של וינה, למרגלות צריח קתדרלת שטפן הגותי — שטוחה וללא תנועה"
  },
  "kletterhalle-wien": {
    name: "אולם הטיפוס של וינה",
    shortDescription: "אולם הטיפוס הגדול באוסטריה, עם פינת טיפוס ייעודית לילדים ובלוק בולדרינג בחוץ"
  }
};
