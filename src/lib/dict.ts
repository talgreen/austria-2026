import { useLang } from "./i18n";
import type { Lang } from "./lang";

/**
 * The full UI dictionary. Every visible string in the shell of the app
 * lives here, keyed by short identifiers. To use a key in a component:
 *
 *   const t = useT();
 *   t("plan.read_more");
 */
export const DICT = {
  /* ---------- Brand / hero ---------- */
  brand: { en: "Austria 2026", he: "אוסטריה 2026" },
  brand_short: { en: "Austria", he: "אוסטריה" },
  brand_year: { en: "'26", he: "'26" },
  family_edition: {
    en: "Family edition · Issue 01",
    he: "מהדורת המשפחה · גליון 01"
  },
  families_byline: {
    en: "Our family · August 2026",
    he: "המשפחה שלנו · אוגוסט 2026"
  },
  hero_before_lead: {
    en: "Counting down to summer in the Austrian Alps",
    he: "סופרים לאחור לקיץ בהרי האלפים של אוסטריה"
  },
  hero_today_lead: { en: "Today in Austria", he: "היום באוסטריה" },
  hero_tomorrow_lead: { en: "Tomorrow in Austria", he: "מחר באוסטריה" },
  hero_after_lead: { en: "That summer in Austria", he: "אותו קיץ באוסטריה" },
  hero_after_title: { en: "Willkommen zurück", he: "ברוכים השבים" },
  hero_after_sub: {
    en: "9 — 26 August 2026 · the family edition",
    he: "9 — 26 באוגוסט 2026 · מהדורת המשפחה"
  },
  hero_close_almost: {
    en: "Gute Reise — almost there",
    he: "גוטֶה רַייזֶה — כמעט שם"
  },
  hero_one_week: {
    en: "One week to go · time to pack the carrier and the layers",
    he: "שבוע נותר · הזמן לארוז את המנשא והשכבות החמות"
  },
  hero_one_month: {
    en: "Less than a month · book Schönbrunn, the salt mine and the steam train",
    he: "פחות מחודש · להזמין את שנברון, מכרה המלח ורכבת הקיטור"
  },
  hero_far: {
    en: "An alpine summer, on the horizon",
    he: "קיץ אלפיני, באופק"
  },
  hero_today_day: { en: "Day", he: "יום" },
  hero_tomorrow_day: { en: "Tomorrow", he: "מחר" },
  hero_of_ten: { en: "of eighteen", he: "מתוך שמונה־עשר" },
  scroll_to_plan: { en: "the plan", he: "התוכנית" },
  hero_photo_day: { en: "Day {n}", he: "יום {n}" },

  /* ---------- Navbar ---------- */
  nav_today: { en: "Today", he: "היום" },
  nav_explore: { en: "Explore", he: "לגלות" },
  nav_itinerary: { en: "Itinerary", he: "מסלול" },
  nav_plan: { en: "Plan", he: "תוכנית" },
  nav_map: { en: "Map", he: "מפה" },
  // The stays are the trip's bases (Vienna, Salzburg, the Alps) —
  // the trip's "neighborhoods", which is what we surface in the nav.
  nav_stays: { en: "Stays", he: "לינות" },
  nav_attractions: { en: "Places", he: "מקומות" },
  // Services (gas / supermarket / nearby restaurants) is no longer in
  // the nav, but the section still lives on the page; keeping a clean
  // label here in case it returns later.
  nav_services: { en: "Local", he: "מקומי" },
  nav_food: { en: "Food", he: "אוכל" },
  nav_kids: { en: "Kids", he: "ילדים" },
  nav_tips: { en: "Tips", he: "טיפים" },
  nav_checklist: { en: "Lists", he: "רשימות" },
  nav_emergency: { en: "Emergency", he: "חירום" },

  /* ---------- Kids fun pack (riddles, jokes & road games) ---------- */
  // The kids *content* itself is Hebrew-only (see src/data/kids.ts);
  // these keys are only the surrounding chrome.
  kids_eyebrow: { en: "For the kids", he: "לילדים" },
  kids_title: { en: "Road fun", he: "כיף בדרכים" },
  kids_kicker: {
    en: "Riddles, jokes and car games for every drive of the trip",
    he: "חידות, בדיחות ומשחקים לכל נסיעה בטיול"
  },
  funpack_title: { en: "Today's fun pack", he: "חבילת הכיף של היום" },
  kids_pick_day: { en: "Pick a day", he: "בוחרים יום" },
  kids_today_chip: { en: "Today", he: "היום" },
  kids_today_pack: { en: "Today · Day {n}", he: "היום · יום {n}" },
  kids_riddles: { en: "Riddles", he: "חידות" },
  kids_jokes: { en: "Jokes", he: "בדיחות" },
  kids_twisters: { en: "Tongue twisters", he: "שוברי שיניים" },
  kids_twister_hint: {
    en: "Say it three times, fast!",
    he: "אמרו שלוש פעמים, מהר!"
  },
  kids_challenge: { en: "Today's challenge", he: "אתגר היום" },
  kids_suggested_games: {
    en: "Games for today's drive",
    he: "משחקים לנסיעה של היום"
  },
  kids_all_games_link: { en: "All road games", he: "לכל משחקי הדרך" },
  kids_reveal: { en: "Tap for the answer", he: "לחצו לתשובה" },
  kids_hide: { en: "Tap to hide", he: "לחצו להסתרה" },
  kids_how_to_play: { en: "How to play", he: "איך משחקים" },
  kids_difficulty_easy: { en: "Easy", he: "קל" },
  kids_difficulty_medium: { en: "Tricky", he: "מאתגר" },
  kids_road_games: { en: "Road games", he: "משחקי דרך" },
  kids_words_title: { en: "German words", he: "מילים בגרמנית" },
  kids_prev_day: { en: "Previous day", he: "היום הקודם" },
  kids_next_day: { en: "Next day", he: "היום הבא" },
  kids_jump_to: { en: "Jump to", he: "קפיצה אל" },
  kids_challenge_section: { en: "Today's challenge", he: "אתגר היום" },
  kids_road_games_title: { en: "The games shelf", he: "מדף המשחקים" },
  kids_road_games_kicker: {
    en: "No equipment needed — just mouths and imagination",
    he: "בלי ציוד — רק פה ודמיון"
  },
  kids_games_footnote: {
    en: "Every day's pack suggests games that fit that day's drives.",
    he: "בחבילה של כל יום מחכות הצעות למשחקים שמתאימים לנסיעות של אותו יום."
  },
  kids_hebrew_note: {
    en: "Kids content is in Hebrew",
    he: ""
  },

  badge_done: { en: "Done", he: "סיום" },
  badge_day_n: { en: "Day {n}", he: "יום {n}" },
  badge_d_until: { en: "{n}d", he: "{n} ימים" },

  /* ---------- Itinerary section ---------- */
  plan_eyebrow: { en: "The plan · day by day", he: "התוכנית · יום אחר יום" },
  plan_kicker: {
    en: "Swipe through eighteen chapters · click Read more for the full chapter",
    he: "החליקו בין שמונה־עשר פרקים · לחצו על 'קרא עוד' לפרק המלא"
  },
  /* ---------- Route timeline (2026 redesign) ---------- */
  route_eyebrow: { en: "The route · day by day", he: "המסלול · יום אחר יום" },
  route_title: { en: "The whole journey", he: "כל המסע" },
  route_kicker: {
    en: "Five bases, eighteen days — tap any day to open its chapter",
    he: "חמישה בסיסים, שמונה־עשר ימים — הקישו על יום כדי לפתוח את הפרק"
  },
  plan_chapter_x_of_y: {
    en: "Chapter {x} / {y}",
    he: "פרק {x} / {y}"
  },
  read_more: { en: "Read more", he: "קרא עוד" },
  more_about_place: {
    en: "More about this place",
    he: "עוד על המקום הזה"
  },
  hide_details: { en: "Hide details", he: "הסתר פרטים" },
  about_this_place: { en: "About this place", he: "על המקום הזה" },
  on_the_road: { en: "On the road", he: "בדרך" },
  more_stop_one: { en: "more stop", he: "עצירה נוספת" },
  more_stop_many: { en: "more stops", he: "עצירות נוספות" },

  /* ---------- Chapter detail ---------- */
  back_to_plan: { en: "Back to the plan", he: "חזרה לתוכנית" },
  todays_plan: { en: "Today's plan", he: "תוכנית היום" },
  hour_by_hour: { en: "Hour by hour", he: "שעה אחרי שעה" },
  on_the_map: { en: "On the map", he: "על המפה" },
  the_days_stops: { en: "The day's stops", he: "עצירות היום" },
  ordered_visit: {
    en: "Numbered in the order you'll visit them",
    he: "ממוספרות לפי סדר הביקור"
  },
  things_to_know: { en: "Things to know", he: "טוב לדעת" },
  tips_for_chapter: { en: "Tips for this chapter", he: "טיפים לפרק הזה" },
  no_locations_for_chapter: {
    en: "No locations on the map for this chapter.",
    he: "אין מיקומים על המפה לפרק הזה."
  },
  previous: { en: "Previous", he: "קודם" },
  next: { en: "Next", he: "הבא" },

  /* Severity labels */
  severity_critical: { en: "Critical", he: "קריטי" },
  severity_warning: { en: "Heads up", he: "שימו לב" },
  severity_info: { en: "Good to know", he: "טוב לדעת" },

  /* Today badge */
  today: { en: "Today", he: "היום" },

  /* ---------- Region / chapter labels ---------- */
  region_north_long: { en: "Vienna", he: "וינה" },
  region_south_long: { en: "The Alps", he: "האלפים" },
  region_transit_long: { en: "On the road", he: "בדרכים" },
  region_north_short: { en: "Vienna", he: "וינה" },
  region_south_short: { en: "Alps", he: "אלפים" },
  region_transit_short: { en: "Transit", he: "מעבר" },

  /* Tag labels */
  tag_water: { en: "Water", he: "מים" },
  tag_extreme: { en: "Adrenaline", he: "אדרנלין" },
  tag_nature: { en: "Nature", he: "טבע" },
  tag_culture: { en: "Culture", he: "תרבות" },
  tag_family: { en: "Family", he: "משפחה" },
  tag_food: { en: "Food", he: "אוכל" },
  tag_view: { en: "View", he: "נוף" },
  tag_cave: { en: "Cave", he: "מערה" },
  tag_village: { en: "Village", he: "כפר" },

  /* ---------- Map section ---------- */
  map_eyebrow: { en: "The atlas", he: "האטלס" },
  map_title: {
    en: "The whole trip on one map",
    he: "כל הטיול על מפה אחת"
  },
  map_kicker: {
    en: "Tap a pin · trace the route · filter the rest",
    he: "הקישו על סיכה · עקבו אחר המסלול · סננו את השאר"
  },
  map_intro: {
    en: "Every stay, attraction, restaurant and supermarket — color-coded by category. The dashed line is our actual loop: Vienna out to Salzburg and Tyrol, down through the Pinzgau lakes, and back to Vienna.",
    he: "כל מקום לינה, אטרקציה, מסעדה וסופרמרקט — בקוד צבעים לפי קטגוריה. הקו המקווקו הוא הלולאה שלנו: מווינה לזלצבורג ולטירול, דרך אגמי הפינצגאו, ובחזרה לווינה."
  },
  map_route_on: { en: "Route on", he: "מסלול מוצג" },
  map_route_off: { en: "Route off", he: "מסלול מוסתר" },
  map_spokes_on: { en: "Day trips on", he: "טיולי יום מוצגים" },
  map_spokes_off: { en: "Day trips off", he: "טיולי יום מוסתרים" },
  map_seg_arrival: {
    en: "Vienna → Salzburg → Tyrol",
    he: "וינה ← זלצבורג ← טירול"
  },
  map_seg_arrival_short: { en: "Out west", he: "מערבה" },
  map_seg_transfer: {
    en: "Tyrol → the Pinzgau lakes → Werfenweng",
    he: "טירול ← אגמי הפינצגאו ← וֶרפֶנוֶנג"
  },
  map_seg_transfer_short: { en: "The Alps", he: "האלפים" },
  map_seg_departure: {
    en: "Werfenweng → Vienna → home",
    he: "וֶרפֶנוֶנג ← וינה ← הביתה"
  },
  map_seg_departure_short: {
    en: "Back east",
    he: "מזרחה"
  },
  map_zoom_fit: { en: "Zoom to fit all locations", he: "התאם תצוגה לכל המיקומים" },
  map_locate_me: { en: "Show my location", he: "הצג את המיקום שלי" },
  map_you_here: { en: "You are here", he: "אתה כאן" },

  /* Map categories */
  cat_stay: { en: "Stays", he: "לינה" },
  cat_attraction: { en: "Attractions", he: "אטרקציות" },
  cat_restaurant: { en: "Restaurants", he: "מסעדות" },
  cat_supermarket: { en: "Supermarkets", he: "סופרמרקטים" },
  cat_gas: { en: "Gas", he: "דלק" },
  cat_airport: { en: "Airport", he: "שדה תעופה" },
  cat_hospital: { en: "Hospital", he: "בית חולים" },
  cat_winery: { en: "Wineries", he: "יקבים" },

  /* Map popup */
  navigate: { en: "Navigate", he: "ניווט" },
  navigate_google: { en: "Maps", he: "מפות" },
  navigate_waze: { en: "Waze", he: "וויז" },
  navigate_google_aria: {
    en: "Open in Google Maps and start navigating",
    he: "פתחו ב־Google Maps והתחילו ניווט"
  },
  navigate_waze_aria: {
    en: "Open in Waze and start navigating",
    he: "פתחו ב־Waze והתחילו ניווט"
  },
  website: { en: "Website", he: "אתר" },
  show_on_map: { en: "Show on the map", he: "הצג על המפה" },
  on_the_map_short: { en: "On the map", he: "על המפה" },

  /* ---------- Listen / audio playback ---------- */
  listen_play: { en: "Listen", he: "האזן" },
  listen_pause: { en: "Pause", he: "השהה" },
  listen_unavailable: { en: "Audio unavailable", he: "האודיו לא זמין" },

  /* ---------- Gemininio (the AI tour guide) ---------- */
  gem_open: { en: "Chat with Felix", he: "שוחחו עם פליקס" },
  gem_close: { en: "Close", he: "סגור" },
  gem_title: { en: "Felix", he: "פליקס" },
  gem_tagline: {
    en: "Your Austrian guide in the Alps",
    he: "המדריך האוסטרי שלכם באלפים"
  },
  gem_setup_title: { en: "Set up Felix", he: "הגדרת פליקס" },
  gem_setup_blurb: {
    en: "Felix uses Google's Gemini Live API to talk with you. Paste a free Gemini API key — it's saved on this device only and never shared.",
    he: "פליקס משתמש ב־Gemini Live API של גוגל כדי לדבר אתכם. הדביקו מפתח Gemini API חינמי — הוא נשמר במכשיר הזה בלבד ולא נשלח לשום מקום אחר."
  },
  gem_setup_link: {
    en: "Get a free key (aistudio.google.com/apikey)",
    he: "להפיק מפתח חינמי (aistudio.google.com/apikey)"
  },
  gem_key_placeholder: { en: "AIza…", he: "AIza…" },
  gem_save_key: { en: "Save key & start chatting", he: "שמרו מפתח והתחילו שיחה" },
  gem_clear_key: { en: "Forget my key", he: "שכח את המפתח שלי" },
  gem_reset_history: { en: "Clear chat", he: "נקה היסטוריית שיחה" },
  gem_input_placeholder: {
    en: "Type a question — or tap the mic to talk",
    he: "כתבו שאלה — או הקישו על המיקרופון כדי לדבר"
  },
  gem_send: { en: "Send", he: "שלח" },
  gem_mic_hold: { en: "Hold to talk", he: "החזיקו כדי לדבר" },
  gem_mic_release: { en: "Release to send", he: "שחררו כדי לשלוח" },
  gem_mic_start: { en: "Tap to record", he: "הקישו להקלטה" },
  gem_mic_stop: { en: "Tap to stop now", he: "הקישו לעצירה" },
  gem_recording: { en: "Recording — pauses to send…", he: "מקליט — עוצר לשליחה אוטומטית…" },
  gem_transcribing: { en: "Transcribing…", he: "מתמלל…" },
  gem_transcribe_failed: {
    en: "Could not understand the recording. Please try again.",
    he: "לא הצלחתי להבין את ההקלטה. נסו שוב."
  },
  gem_listening: { en: "Listening…", he: "מקשיב…" },
  gem_thinking: { en: "Thinking…", he: "חושב…" },
  gem_speaking: { en: "Speaking…", he: "מדבר…" },
  gem_connecting: { en: "Connecting…", he: "מתחבר…" },
  gem_disconnected: { en: "Disconnected. Tap to reconnect.", he: "לא מחובר. הקישו כדי להתחבר מחדש." },
  gem_error_generic: {
    en: "Something went wrong. Please try again later.",
    he: "משהו השתבש. נסו שוב מאוחר יותר."
  },
  gem_error_occurred: {
    en: "Something went wrong. Please try again later. (Ref: {code})",
    he: "משהו השתבש. נסו שוב מאוחר יותר. (קוד: {code})"
  },
  gem_first_hint: {
    en: "Try: \"What should we do tomorrow morning?\" or \"Which days need the carrier instead of the stroller?\"",
    he: "נסו: \"מה כדאי לעשות מחר בבוקר?\" או \"באילו ימים צריך מנשא במקום עגלה?\""
  },
  gem_settings: { en: "Settings", he: "הגדרות" },
  gem_back: { en: "Back to chat", he: "חזרה לשיחה" },
  gem_builtin_key_note: {
    en: "Using the trip's built-in API key. To use your own instead, set up a key in your browser cache.",
    he: "משתמשים במפתח המובנה של הטיול. כדי להשתמש במפתח אישי שלכם, הגדירו אותו במטמון הדפדפן."
  },
  gem_unmute: { en: "Play reply audio", he: "השמעת קול תשובה" },
  gem_mute:   { en: "Mute reply audio", he: "השתקת קול תשובה" },
  gem_input_mode_note: {
    en: "Globe off = trip data only (Gemini Live). Globe on = Google Search (REST, text).",
    he: "כדור הארץ כבוי = רק נתוני מסלול (ג׳מיני לייב). כדור הארץ דלוק = חיפוש גוגל (REST, טקסט)."
  },
  gem_web_search_enable: {
    en: "Turn Google Search on for sends",
    he: "הפעלת חיפוש גוגל לשליחות"
  },
  gem_web_search_disable: {
    en: "Turn Google Search off for sends",
    he: "כיבוי חיפוש גוגל לשליחות"
  },
  /* ---------- Stays section ---------- */
  stays_eyebrow: { en: "Where we sleep", he: "איפה נישן" },
  stays_title: { en: "Five bases, one big loop", he: "חמישה בסיסים, לולאה אחת גדולה" },
  stays_kicker: {
    en: "Vienna, Salzburg, Tyrol, the Pinzgau lakes and back",
    he: "וינה, זלצבורג, טירול, אגמי הפינצגאו ובחזרה"
  },
  stays_intro: {
    en: "The trip is a road loop with five bases — two nights in Salzburg, four in the Zillertal, five in the Pinzgau lakes, three with friends in Werfenweng, and three more in Vienna to finish.",
    he: "הטיול הוא לולאת נסיעה עם חמישה בסיסים — שני לילות בזלצבורג, ארבעה בצילרטל, חמישה באגמי הפינצגאו, שלושה עם חברים בוֶרפֶנוֶנג, ועוד שלושה בווינה לסיום."
  },
  stay_check_in: { en: "Check in", he: "צ'ק־אין" },
  stay_check_out: { en: "Check out", he: "צ'ק־אאוט" },
  stay_nights_one: { en: "{n} night", he: "{n} לילה" },
  stay_nights_many: { en: "{n} nights", he: "{n} לילות" },
  stay_highlights: { en: "Why we picked it", he: "למה בחרנו בו" },
  stay_warnings: { en: "Worth knowing", he: "כדאי לדעת" },
  stay_open_booking: { en: "Open booking", he: "פתח הזמנה" },

  /* ---------- TripStats ---------- */
  trip_stats_eyebrow: { en: "By the numbers", he: "במספרים" },
  trip_stats_days: { en: "Days", he: "ימים" },
  trip_stats_chapters: { en: "Chapters", he: "פרקים" },
  trip_stats_attractions: { en: "Highlights", he: "נקודות עניין" },
  trip_stats_stays: { en: "Stays", he: "לינות" },

  /* ---------- Attractions grid ---------- */
  attr_eyebrow: { en: "Where we'll go", he: "לאן נלך" },
  attr_title: { en: "Places we'll fall for", he: "מקומות שנתאהב בהם" },
  attr_kicker: {
    en: "Lakes, castles, cable cars, caves, an ice cave and a steam train",
    he: "אגמים, טירות, רכבלים, מערות, מערת קרח ורכבת קיטור"
  },
  attr_filter_all: { en: "All", he: "הכול" },
  attr_count: { en: "{n} places", he: "{n} מקומות" },
  attr_filter_clear: { en: "All types", he: "כל הסוגים" },
  attr_filter_north: { en: "Vienna", he: "וינה" },
  attr_filter_south: { en: "Alps", he: "אלפים" },
  attr_filter_water: { en: "Water", he: "מים" },
  attr_filter_culture: { en: "Culture", he: "תרבות" },
  attr_filter_extreme: { en: "Adrenaline", he: "אדרנלין" },
  attr_filter_nature: { en: "Nature", he: "טבע" },

  /* ---------- Services section ---------- */
  services_eyebrow: { en: "Around you", he: "סביבכם" },
  services_title: { en: "Eat, shop, refuel", he: "אוכל, קניות, תדלוק" },
  services_kicker: {
    en: "Hand-picked spots near both bases — saves you the panic-Google",
    he: "מקומות שנבחרו בקפידה ליד שני הבסיסים — חוסכים חיפושי גוגל בלחץ"
  },
  services_filter_north: { en: "Vienna & Salzburg", he: "וינה וזלצבורג" },
  services_filter_south: { en: "The Alps", he: "האלפים" },
  services_filter_restaurant: { en: "Restaurants", he: "מסעדות" },
  services_filter_supermarket: { en: "Supermarkets", he: "סופרמרקטים" },
  services_filter_gas: { en: "Gas", he: "דלק" },

  hours: { en: "Hours", he: "שעות" },

  /* ---------- Tips section ---------- */
  tips_eyebrow: { en: "Local intelligence", he: "מודיעין מקומי" },
  tips_title: { en: "Tips & quiet warnings", he: "טיפים ואזהרות שקטות" },
  tips_kicker: {
    en: "What we learned the hard way, so you don't have to",
    he: "מה שלמדנו בדרך הקשה — כדי שלא תצטרכו"
  },

  /* ---------- Checklist ---------- */
  checklist_eyebrow: { en: "Before we fly", he: "לפני הטיסה" },
  checklist_title: { en: "Pre-trip checklist", he: "צ'קליסט לפני הטיול" },
  checklist_kicker: {
    en: "Two lists: book it now, pack it later",
    he: "שתי רשימות: להזמין עכשיו, לארוז אחר כך"
  },
  checklist_booking: { en: "Book ahead", he: "להזמין מראש" },
  checklist_packing: { en: "Pack the bag", he: "לארוז את התיק" },
  checklist_progress: {
    en: "{done} of {total} done",
    he: "{done} מתוך {total} בוצעו"
  },
  checklist_urgent: { en: "Urgent", he: "דחוף" },

  /* ---------- Emergency ---------- */
  emergency_eyebrow: { en: "When things go sideways", he: "כשמשהו משתבש" },
  emergency_title: { en: "Emergency & medical", he: "חירום ורפואה" },
  emergency_kicker: {
    en: "One number to remember: 112",
    he: "מספר אחד לזכור: 112"
  },
  emergency_call_112: { en: "Call 112", he: "חייגו 112" },
  emergency_112_lead: {
    en: "Single emergency number across the EU — works from any phone, English available",
    he: "מספר חירום אחיד בכל האיחוד האירופי — עובד מכל טלפון, נותן שירות גם באנגלית"
  },

  /* ---------- Weather ---------- */
  weather_eyebrow: { en: "Right now in Austria", he: "עכשיו באוסטריה" },
  weather_north: { en: "Vienna", he: "וינה" },
  weather_south: { en: "Zell am See", he: "צל אם זה" },
  weather_loading: { en: "Loading…", he: "טוען…" },
  weather_error: { en: "Weather unavailable", he: "מזג אוויר לא זמין" },
  weather_high_low: { en: "H {high}° / L {low}°", he: "מקס׳ {high}° / מינ׳ {low}°" },
  weather_now: { en: "Now {temp}°", he: "כעת {temp}°" },

  /* ---------- Difficulty ---------- */
  difficulty_label: { en: "Difficulty", he: "רמת קושי" },
  difficulty_easy: { en: "Easy", he: "קל" },
  difficulty_moderate: { en: "Moderate", he: "בינוני" },
  difficulty_challenging: { en: "Challenging", he: "מאתגר" },

  /* ---------- Per-attraction insider tips ---------- */
  insider_tips_label: { en: "Insider tips", he: "טיפים של יודעי דבר" },

  /* ---------- Per-day gear & dayTips on the chapter page ---------- */
  gear_eyebrow: { en: "Pack the day", he: "לארוז ליום" },
  gear_title: { en: "What to bring", he: "מה לקחת" },
  gear_kicker: {
    en: "A small kit, picked for the day's mix",
    he: "ציוד קטן שנבחר בקפידה לחוויות של היום"
  },
  gear_for_label: { en: "for", he: "ל־" },
  gear_for_general: { en: "general", he: "כללי" },

  word_eyebrow: { en: "German word of the day", he: "המילה הגרמנית של היום" },
  word_pronounce_label: { en: "Pronounce it", he: "איך אומרים" },
  word_meaning_label: { en: "Meaning", he: "פירוש" },
  word_use_label: { en: "Try it", he: "נסו לומר" },
  word_also_today: { en: "Also today", he: "גם היום" },
  word_carousel_n_of_m: {
    en: "Word {n} of {total}",
    he: "מילה {n} מתוך {total}"
  },
  word_carousel_prev: { en: "Previous word", he: "המילה הקודמת" },
  word_carousel_next: { en: "Next word", he: "המילה הבאה" },
  word_pronounce_chip_listen: {
    en: "Play pronunciation",
    he: "השמעת הגייה"
  },
  word_example_chip_listen: {
    en: "Play example (German, then English, then Hebrew)",
    he: "השמעת המשפט (גרמנית, אחר כך אנגלית, ואז עברית)"
  },
  daytips_eyebrow: { en: "Notes for the day", he: "הערות להיום" },
  daytips_title: { en: "Good to know", he: "טוב לדעת" },
  daytips_kicker: {
    en: "Money, timing, mood — the things you'd whisper at breakfast",
    he: "כסף, תזמון, אווירה — הדברים שלוחשים ליד ארוחת הבוקר"
  },

  /* ---------- Food & Wine ---------- */
  food_eyebrow: { en: "At the table", he: "ליד השולחן" },
  food_title: { en: "What Austria tastes like", he: "הטעם של אוסטריה" },
  food_kicker: {
    en: "Schnitzel, alpine cheese, strudel — and what to drink with it",
    he: "שניצל, גבינות אלפיניות, שטרודל — ומה שותים לצידם"
  },
  food_dishes_label: { en: "Food & drink", he: "אוכל ושתייה" },
  food_wineries_label: { en: "Drinks", he: "משקאות" },
  food_filter_north: { en: "Vienna", he: "וינה" },
  food_filter_south: { en: "The Alps", he: "האלפים" },
  food_filter_austria: { en: "All Austria", he: "כל אוסטריה" },
  food_try_it: { en: "Try it at", he: "לטעום ב" },
  food_appellation: { en: "Appellation", he: "ייעוד יין" },
  food_book_visit: { en: "Book the visit", he: "הזמן ביקור" },
  food_dish_pasta: { en: "Pasta", he: "פסטה" },
  food_dish_starter: { en: "Starter", he: "מנה ראשונה" },
  food_dish_main: { en: "Main", he: "מנה עיקרית" },
  food_dish_dessert: { en: "Dessert", he: "קינוח" },
  food_dish_drink: { en: "Drink", he: "משקה" },
  food_dish_snack: { en: "Snack", he: "נשנוש" },

  /* ---------- Footer ---------- */
  footer_made_with: {
    en: "Built for the family · August 2026",
    he: "נבנה למשפחה · אוגוסט 2026"
  },
  footer_attribution: {
    en: "Photos credited to their respective authors. Map © OpenStreetMap & CARTO.",
    he: "צילומים בקרדיט ליוצריהם. מפה © OpenStreetMap ו־CARTO."
  },
  footer_open_repo: { en: "Open the repo", he: "לרפו ב־GitHub" },
  footer_lang_label: { en: "Language", he: "שפה" },

  /* ---------- Floating buttons / common ---------- */
  open_map: { en: "Open the map", he: "פתח מפה" },
  open_external: { en: "Open", he: "פתח" },

  /* ---------- Ride times (inline connector between activities) ---------- */
  ride_to_next: { en: "Drive", he: "נסיעה" },
  depart_at: { en: "Departure", he: "יציאה" },

  /* ---------- Restaurants for the day ---------- */
  restaurants_eyebrow: { en: "Where to eat", he: "איפה לאכול" },
  restaurants_title: { en: "Tonight's tables", he: "השולחנות של הערב" },
  restaurants_kicker: {
    en: "Hand-picked spots near today's plan",
    he: "מקומות שנבחרו בקפידה ליד המסלול של היום"
  },

  /* ---------- Drink of the day (closing flourish) ---------- */
  drink_eyebrow: { en: "After dinner", he: "אחרי ארוחת הערב" },
  drink_title: { en: "A glass to close the day", he: "כוסית לסיום היום" },
  drink_kicker: {
    en: "Adults only — Austria pours generously (the kids get an Almdudler)",
    he: "למבוגרים בלבד — אוסטריה מוזגת ברוחב יד (הילדים מקבלים אַלמדוּדלֶר)"
  },
  drink_pairing_label: { en: "Why tonight", he: "למה הערב" },
  drink_serving_label: { en: "Serving", he: "הגשה" },
  drink_type_wine: { en: "Wine", he: "יין" },
  drink_type_cocktail: { en: "Cocktail", he: "קוקטייל" },
  drink_type_beer: { en: "Beer", he: "בירה" },
  drink_type_aperitif: { en: "Aperitif", he: "אפריטיף" },
  drink_type_digestif: { en: "Digestif", he: "דיג'סטיף" },
  drink_type_coffee: { en: "Coffee", he: "קפה" },
  drink_type_other: { en: "Drink", he: "משקה" },

  /* ---------- Activity flags (rendered as small badges) ---------- */
  optional_label: { en: "Optional", he: "לבחירה" },
  optional_aria: {
    en: "Optional — skip if you're tired",
    he: "לבחירה — אפשר לדלג אם עייפים"
  },

  /* ---------- Timeline & stops ---------- */
  leave_by: { en: "Leave by", he: "יציאה עד" },
  drive_label: { en: "Drive", he: "נסיעה" },
  official_site: { en: "Official site", he: "אתר רשמי" },
  where_you_sleep: { en: "Where you sleep", he: "איפה ישנים" },
  moving_to: { en: "Moving to", he: "עוברים אל" },
  nights_label: { en: "nights", he: "לילות" },
  night_label: { en: "night", he: "לילה" },

  /* ---------- Install / Add to Home Screen ---------- */
  install_eyebrow: { en: "Take it with you", he: "קחו את זה איתכם" },
  install_title_ios: {
    en: "Save the trip to your home screen",
    he: "שמרו את הטיול למסך הבית"
  },
  install_title_android: {
    en: "Install the trip as an app",
    he: "התקינו את הטיול כאפליקציה"
  },
  install_subtitle_ios: {
    en: "Open like a real app — no app store, works offline-friendly",
    he: "נפתחת כמו אפליקציה רגילה — בלי חנות, עובדת גם ללא חיבור רשת"
  },
  install_subtitle_android: {
    en: "One tap from your home screen, full-screen, no browser bar",
    he: "הקשה אחת ממסך הבית, מסך מלא, בלי שורת דפדפן למעלה"
  },
  install_subtitle_android_fallback: {
    en: "Add a one-tap shortcut from Chrome's menu",
    he: "הוסיפו קיצור דרך מתפריט Chrome"
  },
  install_install_button: { en: "Install", he: "התקן" },
  install_menu_label: { en: "Install app", he: "התקנת האפליקציה" },
  install_dismiss: { en: "Maybe later", he: "אולי אחר כך" },
  install_dont_show_again: { en: "Don't show this again", he: "אל תציגו לי שוב" },
  install_close_aria: { en: "Close install prompt", he: "סגור חלונית התקנה" },

  /* iOS Safari steps (iPhone) */
  install_step_share_iphone: {
    en: "Tap the Share icon",
    he: "הקישו על סמל השיתוף"
  },
  install_step_share_iphone_hint: {
    en: "The square with an up-arrow at the bottom of Safari",
    he: "הריבוע עם החץ למעלה, בתחתית Safari"
  },
  /* iOS Safari steps (iPad) */
  install_step_share_ipad: {
    en: "Tap the Share icon",
    he: "הקישו על סמל השיתוף"
  },
  install_step_share_ipad_hint: {
    en: "The square with an up-arrow in the top-right toolbar",
    he: "הריבוע עם החץ למעלה, בסרגל העליון מימין"
  },
  install_step_a2hs: {
    en: "Choose \u201CAdd to Home Screen\u201D",
    he: "בחרו ב\u05F4הוסף למסך הבית\u05F4"
  },
  install_step_a2hs_hint: {
    en: "Scroll down in the share sheet if you don't see it",
    he: "גללו מטה בתפריט השיתוף אם אינכם רואים זאת"
  },
  install_step_confirm: {
    en: "Tap \u201CAdd\u201D in the top corner",
    he: "הקישו על \u05F4הוסף\u05F4 בפינה העליונה"
  },
  install_step_confirm_hint: {
    en: "The Austria icon lands on your home screen",
    he: "הסמל של אוסטריה מופיע במסך הבית"
  },

  /* iOS – not Safari (Chrome / Firefox / Edge on iOS) */
  install_ios_open_in_safari: {
    en: "Open this page in Safari to install",
    he: "פתחו את הדף ב־Safari כדי להתקין"
  },
  install_ios_open_in_safari_hint: {
    en: "Adding to the home screen on iPhone & iPad only works from Safari",
    he: "הוספה למסך הבית באייפון ובאייפד עובדת רק מתוך Safari"
  },

  /* Android fallback steps (when beforeinstallprompt didn't fire) */
  install_step_android_menu: {
    en: "Tap the menu (\u22EE) at the top right",
    he: "הקישו על תפריט (\u22EE) למעלה מימין"
  },
  install_step_android_menu_hint: {
    en: "Three vertical dots in the Chrome toolbar",
    he: "שלוש נקודות אנכיות בסרגל של Chrome"
  },
  install_step_android_a2hs: {
    en: "Choose \u201CInstall app\u201D or \u201CAdd to Home screen\u201D",
    he: "בחרו ב\u05F4התקנת אפליקציה\u05F4 או \u05F4הוסף למסך הבית\u05F4"
  },
  install_step_android_a2hs_hint: {
    en: "The wording depends on your Chrome version",
    he: "הניסוח תלוי בגרסת Chrome"
  },

  /* ---------- Quiz with Quizzo (kid-friendly per-day recap) ---------- */
  quiz_eyebrow: { en: "Recap on the way back", he: "סיכום בדרך חזרה" },
  quiz_title: { en: "Quizzo's trip quiz", he: "החידון של קוויצו" },
  quiz_subtitle: {
    en: "Five questions about today, hosted by Quizzo. Best played in the car on the way home.",
    he: "חמש שאלות על היום, בהנחיית קוויצו. הכי כיף לשחק ברכב בדרך חזרה."
  },
  quiz_start: { en: "Start the quiz", he: "התחילו את החידון" },
  quiz_loading: { en: "Quizzo is warming up…", he: "קוויצו מתחמם…" },
  quiz_question_of: {
    en: "Question {n} of {total}",
    he: "שאלה {n} מתוך {total}"
  },
  quiz_correct: { en: "Correct!", he: "נכון!" },
  quiz_wrong: { en: "Not quite — the answer was:", he: "לא בדיוק — התשובה היא:" },
  quiz_score: {
    en: "You scored {score} of {total}",
    he: "הניקוד: {score} מתוך {total}"
  },
  quiz_score_perfect: {
    en: "Super! Perfect score!",
    he: "סוּפֶּר! ניקוד מושלם!"
  },
  quiz_score_great: { en: "Sehr gut!", he: "זֶר גוּט!" },
  quiz_score_ok: {
    en: "Not bad — try again to beat it.",
    he: "לא רע — נסו שוב כדי לשפר."
  },
  quiz_score_low: {
    en: "Geh, that's a tough one. Another round?",
    he: "אוֹי, שאלות קשות. עוד סיבוב?"
  },
  quiz_play_again: { en: "Play again", he: "שחקו שוב" },
  quiz_new_questions: { en: "New questions", he: "שאלות חדשות" },
  quiz_ask_quizzo: { en: "Ask Quizzo something", he: "לשאול את קוויצו משהו" },
  quiz_offline: {
    en: "Quizzo needs the internet to write new questions. Try again when you're back online.",
    he: "קוויצו צריך אינטרנט כדי לכתוב שאלות חדשות. נסו שוב כשתחזרו לרשת."
  },
  quiz_unlocked_after: {
    en: "Unlocks once today's adventures begin.",
    he: "ייפתח כשההרפתקה של היום תתחיל."
  },
  quiz_voice_unavailable: {
    en: "Quizzo's voice isn't available right now — read the question and tap your answer.",
    he: "הקול של קוויצו לא זמין כרגע — קראו את השאלה ובחרו תשובה."
  },
  quiz_aria_option: { en: "Answer option {n}", he: "תשובה אפשרית {n}" },
  quiz_error: {
    en: "Quizzo got tongue-tied. Tap to try again.",
    he: "קוויצו התבלבל. הקישו כדי לנסות שוב."
  },
  quiz_close: { en: "Close the quiz", he: "סגרו את החידון" },

  /* ---------- Quiz mode toggle (offline / live) ---------- */
  quiz_mode_label: { en: "Mode", he: "מצב" },
  quiz_mode_offline: { en: "Offline", he: "ללא רשת" },
  quiz_mode_offline_hint: {
    en: "10 questions, saved on this device",
    he: "10 שאלות, שמורות במכשיר הזה"
  },
  quiz_mode_live: { en: "Live", he: "בשידור חי" },
  quiz_mode_live_hint: {
    en: "Endless questions, needs the internet",
    he: "שאלות בלי סוף, דורש אינטרנט"
  },
  quiz_offline_pack_unavailable: {
    en: "Offline pack isn't ready yet — switch to Live (with wifi) to play, then offline mode will work next time.",
    he: "החבילה לא זמינה עדיין — עברו ל\"בשידור חי\" עם אינטרנט, ובפעם הבאה גם המצב ללא רשת יעבוד."
  },
  quiz_offline_preparing: {
    en: "Preparing your offline pack — hang on…",
    he: "מכינים את החבילה לשמירה במכשיר…"
  },

  /* ---------- Endless live mode buttons ---------- */
  quiz_end_round: { en: "End round", he: "סיים סיבוב" },
  quiz_keep_going: { en: "Keep going", he: "ממשיכים" },
  quiz_loading_more: { en: "Loading next questions…", he: "טוען עוד שאלות…" },
  quiz_load_more_failed: {
    en: "Couldn't load more questions. End the round?",
    he: "לא הצלחנו לטעון עוד שאלות. לסיים את הסיבוב?"
  },
  quiz_question_n: { en: "Question {n}", he: "שאלה {n}" },

  /* ---------- Lock card (chapter date hasn't arrived yet) ---------- */
  quiz_locked_eyebrow: { en: "Locked for now", he: "נעול לעכשיו" },
  quiz_locked_title: { en: "Quizzo is still warming up", he: "קוויצו עדיין מתחמם" },
  quiz_locked_unlocks_on: {
    en: "Unlocks on {date}",
    he: "ייפתח ב{date}"
  },
  quiz_locked_hint_preview: {
    en: "Days 1 and 2 are unlocked early so you can try the quiz before the trip — the rest open on the morning of each day.",
    he: "ימים 1 ו-2 פתוחים מראש כדי שתוכלו להתנסות לפני הטיול — השאר נפתחים בבוקר היום עצמו."
  },

  /* ---------- Mute toggle ---------- */
  quiz_mute: { en: "Mute Quizzo", he: "השתק את קוויצו" },
  quiz_unmute: { en: "Unmute Quizzo", he: "בטלו את ההשתקה" },

  /* ---------- Fallback banner (Gemini failed in offline mode) ---------- */
  quiz_fallback_banner: {
    en: "Quizzo's chef is on a break — these are the basic questions for now.",
    he: "השף של קוויצו ביציאה קצרה — בינתיים אלו השאלות הבסיסיות."
  },

  /* ---------- TripStrip ---------- */
  scroll_chapters_prev: {
    en: "Previous chapters",
    he: "פרקים קודמים"
  },
  scroll_chapters_next: {
    en: "Next chapters",
    he: "פרקים הבאים"
  },
  chapter_label: { en: "Chapter", he: "פרק" },
  month_aug_short: { en: "Aug", he: "באוגוסט" },

  /* ---------- TodayHome (2026 redesign) ---------- */
  today_before_eyebrow: { en: "{n} days to go", he: "עוד {n} ימים" },
  today_before_title: { en: "Austria awaits", he: "אוסטריה מחכה" },
  today_departure_label: { en: "Departure", he: "יציאה" },
  today_departure_route: { en: "Tel Aviv → Vienna", he: "תל אביב → וינה" },
  today_departure_note: {
    en: "Land 08:45 · drive departs ~10:00",
    he: "נחיתה 08:45 · יוצאים לדרך ~10:00"
  },
  today_packing_label: { en: "Getting ready", he: "מתכוננים" },
  today_packing_progress: {
    en: "{done} of {total} ready",
    he: "{done} מתוך {total} מוכן"
  },
  today_day1_preview: { en: "Day 1 · preview", he: "יום 1 · הצצה" },
  today_plan_days_label: { en: "The plan, day by day", he: "התוכנית, יום אחרי יום" },
  today_full_route: { en: "Full route", he: "למסלול המלא" },
  today_now_label: { en: "Right now", he: "עכשיו" },
  today_next_label: { en: "Up next", he: "הבא בתור" },
  today_see_full_day: { en: "See the full day", he: "לכל היום" },
  today_open_map: { en: "Open the map", he: "פתחו מפה" },
  today_no_next: { en: "That's the day — enjoy the evening.", he: "זה היום — תיהנו מהערב." },
  today_after_title: { en: "Willkommen zurück", he: "ברוכים השבים" },
  today_after_sub: {
    en: "That summer in Austria · relive the trip",
    he: "אותו קיץ באוסטריה · לחיות את הטיול מחדש"
  },
  today_after_itinerary: { en: "Browse the itinerary", he: "לדפדף במסלול" },
  today_after_quiz: { en: "Play Quizzo", he: "לשחק עם קוויצו" },

  /* ---------- Explore hub (2026 redesign) ---------- */
  explore_eyebrow: { en: "Explore", he: "לגלות" },
  explore_title: { en: "What to see & taste", he: "מה לראות ולטעום" },
  explore_kicker: {
    en: "The places we'll fall for and the food we'll eat",
    he: "המקומות שנתאהב בהם והאוכל שנאכל"
  },
  explore_card_places: { en: "Attractions", he: "אטרקציות" },
  explore_card_places_sub: {
    en: "Lakes, castles, cable cars, caves",
    he: "אגמים, טירות, רכבלים, מערות"
  },
  explore_card_food: { en: "Food & wine", he: "אוכל ויין" },
  explore_card_food_sub: {
    en: "Schnitzel, strudel — and what to drink",
    he: "שניצל, שטרודל — ומה שותים"
  },
  explore_count_places: { en: "{n} places to see", he: "{n} מקומות לראות" },
  explore_count_food: { en: "{n} dishes & drinks", he: "{n} מנות ומשקאות" },
  explore_open_map: { en: "See it all on the map", he: "לראות הכול על המפה" }
} as const;

export type DictKey = keyof typeof DICT;

export function tr(key: DictKey, lang: Lang): string {
  return DICT[key][lang];
}

/**
 * Format a string with {placeholder} → value substitutions.
 *   formatTr("Day {n}", { n: 3 }) → "Day 3"
 */
export function formatTr(s: string, vars?: Record<string, string | number>): string {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export function useT() {
  const { lang } = useLang();
  return (key: DictKey, vars?: Record<string, string | number>) =>
    formatTr(DICT[key][lang], vars);
}

/* ---------- Weekdays / months ---------- */

const WEEKDAYS_HE: Record<string, string> = {
  Monday: "יום שני",
  Tuesday: "יום שלישי",
  Wednesday: "יום רביעי",
  Thursday: "יום חמישי",
  Friday: "יום שישי",
  Saturday: "שבת",
  Sunday: "יום ראשון"
};

const WEEKDAYS_HE_SHORT: Record<string, string> = {
  Monday: "ב'",
  Tuesday: "ג'",
  Wednesday: "ד'",
  Thursday: "ה'",
  Friday: "ו'",
  Saturday: "ש'",
  Sunday: "א'"
};

export function localizeWeekday(weekday: string, lang: Lang, short = false): string {
  if (lang === "en") return short ? weekday.slice(0, 3) : weekday;
  return short ? WEEKDAYS_HE_SHORT[weekday] ?? weekday : WEEKDAYS_HE[weekday] ?? weekday;
}

const MONTHS_HE = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר"
];

/** Localized day-month (e.g. "17 Aug" / "17 באוגוסט"). */
export function localizeShortDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-").map(Number);
  const day = d;
  if (lang === "en") {
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }
  return `${day} ב${MONTHS_HE[m - 1]}`;
}
