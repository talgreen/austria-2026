import type { EmergencyContact, EmergencyGroup } from "../types";

type EmergencyHEItem = Partial<Pick<EmergencyContact, "label" | "value" | "detail">>;

interface EmergencyHEGroup extends Partial<Pick<EmergencyGroup, "title">> {
  items?: EmergencyHEItem[];
}

/** Indexed by group order (0..n) — items in same order as the English data. */
export const emergencyHE: EmergencyHEGroup[] = [
  {
    title: "אוסטריה — מספרי חירום",
    items: [
      { label: "מספר חירום אחיד (אירופי)", detail: "מגיע למשטרה, אמבולנס וכיבוי — אנגלית זמינה" },
      { label: "אמבולנס (Rettung)" },
      { label: "משטרה (Polizei)" },
      { label: "כיבוי אש (Feuerwehr)" },
      { label: "חילוץ הרים (Alpinnotruf)", detail: "למקרי חירום ברכבל / בטיולים / באלפים" },
      { label: "מוקד ייעוץ רפואי", detail: "לא חירום: לאיזה רופא / בית חולים לפנות" },
      { label: "מרכז רעלים (וינה, 24/7)" }
    ]
  },
  {
    title: "נהיגה וסיוע בדרכים",
    items: [
      { label: "סיוע בדרכים ÖAMTC", detail: "שירות גרירה ותקלות (הנפוץ ביותר)" },
      { label: "סיוע בדרכים ARBÖ" },
      { label: "מדבקת אוטוסטרדה ואגרות", detail: "כאן קונים את מדבקת האוטוסטרדה הדיגיטלית" }
    ]
  },
  {
    title: "בתי חולים לפי אזור",
    items: [
      { label: "בית החולים האוניברסיטאי זלצבורג (SALK)", detail: "Müllner Hauptstraße 48, זלצבורג — לשבועות בזלצבורג ובפינצגאו" },
      { label: "טאוארנקליניקום צל אם זה", detail: "Paracelsusstraße 8, צל אם זה — הקרוב ביותר לבסיס קאפרון / הבכקלאוזה" },
      { label: "בית החולים האוניברסיטאי אינסברוק", detail: "Anichstraße 35, אינסברוק — לשבוע בטירול / צילרטל" },
      { label: "בית החולים הכללי וינה (AKH)", detail: "Währinger Gürtel 18–20, וינה — לימים בוינה" }
    ]
  }
];
