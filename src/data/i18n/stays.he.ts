import type { Stay } from "../types";

export const staysHE: Record<
  string,
  Partial<
    Pick<
      Stay,
      "name" | "shortDescription" | "description" | "address" | "highlights" | "warnings"
    >
  >
> = {
  "stay-vienna-arrival": {
    name: "וינה — לילת הנחיתה",
    shortDescription: "לילה אחד ליד מרכז וינה כדי לנחות, לישון ולהתאפס"
  },
  "stay-salzburg": {
    name: "דירה בזלצבורג",
    shortDescription: "שני לילות בזלצבורג — העיר העתיקה, המצודה וטיולי יום"
  },
  "stay-tyrol": {
    name: "דירה בצילרטל",
    shortDescription: "ארבעה לילות בצילרטל — עמק המשפחות הקלאסי של טירול"
  },
  "stay-habachklause": {
    name: "מלון הבכקלאוזה",
    shortDescription: "חמישה לילות במלון־חווה משפחתי בפינצגאו"
  },
  "stay-gutwenghof": {
    name: "גוט וונגהוף — ריזורט משפחתי",
    shortDescription: "שלושה לילות בריזורט משפחתי הכל־כלול בוורפנוונג, יחד עם חברים"
  },
  "stay-vienna": {
    name: "דירה בוינה",
    shortDescription: "שלושה לילות בוינה לסיום הטיול — ארמונות, הפראטר והגלגל הענק"
  }
};
