import type { Service } from "../types";

export const servicesHE: Record<
  string,
  Partial<Pick<Service, "name" | "shortDescription" | "description" | "address" | "hours">>
> = {
  // ==================== זלצבורג ====================
  "salzburg-spar-getreidegasse": {
    shortDescription: "סופר ספאר קטן ברחוב הקניות הראשי של העיר העתיקה, ליד בית הולדתו של מוצרט"
  },
  "salzburg-sternbraeu": {
    shortDescription: "אולם בירה אוסטרי היסטורי (מאז 1542) עם חדר משחקים ייעודי לילדים"
  },

  // ==================== צילרטל, טירול ====================
  "zillertal-mpreis-mayrhofen": {
    shortDescription: "רשת MPREIS הטירולית עם בית קפה Baguette, קצביה וחניה"
  },
  "zillertal-mamma-mia": {
    shortDescription: "פיצריה משפחתית במרכז מאיירהופן — פיצה מתנור עצים ופסטה, חניה חינם"
  },

  // ==================== צל אם זה / קאפרון ====================
  "zellamsee-spar": {
    shortDescription: "סופר ספאר גדול הפתוח כל השנה באזור שיטדורף של צל אם זה"
  },
  "kaprun-dorfkrug": {
    shortDescription: "מסעדה משפחתית בקאפרון — שניצל, סטייקים ופיצה מתנור אבן"
  },

  // ==================== וורפנוונג / בישופסהופן ====================
  "bischofshofen-spar": {
    shortDescription: "סופר ספאר גדול במרכז בישופסהופן, ליד וורפנוונג"
  },
  "bischofshofen-papa-roy": {
    shortDescription: "פיצריה, מסעדה ובית קפה משפחתי ליד וורפנוונג"
  },

  // ==================== וינה ====================
  "vienna-billa-corso": {
    shortDescription: "סופר BILLA דגל יוקרתי בן 3 קומות ברובע הראשון — פתוח גם בימי ראשון (נדיר)"
  },
  "vienna-luftburg-kolarik": {
    shortDescription: "גן בירה משפחתי בפראטר עם עולם טירות מתנפחות מקורה בשטח 1,000 מ״ר"
  }
};
