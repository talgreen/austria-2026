import type { Tip } from "../types";

export const tipsHE: Record<string, Partial<Pick<Tip, "title" | "body">>> = {
  vignette: {
    title: "לקנות מדבקת אוטוסטרדה (Vignette) לפני שנוסעים"
  },
  "special-toll-roads": {
    title: "כמה כבישים נופיים עולים תוספת (גלוקנר, אכנזה)"
  },
  "sunday-closures": {
    title: "החנויות סגורות בימי ראשון — להצטייד בשבת"
  },
  "alpine-weather": {
    title: "מזג האוויר בהרים מתהפך מהר — לארוז שכבות"
  },
  "stroller-vs-carrier": {
    title: "חלק מהאתרים דורשים מנשא בלבד (בלי עגלה)"
  },
  "cash-still-king": {
    title: "להחזיק קצת מזומן לפינות האלפיניות הקטנות"
  },
  tipping: {
    title: "טיפ: לעגל כלפי מעלה כ־5–10%, ולתת ישירות"
  },
  "lake-water-cold": {
    title: "האגמים האלפיניים יפהפיים — וקרים"
  },
  "book-ahead-august": {
    title: "להזמין מראש את האתרים עם כניסה בשעות קבועות"
  },
  "car-seats-driving": {
    title: "מושבי בטיחות לילדים ונהיגה באלפים"
  }
};
