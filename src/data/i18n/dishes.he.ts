import type { Dish } from "../types";

/** Hebrew overrides for dishes, keyed by id. The German name stays as-is
 *  (still rendered in italics) — only the descriptive copy gets translated. */
export const dishesHE: Record<
  string,
  Partial<Pick<Dish, "name" | "description" | "tryIt">>
> = {
  "wiener-schnitzel": {
    name: "שניצל וינאי"
  },
  "kaesespaetzle": {
    name: "קֵזֶשְפֵּצְלֶה (אטריות גבינה)"
  },
  "tafelspitz": {
    name: "טאפלשפיץ (בקר בציר)"
  },
  "kasnocken": {
    name: "קזנוקן פינצגאואי"
  },
  "kaiserschmarrn": {
    name: "קייזרשמארן (פנקייק קרוע)"
  },
  "apfelstrudel": {
    name: "שטרודל תפוחים"
  },
  "sachertorte": {
    name: "עוגת זאכר"
  },
  "salzburger-nockerl": {
    name: "נוקרל מזלצבורג"
  },
  "brezel": {
    name: "בייגלה וארוחת בוקר מהמאפייה"
  },
  "eis": {
    name: "גלידה (Eis)"
  },
  "almdudler": {
    name: "אלמדודלר"
  },
  "apfelsaft-gespritzt": {
    name: "מיץ תפוחים עם סודה"
  },
  "gruener-veltliner": {
    name: "גרינר וֶלטלינר"
  },
  "stiegl-bier": {
    name: "שטיגל ובירה אלפינית"
  },
  "wiener-melange": {
    name: "מלאנז׳ וינאי"
  }
};
