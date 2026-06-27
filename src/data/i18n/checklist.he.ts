import type { ChecklistItem } from "../types";

export const checklistHE: Record<string, Partial<Pick<ChecklistItem, "text" | "detail">>> = {
  // הזמנות
  "book-salzburg-stay": {
    text: "להזמין את הדירה בזלצבורג (9–11 באוג׳)"
  },
  "rental-car-seats": {
    text: "לאשר רכב השכרה + 2 מושבי ילד + מושב תינוק"
  },
  vignette: {
    text: "לקנות את מדבקת האוטוסטרדה הדיגיטלית (10 ימים)"
  },
  "book-schoenbrunn": {
    text: "להזמין כניסה בשעה קבועה לארמון שנברון (25 באוג׳)"
  },
  "book-zoom": {
    text: "להזמין חלונות כניסה למוזיאון הילדים זום (25 באוג׳)"
  },
  "book-salzwelten": {
    text: "להזמין סיור במכרה המלח זלצוולטן (22 באוג׳)"
  },
  "book-steam-train": {
    text: "להזמין מקומות ברכבת הקיטור של צילרטל (13 באוג׳, יום חמישי)"
  },
  "book-hohenwerfen": {
    text: "לקנות מראש כרטיסים לטירת הוהנוורפן (22 באוג׳)"
  },
  "travel-docs": {
    text: "דרכונים, ביטוח נסיעות/EHIC, רישיון בינלאומי לנהג"
  },

  // אריזה
  "baby-carrier": {
    text: "מנשא לתינוק וגם עגלה"
  },
  "warm-layers": {
    text: "שכבות חמות + מעילי גשם לכולם"
  },
  "sun-protection": {
    text: "כובעי שמש, קרם הגנה גבוה, משקפי שמש"
  },
  swimwear: {
    text: "בגדי ים, מגבות ונעלי מים"
  },
  "closed-shoes": {
    text: "נעלי הליכה סגורות עם סוליות אחיזה"
  },
  cash: {
    text: "100–150 יורו במזומן (שטרות ומטבעות קטנים)"
  },
  "eu-adapter": {
    text: "מתאמי חשמל אירופיים (Type C/F) + מטענים"
  },
  "meds-firstaid": {
    text: "תרופות לילדים + ערכת עזרה ראשונה קטנה"
  },
  "snacks-water": {
    text: "בקבוקי מים רב־פעמיים וחטיפים לרכב"
  },
  "day-pack": {
    text: "תיק יום נוח"
  }
};
