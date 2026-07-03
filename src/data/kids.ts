import type { KidsDayPack, KidsRoadGame } from "./types";

/**
 * חבילת הכיף — Hebrew road-fun content for the kids (ages 3–7).
 *
 * Authoring rules (keep these when editing):
 * - Hebrew-only, read-aloud ready. A parent in the front seat reads,
 *   the kids answer — nothing here requires reading skills.
 * - `easy` = the 3–4 year old can win. `medium` = the 6–7 year old
 *   gets to feel clever. Every day has at least one of each.
 * - No riddle/joke/twister repeats across the 18 days.
 * - Each day's `challenge` is themed to that day's *actual* route
 *   (see `itinerary.ts`) — lake days count sailboats, the salt-mine
 *   day gets salt, the long Vienna transit counts tunnels.
 * - Riddle `emoji` is the answer's payoff, never a hint on the
 *   question side.
 */

/* ---------- Road games — day-independent, no equipment ---------- */

export const roadGames: KidsRoadGame[] = [
  {
    id: "i-spy-austria",
    name: "אני רואה — מהדורת אוסטריה",
    tagline: "המשחק הקלאסי, עם כל מה שרואים רק כאן: פרות, פסגות ומנהרות",
    howToPlay: [
      "מסתכלים מהחלון ובוחרים בלב משהו שרואים: פרה, הר עם שלג, אגם, מגדל כנסייה, טרקטור…",
      "אומרים: \"אני רואה משהו ש…\" ונותנים רמז אחד (צבע, גודל או צליל).",
      "כולם מנחשים בתורות. מי שמנחש נכון — בוחר את הדבר הבא!",
      "טיפ אוסטרי: פרות, מפלים ורכבלים שווים נקודה כפולה."
    ],
    minAge: 3,
    difficulty: "easy"
  },
  {
    id: "car-bingo",
    name: "בינגו מכונית",
    tagline: "רשימת חיפוש בלי דף ובלי עיפרון — רק עיניים חדות",
    howToPlay: [
      "אמא או אבא מקריאים 5 דברים לחפש, למשל: פרה חומה, מנהרה, אופנוע, דגל אוסטרי, סוס.",
      "כל אחד זוכר את הרשימה (אפשר לעזור לקטנים!).",
      "מי שמוצא משהו מהרשימה צועק \"בינגו!\" ואומר מה מצא.",
      "מי שמוצא ראשון את כל החמישה — מנצח ובוחר את הרשימה הבאה."
    ],
    minAge: 3,
    difficulty: "easy"
  },
  {
    id: "who-am-i",
    name: "מי אני?",
    tagline: "מחקים חיה — והשאר מנחשים",
    howToPlay: [
      "בוחרים בלב חיה (או דמות שכולם מכירים).",
      "נותנים רמזים בלי להגיד את השם: איך אני הולכת? מה אני אוכלת? איזה קול אני עושה?",
      "מותר גם לעשות את הקול של החיה!",
      "מי שמנחש — עכשיו תורו להיות חיה."
    ],
    minAge: 3,
    difficulty: "easy"
  },
  {
    id: "echo-song",
    name: "מלך ההד",
    tagline: "שיר-הד לקטנטנים — שרים שורה וכולם חוזרים",
    howToPlay: [
      "בוחרים מלך הד (או מלכת הד!).",
      "המלך שר שורה קצרה או עושה קול מצחיק — והשאר חוזרים בדיוק-בדיוק.",
      "אפשר קולות של חיות, מילים בגרמנית מהטיול, או שירים שכולם אוהבים.",
      "מי שצחק באמצע החזרה — המלך החדש!"
    ],
    minAge: 3,
    difficulty: "easy"
  },
  {
    id: "would-you-rather",
    name: "מה הייתם מעדיפים?",
    tagline: "שאלות מצחיקות עם שתי אפשרויות בלתי אפשריות",
    howToPlay: [
      "שואלים שאלה עם שתי ברירות, למשל: לגור בטירה עם רוח רפאים נחמדה או באוהל על פסגת הר?",
      "כל אחד בוחר תשובה — ומסביר למה!",
      "אסור להגיד \"גם וגם\".",
      "ממשיכים בתורות: כל אחד ממציא את השאלה הבאה."
    ],
    minAge: 4,
    difficulty: "easy"
  },
  {
    id: "twenty-questions",
    name: "עשרים שאלות",
    tagline: "חושבים על משהו — והשאר חוקרים עד שמגלים",
    howToPlay: [
      "בוחרים בלב חיה, חפץ או מאכל (אפשר גם משהו מהטיול!).",
      "השאר שואלים שאלות של כן או לא: זה חי? זה גדול מפרה? אוכלים את זה?",
      "סופרים את השאלות — יש רק עשרים!",
      "מי שמנחש נכון חושב על הדבר הבא. אם אף אחד לא הצליח — המסתיר ניצח!"
    ],
    minAge: 5,
    difficulty: "medium"
  },
  {
    id: "word-chain",
    name: "שרשרת מילים",
    tagline: "כל מילה מתחילה באות שבה נגמרה הקודמת",
    howToPlay: [
      "הראשון אומר מילה, למשל: שֶׁלֶג.",
      "הבא בתור אומר מילה שמתחילה באות האחרונה: גֶּשֶׁר. ואז רַכֶּבֶת…",
      "אסור לחזור על מילה שכבר נאמרה.",
      "מי שנתקע יותר מעשר שניות — מתחילים שרשרת חדשה בזכותו!"
    ],
    minAge: 5,
    difficulty: "medium"
  }
];

/* ---------- Day packs — one per chapter, no repeats anywhere ---------- */

export const kidsPacks: KidsDayPack[] = [
  {
    dayNumber: 1,
    theme: "יום ההמראה הגדול! ✈️",
    riddles: [
      {
        q: "יש לי כנפיים אבל אני לא ציפור, ואני טס גבוה-גבוה מעל העננים. מי אני?",
        a: "מטוס",
        difficulty: "easy",
        emoji: "✈️"
      },
      {
        q: "יש בי המון מים מתוקים, הרים מסביבי, ואפשר לשוט עליי בסירה. מי אני?",
        a: "אגם",
        difficulty: "easy",
        emoji: "🏞️"
      },
      {
        q: "יש לי ערים אבל אין בי בתים, יש לי הרים אבל אין בי אבנים, ויש בי מים שאי אפשר לשתות. מי אני?",
        a: "מפה",
        difficulty: "medium",
        emoji: "🗺️"
      }
    ],
    jokes: [
      {
        setup: "למה הדג לא משחק כדורסל?",
        punchline: "כי הוא פוחד להיתפס ברשת! 🐟",
        difficulty: "easy"
      },
      {
        setup: "מה אמר קיר לקיר?",
        punchline: "ניפגש בפינה! 🧱",
        difficulty: "easy"
      },
      {
        setup: "מה אמר האפס לשמונה?",
        punchline: "איזו חגורה יפה יש לך!",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "גנן גידל דגן בגן, דגן גדול גדל בגן", difficulty: "easy" }
    ],
    challenge: {
      title: "צייד הדגלים",
      description:
        "הגענו לאוסטריה! מי מוצא ראשון 3 דגלים אדום-לבן-אדום בדרך לזלצבורג?"
    },
    gameIds: ["i-spy-austria", "car-bingo"]
  },
  {
    dayNumber: 2,
    theme: "יום של אבירים ונסיכות 🏰",
    riddles: [
      {
        q: "אני עולה, יורדת ומסתובבת, ובלונה פארק כולם צועקים עליי משמחה. מי אני?",
        a: "רכבת הרים",
        difficulty: "easy",
        emoji: "🎢"
      },
      {
        q: "אני עגול וקל, מלא באוויר, ואם תעזבו את החוט שלי — אעוף לשמיים. מי אני?",
        a: "בלון",
        difficulty: "easy",
        emoji: "🎈"
      },
      {
        q: "מה עולה ויורד כל היום אבל נשאר תמיד באותו מקום?",
        a: "מדרגות",
        difficulty: "medium",
        emoji: "🪜"
      }
    ],
    jokes: [
      {
        setup: "למה המלך הלך לרופא שיניים?",
        punchline: "כדי לקבל כתר! 👑",
        difficulty: "easy"
      },
      {
        setup: "למה הנסיכה לא הצליחה להירדם?",
        punchline: "כי מישהו החביא אפונה מתחת למזרן! 👸",
        difficulty: "easy"
      },
      {
        setup: "למה הגלידה לא מספרת סודות?",
        punchline: "כי היא נמסה מהתרגשות! 🍦",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "שרה שרה שיר שמח, שיר שמח שרה שרה", difficulty: "easy" },
      { text: "המלך מלך במלוא מלכותו", difficulty: "medium" }
    ],
    challenge: {
      title: "בלשי הזהב",
      description:
        "ברחוב גטרייֶדֶגאסה בזלצבורג יש שלטים מוזהבים מעל החנויות — מי סופר 5 ראשון?"
    },
    gameIds: ["who-am-i"]
  },
  {
    dayNumber: 3,
    theme: "יום הפרות הגדול 🐄",
    riddles: [
      {
        q: "אני נותנת חלב, אוכלת עשב כל היום ואומרת מוּ. מי אני?",
        a: "פרה",
        difficulty: "easy",
        emoji: "🐄"
      },
      {
        q: "אני קטן, יש לי כובע מחודד וזקן לבן, ובאגדות אני גר ביער. מי אני?",
        a: "גמד",
        difficulty: "easy",
        emoji: "🧙"
      },
      {
        q: "כשצועקים בהרים, מה חוזר אליכם בחזרה?",
        a: "הד",
        difficulty: "medium",
        emoji: "🗣️"
      }
    ],
    jokes: [
      {
        setup: "למה הפרה טסה לחלל?",
        punchline: "כי היא רצתה לראות את שביל החלב! 🐄🚀",
        difficulty: "easy"
      },
      {
        setup: "מה שותה פרה בבוקר?",
        punchline: "מוּ-קה! ☕",
        difficulty: "easy"
      },
      {
        setup: "איך קוראים לפרה שיודעת לנגן?",
        punchline: "מוּ-זיקאית! 🎵",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "פרה פגשה פרפר בפרדס פורח", difficulty: "easy" },
      { text: "שישה שקים של שומשום שם שמשון", difficulty: "medium" }
    ],
    challenge: {
      title: "צייד הפרות",
      description:
        "נוסעים היום אל עמק הצילרטל — מי סופר 10 פרות ראשון? כל פרה שווה מוּ אחד גדול!"
    },
    gameIds: ["twenty-questions", "echo-song"]
  },
  {
    dayNumber: 4,
    theme: "יום נוצץ ומנצנץ ✨",
    riddles: [
      {
        q: "אני נוצץ ומנצנץ בשמיים בלילה, ויש לי המון-המון חברים שנראים בדיוק כמוני. מי אני?",
        a: "כוכב",
        difficulty: "easy",
        emoji: "⭐"
      },
      {
        q: "אני שקוף, קשה וקר מאוד, ואם תחממו אותי — אהפוך למים. מי אני?",
        a: "קרח",
        difficulty: "easy",
        emoji: "🧊"
      },
      {
        q: "מסתכלים עליי ורואים… את עצמכם! מי אני?",
        a: "מראה",
        difficulty: "medium",
        emoji: "🪞"
      }
    ],
    jokes: [
      {
        setup: "למה העגבנייה הסמיקה?",
        punchline: "כי אמרו לה שהיא מתוקה! 🍅",
        difficulty: "easy"
      },
      {
        setup: "מה אמר השוקו החם לקצפת?",
        punchline: "את הכי מתוקה שיש! ☕",
        difficulty: "easy"
      },
      {
        setup: "למה ספר החשבון היה עצוב?",
        punchline: "כי היו לו יותר מדי בעיות! 📘",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "קריסטל קטן קפץ וקרץ לקריסטל", difficulty: "easy" }
    ],
    challenge: {
      title: "ציידי הנצנצים",
      description:
        "יום של קריסטלים! מי מוצא במהלך היום 7 דברים שמנצנצים? כל נצנוץ נחשב."
    },
    gameIds: ["word-chain"]
  },
  {
    dayNumber: 5,
    theme: "טוּ-טוּ! יום הרכבות 🚂",
    riddles: [
      {
        q: "אני ארוכה-ארוכה, נוסעת על פסים ואומרת טוּ-טוּ. מי אני?",
        a: "רכבת",
        difficulty: "easy",
        emoji: "🚂"
      },
      {
        q: "אני לבן ורך, שט לאט בשמיים, ולפעמים אני נראה כמו כבשה ענקית. מי אני?",
        a: "ענן",
        difficulty: "easy",
        emoji: "☁️"
      },
      {
        q: "מה הולך ובא כל הזמן — אבל אף פעם לא מגיע?",
        a: "מחר",
        difficulty: "medium",
        emoji: "📅"
      }
    ],
    jokes: [
      {
        setup: "מה אמרה הרכבת לרכבת שאיחרה?",
        punchline: "איפה היית? כמעט יצאתי מהפסים! 🚂",
        difficulty: "easy"
      },
      {
        setup: "למה הציפור טסה דרומה?",
        punchline: "כי זה רחוק מדי ללכת ברגל! 🐦",
        difficulty: "easy"
      },
      {
        setup: "למה הקוסם איחר להופעה?",
        punchline: "כי המפתחות שלו נעלמו! 🎩",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "רכבת רועשת רצה על רציף רחוק", difficulty: "easy" },
      { text: "קטר קטן תקתק בקרון קטן", difficulty: "medium" }
    ],
    challenge: {
      title: "שגרירי הרכבת",
      description:
        "ברכבת הקיטור: לנופף לכל מי שרואים בחוץ — ולספור כמה אנשים נופפו בחזרה!"
    },
    gameIds: ["would-you-rather"]
  },
  {
    dayNumber: 6,
    theme: "יום גבינות ופעמונים 🧀",
    riddles: [
      {
        q: "אני צהובה, יש בי חורים, ועכברים פשוט מתים עליי. מי אני?",
        a: "גבינה",
        difficulty: "easy",
        emoji: "🧀"
      },
      {
        q: "אני שטה על המים, יש לי מפרש או משוטים — אבל אני לא דג. מי אני?",
        a: "סירה",
        difficulty: "easy",
        emoji: "⛵"
      },
      {
        q: "יש לי לשון אבל אני לא מדבר — אני רק מצלצל. מי אני?",
        a: "פעמון",
        difficulty: "medium",
        emoji: "🔔"
      }
    ],
    jokes: [
      {
        setup: "איך יודעים שפיל התחבא במקרר?",
        punchline: "רואים את עקבות הרגליים בחמאה! 🐘",
        difficulty: "easy"
      },
      {
        setup: "מה אומרת הדבורה כשהיא חוזרת הביתה?",
        punchline: "דבש, הגעתי! 🐝",
        difficulty: "easy"
      },
      {
        setup: "איך קוראים לכלב שיודע לשחות?",
        punchline: "כלב-ים! 🦭",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "דבורה דיברה על דבש עם דובי", difficulty: "easy" },
      { text: "גלגל גבינה גדול גלגלו הגמדים", difficulty: "medium" }
    ],
    challenge: {
      title: "ספירת הפעמונים",
      description:
        "לפרות באוסטריה יש פעמונים על הצוואר! עוצמים עיניים, מקשיבים — מי שומע 5 צלצולים ראשון?"
    },
    gameIds: ["echo-song"]
  },
  {
    dayNumber: 7,
    theme: "יום המפלים הרטוב 💦",
    riddles: [
      {
        q: "אני יורד מהעננים, מרטיב את כולם ועושה שלוליות. מי אני?",
        a: "גשם",
        difficulty: "easy",
        emoji: "🌧️"
      },
      {
        q: "יש לי שבעה צבעים ואני מופיעה בשמיים אחרי הגשם. מי אני?",
        a: "קשת בענן",
        difficulty: "easy",
        emoji: "🌈"
      },
      {
        q: "ככל שאני מנגבת יותר — כך אני נהיית רטובה יותר. מי אני?",
        a: "מגבת",
        difficulty: "medium",
        emoji: "🧻"
      }
    ],
    jokes: [
      {
        setup: "מה אמר האוקיינוס לחוף?",
        punchline: "כלום, הוא רק עשה גל! 🌊",
        difficulty: "easy"
      },
      {
        setup: "למה הכלב לא אוהב גשם?",
        punchline: "כי הוא לא רוצה להירטב עד העצם! 🦴",
        difficulty: "easy"
      },
      {
        setup: "מה ענן לובש כשיורד גשם?",
        punchline: "מעיל-גשם! ☁️",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "מפל מלא מים מפיל מלא טיפות", difficulty: "easy" }
    ],
    challenge: {
      title: "מחפשי הקשת",
      description:
        "במפלי קרימל יש רסס ענק — מי מוצא קשת בענן בתוך הרסס? רמז: צריך שהשמש תהיה מאחוריכם!"
    },
    gameIds: ["twenty-questions", "car-bingo"]
  },
  {
    dayNumber: 8,
    theme: "יום בחווה 🐓",
    riddles: [
      {
        q: "אני מעיר את כל החווה בבוקר עם קוּקוּריקוּ גדול. מי אני?",
        a: "תרנגול",
        difficulty: "easy",
        emoji: "🐓"
      },
      {
        q: "אני לבנה ורכה, יש לי צמר חמים, ואני אומרת מֶה. מי אני?",
        a: "כבשה",
        difficulty: "easy",
        emoji: "🐑"
      },
      {
        q: "יש לי חדר לבן וחדר צהוב — אבל אין לי אף דלת. מי אני?",
        a: "ביצה",
        difficulty: "medium",
        emoji: "🥚"
      }
    ],
    jokes: [
      {
        setup: "למה התרנגולת חצתה את הכביש?",
        punchline: "כדי להגיע לצד השני! 🐔",
        difficulty: "easy"
      },
      {
        setup: "מה אמרה העז כשראתה את ההרים?",
        punchline: "מֶה-דהים! 🐐",
        difficulty: "easy"
      },
      {
        setup: "איזו חיה הכי חזקה בעולם?",
        punchline: "חילזון — הוא סוחב בית שלם על הגב! 🐌",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "עז עליזה עלתה על עץ עבות", difficulty: "medium" }
    ],
    challenge: {
      title: "חברי החווה",
      description:
        "יום רגוע בחווה: להגיד שלום ל-5 חיות שונות — ולחקות את הקול של כל אחת מהן!"
    },
    gameIds: ["would-you-rather"]
  },
  {
    dayNumber: 9,
    theme: "יום הדרקון של ההר 🐉",
    riddles: [
      {
        q: "אני חיה מהאגדות עם כנפיים וזנב, ואני יודע להוציא אש מהפה. מי אני?",
        a: "דרקון",
        difficulty: "easy",
        emoji: "🐉"
      },
      {
        q: "אני גבוה-גבוה, יש לי פסגה, ולפעמים אני חובש כובע לבן של שלג. מי אני?",
        a: "הר",
        difficulty: "easy",
        emoji: "🏔️"
      },
      {
        q: "אני הולך איתכם לכל מקום כשיש שמש — אבל בלילה אני נעלם. מי אני?",
        a: "צל",
        difficulty: "medium",
        emoji: "👤"
      }
    ],
    jokes: [
      {
        setup: "למה הדרקון לא אוכל מרק חם?",
        punchline: "כי הוא כבר מספיק חם מבפנים! 🐉",
        difficulty: "easy"
      },
      {
        setup: "איך הר מדבר עם הר אחר?",
        punchline: "הוא לא מדבר — הוא שולח הד! 🏔️",
        difficulty: "easy"
      },
      {
        setup: "מה אמר ההר הקטן להר הגדול?",
        punchline: "כשאני אגדל, אני רוצה להיות פסגה כמוך!",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "דרקון רקד ריקוד רועש ברוח", difficulty: "easy" },
      { text: "הר הרים הרבה הדים", difficulty: "medium" }
    ],
    challenge: {
      title: "עקבות הדרקון",
      description:
        "היום עולים להר של שמידולין הדרקון! מי מוצא 3 ציורים או פסלים של דרקון על ההר?"
    },
    gameIds: ["who-am-i"]
  },
  {
    dayNumber: 10,
    theme: "יום חיות הבר 🐻",
    riddles: [
      {
        q: "אני גדול וחום, ישן כל החורף במערה, ומתעורר רעב לדבש. מי אני?",
        a: "דוב",
        difficulty: "easy",
        emoji: "🐻"
      },
      {
        q: "בלילה אני ער וביום אני ישן, ואני שואל כל הזמן: הוּ-הוּ? מי אני?",
        a: "ינשוף",
        difficulty: "easy",
        emoji: "🦉"
      },
      {
        q: "כולם משאירים אותי בשלג ובבוץ — אבל אף אחד לא יכול להרים אותי. מי אני?",
        a: "עקבות",
        difficulty: "medium",
        emoji: "👣"
      }
    ],
    jokes: [
      {
        setup: "למה הפיל לא משתמש במחשב?",
        punchline: "כי הוא מפחד מהעכבר! 🐘💻",
        difficulty: "easy"
      },
      {
        setup: "מה קוף אוכל בבוקר?",
        punchline: "קוֹ-פלקס! 🐒",
        difficulty: "easy"
      },
      {
        setup: "מה אריה אומר לפני האוכל?",
        punchline: "שאג-תיאבון! 🦁",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "דוב ודובון אכלו דובדבן", difficulty: "easy" }
    ],
    challenge: {
      title: "בלשי החיות",
      description:
        "בפארק החיות: לזהות 8 חיות שונות — ובסוף כל אחד בוחר איזו חיה הייתה הכי מצחיקה!"
    },
    gameIds: ["i-spy-austria"]
  },
  {
    dayNumber: 11,
    theme: "יום של מהר-מהר וקר-קר 🎢",
    riddles: [
      {
        q: "יושבים עליי למעלה, גולשים למטה מהר-מהר — וכולם צוחקים בדרך. מי אני?",
        a: "מגלשה",
        difficulty: "easy",
        emoji: "🛝"
      },
      {
        q: "יש לי קשקשים וסנפירים, ואני נושם דווקא בתוך המים. מי אני?",
        a: "דג",
        difficulty: "easy",
        emoji: "🐟"
      },
      {
        q: "מה נשבר ברגע שאומרים את השם שלו?",
        a: "שקט",
        difficulty: "medium",
        emoji: "🤫"
      }
    ],
    jokes: [
      {
        setup: "למה המלפפון החמוץ לא צוחק אף פעם?",
        punchline: "כי הוא חמוץ! 🥒",
        difficulty: "easy"
      },
      {
        setup: "מה עושים פינגווינים במסיבה?",
        punchline: "שוברים את הקרח! 🐧",
        difficulty: "medium"
      },
      {
        setup: "למה רכבת ההרים אף פעם לא עצובה?",
        punchline: "כי יש לה חיים מלאי עליות ומורדות — וזה דווקא כיף!",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "קרח קר קרץ לקרחון", difficulty: "medium" }
    ],
    challenge: {
      title: "מרוץ הסירות",
      description:
        "על שפת האגם של צֶל אם זֶה: מי סופר 10 סירות ראשון? סירת מפרש שווה כפול!"
    },
    gameIds: ["word-chain"]
  },
  {
    dayNumber: 12,
    theme: "יום החברים 🤗",
    riddles: [
      {
        q: "נותנים אותי עם שתי ידיים, ומי שמקבל אותי — תמיד מחזיר. מי אני?",
        a: "חיבוק",
        difficulty: "easy",
        emoji: "🤗"
      },
      {
        q: "יש לי אוזניים ארוכות, אני קופץ רחוק ואוהב גזר. מי אני?",
        a: "ארנב",
        difficulty: "easy",
        emoji: "🐰"
      },
      {
        q: "על איזו שאלה אי אפשר אף פעם לענות \"כן\"?",
        a: "אתה ישן?",
        difficulty: "medium",
        emoji: "😴"
      }
    ],
    jokes: [
      {
        setup: "מה אמר דגל לדגל?",
        punchline: "כלום, הוא רק נופף! 🚩",
        difficulty: "easy"
      },
      {
        setup: "למה הבננה מרחה קרם הגנה?",
        punchline: "כדי שהיא לא תתקלף! 🍌",
        difficulty: "easy"
      },
      {
        setup: "למה השעון קיבל נזיפה?",
        punchline: "כי הוא דיבר יותר מדי — טיק-טק-טיק-טק! 🕐",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "חבר חיבק חבר בחיבוק חם", difficulty: "easy" }
    ],
    challenge: {
      title: "מסע החברים",
      description:
        "נוסעים לפגוש את החברים! מי ממציא בדרך את ברכת השלום הכי מצחיקה — עם תנועות ידיים?"
    },
    gameIds: ["twenty-questions", "would-you-rather"]
  },
  {
    dayNumber: 13,
    theme: "יום מזחלות ואגמים 🛷",
    riddles: [
      {
        q: "אני שוחה באגם, יש לי מקור כתום ואני אומר גע-גע. מי אני?",
        a: "ברווז",
        difficulty: "easy",
        emoji: "🦆"
      },
      {
        q: "יש לי שני גלגלים, פעמון ודוושות — ורוכבים עליי. מי אני?",
        a: "אופניים",
        difficulty: "easy",
        emoji: "🚲"
      },
      {
        q: "מה עולה למעלה דווקא כשהגשם יורד למטה?",
        a: "מטרייה",
        difficulty: "medium",
        emoji: "☂️"
      }
    ],
    jokes: [
      {
        setup: "למה הסלט צחק?",
        punchline: "כי דגדגו לו את העלים! 🥗",
        difficulty: "easy"
      },
      {
        setup: "מה אמר התוכי לתוכי?",
        punchline: "מה אמר התוכי לתוכי? מה אמר התוכי לתוכי? 🦜",
        difficulty: "easy"
      },
      {
        setup: "למה המזחלת צוחקת כל הדרך למטה?",
        punchline: "כי המסילה מדגדגת לה!",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "מפרשית מפליגה במפרץ מופלא", difficulty: "medium" }
    ],
    challenge: {
      title: "אלופי המזחלת",
      description:
        "היום גולשים במזחלת אלפינית! אתגר: מי מצליח לרדת את כל הדרך בלי לצרוח בכלל? (או — מי צורח הכי חזק?)"
    },
    gameIds: ["echo-song"]
  },
  {
    dayNumber: 14,
    theme: "יום טירות ומלח 🏰🧂",
    riddles: [
      {
        q: "אני לבן כמו סוכר, אבל אני בכלל-בכלל לא מתוק. מי אני?",
        a: "מלח",
        difficulty: "easy",
        emoji: "🧂"
      },
      {
        q: "יש לי עיניים חדות-חדות ואני עף הכי מהר בשמיים. מי אני?",
        a: "בז",
        difficulty: "easy",
        emoji: "🦅"
      },
      {
        q: "ככל שמוציאים ממני יותר — כך אני נהיה גדול יותר. מי אני?",
        a: "בור",
        difficulty: "medium",
        emoji: "🕳️"
      }
    ],
    jokes: [
      {
        setup: "מה אמר הבז לנץ?",
        punchline: "בוא נעוף מפה! 🦅",
        difficulty: "easy"
      },
      {
        setup: "מה אמר המלח לפלפל?",
        punchline: "ביחד אנחנו מתבלים את החיים! 🧂",
        difficulty: "easy"
      },
      {
        setup: "למה במערת הקרח אף אחד לא מתרגש?",
        punchline: "כי כולם שומרים שם על קור רוח! ❄️",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "בז זז בזריזות", difficulty: "easy" },
      { text: "המלח מלח מלח במלח", difficulty: "medium" }
    ],
    challenge: {
      title: "שומרי הטירה",
      description:
        "בטירת הוֹהֶנוֶרפֶן: לספור כמה מגדלים יש לטירה — ובמופע הציפורים לזהות מי עף הכי גבוה!"
    },
    gameIds: ["car-bingo"]
  },
  {
    dayNumber: 15,
    theme: "המסע הגדול לווינה 🚗",
    riddles: [
      {
        q: "יש לי ארבעה גלגלים והגה, ואני לוקחת את כל המשפחה לטיולים. מי אני?",
        a: "מכונית",
        difficulty: "easy",
        emoji: "🚗"
      },
      {
        q: "יש לי שלוש עיניים בצבעים שונים, ואני אומר למכוניות מתי לעצור ומתי לנסוע. מי אני?",
        a: "רמזור",
        difficulty: "easy",
        emoji: "🚦"
      },
      {
        q: "מה מחבר בין שתי ערים — בלי לזוז אף פעם ממקומו?",
        a: "כביש",
        difficulty: "medium",
        emoji: "🛣️"
      }
    ],
    jokes: [
      {
        setup: "למה הטרקטור הלך לישון מוקדם?",
        punchline: "כי הוא היה חרוש! 🚜",
        difficulty: "easy"
      },
      {
        setup: "איפה זברות אוהבות לחצות את הכביש?",
        punchline: "במעבר חצייה! 🦓",
        difficulty: "easy"
      },
      {
        setup: "איזה כביש הכי מנומס?",
        punchline: "זה שתמיד נותן זכות קדימה! 🚗",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "נחש נשך נחש", difficulty: "easy" },
      { text: "מכונית מהירה מיהרה למנהרה", difficulty: "easy" }
    ],
    challenge: {
      title: "משימת המנהרות",
      description:
        "נסיעה ארוכה לווינה! לפני שיוצאים — כל אחד מנחש כמה מנהרות יהיו בדרך. סופרים יחד, והכי קרוב מנצח!"
    },
    gameIds: ["twenty-questions", "word-chain", "i-spy-austria"]
  },
  {
    dayNumber: 16,
    theme: "יום הגלגל הענק 🎡",
    riddles: [
      {
        q: "אני עגול וענק, מסתובב לאט-לאט, ומלמעלה רואים את כל העיר. מי אני?",
        a: "גלגל ענק",
        difficulty: "easy",
        emoji: "🎡"
      },
      {
        q: "אני צבעוני וריחני, גדל בגינה, ודבורים באות לבקר אותי. מי אני?",
        a: "פרח",
        difficulty: "easy",
        emoji: "🌸"
      },
      {
        q: "יש לי פנים ומחוגים — אבל אין לי עיניים ואף. מי אני?",
        a: "שעון",
        difficulty: "medium",
        emoji: "🕰️"
      }
    ],
    jokes: [
      {
        setup: "מה אמר הגלגל הענק על החיים שלו?",
        punchline: "הכול הולך אצלי סחור-סחור! 🎡",
        difficulty: "medium"
      },
      {
        setup: "מה אמר הבלון לילד?",
        punchline: "אל תעזוב אותי! 🎈",
        difficulty: "easy"
      },
      {
        setup: "למה השלד לא עלה לגלגל הענק?",
        punchline: "כי לא היה לו לב לזה! 💀",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "גלגל גדול גלגל גל", difficulty: "medium" }
    ],
    challenge: {
      title: "בלשי הגלגל",
      description:
        "בגלגל הענק של וינה: מי מצליח לספור כמה קרונות אדומים יש על הגלגל? ומלמעלה — מי מוצא את הבית שלנו?"
    },
    gameIds: ["would-you-rather"]
  },
  {
    dayNumber: 17,
    theme: "יום ארמונות ופרפרים 🦋",
    riddles: [
      {
        q: "פעם הייתי זחל, ועכשיו יש לי כנפיים צבעוניות ואני עף מפרח לפרח. מי אני?",
        a: "פרפר",
        difficulty: "easy",
        emoji: "🦋"
      },
      {
        q: "אני קופץ מעץ לעץ, עושה פרצופים מצחיקים ומת על בננות. מי אני?",
        a: "קוף",
        difficulty: "easy",
        emoji: "🐒"
      },
      {
        q: "יש בי המון-המון שבילים ופניות, אבל רק דרך אחת נכונה החוצה. מי אני?",
        a: "מבוך",
        difficulty: "medium",
        emoji: "🌀"
      }
    ],
    jokes: [
      {
        setup: "למה כולם צחקו במבוך של הארמון?",
        punchline: "כי הם הלכו לאיבוד… מצחוק! 🌀",
        difficulty: "easy"
      },
      {
        setup: "איך קוראים לפרפר בלי כנפיים?",
        punchline: "זחל! 🐛",
        difficulty: "easy"
      },
      {
        setup: "למה הסוס של הכרכרה בווינה הולך לאט?",
        punchline: "כדי שתספיקו לצלם אותו! 🐴",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "פרפר פרח מפרח לפרח", difficulty: "easy" },
      { text: "קוף קטן קטף קליפה", difficulty: "easy" }
    ],
    challenge: {
      title: "מלכי המבוך",
      description:
        "בארמון שֶנבּרוּן יש מבוך אמיתי! מי מוצא את הדרך למרכז בלי עזרה מההורים?"
    },
    gameIds: ["who-am-i"]
  },
  {
    dayNumber: 18,
    theme: "טסים הביתה ✈️🏠",
    riddles: [
      {
        q: "ממלאים אותי בבגדים ובמתנות, סוגרים אותי חזק — ולוקחים אותי לטיולים. מי אני?",
        a: "מזוודה",
        difficulty: "easy",
        emoji: "🧳"
      },
      {
        q: "בלילה אני מאיר בשמיים — לפעמים אני עגול ולפעמים רק חצי. מי אני?",
        a: "ירח",
        difficulty: "easy",
        emoji: "🌙"
      },
      {
        q: "מה שייך רק לכם — אבל אחרים משתמשים בו הרבה יותר מכם?",
        a: "השם שלכם",
        difficulty: "medium",
        emoji: "📛"
      }
    ],
    jokes: [
      {
        setup: "מה אמר הדרכון למזוודה?",
        punchline: "עוד טיסה ביחד! ✈️",
        difficulty: "easy"
      },
      {
        setup: "למה המטוס אף פעם לא רעב?",
        punchline: "כי הבטן שלו מלאה מזוודות! 🧳",
        difficulty: "easy"
      },
      {
        setup: "מה ההבדל בין מטוס לציפור?",
        punchline: "הציפור לא צריכה כרטיס! 🐦",
        difficulty: "medium"
      }
    ],
    tongueTwisters: [
      { text: "בקבוק בלי פקק, פקק בלי בקבוק", difficulty: "medium" },
      { text: "טייס טס בטיסה מטריפה", difficulty: "easy" }
    ],
    challenge: {
      title: "אלופי המזוודות",
      description:
        "בשדה התעופה: מי מזהה ראשון את המזוודות שלנו על המסוע? ובזמן ההמתנה — מי סופר יותר מטוסים בחלון?"
    },
    gameIds: ["twenty-questions"]
  }
];

/** Look up one day's fun pack by its chapter number (1..18). */
export function getKidsPack(dayNumber: number): KidsDayPack | undefined {
  return kidsPacks.find(p => p.dayNumber === dayNumber);
}

/** Look up a road game from the shared library by id. */
export function getRoadGame(id: string): KidsRoadGame | undefined {
  return roadGames.find(g => g.id === id);
}
